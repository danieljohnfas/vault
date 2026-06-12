var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var GITHUB_REPO = "danieljohnfas/vault";
var GITHUB_FILE = "js/data.js";
var GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`;
var ALLOWED_CATEGORIES = [
  "Anime Streaming",
  "Hentai Streaming",
  "Manga/Doujin",
  "Images/Boorus",
  "Games",
  "Communities",
  "Downloads",
  "Visual Novels",
  "Adult Studios",
  "Adult VR",
  "Premium Creators"
];
var RATE_LIMIT_SECONDS = 60;
var MAX_REQS = 2;
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
__name(checkRateLimit, "checkRateLimit");
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
var HeadHandler = class {
  static {
    __name(this, "HeadHandler");
  }
  constructor(site, canonicalUrl) {
    this.site = site;
    this.canonicalUrl = canonicalUrl;
  }
  element(element) {
    const desc = (this.site.description || "").replace(/"/g, "&quot;");
    const title = `${this.site.name} Review | HentaiVault`;
    element.append(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<link rel="alternate" hreflang="x-default" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<link rel="alternate" hreflang="en" href="${this.canonicalUrl}">`, { html: true });
    element.append(`<link rel="alternate" hreflang="es" href="${this.canonicalUrl}&lang=es">`, { html: true });
    element.append(`<link rel="alternate" hreflang="ja" href="${this.canonicalUrl}&lang=jp">`, { html: true });
    element.append(`<link rel="alternate" hreflang="fr" href="${this.canonicalUrl}&lang=fr">`, { html: true });
    element.append(`<meta name="description" content="Read our expert review of ${this.site.name}. Curated, rated, and verified by the HentaiVault team. Category: ${this.site.category}.">`, { html: true });
    element.append(`<meta property="og:title" content="${title}">`, { html: true });
    element.append(`<meta property="og:description" content="${desc}">`, { html: true });
    element.append(`<meta property="og:url" content="${this.canonicalUrl}">`, { html: true });
    element.append(`<meta property="og:type" content="article">`, { html: true });
    element.append(`<meta name="twitter:card" content="summary">`, { html: true });
    element.append(`<meta name="twitter:title" content="${title}">`, { html: true });
    element.append(`<meta name="twitter:description" content="${desc}">`, { html: true });
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
    element.append(`<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`, { html: true });
  }
};
var TitleHandler = class {
  static {
    __name(this, "TitleHandler");
  }
  constructor(titleText) {
    this.titleText = titleText;
  }
  element(element) {
    element.setInnerContent(this.titleText);
  }
};
var ReviewBodyHandler = class {
  static {
    __name(this, "ReviewBodyHandler");
  }
  constructor(site, lang, sitesData) {
    this.site = site;
    this.lang = lang;
    this.sitesData = sitesData;
  }
  element(element) {
    const escapeHTML = /* @__PURE__ */ __name((str) => {
      if (!str) return "";
      return String(str).replace(/[&<>'"]/g, (tag) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      })[tag] || tag);
    }, "escapeHTML");
    const urlObj = new URL(this.site.url);
    const domain = urlObj.hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const labels = {
      en: {
        expertReview: "Expert Review",
        pros: "Pros",
        cons: "Cons",
        conclusion: "Conclusion",
        conclusionText: `If you are looking for a reliable source for ${this.site.category}, ${this.site.name} is a top-tier choice. It ranks highly in our directory for its ease of use and content variety.`,
        ready: "Ready to explore?",
        visitBelow: "Visit the official site below.",
        visitSite: `Visit ${this.site.name} &rarr;`,
        similar: "Similar Sites You May Like",
        rating: "Rating: "
      },
      fr: {
        expertReview: "Avis d'expert",
        pros: "Points forts",
        cons: "Points faibles",
        conclusion: "Conclusion",
        conclusionText: `Si vous recherchez une source fiable pour ${this.site.category.toLowerCase()}, ${this.site.name} est un choix de premier ordre. Il se classe tr\xE8s bien dans notre annuaire pour sa facilit\xE9 d'utilisation et sa vari\xE9t\xE9 de contenu.`,
        ready: "Pr\xEAt \xE0 explorer ?",
        visitBelow: "Visitez le site officiel ci-dessous.",
        visitSite: `Visiter ${this.site.name} &rarr;`,
        similar: "Sites similaires que vous pourriez aimer",
        rating: "Note : "
      },
      es: {
        expertReview: "Rese\xF1a de expertos",
        pros: "Pros",
        cons: "Contras",
        conclusion: "Conclusi\xF3n",
        conclusionText: `Si est\xE1 buscando una fuente confiable para ${this.site.category.toLowerCase()}, ${this.site.name} es una opci\xF3n de primer nivel. Ocupa un lugar destacado en nuestro directorio por su facilidad de uso y variedad de contenido.`,
        ready: "\xBFListo para explorar?",
        visitBelow: "Visite el sitio oficial a continuaci\xF3n.",
        visitSite: `Visitar ${this.site.name} &rarr;`,
        similar: "Sitios similares que le pueden gustar",
        rating: "Calificaci\xF3n: "
      },
      jp: {
        expertReview: "\u5C02\u9580\u5BB6\u306B\u3088\u308B\u30EC\u30D3\u30E5\u30FC",
        pros: "\u30E1\u30EA\u30C3\u30C8",
        cons: "\u30C7\u30E1\u30EA\u30C3\u30C8",
        conclusion: "\u7D50\u8AD6",
        conclusionText: `${this.site.category}\u306E\u4FE1\u983C\u3067\u304D\u308B\u30BD\u30FC\u30B9\u3092\u304A\u63A2\u3057\u306E\u5834\u5408\u306F\u3001${this.site.name}\u304C\u6700\u9069\u3067\u3059\u3002\u4F7F\u3044\u3084\u3059\u3055\u3068\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u591A\u69D8\u6027\u306B\u3088\u308A\u3001\u5F53\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3067\u9AD8\u3044\u8A55\u4FA1\u3092\u5F97\u3066\u3044\u307E\u3059\u3002`,
        ready: "\u63A2\u7D22\u3059\u308B\u6E96\u5099\u306F\u3067\u304D\u307E\u3057\u305F\u304B\uFF1F",
        visitBelow: "\u4EE5\u4E0B\u306E\u516C\u5F0F\u30B5\u30A4\u30C8\u3092\u3054\u89A7\u304F\u3060\u3055\u3044\u3002",
        visitSite: `${this.site.name}\u3092\u8A2A\u554F\u3059\u308B &rarr;`,
        similar: "\u3042\u306A\u305F\u306B\u304A\u3059\u3059\u3081\u306E\u985E\u4F3C\u30B5\u30A4\u30C8",
        rating: "\u8A55\u4FA1: "
      },
      pt: {
        expertReview: "Revis\xE3o de Especialista",
        pros: "Pr\xF3s",
        cons: "Contras",
        conclusion: "Conclus\xE3o",
        conclusionText: `Se voc\xEA est\xE1 procurando uma fonte confi\xE1vel para ${this.site.category.toLowerCase()}, ${this.site.name} \xE9 uma escolha de primeira linha. Ele tem uma classifica\xE7\xE3o alta em nosso diret\xF3rio por sua facilidade de uso e variedade de conte\xFAdo.`,
        ready: "Pronto para explorar?",
        visitBelow: "Visite o site oficial abaixo.",
        visitSite: `Visitar ${this.site.name} &rarr;`,
        similar: "Sites semelhantes que voc\xEA pode gostar",
        rating: "Avalia\xE7\xE3o: "
      },
      hi: {
        expertReview: "\u0935\u093F\u0936\u0947\u0937\u091C\u094D\u091E \u0938\u092E\u0940\u0915\u094D\u0937\u093E",
        pros: "\u0916\u0942\u092C\u093F\u092F\u093E\u0902",
        cons: "\u0916\u093E\u092E\u093F\u092F\u093E\u0902",
        conclusion: "\u0928\u093F\u0937\u094D\u0915\u0930\u094D\u0937",
        conclusionText: `\u092F\u0926\u093F \u0906\u092A ${this.site.category.toLowerCase()} \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0935\u093F\u0936\u094D\u0935\u0938\u0928\u0940\u092F \u0938\u094D\u0930\u094B\u0924 \u0915\u0940 \u0924\u0932\u093E\u0936 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902, \u0924\u094B ${this.site.name} \u090F\u0915 \u0936\u0940\u0930\u094D\u0937 \u0935\u093F\u0915\u0932\u094D\u092A \u0939\u0948\u0964 \u0909\u092A\u092F\u094B\u0917 \u092E\u0947\u0902 \u0906\u0938\u093E\u0928\u0940 \u0914\u0930 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u0940 \u0935\u093F\u0935\u093F\u0927\u0924\u093E \u0915\u0947 \u0932\u093F\u090F \u092F\u0939 \u0939\u092E\u093E\u0930\u0940 \u0928\u093F\u0930\u094D\u0926\u0947\u0936\u093F\u0915\u093E \u092E\u0947\u0902 \u0909\u091A\u094D\u091A \u0938\u094D\u0925\u093E\u0928 \u092A\u0930 \u0939\u0948\u0964`,
        ready: "\u0916\u094B\u091C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0902?",
        visitBelow: "\u0928\u0940\u091A\u0947 \u0906\u0927\u093F\u0915\u093E\u0930\u093F\u0915 \u0938\u093E\u0907\u091F \u092A\u0930 \u091C\u093E\u090F\u0902\u0964",
        visitSite: `${this.site.name} \u092A\u0930 \u091C\u093E\u090F\u0902 &rarr;`,
        similar: "\u0938\u092E\u093E\u0928 \u0938\u093E\u0907\u091F\u0947\u0902 \u091C\u094B \u0906\u092A\u0915\u094B \u092A\u0938\u0902\u0926 \u0906 \u0938\u0915\u0924\u0940 \u0939\u0948\u0902",
        rating: "\u0930\u0947\u091F\u093F\u0902\u0917: "
      },
      ar: {
        expertReview: "\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u062E\u0628\u0631\u0627\u0621",
        pros: "\u0627\u0644\u0625\u064A\u062C\u0627\u0628\u064A\u0627\u062A",
        cons: "\u0627\u0644\u0633\u0644\u0628\u064A\u0627\u062A",
        conclusion: "\u0627\u0633\u062A\u0646\u062A\u0627\u062C",
        conclusionText: `\u0625\u0630\u0627 \u0643\u0646\u062A \u062A\u0628\u062D\u062B \u0639\u0646 \u0645\u0635\u062F\u0631 \u0645\u0648\u062B\u0648\u0642 \u0644\u0640 ${this.site.category.toLowerCase()} \u060C \u0641\u0625\u0646 ${this.site.name} \u064A\u0639\u062F \u062E\u064A\u0627\u0631\u064B\u0627 \u0645\u0646 \u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0648\u0644\u0649. \u064A\u062D\u062A\u0644 \u0645\u0631\u062A\u0628\u0629 \u0639\u0627\u0644\u064A\u0629 \u0641\u064A \u062F\u0644\u064A\u0644\u0646\u0627 \u0644\u0633\u0647\u0648\u0644\u0629 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0648\u062A\u0646\u0648\u0639 \u0645\u062D\u062A\u0648\u0627\u0647.`,
        ready: "\u0647\u0644 \u0623\u0646\u062A \u0645\u0633\u062A\u0639\u062F \u0644\u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641\u061F",
        visitBelow: "\u0642\u0645 \u0628\u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0633\u0645\u064A \u0623\u062F\u0646\u0627\u0647.",
        visitSite: `\u0632\u064A\u0627\u0631\u0629 ${this.site.name} &rarr;`,
        similar: "\u0645\u0648\u0627\u0642\u0639 \u0645\u0634\u0627\u0628\u0647\u0629 \u0642\u062F \u062A\u0639\u062C\u0628\u0643",
        rating: "\u0627\u0644\u062A\u0642\u064A\u064A\u0645: "
      },
      de: {
        expertReview: "Expertenbewertung",
        pros: "Vorteile",
        cons: "Nachteile",
        conclusion: "Fazit",
        conclusionText: `Wenn Sie nach einer zuverl\xE4ssigen Quelle f\xFCr ${this.site.category.toLowerCase()} suchen, ist ${this.site.name} eine erstklassige Wahl. Es rangiert in unserem Verzeichnis hoch wegen seiner Benutzerfreundlichkeit und Inhaltsvielfalt.`,
        ready: "Bereit zum Erkunden?",
        visitBelow: "Besuchen Sie die offizielle Website unten.",
        visitSite: `${this.site.name} besuchen &rarr;`,
        similar: "\xC4hnliche Seiten, die Ihnen gefallen k\xF6nnten",
        rating: "Bewertung: "
      }
    };
    const l = labels[this.lang] || labels.en;
    const localName = escapeHTML(this.site[`name_${this.lang}`] || this.site.name);
    const localCat = escapeHTML(this.site.category);
    const localDesc = escapeHTML(this.site[`description_${this.lang}`] || this.site.description);
    let fallbackText = `${localName} has established itself as a premier destination for ${localCat.toLowerCase()} enthusiasts. In our 2026 audit, we found the site to be highly responsive and maintained with high-quality content.`;
    if (this.lang === "fr") fallbackText = `${localName} s'est impos\xE9 comme une destination de premier choix pour les passionn\xE9s de ${localCat.toLowerCase()}. Lors de notre audit de 2026, nous avons constat\xE9 que le site \xE9tait tr\xE8s r\xE9actif et maintenu avec un contenu de haute qualit\xE9.`;
    else if (this.lang === "es") fallbackText = `${localName} se ha establecido como un destino de primer nivel para los entusiastas de ${localCat.toLowerCase()}. En nuestra auditor\xEDa de 2026, encontramos que el sitio es muy receptivo y se mantiene con contenido de alta calidad.`;
    else if (this.lang === "jp") fallbackText = `${localName}\u306F\u3001${localCat}\u30D5\u30A1\u30F3\u306E\u305F\u3081\u306E\u4E3B\u8981\u306A\u76EE\u7684\u5730\u3068\u3057\u3066\u5B9A\u7740\u3057\u3066\u3044\u307E\u3059\u30022026\u5E74\u306E\u76E3\u67FB\u3067\u306F\u3001\u30B5\u30A4\u30C8\u306E\u5FDC\u7B54\u6027\u304C\u975E\u5E38\u306B\u9AD8\u304F\u3001\u9AD8\u54C1\u8CEA\u306A\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u7DAD\u6301\u3055\u308C\u3066\u3044\u308B\u3053\u3068\u304C\u78BA\u8A8D\u3055\u308C\u307E\u3057\u305F\u3002`;
    else if (this.lang === "pt") fallbackText = `${localName} estabeleceu-se como um destino de primeira linha para entusiastas de ${localCat.toLowerCase()}. Em nossa auditoria de 2026, descobrimos que o site \xE9 altamente responsivo e mantido com conte\xFAdo de alta qualidade.`;
    else if (this.lang === "hi") fallbackText = `${localName} \u0928\u0947 ${localCat} \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u0909\u0924\u094D\u0938\u093E\u0939\u0940 \u0932\u094B\u0917\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0916\u0941\u0926 \u0915\u094B \u090F\u0915 \u092A\u094D\u0930\u092E\u0941\u0916 \u0917\u0902\u0924\u0935\u094D\u092F \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0915\u093F\u092F\u093E \u0939\u0948\u0964 \u0939\u092E\u093E\u0930\u0947 2026 \u0915\u0947 \u0911\u0921\u093F\u091F \u092E\u0947\u0902, \u0939\u092E\u0928\u0947 \u092A\u093E\u092F\u093E \u0915\u093F \u0938\u093E\u0907\u091F \u0905\u0924\u094D\u092F\u0927\u093F\u0915 \u0909\u0924\u094D\u0924\u0930\u0926\u093E\u092F\u0940 \u0939\u0948 \u0914\u0930 \u0909\u091A\u094D\u091A \u0917\u0941\u0923\u0935\u0924\u094D\u0924\u093E \u0935\u093E\u0932\u0940 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u0947 \u0938\u093E\u0925 \u092C\u0928\u093E\u090F \u0930\u0916\u0940 \u0917\u0908 \u0939\u0948\u0964`;
    else if (this.lang === "ar") fallbackText = `\u0623\u062B\u0628\u062A\u062A ${localName} \u0646\u0641\u0633\u0647\u0627 \u0643\u0648\u062C\u0647\u0629 \u0631\u0626\u064A\u0633\u064A\u0629 \u0644\u0639\u0634\u0627\u0642 ${localCat}. \u0641\u064A \u0645\u0631\u0627\u062C\u0639\u062A\u0646\u0627 \u0644\u0639\u0627\u0645 2026\u060C \u0648\u062C\u062F\u0646\u0627 \u0623\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0633\u0631\u064A\u0639 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u064A\u0647 \u0628\u0645\u062D\u062A\u0648\u0649 \u0639\u0627\u0644\u064A \u0627\u0644\u062C\u0648\u062F\u0629.`;
    else if (this.lang === "de") fallbackText = `${localName} hat sich als erstklassiges Ziel f\xFCr ${localCat}-Enthusiasten etabliert. Bei unserem Audit im Jahr 2026 stellten wir fest, dass die Seite sehr reaktionsschnell ist und mit hochwertigen Inhalten gepflegt wird.`;
    const localReviewText = escapeHTML(this.site[`longReview_${this.lang}`] || this.site.longReview) || (localDesc ? localDesc + " " + fallbackText : fallbackText);
    const jaccardSimilarity = /* @__PURE__ */ __name((tagsA, tagsB) => {
      if (!tagsA || !tagsB || tagsA.length === 0 || tagsB.length === 0) return 0;
      const setA = new Set(tagsA);
      const setB = new Set(tagsB);
      const intersection = [...setA].filter((t) => setB.has(t)).length;
      const union = (/* @__PURE__ */ new Set([...tagsA, ...tagsB])).size;
      return union === 0 ? 0 : intersection / union;
    }, "jaccardSimilarity");
    const related = this.sitesData.filter((s) => s.id !== this.site.id).map((s) => ({
      site: s,
      score: (s.category === this.site.category ? 0.5 : 0) + jaccardSimilarity(this.site.tags || [], s.tags || [])
    })).sort((a, b) => b.score - a.score).slice(0, 3).map((r) => r.site);
    const relatedHTML = related.map((s) => {
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
    }).join("");
    const html = `
        <div class="review-header">
            <img src="${faviconUrl}" alt="${localName}" class="review-icon">
            <div class="review-meta">
                <div class="review-badge">${localCat}</div>
                <h1>${localName}</h1>
                <div class="rating">${l.rating}${"\u2605".repeat(Math.floor(this.site.rating))}\u2606</div>
            </div>
        </div>
        <div class="review-content">
            <h2>${l.expertReview}</h2>
            <p>${localReviewText}</p>
            
            <div class="pros-cons">
                <div class="pc-box pros">
                    <h3>${l.pros}</h3>
                    <ul class="pc-list">
                        ${(this.site.pros || ["High quality content", "Regular updates", "Fast loading speeds"]).map((p) => `<li>${escapeHTML(p)}</li>`).join("")}
                    </ul>
                </div>
                <div class="pc-box cons">
                    <h3>${l.cons}</h3>
                    <ul class="pc-list">
                        ${(this.site.cons || ["Some intrusive ads", "Requires high-speed connection"]).map((c) => `<li>${escapeHTML(c)}</li>`).join("")}
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
                    <span>\u{1F517}</span> ${l.similar}
                </h2>
                <div id="relatedGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                    ${relatedHTML}
                </div>
            </div>
        </div>
    `;
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
    const schemaScript = `
<script type="application/ld+json">
${JSON.stringify(faqSchema)}
<\/script>
`;
    element.setInnerContent(html + schemaScript, { html: true });
  }
};
var CanonicalInjector = class {
  static {
    __name(this, "CanonicalInjector");
  }
  constructor(canonicalUrl) {
    this.canonicalUrl = canonicalUrl;
  }
  element(element) {
    element.prepend(`<link rel="canonical" href="${this.canonicalUrl}">`, { html: true });
    element.prepend(`<link rel="alternate" hreflang="x-default" href="${this.canonicalUrl}">`, { html: true });
    element.prepend(`<link rel="alternate" hreflang="en" href="${this.canonicalUrl}">`, { html: true });
  }
};
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = "https:";
      return new Response(null, {
        status: 301,
        headers: {
          "Location": httpsUrl.toString(),
          "Cache-Control": "public, max-age=31536000"
        }
      });
    }
    const cookieHeader = request.headers.get("Cookie") || "";
    const langCookieMatch = cookieHeader.match(/hv_lang=([a-z]{2})/);
    const cookieLang = langCookieMatch ? langCookieMatch[1] : null;
    let detectedLang = "en";
    const country = request.cf ? request.cf.country : null;
    if (country === "BR") detectedLang = "pt";
    else if (country === "IN") detectedLang = "hi";
    else if (country === "MA") detectedLang = "ar";
    else if (["DE", "AT", "CH"].includes(country)) detectedLang = "de";
    else if (country === "FR") detectedLang = "fr";
    else if (["ES", "MX", "AR", "CO", "CL", "PE"].includes(country)) detectedLang = "es";
    else if (country === "JP") detectedLang = "jp";
    const effectiveLang = url.searchParams.get("lang") || cookieLang || detectedLang;
    if (env.INDEXNOW_KEY && url.pathname === `/${env.INDEXNOW_KEY}.txt`) {
      return new Response(env.INDEXNOW_KEY, {
        headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" }
      });
    }
    if (url.pathname === "/sitemap.xml") {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const staticPages = [
        { loc: "https://hentaivault.me/", priority: "1.0", changefreq: "daily" },
        { loc: "https://hentaivault.me/blog", priority: "0.7", changefreq: "weekly" },
        { loc: "https://hentaivault.me/about", priority: "0.5", changefreq: "monthly" },
        { loc: "https://hentaivault.me/contact", priority: "0.5", changefreq: "monthly" },
        { loc: "https://hentaivault.me/privacy", priority: "0.3", changefreq: "monthly" },
        { loc: "https://hentaivault.me/terms", priority: "0.3", changefreq: "monthly" },
        { loc: "https://hentaivault.me/disclaimer", priority: "0.3", changefreq: "monthly" },
        { loc: "https://hentaivault.me/dmca", priority: "0.3", changefreq: "monthly" },
        { loc: "https://hentaivault.me/region-unblocked", priority: "0.5", changefreq: "weekly" },
        { loc: "https://hentaivault.me/category/anime-streaming", priority: "0.8", changefreq: "daily" },
        { loc: "https://hentaivault.me/category/hentai-streaming", priority: "0.8", changefreq: "daily" },
        { loc: "https://hentaivault.me/category/manga-doujin", priority: "0.8", changefreq: "daily" },
        { loc: "https://hentaivault.me/category/images-boorus", priority: "0.7", changefreq: "weekly" },
        { loc: "https://hentaivault.me/category/games", priority: "0.7", changefreq: "weekly" },
        { loc: "https://hentaivault.me/category/communities", priority: "0.7", changefreq: "weekly" },
        { loc: "https://hentaivault.me/category/downloads", priority: "0.7", changefreq: "weekly" },
        { loc: "https://hentaivault.me/category/visual-novels", priority: "0.6", changefreq: "weekly" }
      ];
      let siteUrls = "";
      if (env.hv_directory) {
        try {
          const rows = await env.hv_directory.prepare(
            "SELECT id, added_at FROM sites ORDER BY added_at DESC"
          ).all();
          for (const row of rows.results) {
            const lastmod = row.added_at ? row.added_at.split("T")[0] : today;
            siteUrls += `  <url>
    <loc>https://hentaivault.me/site?id=${row.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
          }
        } catch (err) {
          console.error("Sitemap D1 error:", err);
        }
      }
      const staticXml = staticPages.map((p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${siteUrls}</urlset>`;
      return new Response(xml, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Robots-Tag": "noindex"
        }
      });
    }
    if (url.pathname === "/api/site-count") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError("Database not configured", 500);
      try {
        const result = await env.hv_directory.prepare("SELECT COUNT(*) as count FROM sites").first();
        return new Response(
          JSON.stringify({ count: result.count }),
          { status: 200, headers: { ...CORS, "Cache-Control": "public, max-age=60" } }
        );
      } catch (err) {
        return jsonError("Database error", 500);
      }
    }
    if (url.pathname === "/api/status") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      const targetUrl = url.searchParams.get("url");
      if (!targetUrl) return jsonError("Missing url", 400);
      try {
        const start = Date.now();
        const res = await fetch(targetUrl, {
          method: "HEAD",
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
          signal: AbortSignal.timeout(3500)
        });
        const latency = Date.now() - start;
        const up = res.status >= 200 && res.status < 500 && res.status !== 404;
        return new Response(
          JSON.stringify({ up, latency, status: res.status }),
          { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ up: false, latency: 0, status: 0 }),
          { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=120" } }
        );
      }
    }
    if (url.pathname === "/api/site") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError("Database not configured", 500);
      const id = url.searchParams.get("id");
      if (!id) return jsonError("Missing site id", 400);
      try {
        const result = await env.hv_directory.prepare("SELECT data_json FROM sites WHERE id = ?").bind(id).first();
        if (!result) return jsonError("Site not found", 404);
        return new Response(
          result.data_json,
          { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" } }
        );
      } catch (err) {
        return jsonError("Database error", 500);
      }
    }
    if (url.pathname === "/api/alternatives") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError("Database not configured", 500);
      const id = url.searchParams.get("id");
      if (!id) return jsonError("Missing site id", 400);
      try {
        const target = await env.hv_directory.prepare("SELECT category FROM sites WHERE id = ?").bind(id).first();
        if (!target) return jsonError("Site not found", 404);
        const result = await env.hv_directory.prepare(`
          SELECT data_json 
          FROM sites 
          WHERE category = ? AND id != ? 
          ORDER BY rating DESC, added_at DESC 
          LIMIT 12
        `).bind(target.category, id).all();
        const sites = result.results.map((row) => JSON.parse(row.data_json));
        return new Response(
          JSON.stringify({ sites }),
          { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" } }
        );
      } catch (err) {
        return jsonError("Database error", 500);
      }
    }
    if (url.pathname === "/api/subscribe-digest") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method !== "POST") return jsonError("Method not allowed", 405);
      try {
        const body = await request.json();
        const email = (body.email || "").trim().toLowerCase();
        if (!email || !email.includes("@")) return jsonError("Invalid email", 400);
        if (env.PUSH_SUBSCRIBERS) {
          await env.PUSH_SUBSCRIBERS.put(`digest:${email}`, JSON.stringify({ email, subscribed_at: (/* @__PURE__ */ new Date()).toISOString() }));
        }
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...CORS, "Content-Type": "application/json" } });
      } catch (err) {
        return jsonError("Subscription failed", 500);
      }
    }
    if (url.pathname === "/api/config") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      return new Response(
        JSON.stringify({
          ad_skyscraper: env.AD_KEY_SKYSCRAPER || "13ca4044b4b6e65ef15f10d18752754e",
          ad_leaderboard: env.AD_KEY_LEADERBOARD || "40d623b6e8e7efa7651f8c6fbeb29bef",
          ad_infeed: env.AD_KEY_INFEED || "40d623b6e8e7efa7651f8c6fbeb29bef",
          ad_sticky_bottom: env.AD_KEY_STICKY_BOTTOM || "90b220b63fa3e2eb3c163fec3b34a465",
          ad_socialbar: env.AD_KEY_SOCIALBAR || "ba6744afc790009f7b04d7509a97ea2f",
          ad_popunder: env.AD_KEY_POPUNDER || "994511c440490953ceb331525d9f463f",
          ad_native: env.AD_KEY_NATIVE || "a098db90df9a9b985c317d9ba01e155e"
        }),
        { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" } }
      );
    }
    if (url.pathname === "/api/reviews") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError("Database not configured", 500);
      const site_id = url.searchParams.get("id");
      if (!site_id) return jsonError("Missing site id", 400);
      if (request.method === "GET") {
        try {
          const result = await env.hv_directory.prepare("SELECT user_name, rating, comment, created_at FROM reviews WHERE site_id = ? ORDER BY created_at DESC").bind(site_id).all();
          return new Response(
            JSON.stringify({ reviews: result.results }),
            { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
          );
        } catch (err) {
          return jsonError("Database error", 500);
        }
      }
      if (request.method === "POST") {
        try {
          const ip = request.headers.get("cf-connecting-ip");
          if (await checkRateLimit(ip, env)) {
            return jsonError("Too many submissions. Please try again later.", 429);
          }
          const body = await request.json();
          if (!body.rating || !body.comment) return jsonError("Missing required fields", 400);
          if (!body.turnstileToken) return jsonError("Please complete the CAPTCHA.", 400);
          const turnstileFormData = new FormData();
          turnstileFormData.append("secret", env.TURNSTILE_SECRET_KEY);
          turnstileFormData.append("response", body.turnstileToken);
          if (ip) turnstileFormData.append("remoteip", ip);
          const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: turnstileFormData
          });
          const turnstileData = await turnstileRes.json();
          if (!turnstileData.success) return jsonError("CAPTCHA verification failed.", 400);
          await env.hv_directory.prepare(
            "INSERT INTO reviews (site_id, user_name, rating, comment) VALUES (?, ?, ?, ?)"
          ).bind(site_id, body.user_name || "Anonymous", body.rating, body.comment).run();
          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
          );
        } catch (err) {
          return jsonError("Failed to submit review", 500);
        }
      }
      return jsonError("Method not allowed", 405);
    }
    if (url.pathname === "/api/site-of-the-week") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError("Database not configured", 500);
      try {
        const now = /* @__PURE__ */ new Date();
        const weekStr = now.getFullYear() + "-" + Math.floor(now.getTime() / (1e3 * 60 * 60 * 24 * 7));
        const topSites = await env.hv_directory.prepare("SELECT data_json FROM sites ORDER BY rating DESC LIMIT 50").all();
        if (topSites.results.length === 0) return jsonError("No sites found", 404);
        let hash = 0;
        for (let i = 0; i < weekStr.length; i++) hash += weekStr.charCodeAt(i);
        const index = hash % topSites.results.length;
        const site = JSON.parse(topSites.results[index].data_json);
        return new Response(
          JSON.stringify({ site }),
          { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" } }
        );
      } catch (err) {
        return jsonError("Database error", 500);
      }
    }
    if (url.pathname === "/api/sites") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (!env.hv_directory) return jsonError("Database not configured", 500);
      try {
        const page = parseInt(url.searchParams.get("page")) || 1;
        const limit = parseInt(url.searchParams.get("limit")) || 24;
        const offset = (page - 1) * limit;
        let query = "SELECT data_json FROM sites";
        let params = [];
        let conditions = [];
        const q = url.searchParams.get("q");
        if (q) {
          conditions.push("(name LIKE ? OR description LIKE ? OR data_json LIKE ?)");
          const likeQuery = `%${q}%`;
          params.push(likeQuery, likeQuery, likeQuery);
        }
        const category = url.searchParams.get("category");
        if (category) {
          conditions.push("category = ?");
          params.push(category);
        }
        const tagsStr = url.searchParams.get("tags");
        if (tagsStr) {
          const tagsArray = tagsStr.split(",");
          const tagConditions = tagsArray.map((tag) => {
            params.push(`%"${tag}"%`);
            return "data_json LIKE ?";
          });
          conditions.push(`(${tagConditions.join(" OR ")})`);
        }
        const whereClause = conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "";
        const countResult = await env.hv_directory.prepare(
          "SELECT COUNT(*) as count FROM sites" + whereClause
        ).bind(...params).first();
        const total = countResult ? countResult.count : 0;
        query += whereClause;
        const sort = url.searchParams.get("sort") || "random";
        if (sort === "rating" || sort === "popular") {
          query += " ORDER BY rating DESC";
        } else if (sort === "newest") {
          query += " ORDER BY added_at DESC";
        } else if (sort === "alphabetical" || sort === "alpha") {
          query += " ORDER BY name ASC";
        } else {
          const rawSeed = parseInt(url.searchParams.get("seed") || "0", 10);
          const seed = rawSeed > 0 && rawSeed < 2147483647 ? rawSeed : 1337;
          query += ` ORDER BY (rowid * ${seed}) % 1000000007`;
        }
        query += " LIMIT ? OFFSET ?";
        params.push(limit, offset);
        const result = await env.hv_directory.prepare(query).bind(...params).all();
        const sites = result.results.map((row) => JSON.parse(row.data_json));
        return new Response(
          JSON.stringify({ total, sites }),
          { status: 200, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" } }
        );
      } catch (err) {
        console.error("Error fetching sites from D1:", err);
        return jsonError("Database error", 500);
      }
    }
    if (url.pathname === "/api/submit") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method === "POST") {
        return handleSubmit(request, env, ctx);
      }
      return jsonError("Method not allowed.", 405);
    }
    if (url.pathname === "/api/push-subscribe") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }
      if (request.method === "POST") {
        if (!env.PUSH_SUBSCRIBERS) return jsonError("Push KV namespace not configured.", 500);
        try {
          const subscription = await request.json();
          if (!subscription || !subscription.endpoint) return jsonError("Invalid subscription", 400);
          const key = `sub_${encodeB64(subscription.endpoint).slice(-30)}`;
          await env.PUSH_SUBSCRIBERS.put(key, JSON.stringify(subscription));
          return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS });
        } catch (e) {
          return jsonError("Bad request payload.", 400);
        }
      }
      return jsonError("Method not allowed.", 405);
    }
    if (url.pathname === "/site" || url.pathname === "/site.html") {
      if (url.pathname === "/site.html") {
        const id2 = url.searchParams.get("id");
        const search = id2 ? `?id=${id2}` : "";
        return new Response(null, {
          status: 308,
          headers: {
            "Location": `${url.origin}/site${search}`,
            "Cache-Control": "public, max-age=604800"
          }
        });
      }
      const id = url.searchParams.get("id");
      if (!id) {
        return Response.redirect(url.origin + "/", 302);
      }
      const response = await env.ASSETS.fetch(new Request(url.origin + "/site.html"));
      if (!response.ok) {
        return response;
      }
      let site = null;
      let relatedSites = [];
      if (env.hv_directory) {
        try {
          const siteRow = await env.hv_directory.prepare("SELECT data_json FROM sites WHERE id = ?").bind(id).first();
          if (siteRow && siteRow.data_json) {
            site = JSON.parse(siteRow.data_json);
            const relatedRows = await env.hv_directory.prepare("SELECT data_json FROM sites WHERE category = ? AND id != ? LIMIT 15").bind(site.category, site.id).all();
            relatedSites = relatedRows.results.map((r) => JSON.parse(r.data_json));
            relatedSites.push(site);
          }
        } catch (err) {
          console.error("D1 lookup error:", err);
        }
      }
      if (!site) {
        return new Response(response.body, {
          status: 404,
          headers: response.headers
        });
      }
      const canonicalUrl = `https://hentaivault.me/site?id=${site.id}`;
      const titleText = `${site.name} Review | HentaiVault`;
      const lang = effectiveLang;
      const rewriter = new HTMLRewriter().on("title", new TitleHandler(titleText)).on("head", new HeadHandler(site, canonicalUrl)).on("div#reviewContent", new ReviewBodyHandler(site, lang, relatedSites));
      return rewriter.transform(response);
    }
    const isHtmlPage = url.pathname === "/" || url.pathname.endsWith(".html") || url.pathname.includes("/category/") || url.pathname.includes("/blog/");
    if (isHtmlPage) {
      const canonicalUrl = (() => {
        const clean = new URL(url.toString());
        const id = clean.searchParams.get("id");
        const q = clean.searchParams.get("q");
        clean.search = "";
        if (id) clean.searchParams.set("id", id);
        if (q) clean.searchParams.set("q", q);
        clean.protocol = "https:";
        return clean.toString();
      })();
      const response = await env.ASSETS.fetch(request);
      if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
        return response;
      }
      const rewriter = new HTMLRewriter().on("head", new CanonicalInjector(canonicalUrl));
      return rewriter.transform(response);
    }
    return env.ASSETS.fetch(request);
  }
};
async function handleSubmit(request, env, ctx) {
  try {
    const ip = request.headers.get("cf-connecting-ip");
    if (await checkRateLimit(ip, env)) {
      return jsonError("Too many submissions. Please try again later.", 429);
    }
    const body = await request.json().catch(() => null);
    if (!body) return jsonError("Invalid request body.", 400);
    const { name, url, category, description, turnstileToken } = body;
    if (!turnstileToken) {
      return jsonError("Please complete the CAPTCHA.", 400);
    }
    if (!env.TURNSTILE_SECRET_KEY) {
      return jsonError("Server misconfiguration: missing Turnstile key.", 500);
    }
    const turnstileFormData = new FormData();
    turnstileFormData.append("secret", env.TURNSTILE_SECRET_KEY);
    turnstileFormData.append("response", turnstileToken);
    if (ip) turnstileFormData.append("remoteip", ip);
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: turnstileFormData
    });
    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return jsonError("CAPTCHA verification failed. Please try again.", 400);
    }
    const nameClean = sanitize(name);
    const descClean = sanitize(description);
    const urlClean = (url || "").trim();
    const catClean = (category || "").trim();
    if (!nameClean || nameClean.length < 2)
      return jsonError("Site name must be at least 2 characters.", 400);
    if (!isValidURL(urlClean))
      return jsonError("Please provide a valid http:// or https:// URL.", 400);
    if (!ALLOWED_CATEGORIES.includes(catClean))
      return jsonError("Invalid category selected.", 400);
    if (!descClean || descClean.length < 20)
      return jsonError("Description must be at least 20 characters.", 400);
    if (!env.GITHUB_TOKEN)
      return jsonError("Server misconfiguration. Contact the admin.", 500);
    if (!env.hv_directory) return jsonError("Database not configured.", 500);
    const existing = await env.hv_directory.prepare("SELECT id FROM sites WHERE url = ?").bind(urlClean).first();
    if (existing) {
      return jsonError("This site is already listed in the directory!", 409);
    }
    const id = makeId(nameClean);
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const newEntry = {
      id,
      name: nameClean,
      url: urlClean,
      category: catClean,
      description: descClean,
      tags: ["Community Submitted"],
      rating: 4,
      addedAt: today
    };
    const dataJson = JSON.stringify(newEntry);
    await env.hv_directory.prepare(
      "INSERT INTO sites (id, category, url, rating, added_at, data_json) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(id, catClean, urlClean, 4, today, dataJson).run();
    ctx.waitUntil(pingIndexNow(env));
    return new Response(
      JSON.stringify({
        success: true,
        message: `"${nameClean}" has been added to the directory! It will appear live shortly.`
      }),
      { status: 200, headers: CORS }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return jsonError("An unexpected error occurred.", 500);
  }
}
__name(handleSubmit, "handleSubmit");
function isValidURL(str) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
__name(isValidURL, "isValidURL");
function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[\\"`]/g, "").replace(/[\r\n\t]/g, " ").trim().slice(0, 300);
}
__name(sanitize, "sanitize");
function makeId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 30) + "_" + Date.now().toString(36);
}
__name(makeId, "makeId");
function encodeB64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
__name(encodeB64, "encodeB64");
function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), { status, headers: CORS });
}
__name(jsonError, "jsonError");
async function pingIndexNow(env) {
  if (!env.INDEXNOW_KEY) return;
  try {
    const url = "https://api.indexnow.org/indexnow";
    const payload = {
      host: "hentaivault.me",
      key: env.INDEXNOW_KEY,
      keyLocation: `https://hentaivault.me/${env.INDEXNOW_KEY}.txt`,
      urlList: [
        "https://hentaivault.me/",
        "https://hentaivault.me/category/anime-streaming",
        "https://hentaivault.me/category/hentai-streaming",
        "https://hentaivault.me/category/manga-doujin",
        "https://hentaivault.me/category/images-boorus",
        "https://hentaivault.me/category/games",
        "https://hentaivault.me/category/communities",
        "https://hentaivault.me/category/downloads",
        "https://hentaivault.me/category/visual-novels"
      ]
    };
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });
    console.log("Successfully pinged IndexNow API");
  } catch (err) {
    console.error("IndexNow ping failed:", err);
  }
}
__name(pingIndexNow, "pingIndexNow");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
