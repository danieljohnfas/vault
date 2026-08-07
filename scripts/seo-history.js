/**
 * HentaiVault SEO Historical Analysis
 *
 * Fetches up to 16 months of GSC data (API maximum), analyses trends,
 * seasonality, peak/trough periods, top pages and queries,
 * and writes a comprehensive report to reports/seo-history.md
 *
 * Usage: node scripts/seo-history.js
 *
 * Environment variables required:
 *   GSC_SERVICE_ACCOUNT_JSON — JSON string of GCP service account key
 */

const fs   = require('fs');
const path = require('path');

const REPORTS_DIR  = path.join(__dirname, '..', 'reports');
const REPORT_PATH  = path.join(REPORTS_DIR, 'seo-history.md');

// ─── Date helpers ─────────────────────────────────────────────────────────────
function fmt(date) { return date.toISOString().split('T')[0]; }

function dateRange(start, end) {
  const dates = [];
  const cur = new Date(start);
  const fin = new Date(end);
  while (cur <= fin) {
    dates.push(fmt(new Date(cur)));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function monthLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

// GSC API cap: 16 months back from ~2 days ago
function historyStart() {
  const d = new Date();
  d.setDate(d.getDate() - 2);      // 2-day GSC data lag
  d.setMonth(d.getMonth() - 16);   // 16 months back
  return fmt(d);
}
function historyEnd() {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return fmt(d);
}

// ─── Fetch helpers ─────────────────────────────────────────────────────────────
async function gscQuery(webmasters, siteUrl, startDate, endDate, dimensions, rowLimit = 25000) {
  try {
    const res = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: { startDate, endDate, dimensions, rowLimit },
    });
    return res.data.rows || [];
  } catch (err) {
    console.warn(`  ⚠ GSC query failed [${dimensions}]: ${err.message}`);
    return [];
  }
}

// Aggregate an array of GSC rows into a single {clicks,impressions,ctr,position} object
function aggregate(rows) {
  const agg = { clicks: 0, impressions: 0, ctr: 0, position: 0, count: 0 };
  for (const r of rows) {
    agg.clicks      += r.clicks      || 0;
    agg.impressions += r.impressions || 0;
    agg.position    += r.position    || 0;
    agg.count++;
  }
  agg.ctr      = agg.impressions > 0 ? agg.clicks / agg.impressions : 0;
  agg.position = agg.count > 0 ? agg.position / agg.count : 0;
  return agg;
}

// Group an array of date-keyed rows by month (YYYY-MM)
function groupByMonth(rows) {
  const months = {};
  for (const r of rows) {
    const ym = r.keys[0].slice(0, 7); // "2025-03"
    if (!months[ym]) months[ym] = [];
    months[ym].push(r);
  }
  return months;
}

// ─── Analysis helpers ─────────────────────────────────────────────────────────
function bestAndWorst(monthlyAgg, metric) {
  const entries = Object.entries(monthlyAgg);
  entries.sort((a, b) => b[1][metric] - a[1][metric]);
  return {
    best:  entries[0],
    worst: entries[entries.length - 1],
  };
}

function pct(a, b) {
  if (!b) return 'N/A';
  return ((a - b) / b * 100).toFixed(1) + '%';
}

function trend(monthlyAgg) {
  const keys = Object.keys(monthlyAgg).sort();
  if (keys.length < 2) return 'insufficient data';
  const first = monthlyAgg[keys[0]];
  const last  = monthlyAgg[keys[keys.length - 1]];
  const delta = last.clicks - first.clicks;
  if (delta > 0)  return `📈 Growing (+${delta} clicks since ${keys[0]})`;
  if (delta < 0)  return `📉 Declining (${delta} clicks since ${keys[0]})`;
  return '➡️ Flat';
}

// Detect biggest single-month drop (for diagnosing penalty/update impacts)
function biggestDrop(monthlyAgg, metric = 'clicks') {
  const keys = Object.keys(monthlyAgg).sort();
  let maxDrop = 0, dropMonth = null, prevMonth = null;
  for (let i = 1; i < keys.length; i++) {
    const prev = monthlyAgg[keys[i-1]][metric];
    const cur  = monthlyAgg[keys[i]][metric];
    const drop = prev - cur;
    if (drop > maxDrop) {
      maxDrop   = drop;
      dropMonth = keys[i];
      prevMonth = keys[i-1];
    }
  }
  return maxDrop > 0 ? { maxDrop, dropMonth, prevMonth } : null;
}

