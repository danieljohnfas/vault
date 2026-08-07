const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const isSiteLive = require('./ping-site');

async function run() {
  console.log("🚀 Starting Pruning Operation");
  const tmpDir = path.resolve(__dirname, '..', 'tmp');
  const inFile = path.join(tmpDir, 'all_sites_for_prune.json');
  const outSqlFile = path.join(__dirname, 'do-prune.sql');
  
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  // 1. Fetch current db state
  console.log("Fetching all sites from D1...");
  try {
    execSync(`npx wrangler d1 execute hv-directory --remote --command="SELECT * FROM sites;" --json > "${inFile}"`, { stdio: 'pipe' });
  } catch(e) {
    console.error("Failed to fetch sites", e.toString());
    process.exit(1);
  }
  
  const raw = JSON.parse(fs.readFileSync(inFile, 'utf8'));
  const sites = Array.isArray(raw) && raw[0] && raw[0].results ? raw[0].results : [];
  console.log(`Loaded ${sites.length} sites for evaluation.\n`);
  
  const idsToDelete = new Set();
  const survivingSites = [];
  
  // 2. Filter by Rating and Description Length
  for (const s of sites) {
    let toDelete = false;
    let parsed;
    try {
      parsed = JSON.parse(s.data_json);
    } catch(e) { parsed = {}; }
    
    // Check rating < 4.0
    if (s.rating < 4.0) {
      idsToDelete.add(s.id);
      toDelete = true;
    }
    
    // Check thin content
    if (!toDelete && parsed.description) {
      if (parsed.description.length < 30) {
        idsToDelete.add(s.id);
        toDelete = true;
      }
    }
    
    if (!toDelete) {
      survivingSites.push(s);
    }
  }
  
  console.log(`Phase 1: Filtered ${idsToDelete.size} sites (Rating < 4.0 or Thin Content).`);
  console.log(`Phase 2: Full Dead-Link Sweep on remaining ${survivingSites.length} sites...`);
  
  // 3. Ping remaining sites (concurrency = 25)
  let pingCount = 0;
  let deadCount = 0;
  for (let i = 0; i < survivingSites.length; i += 25) {
    const chunk = survivingSites.slice(i, i + 25);
    const results = await Promise.all(chunk.map(async s => {
      return { site: s, live: await isSiteLive(s.url) };
    }));
    
    for (const r of results) {
      pingCount++;
      if (r.live === 'dead') {
        idsToDelete.add(r.site.id);
        deadCount++;
        console.log(`   ❌ DEAD/PARKED: ${r.site.url}`);
      }
    }
    process.stdout.write(`\r   Progress: ${pingCount} / ${survivingSites.length}`);
  }
  
  console.log(`\n\nPhase 2 Complete: Found ${deadCount} dead/parked sites.`);
  console.log(`Total sites to prune: ${idsToDelete.size}`);
  
  if (idsToDelete.size === 0) {
    console.log("No sites need to be pruned.");
    process.exit(0);
  }
  
  // 4. Generate SQL
  let sql = `-- HentaiVault D1 Cleanup — Low Value Pruning\n`;
  sql += `-- Total sites to delete: ${idsToDelete.size}\n\n`;
  
  // Batch deletes (SQLITE in clause limit usually 1000)
  const idArray = Array.from(idsToDelete);
  for (let i = 0; i < idArray.length; i += 500) {
    const batch = idArray.slice(i, i + 500);
    const inClause = batch.map(id => `'${id.replace(/'/g, "''")}'`).join(', ');
    sql += `DELETE FROM sites WHERE id IN (${inClause});\n`;
  }
  
  sql += `\nSELECT COUNT(*) as remaining_sites FROM sites;\n`;
  
  fs.writeFileSync(outSqlFile, sql, 'utf8');
  console.log(`\n✅ SQL script generated at: ${outSqlFile}`);
  console.log(`Run: npx wrangler d1 execute hv-directory --remote --file=scripts/do-prune.sql`);
}

run().catch(e => console.error(e));
