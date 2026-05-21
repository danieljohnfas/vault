const TRANSLATIONS = {
    en: {
        vault: "Vault",
        directory: "Directory",
        blog: "Blog",
        submit: "Submit Site",
        favorites: "My Favorites",
        search_placeholder: "Search 500+ anime & hentai sites...",
        sort_by: "Sort By:",
        random: "Random",
        popular: "Most Popular",
        rating: "Top Rated",
        newest: "Newest Added",
        alpha: "A-Z",
        showing: "Showing",
        of: "of",
        sites: "Sites",
        load_more: "Load More Sites",
        visit: "Visit",
        added: "Added",
        categories: {
            "Anime Streaming": "Anime Streaming",
            "Hentai Streaming": "Hentai Streaming",
            "Manga/Doujin": "Manga & Doujin",
            "Images/Boorus": "Images & Boorus",
            "Games": "Adult Games",
            "Communities": "Communities",
            "Downloads": "Downloads",
            "Visual Novels": "Visual Novels",
            "Adult Studios": "Adult Studios",
            "Adult VR": "Adult VR",
            "Premium Creators": "Premium Creators"
        }
    },
    es: {
        vault: "Bóveda",
        directory: "Directorio",
        blog: "Blog",
        submit: "Enviar Sitio",
        favorites: "Mis Favoritos",
        search_placeholder: "Buscar más de 500 sitios...",
        sort_by: "Ordenar por:",
        random: "Aleatorio",
        popular: "Más Popular",
        rating: "Mejor Valorados",
        newest: "Lo Último",
        alpha: "A-Z",
        showing: "Mostrando",
        of: "de",
        sites: "Sitios",
        load_more: "Cargar más sitios",
        visit: "Visitar",
        added: "Agregado",
        categories: {
            "Anime Streaming": "Streaming de Anime",
            "Hentai Streaming": "Streaming de Hentai",
            "Manga/Doujin": "Manga y Doujin",
            "Images/Boorus": "Imágenes y Boorus",
            "Games": "Juegos Adultos",
            "Communities": "Comunidades",
            "Downloads": "Descargas",
            "Visual Novels": "Novelas Visuales",
            "Adult Studios": "Estudios Adultos",
            "Adult VR": "VR Adulto",
            "Premium Creators": "Creadores Premium"
        }
    },
    jp: {
        vault: "ボルト",
        directory: "ディレクトリ",
        blog: "ブログ",
        submit: "サイトを提出",
        favorites: "お気に入り",
        search_placeholder: "500以上のサイトを検索...",
        sort_by: "並べ替え:",
        random: "ランダム",
        popular: "人気順",
        rating: "高評価順",
        newest: "新着順",
        alpha: "A-Z",
        showing: "表示中",
        of: "/",
        sites: "サイト",
        load_more: "もっと見る",
        visit: "訪問する",
        added: "追加日",
        categories: {
            "Anime Streaming": "アニメ配信",
            "Hentai Streaming": "変態アニメ配信",
            "Manga/Doujin": "漫画・同人",
            "Images/Boorus": "画像・ブール",
            "Games": "アダルトゲーム",
            "Communities": "コミュニティ",
            "Downloads": "ダウンロード",
            "Visual Novels": "ビジュアルノベル",
            "Adult Studios": "アダルトスタジオ",
            "Adult VR": "アダルトVR",
            "Premium Creators": "プレミアムクリエイター"
        }
    },
    fr: {
        vault: "Vault",
        directory: "Annuaire",
        blog: "Blog",
        submit: "Soumettre un site",
        favorites: "Mes favoris",
        search_placeholder: "Rechercher parmi plus de 500 sites...",
        sort_by: "Trier par :",
        random: "Aléatoire",
        popular: "Le plus populaire",
        rating: "Mieux notés",
        newest: "Derniers ajouts",
        alpha: "A-Z",
        showing: "Affichage de",
        of: "sur",
        sites: "Sites",
        load_more: "Charger plus de sites",
        visit: "Visiter",
        added: "Ajouté le",
        categories: {
            "Anime Streaming": "Streaming Anime",
            "Hentai Streaming": "Streaming Hentai",
            "Manga/Doujin": "Manga & Doujin",
            "Images/Boorus": "Images & Boorus",
            "Games": "Jeux pour adultes",
            "Communities": "Communautés",
            "Downloads": "Téléchargements",
            "Visual Novels": "Visual Novels",
            "Adult Studios": "Studios pour adultes",
            "Adult VR": "VR pour adultes",
            "Premium Creators": "Créateurs Premium"
        }
    }
};

