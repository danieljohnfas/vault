/**
 * HentaiVault — Site Submission Handler
 * Cloudflare Pages Function: /api/submit
 *
 * Required Environment Variables (set in Cloudflare Pages → Settings → Environment Variables):
 *   GITHUB_TOKEN  — GitHub Personal Access Token with repo write access
 *
 * The token only needs the "Contents" read+write permission (fine-grained PAT recommended).
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const GITHUB_REPO  = 'danieljohnfas/vault';
const GITHUB_FILE  = 'js/data.js';
const GITHUB_API   = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`;

const ALLOWED_CATEGORIES = [
  'Anime Streaming', 'Hentai Streaming', 'Manga/Doujin',
  'Images/Boorus', 'Games', 'Communities', 'Downloads', 'Visual Novels',
];

// ─── Entry point ─────────────────────────────────────────────────────────────

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return jsonError('Invalid request body.', 400);

    const { name, url, category, description } = body;

    // ── 1. Validate inputs ──────────────────────────────────────────────────
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
      return jsonError('Server is not configured. Contact the admin.', 500);

    // ── 2. Fetch current data.js from GitHub ────────────────────────────────
    const ghHeaders = {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept':        'application/vnd.github+json',
      'User-Agent':    'HentaiVault-Pages-Function',
    };

    const fileRes = await fetch(GITHUB_API, { headers: ghHeaders });
    if (!fileRes.ok) return jsonError('Could not read directory. Try again later.', 500);

    const fileData   = await fileRes.json();
    const sha        = fileData.sha;
    const rawContent = decodeBase64(fileData.content);

    // ── 3. Check for duplicate URL ──────────────────────────────────────────
    if (rawContent.includes(urlClean))
      return jsonError('This site is already listed in the directory!', 409);

    // ── 4. Build the new entry ──────────────────────────────────────────────
    const id      = makeId(nameClean);
    const today   = new Date().toISOString().split('T')[0];
    const entry   = buildEntry(id, nameClean, urlClean, catClean, descClean, today);

    // ── 5. Insert entry before closing ]; ──────────────────────────────────
    // Handles both "\n];" and "];" endings safely
    const updated = rawContent.replace(/(\n\];|^];)/m, `,\n${entry}\n];`);
    if (updated === rawContent)
      return jsonError('Could not parse directory file. Contact admin.', 500);

    // ── 6. Commit back to GitHub ────────────────────────────────────────────
    const commitRes = await fetch(GITHUB_API, {
      method:  'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Add site: ${nameClean}`,
        content: encodeBase64(updated),
        sha,
      }),
    });

    if (!commitRes.ok) {
      const err = await commitRes.json().catch(() => ({}));
      console.error('GitHub commit failed:', err);
      return jsonError('Failed to publish site. Please try again.', 500);
    }

    return new Response(
      JSON.stringify({ success: true, message: `"${nameClean}" has been added to the directory! It will appear live within ~60 seconds.` }),
      { status: 200, headers: CORS_HEADERS }
    );

  } catch (err) {
    console.error('Unexpected error:', err);
    return jsonError('An unexpected error occurred. Please try again.', 500);
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidURL(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Strip quotes, newlines, and dangerous chars for safe JS string insertion */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\\"`]/g, '')   // remove backslash, double-quote, backtick
    .replace(/[\r\n\t]/g, ' ') // flatten newlines
    .trim()
    .slice(0, 300);            // max length
}

function makeId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 30) + '_' + Date.now().toString(36);
}

function buildEntry(id, name, url, category, description, addedAt) {
  return `    { id: "${id}", name: "${name}", url: "${url}", category: "${category}", description: "${description}", tags: ["Community Submitted"], rating: 4.0, addedAt: "${addedAt}" }`;
}

function decodeBase64(b64) {
  // GitHub returns base64 with newlines
  const clean = b64.replace(/\n/g, '');
  return atob(clean);
}

function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), { status, headers: CORS_HEADERS });
}
