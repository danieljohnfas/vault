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

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── Route: /api/submit ──────────────────────────────────────────────────
    if (url.pathname === '/api/submit') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method === 'POST') {
        return handleSubmit(request, env);
      }
      return jsonError('Method not allowed.', 405);
    }

    // ── Everything else: serve static assets ────────────────────────────────
    return env.ASSETS.fetch(request);
  },
};

// ─── Submit Handler ───────────────────────────────────────────────────────────

async function handleSubmit(request, env) {
  try {
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
    const entry = `    { id: "${id}", name: "${nameClean}", url: "${urlClean}", category: "${catClean}", description: "${descClean}", tags: ["Community Submitted"], rating: 4.0, addedAt: "${today}" }`;

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
