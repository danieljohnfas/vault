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
  constructor(site, canonicalUrl) {
    this.site = site;
    this.canonicalUrl = canonicalUrl;
  }
  element(element) {
    const desc = (this.site.description || '').replace(/"/g, '&quot;');
    const title = `${this.site.name} Review | HentaiVault`;
    
    element.append(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<link rel="alternate" hreflang="x-default" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<link rel="alternate" hreflang="en" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<link rel="alternate" hreflang="es" href="${this.canonicalUrl}&lang=es">`, { html: true });
    element.append(`<link rel="alternate" hreflang="ja" href="${this.canonicalUrl}&lang=jp">`, { html: true });
    element.append(`<link rel="alternate" hreflang="fr" href="${this.canonicalUrl}&lang=fr">`, { html: true });
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
    
    // JSON-LD WebPage + AggregateRating Schema (replaces Review to fix GSC schema errors)
    const schema = {
      "@context": "https://schema.org/",
      "@type": "WebPage",
      "name": title,
      "url": this.canonicalUrl,
      "description": `Read our expert review of ${this.site.name}. Category: ${this.site.category}.`,
      "about": {
        "@type": "WebSite",
        "name": this.site.name,
        "url": this.site.url
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": this.site.rating || 4.5,
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": this.site.ratingCount || 1
      },
      "author": {
        "@type": "Organization",
        "name": "HentaiVault"
      },
      "reviewBody": desc
    };
    element.append(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`, { html: true });
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
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

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
        const sFavicon = `https://www.google.com/s2/favicons?domain=${sUrl.hostname}&sz=64`;
        return `
            <div class="card">
                <div class="card-header">
                    <img src="${sFavicon}" alt="" class="card-icon">
                    <div>
                        <div class="card-title"><a href="/site?id=${s.id}" style="color:inherit;">${escapeHTML(s.name)}</a></div>
                        <div class="card-category">${escapeHTML(s.category)}</div>
                    </div>
                </div>
                <div class="card-desc" style="font-size:0.85rem; -webkit-line-clamp: 2;">${escapeHTML(s.description)}</div>
            </div>
        `;
    }).join('');

    const html = `
        <div class="review-header">
            <img src="${faviconUrl}" alt="${localName}" class="review-icon">
            <div class="review-meta">
                <div class="review-badge">${localCat}</div>
                <h1>${localName}</h1>
                <div class="rating">${l.rating}${ '★'.repeat(Math.floor(this.site.rating)) }☆</div>
            </div>
        </div>
        <div class="review-content">
            <h2>${l.expertReview}</h2>
            <p>${localReviewText}</p>
            
            <div class="pros-cons">
                <div class="pc-box pros">
                    <h3>${l.pros}</h3>
                    <ul class="pc-list">
                        ${ (this.site.pros || ['High quality content', 'Regular updates', 'Fast loading speeds']).map(p => `<li>${escapeHTML(p)}</li>`).join('') }
                    </ul>
                </div>
                <div class="pc-box cons">
                    <h3>${l.cons}</h3>
                    <ul class="pc-list">
                        ${ (this.site.cons || ['Some intrusive ads', 'Requires high-speed connection']).map(c => `<li>${escapeHTML(c)}</li>`).join('') }
                    </ul>
                </div>
            </div>
            <h2>${l.conclusion}</h2>
            <p>${l.conclusionText}</p>
            <div class="cta-box">
                <h3>${l.ready}</h3>
                <p style="margin-bottom:20px;">${l.visitBelow}</p>
                <a href="${this.site.url}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit" data-outbound="${this.site.url}" style="font-size:1.2rem; padding:15px 40px; text-decoration: none;">${l.visitSite}</a>
            </div>
            <div class="related-sites" style="margin-top: 60px;">
                <h2 style="margin-bottom:25px; display: flex; align-items: center; gap: 10px;">
                    <span>🔗</span> ${l.similar}
                </h2>
                <div id="relatedGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                    ${relatedHTML}
                </div>
            </div>
        </div>
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
class CanonicalInjector {
  constructor(canonicalUrl) {
    this.canonicalUrl = canonicalUrl;
  }
  element(element) {
    element.prepend(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    element.prepend(`<link rel="alternate" hreflang="x-default" href="${this.canonicalUrl}">`, { html: true });
    element.prepend(`<link rel="alternate" hreflang="en" href="${this.canonicalUrl}">`, { html: true });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Force HTTPS redirect (fixes HTTP duplicate pages in GSC) ────────────
    if (url.protocol === 'http:') {
      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = 'https:';
      return new Response(null, {
        status: 301,
        headers: {
          'Location': httpsUrl.toString(),
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

    // ── Route: /sitemap.xml — Dynamic sitemap generated from live D1 data ───
    // This replaces the static sitemap.xml file to eliminate Soft 404s from
    // stale/deleted site IDs and "Page with redirect" from ?lang= URL variants.
    if (url.pathname === '/sitemap.xml') {
      const today = new Date().toISOString().split('T')[0];
      const staticPages = [
        { loc: 'https://hentaivault.me/', priority: '1.0', changefreq: 'daily' },
        { loc: 'https://hentaivault.me/blog', priority: '0.7', changefreq: 'weekly' },
        { loc: 'https://hentaivault.me/about', priority: '0.5', changefreq: 'monthly' },
        { loc: 'https://hentaivault.me/contact', priority: '0.5', changefreq: 'monthly' },
        { loc: 'https://hentaivault.me/privacy', priority: '0.3', changefreq: 'monthly' },
        { loc: 'https://hentaivault.me/terms', priority: '0.3', changefreq: 'monthly' },
        { loc: 'https://hentaivault.me/disclaimer', priority: '0.3', changefreq: 'monthly' },
        { loc: 'https://hentaivault.me/dmca', priority: '0.3', changefreq: 'monthly' },
        { loc: 'https://hentaivault.me/region-unblocked', priority: '0.5', changefreq: 'weekly' },
        { loc: 'https://hentaivault.me/category/anime-streaming', priority: '0.8', changefreq: 'daily' },
        { loc: 'https://hentaivault.me/category/hentai-streaming', priority: '0.8', changefreq: 'daily' },
        { loc: 'https://hentaivault.me/category/manga-doujin', priority: '0.8', changefreq: 'daily' },
        { loc: 'https://hentaivault.me/category/images-boorus', priority: '0.7', changefreq: 'weekly' },
        { loc: 'https://hentaivault.me/category/games', priority: '0.7', changefreq: 'weekly' },
        { loc: 'https://hentaivault.me/category/communities', priority: '0.7', changefreq: 'weekly' },
        { loc: 'https://hentaivault.me/category/downloads', priority: '0.7', changefreq: 'weekly' },
        { loc: 'https://hentaivault.me/category/visual-novels', priority: '0.6', changefreq: 'weekly' },
      ];

      let siteUrls = '';
      if (env.hv_directory) {
        try {
          // Fetch all site IDs and their added_at dates — only live, real entries
          const rows = await env.hv_directory.prepare(
            'SELECT id, added_at FROM sites ORDER BY added_at DESC'
          ).all();
          for (const row of rows.results) {
            const lastmod = row.added_at ? row.added_at.split('T')[0] : today;
            siteUrls += `  <url>\n    <loc>https://hentaivault.me/site?id=${row.id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
          }
        } catch (err) {
          console.error('Sitemap D1 error:', err);
        }
      }

      const staticXml = staticPages
        .map(p => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
        .join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticXml}\n${siteUrls}</urlset>`;

      return new Response(xml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Robots-Tag': 'noindex'
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
    if (url.pathname === '/api/config') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
      }
      return new Response(
        JSON.stringify({
          ad_skyscraper: env.AD_KEY_SKYSCRAPER || '13ca4044b4b6e65ef15f10d18752754e',
          ad_leaderboard: env.AD_KEY_LEADERBOARD || '40d623b6e8e7efa7651f8c6fbeb29bef',
          ad_infeed: env.AD_KEY_INFEED || '40d623b6e8e7efa7651f8c6fbeb29bef',
          ad_sticky_bottom: env.AD_KEY_STICKY_BOTTOM || '90b220b63fa3e2eb3c163fec3b34a465',
          ad_socialbar: env.AD_KEY_SOCIALBAR || 'ba6744afc790009f7b04d7509a97ea2f',
          ad_popunder: env.AD_KEY_POPUNDER || '994511c440490953ceb331525d9f463f',
          ad_native: env.AD_KEY_NATIVE || 'a098db90df9a9b985c317d9ba01e155e'
        }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' } }
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
          conditions.push('(name LIKE ? OR description LIKE ? OR data_json LIKE ?)');
          const likeQuery = `%${q}%`;
          params.push(likeQuery, likeQuery, likeQuery);
        }
        
        const category = url.searchParams.get('category');
        if (category) {
          conditions.push('category = ?');
          params.push(category);
        }

        const tagsStr = url.searchParams.get('tags');
        if (tagsStr) {
          const tagsArray = tagsStr.split(',');
          // If any tag matches
          const tagConditions = tagsArray.map(tag => {
            params.push(`%"${tag}"%`);
            return 'data_json LIKE ?';
          });
          conditions.push(`(${tagConditions.join(' OR ')})`);
        }
        
        // WHERE clause shared by count + data query (no exclude needed)
        const whereClause = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';
        const countResult = await env.hv_directory.prepare(
          'SELECT COUNT(*) as count FROM sites' + whereClause
        ).bind(...params).first();
        const total = countResult ? countResult.count : 0;

        query += whereClause;

        const sort = url.searchParams.get('sort') || 'random';
        if (sort === 'rating' || sort === 'popular') {
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

      let site = null;
      let relatedSites = [];
      
      if (env.hv_directory) {
        try {
          const siteRow = await env.hv_directory.prepare('SELECT data_json FROM sites WHERE id = ?').bind(id).first();
          if (siteRow && siteRow.data_json) {
            site = JSON.parse(siteRow.data_json);
            // Fetch some related sites for the Jaccard similarity engine in ReviewBodyHandler
            const relatedRows = await env.hv_directory.prepare('SELECT data_json FROM sites WHERE category = ? AND id != ? LIMIT 15').bind(site.category, site.id).all();
            relatedSites = relatedRows.results.map(r => JSON.parse(r.data_json));
            relatedSites.push(site); // Ensure the site itself is in the array so the handler doesn't crash
          }
        } catch (err) {
          console.error("D1 lookup error:", err);
        }
      }

      if (!site) {
        // Return 404 status code but still serve site.html so client-side rendering displays UI error
        return new Response(response.body, {
          status: 404,
          headers: response.headers
        });
      }

      const canonicalUrl = `https://hentaivault.me/site?id=${site.id}`;
      const titleText = `${site.name} Review | HentaiVault`;
      const lang = effectiveLang;

      const rewriter = new HTMLRewriter()
        .on('title', new TitleHandler(titleText))
        .on('head', new HeadHandler(site, canonicalUrl))
        .on('div#reviewContent', new ReviewBodyHandler(site, lang, relatedSites));

      return rewriter.transform(response);
    }

    // Native Cloudflare ASSETS handles clean URLs (e.g., /about -> about.html) automatically.
    // Explicitly mapping to .html causes an infinite 307 redirect loop.

    // ── Everything else: serve static assets — with canonical injection ───────
    // Build the canonical URL (strip ?lang= and other UI params, keep only meaningful params)
    const isHtmlPage = url.pathname === '/' || url.pathname.endsWith('.html') ||
                       url.pathname.includes('/category/') || url.pathname.includes('/blog/');
    
    if (isHtmlPage) {
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
        return clean.toString();
      })();

      const response = await env.ASSETS.fetch(request);
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) {
        return response;
      }

      const rewriter = new HTMLRewriter()
        .on('head', new CanonicalInjector(canonicalUrl));

      return rewriter.transform(response);
    }

    return env.ASSETS.fetch(request);
  },
};

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

    if (!env.GITHUB_TOKEN)
      return jsonError('Server misconfiguration. Contact the admin.', 500);

    // ── 3. Duplicate check via D1 ────────────────────────────────────────────
    if (!env.hv_directory) return jsonError('Database not configured.', 500);
    const existing = await env.hv_directory.prepare('SELECT id FROM sites WHERE url = ?').bind(urlClean).first();
    if (existing) {
      return jsonError('This site is already listed in the directory!', 409);
    }

    // ── 4. Build new entry ───────────────────────────────────────────────────
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
    ctx.waitUntil(pingIndexNow(env));

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
  try {
    return decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));
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
