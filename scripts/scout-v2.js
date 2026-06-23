#!/usr/bin/env node

/**
 * HentaiVault Advanced Scout V2
 * 
 * Features:
 * 1. Reddit / Social Mining (r/animepiracy, r/hentai)
 * 2. Directory Scraping
 * 3. Deep Social Extraction (Discord/Twitter from HTML)
 * 4. Wayback Machine Trust Scoring
 * 5. Gemini AI Enrichment (if GEMINI_API_KEY is present)
 */

const fs = require('fs');
const path = require('path');

const QUEUE_FILE = path.resolve(__dirname, 'sites-queue.json');

// Subreddits to mine for new URLs
const SUBREDDITS = ['animepiracy', 'hentai', 'nsfwgaming'];
// Directories to scrape
const DIRECTORIES = [
  'https://everythingmoe.com/',
  'https://theindex.moe/',
  'https://www.hentairules.net/index2.html'
];
const BLACKLIST = ['scam', 'phishing', 'casino', 'betting', 'crypto'];

// --- Helper Functions ---
function getExistingUrls() {
  const urls = new Set();
  if (fs.existsSync(QUEUE_FILE)) {
    const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    queue.forEach(s => urls.add(String(s.url).toLowerCase().replace(/\/$/, '')));
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

// --- 1. Reddit Mining ---
async function discoverFromReddit() {
  const discovered = [];
  console.log('🕵️ Mining Reddit for new URLs...');
  for (const sub of SUBREDDITS) {
    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/new.json?limit=100`, {
        headers: { 'User-Agent': 'HV-Scout-Bot/2.0' }
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
  return discovered;
}

// --- 2. Directory Scraping ---
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

// --- 3. Deep HTML & Social Extraction ---
async function validateAndExtract(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const html = await res.text();
    
    // Extract Title
    let title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || new URL(url).hostname;
    title = title.replace(/\s+/g, ' ').trim();

    // Extract Description
    let desc = (html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i) || [])[1] || '';
    if (!desc) desc = (html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i) || [])[1] || '';
    
    // Extract Socials
    const discord = (html.match(/https?:\/\/(?:www\.)?(?:discord\.gg|discordapp\.com\/invite)\/[a-zA-Z0-9-]+/i) || [])[0] || null;
    const twitter = (html.match(/https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[a-zA-Z0-9_]+/i) || [])[0] || null;

    return { title, desc, discord, twitter, live: true };
  } catch (err) {
    return null;
  }
}

// --- 4. Wayback Machine Trust Scoring ---
async function fetchWaybackAge(url) {
  try {
    const res = await fetch(`https://archive.org/wayback/available?url=${url}`);
    if (!res.ok) return 0;
    const data = await res.json();
    if (data.archived_snapshots && data.archived_snapshots.closest) {
      const timestamp = data.archived_snapshots.closest.timestamp; // e.g. "20180415..."
      const year = parseInt(timestamp.substring(0, 4));
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;
      // Boost rating if it's an old domain
      return age > 5 ? 0.4 : (age > 2 ? 0.2 : 0);
    }
  } catch (err) {}
  return 0;
}

// --- 5. AI Enrichment (Gemini API) ---
async function aiEnrich(siteData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return siteData; // Fallback to procedural if no key

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
  if (d.includes('hentai') || d.includes('anime')) return 'Hentai Streaming';
  if (d.includes('manga') || d.includes('doujin')) return 'Manga & Doujinshi';
  if (d.includes('game') || d.includes('play')) return 'Games & Visual Novels';
  if (d.includes('vr')) return 'Immersive & Interactive';
  if (d.includes('booru') || d.includes('chan')) return 'Image Boards (Boorus)';
  if (d.includes('dl') || d.includes('torrent')) return 'Downloads & Torrents';
  if (d.includes('cam') || d.includes('fans')) return 'Creator Platforms';
  return 'Adult Tubes & Studios';
}

// --- Main Pipeline ---
async function run() {
  console.log(`\n🚀 HentaiVault Scout V2 — ${new Date().toISOString().split('T')[0]}`);
  
  const existingUrls = getExistingUrls();
  console.log(`📦 Loaded ${existingUrls.size} existing URLs to deduplicate against.`);

  const redditLinks = await discoverFromReddit();
  const dirLinks = await discoverFromDirectories();
  
  const rawLinks = [...redditLinks, ...dirLinks];
  const uniqueUrls = new Set();
  const candidates = [];
  
  for (const link of rawLinks) {
    const norm = String(link.url).toLowerCase().replace(/\/$/, '');
    if (!existingUrls.has(norm) && !uniqueUrls.has(norm)) {
      uniqueUrls.add(norm);
      candidates.push(link.url);
    }
  }

  console.log(`\n🎯 Found ${candidates.length} unique, brand-new URLs to validate.`);

  const validSites = [];
  let count = 0;

  for (const url of candidates) {
    if (count >= 50) break; // Limit to 50 discoveries per run to avoid spam

    const extracted = await validateAndExtract(url);
    if (!extracted) continue; // Dead or timed out

    console.log(`\n✅ Validated: ${url}`);
    
    const domain = new URL(url).hostname;
    const category = guessCategory(domain, extracted.title);
    const waybackBonus = await fetchWaybackAge(url);
    const baseRating = Math.round((3.8 + Math.random() * 0.7 + waybackBonus) * 10) / 10;
    
    let siteData = {
      name: extracted.title.substring(0, 50),
      url: url,
      category: category,
      description: extracted.desc || `${domain} is a great resource for ${category.toLowerCase()}.`,
      rating: Math.min(baseRating, 5.0),
      tags: ['ScoutV2', 'New'],
      addedAt: new Date().toISOString().split('T')[0]
    };

    if (extracted.discord) siteData.discord = extracted.discord;
    if (extracted.twitter) siteData.twitter = extracted.twitter;

    // Run AI Enrichment
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
  console.error('❌ Fatal error in Scout V2:', err.message);
  process.exit(1);
});
