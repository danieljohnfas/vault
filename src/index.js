/**
 * HentaiVault — Cloudflare Worker Entry Point
 *
 * Routes:
 *   POST /api/submit  → handles site submissions, commits to GitHub
 *   *                 → passes through to static assets
 *
 * Required Secret (set in Cloudflare dashboard → Worker → Settings → Variables and Secrets):
 *   GITHUB_TOKEN — GitHub Fine-Grained PAT with Contents read+write on danieljohnfas/vault
 */

const GITHUB_REPO = 'danieljohnfas/vault';
const GITHUB_FILE = 'js/data.js';
const GITHUB_API  = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`;

const ALLOWED_CATEGORIES = [
  'Anime Streaming', 'Hentai Streaming', 'Manga/Doujin',
  'Images/Boorus', 'Games', 'Communities', 'Downloads', 'Visual Novels',
];


// Rate Limiter
const rateLimitMap = new Map();
const RATE_LIMIT_MS = 60000;
const MAX_REQS = 2;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  let record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_MS });
    return false;
  }
  if (now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_MS });
    return false;
  }
  record.count++;
  if (record.count > MAX_REQS) return true;
  return false;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Global V8 isolate cache
let cachedSitesData = null;

async function getSitesData(urlOrigin, env) {
  if (cachedSitesData) return cachedSitesData;
  try {
    const dataRes = await env.ASSETS.fetch(new Request(urlOrigin + '/js/data.js'));
    if (!dataRes.ok) return [];
    const dataText = await dataRes.text();
    const arrayMatch = dataText.match(/const\s+sitesData\s*=\s*([\s\S]+?\]);\s*$/);
    if (arrayMatch) {
      const jsonString = arrayMatch[1]
        .replace(/,\s*([\]}])/g, '$1');
      cachedSitesData = JSON.parse(jsonString);
      return cachedSitesData || [];
    }
  } catch (err) {
    console.error('Failed to parse sitesData:', err);
  }
  return [];
}

class HeadHandler {
  constructor(site, canonicalUrl) {
    this.site = site;
    this.canonicalUrl = canonicalUrl;
  }
  element(element) {
    const desc = (this.site.description || '').replace(/"/g, '&quot;');
    const title = `${this.site.name} Review | HentaiVault`;
    
    element.append(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<meta name="description" content="Read our expert review of ${this.site.name}. Curated, rated, and verified by the HentaiVault team. Category: ${this.site.category}.">`, { html: true });
    
    // Open Graph
    element.append(`<meta property="og:title" content="${title}">`, { html: true });
    element.append(`<meta property="og:description" content="${desc}">`, { html: true });
    element.append(`<meta property="og:url" content="${this.canonicalUrl}">`, { html: true });
    element.append(`<meta property="og:type" content="article">`, { html: true });
    
    // Twitter Card
    element.append(`<meta name="twitter:card" content="summary">`, { html: true });
    element.append(`<meta name="twitter:title" content="${title}">`, { html: true });
    element.append(`<meta name="twitter:description" content="${desc}">`, { html: true });
  }
}

class TitleHandler {
  constructor(titleText) {
    this.titleText = titleText;
  }
  element(element) {
    element.setInnerContent(this.titleText);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Route: IndexNow key verification ────────────────────────────────────
    if (env.INDEXNOW_KEY && url.pathname === `/${env.INDEXNOW_KEY}.txt`) {
      return new Response(env.INDEXNOW_KEY, {
        headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400' },
      });
    }

    // ── Route: /api/submit ──────────────────────────────────────────────────
    if (url.pathname === '/api/submit') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method === 'POST') {
        return handleSubmit(request, env, ctx);
      }
      return jsonError('Method not allowed.', 405);
    }

    // ── Route: /site and /site.html ─────────────────────────────────────────
    if (url.pathname === '/site' || url.pathname === '/site.html') {
      if (url.pathname === '/site.html') {
        const id = url.searchParams.get('id');
        const search = id ? `?id=${id}` : '';
        return new Response(null, {
          status: 308,
          headers: {
            'Location': `${url.origin}/site${search}`,
            'Cache-Control': 'public, max-age=604800'
          }
        });
      }

      const id = url.searchParams.get('id');
      if (!id) {
        return Response.redirect(url.origin + '/', 302);
      }

      const response = await env.ASSETS.fetch(new Request(url.origin + '/site.html'));
      if (!response.ok) {
        return response;
      }

      const sites = await getSitesData(url.origin, env);
      const site = sites.find(s => s.id === id);

      if (!site) {
        // Return 404 status code but still serve site.html so client-side rendering displays UI error
        return new Response(response.body, {
          status: 404,
          headers: response.headers
        });
      }

      const canonicalUrl = `https://hentaivault.me/site?id=${site.id}`;
      const titleText = `${site.name} Review | HentaiVault`;

      const rewriter = new HTMLRewriter()
        .on('title', new TitleHandler(titleText))
        .on('head', new HeadHandler(site, canonicalUrl));

      return rewriter.transform(response);
    }

    // ── Everything else: serve static assets ────────────────────────────────
    return env.ASSETS.fetch(request);
  },
};

