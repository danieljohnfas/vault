#!/usr/bin/env node

/**
 * HentaiVault Advanced Scout V3
 * 
 * Features:
 * 1. Web Spidering (Crawls existing DB for outbound links)
 * 2. Reddit / Social Mining (Expanded Subreddits)
 * 3. Directory Scraping
 * 4. Deep Social Extraction (Discord/Twitter from HTML)
 * 5. Wayback Machine Trust Scoring
 * 6. Gemini AI Enrichment (if GEMINI_API_KEY is present)
 */

const fs = require('fs');
const path = require('path');
const { scoreSite } = require('./score-site');

const QUEUE_FILE = path.resolve(__dirname, 'sites-queue.json');

// Subreddits to mine for new URLs — hentai & anime focused only
const SUBREDDITS = [
  'animepiracy',       // main anime/hentai piracy hub
  'hentai',            // hentai content & site recommendations
  'doujinshi',         // doujin & manga community
  'HentaiGames',       // hentai & eroge games
  'animedubs',         // anime streaming/dub discussions
  'manga',             // manga readers
  'visualnovels',      // visual novel & eroge community
  'animesuggest'       // anime recommendations, surfaces streaming sites
];
// Directories to scrape
const DIRECTORIES = [
  'https://everythingmoe.com/',
  'https://theindex.moe/',
  'https://www.hentairules.net/index2.html'
];
const BLACKLIST = ['scam', 'phishing', 'casino', 'betting', 'crypto'];

// Domains that produce junk entries — blocked at scout stage
const DOMAIN_BLACKLIST = [
  // Non-adult platforms
  'eneba.com', 'steampowered.com', 'scribd.com', 'animeonegai.com',
  'securities.dmm.com', 'zerotolerance.com',
  // Document / PDF hosts
  'docs.google.com', 'drive.google.com', 'dropbox.com', 'mega.nz',
  // News, blogs, non-site content
  'medium.com', 'substack.com', 'wordpress.com', 'blogspot.com',
  // Social / app stores
  'apps.apple.com', 'play.google.com', 'chrome.google.com',
  // Tracking / redirect links that are not real sites
  'zline0.com',
];

// URL path patterns that indicate an individual content page, not a site homepage
const JUNK_PATH_PATTERNS = [
  /\.pdf($|\?)/i,
  /\/videos?\//i,
  /\/bucetas?\//i,
  /\/document\//i,
  /\/curator\//i,
  /\/news\//i,
  /\/policy\//i,
  /anti.?trafficking/i,
  /\/hub\/news/i,
  /\/performance\/?$/i,
  /itch\.io\/[^/]+\//i,   // itch.io individual game subpages
];

function isJunkUrl(url) {
  try {
    const u = new URL(url);
    const domain = u.hostname.toLowerCase().replace(/^www\./, '');
    // Block blacklisted domains
    if (DOMAIN_BLACKLIST.some(d => domain === d || domain.endsWith('.' + d))) return true;
    // Block junk path patterns
    if (JUNK_PATH_PATTERNS.some(p => p.test(url))) return true;
    // Block deep sub-paths (more than 2 path segments = individual content, not a site)
    const segments = u.pathname.split('/').filter(Boolean);
    if (segments.length > 2) return true;
    return false;
  } catch {
    return true;
  }
}

// --- Helper Functions ---
function getExistingUrls() {
  const urls = new Set();
  
  // 1. From Queue File
  if (fs.existsSync(QUEUE_FILE)) {
    const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    queue.forEach(s => urls.add(String(s.url).toLowerCase().replace(/\/$/, '')));
  }
  
  // 2. From D1 Export File (via arg)
  const existingFlag = process.argv.findIndex(a => a === '--existing-urls');
  const existingFile = existingFlag !== -1 ? process.argv[existingFlag + 1] : null;
  if (existingFile && fs.existsSync(existingFile)) {
    const raw = JSON.parse(fs.readFileSync(existingFile, 'utf8'));
    raw.forEach(u => {
      const urlStr = typeof u === 'string' ? u : u.url;
      if (urlStr) urls.add(String(urlStr).toLowerCase().replace(/\/$/, ''));
    });
  }
  
  return urls;
}

function isValidUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    const domain = u.hostname.toLowerCase();
    // Exclude common non-directory targets
    if (['youtube.com', 'reddit.com', 'twitter.com', 'x.com', 'google.com', 'github.com', 'imgur.com', 'discord.gg', 'discord.com', 'bsky.app', 'airvpn.org', 'wikipedia.org'].some(d => domain.includes(d))) return false;
    if (BLACKLIST.some(b => url.toLowerCase().includes(b))) return false;
    return true;
  } catch {
    return false;
  }
}

