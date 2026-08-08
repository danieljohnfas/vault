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
  'Adult Studios', 'Adult VR', 'Premium Creators',
];


// Rate Limiter
const RATE_LIMIT_SECONDS = 60;
const MAX_REQS = 2;

async function checkRateLimit(ip, env) {
  if (!ip || !env.PUSH_SUBSCRIBERS) return false;
  const key = `ratelimit:${ip}`;
  try {
    let count = await env.PUSH_SUBSCRIBERS.get(key);
    count = count ? parseInt(count) : 0;
    if (count >= MAX_REQS) return true;
    
    await env.PUSH_SUBSCRIBERS.put(key, (count + 1).toString(), { expirationTtl: RATE_LIMIT_SECONDS });
    return false;
  } catch (e) {
    return false;
  }
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// We no longer load the massive data.js file into the Worker memory.
// D1 handles all backend queries to respect the 10ms CPU limit.

class HeadHandler {
  constructor(site, canonicalUrl, lang) {
    this.site = site;
    this.canonicalUrl = canonicalUrl;
    this.lang = lang;
  }
  element(element) {
    const desc = (this.site.description || '').replace(/"/g, '&quot;');
    const title = `${this.site.name} Review | HentaiVault`;
    
    element.append(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    // CTR-optimised meta description: specific, keyword-rich, includes rating and category
    const ratingText = this.site.rating ? `${this.site.rating}/5 stars.` : '';
    const catText = this.site.category ? `${this.site.category} site.` : '';
    const shortDesc = (this.site.description || '').replace(/"/g, '&quot;').slice(0, 80);
    const metaDesc = `Is ${this.site.name} safe & working in 2026? Our expert review covers content quality, safety, ads & alternatives. ${ratingText} ${catText} ${shortDesc}`.trim().slice(0, 160);
    element.append(`<meta name="description" content="${metaDesc}">`, { html: true });
    
    // Open Graph
    element.append(`<meta property="og:title" content="${title}">`, { html: true });
    element.append(`<meta property="og:description" content="${desc}">`, { html: true });
    element.append(`<meta property="og:url" content="${this.canonicalUrl}">`, { html: true });
    element.append(`<meta property="og:type" content="article">`, { html: true });
    
    // Twitter Card
    element.append(`<meta name="twitter:card" content="summary">`, { html: true });
    element.append(`<meta name="twitter:title" content="${title}">`, { html: true });
    element.append(`<meta name="twitter:description" content="${desc}">`, { html: true });
    
    // JSON-LD Knowledge Graph Entity Schema (Organization, WebSite, Review)
    const reviewSchema = {
      "@context": "https://schema.org/",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://hentaivault.me/#organization",
          "name": "HentaiVault",
          "url": "https://hentaivault.me",
          "logo": {
            "@type": "ImageObject",
            "url": "https://hentaivault.me/assets/favicon.png"
          },
          "sameAs": [
            "https://github.com/danieljohnfas/vault",
            "https://twitter.com/hentaivault"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://hentaivault.me/#website",
          "url": "https://hentaivault.me",
          "name": "HentaiVault",
          "publisher": { "@id": "https://hentaivault.me/#organization" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://hentaivault.me/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": this.site.name,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web",
            "url": this.site.url || this.canonicalUrl
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": this.site.rating || 4.5,
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": { "@id": "https://hentaivault.me/#organization" },
          "reviewBody": desc,
          "publisher": { "@id": "https://hentaivault.me/#organization" }
        }
      ]
    };
    element.append(`<script type="application/ld+json">${JSON.stringify(reviewSchema).replace(/</g, '\\u003c')}<\/script>`, { html: true });
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

class ReviewBodyHandler {
  constructor(site, lang, sitesData) {
    this.site = site;
    this.lang = lang;
    this.sitesData = sitesData;
  }
  element(element) {
    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str).replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag));
    };

    const urlObj = new URL(this.site.url);
    const domain = urlObj.hostname;
    const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

    const labels = {
        en: {
            expertReview: "Expert Review", pros: "Pros", cons: "Cons", conclusion: "Conclusion",
            conclusionText: `If you are looking for a reliable source for ${this.site.category}, ${this.site.name} is a top-tier choice. It ranks highly in our directory for its ease of use and content variety.`,
            ready: "Ready to explore?", visitBelow: "Visit the official site below.", visitSite: `Visit ${this.site.name} &rarr;`, similar: "Similar Sites You May Like", rating: "Rating: "
        },
        fr: {
            expertReview: "Avis d'expert", pros: "Points forts", cons: "Points faibles", conclusion: "Conclusion",
            conclusionText: `Si vous recherchez une source fiable pour ${this.site.category.toLowerCase()}, ${this.site.name} est un choix de premier ordre. Il se classe très bien dans notre annuaire pour sa facilité d'utilisation et sa variété de contenu.`,
            ready: "Prêt à explorer ?", visitBelow: "Visitez le site officiel ci-dessous.", visitSite: `Visiter ${this.site.name} &rarr;`, similar: "Sites similaires que vous pourriez aimer", rating: "Note : "
        },
        es: {
            expertReview: "Reseña de expertos", pros: "Pros", cons: "Contras", conclusion: "Conclusión",
            conclusionText: `Si está buscando una fuente confiable para ${this.site.category.toLowerCase()}, ${this.site.name} es una opción de primer nivel. Ocupa un lugar destacado en nuestro directorio por su facilidad de uso y variedad de contenido.`,
            ready: "¿Listo para explorar?", visitBelow: "Visite el sitio oficial a continuación.", visitSite: `Visitar ${this.site.name} &rarr;`, similar: "Sitios similares que le pueden gustar", rating: "Calificación: "
        },
        jp: {
            expertReview: "専門家によるレビュー", pros: "メリット", cons: "デメリット", conclusion: "結論",
            conclusionText: `${this.site.category}の信頼できるソースをお探しの場合は、${this.site.name}が最適です。使いやすさとコンテンツの多様性により、当ディレクトリで高い評価を得ています。`,
            ready: "探索する準備はできましたか？", visitBelow: "以下の公式サイトをご覧ください。", visitSite: `${this.site.name}を訪問する &rarr;`, similar: "あなたにおすすめの類似サイト", rating: "評価: "
        },
        pt: {
            expertReview: "Revisão de Especialista", pros: "Prós", cons: "Contras", conclusion: "Conclusão",
            conclusionText: `Se você está procurando uma fonte confiável para ${this.site.category.toLowerCase()}, ${this.site.name} é uma escolha de primeira linha. Ele tem uma classificação alta em nosso diretório por sua facilidade de uso e variedade de conteúdo.`,
            ready: "Pronto para explorar?", visitBelow: "Visite o site oficial abaixo.", visitSite: `Visitar ${this.site.name} &rarr;`, similar: "Sites semelhantes que você pode gostar", rating: "Avaliação: "
        },
        hi: {
            expertReview: "विशेषज्ञ समीक्षा", pros: "खूबियां", cons: "खामियां", conclusion: "निष्कर्ष",
            conclusionText: `यदि आप ${this.site.category.toLowerCase()} के लिए एक विश्वसनीय स्रोत की तलाश कर रहे हैं, तो ${this.site.name} एक शीर्ष विकल्प है। उपयोग में आसानी और सामग्री की विविधता के लिए यह हमारी निर्देशिका में उच्च स्थान पर है।`,
            ready: "खोजने के लिए तैयार हैं?", visitBelow: "नीचे आधिकारिक साइट पर जाएं।", visitSite: `${this.site.name} पर जाएं &rarr;`, similar: "समान साइटें जो आपको पसंद आ सकती हैं", rating: "रेटिंग: "
        },
        ar: {
            expertReview: "مراجعة الخبراء", pros: "الإيجابيات", cons: "السلبيات", conclusion: "استنتاج",
            conclusionText: `إذا كنت تبحث عن مصدر موثوق لـ ${this.site.category.toLowerCase()} ، فإن ${this.site.name} يعد خيارًا من الدرجة الأولى. يحتل مرتبة عالية في دليلنا لسهولة استخدامه وتنوع محتواه.`,
            ready: "هل أنت مستعد للاستكشاف؟", visitBelow: "قم بزيارة الموقع الرسمي أدناه.", visitSite: `زيارة ${this.site.name} &rarr;`, similar: "مواقع مشابهة قد تعجبك", rating: "التقييم: "
        },
        de: {
            expertReview: "Expertenbewertung", pros: "Vorteile", cons: "Nachteile", conclusion: "Fazit",
            conclusionText: `Wenn Sie nach einer zuverlässigen Quelle für ${this.site.category.toLowerCase()} suchen, ist ${this.site.name} eine erstklassige Wahl. Es rangiert in unserem Verzeichnis hoch wegen seiner Benutzerfreundlichkeit und Inhaltsvielfalt.`,
            ready: "Bereit zum Erkunden?", visitBelow: "Besuchen Sie die offizielle Website unten.", visitSite: `${this.site.name} besuchen &rarr;`, similar: "Ähnliche Seiten, die Ihnen gefallen könnten", rating: "Bewertung: "
        }
    };
    const l = labels[this.lang] || labels.en;
    const localName = escapeHTML(this.site[`name_${this.lang}`] || this.site.name);
    const localCat  = escapeHTML(this.site.category);
    const localDesc = escapeHTML(this.site[`description_${this.lang}`] || this.site.description);
    let fallbackText = `${localName} has established itself as a premier destination for ${localCat.toLowerCase()} enthusiasts. In our 2026 audit, we found the site to be highly responsive and maintained with high-quality content.`;
    if (this.lang === 'fr') fallbackText = `${localName} s'est imposé comme une destination de premier choix pour les passionnés de ${localCat.toLowerCase()}. Lors de notre audit de 2026, nous avons constaté que le site était très réactif et maintenu avec un contenu de haute qualité.`;
    else if (this.lang === 'es') fallbackText = `${localName} se ha establecido como un destino de primer nivel para los entusiastas de ${localCat.toLowerCase()}. En nuestra auditoría de 2026, encontramos que el sitio es muy receptivo y se mantiene con contenido de alta calidad.`;
    else if (this.lang === 'jp') fallbackText = `${localName}は、${localCat}ファンのための主要な目的地として定着しています。2026年の監査では、サイトの応答性が非常に高く、高品質なコンテンツが維持されていることが確認されました。`;
    else if (this.lang === 'pt') fallbackText = `${localName} estabeleceu-se como um destino de primeira linha para entusiastas de ${localCat.toLowerCase()}. Em nossa auditoria de 2026, descobrimos que o site é altamente responsivo e mantido com conteúdo de alta qualidade.`;
    else if (this.lang === 'hi') fallbackText = `${localName} ने ${localCat} के प्रति उत्साही लोगों के लिए खुद को एक प्रमुख गंतव्य के रूप में स्थापित किया है। हमारे 2026 के ऑडिट में, हमने पाया कि साइट अत्यधिक उत्तरदायी है और उच्च गुणवत्ता वाली सामग्री के साथ बनाए रखी गई है।`;
    else if (this.lang === 'ar') fallbackText = `أثبتت ${localName} نفسها كوجهة رئيسية لعشاق ${localCat}. في مراجعتنا لعام 2026، وجدنا أن الموقع سريع الاستجابة ويتم الحفاظ عليه بمحتوى عالي الجودة.`;
    else if (this.lang === 'de') fallbackText = `${localName} hat sich als erstklassiges Ziel für ${localCat}-Enthusiasten etabliert. Bei unserem Audit im Jahr 2026 stellten wir fest, dass die Seite sehr reaktionsschnell ist und mit hochwertigen Inhalten gepflegt wird.`;
    const localReviewText = escapeHTML(this.site[`longReview_${this.lang}`] || this.site.longReview) || (localDesc ? (localDesc + ' ' + fallbackText) : fallbackText);

    // Map categories to high-intent Hub URLs
    const categoryHubSlugs = {
      'Manga': '/category/manga-doujin',
      'Doujinshi': '/category/manga-doujin',
      'Manga / Doujin': '/category/manga-doujin',
      'Hentai Streaming': '/category/hentai-streaming',
      'Anime Streaming': '/category/anime-streaming',
      'Anime': '/category/anime-streaming',
      'Images / Boorus': '/category/images-boorus',
      'Boorus': '/category/images-boorus',
      'Games': '/category/games',
      'Adult Games': '/category/games',
      'Visual Novels': '/category/visual-novels',
      'Communities': '/category/communities',
      'Downloads': '/category/downloads'
    };
    const hubUrl = categoryHubSlugs[this.site.category] || null;
    // Jaccard tag similarity — score by tag overlap + category bonus
    const jaccardSimilarity = (tagsA, tagsB) => {
        if (!tagsA || !tagsB || tagsA.length === 0 || tagsB.length === 0) return 0;
        const setA = new Set(tagsA);
        const setB = new Set(tagsB);
        const intersection = [...setA].filter(t => setB.has(t)).length;
        const union = new Set([...tagsA, ...tagsB]).size;
        return union === 0 ? 0 : intersection / union;
    };
    const related = this.sitesData
        .filter(s => s.id !== this.site.id)
        .map(s => ({
            site: s,
            score: (s.category === this.site.category ? 0.5 : 0) +
                   jaccardSimilarity(this.site.tags || [], s.tags || [])
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(r => r.site);

    const relatedHTML = related.map(s => {
        const sUrl = new URL(s.url);
        const sFavicon = `https://icons.duckduckgo.com/ip3/${sUrl.hostname}.ico`;
        return `
            <a href="/site?id=${s.id}" class="card btn-visit-tracked" data-id="${s.id}" style="display:block; text-decoration:none; color:inherit;">
                <div class="card-header">
                    <img src="${sFavicon}" alt="${escapeHTML(s.name)} logo" class="card-icon" width="32" height="32" loading="lazy">
                    <div>
                        <div class="card-title">${escapeHTML(s.name)}</div>
                        <div class="card-category">${escapeHTML(s.category)}</div>
                    </div>
                </div>
                <div class="card-desc" style="font-size:0.85rem; -webkit-line-clamp: 2;">${escapeHTML(s.description)}</div>
            </a>
        `;
    }).join('');

    const isUp = this.site.isUp !== false;
    const statusColor = isUp ? '#22c55e' : '#ef4444';
    const statusText = isUp ? 'Online' : 'Offline';

    const html = `
        <!-- Hero Section -->
        <div class="review-hero">
            <div class="review-hero-bg" style="background-image: url('${faviconUrl}');"></div>
            <div class="review-hero-content">
                <img src="${faviconUrl}" alt="${localName} logo" class="review-hero-icon" width="100" height="100" onerror="this.style.display='none'">
                <div class="review-hero-text">
                    <div class="hero-badges">
                        <span class="hero-badge hero-badge-cat">${localCat}</span>
                        <span class="hero-badge ${isUp ? 'hero-badge-status-online' : 'hero-badge-status-offline'}">
                            <span class="status-dot" style="background:${statusColor}; box-shadow: 0 0 6px ${statusColor};"></span>
                            ${statusText}
                        </span>
                        <span class="hero-badge hero-badge-rating">
                            ${ '★'.repeat(Math.floor(this.site.rating)) }${ this.site.rating % 1 >= 0.5 ? '½' : '' } ${this.site.rating}/5
                        </span>
                    </div>
                    <h1>${localName}</h1>
                    <p class="review-hero-desc">${localDesc || ''}</p>
                </div>
            </div>
        </div>

        <!-- Three-column layout -->
        <div class="review-grid">

            <!-- LEFT RAIL: PureVPN Ads (visible on screens > 1100px) -->
            <aside class="review-left-rail">
                <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="nofollow noopener sponsored" class="skyscraper-card" style="background:linear-gradient(135deg, rgba(2,207,142,0.15), rgba(1,154,105,0.08)); border-color:rgba(2,207,142,0.4);">
                    <div class="sky-sponsored">Sponsored</div>
                    <div class="sky-body">
                        <div class="sky-logo-row">
                            <img src="/assets/partners/purevpn-64.png" alt="PureVPN" class="sky-logo" onerror="this.style.display='none'">
                            <span class="sky-brand">PureVPN</span>
                        </div>
                        <p class="sky-headline">Site Blocked?</p>
                        <p class="sky-desc">Unblock nhentai, Hitomi.la & every other site in seconds. 6,500+ servers worldwide.</p>
                        <div style="background:#02cf8e; color:#000; font-weight:800; font-size:0.8rem; padding:8px 14px; border-radius:50px; text-align:center; margin-top:10px;">Unblock Now — $2.14/mo →</div>
                    </div>
                </a>
                <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="nofollow noopener sponsored" class="skyscraper-card" style="background:linear-gradient(135deg, rgba(2,207,142,0.15), rgba(1,154,105,0.08)); border-color:rgba(2,207,142,0.4);">
                    <div class="sky-sponsored">Sponsored</div>
                    <div class="sky-body">
                        <div class="sky-logo-row">
                            <img src="/assets/partners/purevpn-64.png" alt="PureVPN" class="sky-logo" onerror="this.style.display='none'">
                            <span class="sky-brand">PureVPN</span>
                        </div>
                        <p class="sky-headline">Browse Privately</p>
                        <p class="sky-desc">Zero logs, military-grade AES-256 encryption. Your ISP sees nothing.</p>
                        <div style="font-size:0.78rem; color:#02cf8e; font-weight:600; margin-top:8px;">✓ 31-day money-back guarantee</div>
                        <div class="sky-cta" style="color:#02cf8e; margin-top:6px;">Try Risk-Free →</div>
                    </div>
                </a>
                <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="nofollow noopener sponsored" class="skyscraper-card" style="background:linear-gradient(135deg, rgba(2,207,142,0.15), rgba(1,154,105,0.08)); border-color:rgba(2,207,142,0.4);">
                    <div class="sky-sponsored">Sponsored</div>
                    <div class="sky-body">
                        <div class="sky-logo-row">
                            <img src="/assets/partners/purevpn-64.png" alt="PureVPN" class="sky-logo" onerror="this.style.display='none'">
                            <span class="sky-brand">PureVPN</span>
                        </div>
                        <p class="sky-headline">Torrent Freely</p>
                        <p class="sky-desc">No speed throttling, P2P optimised servers. Download manga packs without ISP interference.</p>
                        <div class="sky-cta" style="color:#02cf8e;">Get Started →</div>
                    </div>
                </a>
            </aside>

            <!-- CENTER: Main review content -->
            <div class="review-main">

                <!-- Quick Verdict / At-a-Glance (High Readability & Search Snippets) -->
                <div class="review-card" style="background: linear-gradient(135deg, rgba(255,42,95,0.08), rgba(121,40,202,0.06)); border-color: rgba(255,42,95,0.3);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h2 style="font-size:1.15rem; margin:0;"><span class="card-icon">⚡</span> Vault Quick Verdict</h2>
                        <span style="background:rgba(34,197,94,0.15); color:#22c55e; font-weight:700; font-size:0.8rem; padding:4px 10px; border-radius:999px; border:1px solid rgba(34,197,94,0.3);">🛡️ Verified Safe &amp; Tested</span>
                    </div>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin-bottom:14px; font-size:0.88rem;">
                        <div style="background:var(--bg-surface-elevated); padding:10px 14px; border-radius:8px; border:1px solid var(--border);">
                            <div style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Best Suited For</div>
                            <div style="color:#fff; font-weight:600; margin-top:2px;">${localCat} Fans</div>
                        </div>
                        <div style="background:var(--bg-surface-elevated); padding:10px 14px; border-radius:8px; border:1px solid var(--border);">
                            <div style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Overall Rating</div>
                            <div style="color:#ffb703; font-weight:700; margin-top:2px;">⭐ ${this.site.rating || 4.5} / 5.0</div>
                        </div>
                        <div style="background:var(--bg-surface-elevated); padding:10px 14px; border-radius:8px; border:1px solid var(--border);">
                            <div style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; font-weight:700;">Status &amp; Mirrors</div>
                            <div style="color:${statusColor}; font-weight:600; margin-top:2px;">● ${statusText}</div>
                        </div>
                    </div>
                    ${hubUrl ? `<a href="${hubUrl}" style="display:inline-flex; align-items:center; gap:6px; color:#ff2a5f; font-weight:600; font-size:0.88rem; text-decoration:none; margin-top:4px;">📂 Explore Top-Ranked Sites in ${localCat} Hub &rarr;</a>` : ''}
                </div>

                <!-- Expert Review Card -->
                <div class="review-card">
                    <h2><span class="card-icon">📝</span> ${l.expertReview}</h2>
                    <p>${localReviewText}</p>
                </div>

                <!-- Pros & Cons Card -->
                <div class="review-card">
                    <h2><span class="card-icon">⚖️</span> Pros &amp; Cons</h2>
                    <div class="pros-cons">
                        <div class="pc-box pros">
                            <h3 style="color:#4ade80;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                ${l.pros}
                            </h3>
                            <ul class="pc-list">
                                ${ (this.site.pros || ['High quality content', 'Regular updates', 'Fast loading speeds']).map(p => `<li><span class="pc-mark" style="color:#4ade80;">✓</span>${escapeHTML(p)}</li>`).join('') }
                            </ul>
                        </div>
                        <div class="pc-box cons">
                            <h3 style="color:#f87171;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                ${l.cons}
                            </h3>
                            <ul class="pc-list">
                                ${ (this.site.cons || ['Some intrusive ads', 'Requires high-speed connection']).map(c => `<li><span class="pc-mark" style="color:#f87171;">✕</span>${escapeHTML(c)}</li>`).join('') }
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Conclusion Card -->
                <div class="review-card">
                    <h2><span class="card-icon">🎯</span> ${l.conclusion}</h2>
                    <p>${l.conclusionText}</p>
                </div>

                <!-- PureVPN Inline Native CTA — visible to 100% of users across all devices -->
                <a href="https://billing.purevpn.com/aff.php?aff=49387845" target="_blank" rel="nofollow noopener sponsored"
                   style="display:block; text-decoration:none; background:linear-gradient(135deg, rgba(2,207,142,0.12), rgba(1,154,105,0.08)); border:1px solid rgba(2,207,142,0.35); border-radius:14px; padding:20px 22px; margin-bottom:20px; transition:border-color 0.2s, transform 0.2s;"
                   onmouseover="this.style.borderColor='rgba(2,207,142,0.7)';this.style.transform='translateY(-2px)'"
                   onmouseout="this.style.borderColor='rgba(2,207,142,0.35)';this.style.transform='none'">
                    <div style="font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#02cf8e; margin-bottom:10px;">🛡️ Sponsored — Reader Deal</div>
                    <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
                        <img src="/assets/partners/purevpn-64.png" alt="PureVPN" width="44" height="44" style="border-radius:10px; flex-shrink:0;" onerror="this.style.display='none'">
                        <div style="flex:1; min-width:0;">
                            <div style="font-size:1.05rem; font-weight:800; color:#fff; margin-bottom:3px;">Is ${localName} blocked in your country?</div>
                            <div style="font-size:0.88rem; color:#a1a1aa; line-height:1.4;">PureVPN unblocks every hentai & anime site. No logs, 6,500+ servers, works on all devices.</div>
                        </div>
                        <div style="background:#02cf8e; color:#000; font-weight:800; font-size:0.88rem; padding:10px 18px; border-radius:50px; white-space:nowrap; flex-shrink:0;">Unblock Now →</div>
                    </div>
                    <div style="display:flex; gap:16px; margin-top:14px; flex-wrap:wrap;">
                        <span style="font-size:0.8rem; color:#02cf8e; font-weight:600;">✓ Works on Netflix, Crunchyroll, nhentai</span>
                        <span style="font-size:0.8rem; color:#02cf8e; font-weight:600;">✓ 31-day money-back guarantee</span>
                        <span style="font-size:0.8rem; color:#02cf8e; font-weight:600;">✓ From $2.14/mo</span>
                    </div>
                </a>

                <!-- Compare Card -->
                <div class="review-card">
                    <h2><span class="card-icon">⚔️</span> Compare ${localName}</h2>
                    <div class="compare-links">
                        ${related.map(r => `<a href="/compare?site1=${this.site.id}&site2=${r.id}" class="compare-btn">${localName} vs ${escapeHTML(r.name)}</a>`).join('')}
                    </div>
                </div>

                <!-- Embed Widget Card -->
                <div class="review-card">
                    <h2><span class="card-icon">🏷️</span> Are you the owner?</h2>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 14px;">Show off your HentaiVault rating! Copy the embed code below.</p>
                    <textarea readonly style="width: 100%; height: 56px; background: #000; color: #0f0; padding: 10px; border-radius: var(--radius-md); border: 1px solid #333; font-family: monospace; font-size: 11px; resize: none;"><iframe src="https://hentaivault.me/embed?id=${this.site.id}" width="280" height="76" style="border:none; overflow:hidden;" scrolling="no" frameborder="0" allowTransparency="true" title="HentaiVault Rating Widget"></iframe></textarea>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin: 12px 0 8px;">Preview:</p>
                    <iframe src="/embed?id=${this.site.id}" width="280" height="76" style="border:none; overflow:hidden;" scrolling="no" frameborder="0" allowTransparency="true" title="HentaiVault Rating Widget for ${localName}"></iframe>
                </div>

                <!-- Related Sites -->
                <div class="review-card">
                    <h2><span class="card-icon">🔗</span> ${l.similar}</h2>
                    <div class="related-grid" id="relatedGrid">
                        ${relatedHTML}
                    </div>
                </div>

            </div><!-- /review-main -->

            <!-- RIGHT: Sticky Sidebar -->
            <aside class="review-sidebar">

                <!-- Visit Card -->
                <div class="sidebar-card">
                    <a href="${this.site.url}" target="_blank" rel="nofollow noopener noreferrer"
                       class="sidebar-visit-btn btn-visit-tracked"
                       data-id="${this.site.id}" data-outbound="${this.site.url}">
                        ${l.visitSite}
                    </a>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-label">Status</span>
                        <span class="sidebar-stat-value" style="color:${statusColor};">● ${statusText}</span>
                    </div>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-label">Category</span>
                        <span class="sidebar-stat-value">${localCat}</span>
                    </div>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-label">Rating</span>
                        <span class="sidebar-stat-value" style="color:#ff9900;">${ '★'.repeat(Math.floor(this.site.rating)) } ${this.site.rating}/5</span>
                    </div>
                    <div class="sidebar-stat">
                        <span class="sidebar-stat-label">Domain</span>
                        <span class="sidebar-stat-value" style="font-size:0.8rem; word-break:break-all;">${domain}</span>
                    </div>
                    <button onclick="copyEmbedBadge('${this.site.id}', '${safeName}')" id="btnEmbedBadge" class="btn-report" style="margin-top:8px; border-color:rgba(56,189,248,0.4); color:#38bdf8; font-weight:600;">🛡️ Embed Badge Code</button>
                    <button onclick="reportDeadLink('${this.site.id}')" id="btnReportDead" class="btn-report">⚠️ Report Dead Link</button>
                </div>

                <!-- pCloud Affiliate Banners — upgraded with price anchors & deal hooks -->
                <a href="https://partner.pcloud.com/r/156786" target="_blank" rel="nofollow noopener sponsored" class="skyscraper-card" style="background:linear-gradient(135deg, rgba(0,126,229,0.15), rgba(0,86,179,0.08)); border-color:rgba(0,126,229,0.45); margin-top:20px;">
                    <div class="sky-sponsored">Sponsored</div>
                    <div class="sky-body">
                        <div class="sky-logo-row">
                            <img src="/assets/partners/pcloud-64.png" alt="pCloud" class="sky-logo" onerror="this.style.display='none'">
                            <span class="sky-brand">pCloud</span>
                        </div>
                        <p class="sky-headline">10TB — Pay Once</p>
                        <p class="sky-desc">Store your entire manga & doujin collection forever. One-time payment, no subscriptions, no monthly bill.</p>
                        <div style="font-size:0.75rem; color:#60a5fa; margin:8px 0;">⚡ Limited offer: <strong style="color:#fff;">$399 once</strong> vs ~$1,800 over 5 years with competitors</div>
                        <div style="background:#007EE5; color:#fff; font-weight:800; font-size:0.8rem; padding:8px 14px; border-radius:50px; text-align:center; margin-top:6px;">Claim Lifetime Deal →</div>
                    </div>
                </a>
                <a href="https://partner.pcloud.com/r/156784" target="_blank" rel="nofollow noopener sponsored" class="skyscraper-card" style="background:linear-gradient(135deg, rgba(0,126,229,0.15), rgba(0,86,179,0.08)); border-color:rgba(0,126,229,0.45); margin-top:16px;">
                    <div class="sky-sponsored">Sponsored</div>
                    <div class="sky-body">
                        <div class="sky-logo-row">
                            <img src="/assets/partners/pcloud-64.png" alt="pCloud" class="sky-logo" onerror="this.style.display='none'">
                            <span class="sky-brand">pCloud Pass</span>
                        </div>
                        <p class="sky-headline">1 Password for Every Site</p>
                        <p class="sky-desc">Stop reusing passwords across sites. pCloud Pass stores them all with zero-knowledge encryption — even pCloud can't read them.</p>
                        <div style="font-size:0.75rem; color:#60a5fa; margin:8px 0;">✓ Free plan available &nbsp;✓ Works on all devices</div>
                        <div class="sky-cta" style="color:#60a5fa;">Try Free →</div>
                    </div>
                </a>

            </aside>

        </div><!-- /review-grid -->

        <script>
            function copyEmbedBadge(siteId, name) {
                var code = '<a href="https://hentaivault.me/site?id=' + siteId + '" target="_blank" title="' + (name || 'Site') + ' on HentaiVault"><img src="https://hentaivault.me/assets/favicon.png" width="16" height="16" alt="HentaiVault" /> Featured on HentaiVault</a>';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(function() {
                        var btn = document.getElementById('btnEmbedBadge');
                        if (btn) {
                            var oldText = btn.innerHTML;
                            btn.innerHTML = '✅ Badge Code Copied!';
                            setTimeout(function() { btn.innerHTML = oldText; }, 2500);
                        }
                    }).catch(function() {
                        prompt('Copy your site badge embed code:', code);
                    });
                } else {
                    prompt('Copy your site badge embed code:', code);
                }
            }

            function reportDeadLink(id) {
                const btn = document.getElementById('btnReportDead');
                if(btn.innerText.includes('Reporting')) return;
                btn.innerText = 'Reporting...';
                fetch('/api/report-link', { method: 'POST', body: JSON.stringify({id}) })
                  .then(r => r.json())
                  .then(d => {
                    if (d.success) btn.innerText = '✅ Removed. Thanks!';
                    else btn.innerText = '❌ Site is still alive';
                  })
                  .catch(() => btn.innerText = '⚠️ Error');
            }
        </script>
    `;

    // FAQ Schema for Rich Results
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Is ${localName} free?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, you can browse and access content on ${localName} for free.`
                }
            },
            {
                "@type": "Question",
                "name": `Is ${localName} safe?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, ${localName} has been reviewed and listed in our directory. However, we always recommend using an ad-blocker or VPN for adult websites.`
                }
            },
            {
                "@type": "Question",
                "name": `What is the best alternative to ${localName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `There are several great alternatives to ${localName} in the ${localCat} category. Check our Similar Sites section below for top-rated recommendations.`
                }
            }
        ]
    };
    const schemaScript = `\n<script type="application/ld+json">\n${JSON.stringify(faqSchema)}\n</script>\n`;

    element.setInnerContent(html + schemaScript, { html: true });
  }
}

// Injects a canonical <link> tag pointing to the clean URL.
// NOTE: We deliberately do NOT add ?lang= hreflang alternates here because:
// - The lang variants are client-side UI state, not separate indexable pages
// - Adding them as hreflang links caused Google to crawl them as separate pages
//   which triggered "Page with redirect" and "Crawled not indexed" GSC errors.

class EmbedHandler {
  constructor(site) {
    this.site = site;
  }
  element(element) {
    const urlObj = new URL(this.site.url);
    const domain = urlObj.hostname;
    const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    const fullStars = Math.floor(this.site.rating);
    const halfStar = (this.site.rating % 1) >= 0.5;
    let starsHtml = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - fullStars - (halfStar ? 1 : 0));
    
    // Quick script to inject the values safely
    const safeName = String(this.site.name || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/</g, '\\u003c');
    const script = `
        <script>
            document.getElementById('embed-icon').src = "${faviconUrl}";
            document.getElementById('embed-title').innerText = "${safeName}";
            document.getElementById('embed-rating').innerText = "${starsHtml}";
            document.getElementById('embed-link').href = "https://hentaivault.me/site?id=${this.site.id}";
        </script>
    `;
    element.append(script, { html: true });
  }
}
class CanonicalInjector {
  constructor(canonicalUrl, lang) {
    this.canonicalUrl = canonicalUrl;
    this.lang = lang;
  }
  element(element) {
    element.prepend(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
  }
}

class CanonicalRemover {
  element(element) {
    element.remove();
  }
}

class OutHandler {
  constructor(site) {
    this.site = site;
  }
  element(element) {
    element.setInnerContent(this.site.url);
  }
}

class CompareHeadHandler {
  constructor(site1, site2, canonicalUrl) {
    this.site1 = site1;
    this.site2 = site2;
    this.canonicalUrl = canonicalUrl;
  }
  element(element) {
    const title = `${this.site1.name} vs ${this.site2.name} | HentaiVault`;
    const desc = `Compare ${this.site1.name} and ${this.site2.name}. See which ${this.site1.category} site is better based on features, pros, cons, and ratings.`;
    
    element.append(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<meta name="robots" content="noindex, follow">`, { html: true });
    element.append(`<meta name="description" content="${desc}">`, { html: true });
    element.append(`<meta property="og:title" content="${title}">`, { html: true });
    element.append(`<meta property="og:description" content="${desc}">`, { html: true });
    element.append(`<meta property="og:url" content="${this.canonicalUrl}">`, { html: true });
  }
}

class CompareBodyHandler {
  constructor(site1, site2) {
    this.site1 = site1;
    this.site2 = site2;
  }
  element(element) {
    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str).replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag));
    };

    let s1Favicon = '';
    try { s1Favicon = `https://icons.duckduckgo.com/ip3/${new URL(this.site1.url).hostname}.ico`; } catch(e) {}
    let s2Favicon = '';
    try { s2Favicon = `https://icons.duckduckgo.com/ip3/${new URL(this.site2.url).hostname}.ico`; } catch(e) {}

    const html = `
      <div class="review-header" style="justify-content: center; text-align: center; flex-direction: column;">
          <h1 style="margin-bottom: 20px;">${escapeHTML(this.site1.name)} vs ${escapeHTML(this.site2.name)}</h1>
          <div class="review-badge">${escapeHTML(this.site1.category)}</div>
      </div>
      <div class="compare-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px;">
          
          <!-- Site 1 -->
          <div class="review-content" style="text-align: center;">
              <img src="${s1Favicon}" alt="${escapeHTML(this.site1.name)}" class="review-icon" style="margin: 0 auto 20px;">
              <h2>${escapeHTML(this.site1.name)}</h2>
              <div class="rating" style="margin-bottom: 20px;">Rating: ${this.site1.rating} / 5</div>
              <p style="text-align: left;">${escapeHTML(this.site1.description)}</p>
              
              <div class="pros-cons" style="grid-template-columns: 1fr; gap: 15px;">
                  <div class="pc-box pros" style="text-align: left;">
                      <h3>Pros</h3>
                      <ul class="pc-list">
                          ${(this.site1.pros || []).map(p => `<li>${escapeHTML(p)}</li>`).join('')}
                      </ul>
                  </div>
              </div>
              
              <div style="margin-top: 30px;">
                  <a href="/site?id=${this.site1.id}" class="btn-visit" style="background:var(--bg-elevated); color:var(--text-main); border:1px solid var(--border); margin-right: 10px;">Full Review</a>
                  <a href="/out?url=${encodeURIComponent(this.site1.url)}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit">Visit Site</a>
              </div>
          </div>

          <!-- Site 2 -->
          <div class="review-content" style="text-align: center;">
              <img src="${s2Favicon}" alt="${escapeHTML(this.site2.name)}" class="review-icon" style="margin: 0 auto 20px;">
              <h2>${escapeHTML(this.site2.name)}</h2>
              <div class="rating" style="margin-bottom: 20px;">Rating: ${this.site2.rating} / 5</div>
              <p style="text-align: left;">${escapeHTML(this.site2.description)}</p>
              
              <div class="pros-cons" style="grid-template-columns: 1fr; gap: 15px;">
                  <div class="pc-box pros" style="text-align: left;">
                      <h3>Pros</h3>
                      <ul class="pc-list">
                          ${(this.site2.pros || []).map(p => `<li>${escapeHTML(p)}</li>`).join('')}
                      </ul>
                  </div>
              </div>

              <div style="margin-top: 30px;">
                  <a href="/site?id=${this.site2.id}" class="btn-visit" style="background:var(--bg-elevated); color:var(--text-main); border:1px solid var(--border); margin-right: 10px;">Full Review</a>
                  <a href="${this.site2.url}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit btn-visit-tracked" data-id="${this.site2.id}">Visit Site</a>
              </div>
          </div>
      </div>
    `;

    element.setInnerContent(html, { html: true });
  }
}

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (err) {
      console.error('Unhandled worker error:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }
  },

  async scheduled(event, env, ctx) {
    return handleScheduled(event, env, ctx);
  }
};

// Security headers added to all HTML responses
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'interest-cohort=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://api.qrserver.com https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: http:",
    "frame-src 'self' https://challenges.cloudflare.com",
    "connect-src 'self' https://www.google-analytics.com https://api.indexnow.org",
    "frame-ancestors 'self'",
  ].join('; '),
};

function addSecurityHeaders(response) {
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newHeaders.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);

    // ── Force HTTPS redirect (fixes HTTP duplicate pages in GSC & Bing) ────────────
    if (url.protocol === 'http:') {
      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = 'https:';
      return new Response(null, {
        status: 301,
        headers: {
          'Location': httpsUrl.toString(),
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }

    // Detect Geo Lang
    const cookieHeader = request.headers.get('Cookie') || '';
    const langCookieMatch = cookieHeader.match(/hv_lang=([a-z]{2})/);
    const cookieLang = langCookieMatch ? langCookieMatch[1] : null;

    let detectedLang = 'en';
    const country = request.cf ? request.cf.country : null;
    if (country === 'BR') detectedLang = 'pt';
    else if (country === 'IN') detectedLang = 'hi';
    else if (country === 'MA') detectedLang = 'ar';
    else if (['DE', 'AT', 'CH'].includes(country)) detectedLang = 'de';
    else if (country === 'FR') detectedLang = 'fr';
    else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE'].includes(country)) detectedLang = 'es';
    else if (country === 'JP') detectedLang = 'jp';

    const effectiveLang = url.searchParams.get('lang') || cookieLang || detectedLang;

    // Geo-Routing/Redirect removed for SEO compliance.
    // The client-side i18n.js script handles language rendering client-side.

    // ── Route: IndexNow key verification ────────────────────────────────────
    if (env.INDEXNOW_KEY && url.pathname === `/${env.INDEXNOW_KEY}.txt`) {
      return new Response(env.INDEXNOW_KEY, {
        headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400' },
      });
    }

    // ── Route: Sitemaps — Dynamic sitemaps generated from live D1 data ───
    if (url.pathname === '/sitemap.xml') {
      const httpsUrl = new URL(request.url);
      httpsUrl.pathname = '/sitemap-index.xml';
      return new Response(null, {
        status: 301,
        headers: {
          'Location': httpsUrl.toString(),
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    if (url.pathname === '/sitemap-index.xml' || url.pathname === '/sitemap-pages.xml' || url.pathname === '/sitemap-sites.xml') {
      const today = new Date().toISOString().split('T')[0];
      let xml = '';

      if (url.pathname === '/sitemap-index.xml') {
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        xml += `  <sitemap>\n    <loc>https://hentaivault.me/sitemap-pages.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
        xml += `  <sitemap>\n    <loc>https://hentaivault.me/sitemap-sites.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
        xml += `</sitemapindex>`;
      } else if (url.pathname === '/sitemap-pages.xml') {
        const staticPages = [
          { loc: 'https://hentaivault.me/', priority: '1.0', changefreq: 'daily' },
          // Blog posts
          { loc: 'https://hentaivault.me/blog', priority: '0.8', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/nhentai-alternatives-2026', priority: '0.9', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/best-streaming-2026', priority: '0.9', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/best-doujin-sites-2026', priority: '0.9', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/hentai-apps-guide-2026', priority: '0.9', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/uncensored-streaming-guide-2026', priority: '0.9', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/free-manga-guide', priority: '0.8', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/hanime-alternatives-2026', priority: '0.8', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/blog/privacy-safety-guide', priority: '0.6', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/blog/top-10-sites-may-2026', priority: '0.7', changefreq: 'monthly' },
          // Core pages
          { loc: 'https://hentaivault.me/about', priority: '0.5', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/contact', priority: '0.5', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/privacy', priority: '0.3', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/terms', priority: '0.3', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/disclaimer', priority: '0.3', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/dmca', priority: '0.3', changefreq: 'monthly' },
          { loc: 'https://hentaivault.me/region-unblocked', priority: '0.5', changefreq: 'weekly' },
          // Category pages
          { loc: 'https://hentaivault.me/category/anime-streaming', priority: '0.8', changefreq: 'daily' },
          { loc: 'https://hentaivault.me/category/hentai-streaming', priority: '0.8', changefreq: 'daily' },
          { loc: 'https://hentaivault.me/category/manga-doujin', priority: '0.8', changefreq: 'daily' },
          { loc: 'https://hentaivault.me/category/images-boorus', priority: '0.7', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/category/games', priority: '0.7', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/category/communities', priority: '0.7', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/category/downloads', priority: '0.7', changefreq: 'weekly' },
          { loc: 'https://hentaivault.me/category/visual-novels', priority: '0.6', changefreq: 'weekly' },
        ];
        const staticXml = staticPages
          .map(p => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
          .join('\n');
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticXml}\n</urlset>`;
      } else if (url.pathname === '/sitemap-sites.xml') {
        let siteUrls = '';
        if (env.hv_directory) {
          try {
            // Fetch all site IDs and their added_at dates — only live, real entries
            const rows = await env.hv_directory.prepare(
              'SELECT id, category, added_at FROM sites ORDER BY rating DESC, added_at DESC'
            ).all();
            const topSites = rows.results.slice(0, 10);
            
            for (const row of rows.results) {
              const lastmod = row.added_at ? row.added_at.split('T')[0] : today;
              siteUrls += `  <url>\n    <loc>https://hentaivault.me/site?id=${row.id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
            }
            
            // Generate comparison URLs for top sites in same category
            for (let i = 0; i < topSites.length; i++) {
                for (let j = i + 1; j < topSites.length; j++) {
                    if (topSites[i].category === topSites[j].category) {
                        siteUrls += `  <url>\n    <loc>https://hentaivault.me/compare?site1=${topSites[i].id}&amp;site2=${topSites[j].id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
                    }
                }
            }
          } catch (err) {
            console.error('Sitemap D1 error:', err);
          }
        }
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${siteUrls}</urlset>`;
      }

      return new Response(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        }
      });
    }

    // ── Route: /api/site-count ───────────────────────────────────────────────
    if (url.pathname === '/api/site-count') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      try {
        const result = await env.hv_directory.prepare('SELECT COUNT(*) as count FROM sites').first();
        return new Response(
          JSON.stringify({ count: result.count }),
          { status: 200, headers: { ...CORS, 'Cache-Control': 'public, max-age=60' } }
        );
      } catch (err) {
        return jsonError('Database error', 500);
      }
    }

    // ── Route: /api/status ──────────────────────────────────────────────────────
    if (url.pathname === '/api/status') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      const targetUrl = url.searchParams.get('url');
      if (!targetUrl) return jsonError('Missing url', 400);

      try {
        const targetUrlObj = new URL(targetUrl);
        if (targetUrlObj.protocol !== 'http:' && targetUrlObj.protocol !== 'https:') {
          return jsonError('Invalid protocol', 400);
        }
        const hostname = targetUrlObj.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.')) {
          return jsonError('Invalid host', 400);
        }
        const start = Date.now();
        const res = await fetch(targetUrl, { 
          method: 'HEAD', 
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
          signal: AbortSignal.timeout(3500)
        });
        
        const latency = Date.now() - start;
        // Consider anything < 500 as "up", some sites return 403 for bots which means their server is UP
        const up = res.status >= 200 && res.status < 500 && res.status !== 404;
        
        return new Response(
          JSON.stringify({ up, latency, status: res.status }),
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ up: false, latency: 0, status: 0 }),
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=120' } }
        );
      }
    }

    // ── Route: /api/site ───────────────────────────────────────────────────────
    if (url.pathname === '/api/site') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      const id = url.searchParams.get('id');
      if (!id) return jsonError('Missing site id', 400);
      try {
        const result = await env.hv_directory.prepare('SELECT data_json FROM sites WHERE id = ?').bind(id).first();
        if (!result) return jsonError('Site not found', 404);
        return new Response(
          result.data_json,
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } }
        );
      } catch (err) {
        return jsonError('Database error', 500);
      }
    }

    // ── Route: /api/alternatives ────────────────────────────────────────────────
    if (url.pathname === '/api/alternatives') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      const id = url.searchParams.get('id');
      if (!id) return jsonError('Missing site id', 400);
      try {
        const target = await env.hv_directory.prepare('SELECT category FROM sites WHERE id = ?').bind(id).first();
        if (!target) return jsonError('Site not found', 404);
        
        const result = await env.hv_directory.prepare(`
          SELECT data_json 
          FROM sites 
          WHERE category = ? AND id != ? 
          ORDER BY rating DESC, added_at DESC 
          LIMIT 12
        `).bind(target.category, id).all();
        
        const sites = result.results.map(row => JSON.parse(row.data_json));
        return new Response(
          JSON.stringify({ sites }),
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } }
        );
      } catch (err) {
        return jsonError('Database error', 500);
      }
    }

    // ── Route: /api/subscribe-digest ───────────────────────────────────────
    if (url.pathname === '/api/subscribe-digest') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method !== 'POST') return jsonError('Method not allowed', 405);
      try {
        const body = await request.json();
        const email = (body.email || '').trim().toLowerCase();
        if (!email || !email.includes('@')) return jsonError('Invalid email', 400);
        // Store in KV using email as key, timestamped value
        if (env.PUSH_SUBSCRIBERS) {
          await env.PUSH_SUBSCRIBERS.put(`digest:${email}`, JSON.stringify({ email, subscribed_at: new Date().toISOString() }));
        }
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
      } catch (err) {
        return jsonError('Subscription failed', 500);
      }
    }

    // ── Route: /api/config ──────────────────────────────────────────────────
    // Guard: only serve ad config to same-site requests (Referer or Origin must
    // match hentaivault.me). Bare curl / scrapers get a 403.
    if (url.pathname === '/api/config') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      const referer = request.headers.get('Referer') || '';
      const origin  = request.headers.get('Origin')  || '';
      const isInternal = referer.includes('hentaivault.me') || origin.includes('hentaivault.me');
      if (!isInternal) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403, headers: { 'Content-Type': 'application/json' }
        });
      }
      // Keys are loaded from environment; no hardcoded fallbacks in source.
      return new Response(
        JSON.stringify({
          ad_skyscraper:    env.AD_KEY_SKYSCRAPER    || '',
          ad_leaderboard:   env.AD_KEY_LEADERBOARD   || '',
          ad_infeed:        env.AD_KEY_INFEED         || '',
          ad_sticky_bottom: env.AD_KEY_STICKY_BOTTOM  || '',
          ad_socialbar:     env.AD_KEY_SOCIALBAR      || '',
          ad_popunder:      env.AD_KEY_POPUNDER       || '',
          ad_native:        env.AD_KEY_NATIVE         || ''
        }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' } }
      );
    }

    // ── Route: /api/reviews ────────────────────────────────────────────────
    if (url.pathname === '/api/reviews') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      
      const site_id = url.searchParams.get('id');
      if (!site_id) return jsonError('Missing site id', 400);

      if (request.method === 'GET') {
        try {
          const result = await env.hv_directory.prepare('SELECT user_name, rating, comment, created_at FROM reviews WHERE site_id = ? ORDER BY created_at DESC').bind(site_id).all();
          return new Response(
            JSON.stringify({ reviews: result.results }),
            { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
          );
        } catch (err) {
          return jsonError('Database error', 500);
        }
      }

      if (request.method === 'POST') {
        try {
          const ip = request.headers.get('cf-connecting-ip');
          if (await checkRateLimit(ip, env)) {
            return jsonError('Too many submissions. Please try again later.', 429);
          }

          const body = await request.json();
          if (!body.rating || !body.comment) return jsonError('Missing required fields', 400);

          if (!body.turnstileToken) return jsonError('Please complete the CAPTCHA.', 400);
          
          const turnstileFormData = new FormData();
          turnstileFormData.append('secret', env.TURNSTILE_SECRET_KEY);
          turnstileFormData.append('response', body.turnstileToken);
          if (ip) turnstileFormData.append('remoteip', ip);
          
          const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST', body: turnstileFormData
          });
          const turnstileData = await turnstileRes.json();
          if (!turnstileData.success) return jsonError('CAPTCHA verification failed.', 400);

          await env.hv_directory.prepare(
            'INSERT INTO reviews (site_id, user_name, rating, comment) VALUES (?, ?, ?, ?)'
          ).bind(site_id, body.user_name || 'Anonymous', body.rating, body.comment).run();

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
          );
        } catch (err) {
          return jsonError('Failed to submit review', 500);
        }
      }
      return jsonError('Method not allowed', 405);
    }

    // ── Route: /api/site-of-the-day ─────────────────────────────────────────
    if (url.pathname === '/api/site-of-the-day' || url.pathname === '/api/site-of-the-week') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);

      try {
        const now = new Date();
        const dayStr = now.toISOString().split('T')[0];
        
        const topSites = await env.hv_directory.prepare('SELECT data_json FROM sites ORDER BY rating DESC LIMIT 50').all();
        if (topSites.results.length === 0) return jsonError('No sites found', 404);
        
        let hash = 0;
        for (let i = 0; i < dayStr.length; i++) hash += dayStr.charCodeAt(i);
        
        const selectedIdx = hash % topSites.results.length;
        const site = JSON.parse(topSites.results[selectedIdx].data_json);
        
        return new Response(JSON.stringify({ site }), {
          headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
        });
      } catch (e) {
        return jsonError('Error fetching site', 500);
      }
    }

    // ── Route: /api/directory-export-v2-full.json (Honeypot) ────────────────
    if (url.pathname === '/api/directory-export-v2-full.json') {
      // Rate-limit the honeypot to prevent bandwidth abuse from parallel scrapers
      const honeypotIp = request.headers.get('cf-connecting-ip');
      if (await checkRateLimit(honeypotIp, env)) {
        return new Response(null, { status: 429 });
      }
      // Scraper Honeypot: Return slow-streamed fake data (tarpit)
      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(new TextEncoder().encode('{"data":[\n'));
          let i = 0;
          function pushFake() {
            if (i > 5000) { controller.close(); return; } // Cap at 5000 to prevent Cloudflare Worker timeout eviction
            const fakeSite = { id: `site_${Math.random().toString(36).substring(7)}`, name: `Hentai${Math.random().toString(36).substring(7)}`, url: `https://fake-${Math.random().toString(36).substring(7)}.com`, rating: (Math.random() * 5).toFixed(1) };
            controller.enqueue(new TextEncoder().encode(JSON.stringify(fakeSite) + ',\n'));
            i++;
            setTimeout(pushFake, 5); // Stream slowly to tarpit
          }
          pushFake();
        }
      });
      return new Response(stream, { headers: { 'Content-Type': 'application/json' } });
    }

    // ── Route: /api/site-of-the-week ───────────────────────────────────────
    if (url.pathname === '/api/site-of-the-week') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);

      try {
        const now = new Date();
        const weekStr = now.getFullYear() + "-" + Math.floor(now.getTime() / (1000*60*60*24*7));
        
        const topSites = await env.hv_directory.prepare('SELECT data_json FROM sites ORDER BY rating DESC LIMIT 50').all();
        if (topSites.results.length === 0) return jsonError('No sites found', 404);
        
        let hash = 0;
        for (let i = 0; i < weekStr.length; i++) hash += weekStr.charCodeAt(i);
        const index = hash % topSites.results.length;
        
        const site = JSON.parse(topSites.results[index].data_json);
        
        return new Response(
          JSON.stringify({ site }),
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' } }
        );
      } catch (err) {
        return jsonError('Database error', 500);
      }
    }

    // ── Route: /api/sites ────────────────────────────────────────────────────
    if (url.pathname === '/api/sites') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      try {
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = parseInt(url.searchParams.get('limit')) || 24;
        const offset = (page - 1) * limit;
        
        let query = 'SELECT data_json FROM sites';
        let params = [];
        let conditions = [];
        
        const q = url.searchParams.get('q');
        if (q) {
          // Use FTS5 virtual table for lightning-fast full text search
          conditions.push('rowid IN (SELECT rowid FROM sites_fts WHERE sites_fts MATCH ?)');
          
          // Basic sanitize for FTS MATCH syntax to prevent syntax errors
          const sanitizedQ = q.replace(/["*()]/g, ' ').trim();
          params.push(`"${sanitizedQ}"*`);
        }
        
        const category = url.searchParams.get('category');
        if (category) {
          conditions.push('category = ?');
          params.push(category);
        }

        const tagsStr = url.searchParams.get('tags');
        if (tagsStr) {
          const tagsArray = tagsStr.split(',');
          // Use AND for advanced filtering
          const tagConditions = tagsArray.map(tag => {
            params.push(`%"${tag}"%`);
            return 'data_json LIKE ?';
          });
          conditions.push(`(${tagConditions.join(' AND ')})`);
        }
        
        // WHERE clause shared by count + data query (no exclude needed)
        const whereClause = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';
        const countResult = await env.hv_directory.prepare(
          'SELECT COUNT(*) as count FROM sites' + whereClause
        ).bind(...params).first();
        const total = countResult ? countResult.count : 0;

        query += whereClause;

        const sort = url.searchParams.get('sort') || 'random';
        if (q && sort === 'random') {
          // If user searched, prioritize FTS5 relevance (no ORDER BY needed as IN subquery loses rank, wait we can't easily order by rank with IN. Actually, FTS5 rank is better, but since it's a subquery we just let it be default or sort by rating if they asked)
        } else if (sort === 'rating' || sort === 'popular') {
          query += ' ORDER BY rating DESC';
        } else if (sort === 'newest') {
          query += ' ORDER BY added_at DESC';
        } else if (sort === 'alphabetical' || sort === 'alpha') {
          query += ' ORDER BY name ASC';
        } else {
          // Seeded deterministic random: stable per-session shuffle, OFFSET-safe
          // seed is a positive integer passed by the client once per session
          const rawSeed = parseInt(url.searchParams.get('seed') || '0', 10);
          const seed = (rawSeed > 0 && rawSeed < 2147483647) ? rawSeed : 1337;
          query += ` ORDER BY (rowid * ${seed}) % 1000000007`;
        }
        
        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);
        
        const result = await env.hv_directory.prepare(query).bind(...params).all();
        const sites = result.results.map(row => JSON.parse(row.data_json));
        
        return new Response(
          JSON.stringify({ total, sites }),
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } }
        );
      } catch (err) {
        console.error("Error fetching sites from D1:", err);
        return jsonError('Database error', 500);
      }
    }

    // ── Route: /rss.xml ─────────────────────────────────────────────────────
    if (url.pathname === '/rss.xml') {
      if (!env.hv_directory) return new Response('DB Error', { status: 500 });
      try {
        const result = await env.hv_directory.prepare('SELECT id, data_json, added_at FROM sites ORDER BY added_at DESC LIMIT 50').all();
        let items = '';
        for (const r of result.results) {
          const site = JSON.parse(r.data_json);
          const desc = sanitize(site.description || '');
          const pubDate = new Date(r.added_at).toUTCString();
          items += `
            <item>
              <title><![CDATA[${site.name} (${site.category})]]></title>
              <link>https://hentaivault.me/site?id=${site.id}</link>
              <guid>https://hentaivault.me/site?id=${site.id}</guid>
              <pubDate>${pubDate}</pubDate>
              <description><![CDATA[${desc}]]></description>
            </item>
          `;
        }
        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
          <rss version="2.0">
            <channel>
              <title>HentaiVault - New Sites</title>
              <link>https://hentaivault.me</link>
              <description>The latest adult sites and directories added to HentaiVault.</description>
              <language>en-us</language>
              ${items}
            </channel>
          </rss>`;
        return new Response(rss, { headers: { 'Content-Type': 'application/rss+xml', 'Cache-Control': 'public, max-age=3600' } });
      } catch (e) {
        return new Response('Error generating RSS', { status: 500 });
      }
    }

    // ── Route: /api/report-link ──────────────────────────────────────────────
    if (url.pathname === '/api/report-link') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (request.method !== 'POST') return jsonError('Method not allowed', 405);
      if (!env.hv_directory) return jsonError('DB not configured', 500);
      try {
        const body = await request.json();
        if (!body.id) return jsonError('Missing ID', 400);
        
        const row = await env.hv_directory.prepare('SELECT url FROM sites WHERE id = ?').bind(body.id).first();
        if (!row) return jsonError('Not found', 404);
        
        let isDead = false;
        try {
          const res = await fetch(row.url, { 
            method: 'HEAD', 
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
            signal: AbortSignal.timeout(5000) 
          });
          if (res.status === 404 || res.status >= 500) isDead = true;
        } catch (e) {
          isDead = true;
        }
        
        if (isDead) {
          // Changed during audit: DO NOT permanently delete sites via anonymous API.
          // In a real system, we would flag this for manual review.
          // For now, simply return success so the frontend stops pinging it.
          console.log(`[REPORT LINK] Flagged site ${body.id} as dead. Needs manual review.`);
          return new Response(JSON.stringify({ success: true, removed: false, flagged: true }), { headers: CORS });
        } else {
          return new Response(JSON.stringify({ success: false, removed: false, msg: 'Site is responding.' }), { headers: CORS });
        }
      } catch (e) {
        return jsonError('Error reporting', 500);
      }
    }

    // ── Route: /api/vault/sync ──────────────────────────────────────────────
    if (url.pathname === '/api/vault/sync') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (!env.PUSH_SUBSCRIBERS) return jsonError('KV not configured', 500);
      
      const code = url.searchParams.get('code');
      if (!code || code.length < 8) return jsonError('Invalid code', 400);
      const key = `vault_sync:${code}`;

      if (request.method === 'GET') {
        const data = await env.PUSH_SUBSCRIBERS.get(key);
        return new Response(data || '[]', { headers: { ...CORS, 'Content-Type': 'application/json' } });
      } 
      else if (request.method === 'POST') {
        const ip = request.headers.get('CF-Connecting-IP');
        if (await checkRateLimit(ip, env)) return jsonError('Rate limit exceeded', 429);
        
        const body = await request.text();
        if (body.length > 20000) return jsonError('Payload too large', 413);
        
        await env.PUSH_SUBSCRIBERS.put(key, body);
        return new Response(JSON.stringify({ success: true }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
      }
      return jsonError('Method not allowed', 405);
    }

    // ── Route: /api/click ───────────────────────────────────────────────────
    if (url.pathname === '/api/click') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (request.method !== 'POST') return jsonError('Method not allowed', 405);
      if (!env.hv_directory) return jsonError('DB not configured', 500);
      try {
        const body = await request.json();
        if (!body.id) return jsonError('Missing ID', 400);
        
        if (body.id.startsWith('amz_')) {
            await env.hv_directory.prepare('UPDATE amazon_ads SET clicks = clicks + 1 WHERE id = ?').bind(body.id).run();
        } else {
            await env.hv_directory.prepare('UPDATE sites SET clicks = clicks + 1 WHERE id = ?').bind(body.id).run();
        }
        
        return new Response(JSON.stringify({ success: true }), { headers: CORS });
      } catch (e) {
        return jsonError('Error updating click', 500);
      }
    }

    // ── Route: /api/trending ────────────────────────────────────────────────
    if (url.pathname === '/api/trending') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (!env.hv_directory) return jsonError('DB not configured', 500);
      try {
        const result = await env.hv_directory.prepare('SELECT data_json FROM sites ORDER BY clicks DESC LIMIT 3').all();
        const sites = result.results.map(r => {
            const s = JSON.parse(r.data_json);
            s.isTrending = true;
            return s;
        });
        return new Response(JSON.stringify({ sites }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
      } catch (e) {
        return jsonError('Error fetching trending', 500);
      }
    }

    // ── Route: /api/recommend ───────────────────────────────────────────────
    if (url.pathname === '/api/recommend') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (!env.hv_directory) return jsonError('DB not configured', 500);
      try {
        const likes = url.searchParams.get('likes');
        if (!likes) return new Response(JSON.stringify({ sites: [] }), { headers: CORS });
        const likeIds = likes.split(',');
        
        const placeholders = likeIds.map(() => '?').join(',');
        const queryLiked = `SELECT data_json FROM sites WHERE id IN (${placeholders})`;
        const likedRes = await env.hv_directory.prepare(queryLiked).bind(...likeIds).all();
        
        const tagFreq = {};
        for (const r of likedRes.results) {
            const s = JSON.parse(r.data_json);
            if (s.tags) s.tags.forEach(t => { tagFreq[t] = (tagFreq[t] || 0) + 1 });
        }
        
        const sortedTags = Object.entries(tagFreq).sort((a,b) => b[1]-a[1]).map(x => x[0]).slice(0, 2);
        
        if (sortedTags.length === 0) return new Response(JSON.stringify({ sites: [] }), { headers: CORS });
        
        const tagConditions = sortedTags.map(tag => `data_json LIKE ?`).join(' AND ');
        const params = sortedTags.map(t => `%"${t}"%`);
        params.push(...likeIds);
        
        const queryRec = `SELECT data_json FROM sites WHERE (${tagConditions}) AND id NOT IN (${placeholders}) ORDER BY rating DESC LIMIT 5`;
        const recRes = await env.hv_directory.prepare(queryRec).bind(...params).all();
        
        const sites = recRes.results.map(r => JSON.parse(r.data_json));
        return new Response(JSON.stringify({ sites }), { headers: { ...CORS, 'Content-Type': 'application/json' } });
      } catch (e) {
        return jsonError('Error fetching recommendations', 500);
      }
    }



    // ── Route: /api/random ──────────────────────────────────────────────────
    // ── Route: /api/audit-sites (temporary — edge-side batch ping + context check) ──
    if (url.pathname === '/api/audit-sites') {
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      const offset = parseInt(url.searchParams.get('offset')) || 0;
      const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 50);

      const { results } = await env.hv_directory.prepare(
        'SELECT id, url, category, data_json FROM sites ORDER BY id LIMIT ? OFFSET ?'
      ).bind(limit, offset).all();

      // Known hentai/anime context keywords
      const CONTEXT_KEYWORDS = [
        'hentai','ecchi','doujin','manga','anime','adult','nsfw','xxx','porn','erotic',
        'lewd','rule34','booru','nhentai','hanime','uncensored','streaming','visual novel',
        'fanfic','cosplay','waifu','tentacle','yaoi','yuri','loli','shota','futanari',
        'ahegao','ntr','patreon','fanbox','creator','game','comic','tube','studio'
      ];

      const OFF_CONTEXT_CATEGORIES = ['Communities', 'Communities & Forums'];

      const results_out = [];

      await Promise.all(results.map(async (row) => {
        let up = false;
        let statusCode = 0;
        let latency = 0;

        try {
          const start = Date.now();
          const res = await fetch(row.url, {
            method: 'HEAD',
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
            signal: AbortSignal.timeout(4000)
          });
          latency = Date.now() - start;
          statusCode = res.status;
          up = res.status >= 200 && res.status < 500 && res.status !== 404;
        } catch (e) {
          up = false;
        }

        // Context check — inspect name + description + category in data_json
        let fitsContext = true;
        let siteData = {};
        try { siteData = JSON.parse(row.data_json); } catch(e) {}
        const textToCheck = `${siteData.name || ''} ${siteData.description || ''} ${row.category || ''}`.toLowerCase();
        const hasKeyword = CONTEXT_KEYWORDS.some(k => textToCheck.includes(k));
        if (!hasKeyword) fitsContext = false;

        results_out.push({
          id: row.id,
          url: row.url,
          category: row.category,
          name: siteData.name || row.id,
          up,
          statusCode,
          latency,
          fitsContext
        });
      }));

      const total = await env.hv_directory.prepare('SELECT COUNT(*) as count FROM sites').first();

      return new Response(JSON.stringify({
        offset,
        limit,
        total: total ? total.count : 0,
        results: results_out
      }), { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
    }

    if (url.pathname === '/api/random') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError('Database not configured', 500);
      try {
        const result = await env.hv_directory.prepare('SELECT id, name, url, category FROM sites ORDER BY RANDOM() LIMIT 1').first();
        if (!result) return jsonError('No sites found', 404);
        return new Response(
          JSON.stringify(result),
          { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } }
        );
      } catch (err) {
        return jsonError('Database error', 500);
      }
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

    // ── Route: /api/push-subscribe ──────────────────────────────────────────
    if (url.pathname === '/api/push-subscribe') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method === 'POST') {
        if (!env.PUSH_SUBSCRIBERS) return jsonError('Push KV namespace not configured.', 500);
        try {
          const subscription = await request.json();
          if (!subscription || !subscription.endpoint) return jsonError('Invalid subscription', 400);
          
          // Use a hash or trailing part of endpoint as the key
          const key = `sub_${encodeB64(subscription.endpoint).slice(-30)}`;
          await env.PUSH_SUBSCRIBERS.put(key, JSON.stringify(subscription));
          
          return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS });
        } catch (e) {
          return jsonError('Bad request payload.', 400);
        }
      }
      return jsonError('Method not allowed.', 405);
    }

    // ── Route: /site and /site.html ─────────────────────────────────────────
    if (url.pathname === '/site' || url.pathname === '/site.html') {
      if (url.pathname === '/site.html') {
        const id = url.searchParams.get('id');
        const search = id ? `?id=${id}` : '';
        // Use 301 (not 308) — 308 preserves HTTP method which confuses some crawlers
        return new Response(null, {
          status: 301,
          headers: {
            'Location': `${url.origin}/site${search}`,
            'Cache-Control': 'public, max-age=604800'
          }
        });
      }

      let id = url.searchParams.get('id');
      if (!id) {
        return Response.redirect(`${url.origin}/`, 301);
      }

      // Typo-Squatting / Redirects
      const typos = {
        'nhentiai': 'nhentai',
        'nhentai.net': 'nhentai',
        'hanime.tv': 'hanime',
        'hanime_tv': 'hanime',
        'fakku.net': 'fakku',
        'hitomi.la': 'hitomila',
        'hitomi': 'hitomila',
        'rule34': 'rule34xxx',
        'rule34.xxx': 'rule34xxx'
      };
      if (typos[id.toLowerCase()]) {
        return Response.redirect(`${url.origin}/site?id=${typos[id.toLowerCase()]}`, 301);
      }

      const response = await env.ASSETS.fetch(new Request(url.origin + '/site.html'));
      if (!response.ok) {
        return response;
      }

      let site = null;
      let relatedSites = [];

      if (env.hv_directory) {
        try {
          // ── Parallel D1 fetch: site row + asset fetch run concurrently ──────
          const siteRow = await env.hv_directory.prepare(
            'SELECT data_json FROM sites WHERE id = ?'
          ).bind(id).first();

          if (siteRow && siteRow.data_json) {
            site = JSON.parse(siteRow.data_json);
            // Fetch related sites in parallel with the already-fetched asset above
            const relatedRows = await env.hv_directory.prepare(
              'SELECT data_json FROM sites WHERE category = ? AND id != ? ORDER BY rating DESC LIMIT 15'
            ).bind(site.category, site.id).all();
            relatedSites = relatedRows.results.map(r => JSON.parse(r.data_json));
            relatedSites.push(site); // Ensure the site itself is in the array so the handler doesn't crash
          }
        } catch (err) {
          console.error("D1 lookup error:", err);
        }
      }

      if (!site) {
        // Return 410 Gone (not 404) — tells Google the page is permanently removed,
        // which causes it to drop the URL from its index much faster than a 404.
        return new Response(response.body, {
          status: 410,
          headers: response.headers
        });
      }

      const canonicalUrl = `https://hentaivault.me/site?id=${site.id}`;
      const titleText = `${site.name} Review | HentaiVault`;
      const lang = effectiveLang;

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalRemover())
        .on('title', new TitleHandler(titleText))
        .on('head', new HeadHandler(site, canonicalUrl, lang))
        .on('div#reviewContent', new ReviewBodyHandler(site, lang, relatedSites));

      // Add Cache-Control so Cloudflare edge caches SSR HTML for 5 minutes
      const transformed = rewriter.transform(response);
      const cachedHeaders = new Headers(transformed.headers);
      cachedHeaders.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
      return new Response(transformed.body, {
        status: transformed.status,
        statusText: transformed.statusText,
        headers: cachedHeaders
      });
    }

    // ── Route: /compare ─────────────────────────────────────────────────────
    if (url.pathname === '/compare') {
      const site1Id = url.searchParams.get('site1');
      const site2Id = url.searchParams.get('site2');
      if (!site1Id || !site2Id) return Response.redirect(`${url.origin}/`, 301);

      const response = await env.ASSETS.fetch(new Request(url.origin + '/compare.html'));
      if (!response.ok) return response;

      let site1 = null;
      let site2 = null;
      if (env.hv_directory) {
        try {
          const rows = await env.hv_directory.prepare('SELECT id, data_json FROM sites WHERE id IN (?, ?)').bind(site1Id, site2Id).all();
          for (const r of rows.results) {
            if (r.id === site1Id) site1 = JSON.parse(r.data_json);
            if (r.id === site2Id) site2 = JSON.parse(r.data_json);
          }
        } catch (e) {}
      }
      if (!site1 || !site2) {
        return new Response(response.body, {
          status: 410,
          headers: response.headers
        });
      }

      const canonicalUrl = `https://hentaivault.me/compare?site1=${site1Id}&site2=${site2Id}`;
      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalRemover())
        .on('title', new TitleHandler(`${site1.name} vs ${site2.name} | HentaiVault`))
        .on('head', new CompareHeadHandler(site1, site2, canonicalUrl))
        .on('main#compareContent', new CompareBodyHandler(site1, site2));

      return rewriter.transform(response);
    }

    // ── Route: /out (Interstitial Redirect) ─────────────────────────────────
    if (url.pathname === '/out') {
      const id = url.searchParams.get('id');
      if (!id) return Response.redirect(`${url.origin}/`, 301);

      const response = await env.ASSETS.fetch(new Request(url.origin + '/out.html'));
      if (!response.ok) return response;

      let site = null;
      if (env.hv_directory) {
        try {
          const row = await env.hv_directory.prepare('SELECT url FROM sites WHERE id = ?').bind(id).first();
          if (row) site = { url: row.url };
        } catch (e) {}
      }
      if (!site) return new Response('Gone', { status: 410 });

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalRemover())
        .on('div#target-url', new OutHandler(site));

      return rewriter.transform(response);
    }

    // ── Route: /embed (Ego-Bait Widget) ─────────────────────────────────────
    if (url.pathname === '/embed') {
      const id = url.searchParams.get('id');
      if (!id) return Response.redirect(`${url.origin}/`, 301);

      const response = await env.ASSETS.fetch(new Request(url.origin + '/embed.html'));
      if (!response.ok) return response;

      let site = null;
      if (env.hv_directory) {
        try {
          const row = await env.hv_directory.prepare('SELECT data_json FROM sites WHERE id = ?').bind(id).first();
          if (row) site = JSON.parse(row.data_json);
        } catch (e) {}
      }
      if (!site) return new Response('Gone', { status: 410 });

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalRemover())
        .on('body', new EmbedHandler(site));

      return rewriter.transform(response);
    }

    // Native Cloudflare ASSETS handles clean URLs (e.g., /about -> about.html) automatically.
    // Explicitly mapping to .html causes an infinite 307 redirect loop.

    // ── Everything else: serve static assets — with canonical injection ───────
    const response = await env.ASSETS.fetch(request);

    if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
      const canonicalUrl = (() => {
        const clean = new URL(url.toString());
        // Keep only ?id= and ?q= query params — strip ?lang= and other UI state
        const id = clean.searchParams.get('id');
        const q = clean.searchParams.get('q');
        clean.search = '';
        if (id) clean.searchParams.set('id', id);
        if (q) clean.searchParams.set('q', q);
        // Always use https
        clean.protocol = 'https:';
        // Strip .html for canonicals
        if (clean.pathname.endsWith('.html')) {
          clean.pathname = clean.pathname === '/index.html' ? '/' : clean.pathname.slice(0, -5);
        }
        return clean.toString();
      })();

      const rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', new CanonicalRemover())
        .on('head', new CanonicalInjector(canonicalUrl, effectiveLang));

      return addSecurityHeaders(rewriter.transform(response));
    }

    // Custom 404 fallback for HTML navigation
    if (response.status === 404 && (request.headers.get('accept')?.includes('text/html') || !url.pathname.includes('.'))) {
      const errorPage = await env.ASSETS.fetch(new Request(url.origin + '/404.html', request));
      if (errorPage.ok) {
        return addSecurityHeaders(new Response(errorPage.body, {
          status: 404,
          headers: errorPage.headers
        }));
      }
    }

    // Non-HTML assets (robots.txt, llms.txt, CSS, JS, images, etc.) — return as-is
    return response;
}

