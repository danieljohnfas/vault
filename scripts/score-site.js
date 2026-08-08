/**
 * score-site.js — HentaiVault Real Quality Scoring Engine
 *
 * Scores a site URL from 0.0 to 5.0 based on real measurable signals.
 * Used by Scout V3, daily-add, and the one-time rescore pipeline.
 *
 * Scoring Breakdown (max 5.0):
 *   Base (if live):     1.5
 *   Domain Age:         0 – 1.5  (Wayback Machine)
 *   Page Content:       0 – 1.0  (fetched homepage analysis)
 *   HTTPS:              0.3
 *   Category Match:     0 – 0.5
 *   Clean URL:          0.2
 */

'use strict';

const WAYBACK_DELAY_MS = 600; // be polite to archive.org

// --- Wayback Machine Domain Age ---
async function getWaybackAgeYears(url) {
  try {
    const domain = new URL(url).hostname;
    const apiUrl = `http://archive.org/wayback/available?url=${encodeURIComponent(domain)}&timestamp=20100101`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return 0;
    const data = await res.json();
    if (data?.archived_snapshots?.closest?.timestamp) {
      const ts = data.archived_snapshots.closest.timestamp; // e.g. "20130415123456"
      const year = parseInt(ts.substring(0, 4), 10);
      const month = parseInt(ts.substring(4, 6), 10);
      const firstSeen = new Date(year, month - 1, 1);
      const ageMs = Date.now() - firstSeen.getTime();
      return ageMs / (1000 * 60 * 60 * 24 * 365);
    }
    return 0;
  } catch {
    return 0;
  }
}

function ageToPoints(years) {
  if (years >= 5) return 1.5;
  if (years >= 2) return 1.0;
  if (years >= 1) return 0.6;
  if (years >= 0.5) return 0.3;
  return 0;
}

// --- Page Content Quality ---
const ADULT_KEYWORDS = [
  'hentai', 'doujin', 'manga', 'anime', 'nsfw', 'adult', 'porn', 'xxx',
  'nude', 'erotic', 'uncensored', 'lewd', 'ecchi', 'booru', 'jav',
  'rule34', 'gelbooru', 'nhentai', 'fakku', 'hanime', 'danbooru'
];

const PARKING_PHRASES = [
  'buy this domain', 'domain for sale', 'sedo', 'hugedomains',
  'domain is parked', 'domain parked', 'related searches',
  'this domain may be for sale', 'inquire about this domain'
];

async function analyzePageContent(url) {
  const signals = {
    alive: false,
    hasTitle: false,
    bodySize: 0,
    hasNavLinks: false,
    isParked: false,
    hasAdultSignals: false,
    metaDesc: '',
  };

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok && res.status !== 403 && res.status !== 503) {
      return signals; // dead
    }

    signals.alive = true;

    if (res.status === 403 || res.status === 503) {
      // Likely Cloudflare protected — assume decent content
      signals.hasTitle = true;
      signals.bodySize = 50000;
      signals.hasNavLinks = true;
      signals.hasAdultSignals = true;
      return signals;
    }

    const text = await res.text();
    const lower = text.toLowerCase();

    signals.bodySize = text.length;
    signals.hasTitle = /<title[^>]*>[^<]{3,}<\/title>/i.test(text);
    signals.hasNavLinks = (text.match(/href="https?:\/\//g) || []).length >= 5;
    signals.isParked = PARKING_PHRASES.some(p => lower.includes(p));
    signals.hasAdultSignals = ADULT_KEYWORDS.some(k => lower.includes(k));

    let desc = (text.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i) || [])[1] || '';
    if (!desc) desc = (text.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i) || [])[1] || '';
    signals.metaDesc = desc.trim();
  } catch {
    // timeout or network error — site might be live but blocking bots
    signals.alive = true; // be generous for network errors
    signals.bodySize = 0;
  }

  return signals;
}

