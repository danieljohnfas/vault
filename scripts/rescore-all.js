/**
 * rescore-all.js — HentaiVault Full Directory Re-Score
 *
 * Pulls every site ever encountered (D1 + queue), scores each one
 * using score-site.js, then generates SQL to update/delete D1 entries
 * and rewrites sites-queue.json to only contain 4.0+ survivors.
 *
 * Usage: node scripts/rescore-all.js
 * Output: scripts/rescore-results.sql  (apply to D1 when done)
 *         scripts/sites-queue.json      (rewritten in-place)
 *         tmp/rescore-log.json          (full signal log)
 */

'use strict';

process.on('uncaughtException', (err) => {
  if (err.message && (err.message.includes('other side closed') || err.message.includes('socket'))) {
    // Ignore Undici HTTP/2 socket errors that crash the process
    return;
  }
  console.error('Unhandled Exception:', err);
});

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { scoreSite } = require('./score-site');

const ROOT       = path.resolve(__dirname, '..');
const QUEUE_FILE = path.join(__dirname, 'sites-queue.json');
const TMP_DIR    = path.join(ROOT, 'tmp');
const OUT_SQL    = path.join(__dirname, 'rescore-results.sql');
const LOG_FILE   = path.join(TMP_DIR, 'rescore-log.json');
const DB_DUMP    = path.join(TMP_DIR, 'rescore-db-dump.json');

const MIN_RATING = 4.0;
const CONCURRENCY = 8; // parallel site evaluations

function escapeSql(str) {
  return String(str || '').replace(/'/g, "''");
}

function today() {
  return new Date().toISOString().split('T')[0];
}

async function runInChunks(items, fn, concurrency) {
  let results = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      results = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
      console.log(`   Found existing checkpoint: ${results.length} sites already scored.`);
    } catch (e) {
      console.log('   Starting fresh (could not parse existing log).');
    }
  }

  const remaining = items.slice(results.length);
  if (remaining.length === 0) return results;

  for (let i = 0; i < remaining.length; i += concurrency) {
    const chunk = remaining.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(fn));
    results.push(...chunkResults);
    
    // Save checkpoint
    fs.writeFileSync(LOG_FILE, JSON.stringify(results, null, 2), 'utf8');

    const totalDone = results.length;
    const pct = Math.min(100, Math.round((totalDone / items.length) * 100));
    process.stdout.write(`\r   ⏳ Progress: ${totalDone}/${items.length} (${pct}%)`);
  }
  console.log('');
  return results;
}

