const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const isSiteLive = require('./ping-site');

async function run() {
  console.log("Fetching all sites from D1...");
  const tmpDir = path.resolve(__dirname, '..', 'tmp');
  const outFile = path.join(tmpDir, 'all_sites.json');
  
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  try {
    execSync(`npx wrangler d1 execute hv-directory --remote --command="SELECT * FROM sites;" --json > "${outFile}"`, { stdio: 'pipe' });
  } catch(e) {
    console.error("Failed to fetch sites", e.toString());
  }
  
  let raw = [];
  if (fs.existsSync(outFile)) {
    raw = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  }
  const sites = Array.isArray(raw) && raw[0] && raw[0].results ? raw[0].results : [];
  
  console.log(`Loaded ${sites.length} sites.`);
  
  let lowRating = 0;
  let boilerplateDesc = 0;
  let veryShortDesc = 0;
  
  const boilerplateStrings = [
    "is a high-authority platform specializing in",
    "Our 2026 review found it to be a reliable"
  ];
  
  for (const s of sites) {
    if (s.rating < 3.5) lowRating++;
    
    let parsed;
    try {
      parsed = JSON.parse(s.data_json);
    } catch(e) { continue; }
    
    if (parsed.description) {
      if (boilerplateStrings.some(b => parsed.description.includes(b))) {
        boilerplateDesc++;
      }
      if (parsed.description.length < 30) {
        veryShortDesc++;
      }
    }
  }
  
  console.log("--- Stats ---");
  console.log(`Total Sites: ${sites.length}`);
  console.log(`Low Rating (< 3.5): ${lowRating}`);
  console.log(`Boilerplate Description: ${boilerplateDesc}`);
  console.log(`Very Short Description (< 30 chars): ${veryShortDesc}`);
  
  // Random sample pinging of 50 sites to estimate dead rate
  console.log("Pinging a random sample of 50 sites to estimate dead link rate...");
  const sample = sites.sort(() => 0.5 - Math.random()).slice(0, 50);
  let liveCount = 0;
  let deadCount = 0;
  let errCount = 0;
  
  const results = await Promise.all(sample.map(async s => {
    return isSiteLive(s.url);
  }));
  
  for (const r of results) {
    if (r === 'live') liveCount++;
    else if (r === 'dead') deadCount++;
    else errCount++;
  }
  
  console.log(`Sample Results (n=50) -> Live: ${liveCount}, Dead: ${deadCount}, Timeout/Error/Protected: ${errCount}`);
  console.log(`Estimated total dead sites: ${Math.round((deadCount / 50) * sites.length)}`);
}

run();
