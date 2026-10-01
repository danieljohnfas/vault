/**
 * Helpers for site discovery (scripts/scout-v3.js) and intake (scripts/daily-add.js).
 * Pure functions; covered by scripts/test/discovery.test.mjs.
 */
'use strict';

// Two-label public suffixes common among this niche's domains (a small stand-in for
// the full Public Suffix List: enough to keep "site.co.uk" from becoming "co.uk").
const MULTI_PART_SUFFIXES = new Set([
  'co.uk', 'org.uk', 'me.uk', 'com.br', 'net.br', 'com.au', 'net.au', 'co.jp', 'ne.jp', 'or.jp',
  'co.kr', 'or.kr', 'com.cn', 'net.cn', 'com.tw', 'com.hk', 'co.nz', 'co.za', 'com.mx', 'com.ar',
  'co.in', 'co.id', 'com.my', 'com.sg', 'com.ph', 'com.vn', 'com.tr', 'com.ua', 'com.ru', 'co.il',
]);

/** Lower-case host without leading www./m. — the key used to de-duplicate sites. */
function hostKey(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^(www|m)\./, '');
  } catch { return null; }
}

/** The site's homepage for any link into it (https unless the link was plain http). */
function toHomepage(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    if (!u.hostname.includes('.') || /^\d+\.\d+\.\d+\.\d+$/.test(u.hostname)) return null;
    return `${u.protocol}//${u.hostname.toLowerCase()}/`;
  } catch { return null; }
}

/** example.com for a.b.example.com; example.co.uk for a.example.co.uk. */
function registrableDomain(host) {
  const labels = String(host || '').toLowerCase().replace(/\.$/, '').split('.').filter(Boolean);
  if (labels.length < 2) return null;
  const lastTwo = labels.slice(-2).join('.');
  const take = MULTI_PART_SUFFIXES.has(lastTwo) ? 3 : 2;
  return labels.length >= take ? labels.slice(-take).join('.') : null;
}

// Words that mark a site as on-topic for the directory (adult, hentai or anime).
// Generic words like "game" or "play" are deliberately absent: they let gaming news
// sites in. Matched against the host, page title, description or page text.
const TOPIC_RE = new RegExp([
  'hentai', 'h-?manga', 'doujin', 'ecchi', 'rule ?34', 'booru', 'eroge', 'nsfw', 'porn', 'xxx',
  'adult', 'sex', 'erotic', 'lewd', 'nude', 'naked', 'fetish', 'futanari', 'futa', 'yaoi', 'yuri',
  'ahegao', 'waifu', 'cosplay', 'jav', 'onlyfans', 'fansly', 'cam(s|girls?|show)?\\b', 'strip',
  'anime', 'manga', 'manhwa', 'manhua', 'webtoon', 'visual ?novel', 'otaku', 'animation', 'fansub',
  'r18', '18\\+', 'エロ', 'アダルト', '同人', 'アニメ', '漫画', 'エッチ',
].join('|'), 'i');

function isTopical(...parts) {
  return TOPIC_RE.test(parts.filter(Boolean).join(' '));
}

/**
 * Domains from crt.sh JSON (certificate transparency) whose certificate was issued
 * within `sinceDays`, reduced to registrable domains that contain one of `keywords`.
 */
function domainsFromCertificates(entries, { keywords, sinceDays = 14, now = Date.now() } = {}) {
  const cutoff = now - sinceDays * 86400000;
  const out = new Set();
  for (const e of Array.isArray(entries) ? entries : []) {
    const issued = Date.parse(e.not_before || e.entry_timestamp || '');
    if (!(issued >= cutoff)) continue;
    for (const raw of String(e.name_value || e.common_name || '').split('\n')) {
      const host = raw.trim().toLowerCase().replace(/^\*\./, '');
      if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host)) continue;
      // mail.example.com, cdn.example.com... all reduce to the site itself.
      const domain = registrableDomain(host);
      if (domain && keywords.some(k => domain.includes(k))) out.add(domain);
    }
  }
  return [...out];
}

/** Runs fn over items with at most `limit` in flight. */
async function pool(items, limit, fn) {
  let next = 0;
  const worker = async () => { while (next < items.length) { const i = next++; await fn(items[i], i); } };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

module.exports = { hostKey, toHomepage, registrableDomain, isTopical, domainsFromCertificates, pool };
