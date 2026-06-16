const fs = require('fs');

// ── Helpers ──────────────────────────────────────────────────────────────────
function patch(file, fn) {
    const orig = fs.readFileSync(file, 'utf8');
    const result = fn(orig);
    if (result !== orig) {
        fs.writeFileSync(file, result, 'utf8');
        console.log('Fixed: ' + file);
    }
}

function setMeta(c, name, content) {
    const re = new RegExp('<meta[^>]+name=["\']' + name + '["\'][^>]*>', 'i');
    const tag = '<meta name="' + name + '" content="' + content + '"/>';
    return re.test(c) ? c.replace(re, tag) : c.replace('</head>', tag + '\n</head>');
}

function setOG(c, prop, content) {
    const re = new RegExp('<meta[^>]+property=["\']' + prop.replace(':', ':') + '["\'][^>]*>', 'gi');
    const tag = '<meta property="' + prop + '" content="' + content + '"/>';
    return re.test(c) ? c.replace(re, tag) : c.replace('</head>', tag + '\n</head>');
}

function addIfMissing(c, searchStr, toAdd) {
    if (!c.includes(searchStr)) {
        c = c.replace('</head>', toAdd + '\n</head>');
    }
    return c;
}

function setTitle(c, title) {
    return c.replace(/<title[^>]*>[\s\S]*?<\/title>/i, '<title>' + title + '</title>');
}

function addCanonical(c, url) {
    if (!c.includes('rel="canonical"') && !c.includes("rel='canonical'")) {
        c = c.replace('</head>', '<link rel="canonical" href="' + url + '"/>\n</head>');
    }
    return c;
}

function addSchemaWebPage(c, name, desc, url) {
    if (!c.includes('application/ld+json')) {
        const schema = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": name,
            "description": desc,
            "url": url,
            "isPartOf": { "@type": "WebSite", "name": "HentaiVault", "url": "https://hentaivault.me" }
        });
        c = c.replace('</head>', '<script type="application/ld+json">' + schema + '</script>\n</head>');
    }
    return c;
}

function addSchemaBlogPosting(c, headline, desc, url, datePublished) {
    if (!c.includes('application/ld+json')) {
        const schema = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": headline,
            "description": desc,
            "url": url,
            "datePublished": datePublished,
            "dateModified": "2026-06-16",
            "author": { "@type": "Organization", "name": "HentaiVault" },
            "publisher": { "@type": "Organization", "name": "HentaiVault", "url": "https://hentaivault.me" },
            "image": "https://hentaivault.me/assets/favicon.png",
            "isPartOf": { "@type": "WebSite", "name": "HentaiVault", "url": "https://hentaivault.me" }
        });
        c = c.replace('</head>', '<script type="application/ld+json">' + schema + '</script>\n</head>');
    }
    return c;
}

function addTwitterCard(c, title, desc) {
    if (!c.includes('twitter:card')) {
        const tags = [
            '<meta name="twitter:card" content="summary_large_image"/>',
            '<meta name="twitter:site" content="@hentaivaultme"/>',
            '<meta name="twitter:title" content="' + title + '"/>',
            '<meta name="twitter:description" content="' + desc + '"/>',
            '<meta name="twitter:image" content="https://hentaivault.me/assets/favicon.png"/>'
        ].join('\n');
        c = c.replace('</head>', tags + '\n</head>');
    }
    return c;
}

const OG_IMAGE = 'https://hentaivault.me/assets/favicon.png';

// ── about.html ───────────────────────────────────────────────────────────────
patch('about.html', c => {
    const desc = 'HentaiVault is the internet\'s #1 curated directory of anime, hentai, manga, doujin, and adult content sites. Rated, ranked, and updated regularly.';
    c = setMeta(c, 'description', desc);
    c = addSchemaWebPage(c, 'About HentaiVault', desc, 'https://hentaivault.me/about');
    return c;
});

// ── alternatives.html ────────────────────────────────────────────────────────
patch('alternatives.html', c => {
    // Fix missing canonical
    c = addCanonical(c, 'https://hentaivault.me/alternatives');
    // Fix multiple H1s — keep the first, demote rest to h2
    let h1Count = 0;
    c = c.replace(/<h1([^>]*)>/gi, (m, attrs) => {
        h1Count++;
        return h1Count === 1 ? m : '<h2' + attrs + '>';
    });
    c = c.replace(/<\/h1>/gi, () => {
        // We need to track which to replace — simpler: replace all after the first match
        return '</h1>';
    });
    // Better approach for closing tags
    const parts = c.split(/<\/h1>/i);
    if (parts.length > 2) {
        c = parts[0] + '</h1>' + parts.slice(1).join('</h2>');
    }
    return c;
});