// --- 1. Web Spidering ---
async function discoverFromSpidering(existingUrlSet) {
  const discovered = [];
  console.log('🕸️ Spidering existing database links to find related networks...');
  
  const allExisting = Array.from(existingUrlSet).filter(u => u.startsWith('http'));
  if (allExisting.length === 0) return discovered;
  
  // Pick 20 random URLs to crawl
  const targets = allExisting.sort(() => 0.5 - Math.random()).slice(0, 20);

  for (const t of targets) {
    try {
      const res = await fetch(t, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const html = await res.text();
      const urls = html.match(/href="https?:\/\/[^"]+"/g) || [];
      
      let found = 0;
      urls.map(u => u.replace('href="', '').replace('"', ''))
          .filter(isValidUrl)
          .forEach(u => {
            discovered.push({ url: u, source: 'spider' });
            found++;
          });
      console.log(`   - Spidered ${t} -> found ${found} outbound valid links`);
    } catch (err) {
      // Silently ignore timeout or network errors on crawled sites
    }
  }
  return discovered;
}

// --- 2. Reddit Mining (Subreddits & Global Search) ---
const REDDIT_QUERIES_POOL = [
  // ── Hentai Streaming & Watching ────────────────────────────────────────────
  'watch hentai online', 'best hentai streaming site', 'hentai site recommendation',
  'uncensored hentai stream', 'hentai subbed site', 'hentai dubbed online',
  'free hentai streaming', 'hentai OVA online', 'hentai series watch',
  'hentai tube site', 'hentai video site', 'best hentai site 2024', 'best hentai site 2025',

  // ── Anime Streaming ────────────────────────────────────────────────────────
  'best anime streaming site', 'free anime streaming', 'watch anime online free',
  'crunchyroll alternative', 'funimation alternative', 'anime site recommendation',
  'legal anime streaming', 'anime streaming with subtitles', 'new anime site',
  'watch ecchi anime online', 'ecchi anime streaming site', 'anime piracy site',
  'fansub site', 'anime streaming alternative reddit',

  // ── Manga & Doujinshi ──────────────────────────────────────────────────────
  'read hentai manga online', 'doujinshi site recommendation', 'hentai manga english',
  'best doujin reader', 'nhentai alternative', 'fakku alternative',
  'read doujin free', 'hentai manga download', 'doujinshi download site',
  'best manga reader site', 'read manga online free', 'manga site recommendation',
  'manga reader alternative', 'free webtoon reader', 'hentai comic site',
  'comiket online', 'japanese adult comics english',

  // ── Hentai & Eroge Games ───────────────────────────────────────────────────
  'hentai game site', 'eroge download site', 'visual novel hentai',
  'best hentai games site', 'nutaku alternative', 'f95zone alternative',
  'hentai visual novel download', 'eroge site recommendation',
  'anime adult game', 'hentai RPG site', 'hentai game review site',
  'hentai doujin game download', 'ren\'py adult game site',

  // ── Image Boards & Art ─────────────────────────────────────────────────────
  'hentai booru site', 'rule34 anime site', 'gelbooru alternative',
  'danbooru alternative', 'pixiv alternative', 'hentai image board',
  'hentai gallery site', 'anime fanart booru', 'hentai artist site',
  'nsfw anime art site', 'hentai wallpaper site', 'konachan alternative',

  // ── JAV (anime-adjacent) ───────────────────────────────────────────────────
  'jav streaming site', 'best jav site', 'jav site recommendation',

  // ── Downloads & Torrents ───────────────────────────────────────────────────
  'hentai torrent site', 'anime torrent site', 'nyaa alternative',
  'hentai download site', 'anime download site', 'doujin torrent',
  'anime archive site', 'hentai archive download',

  // ── Communities & Databases ────────────────────────────────────────────────
  'anime database site', 'myanimelist alternative', 'anilist alternative',
  'hentai review site', 'hentai directory', 'anime community site',
  'anime forum recommendation', 'anime news site',

  // ── VR & Interactive Hentai ────────────────────────────────────────────────
  'vr hentai site', 'interactive hentai site', '3d hentai site',
];

async function discoverFromReddit() {
  const discovered = [];
  console.log('🕵️ Mining Reddit for new URLs...');
  
  for (const sub of SUBREDDITS) {
    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/new.json?limit=100`, {
        headers: { 'User-Agent': 'HV-Scout-Bot/3.0' }
      });
      if (!res.ok) continue;
      const data = await res.json();
      for (const post of data.data.children) {
        const text = (post.data.selftext || '') + ' ' + (post.data.url || '');
        const urls = text.match(/https?:\/\/[^\s"'()]+/g) || [];
        urls.filter(isValidUrl).forEach(u => discovered.push({ url: u, source: `r/${sub}` }));
      }
    } catch (err) {
      console.log(`Failed to mine r/${sub}: ${err.message}`);
    }
  }

  const selectedQueries = REDDIT_QUERIES_POOL.sort(() => 0.5 - Math.random()).slice(0, 8);
  console.log(`🌍 Combing Reddit Search for ${selectedQueries.length} random keyword combinations...`);
  
  for (const query of selectedQueries) {
    try {
      const res = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=week&limit=100`, {
        headers: { 'User-Agent': 'HV-Scout-Bot/3.0' }
      });
      if (!res.ok) continue;
      const data = await res.json();
      for (const post of data.data.children) {
        const text = (post.data.selftext || '') + ' ' + (post.data.url || '');
        const urls = text.match(/https?:\/\/[^\s"'()]+/g) || [];
        urls.filter(isValidUrl).forEach(u => discovered.push({ url: u, source: `reddit_search` }));
      }
    } catch (err) {
      console.log(`Failed to search Reddit for "${query}": ${err.message}`);
    }
  }
  
  return discovered;
}

// --- 3. Directory Scraping ---
async function discoverFromDirectories() {
  const discovered = [];
  console.log('🕸️ Scraping known directories...');
  for (const dir of DIRECTORIES) {
    try {
      const res = await fetch(dir, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) continue;
      const html = await res.text();
      const urls = html.match(/href="https?:\/\/[^"]+"/g) || [];
      urls.map(u => u.replace('href="', '').replace('"', '')).filter(isValidUrl).forEach(u => discovered.push({ url: u, source: 'directory' }));
    } catch (err) {
      console.log(`Failed to scrape ${dir}: ${err.message}`);
    }
  }
  return discovered;
}

// --- Deep HTML & Social Extraction ---
async function validateAndExtract(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const html = await res.text();
    
    let title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || new URL(url).hostname;
    title = title.replace(/\s+/g, ' ').trim();

    let desc = (html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i) || [])[1] || '';
    if (!desc) desc = (html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i) || [])[1] || '';
    
    const discord = (html.match(/https?:\/\/(?:www\.)?(?:discord\.gg|discordapp\.com\/invite)\/[a-zA-Z0-9-]+/i) || [])[0] || null;
    const twitter = (html.match(/https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[a-zA-Z0-9_]+/i) || [])[0] || null;

    return { title, desc, discord, twitter, live: true };
  } catch (err) {
    return null;
  }
}

