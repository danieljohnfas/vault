#!/usr/bin/env node
/**
 * daily-add.js — HentaiVault Daily Site Addition Pipeline
 *
 * Usage:
 *   node scripts/daily-add.js [--count 100] [--dry-run]
 *                             [--existing-urls /path/to/urls.json]
 *                             [--output-sql /path/to/output.sql]
 *
 * What it does:
 *   1. Reads the queue from scripts/sites-queue.json
 *   2. Deduplicates against existing URLs (from --existing-urls file or sites-queue itself)
 *   3. Picks the next N sites (default: 100), pinging each to confirm liveness
 *   4. Procedurally enriches each site with multi-language content
 *   5. Writes SQL INSERT statements to --output-sql (or stdout if omitted)
 *   6. Removes processed/dead entries from the queue file
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const isSiteLive = require('./ping-site');

// ─── Config ─────────────────────────────────────────────────────────────────
const ROOT       = path.resolve(__dirname, '..');
const QUEUE_FILE = path.join(ROOT, 'scripts', 'sites-queue.json');

const args    = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const COUNT   = parseInt((args[args.findIndex(a => a === '--count') + 1]) || '100', 10) || 100;

const existingUrlsFlag = args.findIndex(a => a === '--existing-urls');
const EXISTING_URLS_FILE = existingUrlsFlag !== -1 ? args[existingUrlsFlag + 1] : null;

const outputSqlFlag = args.findIndex(a => a === '--output-sql');
const OUTPUT_SQL_FILE = outputSqlFlag !== -1 ? args[outputSqlFlag + 1] : null;

// ─── Helpers ────────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().split('T')[0];
}

function makeId(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 30);
}

function escapeSql(str) {
  return String(str || '').replace(/'/g, "''");
}

function siteToSql(site) {
  const id       = escapeSql(site.id);
  const category = escapeSql(site.category);
  const url      = escapeSql(site.url);
  const rating   = site.rating || 0;
  const addedAt  = escapeSql(site.addedAt || today());
  const dataJson = escapeSql(JSON.stringify(site));
  return `INSERT OR IGNORE INTO sites (id, category, url, rating, added_at, data_json) VALUES ('${id}', '${category}', '${url}', ${rating}, '${addedAt}', '${dataJson}');`;
}

// ─── Procedural Enrichment ──────────────────────────────────────────────────
const CAT_DESCRIPTORS = {
  'Hentai Streaming':       { adj: 'hentai streaming', niche: 'anime adult video' },
  'Anime Streaming':        { adj: 'anime streaming', niche: 'Japanese animation' },
  'Manga & Doujinshi':      { adj: 'manga and doujin', niche: 'Japanese comics and fan works' },
  'Communities & Forums':   { adj: 'community and forum', niche: 'discussion and social' },
  'Adult Tubes & Studios':  { adj: 'adult video', niche: 'premium adult content' },
  'Games & Visual Novels':  { adj: 'adult game and visual novel', niche: 'interactive adult entertainment' },
  'Immersive & Interactive':{ adj: 'immersive VR and interactive', niche: 'virtual reality adult' },
  'Image Boards (Boorus)':  { adj: 'image board and booru', niche: 'anime artwork and illustration' },
  'Downloads & Torrents':   { adj: 'download and torrent', niche: 'file sharing and archiving' },
  'Creator Platforms':      { adj: 'creator and fan platform', niche: 'adult content creator' },
  'default':                { adj: 'adult entertainment', niche: 'adult content' },
};

function getDesc(cat) {
  return CAT_DESCRIPTORS[cat] || CAT_DESCRIPTORS['default'];
}

function enrich(site) {
  const d    = getDesc(site.category);
  const name = site.name;
  const cat  = site.category;
  const id   = makeId(name) + '_' + Date.now().toString(36);
  const dt   = today();
  const rating = site.rating || (4.0 + Math.round(Math.random() * 8) / 10);

  const pros = site.pros || [
    `High quality ${d.niche} content`,
    'Regularly updated library',
    'User-friendly interface',
    'Fast page load speeds',
  ];
  const cons = site.cons || [
    'May contain intrusive ads',
    'Some regions may require a VPN',
  ];

  const longReview =
    `In our comprehensive 2026 audit, ${name} emerged as a top-tier destination for ` +
    `${d.adj} enthusiasts. The platform offers a seamless user experience with high-quality ` +
    `content that is updated frequently. Whether you are a long-time fan or new to ${d.niche}, ` +
    `${name} provides a robust set of features and a massive library that makes it a must-visit ` +
    `in our directory. Our editorial team gave it a score of ${rating.toFixed(1)}/5 based on ` +
    `content variety, load speed, design quality, and community trust signals.`;

  return {
    id,
    name,
    url: site.url,
    category: cat,
    description:
      `${name} is a high-authority platform specializing in ${d.adj}. ` +
      `Our 2026 review found it to be a reliable and high-quality resource for enthusiasts.`,
    addedAt: dt,
    longReview,
    description_es:
      `${name} es una plataforma de alta autoridad especializada en ${d.adj}.`,
    description_jp:
      `${name}は、${d.adj}を専門とする高品質なプラットフォームです。`,
    description_fr:
      `${name} est une plateforme de haute autorité spécialisée en ${d.adj}.`,
    description_pt:
      `${name} é uma plataforma de alta autoridade especializada em ${d.adj}.`,
    description_hi:
      `${name} ${d.adj} में विशेषज्ञता वाला एक उच्च-प्राधिकरण मंच है।`,
    description_ar:
      `${name} منصة ذات سلطة عالية متخصصة في ${d.adj}.`,
    description_de:
      `${name} ist eine renommierte Plattform, die sich auf ${d.adj} spezialisiert hat.`,
    longReview_es:
      `En nuestra auditoría completa de 2026, ${name} emergió como un destino de primer nivel para ${d.adj}. ` +
      `La plataforma ofrece una experiencia de usuario perfecta con contenido de alta calidad actualizado con frecuencia.`,
    longReview_jp:
      `2026年の包括的な監査で、${name}は${d.adj}ファンのための最高レベルの目的地として浮上しました。` +
      `プラットフォームは高品質なコンテンツで優れたユーザー体験を提供しています。`,
    longReview_fr:
      `Dans notre audit complet de 2026, ${name} est apparu comme une destination de premier ordre pour ${d.adj}. ` +
      `La plateforme offre une expérience utilisateur fluide avec un contenu de haute qualité mis à jour fréquemment.`,
    longReview_pt:
      `Em nossa auditoria abrangente de 2026, ${name} emergiu como um destino de primeira linha para ${d.adj}. ` +
      `A plataforma oferece uma experiência de usuário perfeita com conteúdo de alta qualidade atualizado com frequência.`,
    longReview_hi:
      `हमारे व्यापक 2026 ऑडिट में, ${name} ${d.adj} के लिए एक शीर्ष स्तरीय गंतव्य के रूप में उभरा। ` +
      `प्लेटफ़ॉर्म उच्च गुणवत्ता वाली सामग्री के साथ एक सहज उपयोगकर्ता अनुभव प्रदान करता है।`,
    longReview_ar:
      `في تدقيقنا الشامل لعام 2026، برزت ${name} كوجهة من الدرجة الأولى لـ ${d.adj}. ` +
      `توفر المنصة تجربة مستخدم سلسة مع محتوى عالي الجودة يتم تحديثه بشكل متكرر.`,
    longReview_de:
      `Bei unserem umfassenden Audit 2026 erwies sich ${name} als Top-Reiseziel für ${d.adj}. ` +
      `Die Plattform bietet ein nahtloses Benutzererlebnis mit hochwertigen Inhalten, die regelmäßig aktualisiert werden.`,
    rating,
    tags: site.tags || [cat.split(' ')[0], 'Free'],
    pros,
    cons,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\n🚀 HentaiVault Daily Add — ${today()}`);
  console.log(`   Count: ${COUNT}  |  Dry-run: ${DRY_RUN}\n`);

  // 1. Load existing URLs for deduplication
  let existingUrls = new Set();
  if (EXISTING_URLS_FILE && fs.existsSync(EXISTING_URLS_FILE)) {
    const raw = JSON.parse(fs.readFileSync(EXISTING_URLS_FILE, 'utf8'));
    for (const u of raw) {
      existingUrls.add(String(u).replace(/\/$/, '').toLowerCase());
    }
    console.log(`📦 Existing entries in D1: ${existingUrls.size}`);
  } else {
    console.log(`⚠️  No --existing-urls file provided — skipping deduplication against D1.`);
  }

  // 2. Load queue
  if (!fs.existsSync(QUEUE_FILE)) {
    console.error('❌ Queue file not found:', QUEUE_FILE);
    process.exit(1);
  }
  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  console.log(`📋 Queue size: ${queue.length}`);

  if (queue.length === 0) {
    console.log('⚠️  Queue is empty. Nothing to add.');
    process.exit(0);
  }

  // 3. Filter out already-existing URLs
  const fresh = queue.filter(s => !existingUrls.has(String(s.url).replace(/\/$/, '').toLowerCase()));
  console.log(`✅ New (not in D1): ${fresh.length}`);

  if (fresh.length === 0) {
    console.log('⚠️  All queue items already exist in D1. Nothing to add.');
    process.exit(0);
  }

  // 4. Ping to find N live sites
  const batch = [];
  const deadUrls = new Set();

  console.log(`\n🔍 Pinging sites (concurrency=10) to find ${COUNT} valid domains...`);

  for (let i = 0; i < fresh.length; i += 10) {
    if (batch.length >= COUNT) break;

    const chunk = fresh.slice(i, i + 10);
    const results = await Promise.all(chunk.map(async s => {
      return { site: s, live: await isSiteLive(s.url) };
    }));

    for (const r of results) {
      if (r.live) {
        if (batch.length < COUNT) {
          console.log(`   ✅ ${r.site.url}`);
          batch.push(r.site);
        }
      } else {
        console.log(`   ❌ ${r.site.url} (Dead/Parked)`);
        deadUrls.add(r.site.url);
      }
    }
  }

  if (batch.length === 0) {
    console.log('⚠️ No live sites found in the remaining queue!');
    process.exit(0);
  }

  const enriched = batch.map(enrich);
  console.log(`\n➕ Enriched ${enriched.length} new sites`);
  enriched.forEach(s => console.log(`   · ${s.name} (${s.category})`));

  if (DRY_RUN) {
    console.log('\n🔵 Dry-run mode — no files modified.');
    process.exit(0);
  }

  // 5. Write SQL INSERT statements
  const sqlStatements = enriched.map(siteToSql).join('\n');
  if (OUTPUT_SQL_FILE) {
    fs.mkdirSync(path.dirname(OUTPUT_SQL_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_SQL_FILE, sqlStatements, 'utf8');
    console.log(`\n💾 SQL written to ${OUTPUT_SQL_FILE} (${enriched.length} INSERT statements)`);
  } else {
    console.log('\n--- SQL OUTPUT ---');
    console.log(sqlStatements);
    console.log('--- END SQL ---');
  }

  // 6. Remove processed and dead entries from queue
  const addedUrls = new Set(batch.map(s => s.url));
  const remaining = queue.filter(s => !addedUrls.has(s.url) && !deadUrls.has(s.url));
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(remaining, null, 2), 'utf8');
  console.log(`📋 Queue remaining: ${remaining.length} (removed ${queue.length - remaining.length} entries)`);

  console.log(`\n✅ Done! Generated SQL for ${enriched.length} new sites.`);
}

run().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
