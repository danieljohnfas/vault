const fs = require('fs');
const path = require('path');

// 1. site.html
let siteHtml = fs.readFileSync('site.html', 'utf8');
// Remove corrupted footer block
siteHtml = siteHtml.replace(/<!-- Footer \(Injected by app\.js or HTMLRewriter\) -->\s*<footer>[\s\S]*?<\/footer> app\.js \(CSR\) -->\s*/, '');
// Fix missing modal closing div
siteHtml = siteHtml.replace(/(\s*)<\/form>\s*<\/div>\s*<\/main>/, '$1</form>\n        </div>\n    </div>\n    </main>');
fs.writeFileSync('site.html', siteHtml, 'utf8');
console.log('site.html fixed.');

// 2. compare.html
let compareHtml = fs.readFileSync('compare.html', 'utf8');
// Fix logo emoji
compareHtml = compareHtml.replace(/<span class="logo-icon">📦<\/span>/, '<span class="logo-icon">💎</span>');
// Fix missing nav actions
const navActions = `
            <div class="search-bar">
                <div class="search-container">
                    <input type="text" id="searchInput" data-i18n="search_placeholder" placeholder="Search across 1,903+ sites..." autocomplete="off">
                    <div id="searchAutocomplete" class="search-autocomplete"></div>
                </div>
            </div>
            <button class="btn-search-mobile" id="btnSearchMobile" aria-label="Search">🔍</button>
            <div class="nav-actions">
                <button id="themeToggle" class="btn-theme" title="Toggle Theme">🌓</button>
                <div class="lang-switcher">
                    <select onchange="setLanguage(this.value)" id="langSelect" title="Select Language">
                        <option value="en">🇺🇸 EN</option>
                        <option value="es">🇪🇸 ES</option>
                        <option value="jp">🇯🇵 JP</option>
                        <option value="fr">🇫🇷 FR</option>
                        <option value="pt">🇧🇷 PT</option>
                        <option value="hi">🇮🇳 HI</option>
                        <option value="ar">🇲🇦 AR</option>
                        <option value="de">🇩🇪 DE</option>
                    </select>
                </div>
                <a href="#" class="btn-submit" data-i18n="submit" id="btnSubmitSite">Submit</a>
            </div>`;
// Replace the empty or basic nav with the full nav
compareHtml = compareHtml.replace(/<nav class="nav-links">[\s\S]*?<\/nav>/, navActions);

// Add missing scripts to compare.html before </body>
if (!compareHtml.includes('js/app.js')) {
    compareHtml = compareHtml.replace(/<\/body>/, '    <script defer src="js/app.js"></script>\n    <script defer src="js/i18n.js"></script>\n</body>');
}
fs.writeFileSync('compare.html', compareHtml, 'utf8');
console.log('compare.html fixed.');

// 3. embed.html
let embedHtml = fs.readFileSync('embed.html', 'utf8');
if (!embedHtml.includes('embedWidgetScript')) {
    const hydrationScript = `
    <script id="embedWidgetScript">
        document.addEventListener('DOMContentLoaded', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const siteId = urlParams.get('id');
            if(siteId) {
                try {
                    const res = await fetch(\`/api/site?id=\${siteId}\`);
                    if(res.ok) {
                        const data = await res.json();
                        document.getElementById('embed-title').textContent = data.name;
                        document.getElementById('embed-rating').innerHTML = '★'.repeat(Math.round(data.rating || 0)) + '☆'.repeat(5 - Math.round(data.rating || 0));
                        document.getElementById('embed-icon').src = data.icon || 'assets/favicon.png';
                        document.getElementById('embed-link').href = data.url;
                    }
                } catch(e) {}
            }
        });
    </script>
    `;
    embedHtml = embedHtml.replace(/<\/body>/, hydrationScript + '</body>');
    embedHtml = embedHtml.replace(/<head>/, '<head>\n    <meta name="robots" content="noindex">\n    <link rel="icon" type="image/png" href="assets/favicon.png">');
    fs.writeFileSync('embed.html', embedHtml, 'utf8');
    console.log('embed.html fixed.');
}

