#!/usr/bin/env node
/**
 * daily-add.js — HentaiVault Daily Site Addition Pipeline
 *
 * Usage:
 *   node scripts/daily-add.js [--count 100] [--dry-run]
 *
 * What it does:
 *   1. Reads the queue from scripts/sites-queue.json
 *   2. Deduplicates against existing js/data.js
 *   3. Picks the next N sites (default: 100)
 *   4. Procedurally enriches each site with multi-language content
 *   5. Appends them to js/data.js
 *   6. Removes them from the queue
 *   7. Regenerates sitemap.xml
 *   8. Commits & pushes everything to GitHub
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const isSiteLive = require('./ping-site');

// ─── Config ─────────────────────────────────────────────────────────────────
const ROOT       = path.resolve(__dirname, '..');
const DATA_FILE  = path.join(ROOT, 'js', 'data.js');
const QUEUE_FILE = path.join(ROOT, 'scripts', 'sites-queue.json');
const SITEMAP_SCRIPT = path.join(ROOT, 'scripts', 'generate_sitemap.py');

const args    = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const COUNT   = parseInt((args[args.findIndex(a => a === '--count') + 1]) || '100', 10) || 100;

// ─── Helpers ────────────────────────────────────────────────────────────────
function readDataJs() {
  const raw   = fs.readFileSync(DATA_FILE, 'utf8').replace(/\r/g, '');
  const match = raw.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse sitesData from data.js');
  const json = match[1].replace(/,\s*([\]}])/g, '$1');
  return JSON.parse(json);
}

function writeToD1(sites) {
  let stmts = [];
  for (const site of sites) {
    const id = site.id || '';
    const category = site.category || '';
    const url = site.url || '';
    const rating = site.rating || 0;
    const addedAt = site.addedAt || '';
    const dataJson = JSON.stringify(site).replace(/'/g, "''"); // Escape single quotes

    stmts.push(`INSERT OR IGNORE INTO sites (id, category, url, rating, added_at, data_json) VALUES ('${id}', '${category.replace(/'/g, "''")}', '${url.replace(/'/g, "''")}', ${rating}, '${addedAt}', '${dataJson}');`);
  }
  
  const sql = stmts.join('\n');
  const sqlFile = path.join(ROOT, 'insert_daily.sql');
  fs.writeFileSync(sqlFile, sql, 'utf8');
  
  console.log(`\n☁️  Executing ${stmts.length} inserts to Cloudflare D1...`);
  try {
    execSync(`npx wrangler d1 execute hv-directory --remote --file=insert_daily.sql`, { cwd: ROOT, stdio: 'inherit' });
    console.log('✅ D1 insertion successful.');
  } catch (e) {
    console.error('❌ D1 insertion failed:', e.message);
    throw e;
  } finally {
    if (fs.existsSync(sqlFile)) fs.unlinkSync(sqlFile);
  }
}

function makeId(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 30);
}

function today() {
  return new Date().toISOString().split('T')[0];
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

  // 1. Load existing data
  const existing    = readDataJs();
  const existingUrls = new Set(existing.map(s => s.url.replace(/\/$/, '').toLowerCase()));
  console.log(`📦 Existing entries: ${existing.length}`);

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
  const fresh = queue.filter(s => !existingUrls.has(s.url.replace(/\/$/, '').toLowerCase()));
  console.log(`✅ New (not in database): ${fresh.length}`);

  if (fresh.length === 0) {
    console.log('⚠️  All queue items already exist in the database. Nothing to add.');
    process.exit(0);
  }

  // 4. Take the next N valid sites by pinging them
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
         // If we already hit COUNT, we leave the valid site in the queue for tomorrow
       } else {
         console.log(`   ❌ ${r.site.url} (Dead/Parked)`);
         deadUrls.add(r.site.url);
       }
    }
  }

  if (batch.length === 0) {
     console.log('⚠️ No live sites found in the entire remaining queue!');
     process.exit(0);
  }

  const enriched = batch.map(enrich);
  console.log(`\n➕ Adding ${enriched.length} new sites`);
  enriched.forEach(s => console.log(`   · ${s.name} (${s.category})`));

  if (DRY_RUN) {
    console.log('\n🔵 Dry-run mode — no files modified.');
    process.exit(0);
  }

  // 5. Insert to D1
  writeToD1(enriched);

  // 6. Remove processed and dead entries from queue (by URL)
  const addedUrls = new Set(batch.map(s => s.url));
  const remaining = queue.filter(s => !addedUrls.has(s.url) && !deadUrls.has(s.url));
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(remaining, null, 2), 'utf8');
  console.log(`📋 Queue remaining: ${remaining.length}`);

  // 7. Regenerate sitemap
  try {
    console.log('\n🗺️  Regenerating sitemap...');
    execSync(`python "${SITEMAP_SCRIPT}"`, { cwd: ROOT, stdio: 'inherit' });
  } catch (e) {
    console.warn('⚠️  Sitemap generation failed (non-fatal):', e.message);
  }

  // 8. Commit & push queue and sitemap (data.js is no longer committed here)
  try {
    console.log('\n📤 Committing to GitHub...');
    execSync('git add sitemap.xml scripts/sites-queue.json', { cwd: ROOT, stdio: 'inherit' });
    execSync(
      `git commit -m "feat(daily): push ${enriched.length} new sites to D1 [${today()}]"`,
      { cwd: ROOT, stdio: 'inherit' }
    );
    execSync('git push', { cwd: ROOT, stdio: 'inherit' });
    console.log(`\n✅ Done! Added ${enriched.length} sites to D1.`);
  } catch (e) {
    console.error('❌ Git error:', e.message);
    process.exit(1);
  }
}

run();