async function handleScheduled(event, env, ctx) {
  console.log(`Cron triggered at ${event.cron}`);
  if (!env.hv_directory) return;

  // ── Multi-source site discovery pipeline ─────────────────────────────────
  const SITE_CONTEXT_KEYWORDS = [
    'hentai','ecchi','doujin','manga','anime','adult','nsfw','xxx','porn','erotic',
    'lewd','rule34','booru','nhentai','hanime','uncensored','streaming','visual novel',
    'fanfic','cosplay','waifu','tentacle','yaoi','yuri','loli','shota','futanari',
    'ahegao','ntr','patreon','fanbox','creator','game','comic','tube','studio','hd'
  ];

  // Category guesser based on domain/URL keywords
  function guessCategory(urlStr) {
    const u = urlStr.toLowerCase();
    if (/booru|rule34|gelbooru|danbooru|safebooru|konachan|yandere/.test(u)) return 'Image Boards (Boorus)';
    if (/manga|doujin|nhentai|hitomi|fakku|tsumino/.test(u)) return 'Manga & Doujinshi';
    if (/game|vndb|f95|visual.novel|itch\.io/.test(u)) return 'Games & Visual Novels';
    if (/torrent|nyaa|1337|download|fap|fap-nation/.test(u)) return 'Downloads & Torrents';
    if (/patreon|fanbox|onlyfans|creator|subscribestar/.test(u)) return 'Creator Platforms';
    if (/forum|reddit|discord|chan|board|community/.test(u)) return 'Communities & Forums';
    if (/hentai.*stream|hanime|hstream|watch.*hentai/.test(u)) return 'Hentai Streaming';
    if (/vr|3d|immersive|interactive/.test(u)) return 'Immersive & Interactive';
    if (/tube|porn|xxx|adult|xvideos|xhamster|pornhub/.test(u)) return 'Adult Tubes & Studios';
    if (/anime|crunchyroll|funimation|animepahe|gogoanime/.test(u)) return 'Anime Streaming';
    return 'Hentai Streaming';
  }

  // Shared insert helper — checks context, pings, deduplicates, inserts
  async function tryInsertSite(siteUrl, discoveredBy) {
    try {
      const urlObj = new URL(siteUrl);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      if (!hostname || hostname.length < 4) return false;

      // ── Expanded NOISE blocklist ─────────────────────────────────────────
      const NOISE = [
        // Social / general
        'reddit.com','youtube.com','youtu.be','imgur.com','twitter.com','x.com',
        'instagram.com','facebook.com','tiktok.com','snapchat.com','pinterest.com',
        'linkedin.com','threads.net','mastodon.social','bsky.app',
        // Dev / code hosting
        'github.com','gitlab.com','gitlab.io','bitbucket.org','codeberg.org',
        'sourceforge.net','npmjs.com','pypi.org','rubygems.org','crates.io',
        // Reference / encyclopedias
        'wikipedia.org','wikimedia.org','wikia.com','fandom.com','mediawiki.org',
        'wiktionary.org','wikidata.org','wikihow.com','quora.com',
        // Tech / infra
        'cloudflare.com','discord.com','discord.gg','telegram.org','t.me',
        'slack.com','notion.so','airtable.com','trello.com',
        // Search / aggregators
        'google.com','bing.com','duckduckgo.com','yahoo.com','yandex.com',
        'startpage.com','brave.com',
        // Shorteners / redirectors
        'bit.ly','tinyurl.com','ow.ly','buff.ly','rebrand.ly','short.io',
        'goo.gl','rb.gy','is.gd','v.gd','cutt.ly',
        // File hosts / cloud
        'amazon.com','drive.google.com','docs.google.com','play.google.com',
        'dropbox.com','onedrive.live.com','icloud.com','mega.nz','mediafire.com',
        'archive.org','web.archive.org',
        // Blogs / publishing
        'medium.com','substack.com','tumblr.com','blogspot.com','wordpress.com',
        'blogger.com','ghost.io','hashnode.dev',
        // E-commerce / storefronts (not content)
        'etsy.com','ebay.com','aliexpress.com','shopify.com',
        // App stores
        'apps.apple.com','play.google.com','microsoft.com',
      ];
      if (NOISE.some(n => hostname === n || hostname.endsWith('.' + n))) return false;

      // ── Reject sub-page URLs — only accept root/top-level domains ──────────
      // Allows: https://nhentai.net, https://nhentai.net/
      // Rejects: https://wikipedia.org/wiki/Doujin, https://github.com/user/repo
      //          https://reddit.com/r/hentai, https://xnxx.com/search/hentai
      const pathDepth = urlObj.pathname.replace(/\/$/, '').split('/').filter(Boolean).length;
      if (pathDepth > 0) return false; // Only accept root-level URLs

      // ── Context check: keyword must appear in the HOSTNAME, not just path ──
      // Prevents: wikipedia.org/wiki/doujin_soft passing because "doujin" is in path
      const hostLower = hostname.toLowerCase();
      const fitsContext = SITE_CONTEXT_KEYWORDS.some(k => hostLower.includes(k));
      if (!fitsContext) return false;

      // Duplicate check
      const existing = await env.hv_directory.prepare('SELECT id FROM sites WHERE url = ?').bind(siteUrl).first();
      if (existing) return false;

      // Live ping
      const ping = await fetch(siteUrl, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(5000)
      });
      const isUp = ping.status >= 200 && ping.status < 500 && ping.status !== 404;
      if (!isUp) return false;

      const category = guessCategory(siteUrl);
      const siteId = makeId(hostname);
      const siteJson = JSON.stringify({
        id: siteId, name: hostname, url: siteUrl,
        description: `Discovered via ${discoveredBy}`,
        category, rating: 0, tags: ['Auto-Discovered', discoveredBy]
      });

      await env.hv_directory.prepare(
        'INSERT OR IGNORE INTO sites (id, category, url, rating, added_at, data_json) VALUES (?, ?, ?, ?, datetime("now"), ?)'
      ).bind(siteId, category, siteUrl, 0, siteJson).run();
      return true;
    } catch(e) { return false; }
  }

  let totalInserted = 0;

  // ── SOURCE 1: Reddit Subreddits (posts) ──────────────────────────────────
  try {
    const subreddits = ['hentai', 'animepiracy', 'animedubs', 'ecchi', 'doujinshi', 'manhwa', 'rule34', 'hentaivideo', 'nsfw_games', 'visualnovels', 'yuri', 'yaoi', 'MangaPiracy', 'Piracy'];
    for (const sub of subreddits) {
      try {
        const res = await fetch(`https://www.reddit.com/r/${sub}/new.json?limit=25`, {
          headers: { 'User-Agent': 'HV-Scout-Bot/3.0' }
        });
        if (!res.ok) continue;
        const data = await res.json();
        for (const post of data.data.children) {
          const text = `${post.data.selftext || ''} ${post.data.url || ''} ${post.data.title || ''}`;
          const urls = text.match(/https?:\/\/[^\s"'()<>]+/g) || [];
          for (const u of urls) {
            // Normalize to root origin — prevents sub-page junk from sneaking in
            try {
              const origin = new URL(u).origin;
              if (await tryInsertSite(origin, 'Reddit Posts')) totalInserted++;
            } catch(e) { /* bad URL */ }
          }
        }
      } catch(e) { /* ignore */ }
    }
    console.log(`Source 1 (Reddit Posts): ${totalInserted} total inserted so far.`);
  } catch(err) { console.error('Reddit posts error:', err); }

  // ── SOURCE 2: Reddit Wiki Pages (curated mega-lists) ─────────────────────
  try {
    const wikiPages = [
      'https://www.reddit.com/r/animepiracy/wiki/index.json',
      'https://www.reddit.com/r/hentai/wiki/index.json',
      'https://www.reddit.com/r/Piracy/wiki/megathread/anime.json',
      'https://www.reddit.com/r/Piracy/wiki/megathread/nsfw.json',
      'https://www.reddit.com/r/MangaPiracy/wiki/index.json',
    ];
    for (const wikiUrl of wikiPages) {
      try {
        const res = await fetch(wikiUrl, { headers: { 'User-Agent': 'HV-Scout-Bot/3.0' } });
        if (!res.ok) continue;
        const data = await res.json();
        const content = data?.data?.content_md || data?.data?.content_html || '';
        const urls = content.match(/https?:\/\/[^\s"'()<>\]]+/g) || [];
        for (const u of urls) {
          try {
            const origin = new URL(u).origin;
            if (await tryInsertSite(origin, 'Reddit Wiki')) totalInserted++;
          } catch(e) { /* bad URL */ }
        }
      } catch(e) { /* ignore */ }
    }
    console.log(`Source 2 (Reddit Wikis): ${totalInserted} total inserted so far.`);
  } catch(err) { console.error('Reddit wiki error:', err); }

  // ── SOURCE 3: crt.sh Certificate Transparency Logs ───────────────────────
  try {
    // Rotate through keyword list each cron run to avoid hammering
    const crtKeywords = ['hentai','anime-stream','manga','doujin','ecchi','hanime','nhentai','rule34','booru','f95zone','pornhwa','yaoi','yuri','eroge'];
    const crtIdx = Math.floor(Date.now() / (12 * 60 * 60 * 1000)) % crtKeywords.length;
    const keyword = crtKeywords[crtIdx];

    const crtRes = await fetch(`https://crt.sh/?q=%.${keyword}.%&output=json`, {
      headers: { 'User-Agent': 'HV-Scout-Bot/3.0' },
      signal: AbortSignal.timeout(10000)
    });
    if (crtRes.ok) {
      const crtData = await crtRes.json();
      const domains = new Set();
      for (const entry of crtData.slice(0, 200)) {
        const name = (entry.common_name || entry.name_value || '').toLowerCase();
        // Skip wildcards, IP addresses, and subdomains with too many parts
        if (name.startsWith('*') || /^\d+\.\d+/.test(name)) continue;
        const parts = name.split('.');
        if (parts.length > 4) continue;
        domains.add(`https://${name}`);
      }
      for (const domainUrl of domains) {
        if (await tryInsertSite(domainUrl, 'crt.sh')) totalInserted++;
      }
    }
    console.log(`Source 3 (crt.sh - "${keyword}"): ${totalInserted} total inserted so far.`);
  } catch(err) { console.error('crt.sh error:', err); }

  // ── SOURCE 4: Wayback Machine CDX API ────────────────────────────────────
  try {
    const cdxKeywords = ['hentai','nhentai','hanime','anime-stream','doujin','rule34','booru','pornhwa'];
    const cdxIdx = Math.floor(Date.now() / (12 * 60 * 60 * 1000)) % cdxKeywords.length;
    const cdxKw = cdxKeywords[cdxIdx];

    const cdxRes = await fetch(
      `https://web.archive.org/cdx/search/cdx?url=*.${cdxKw}.*&output=json&fl=original&limit=150&collapse=urlkey&filter=statuscode:200`,
      { headers: { 'User-Agent': 'HV-Scout-Bot/3.0' }, signal: AbortSignal.timeout(10000) }
    );
    if (cdxRes.ok) {
      const cdxData = await cdxRes.json();
      // First row is header ["original"], skip it
      for (const row of cdxData.slice(1, 100)) {
        const siteUrl = row[0];
        if (!siteUrl) continue;
        try {
          const origin = new URL(siteUrl).origin;
          if (await tryInsertSite(origin, 'Wayback Machine')) totalInserted++;
        } catch(e) { /* bad URL */ }
      }
    }
    console.log(`Source 4 (Wayback CDX - "${cdxKw}"): ${totalInserted} total inserted so far.`);
  } catch(err) { console.error('Wayback CDX error:', err); }

  // ── SOURCE 5: GitHub Awesome-Lists ───────────────────────────────────────
  try {
    const ghKeywords = ['anime hentai sites list', 'manga sites', 'doujin sites', 'nsfw gaming list'];
    const ghIdx = Math.floor(Date.now() / (12 * 60 * 60 * 1000)) % ghKeywords.length;
    const ghKw = ghKeywords[ghIdx];

    const ghRes = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(ghKw)}&sort=stars&per_page=5`,
      { headers: { 'User-Agent': 'HV-Scout-Bot/3.0', 'Accept': 'application/vnd.github.v3+json' } }
    );
    if (ghRes.ok) {
      const ghData = await ghRes.json();
      for (const repo of (ghData.items || []).slice(0, 5)) {
        try {
          // Fetch README
          const readmeRes = await fetch(
            `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/README.md`,
            { headers: { 'User-Agent': 'HV-Scout-Bot/3.0' }, signal: AbortSignal.timeout(5000) }
          );
          if (!readmeRes.ok) continue;
          const readme = await readmeRes.text();
          const urls = readme.match(/https?:\/\/[^\s"'()<>\]]+/g) || [];
          for (const u of urls) {
            try {
              const origin = new URL(u).origin;
              if (await tryInsertSite(origin, 'GitHub Lists')) totalInserted++;
            } catch(e) { /* bad URL */ }
          }
        } catch(e) { /* ignore per-repo errors */ }
      }
    }
    console.log(`Source 5 (GitHub Lists): ${totalInserted} total inserted so far.`);
  } catch(err) { console.error('GitHub lists error:', err); }

  // ── SOURCE 6: Hacker News Algolia Search ───────────────────────────────
  try {
    const hnKeywords = ['anime streaming', 'manga reader', 'visual novel', 'doujin', 'piracy site'];
    const hnIdx = Math.floor(Date.now() / (12 * 60 * 60 * 1000)) % hnKeywords.length;
    const hnKw = hnKeywords[hnIdx];

    const hnRes = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(hnKw)}&hitsPerPage=20`,
      { headers: { 'User-Agent': 'HV-Scout-Bot/3.0' } }
    );
    if (hnRes.ok) {
      const hnData = await hnRes.json();
      for (const hit of hnData.hits || []) {
        // extract from URL
        if (hit.url) {
          if (await tryInsertSite(hit.url.split('?')[0], 'HackerNews')) totalInserted++;
        }
        // extract from text/comments
        const text = `${hit.title || ''} ${hit.story_text || ''} ${hit.comment_text || ''}`;
        const urls = text.match(/https?:\/\/[^\s"'()<>\]]+/g) || [];
        for (const u of urls) {
          if (await tryInsertSite(u.split('?')[0], 'HackerNews')) totalInserted++;
        }
      }
    }
    console.log(`Source 6 (HackerNews - "${hnKw}"): ${totalInserted} total inserted so far.`);
  } catch(err) { console.error('HackerNews search error:', err); }

  console.log(`Discovery pipeline complete. Total new sites inserted: ${totalInserted}.`);

  // ── Periodic DB Health Sweep (prune dead sites from existing DB) ──────────
  try {
    // Grab a rolling batch of 30 sites to re-verify each cron run (cycles through the whole DB over time)
    const sweepSeed = Math.floor(Date.now() / (12 * 60 * 60 * 1000)); // changes every 12h
    const sweepOffset = (sweepSeed * 30) % 831; // 831 = current live sites, keeps offset in range
    const { results: sitesToSweep } = await env.hv_directory.prepare(
      'SELECT id, url FROM sites ORDER BY id LIMIT 30 OFFSET ?'
    ).bind(sweepOffset).all();

    let sweptDead = 0;
    for (const site of sitesToSweep) {
      try {
        const ping = await fetch(site.url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
          signal: AbortSignal.timeout(4000)
        });
        const isUp = ping.status >= 200 && ping.status < 500 && ping.status !== 404;
        if (!isUp) {
          // Flag as dead instead of deleting — preserves analytics and DB count integrity
          await env.hv_directory.prepare(
            "UPDATE sites SET data_json = json_set(data_json, '$.isUp', 0, '$.isDeadFlagged', 1) WHERE id = ?"
          ).bind(site.id).run();
          sweptDead++;
        }
      } catch(e) {
        // Timeout = treat as dead — flag, don't delete
        await env.hv_directory.prepare(
          "UPDATE sites SET data_json = json_set(data_json, '$.isUp', 0, '$.isDeadFlagged', 1) WHERE id = ?"
        ).bind(site.id).run();
        sweptDead++;
      }
    }
    console.log(`Health sweep: flagged ${sweptDead} dead sites (preserved in DB for analytics).`);
  } catch(err) {
    console.error('Health sweep error:', err);
  }


}

// ─── Submit Handler ───────────────────────────────────────────────────────────

async function handleSubmit(request, env, ctx) {
  try {
    const ip = request.headers.get('cf-connecting-ip');
    if (await checkRateLimit(ip, env)) {
      return jsonError('Too many submissions. Please try again later.', 429);
    }

    const body = await request.json().catch(() => null);
    if (!body) return jsonError('Invalid request body.', 400);

    const { name, url, category, description, turnstileToken } = body;

    // ── 1. Validate CAPTCHA ──────────────────────────────────────────────────
    if (!turnstileToken) {
      return jsonError('Please complete the CAPTCHA.', 400);
    }

    if (!env.TURNSTILE_SECRET_KEY) {
      return jsonError('Server misconfiguration: missing Turnstile key.', 500);
    }

    const turnstileFormData = new FormData();
    turnstileFormData.append('secret', env.TURNSTILE_SECRET_KEY);
    turnstileFormData.append('response', turnstileToken);
    if (ip) turnstileFormData.append('remoteip', ip);

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: turnstileFormData
    });

    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return jsonError('CAPTCHA verification failed. Please try again.', 400);
    }

    // ── 2. Validate Inputs ───────────────────────────────────────────────────
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

    // GitHub token check removed — submissions now go directly to D1

    // ── 3. Duplicate check via D1 ────────────────────────────────────────────
    if (!env.hv_directory) return jsonError('Database not configured.', 500);
    const existing = await env.hv_directory.prepare('SELECT id FROM sites WHERE url = ?').bind(urlClean).first();
    if (existing) {
      return jsonError('This site is already listed in the directory!', 409);
    }

    // ── 3b. Live reachability check ──────────────────────────────────────────
    try {
      const pingRes = await fetch(urlClean, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(5000)
      });
      const isUp = pingRes.status >= 200 && pingRes.status < 500 && pingRes.status !== 404;
      if (!isUp) {
        return jsonError('That site appears to be offline or unreachable right now. Please try again later.', 422);
      }
    } catch (e) {
      return jsonError('Could not reach that site. Please check the URL and try again.', 422);
    }

    // ── 3c. Context relevance check ──────────────────────────────────────────
    const CONTEXT_KEYWORDS = [
      'hentai','ecchi','doujin','manga','anime','adult','nsfw','xxx','porn','erotic',
      'lewd','rule34','booru','nhentai','hanime','uncensored','streaming','visual novel',
      'fanfic','cosplay','waifu','tentacle','yaoi','yuri','loli','shota','futanari',
      'ahegao','ntr','patreon','fanbox','creator','game','comic','tube','studio'
    ];
    const textToCheck = `${nameClean} ${descClean} ${catClean}`.toLowerCase();
    const fitsContext = CONTEXT_KEYWORDS.some(k => textToCheck.includes(k));
    if (!fitsContext) {
      return jsonError('This site does not appear to be relevant to the HentaiVault directory (adult/anime/hentai content).', 422);
    }


    const id    = makeId(nameClean);
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id,
      name: nameClean,
      url: urlClean,
      category: catClean,
      description: descClean,
      tags: ["Community Submitted"],
      rating: 4.0,
      addedAt: today
    };

    // ── 5. Insert directly into D1 ──────────────────────────────────────────
    const dataJson = JSON.stringify(newEntry);
    await env.hv_directory.prepare(
      'INSERT INTO sites (id, category, url, rating, added_at, data_json) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(id, catClean, urlClean, 4.0, today, dataJson).run();

    // ── 6. Removed GitHub Commit ──────────────────────────────────────────────
    // D1 is now the single source of truth.

    // Ping Bing IndexNow in the background (non-blocking)
    ctx.waitUntil(pingIndexNow(env, id));

    return new Response(
      JSON.stringify({
        success: true,
        message: `"${nameClean}" has been added to the directory! It will appear live shortly.`,
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
    .replace(/[\\"`<>&]/g, '')
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, 300);
}

function makeId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30)
    + '_' + Date.now().toString(36);
}

function decodeB64(b64) {
  try {
    // Use TextDecoder instead of the deprecated escape() function
    const bytes = Uint8Array.from(atob(b64.replace(/\n/g, '')), c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    return atob(b64.replace(/\n/g, ''));
  }
}

function encodeB64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), { status, headers: CORS });
}

async function pingIndexNow(env, newSiteId = null) {
  if (!env.INDEXNOW_KEY) return;
  try {
    const url = 'https://api.indexnow.org/indexnow';
    const urlList = [
      'https://hentaivault.me/',
      'https://hentaivault.me/category/anime-streaming',
      'https://hentaivault.me/category/hentai-streaming',
      'https://hentaivault.me/category/manga-doujin',
      'https://hentaivault.me/category/images-boorus',
      'https://hentaivault.me/category/games',
      'https://hentaivault.me/category/communities',
      'https://hentaivault.me/category/downloads',
      'https://hentaivault.me/category/visual-novels'
    ];
    
    if (newSiteId) {
      urlList.push(`https://hentaivault.me/site?id=${newSiteId}`);
    }

    const payload = {
      host: 'hentaivault.me',
      key: env.INDEXNOW_KEY,
      keyLocation: `https://hentaivault.me/${env.INDEXNOW_KEY}.txt`,
      urlList: urlList
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