// ─── Markdown helpers ─────────────────────────────────────────────────────────
function mdTable(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const sep  = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map(r => `| ${r.join(' | ')} |`).join('\n');
  return `${head}\n${sep}\n${body}`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n📚 HentaiVault SEO Historical Analysis starting...\n');

  // ── Auth
  const { google } = require('googleapis');
  const keyJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!keyJson) { console.error('ERROR: GSC_SERVICE_ACCOUNT_JSON not set.'); process.exit(1); }

  const credentials = JSON.parse(keyJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const webmasters = google.webmasters({ version: 'v3', auth });

  // ── Probe which property type is live
  const candidates = ['sc-domain:hentaivault.me', 'https://hentaivault.me/'];
  let siteUrl = null;
  for (const url of candidates) {
    const probe = await gscQuery(webmasters, url, historyStart(), historyEnd(), ['date'], 5);
    if (probe.length > 0) { siteUrl = url; break; }
  }
  if (!siteUrl) { console.error('ERROR: No GSC property accessible.'); process.exit(1); }
  console.log(`✅ Property: ${siteUrl}`);

  const START = historyStart();
  const END   = historyEnd();
  console.log(`📅 Fetching: ${START} → ${END}\n`);

  // ── Parallel fetches for different dimensions
  console.log('⬇️  Fetching historical data (4 dimensions)...');
  const [byDate, byQuery, byPage, byDevice] = await Promise.all([
    gscQuery(webmasters, siteUrl, START, END, ['date'],   25000),
    gscQuery(webmasters, siteUrl, START, END, ['query'],  25000),
    gscQuery(webmasters, siteUrl, START, END, ['page'],   25000),
    gscQuery(webmasters, siteUrl, START, END, ['device'], 100),
  ]);

  console.log(`  📆 Date rows:   ${byDate.length}`);
  console.log(`  🔍 Query rows:  ${byQuery.length}`);
  console.log(`  📄 Page rows:   ${byPage.length}`);
  console.log(`  📱 Device rows: ${byDevice.length}\n`);

  // ── Monthly aggregation from daily data
  const monthlyByDate = groupByMonth(byDate);
  const monthlyAgg    = {};
  for (const [ym, rows] of Object.entries(monthlyByDate)) {
    monthlyAgg[ym] = aggregate(rows);
  }

  const overallAgg = aggregate(byDate);

  // ── Analysis
  const dropInfo     = biggestDrop(monthlyAgg, 'clicks');
  const impDropInfo  = biggestDrop(monthlyAgg, 'impressions');
  const overallTrend = trend(monthlyAgg);
  const clickBest    = bestAndWorst(monthlyAgg, 'clicks');
  const impBest      = bestAndWorst(monthlyAgg, 'impressions');

  // Top queries
  byQuery.sort((a, b) => b.clicks - a.clicks);
  const top20Queries = byQuery.slice(0, 20);

  // Top pages
  byPage.sort((a, b) => b.clicks - a.clicks);
  const top20Pages = byPage.slice(0, 20);

  // Low-CTR high-impression queries (opportunity keywords)
  const opportunities = byQuery
    .filter(r => r.impressions >= 30 && r.ctr < 0.05 && r.position < 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  // Branded vs non-branded split
  const branded    = byQuery.filter(r => /hentaivault|hentai vault|hentaivm|hentavn/i.test(r.keys[0]));
  const nonBranded = byQuery.filter(r => !/hentaivault|hentai vault|hentaivm|hentavn/i.test(r.keys[0]));
  const brandedAgg    = aggregate(branded);
  const nonBrandedAgg = aggregate(nonBranded);

  // Device breakdown
  const deviceTable = byDevice.map(r => [
    r.keys[0],
    r.clicks,
    r.impressions,
    (r.ctr * 100).toFixed(1) + '%',
    r.position.toFixed(1),
  ]);

  // ── Build report
  const runDate = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const sections = [];

  sections.push(`# 📚 HentaiVault SEO Historical Analysis`);
  sections.push(`_Generated: ${runDate} UTC | Data range: ${START} → ${END} (up to 16 months via GSC API)_\n`);
  sections.push(`---\n`);

  // 1. Overall snapshot
  sections.push(`## 1. All-Time Snapshot (Full Available History)`);
  sections.push(mdTable(
    ['Metric', 'Value'],
    [
      ['Total Clicks',         `**${overallAgg.clicks.toLocaleString()}**`],
      ['Total Impressions',    `**${overallAgg.impressions.toLocaleString()}**`],
      ['Overall CTR',         `**${(overallAgg.ctr * 100).toFixed(2)}%**`],
      ['Average Position',    `**${overallAgg.position.toFixed(1)}**`],
      ['Unique Queries',       `**${byQuery.length.toLocaleString()}**`],
      ['Unique Pages',         `**${byPage.length.toLocaleString()}**`],
      ['Overall Trend',        overallTrend],
    ]
  ));
  sections.push(``);

  // 2. Monthly breakdown table
  sections.push(`## 2. Monthly Performance Breakdown`);
  const monthKeys = Object.keys(monthlyAgg).sort();
  const monthRows = monthKeys.map((ym, i) => {
    const a = monthlyAgg[ym];
    const prev = i > 0 ? monthlyAgg[monthKeys[i-1]] : null;
    const clickChange = prev ? ` (${a.clicks >= prev.clicks ? '+' : ''}${a.clicks - prev.clicks})` : '';
    return [
      ym,
      `${a.clicks.toLocaleString()}${clickChange}`,
      a.impressions.toLocaleString(),
      `${(a.ctr * 100).toFixed(2)}%`,
      a.position.toFixed(1),
    ];
  });
  sections.push(mdTable(['Month', 'Clicks', 'Impressions', 'CTR', 'Avg Position'], monthRows));
  sections.push(``);

  // 3. Peak & trough
  sections.push(`## 3. Peak & Trough Months`);
  sections.push(`| | Month | Value |`);
  sections.push(`|---|---|---|`);
  sections.push(`| 🏆 Best clicks     | **${clickBest.best[0]}**  | ${clickBest.best[1].clicks} clicks |`);
  sections.push(`| 📉 Worst clicks    | **${clickBest.worst[0]}** | ${clickBest.worst[1].clicks} clicks |`);
  sections.push(`| 🏆 Best impressions | **${impBest.best[0]}**  | ${impBest.best[1].impressions.toLocaleString()} |`);
  sections.push(`| 📉 Worst impressions| **${impBest.worst[0]}** | ${impBest.worst[1].impressions.toLocaleString()} |`);
  sections.push(``);

  // 4. Biggest drops (penalty/algorithm update detection)
  sections.push(`## 4. Biggest Single-Month Drops (Algorithm Update / Penalty Detection)`);
  if (dropInfo) {
    sections.push(`> [!WARNING]`);
    sections.push(`> 📉 **Clicks** dropped by **${dropInfo.maxDrop}** between **${dropInfo.prevMonth}** → **${dropInfo.dropMonth}**. Correlate with [Google Algorithm Update history](https://developers.google.com/search/updates/ranking) to check if this aligns with a known update.`);
  } else {
    sections.push(`_No significant single-month click drop detected._`);
  }
  if (impDropInfo && impDropInfo.dropMonth !== dropInfo?.dropMonth) {
    sections.push(``);
    sections.push(`> [!NOTE]`);
    sections.push(`> 👁 **Impressions** dropped by **${impDropInfo.maxDrop.toLocaleString()}** between **${impDropInfo.prevMonth}** → **${impDropInfo.dropMonth}**.`);
  }
  sections.push(``);

  // 5. Branded vs non-branded
  sections.push(`## 5. Branded vs Non-Branded Traffic Split`);
  sections.push(mdTable(
    ['Segment', 'Clicks', 'Impressions', 'CTR', 'Avg Position'],
    [
      ['🏷 Branded',     brandedAgg.clicks.toLocaleString(),    brandedAgg.impressions.toLocaleString(),    `${(brandedAgg.ctr * 100).toFixed(2)}%`,    brandedAgg.position.toFixed(1)],
      ['🔍 Non-Branded', nonBrandedAgg.clicks.toLocaleString(), nonBrandedAgg.impressions.toLocaleString(), `${(nonBrandedAgg.ctr * 100).toFixed(2)}%`, nonBrandedAgg.position.toFixed(1)],
    ]
  ));
  const brandRatio = overallAgg.clicks > 0
    ? `${((brandedAgg.clicks / overallAgg.clicks) * 100).toFixed(0)}% branded / ${((nonBrandedAgg.clicks / overallAgg.clicks) * 100).toFixed(0)}% non-branded`
    : 'N/A';
  sections.push(`\n_Traffic split: ${brandRatio}_`);
  sections.push(``);

  // 6. Device breakdown
  sections.push(`## 6. Device Breakdown`);
  if (deviceTable.length > 0) {
    sections.push(mdTable(['Device', 'Clicks', 'Impressions', 'CTR', 'Avg Position'], deviceTable));
  } else {
    sections.push('_Device data not available._');
  }
  sections.push(``);

  // 7. Top 20 queries
  sections.push(`## 7. Top 20 Queries by Clicks (All Time)`);
  sections.push(mdTable(
    ['#', 'Query', 'Clicks', 'Impressions', 'CTR', 'Avg Position'],
    top20Queries.map((r, i) => [
      i + 1,
      `\`${r.keys[0]}\``,
      r.clicks.toLocaleString(),
      r.impressions.toLocaleString(),
      `${(r.ctr * 100).toFixed(2)}%`,
      r.position.toFixed(1),
    ])
  ));
  sections.push(``);

  // 8. Top 20 pages
  sections.push(`## 8. Top 20 Pages by Clicks (All Time)`);
  sections.push(mdTable(
    ['#', 'Page', 'Clicks', 'Impressions', 'CTR'],
    top20Pages.map((r, i) => [
      i + 1,
      r.keys[0].replace('https://hentaivault.me', ''),
      r.clicks.toLocaleString(),
      r.impressions.toLocaleString(),
      `${(r.ctr * 100).toFixed(2)}%`,
    ])
  ));
  sections.push(``);

  // 9. Opportunity keywords
  sections.push(`## 9. 🎯 Opportunity Keywords (High Impressions, Low CTR, Ranking in Top 20)`);
  sections.push(`_These queries already rank on page 1-2 but aren't being clicked. Fixing titles/descriptions here has the highest ROI._\n`);
  if (opportunities.length > 0) {
    sections.push(mdTable(
      ['Query', 'Impressions', 'CTR', 'Position', 'Action'],
      opportunities.map(r => [
        `\`${r.keys[0]}\``,
        r.impressions.toLocaleString(),
        `${(r.ctr * 100).toFixed(2)}%`,
        r.position.toFixed(1),
        r.position < 10 ? '🔴 Fix title tag immediately' : '🟡 Improve content/description',
      ])
    ));
  } else {
    sections.push('_No opportunity keywords found in this range._');
  }
  sections.push(``);

  // 10. Key insights
  sections.push(`## 10. 🧠 Key Insights & Recommendations`);
  const insights = [];

  const brandPct = overallAgg.clicks > 0 ? (brandedAgg.clicks / overallAgg.clicks) * 100 : 0;
  if (brandPct > 80) {
    insights.push(`🔴 **Over-reliance on branded traffic** (${brandPct.toFixed(0)}% branded). The site is heavily dependent on existing brand recognition. Non-branded SEO must be the #1 growth priority.`);
  } else if (brandPct > 60) {
    insights.push(`🟡 **High branded traffic ratio** (${brandPct.toFixed(0)}%). Good brand presence, but non-branded growth is needed for long-term stability.`);
  } else {
    insights.push(`🟢 **Healthy branded/non-branded split** (${brandPct.toFixed(0)}% branded). Diversified traffic sources.`);
  }

  if (overallAgg.position > 20) {
    insights.push(`🔴 **Average position is ${overallAgg.position.toFixed(1)}** — this is beyond page 2. Most queries are not visible to searchers. Publishing deeper, more specific content targeting long-tail keywords is essential.`);
  } else if (overallAgg.position > 10) {
    insights.push(`🟡 **Average position is ${overallAgg.position.toFixed(1)}** — hovering around page 1-2. Many queries are just off page 1. A focused push to top-10 for the most-impressed queries could significantly lift clicks.`);
  } else {
    insights.push(`🟢 **Average position is ${overallAgg.position.toFixed(1)}** — strong page 1 visibility.`);
  }

  if (dropInfo) {
    insights.push(`🔴 **Biggest traffic drop detected**: ${dropInfo.maxDrop} clicks lost in ${dropInfo.dropMonth} vs ${dropInfo.prevMonth}. Check for [Google Core Update](https://developers.google.com/search/updates/ranking) history for this date.`);
  }

  if (opportunities.length >= 5) {
    const topOpp = opportunities[0];
    insights.push(`🟢 **${opportunities.length} high-ROI opportunity keywords** found. Top opportunity: \`${topOpp.keys[0]}\` (${topOpp.impressions} impressions, ${(topOpp.ctr*100).toFixed(1)}% CTR, pos ${topOpp.position.toFixed(1)}). Update the title/meta for the page ranking for this to immediately capture more clicks without needing new backlinks.`);
  }

  if (nonBrandedAgg.clicks < 5) {
    insights.push(`🔴 **Near-zero non-branded clicks**. The site is essentially invisible for discovery searches. Priority actions: publish keyword-optimised blog content, build internal links, submit niche directories.`);
  }

  for (const ins of insights) {
    sections.push(`- ${ins}`);
    sections.push(``);
  }

  sections.push(`---`);
  sections.push(`_Report auto-generated by HentaiVault SEO History script. Raw data: GSC API property \`${siteUrl}\`_`);

  const reportMd = sections.join('\n');

  // ── Write report
  if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, reportMd, 'utf8');
  console.log(`\n✅ Report written → ${REPORT_PATH}`);
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📆 Data range:       ${START} → ${END}`);
  console.log(`📊 Total clicks:     ${overallAgg.clicks.toLocaleString()}`);
  console.log(`👁 Total impressions: ${overallAgg.impressions.toLocaleString()}`);
  console.log(`🔍 Unique queries:   ${byQuery.length}`);
  console.log(`📄 Unique pages:     ${byPage.length}`);
  console.log(`🎯 Opportunities:    ${opportunities.length}`);
  console.log(`${overallTrend}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