// 4. alternatives.html
let altHtml = fs.readFileSync('alternatives.html', 'utf8');
altHtml = altHtml.replace(/<title>Review \| HentaiVault<\/title>/, '<title>Alternatives | HentaiVault</title>');
altHtml = altHtml.replace(/<meta property="og:title" content="HentaiVault \| Site Review">/, '<meta property="og:title" content="HentaiVault | Best Alternatives">');
// Remove duplicate meta
altHtml = altHtml.replace(/<meta property="og:image" content="https:\/\/hentaivault\.me\/assets\/favicon\.png">\s*<meta name="twitter:card" content="summary_large_image">\s*(?=.*<meta property="og:image")/g, '');
fs.writeFileSync('alternatives.html', altHtml, 'utf8');
console.log('alternatives.html fixed.');

// 5. Google Analytics missing
const pagesToAddGA = ['out.html', 'alternatives.html', 'mylist.html', 'blog/top-10-sites-may-2026.html'];
const gaCode = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-G40QDCGTTZ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-G40QDCGTTZ');
    </script>
`;
pagesToAddGA.forEach(p => {
    let html = fs.readFileSync(p, 'utf8');
    if (!html.includes('G-G40QDCGTTZ')) {
        html = html.replace(/<head>/, '<head>\n' + gaCode);
        fs.writeFileSync(p, html, 'utf8');
        console.log(`GA added to ${p}`);
    }
});

// 6. region-unblocked.html
let ruHtml = fs.readFileSync('region-unblocked.html', 'utf8');
ruHtml = ruHtml.replace(/"aggregateRating": \{[^}]*\},\s*/, '');
if (!ruHtml.includes('js/app.js')) {
    ruHtml = ruHtml.replace(/<\/body>/, '    <script defer src="js/app.js"></script>\n    <script defer src="js/i18n.js"></script>\n</body>');
}
fs.writeFileSync('region-unblocked.html', ruHtml, 'utf8');
console.log('region-unblocked.html fixed.');

// 7. blog/index.html
let blogIndexHtml = fs.readFileSync('blog/index.html', 'utf8');
if (!blogIndexHtml.includes('js/app.js')) {
    blogIndexHtml = blogIndexHtml.replace(/<\/body>/, '    <script defer src="../js/app.js"></script>\n    <script defer src="../js/i18n.js"></script>\n</body>');
}
fs.writeFileSync('blog/index.html', blogIndexHtml, 'utf8');
console.log('blog/index.html fixed.');

// 8. blog/privacy-safety-guide.html (add VPN banner to footer and share modal script)
let pSGHtml = fs.readFileSync('blog/privacy-safety-guide.html', 'utf8');
if (!pSGHtml.includes('openShareModal')) {
    const shareScript = `
    <script>
        window.openShareModal = function() {
            document.getElementById('shareModal').style.display = 'flex';
        }
    </script>
    `;
    pSGHtml = pSGHtml.replace(/<\/head>/, shareScript + '</head>');
}
if (!pSGHtml.includes('billing.purevpn.com/aff.php?aff=49387845')) {
    const vpnBanner = `
            <!-- VPN Affiliate Banner -->
            <div style="margin: 24px auto; max-width: 800px; padding: 22px 24px; background: linear-gradient(135deg, rgba(123,13,30,0.18) 0%, rgba(192,57,43,0.1) 100%); border: 1px solid rgba(192,57,43,0.4); border-radius: 16px; text-align: left;">
                <div style="font-size:0.72rem; color: var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:14px;">Sponsored &middot; Recommended VPN for Adult Sites</div>
                <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch;">
                    <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="noopener sponsored" style="flex:1; min-width:220px; display:flex; align-items:center; gap:16px; background: rgba(192,57,43,0.12); border: 1px solid rgba(192,57,43,0.4); border-radius:12px; padding:16px 20px; text-decoration:none; transition: all 0.2s;" onmouseover="this.style.background='rgba(192,57,43,0.22)';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(192,57,43,0.12)';this.style.transform=''">
                        <div style="font-size:2.4rem; flex-shrink:0;">🛡️</div>
                        <div style="flex:1;">
                            <div style="font-weight:900; color:#e74c3c; font-size:1rem; line-height:1.2; margin-bottom:4px;">PureVPN &mdash; Hide From Your ISP</div>
                            <div style="font-size:0.82rem; color:rgba(255,255,255,0.8); margin-bottom:6px;">Bypass ISP blocks, stay anonymous, access everything</div>
                            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                                <span style="background:rgba(231,76,60,0.25); color:#e74c3c; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">&#10003; Best Value: 2-Year Plan</span>
                                <span style="background:rgba(231,76,60,0.25); color:#e74c3c; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">&#10003; 31-Day Money Back</span>
                            </div>
                        </div>
                        <div style="background:linear-gradient(135deg,#c0392b,#e74c3c); color:white; padding:10px 18px; border-radius:10px; font-weight:900; font-size:0.9rem; white-space:nowrap; flex-shrink:0;">Get PureVPN &rarr;</div>
                    </a>
                </div>
            </div>`;
    pSGHtml = pSGHtml.replace(/(<div class="footer-links">)/, vpnBanner + '\n            $1');
}
fs.writeFileSync('blog/privacy-safety-guide.html', pSGHtml, 'utf8');
console.log('blog/privacy-safety-guide.html fixed.');

// 9. blog/hanime-alternatives-2026.html
let haHtml = fs.readFileSync('blog/hanime-alternatives-2026.html', 'utf8');
haHtml = haHtml.replace(/7 Best/g, 'Top 5');
fs.writeFileSync('blog/hanime-alternatives-2026.html', haHtml, 'utf8');

// 10. contact.html
let contactHtml = fs.readFileSync('contact.html', 'utf8');
contactHtml = contactHtml.replace(/Read the Contact Us - HentaiVault for HentaiVault\.me\. Discover our guidelines, policies/g, 'Contact the HentaiVault team for support, site submissions, or inquiries.');
fs.writeFileSync('contact.html', contactHtml, 'utf8');

// 11. privacy.html
let privHtml = fs.readFileSync('privacy.html', 'utf8');
privHtml = privHtml.replace(/ExoClick/g, 'our trusted advertising partners');
fs.writeFileSync('privacy.html', privHtml, 'utf8');

// 12. Fix the blog stub top-10-sites-may-2026.html
let stubHtml = fs.readFileSync('blog/top-10-sites-may-2026.html', 'utf8');
if (stubHtml.includes('<p class="intro">Welcome to the definitive top 10 list for May 2026.</p>') || stubHtml.includes('<article class="review-content">\r\n</article>')) {
    // Fill out the stub
    const stubContent = `
