const fs = require('fs');
const path = require('path');
const outPath = path.join(__dirname, '..', 'reports', 'analytics-test.txt');
let output = '';
function log(msg) { console.log(msg); output += msg + '\n'; }

async function purgeCache() {
  log("\nAttempting to purge Cloudflare cache...");
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    log("Missing Cloudflare credentials");
    return;
  }
  
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=hentaivault.me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.success && data.result.length > 0) {
      const zoneId = data.result[0].id;
      log(`Cloudflare Zone ID: ${zoneId}`);
      
      const purgeRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ purge_everything: true })
      });
      const purgeData = await purgeRes.json();
      log("Cache Purge Response: " + JSON.stringify(purgeData, null, 2));
    } else {
      log("Zone not found or API token lacks zone read permission.");
    }
  } catch (err) {
    log("Cloudflare Check Error: " + err.message);
  }
}

async function main() {
  await purgeCache();
  fs.writeFileSync(outPath, output, 'utf8');
}
main();
