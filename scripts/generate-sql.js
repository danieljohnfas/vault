const fs = require('fs');
const path = require('path');

const dataStr = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrayMatch = dataStr.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
if (!arrayMatch) {
  console.error("Could not parse data.js");
  process.exit(1);
}

const jsonString = arrayMatch[1].replace(/,\s*([\]}])/g, '$1');
const sites = JSON.parse(jsonString);

console.log(`Loaded ${sites.length} sites from data.js`);

let currentBatch = 0;
let currentStmts = [];
let fileIndex = 1;

function writeBatch() {
  if (currentStmts.length === 0) return;
  const sql = currentStmts.join('\n');
  const filename = path.join(__dirname, `../insert_${fileIndex}.sql`);
  fs.writeFileSync(filename, sql, 'utf8');
  console.log(`Wrote ${filename}`);
  currentStmts = [];
  currentBatch = 0;
  fileIndex++;
}

// Prepare statements
for (const site of sites) {
  const id = site.id || '';
  const category = site.category || '';
  const url = site.url || '';
  const rating = site.rating || 0;
  const addedAt = site.addedAt || '';
  const dataJson = JSON.stringify(site).replace(/'/g, "''"); // Escape single quotes for SQL

  const stmt = `INSERT OR IGNORE INTO sites (id, category, url, rating, added_at, data_json) VALUES ('${id}', '${category.replace(/'/g, "''")}', '${url.replace(/'/g, "''")}', ${rating}, '${addedAt}', '${dataJson}');`;
  currentStmts.push(stmt);
  currentBatch++;

  // Write every 200 sites to keep file sizes < 1MB
  if (currentBatch >= 200) {
    writeBatch();
  }
}

writeBatch();
console.log("SQL generation complete.");
