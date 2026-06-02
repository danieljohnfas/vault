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
const rateLimitMap = new Map();
const RATE_LIMIT_MS = 60000;
const MAX_REQS = 2;

function isRateLimited(ip) {
  if (!ip) return false;
  if (rateLimitMap.size > 10000) {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) rateLimitMap.delete(key);
    }
  }
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
    const arrayMatch = dataText.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
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
    
    // JSON-LD Review Schema
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Review",
      "itemReviewed": {
        "@type": "WebSite",
        "name": this.site.name,
        "url": this.site.url
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": this.site.rating || 4.5,
        "bestRating": "5",
        "worstRating": "1"
      },
      "name": title,
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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

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

    // Geo-Routing for top-level pages if no cookie and no query param exists
    const isHtml = url.pathname === '/' || url.pathname.endsWith('.html') || url.pathname.includes('/category/') || url.pathname.includes('/blog/');
    if (isHtml && !cookieLang && !url.searchParams.has('lang')) {
        url.searchParams.set('lang', effectiveLang);
        return new Response(null, {
            status: 302,
            headers: {
                'Location': url.toString(),
                'Set-Cookie': `hv_lang=${effectiveLang}; Path=/; Max-Age=31536000`
            }
        });
    }

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
      const lang = effectiveLang;

      const rewriter = new HTMLRewriter()
        .on('title', new TitleHandler(titleText))
        .on('head', new HeadHandler(site, canonicalUrl))
        .on('div#reviewContent', new ReviewBodyHandler(site, lang, sites));

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

    // Extract the JSON array from the file string
    const arrayMatch = rawContent.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
    if (!arrayMatch) {
      return jsonError('Could not parse directory data structure.', 500);
    }

    let sitesArray;
    try {
      // Handle trailing commas safely before parsing
      const jsonString = arrayMatch[1].replace(/,\s*([\]}])/g, '$1');
      sitesArray = JSON.parse(jsonString);
    } catch (e) {
      console.error('Parse error on submission:', e);
      return jsonError('Data structure is corrupted.', 500);
    }

    // ── 3. Duplicate check ───────────────────────────────────────────────────
    if (sitesArray.some(s => s.url === urlClean))
      return jsonError('This site is already listed in the directory!', 409);

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

    sitesArray.push(newEntry);

    // ── 5. Serialize back to file ──────────────────────────────────────────
    const newSitesStr = JSON.stringify(sitesArray, null, 4);
    const updated = `const sitesData = ${newSitesStr};`;

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
