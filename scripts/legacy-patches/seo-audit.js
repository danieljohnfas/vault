const fs = require('fs');
const path = require('path');

// Pages that intentionally have noindex (utility/user-specific pages)
const INTENTIONAL_NOINDEX = ['embed.html', 'mylist.html'];
// Pages that don't need full OG/schema (redirect utility pages)
const UTILITY_PAGES = ['embed.html', 'mylist.html', 'out.html', 'compare.html', 'site.html'];

const htmlFiles = [];
function walkDir(dir, base) {
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        const rel = path.join(base, f).replace(/\\/g, '/');
        if (fs.statSync(full).isDirectory()) {
            if (f !== 'node_modules' && f !== '.git' && f !== '.wrangler') walkDir(full, rel);
        } else if (f.endsWith('.html') && !rel.includes('extension') && !rel.includes('bot')) {
            htmlFiles.push({ full, rel });
        }
    }
}
walkDir('.', '');

const issues = [];

for (const { full, rel } of htmlFiles) {
    let c = fs.readFileSync(full, 'utf8');
    // Strip form elements so their name attrs don't confuse the audit
    c = c.replace(/<form[\s\S]*?<\/form>/gi, '');
    c = c.replace(/<textarea[\s\S]*?<\/textarea>/gi, '');
    
    const fileIssues = [];
    const fileName = path.basename(rel);
    const isUtility = UTILITY_PAGES.includes(fileName);
    const isNoindexOK = INTENTIONAL_NOINDEX.includes(fileName);

    // 1. Canonical
    const canonicals = c.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) || [];
    if (canonicals.length === 0 && !isUtility) fileIssues.push('MISSING canonical');
    else if (canonicals.length > 1) fileIssues.push('DUPLICATE canonical (' + canonicals.length + ')');
    else if (canonicals.length === 1) {
        const hm = canonicals[0].match(/href=["']([^"']+)["']/i);
        const href = hm ? hm[1] : '';
        if (!href.startsWith('https://hentaivault.me')) fileIssues.push('BAD canonical: ' + href);
    }

    // 2. Title
    const titles = c.match(/<title[^>]*>[\s\S]*?<\/title>/gi) || [];
    if (titles.length === 0) fileIssues.push('MISSING title');
    else if (titles.length > 1) fileIssues.push('DUPLICATE title (' + titles.length + ')');
    else {
        const t = titles[0].replace(/<[^>]+>/g, '').trim();
        if (t.length < 10) fileIssues.push('Title too short (' + t.length + ')');
        if (t.length > 70) fileIssues.push('Title too long (' + t.length + '): ' + t.substring(0,50));
    }

    // 3. Meta description (properly — only <meta> tags in <head>)
    const headMatch = c.match(/<head[\s\S]*?<\/head>/i);
    const headContent = headMatch ? headMatch[0] : c;
    const descs = headContent.match(/<meta[^>]+name=["']description["'][^>]*>/gi) || [];
    if (descs.length === 0) fileIssues.push('MISSING meta description');
    else if (descs.length > 1) fileIssues.push('DUPLICATE meta description (' + descs.length + ')');
    else {
        const cm = descs[0].match(/content=["']([^"']*)["']/i);
        const rawContent = cm ? cm[1] : '';
        // Decode common HTML entities for accurate length check
        const content = rawContent.replace(/&amp;/g,'&').replace(/&apos;/g,"'").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
        if (content.length < 50) fileIssues.push('Meta desc too short (' + content.length + ')');
        if (content.length > 160) fileIssues.push('Meta desc too long (' + content.length + ')');
    }

    // 4. H1 count
    const h1s = c.match(/<h1[^>]*>/gi) || [];
    if (h1s.length === 0 && !isUtility) fileIssues.push('MISSING H1');
    if (h1s.length > 1) fileIssues.push('MULTIPLE H1s (' + h1s.length + ')');

    // 5. noindex
    if (c.includes('noindex') && !isNoindexOK) fileIssues.push('UNEXPECTED noindex');

    // 6. viewport
    if (!c.includes('viewport')) fileIssues.push('MISSING viewport');

    // 7. Structured data
    if (!c.includes('application/ld+json') && !isUtility) fileIssues.push('NO schema/ld+json');

    // 8. OG tags (required for content pages)
    if (!isUtility) {
        if (!c.includes('og:title')) fileIssues.push('MISSING og:title');
        if (!c.includes('og:description')) fileIssues.push('MISSING og:description');
        if (!c.includes('og:image')) fileIssues.push('MISSING og:image');
    }

    // 9. Twitter card (content pages only)
    if (!isUtility && !c.includes('twitter:card')) fileIssues.push('MISSING twitter:card');

    // 10. Wrong production URL
    if (c.includes('vault.fictionentertained.workers.dev')) fileIssues.push('Contains workers.dev URL');

    if (fileIssues.length > 0) {
        issues.push({ file: rel, issues: fileIssues });
    }
}

if (issues.length === 0) {
    console.log('ALL CLEAR — no SEO issues found across ' + htmlFiles.length + ' pages!');
} else {
    console.log('Remaining issues:\n' + JSON.stringify(issues, null, 2));
    console.log('\nTotal files checked: ' + htmlFiles.length);
    console.log('Files with issues: ' + issues.length);
}