const META_TRANSLATIONS = {
    fr: {
        homepage: {
            title: "HentaiVault — Meilleurs sites de doujin, streaming hentai et alternatives nhentai 2026",
            description: "L'annuaire #1 d'Internet pour les meilleurs sites de doujin, streaming hentai, alternatives nhentai et hanime en 2026. Plus de 500 sites sélectionnés, notés et gratuits.",
            keywords: "meilleurs sites de doujin, sites doujinshi, alternatives nhentai, alternatives hanime, sites streaming hentai 2026, meilleurs sites de streaming hentai 2026, sites booru, hentai booru, meilleurs sites de manga hentai 2026, annuaire hentai, streaming anime, visual novels, hentai vault"
        },
        category: {
            title: "Meilleurs sites de {category} 2026 — Gratuits et classés | HentaiVault",
            description: "Parcourez les meilleurs sites de {category} de 2026. Options gratuites, premium et bien notées, évaluées et classées par la communauté HentaiVault.",
            keywords: "meilleurs sites de {category} 2026, {category} gratuit, top sites {category}, annuaire {category}"
        },
        blog_index: {
            title: "Blog HentaiVault — Guides d'experts et listes de sites 2026",
            description: "Lisez des avis d'experts, des tops 10 et des guides de sécurité pour les meilleurs sites pour adultes en ligne. Mis à jour chaque semaine par l'équipe."
        },
        blog_posts: {
            "best-doujin-sites-2026.html": {
                title: "Les 10 meilleurs sites de doujinshi de 2026 (Gratuits & HD) | HentaiVault",
                description: "Quels sont les meilleurs sites de doujinshi en 2026 ? Lisez notre comparatif complet avec nhentai, hitomi.la, E-Hentai et autres lecteurs gratuits."
            },
            "best-streaming-2026.html": {
                title: "Les 10 meilleurs sites de streaming hentai de 2026 (Sans censure) | HentaiVault",
                description: "Vous cherchez les meilleurs sites de streaming hentai ? Nous avons testé les plateformes pour vous proposer le top 10 avec HD, sans censure et peu de pubs."
            },
            "free-manga-guide.html": {
                title: "Comment lire des mangas hentai & doujins en toute sécurité (Guide 2026) | HentaiVault",
                description: "Guide complet pour lire des mangas hentai et des doujinshi en ligne de manière anonyme et sécurisée en 2026. Évitez les logiciels malveillants et les spams."
            },
            "nhentai-alternatives-2026.html": {
                title: "Les meilleures alternatives à nhentai & miroirs fonctionnels 2026 | HentaiVault",
                description: "nhentai est bloqué ou en panne ? Découvrez le top des alternatives et miroirs de secours fonctionnels en 2026 pour lire vos doujinshi sans interruption."
            },
            "privacy-safety-guide.html": {
                title: "Comment naviguer sur les sites hentai en toute sécurité (Guide 2026) | HentaiVault",
                description: "Protégez votre vie privée et vos appareils lors de la navigation sur les sites pour adultes. VPN, bloqueurs de publicité et navigation privée expliqués."
            }
        }
    },
    es: {
        homepage: {
            title: "HentaiVault — Los mejores sitios de doujin, streaming hentai y alternativas a nhentai 2026",
            description: "El directorio #1 de Internet para los mejores sitios de doujin, streaming de hentai, alternativas a nhentai y hanime en 2026. Más de 500 sitios seleccionados, calificados y gratuitos.",
            keywords: "mejores sitios de doujin, sitios doujinshi, alternativas nhentai, alternativas hanime, sitios de streaming hentai 2026, mejores sitios de streaming hentai 2026, sitios booru, hentai booru, mejores sitios de manga hentai 2026, directorio hentai, streaming de anime, novelas visuales, hentai vault"
        },
        category: {
            title: "Los mejores sitios de {category} 2026 — Gratis y clasificados | HentaiVault",
            description: "Explore los mejores sitios web de {category} de 2026. Opciones gratuitas, premium y mejor valoradas, revisadas y clasificadas por la comunidad de HentaiVault.",
            keywords: "mejores sitios de {category} 2026, {category} gratis, mejores sitios web de {category}, directorio de {category}"
        },
        blog_index: {
            title: "Blog de HentaiVault — Guías de expertos y listas de sitios 2026",
            description: "Lea reseñas de expertos, listas de los 10 mejores y guías de seguridad para los mejores sitios de adultos en línea. Actualizado semanalmente."
        },
        blog_posts: {
            "best-doujin-sites-2026.html": {
                title: "Los 10 mejores sitios de doujinshi de 2026 (Gratis & HD) | HentaiVault",
                description: "¿Cuáles son los mejores sitios de doujinshi en 2026? Lea nuestra guía comparativa de nhentai, hitomi y lectores gratuitos."
            },
            "best-streaming-2026.html": {
                title: "Los 10 mejores sitios de streaming hentai de 2026 (Sin censura) | HentaiVault",
                description: "¿Busca el mejor streaming de hentai? Hemos auditado las plataformas principales para traerle las 10 mejores opciones en HD y sin censura."
            },
            "free-manga-guide.html": {
                title: "Cómo leer manga hentai y doujins de forma segura (Guía 2026) | HentaiVault",
                description: "Una guía completa para leer manga hentai y doujinshi en línea de forma anónima y segura. Evite malware y anuncios intrusivos."
            },
            "nhentai-alternatives-2026.html": {
                title: "Las mejores alternativas a nhentai y espejos activos 2026 | HentaiVault",
                description: "¿nhentai no funciona? Explore las mejores alternativas y clones activos en 2026 para leer doujinshi sin interrupciones."
            },
            "privacy-safety-guide.html": {
                title: "Cómo navegar por sitios hentai de forma segura y privada (Guía 2026) | HentaiVault",
                description: "Proteja sus dispositivos al navegar por sitios web de adultos. Guía sobre VPNs, bloqueadores de anuncios y privacidad en línea."
            }
        }
    },
    jp: {
        homepage: {
            title: "HentaiVault — おすすめ同人サイト、変態アニメ配信＆nhentai代替サイト 2026",
            description: "2026年最新の同人サイト、変態アニメ配信、nhentai代替、hanime代替、booruサイトのNo.1ディレクトリ。500以上のサイトを厳選・評価・無料閲覧可能。",
            keywords: "おすすめ同人サイト, 同人誌サイト, nhentai代替, hanime代替, 変態アニメ配信サイト 2026, おすすめ変態アニメ配信サイト 2026, booruサイト, 変態booru, おすすめ変態漫画サイト 2026, 変態ディレクトリ, アニメ配信, ビジュアルノベル, ヘンタイボルト"
        },
        category: {
            title: "おすすめ{category}サイト 2026 — 無料＆人気順 | HentaiVault",
            description: "2026年おすすめの{category}ウェブサイトを閲覧。HentaiVaultコミュニティによって評価・ランク付けされた無料およびプレミアムのオプション。",
            keywords: "おすすめ{category}サイト 2026, 無料{category}, 人気{category}ウェブサイト, {category}ディレクトリ"
        },
        blog_index: {
            title: "HentaiVault ブログ — 専門家によるガイドとサイトリスト 2026",
            description: "ネット上のベストな変態＆アニメサイトに関する専門家のレビュー、トップ10リスト、安全ガイドをお届け。毎週更新。"
        },
        blog_posts: {
            "best-doujin-sites-2026.html": {
                title: "2026年おすすめ同人誌サイト10選（無料＆高画質） | HentaiVault",
                description: "2026年の最高の同人誌サイトは？nhentai、hitomi.la、E-Hentaiなどの無料リーダーを徹底比較。"
            },
            "best-streaming-2026.html": {
                title: "2026年おすすめ変態アニメ配信サイト10選（無修正） | HentaiVault",
                description: "おすすめの変態アニメ配信サイトをお探しですか？無修正、HD画質、広告最小限のトップ10サイトをご紹介。"
            },
            "free-manga-guide.html": {
                title: "変態漫画と同人を安全に読む方法（2026年最新ガイド） | HentaiVault",
                description: "オンラインで匿名かつ安全に変態漫画や同人誌を読むための完全ガイド。マルウェアやスパムを防ぐ対策を解説。"
            },
            "nhentai-alternatives-2026.html": {
                title: "nhentaiの代わりとなるおすすめサイト＆稼働中ミラー 2026 | HentaiVault",
                description: "nhentaiが閉鎖または一時停止中？2026年に同人誌を快適に読むための代替サイトとクローンサイト一覧。"
            },
            "privacy-safety-guide.html": {
                title: "変態サイトを安全かつプライベートに閲覧する方法 2026 | HentaiVault",
                description: "アダルトサイトを閲覧する際にデバイスと個人情報を守る方法。VPN、広告ブロッカー、プライベートブラウジングの使い方。"
            }
        }
    }
};