<h1 style="color: var(--text-main); font-size: 2.5rem; margin-bottom: 20px;">Top 10 Hentai Sites of May 2026</h1>
<p style="color: var(--text-muted); margin-bottom: 40px;">Here is the definitive ranked list of the best sites this month.</p>
<ol style="color: var(--text-main); font-size: 1.1rem; line-height: 1.8; margin-left: 20px;">
    <li><strong>Hitomi.la</strong> - Flawless reading experience for doujinshi.</li>
    <li><strong>Hanime.tv</strong> - The reigning champion of high-quality hentai streaming.</li>
    <li><strong>nhentai.net</strong> - The golden standard archive.</li>
    <li><strong>Rule34.xxx</strong> - Absolute behemoth for image boards.</li>
    <li><strong>Fakku</strong> - The ethical, legal choice for premium manga.</li>
    <li><strong>HentaiHaven.xxx</strong> - A solid streaming alternative.</li>
    <li><strong>Gelbooru</strong> - Classic booru with rapid updates.</li>
    <li><strong>Manganelo (Adult)</strong> - Excellent for manhwa and webtoons.</li>
    <li><strong>E-Hentai</strong> - The largest raw archive.</li>
    <li><strong>Kemono.party</strong> - Incredible for Patreon creator archives.</li>
</ol>
`;
    stubHtml = stubHtml.replace(/<article class="review-content">[\s\S]*?<\/article>/, '<article class="review-content">' + stubContent + '</article>');
    fs.writeFileSync('blog/top-10-sites-may-2026.html', stubHtml, 'utf8');
}
console.log('blog/top-10-sites-may-2026.html fixed.');
