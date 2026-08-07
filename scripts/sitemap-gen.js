/**
 * HentaiVault Sitemap Auto-Generator
 * Scans all HTML files and regenerates sitemaps with correct lastmod dates.
 * Run: node scripts/sitemap-gen.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://hentaivault.me';
const ROOT = path.join(__dirname, '..');
const today = new Date().toISOString().split('T')[0];

function xmlDate(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
  } catch { return today; }
}

function buildUrl(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function wrapSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// ── Main pages
const mainPages = [
  { path: 'index.html',        slug: '/',                    freq: 'daily',   priority: '1.0' },
  { path: 'blog/index.html',   slug: '/blog',                freq: 'weekly',  priority: '0.9' },
  { path: 'about.html',        slug: '/about',               freq: 'monthly', priority: '0.5' },
  { path: 'privacy.html',      slug: '/privacy',             freq: 'monthly', priority: '0.4' },
  { path: 'terms.html',        slug: '/terms',               freq: 'monthly', priority: '0.4' },
  { path: 'disclaimer.html',   slug: '/disclaimer',          freq: 'monthly', priority: '0.4' },
  { path: 'dmca.html',         slug: '/dmca',                freq: 'monthly', priority: '0.4' },
  { path: 'contact.html',      slug: '/contact',             freq: 'monthly', priority: '0.5' },
  { path: 'compare.html',      slug: '/compare',             freq: 'weekly',  priority: '0.7' },
  { path: 'mylist.html',       slug: '/mylist',              freq: 'monthly', priority: '0.5' },
  { path: 'region-unblocked.html', slug: '/region-unblocked', freq: 'weekly', priority: '0.8' },
];

const mainUrls = mainPages
  .filter(p => fs.existsSync(path.join(ROOT, p.path)))
  .map(p => buildUrl(`${BASE_URL}${p.slug}`, xmlDate(path.join(ROOT, p.path)), p.freq, p.priority));

fs.writeFileSync(path.join(ROOT, 'sitemap-main.xml'), wrapSitemap(mainUrls), 'utf8');
console.log(`✅ sitemap-main.xml — ${mainUrls.length} URLs`);

// ── Blog pages
const blogDir = path.join(ROOT, 'blog');
const blogFiles = fs.existsSync(blogDir)
  ? fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html')
  : [];

const blogUrls = blogFiles.map(file => {
  const slug = file.replace('.html', '');
  const filePath = path.join(blogDir, file);
  return buildUrl(`${BASE_URL}/blog/${slug}`, xmlDate(filePath), 'monthly', '0.8');
});

fs.writeFileSync(path.join(ROOT, 'sitemap-blog.xml'), wrapSitemap(blogUrls), 'utf8');
console.log(`✅ sitemap-blog.xml — ${blogUrls.length} blog posts`);

// ── Category pages (dynamically generated from the /category/ path pattern)
const categoryPages = [
  'manga-doujin', 'anime-streaming', 'hentai-streaming',
  'games', 'images-boorus', 'communities', 'downloads'
];
const catUrls = categoryPages.map(cat =>
  buildUrl(`${BASE_URL}/category/${cat}`, today, 'weekly', '0.8')
);
const catSitemap = wrapSitemap(catUrls);
fs.writeFileSync(path.join(ROOT, 'sitemap-categories.xml'), catSitemap, 'utf8');
console.log(`✅ sitemap-categories.xml — ${catUrls.length} categories`);

// ── Sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-categories.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(ROOT, 'sitemap-index.xml'), sitemapIndex, 'utf8');
console.log(`✅ sitemap-index.xml written`);

// ── Also update robots.txt to reference the sitemap index
const robotsPath = path.join(ROOT, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('sitemap-index.xml')) {
    robots = robots.replace(
      /Sitemap:.*hentaivault\.me\/sitemap.*\.xml/i,
      `Sitemap: ${BASE_URL}/sitemap-index.xml`
    );
    if (!robots.includes('Sitemap:')) {
      robots += `\nSitemap: ${BASE_URL}/sitemap-index.xml\n`;
    }
    fs.writeFileSync(robotsPath, robots, 'utf8');
    console.log(`✅ robots.txt updated with sitemap-index reference`);
  }
}

console.log(`\n🗺️  Sitemap generation complete — ${mainUrls.length + blogUrls.length + catUrls.length} total URLs`);