const BLOG_H1_TRANSLATIONS = {
    fr: {
        "best-doujin-sites-2026.html": "Les 10 meilleurs sites de doujinshi de 2026",
        "best-streaming-2026.html": "Les 10 meilleurs sites de streaming hentai de 2026",
        "free-manga-guide.html": "Comment lire des mangas hentai & doujins en toute sécurité",
        "nhentai-alternatives-2026.html": "Les meilleures alternatives à nhentai & miroirs fonctionnels (2026)",
        "privacy-safety-guide.html": "Comment naviguer sur les sites pour adultes & hentai en toute sécurité"
    },
    es: {
        "best-doujin-sites-2026.html": "Los 10 mejores sitios de doujinshi de 2026",
        "best-streaming-2026.html": "Los 10 mejores sitios de streaming hentai de 2026",
        "free-manga-guide.html": "Cómo leer manga hentai y doujins de forma segura",
        "nhentai-alternatives-2026.html": "Las mejores alternativas a nhentai y espejos activos (2026)",
        "privacy-safety-guide.html": "Cómo navegar por sitios de adultos y hentai de forma segura"
    },
    jp: {
        "best-doujin-sites-2026.html": "2026年おすすめ同人誌サイト10選",
        "best-streaming-2026.html": "2026年おすすめ変態アニメ配信サイト10選",
        "free-manga-guide.html": "変態漫画と同人を安全に読む方法",
        "nhentai-alternatives-2026.html": "nhentaiの代わりとなるおすすめサイト＆稼働中ミラー (2026年)",
        "privacy-safety-guide.html": "アダルト＆変態サイトを安全かつプライベートに閲覧する方法"
    }
};