// ─── Submit Handler ───────────────────────────────────────────────────────────

async function handleSubmit(request, env, ctx) {
  try {
    const ip = request.headers.get('cf-connecting-ip');
    if (isRateLimited(ip)) {
      return jsonError('Too many submissions. Please try again later.', 429);
    }

    const body = await request.json().catch(() => null);
    if (!body) return jsonError('Invalid request body.', 400);

    const { name, url, category, description } = body;

    // ── 1. Validate ──────────────────────────────────────────────────────────
    const nameClean = sanitize(name);
    const descClean = sanitize(description);
    const urlClean  = (url || '').trim();
    const catClean  = (category || '').trim();

    if (!nameClean || nameClean.length < 2)
      return jsonError('Site name must be at least 2 characters.', 400);

    if (!isValidURL(urlClean))
      return jsonError('Please provide a valid http:// or https:// URL.', 400);

    if (!ALLOWED_CATEGORIES.includes(catClean))
      return jsonError('Invalid category selected.', 400);

    if (!descClean || descClean.length < 20)
      return jsonError('Description must be at least 20 characters.', 400);

    if (!env.GITHUB_TOKEN)
      return jsonError('Server misconfiguration. Contact the admin.', 500);

    // ── 2. Fetch current data.js from GitHub ─────────────────────────────────
    const ghHeaders = {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept':        'application/vnd.github+json',
      'User-Agent':    'HentaiVault-Worker',
    };

    const fileRes = await fetch(GITHUB_API, { headers: ghHeaders });
    if (!fileRes.ok) return jsonError('Could not read directory. Try again later.', 500);

    const fileData   = await fileRes.json();
    const sha        = fileData.sha;
    const rawContent = decodeB64(fileData.content);

    // ── 3. Duplicate check ───────────────────────────────────────────────────
    if (rawContent.includes(urlClean))
      return jsonError('This site is already listed in the directory!', 409);

    // ── 4. Build new entry ───────────────────────────────────────────────────
    const id    = makeId(nameClean);
    const today = new Date().toISOString().split('T')[0];
    const entry = `    { "id": "${id}", "name": "${nameClean}", "url": "${urlClean}", "category": "${catClean}", "description": "${descClean}", "tags": ["Community Submitted"], "rating": 4.0, "addedAt": "${today}" }`;

    // ── 5. Insert before closing ]; ──────────────────────────────────────────
    const updated = rawContent.replace(/\n\];/, `,\n${entry}\n];`);
    if (updated === rawContent)
      return jsonError('Could not update directory. Contact admin.', 500);

    // ── 6. Commit to GitHub ──────────────────────────────────────────────────
    const commitRes = await fetch(GITHUB_API, {
      method:  'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Add site: ${nameClean}`,
        content: encodeB64(updated),
        sha,
      }),
    });

    if (!commitRes.ok) {
      console.error('GitHub commit error:', await commitRes.text());
      return jsonError('Failed to publish site. Please try again.', 500);
    }

    // Ping Bing IndexNow in the background (non-blocking)
    ctx.waitUntil(pingIndexNow(env));

    return new Response(
      JSON.stringify({
        success: true,
        message: `"${nameClean}" has been added to the directory! It will appear live within ~60 seconds.`,
      }),
      { status: 200, headers: CORS }
    );

  } catch (err) {
    console.error('Unexpected error:', err);
    return jsonError('An unexpected error occurred.', 500);
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function isValidURL(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch { return false; }
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\\"`]/g, '')
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, 300);
}

function makeId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30)
    + '_' + Date.now().toString(36);
}

function decodeB64(b64) {
  return atob(b64.replace(/\n/g, ''));
}

function encodeB64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), { status, headers: CORS });
}

async function pingIndexNow(env) {
  if (!env.INDEXNOW_KEY) return;
  try {
    const url = 'https://api.indexnow.org/indexnow';
    const payload = {
      host: 'hentaivault.me',
      key: env.INDEXNOW_KEY,
      keyLocation: `https://hentaivault.me/${env.INDEXNOW_KEY}.txt`,
      urlList: [
        'https://hentaivault.me/',
        'https://hentaivault.me/category/anime-streaming',
        'https://hentaivault.me/category/hentai-streaming',
        'https://hentaivault.me/category/manga-doujin',
        'https://hentaivault.me/category/images-boorus',
        'https://hentaivault.me/category/games',
        'https://hentaivault.me/category/communities',
        'https://hentaivault.me/category/downloads',
        'https://hentaivault.me/category/visual-novels'
      ]
    };

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log('Successfully pinged IndexNow API');
  } catch (err) {
    console.error('IndexNow ping failed:', err);
  }
}