function contentToPoints(signals) {
  if (!signals.alive) return 0;
  if (signals.isParked) return 0;

  let pts = 0;
  if (signals.hasTitle) pts += 0.2;
  if (signals.bodySize > 20000) pts += 0.2;
  if (signals.hasNavLinks) pts += 0.2;
  if (!signals.isParked) pts += 0.2;
  if (signals.hasAdultSignals) pts += 0.2;
  return pts;
}

// --- Category Confidence ---
const CATEGORY_KEYWORDS = {
  'Hentai Streaming':        ['hentai', 'hanime', 'h-anime'],
  'Anime Streaming':         ['anime', 'stream', 'watch'],
  'Manga & Doujinshi':       ['manga', 'doujin', 'nhentai', 'fakku', 'comic', 'read'],
  'Image Boards (Boorus)':   ['booru', 'rule34', 'gelbooru', 'danbooru', 'board', 'gallery'],
  'Games & Visual Novels':   ['game', 'vn', 'visual', 'novel', 'eroge', 'nutaku', 'f95'],
  'Immersive & Interactive': ['vr', 'interactive', '3d', 'virtual'],
  'Communities & Forums':    ['forum', 'community', 'discuss', 'board', 'chan'],
  'Creator Platforms':       ['fan', 'onlyfans', 'fansly', 'patreon', 'cam', 'creator'],
  'Downloads & Torrents':    ['torrent', 'download', 'nyaa', 'dl'],
  'Adult Tubes & Studios':   ['tube', 'porn', 'xxx', 'xnxx', 'xvideos', 'jav', 'video', 'studio'],
};

function categoryConfidence(url, title, category) {
  if (!category || !CATEGORY_KEYWORDS[category]) return 0;
  const haystack = (url + ' ' + (title || '')).toLowerCase();
  const keywords = CATEGORY_KEYWORDS[category];
  const matches = keywords.filter(k => haystack.includes(k)).length;
  if (matches >= 2) return 0.5;
  if (matches === 1) return 0.25;
  return 0;
}

// --- Main Scoring Function ---
/**
 * Scores a site and returns { score, signals }
 * @param {string} url
 * @param {string} category
 * @param {string} [title]
 * @param {boolean} [skipWayback] - skip Wayback call (faster, less accurate)
 * @returns {Promise<{score: number, signals: object}>}
 */
async function scoreSite(url, category, title = '', skipWayback = false) {
  const result = {
    score: 0,
    signals: {
      alive: false,
      ageYears: 0,
      agePoints: 0,
      contentPoints: 0,
      httpsPoints: 0,
      categoryPoints: 0,
      cleanUrlPoints: 0,
    }
  };

  // 1. Page content (also checks liveness)
  const content = await analyzePageContent(url);
  if (!content.alive) {
    result.signals.alive = false;
    result.score = 0;
    return result;
  }
  result.signals.alive = true;

  // 2. Wayback age
  let ageYears = 0;
  if (!skipWayback) {
    ageYears = await getWaybackAgeYears(url);
    await new Promise(r => setTimeout(r, WAYBACK_DELAY_MS)); // rate-limit
  }
  const agePoints = ageToPoints(ageYears);

  // 3. HTTPS
  const httpsPoints = url.startsWith('https://') ? 0.3 : 0;

  // 4. Category confidence
  const categoryPoints = categoryConfidence(url, title, category);

  // 5. Clean homepage URL
  let cleanUrlPoints = 0;
  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean);
    if (segments.length <= 1) cleanUrlPoints = 0.2;
  } catch {}

  // 6. Content points
  const contentPoints = contentToPoints(content);

  // Sum
  const BASE = 1.5;
  const raw = BASE + agePoints + contentPoints + httpsPoints + categoryPoints + cleanUrlPoints;
  const score = Math.min(Math.round(raw * 10) / 10, 5.0);

  result.score = score;
  result.signals = {
    alive: true,
    ageYears: Math.round(ageYears * 10) / 10,
    agePoints,
    contentPoints,
    httpsPoints,
    categoryPoints,
    cleanUrlPoints,
    bodySize: content.bodySize,
    hasAdultSignals: content.hasAdultSignals,
    isParked: content.isParked,
    metaDesc: content.metaDesc,
  };

  return result;
}

module.exports = { scoreSite };