const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
let currentLang = langParam || localStorage.getItem('hv_lang') || 'en';
if (!TRANSLATIONS[currentLang]) {
    currentLang = 'en';
}
if (langParam && TRANSLATIONS[langParam]) {
    try {
        localStorage.setItem('hv_lang', langParam);
    } catch(e){}
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    try {
        localStorage.setItem('hv_lang', lang);
    } catch(e){}
    
    // Maintain language parameter in URL on change and reload page
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
}

function setMetaName(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
    }
    el.content = content;
}

function setMetaProperty(prop, content) {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
    }
    el.content = content;
}

function applyDynamicMetaTranslations() {
    if (currentLang === 'en') return;

    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    let meta = null;
    const t = TRANSLATIONS[currentLang];

    if (filename === 'index.html' || filename === '') {
        meta = META_TRANSLATIONS[currentLang] ? META_TRANSLATIONS[currentLang].homepage : null;
    } else if (path.includes('/category/')) {
        const rawCat = typeof window.FILTER_CATEGORY !== 'undefined' ? window.FILTER_CATEGORY : '';
        const localCatName = t.categories && t.categories[rawCat] ? t.categories[rawCat] : rawCat;
        
        const catTemplate = META_TRANSLATIONS[currentLang] ? META_TRANSLATIONS[currentLang].category : null;
        if (catTemplate && localCatName) {
            meta = {
                title: catTemplate.title.replace('{category}', localCatName),
                description: catTemplate.description.replace('{category}', localCatName),
                keywords: catTemplate.keywords.replace('{category}', localCatName)
            };
        }
    } else if (path.includes('/blog') && (filename === 'index.html' || filename === '')) {
        meta = META_TRANSLATIONS[currentLang] ? META_TRANSLATIONS[currentLang].blog_index : null;
    } else if (path.includes('/blog/') && filename) {
        const posts = META_TRANSLATIONS[currentLang] ? META_TRANSLATIONS[currentLang].blog_posts : null;
        meta = posts ? posts[filename] : null;
        
        const h1Trans = BLOG_H1_TRANSLATIONS[currentLang] ? BLOG_H1_TRANSLATIONS[currentLang][filename] : null;
        const h1Element = document.querySelector('.article-header h1, .blog-hero h1');
        if (h1Trans && h1Element) {
            h1Element.innerText = h1Trans;
        }
    }

    if (meta) {
        if (meta.title) {
            document.title = meta.title;
            setMetaProperty('og:title', meta.title);
            setMetaName('twitter:title', meta.title);
        }
        if (meta.description) {
            setMetaName('description', meta.description);
            setMetaProperty('og:description', meta.description);
            setMetaName('twitter:description', meta.description);
        }
        if (meta.keywords) {
            setMetaName('keywords', meta.keywords);
        }
    }
}

function updateUIText() {
    const t = TRANSLATIONS[currentLang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = t[key];
            } else {
                el.innerText = t[key];
            }
        }
    });

    const logoText = document.querySelector('.logo');
    if (logoText) {
        const logoIconEl = logoText.querySelector('.logo-icon');
        const icon = logoIconEl ? logoIconEl.innerText : '💎';
        logoText.innerHTML = `<span class="logo-icon">${icon}</span> Hentai${t.vault}`;
    }

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = currentLang;
    }

    applyDynamicMetaTranslations();
}

document.addEventListener('DOMContentLoaded', updateUIText);
