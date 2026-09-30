/**
 * HentaiVault — read-only production audit.
 *
 * Collects live-site, Google Search Console and Cloudflare state in one pass so
 * problems can be diagnosed without dashboard access. Nothing here writes to
 * GSC, Cloudflare or D1: every call is a GET or a read-only SELECT.
 *
 * Env: GSC_SERVICE_ACCOUNT_JSON, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ANALYTICS_TOKEN,
 *      CLOUDFLARE_ACCOUNT_ID
 * Output: stdout + reports/site-audit.json (uploaded as a workflow artifact)
 */

const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://hentaivault.me';
const D1_ID = '3dc06028-c9b1-4e4a-a3c3-11f92209baab';
const WORKER = 'vault';
const out = {};

function log(...a) { console.log(...a); }
function section(t) { log(`\n==================== ${t} ====================`); }
function daysAgo(n) { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d.toISOString().split('T')[0]; }

// ── Live site ────────────────────────────────────────────────────────────────
async function probe(url, opts = {}) {
  const started = Date.now();
  try {
    const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': opts.ua || 'Mozilla/5.0 (HV-audit)' } });
    let body = '';
    let bodyError = null;
    try { body = await res.text(); } catch (e) { bodyError = e.message; }
    return {
      url, status: res.status, ms: Date.now() - started,
      location: res.headers.get('location'),
      type: res.headers.get('content-type'),
      cache: res.headers.get('cache-control'),
      cfCache: res.headers.get('cf-cache-status'),
      robotsHeader: res.headers.get('x-robots-tag'),
      csp: !!res.headers.get('content-security-policy'),
      xfo: res.headers.get('x-frame-options'),
      bytes: body.length,
      endsWithHtml: /<\/html>\s*$/i.test(body),
      title: (body.match(/<title>([^<]*)<\/title>/i) || [])[1] || null,
      metaRobots: (body.match(/<meta[^>]+name=["']robots["'][^>]*>/ig) || []).join(' | ') || null,
      canonicals: (body.match(/<link[^>]+rel=["']canonical["'][^>]*>/ig) || []),
      h1: (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim().slice(0, 80) || null,
      bodyError,
      snippet: opts.snippet ? body.slice(0, opts.snippet) : undefined,
      tail: opts.tail ? body.slice(-opts.tail) : undefined,
    };
  } catch (e) {
    return { url, error: e.message, ms: Date.now() - started };
  }
}

async function liveChecks() {
  section('LIVE SITE');
  const pages = [
    '/', '/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/sitemap-pages.xml',
    '/blog', '/blog/nhentai-alternatives-2026', '/blog/best-streaming-2026',
    '/category/manga-doujin', '/category/hentai-streaming', '/about', '/region-unblocked', '/live',
    '/alternatives', '/site?id=toonily', '/site?id=hentaimama', '/site?id=hentai20', '/site?id=nhentai',
    '/site?id=does-not-exist-xyz', '/site.html?id=toonily', '/compare?site1=nhentai&site2=hitomila',
    '/embed?id=nhentai', '/out?id=nhentai', '/rss.xml', '/llms.txt', '/manifest.json', '/sw.js',
    '/api/sites?limit=2', '/api/site-count', '/nonexistent-page-abc', '/index.html', '/about.html',
  ];
  out.live = [];
  for (const p of pages) {
    const r = await probe(ORIGIN + p, { tail: p.startsWith('/site?id=toonily') ? 300 : 0, snippet: p === '/robots.txt' ? 2000 : 0 });
    out.live.push(r);
    log(JSON.stringify(r));
  }

  section('LIVE SITE AS GOOGLEBOT');
  const gb = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
  out.googlebot = [];
  for (const p of ['/', '/site?id=toonily', '/blog/nhentai-alternatives-2026', '/category/manga-doujin']) {
    const r = await probe(ORIGIN + p, { ua: gb, tail: 200 });
    out.googlebot.push(r);
    log(JSON.stringify(r));
  }

  section('HOST / PROTOCOL VARIANTS');
  for (const u of ['http://hentaivault.me/', 'https://www.hentaivault.me/', 'http://www.hentaivault.me/']) {
    const r = await probe(u);
    log(JSON.stringify({ url: u, status: r.status, location: r.location, error: r.error }));
  }

  section('SITEMAP CONTENTS');
  try {
    const xml = await (await fetch(ORIGIN + '/sitemap-sites.xml')).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    out.sitemapSites = { count: locs.length, sample: locs.slice(0, 5), bytes: xml.length };
    log(JSON.stringify(out.sitemapSites));
  } catch (e) { log('sitemap-sites error', e.message); }

  section('PUBLIC EXPOSURE OF NON-SITE FILES (expect 404)');
  const leaks = [
    '/reports/raw-data/gsc_all_queries_16mo.csv', '/reports/seo-status.md', '/reports/full-analytics-report.md',
    '/tmp/all_sites.json', '/tmp/rescore-db-dump.json', '/daily.log', '/schema.sql', '/prune-sites.sql',
    '/bot/index.js', '/bot/.env.example', '/migrations/0001_add_reviews_table.sql', '/audit_report.json',
    '/region-unblocked.html.orig', '/temp_review.html', '/cd', '/.unlighthouse/reports/lighthouse.json',
    '/node_modules/glob/package.json', '/package.json', '/.wrangler/cache/wrangler-account.json',
    '/.github/workflows/seo-monitor.yml', '/scripts/seo-autofix.js', '/src/index.js', '/wrangler.jsonc',
    '/extension/manifest.json', '/css/src/base.css', '/ads/banner.html', '/generate-seed.js', '/deploy.bat',
  ];
  out.exposure = [];
  for (const p of leaks) {
    try {
      const res = await fetch(ORIGIN + p, { redirect: 'manual' });
      const body = await res.text();
      const row = { path: p, status: res.status, type: res.headers.get('content-type'), bytes: body.length };
      out.exposure.push(row);
      log(JSON.stringify(row));
    } catch (e) { log(JSON.stringify({ path: p, error: e.message })); }
  }
}

// ── Google Search Console ────────────────────────────────────────────────────
async function gscChecks() {
  section('GOOGLE SEARCH CONSOLE');
  if (!process.env.GSC_SERVICE_ACCOUNT_JSON) { log('GSC secret missing'); return; }
  const { google } = require('googleapis');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const wm = google.webmasters({ version: 'v3', auth });
  const sc = google.searchconsole({ version: 'v1', auth });
  out.gsc = {};

  try {
    const sites = await wm.sites.list();
    out.gsc.sites = sites.data.siteEntry;
    log('Properties:', JSON.stringify(sites.data.siteEntry));
  } catch (e) { log('sites.list error:', e.message); }

  const property = 'sc-domain:hentaivault.me';
  try {
    const sm = await wm.sitemaps.list({ siteUrl: property });
    out.gsc.sitemaps = sm.data.sitemap || [];
    for (const s of out.gsc.sitemaps) log('SITEMAP', JSON.stringify(s));
    for (const s of out.gsc.sitemaps.filter(x => x.isSitemapsIndex)) {
      try {
        const child = await wm.sitemaps.list({ siteUrl: property, sitemapIndex: s.path });
        for (const c of child.data.sitemap || []) log('  CHILD', JSON.stringify(c));
      } catch (e) { log('child sitemap error', e.message); }
    }
  } catch (e) { log('sitemaps.list error:', e.message); }

  async function sa(body) {
    try { return (await wm.searchanalytics.query({ siteUrl: property, requestBody: body })).data.rows || []; }
    catch (e) { log('searchanalytics error:', e.message); return []; }
  }
  const byDate = await sa({ startDate: daysAgo(150), endDate: daysAgo(1), dimensions: ['date'], rowLimit: 500 });
  out.gsc.byDate = byDate;
  log('DAILY (date clicks impressions position):');
  for (const r of byDate) log(`  ${r.keys[0]} ${r.clicks} ${r.impressions} ${r.position.toFixed(1)}`);

  const byPage = await sa({ startDate: daysAgo(30), endDate: daysAgo(1), dimensions: ['page'], rowLimit: 50 });
  log('TOP PAGES 30d:');
  for (const r of byPage) log(`  ${r.keys[0]} c=${r.clicks} i=${r.impressions} p=${r.position.toFixed(1)}`);
  const byQuery = await sa({ startDate: daysAgo(30), endDate: daysAgo(1), dimensions: ['query'], rowLimit: 50 });
  log('TOP QUERIES 30d:');
  for (const r of byQuery) log(`  ${r.keys[0]} c=${r.clicks} i=${r.impressions} p=${r.position.toFixed(1)}`);
  const bySearchType = await sa({ startDate: daysAgo(30), endDate: daysAgo(1), dimensions: ['page'], type: 'image', rowLimit: 10 });
  log('IMAGE SEARCH rows 30d:', bySearchType.length);

  const inspect = [
    '/', '/blog', '/blog/nhentai-alternatives-2026', '/blog/best-streaming-2026', '/blog/best-doujin-sites-2026',
    '/blog/free-manga-guide', '/category/manga-doujin', '/category/hentai-streaming', '/category/images-boorus',
    '/site?id=toonily', '/site?id=hentaimama', '/site?id=hentai20', '/site?id=nhentai', '/about',
  ];
  out.gsc.inspections = [];
  for (const p of inspect) {
    try {
      const r = await sc.urlInspection.index.inspect({ requestBody: { inspectionUrl: ORIGIN + p, siteUrl: property } });
      const i = r.data.inspectionResult?.indexStatusResult || {};
      const row = {
        url: p, verdict: i.verdict, coverage: i.coverageState, robots: i.robotsTxtState, indexing: i.indexingState,
        fetch: i.pageFetchState, lastCrawl: i.lastCrawlTime, crawledAs: i.crawledAs,
        googleCanonical: i.googleCanonical, userCanonical: i.userCanonical, sitemaps: i.sitemap,
        referring: (i.referringUrls || []).slice(0, 3),
      };
      out.gsc.inspections.push(row);
      log('INSPECT', JSON.stringify(row));
    } catch (e) { log('INSPECT error', p, e.message); }
  }
}

// ── Cloudflare ───────────────────────────────────────────────────────────────
async function cfChecks() {
  section('CLOUDFLARE');
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const aToken = process.env.CLOUDFLARE_ANALYTICS_TOKEN || token;
  const acct = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !acct) { log('Cloudflare secrets missing'); return; }
  out.cf = {};

  async function cf(p, { method = 'GET', body, tok = token } = {}) {
    try {
      const res = await fetch(`https://api.cloudflare.com/client/v4${p}`, {
        method, headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      const j = await res.json().catch(() => ({}));
      if (!j.success) return { error: (j.errors || []).map(e => `${e.code}:${e.message}`).join('; ') || `HTTP ${res.status}` };
      return j;
    } catch (e) { return { error: e.message }; }
  }
  async function d1(sql) {
    const r = await cf(`/accounts/${acct}/d1/database/${D1_ID}/query`, { method: 'POST', body: { sql } });
    if (r.error) return { error: r.error };
    return r.result?.[0]?.results || [];
  }
  async function gql(query, variables, tok = aToken) {
    try {
      const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
        method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
      return await res.json();
    } catch (e) { return { errors: [{ message: e.message }] }; }
  }

  const verify = await cf('/user/tokens/verify');
  log('token verify:', JSON.stringify(verify.result || verify.error));

  const zones = await cf('/zones?name=hentaivault.me');
  const zone = zones.result?.[0];
  if (!zone) { log('zone lookup failed:', zones.error); }
  else {
    log('ZONE', JSON.stringify({ id: zone.id, status: zone.status, paused: zone.paused, plan: zone.plan?.name, ns: zone.name_servers, type: zone.type }));
    const z = zone.id;

    const settings = await cf(`/zones/${z}/settings`);
    if (settings.result) {
      const pick = ['ssl', 'always_use_https', 'automatic_https_rewrites', 'min_tls_version', 'security_level', 'browser_check',
        'challenge_ttl', 'cache_level', 'browser_cache_ttl', 'development_mode', 'rocket_loader', 'email_obfuscation',
        'server_side_exclude', 'hotlink_protection', 'http3', 'brotli', 'early_hints', 'always_online', 'ipv6',
        'minify', 'polish', 'mirage', 'h2_prioritization', 'websockets', 'opportunistic_encryption', 'tls_1_3',
        '0rtt', 'security_header', 'waf', 'privacy_pass', 'replace_insecure_js', 'response_buffering', 'sort_query_string_for_cache'];
      const s = {};
      for (const it of settings.result) if (pick.includes(it.id)) s[it.id] = it.value;
      out.cf.settings = s;
      log('SETTINGS', JSON.stringify(s));
    } else log('settings error:', settings.error);

    const dns = await cf(`/zones/${z}/dns_records?per_page=100`);
    if (dns.result) for (const r of dns.result) log('DNS', r.type, r.name, r.proxied ? 'proxied' : 'dns-only', r.type === 'TXT' ? r.content.slice(0, 60) : r.content);
    else log('dns error:', dns.error);

    const bm = await cf(`/zones/${z}/bot_management`);
    log('BOT MANAGEMENT', JSON.stringify(bm.result || bm.error));

    const rulesets = await cf(`/zones/${z}/rulesets`);
    if (rulesets.result) {
      for (const rs of rulesets.result) {
        if (rs.kind === 'managed') { log('RULESET(managed)', rs.phase, rs.name); continue; }
        const full = await cf(`/zones/${z}/rulesets/${rs.id}`);
        log('RULESET', rs.phase, rs.name);
        for (const rule of full.result?.rules || []) {
          log('   rule', JSON.stringify({ enabled: rule.enabled, action: rule.action, expr: rule.expression, desc: rule.description, params: rule.action_parameters }).slice(0, 700));
        }
      }
    } else log('rulesets error:', rulesets.error);

    const pr = await cf(`/zones/${z}/pagerules`);
    log('PAGE RULES', JSON.stringify(pr.result || pr.error).slice(0, 2000));

    const routes = await cf(`/zones/${z}/workers/routes`);
    log('WORKER ROUTES', JSON.stringify(routes.result || routes.error));

    // Firewall / challenge activity against search-engine crawlers (last 7 days)
    const since = new Date(Date.now() - 7 * 864e5).toISOString();
    const until = new Date().toISOString();
    const fw = await gql(`query($z:String!,$s:Time!,$u:Time!){viewer{zones(filter:{zoneTag:$z}){
      all: firewallEventsAdaptiveGroups(limit:50, filter:{datetime_geq:$s, datetime_leq:$u}, orderBy:[count_DESC]){count dimensions{action source ruleId description}}
      bots: firewallEventsAdaptiveGroups(limit:50, filter:{datetime_geq:$s, datetime_leq:$u, userAgent_like:"%Googlebot%"}, orderBy:[count_DESC]){count dimensions{action source clientRequestPath description}}
      bing: firewallEventsAdaptiveGroups(limit:20, filter:{datetime_geq:$s, datetime_leq:$u, userAgent_like:"%bingbot%"}, orderBy:[count_DESC]){count dimensions{action source description}}
    }}}`, { z, s: since, u: until });
    log('FIREWALL', JSON.stringify(fw).slice(0, 6000));

    // What status codes does Googlebot receive? (last 3 days)
    const since3 = new Date(Date.now() - 3 * 864e5).toISOString();
    const gb = await gql(`query($z:String!,$s:Time!,$u:Time!){viewer{zones(filter:{zoneTag:$z}){
      gbStatus: httpRequestsAdaptiveGroups(limit:100, filter:{datetime_geq:$s, datetime_leq:$u, userAgent_like:"%Googlebot%"}, orderBy:[count_DESC]){count dimensions{edgeResponseStatus clientRequestPath}}
      statuses: httpRequestsAdaptiveGroups(limit:30, filter:{datetime_geq:$s, datetime_leq:$u}, orderBy:[count_DESC]){count dimensions{edgeResponseStatus}}
      errPaths: httpRequestsAdaptiveGroups(limit:40, filter:{datetime_geq:$s, datetime_leq:$u, edgeResponseStatus_geq:400}, orderBy:[count_DESC]){count dimensions{edgeResponseStatus clientRequestPath}}
    }}}`, { z, s: since3, u: until });
    log('HTTP STATUS', JSON.stringify(gb).slice(0, 12000));
  }

  // Worker
  const scripts = await cf(`/accounts/${acct}/workers/scripts`);
  if (scripts.result) for (const s of scripts.result) log('WORKER SCRIPT', JSON.stringify({ id: s.id, modified: s.modified_on, compat: s.compatibility_date, usage: s.usage_model, handlers: s.handlers, placement: s.placement_mode }));
  else log('scripts error:', scripts.error);
  const secrets = await cf(`/accounts/${acct}/workers/scripts/${WORKER}/secrets`);
  log('WORKER SECRETS (names only)', JSON.stringify((secrets.result || []).map(s => s.name)), secrets.error || '');
  const settingsW = await cf(`/accounts/${acct}/workers/scripts/${WORKER}/settings`);
  if (settingsW.result) log('WORKER BINDINGS', JSON.stringify((settingsW.result.bindings || []).map(b => ({ name: b.name, type: b.type }))), 'logpush', settingsW.result.logpush, 'observability', JSON.stringify(settingsW.result.observability));
  else log('worker settings error:', settingsW.error);
  const domains = await cf(`/accounts/${acct}/workers/domains`);
  log('WORKER DOMAINS', JSON.stringify((domains.result || []).map(d => ({ hostname: d.hostname, service: d.service, env: d.environment }))), domains.error || '');
  const deps = await cf(`/accounts/${acct}/workers/scripts/${WORKER}/deployments`);
  log('WORKER DEPLOYMENTS', JSON.stringify((deps.result?.deployments || []).slice(0, 5).map(d => ({ at: d.created_on, source: d.source, author: d.author_email, msg: d.annotations?.['workers/message'] }))), deps.error || '');

  // Worker errors by status (last 7 days)
  const since7 = new Date(Date.now() - 7 * 864e5).toISOString();
  const wk = await gql(`query($a:String!,$s:Time!,$u:Time!){viewer{accounts(filter:{accountTag:$a}){
    workersInvocationsAdaptive(limit:50, filter:{datetime_geq:$s, datetime_leq:$u}, orderBy:[sum_requests_DESC]){sum{requests errors subrequests} dimensions{scriptName status}}
  }}}`, { a: acct, s: since7, u: new Date().toISOString() });
  log('WORKER INVOCATIONS', JSON.stringify(wk).slice(0, 4000));

  // D1 content quality (read-only)
  section('D1 CONTENT');
  const queries = {
    tables: "SELECT name, type FROM sqlite_master WHERE type IN ('table','index') ORDER BY name",
    sitesCols: 'PRAGMA table_info(sites)',
    total: 'SELECT COUNT(*) n FROM sites',
    byCategory: 'SELECT category, COUNT(*) n, ROUND(AVG(rating),2) avg_rating FROM sites GROUP BY category ORDER BY n DESC',
    ratingBuckets: 'SELECT CAST(rating AS INT) r, COUNT(*) n FROM sites GROUP BY r ORDER BY r',
    autoDiscovered: `SELECT COUNT(*) n FROM sites WHERE data_json LIKE '%Auto-Discovered%'`,
    discoveredVia: `SELECT COUNT(*) n FROM sites WHERE json_extract(data_json,'$.description') LIKE 'Discovered via%'`,
    deadFlagged: `SELECT COUNT(*) n FROM sites WHERE json_extract(data_json,'$.isDeadFlagged') = 1 OR json_extract(data_json,'$.isUp') = 0`,
    noDescription: `SELECT COUNT(*) n FROM sites WHERE COALESCE(json_extract(data_json,'$.description'),'') = ''`,
    shortDescription: `SELECT COUNT(*) n FROM sites WHERE LENGTH(COALESCE(json_extract(data_json,'$.description'),'')) < 60`,
    withLongReview: `SELECT COUNT(*) n FROM sites WHERE LENGTH(COALESCE(json_extract(data_json,'$.longReview'),'')) > 200`,
    badUrls: `SELECT COUNT(*) n FROM sites WHERE url NOT LIKE 'http%'`,
    riskyTerms: `SELECT id, url, category FROM sites WHERE lower(url || ' ' || data_json) LIKE '%loli%' OR lower(url || ' ' || data_json) LIKE '%shota%' OR lower(url || ' ' || data_json) LIKE '%child%' OR lower(url || ' ' || data_json) LIKE '%jailbait%' OR lower(url || ' ' || data_json) LIKE '%underage%' LIMIT 60`,
    riskyCount: `SELECT COUNT(*) n FROM sites WHERE lower(url || ' ' || data_json) LIKE '%loli%' OR lower(url || ' ' || data_json) LIKE '%shota%' OR lower(url || ' ' || data_json) LIKE '%jailbait%' OR lower(url || ' ' || data_json) LIKE '%underage%'`,
    teenCount: `SELECT COUNT(*) n FROM sites WHERE lower(url) LIKE '%teen%'`,
    addedByMonth: `SELECT substr(added_at,1,7) m, COUNT(*) n FROM sites GROUP BY m ORDER BY m`,
    recent: `SELECT id, url, category, rating, added_at FROM sites ORDER BY added_at DESC LIMIT 15`,
    dupUrls: `SELECT COUNT(*) n FROM (SELECT rtrim(replace(replace(url,'https://',''),'www.',''),'/') u, COUNT(*) c FROM sites GROUP BY u HAVING c > 1)`,
    queue: 'SELECT status, COUNT(*) n FROM queue GROUP BY status',
    reviews: 'SELECT COUNT(*) n FROM reviews',
    top: `SELECT id, url, category, rating FROM sites ORDER BY rating DESC LIMIT 10`,
  };
  out.d1 = {};
  for (const [k, q] of Object.entries(queries)) {
    const r = await d1(q);
    out.d1[k] = r;
    log(`D1 ${k}:`, JSON.stringify(r).slice(0, 5000));
  }
}

(async () => {
  for (const [name, fn] of [['live', liveChecks], ['gsc', gscChecks], ['cf', cfChecks]]) {
    try { await fn(); } catch (e) { log(`${name} check crashed:`, e.stack || e.message); }
  }
  const file = path.join(__dirname, '..', '..', 'reports', 'site-audit.json');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  log('\nwrote', file);
})();
