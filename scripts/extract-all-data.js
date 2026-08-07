const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const REPORTS_DIR = path.join(__dirname, '..', 'reports', 'raw-data');
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

async function exportGSC(auth) {
  const webmasters = google.webmasters({ version: 'v3', auth });
  const siteUrl = 'sc-domain:hentaivault.me';

  async function query(dimensions, filename) {
    console.log(`Pulling GSC ${dimensions.join(',')}...`);
    let rows = [];
    let startRow = 0;
    while(true) {
      try {
        const res = await webmasters.searchanalytics.query({
          siteUrl,
          requestBody: { 
            startDate: daysAgo(480), // 16 months max limit
            endDate: daysAgo(2), 
            dimensions, 
            rowLimit: 25000,
            startRow 
          }
        });
        if (!res.data.rows || res.data.rows.length === 0) break;
        rows = rows.concat(res.data.rows);
        startRow += 25000;
        if (res.data.rows.length < 25000) break;
      } catch(e) {
        console.error(`GSC error: ${e.message}`);
        break;
      }
    }
    
    if (rows.length > 0) {
      let csv = dimensions.join(',') + ',clicks,impressions,ctr,position\n';
      rows.forEach(r => {
        csv += `"${r.keys.join('","')}","${r.clicks}","${r.impressions}","${r.ctr}","${r.position}"\n`;
      });
      fs.writeFileSync(path.join(REPORTS_DIR, filename), csv);
      console.log(`✅ Saved ${rows.length} rows to ${filename}`);
    }
  }

  await query(['query'], 'gsc_all_queries_16mo.csv');
  await query(['page'], 'gsc_all_pages_16mo.csv');
  await query(['date'], 'gsc_all_dates_16mo.csv');
  await query(['country'], 'gsc_all_countries_16mo.csv');
  await query(['device'], 'gsc_all_devices_16mo.csv');
}

async function exportCF(token, zoneId) {
  console.log(`Pulling Cloudflare all data...`);
  const gqlEndpoint = 'https://api.cloudflare.com/client/v4/graphql';
  async function gql(query, vars = {}) {
    const res = await fetch(gqlEndpoint, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: vars })
    });
    return res.json();
  }

  // Daily for 31 days (max free tier)
  const q31 = `
    query($zoneTag: String!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(limit: 31, filter: { date_gt: "${daysAgo(32)}" }, orderBy: [date_ASC]) {
            dimensions { date }
            sum { requests pageViews bytes threats cachedRequests }
            uniq { uniques }
          }
        }
      }
    }`;
  const res31 = await gql(q31, { zoneTag: zoneId });
  fs.writeFileSync(path.join(REPORTS_DIR, 'cf_daily_31d.json'), JSON.stringify(res31, null, 2));
  console.log(`✅ Saved cf_daily_31d.json`);

  // Top paths
  const qPaths = `
    query($zoneTag: String!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(limit: 1000, filter: { date_gt: "${daysAgo(31)}" }, orderBy: [count_DESC]) {
            dimensions { clientRequestPath }
            count
          }
        }
      }
    }`;
  const resPaths = await gql(qPaths, { zoneTag: zoneId });
  fs.writeFileSync(path.join(REPORTS_DIR, 'cf_top_paths_31d.json'), JSON.stringify(resPaths, null, 2));
  console.log(`✅ Saved cf_top_paths_31d.json`);

  // Top countries
  const qCountries = `
    query($zoneTag: String!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(limit: 500, filter: { date_gt: "${daysAgo(31)}" }, orderBy: [count_DESC]) {
            dimensions { clientCountryName }
            count
          }
        }
      }
    }`;
  const resCountries = await gql(qCountries, { zoneTag: zoneId });
  fs.writeFileSync(path.join(REPORTS_DIR, 'cf_countries_31d.json'), JSON.stringify(resCountries, null, 2));
  console.log(`✅ Saved cf_countries_31d.json`);
}

async function main() {
  const { google } = require('googleapis');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  
  await exportGSC(auth).catch(console.error);

  const cfToken = process.env.CLOUDFLARE_ANALYTICS_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
  const zoneRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=hentaivault.me`, {
    headers: { 'Authorization': `Bearer ${cfToken}` }
  });
  const zoneData = await zoneRes.json();
  if (zoneData.success && zoneData.result.length) {
    await exportCF(cfToken, zoneData.result[0].id).catch(console.error);
  }
}

main();
