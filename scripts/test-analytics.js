const fs = require('fs');
const path = require('path');
const outPath = path.join(__dirname, '..', 'reports', 'analytics-test.txt');
let output = '';
function log(msg) { console.log(msg); output += msg + '\n'; }

const { google } = require('googleapis');

async function checkGA4() {
  log("Checking GA4 access...");
  try {
    const keyJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
    if (!keyJson) throw new Error("No GSC_SERVICE_ACCOUNT_JSON");
    const credentials = JSON.parse(keyJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });
    const res = await analyticsadmin.accountSummaries.list();
    if (res.data.accountSummaries && res.data.accountSummaries.length > 0) {
      for (const acc of res.data.accountSummaries) {
        log(`GA4 Account: ${acc.account} - ${acc.displayName}`);
        for (const prop of acc.propertySummaries || []) {
          log(`  Property: ${prop.property} - ${prop.displayName}`);
        }
      }
    } else {
      log("No GA4 accounts found for this service account.");
    }
  } catch (err) {
    log("GA4 Check Error: " + err.message);
  }
}

async function checkCloudflare() {
  log("\nChecking Cloudflare access...");
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !token) {
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
      
      const query = `
        query {
          viewer {
            zones(filter: {zoneTag: "${zoneId}"}) {
              httpRequests1dGroups(
                limit: 1, 
                filter: { date_lt: "2024-08-01" }
              ) {
                dimensions { date }
                sum { requests, pageViews }
              }
            }
          }
        }
      `;
      const gqlRes = await fetch('https://api.cloudflare.com/client/v4/graphql', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const gqlData = await gqlRes.json();
      log("GraphQL response: " + JSON.stringify(gqlData, null, 2));
    } else {
      log("Zone not found or API token lacks zone read permission.");
    }
  } catch (err) {
    log("Cloudflare Check Error: " + err.message);
  }
}

async function main() {
  await checkGA4();
  await checkCloudflare();
  fs.writeFileSync(outPath, output, 'utf8');
}

main();
