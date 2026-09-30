#!/usr/bin/env node
/**
 * One-off production operations, driven by ops/tasks.json and run from the
 * "Ops" workflow (which holds the Cloudflare / Search Console credentials).
 *
 * The repository and its Actions logs are public: tasks print status codes and
 * IDs only — never secrets, URLs of removed listings, or account details.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID;
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DB_ID = '3dc06028-c9b1-4e4a-a3c3-11f92209baab';
const WORKER = 'vault';
const ZONE_NAME = 'hentaivault.me';
const INDEXNOW_KEY = '45598f4e24eb4bdf9891e4a106e23298';

async function cf(p, { method = 'GET', body, raw } = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${p}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, ...(raw ? {} : { 'Content-Type': 'application/json' }) },
    body: raw || (body ? JSON.stringify(body) : undefined),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, ok: !!json.success, result: json.result, errors: (json.errors || []).map(e => `${e.code}:${e.message}`) };
}

async function d1(sql, params = []) {
  const r = await cf(`/accounts/${ACCOUNT}/d1/database/${DB_ID}/query`, { method: 'POST', body: { sql, params } });
  if (!r.ok) throw new Error(`D1 ${r.status} ${r.errors.join('; ')}`);
  return r.result[0];
}

async function zoneId() {
  const r = await cf(`/zones?name=${ZONE_NAME}`);
  return r.result && r.result[0] && r.result[0].id;
}

async function gscAuth(scopes) {
  const { google } = require('googleapis');
  const auth = new google.auth.GoogleAuth({ credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON), scopes });
  return { google, auth };
}

const tasks = {
  // Read-only: which listings match the prohibited-content blocklist (IDs + matched term only).
  async 'report-prohibited'() {
    const { PROHIBITED_TERMS, isProhibited } = await import('../../src/prohibited.js');
    const where = PROHIBITED_TERMS.map(() => `instr(lower(url || ' ' || data_json), ?) > 0`).join(' OR ');
    const rows = (await d1(`SELECT id, url, category, data_json FROM sites WHERE ${where}`, PROHIBITED_TERMS)).results;
    for (const r of rows) {
      let d = {};
      try { d = JSON.parse(r.data_json); } catch {}
      const visible = [r.url, d.name, d.description].join(' ').toLowerCase();
      const all = `${r.url} ${r.data_json}`.toLowerCase();
      const term = PROHIBITED_TERMS.find(t => visible.includes(t)) || PROHIBITED_TERMS.find(t => all.includes(t));
      const field = PROHIBITED_TERMS.some(t => r.url.toLowerCase().includes(t)) ? 'url'
        : isProhibited(r.url, d.name, d.description) ? 'name/description' : 'other-json';
      console.log(`  ${r.id} | ${r.category} | term="${term}" | matched in ${field}`);
    }
    console.log(`  total: ${rows.length}`);
  },

  // Deletes exactly the listing IDs given (after they were reviewed via report-prohibited).
  async 'delete-sites'({ ids }) {
    for (const id of ids) {
      const del = await d1('DELETE FROM sites WHERE id = ?', [id]);
      await d1('DELETE FROM reviews WHERE site_id = ?', [id]);
      console.log(`  ${id}: deleted ${del.meta.changes} row(s)`);
    }
  },

  // Executes a SQL file statement by statement (split on "-- statement-break").
  async 'apply-sql'({ file }) {
    const sql = fs.readFileSync(path.join(__dirname, '..', '..', file), 'utf8');
    const statements = sql.split('-- statement-break').map(x => x.replace(/^\s*--.*$/gm, '').trim()).filter(Boolean);
    for (const st of statements) {
      await d1(st);
      console.log(`  ok: ${st.split('\n')[0].slice(0, 80)}`);
    }
  },

  async 'list-triggers'() {
    const r = await d1("SELECT name FROM sqlite_master WHERE type = 'trigger' ORDER BY name");
    console.log(`  triggers: ${r.results.map(x => x.name).join(', ')}`);
  },

  // Proves the database rule works: a prohibited queue insert must be ignored.
  async 'test-prohibited-rule'() {
    await d1(`INSERT OR IGNORE INTO queue (id, url, name, status) VALUES ('rule_selftest', 'https://jailbait-rule-selftest.invalid', 'rule selftest', 'rejected')`);
    const r = await d1(`SELECT COUNT(*) AS n FROM queue WHERE id = 'rule_selftest'`);
    console.log(`  prohibited test row present after insert: ${r.results[0].n} (expected 0)`);
    if (r.results[0].n !== 0) process.exitCode = 1;
  },

  async 'list-worker-secrets'() {
    const r = await cf(`/accounts/${ACCOUNT}/workers/scripts/${WORKER}/secrets`);
    console.log(`  secrets: ${r.ok ? r.result.map(s => s.name).join(', ') : r.errors.join('; ')}`);
  },

  // Attaches a hostname to the Worker as a Custom Domain (creates DNS + certificate).
  async 'add-worker-domain'({ hostname }) {
    const z = await zoneId();
    const r = await cf(`/accounts/${ACCOUNT}/workers/domains`, {
      method: 'PUT', body: { hostname, service: WORKER, environment: 'production', zone_id: z },
    });
    console.log(`  attach ${hostname}: HTTP ${r.status} ${r.ok ? 'ok' : r.errors.join('; ')}`);
  },

  async 'list-worker-domains'() {
    const r = await cf(`/accounts/${ACCOUNT}/workers/domains`);
    console.log(`  domains: ${r.ok ? r.result.filter(d => d.service === WORKER).map(d => d.hostname).join(', ') : r.errors.join('; ')}`);
  },

  async 'gsc-submit-sitemap'({ sitemaps }) {
    const { google, auth } = await gscAuth(['https://www.googleapis.com/auth/webmasters']);
    const wm = google.webmasters({ version: 'v3', auth });
    for (const feedpath of sitemaps) {
      try {
        await wm.sitemaps.submit({ siteUrl: `sc-domain:${ZONE_NAME}`, feedpath });
        console.log(`  submitted ${feedpath}: ok`);
      } catch (e) {
        console.log(`  submit ${feedpath}: ${e.code || ''} ${e.message}`);
      }
    }
  },

  async 'gsc-sitemaps'() {
    const { google, auth } = await gscAuth(['https://www.googleapis.com/auth/webmasters.readonly']);
    const wm = google.webmasters({ version: 'v3', auth });
    const r = await wm.sitemaps.list({ siteUrl: `sc-domain:${ZONE_NAME}` });
    for (const s of r.data.sitemap || []) {
      console.log(`  ${s.path} | downloaded ${s.lastDownloaded} | errors ${s.errors} | ${(s.contents || []).map(c => `${c.submitted} submitted / ${c.indexed} indexed`).join(', ')}`);
    }
  },

  async 'gsc-inspect'({ urls }) {
    const { google, auth } = await gscAuth(['https://www.googleapis.com/auth/webmasters.readonly']);
    const sc = google.searchconsole({ version: 'v1', auth });
    for (const u of urls) {
      try {
        const r = await sc.urlInspection.index.inspect({ requestBody: { inspectionUrl: `https://${ZONE_NAME}${u}`, siteUrl: `sc-domain:${ZONE_NAME}` } });
        const i = r.data.inspectionResult.indexStatusResult;
        console.log(`  ${u} | ${i.coverageState} | fetch ${i.pageFetchState} | last crawl ${i.lastCrawlTime}`);
      } catch (e) { console.log(`  ${u} | error ${e.message}`); }
    }
  },

  // IndexNow (Bing, Yandex, Seznam, Naver). Built from D1 with the same rules as
  // sitemap-sites.xml, because Cloudflare challenges CI runners on HTML/XML paths.
  async 'indexnow'({ staticPaths = [] }) {
    const { isProhibited } = await import('../../src/prohibited.js');
    const rows = (await d1(`SELECT id, url, category, rating,
        json_extract(data_json, '$.name') AS name, json_extract(data_json, '$.description') AS description,
        json_extract(data_json, '$.isUp') AS isUp, json_extract(data_json, '$.isDeadFlagged') AS dead,
        json_extract(data_json, '$.tags') AS tags FROM sites`)).results;
    const indexable = rows.filter(r => {
      try {
        const u = new URL(r.url);
        return !isProhibited(r.url, r.name, r.description) && r.isUp !== 0 && r.dead !== 1 && Number(r.rating) >= 3.5
          && r.category !== 'Adult Tubes & Studios' && !String(r.tags || '').includes('Auto-Discovered')
          && u.pathname.replace(/\/+$/, '') === '' && !u.search;
      } catch { return false; }
    });
    const urls = [...staticPaths.map(p => `https://${ZONE_NAME}${p}`),
      ...indexable.map(r => `https://${ZONE_NAME}/site?id=${encodeURIComponent(r.id)}`)];
    console.log(`  urls: ${urls.length} (${indexable.length} listings)`);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: ZONE_NAME, key: INDEXNOW_KEY, keyLocation: `https://${ZONE_NAME}/${INDEXNOW_KEY}.txt`, urlList: urls.slice(0, 10000) }),
    });
    console.log(`  IndexNow: HTTP ${res.status}`);
  },

  // Live checks from the runner (Cloudflare may challenge CI IPs on some paths).
  async 'live-check'({ paths }) {
    for (const p of paths) {
      try {
        const res = await fetch(`https://${ZONE_NAME}${p}`, { redirect: 'manual' });
        const body = await res.text();
        const title = (body.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
        const locs = (body.match(/<loc>/g) || []).length;
        console.log(`  ${p} | ${res.status} | ${res.headers.get('location') || ''} | robots=${res.headers.get('x-robots-tag') || '-'} | ends_html=${/<\/html>\s*$/i.test(body)} | title="${title.slice(0, 60)}"${locs ? ` | locs=${locs}` : ''}`);
      } catch (e) { console.log(`  ${p} | error ${e.message}`); }
    }
  },
};

(async () => {
  const list = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'ops', 'tasks.json'), 'utf8'));
  for (const t of list) {
    console.log(`\n== ${t.task}`);
    try { await tasks[t.task](t); } catch (e) { console.log(`  FAILED: ${e.message}`); process.exitCode = 1; }
  }
})();