async function run() {
  console.log(`\n🔬 HentaiVault Full Re-Score — ${today()}`);
  console.log(`   Minimum rating to survive: ${MIN_RATING} stars\n`);

  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  // ── 1. Fetch all current D1 sites ────────────────────────────────────────
  console.log('📦 Fetching all sites from D1...');
  try {
    execSync(
      `npx wrangler d1 execute hv-directory --remote --command="SELECT id, url, category, rating, data_json FROM sites;" --json > "${DB_DUMP}"`,
      { stdio: 'pipe' }
    );
  } catch (e) {
    console.error('❌ Failed to fetch D1 sites:', e.message);
    process.exit(1);
  }
  const rawDb = JSON.parse(fs.readFileSync(DB_DUMP, 'utf8'));
  const dbSites = rawDb?.[0]?.results || [];
  console.log(`   Loaded ${dbSites.length} sites from D1.`);

  // ── 2. Load queue ─────────────────────────────────────────────────────────
  const queue = fs.existsSync(QUEUE_FILE)
    ? JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'))
    : [];
  console.log(`   Loaded ${queue.length} sites from queue.\n`);

  // ── 3. Build unified deduped list ─────────────────────────────────────────
  const seenUrls = new Map(); // url → { source, id?, category, name, data_json? }

  for (const s of dbSites) {
    const norm = String(s.url).toLowerCase().replace(/\/$/, '');
    if (!seenUrls.has(norm)) {
      let parsed = {};
      try { parsed = JSON.parse(s.data_json); } catch {}
      seenUrls.set(norm, {
        source: 'db',
        id: s.id,
        url: s.url,
        category: s.category,
        name: parsed.name || s.url,
        currentRating: s.rating,
        data_json: s.data_json,
      });
    }
  }

  for (const s of queue) {
    const norm = String(s.url).toLowerCase().replace(/\/$/, '');
    if (!seenUrls.has(norm)) {
      seenUrls.set(norm, {
        source: 'queue',
        id: null,
        url: s.url,
        category: s.category || 'Adult Tubes & Studios',
        name: s.name || s.url,
        currentRating: s.rating || 0,
        queueEntry: s,
      });
    }
  }

  const allSites = Array.from(seenUrls.values());
  console.log(`🎯 Total unique sites to score: ${allSites.length}\n`);
  console.log('⚠️  This will take ~90 minutes. Sit back.\n');

  // ── 4. Score every site ───────────────────────────────────────────────────
  console.log('🔬 Scoring all sites (live fetch + Wayback API)...');
  const scored = await runInChunks(allSites, async (site) => {
    const { score, signals } = await scoreSite(site.url, site.category, site.name);
    return { ...site, newScore: score, signals };
  }, CONCURRENCY);

  console.log(`\n💾 Full signal log saved to: ${LOG_FILE}\n`);

  // ── 5. Split into keep / drop ─────────────────────────────────────────────
  const keep   = scored.filter(s => s.newScore >= MIN_RATING);
  const drop   = scored.filter(s => s.newScore <  MIN_RATING);

  const keepFromDb    = keep.filter(s => s.source === 'db');
  const keepFromQueue = keep.filter(s => s.source === 'queue');
  const dropFromDb    = drop.filter(s => s.source === 'db');

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Keep (≥${MIN_RATING}★): ${keep.length}  (${keepFromDb.length} already in DB, ${keepFromQueue.length} new from queue)`);
  console.log(`   ❌ Drop (<${MIN_RATING}★): ${drop.length}  (${dropFromDb.length} to delete from DB)\n`);

  // ── 6. Generate SQL ───────────────────────────────────────────────────────
  const sqlLines = [
    `-- HentaiVault Re-Score Results — ${today()}`,
    `-- Sites to UPDATE (rating refresh): ${keepFromDb.length}`,
    `-- Sites to INSERT (new from queue): ${keepFromQueue.length}`,
    `-- Sites to DELETE (scored < ${MIN_RATING}): ${dropFromDb.length}`,
    '',
  ];

  // UPDATE ratings for existing DB sites that pass
  for (const s of keepFromDb) {
    sqlLines.push(
      `UPDATE sites SET rating = ${s.newScore} WHERE id = '${escapeSql(s.id)}';`
    );
  }

  // INSERT new sites from queue that now pass
  for (const s of keepFromQueue) {
    const q = s.queueEntry;
    const id = escapeSql(q.id || (q.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30) + '_' + Date.now().toString(36));
    const cat = escapeSql(s.category);
    const url = escapeSql(s.url);
    const dataJson = escapeSql(JSON.stringify({ ...q, rating: s.newScore, addedAt: today() }));
    sqlLines.push(
      `INSERT OR IGNORE INTO sites (id, category, url, rating, added_at, data_json) VALUES ('${id}', '${cat}', '${url}', ${s.newScore}, '${today()}', '${dataJson}');`
    );
  }

  // DELETE low-scoring DB entries
  if (dropFromDb.length > 0) {
    const ids = dropFromDb.map(s => `'${escapeSql(s.id)}'`);
    // Batch into chunks of 500
    for (let i = 0; i < ids.length; i += 500) {
      const batch = ids.slice(i, i + 500);
      sqlLines.push(`DELETE FROM sites WHERE id IN (${batch.join(', ')});`);
    }
  }

  sqlLines.push('', `SELECT COUNT(*) as final_site_count FROM sites;`);
  fs.writeFileSync(OUT_SQL, sqlLines.join('\n'), 'utf8');
  console.log(`✅ SQL written to: ${OUT_SQL}`);

  // ── 7. Rewrite queue — keep only 4.0+ queue survivors (not in DB) ─────────
  const newQueue = keepFromQueue.map(s => s.queueEntry);
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(newQueue, null, 2), 'utf8');
  console.log(`✅ Queue rewritten: ${newQueue.length} sites retained.`);

  // ── 8. Summary ────────────────────────────────────────────────────────────
  const dropReasons = {
    dead:       drop.filter(s => !s.signals.alive).length,
    tooNew:     drop.filter(s => s.signals.alive && s.signals.ageYears < 0.5).length,
    noContent:  drop.filter(s => s.signals.alive && s.signals.contentPoints < 0.4).length,
    other:      drop.filter(s => s.signals.alive && s.signals.ageYears >= 0.5 && s.signals.contentPoints >= 0.4).length,
  };

  console.log(`\n📋 Drop Breakdown:`);
  console.log(`   Dead/unreachable:   ${dropReasons.dead}`);
  console.log(`   Too new (<6 months): ${dropReasons.tooNew}`);
  console.log(`   Thin content:       ${dropReasons.noContent}`);
  console.log(`   Low overall score:  ${dropReasons.other}`);
  console.log(`\n🏁 Done. Now run:`);
  console.log(`   npx wrangler d1 execute hv-directory --remote --file=scripts/rescore-results.sql`);
}

run().catch(e => {
  console.error('❌ Fatal error:', e.message);
  process.exit(1);
});