// --- Wayback Machine Trust Scoring ---
async function fetchWaybackAge(url) {
  try {
    const res = await fetch(`https://archive.org/wayback/available?url=${url}`);
    if (!res.ok) return 0;
    const data = await res.json();
    if (data.archived_snapshots && data.archived_snapshots.closest) {
      const timestamp = data.archived_snapshots.closest.timestamp; 
      const year = parseInt(timestamp.substring(0, 4));
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;
      return age > 5 ? 0.4 : (age > 2 ? 0.2 : 0);
    }
  } catch (err) {}
  return 0;
}

// --- AI Enrichment (Gemini API) ---
async function aiEnrich(siteData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return siteData; 

  console.log(`   🤖 Enhancing with Gemini AI for ${siteData.name}...`);
  try {
    const prompt = `You are an SEO expert. Write an engaging English description and a 'longReview' for an adult entertainment directory site.
    Site Name: ${siteData.name}
    URL: ${siteData.url}
    Meta Description: ${siteData.description}
    Return ONLY a JSON object with this exact format, nothing else:
    {"description": "A 1-2 sentence snappy intro", "longReview": "A detailed 3-4 sentence review mentioning features, speed, and library."}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const json = await res.json();
    const textResp = json.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(textResp.replace(/```json/g, '').replace(/```/g, '').trim());
    
    siteData.description = parsed.description || siteData.description;
    if (parsed.longReview) siteData.longReview = parsed.longReview;
    siteData.tags.push("AI-Enhanced");
  } catch (e) {
    console.log(`   ⚠️ AI Enrichment failed: ${e.message}`);
  }
  return siteData;
}

function guessCategory(domain, title) {
  const d = (domain + ' ' + title).toLowerCase();
  if (d.includes('hentai')) return 'Hentai Streaming';
  if (d.includes('doujin') || d.includes('manga') || d.includes('nhentai') || d.includes('fakku')) return 'Manga & Doujinshi';
  if (d.includes('anime') && !d.includes('hentai')) return 'Anime Streaming';
  if (d.includes('booru') || d.includes('gelbooru') || d.includes('danbooru') || d.includes('rule34') || d.includes('safebooru')) return 'Image Boards (Boorus)';
  if (d.includes('torrent') || d.includes('nyaa') || d.includes('download') || d.includes('dl.')) return 'Downloads & Torrents';
  if (d.includes('visual novel') || d.includes('eroge') || d.includes('nutaku') || d.includes('f95')) return 'Games & Visual Novels';
  if (d.includes('game') || d.includes('play') || d.includes('itch.io')) return 'Games & Visual Novels';
  if (d.includes('vr') || d.includes('interactive') || d.includes('360')) return 'Immersive & Interactive';
  if (d.includes('cam') || d.includes('onlyfans') || d.includes('fansly') || d.includes('patreon') || d.includes('fans')) return 'Creator Platforms';
  if (d.includes('forum') || d.includes('community') || d.includes('discord') || d.includes('reddit')) return 'Communities & Forums';
  // Only fall back to Adult Tubes if the domain/title is clearly adult video
  if (d.includes('tube') || d.includes('porn') || d.includes('xxx') || d.includes('xnxx') || d.includes('xvideos') || d.includes('jav')) return 'Adult Tubes & Studios';
  // Unknown — return null to signal this entry should be skipped rather than miscategorised
  return null;
}

// --- Main Pipeline ---
async function run() {
  console.log(`\n🚀 HentaiVault Scout V3 — ${new Date().toISOString().split('T')[0]}`);
  
  const existingUrls = getExistingUrls();
  console.log(`📦 Loaded ${existingUrls.size} existing URLs to deduplicate against.`);

  const spiderLinks = await discoverFromSpidering(existingUrls);
  const redditLinks = await discoverFromReddit();
  const dirLinks = await discoverFromDirectories();
  
  const rawLinks = [...spiderLinks, ...redditLinks, ...dirLinks];
  const uniqueUrls = new Set();
  const candidates = [];
  
  for (const link of rawLinks) {
    const norm = String(link.url).toLowerCase().replace(/\/$/, '');
    if (!existingUrls.has(norm) && !uniqueUrls.has(norm) && !isJunkUrl(link.url)) {
      uniqueUrls.add(norm);
      candidates.push(link.url);
    }
  }

  console.log(`\n🎯 Found ${candidates.length} unique, brand-new URLs to validate.`);

  const validSites = [];
  let count = 0;

  for (const url of candidates) {
    if (count >= 200) break; // Increased limit to 200 discoveries per run

    const extracted = await validateAndExtract(url);
    if (!extracted) continue; 

    console.log(`\n✅ Validated: ${url}`);
    
    const domain = new URL(url).hostname;
    const category = guessCategory(domain, extracted.title);

    // Skip entries we cannot reliably categorise — better to miss than to pollute
    if (!category) {
      console.log(`   ⏭️  Skipped (unknown category): ${url}`);
      continue;
    }

    // Skip entries whose title looks like an article/video headline rather than a site name
    const titleWordCount = extracted.title.trim().split(/\s+/).length;
    if (titleWordCount > 8 || extracted.title.length > 70) {
      console.log(`   ⏭️  Skipped (title looks like content, not a site): "${extracted.title.substring(0, 60)}..."`);
      continue;
    }

    // ── Real quality scoring (replaces random formula) ──
    const { score, signals } = await scoreSite(url, category, extracted.title);

    if (score < 4.0) {
      console.log(`   ⏭️  Skipped (score ${score} < 4.0 — age:${signals.ageYears}yr, content:${signals.contentPoints}, adult:${signals.hasAdultSignals}): ${url}`);
      continue;
    }

    console.log(`   ⭐ Score ${score}/5.0 — adding to queue: ${url}`);

    let siteData = {
      name: extracted.title.substring(0, 50),
      url: url,
      category: category,
      description: extracted.desc || `${domain} is a great resource for ${category.toLowerCase()}.`,
      rating: score,
      tags: ['ScoutV3', 'New'],
      addedAt: new Date().toISOString().split('T')[0],
      scoreSignals: signals,
    };

    if (extracted.discord) siteData.discord = extracted.discord;
    if (extracted.twitter) siteData.twitter = extracted.twitter;

    siteData = await aiEnrich(siteData);

    validSites.push(siteData);
    count++;
  }

  if (validSites.length > 0) {
    let queue = [];
    if (fs.existsSync(QUEUE_FILE)) queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    queue.push(...validSites);
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
    console.log(`\n💾 Saved ${validSites.length} crazy new sites to queue! Queue size: ${queue.length}`);
  } else {
    console.log(`\n⚠️ No new valid sites found today.`);
  }
}

run().catch(err => {
  console.error('❌ Fatal error in Scout V3:', err.message);
  process.exit(1);
});