// ── blog/best-doujin-sites-2026.html ─────────────────────────────────────────
patch('blog/best-doujin-sites-2026.html', c => {
    const title = 'Top 10 Best Doujin Sites 2026 — nhentai Alternatives';
    const desc = 'Discover the best doujin sites in 2026. We ranked the top nhentai alternatives, free doujinshi readers, and translated hentai manga websites.';
    c = addSchemaBlogPosting(c, title, desc, 'https://hentaivault.me/blog/best-doujin-sites-2026', '2026-05-01');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/best-streaming-2026.html ────────────────────────────────────────────
patch('blog/best-streaming-2026.html', c => {
    const title = 'Best Hentai Streaming Sites 2026 — Top Picks';
    const desc = 'The best hentai streaming sites in 2026, ranked by quality, speed, and content. Find your next favorite hentai streaming platform.';
    c = setTitle(c, title);
    c = setMeta(c, 'description', desc);
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addSchemaBlogPosting(c, title, desc, 'https://hentaivault.me/blog/best-streaming-2026', '2026-05-01');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/free-manga-guide.html ───────────────────────────────────────────────
patch('blog/free-manga-guide.html', c => {
    const title = 'Free Manga Sites 2026 — Complete Reading Guide';
    const desc = 'A complete guide to free manga reading sites in 2026. Find the best places to read manga online legally and for free, from classics to new releases.';
    c = setTitle(c, title);
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addSchemaBlogPosting(c, title, desc, 'https://hentaivault.me/blog/free-manga-guide', '2026-04-01');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/hanime-alternatives-2026.html ───────────────────────────────────────
patch('blog/hanime-alternatives-2026.html', c => {
    const title = 'Best Hanime Alternatives 2026 — Top Sites Like Hanime';
    const desc = 'Looking for the best Hanime.tv alternatives in 2026? We ranked the top hentai streaming sites with similar or better content libraries and features.';
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/index.html ───────────────────────────────────────────────────────────
patch('blog/index.html', c => {
    const title = 'HentaiVault Blog — Guides, Reviews & Top Lists';
    const desc = 'The HentaiVault blog covers the best anime and hentai sites, streaming guides, doujin reviews, VPN tips for adult content, and the latest top 10 lists.';
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addSchemaWebPage(c, title, desc, 'https://hentaivault.me/blog');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/nhentai-alternatives-2026.html ──────────────────────────────────────
patch('blog/nhentai-alternatives-2026.html', c => {
    const title = 'Best nhentai Alternatives 2026 — Top Doujin Sites';
    const desc = 'The best nhentai alternatives in 2026, ranked and reviewed. Find fast, ad-light doujin reading sites with huge English-translated manga libraries.';
    c = setTitle(c, title);
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/privacy-safety-guide.html ───────────────────────────────────────────
patch('blog/privacy-safety-guide.html', c => {
    const title = 'Privacy & Safety Guide for Adult Sites 2026 | HentaiVault';
    const desc = 'Stay safe and private when browsing adult content in 2026. Our guide covers VPNs, private browsing, DNS, and how to avoid trackers on hentai sites.';
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addSchemaBlogPosting(c, title, desc, 'https://hentaivault.me/blog/privacy-safety-guide', '2026-04-15');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── blog/top-10-sites-may-2026.html ──────────────────────────────────────────
patch('blog/top-10-sites-may-2026.html', c => {
    const title = 'Top 10 Hentai Sites — May 2026 Rankings | HentaiVault';
    const desc = 'The definitive top 10 hentai and anime adult sites for May 2026, ranked by speed, content library, ad levels, and user experience.';
    c = addIfMissing(c, 'og:title', '<meta property="og:title" content="' + title + '"/>');
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    c = addIfMissing(c, 'og:image', '<meta property="og:image" content="' + OG_IMAGE + '"/>');
    c = addSchemaBlogPosting(c, title, desc, 'https://hentaivault.me/blog/top-10-sites-may-2026', '2026-05-01');
    c = addTwitterCard(c, title, desc);
    return c;
});

// ── category pages — trim meta descriptions ───────────────────────────────────
const categoryDescFixes = {
    'category/anime-streaming.html': 'Browse the best free anime streaming sites of 2026. Rated and curated by the HentaiVault community — find legal and free anime online.',
    'category/communities.html': 'Discover the top hentai and anime communities of 2026. Forums, Discord servers, Reddit subs, and fan clubs — all ranked and curated.',
    'category/downloads.html': 'Find the best sites to download hentai manga, doujinshi, and anime in 2026. Curated list with direct links, speeds, and safety ratings.',
    'category/games.html': 'Browse the best hentai and adult anime games of 2026. RPGs, visual novels, browser games — all rated and reviewed by the community.',
    'category/visual-novels.html': 'The best adult visual novels of 2026, ranked and reviewed. Find English-translated VNs, eroge, and nukige all in one curated directory.',
};
for (const [file, desc] of Object.entries(categoryDescFixes)) {
    patch(file, c => setMeta(c, 'description', desc));
}

// ── category pages — fix title lengths ────────────────────────────────────────
patch('category/hentai-streaming.html', c => setTitle(c, 'Best Hentai Streaming Sites 2026 | HentaiVault'));
patch('category/images-boorus.html', c => setTitle(c, 'Best Image Boards & Booru Sites 2026 | HentaiVault'));

// ── compare.html ─────────────────────────────────────────────────────────────
patch('compare.html', c => {
    const desc = 'Compare hentai and anime sites side by side. See ratings, features, content types, and safety scores to find the best site for you.';
    c = addCanonical(c, 'https://hentaivault.me/compare');
    c = setMeta(c, 'description', desc);
    c = addIfMissing(c, 'og:description', '<meta property="og:description" content="' + desc + '"/>');
    // Add H1 if missing — find first main element or body
    if (!(c.match(/<h1[^>]*>/i))) {
        c = c.replace('<main', '<h1 class="sr-only">Compare Hentai &amp; Anime Sites</h1>\n<main');
    }
    return c;
});

// ── contact.html ─────────────────────────────────────────────────────────────
patch('contact.html', c => {
    const desc = 'Contact the HentaiVault team. Submit a site, report an error, request a DMCA removal, or just say hello.';
    c = addSchemaWebPage(c, 'Contact HentaiVault', desc, 'https://hentaivault.me/contact');
    return c;
});

// ── disclaimer.html ───────────────────────────────────────────────────────────
patch('disclaimer.html', c => {
    const desc = 'HentaiVault disclaimer. This site contains links to adult content and is intended for adults only. Read our full disclaimer and terms of access.';
    c = addSchemaWebPage(c, 'Disclaimer | HentaiVault', desc, 'https://hentaivault.me/disclaimer');
    return c;
});

// ── dmca.html ─────────────────────────────────────────────────────────────────
patch('dmca.html', c => {
    const desc = 'Submit a DMCA takedown request to HentaiVault. We respect intellectual property rights and will process valid removal requests promptly.';
    c = setMeta(c, 'description', desc);
    c = addSchemaWebPage(c, 'DMCA Takedown | HentaiVault', desc, 'https://hentaivault.me/dmca');
    return c;
});

// ── embed.html — utility page, noindex is correct; add minimal missing tags ───
// noindex is intentional for embed.html — skip canonical/H1/OG for it

// ── index.html ────────────────────────────────────────────────────────────────
patch('index.html', c => {
    c = setTitle(c, 'HentaiVault — #1 Hentai & Anime Site Directory 2026');
    c = setMeta(c, 'description', 'The internet\'s #1 directory of 1,903+ curated hentai, doujin, manga, and anime streaming sites. Rated, ranked, and updated daily.');
    return c;
});

// ── mylist.html — noindex is intentional (user-specific page), skip ───────────

// ── out.html — redirect page, no-index is ok; add minimal tags ────────────────
patch('out.html', c => {
    c = addCanonical(c, 'https://hentaivault.me/out');
    c = setMeta(c, 'description', 'You are being redirected to an external site. HentaiVault is not responsible for external content.');
    return c;
});

// ── privacy.html ──────────────────────────────────────────────────────────────
patch('privacy.html', c => {
    const desc = 'HentaiVault Privacy Policy. Learn how we collect, use, and protect your data. We take your privacy seriously and do not sell personal data.';
    c = setMeta(c, 'description', desc);
    c = addSchemaWebPage(c, 'Privacy Policy | HentaiVault', desc, 'https://hentaivault.me/privacy');
    return c;
});

// ── site.html — dynamic template page, needs canonical + H1 ──────────────────
patch('site.html', c => {
    c = addCanonical(c, 'https://hentaivault.me/site');
    if (!(c.match(/<h1[^>]*>/i))) {
        c = c.replace('<main', '<h1 class="sr-only">Site Detail | HentaiVault</h1>\n<main');
    }
    return c;
});

// ── terms.html ────────────────────────────────────────────────────────────────
patch('terms.html', c => {
    const desc = 'HentaiVault Terms of Service. By using this site you agree to our terms. Adults only. Read the full terms before using our directory.';
    c = setMeta(c, 'description', desc);
    c = addSchemaWebPage(c, 'Terms of Service | HentaiVault', desc, 'https://hentaivault.me/terms');
    return c;
});

console.log('\nAll SEO fixes applied.');
