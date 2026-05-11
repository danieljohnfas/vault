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
        visit: "Visit"
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
        visit: "Visitar"
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
        visit: "訪問する"
    }
};

let currentLang = localStorage.getItem('hv_lang') || 'en';

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    localStorage.setItem('hv_lang', lang);
    updateUIText();
}

function updateUIText() {
    const t = TRANSLATIONS[currentLang];
    
    // Update elements with data-i18n attribute
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

    // Update special cases
    const logoText = document.querySelector('.logo');
    if (logoText) {
        const icon = logoText.querySelector('.logo-icon').innerText;
        logoText.innerHTML = `<span class="logo-icon">${icon}</span> Hentai${t.vault}`;
    }
}

document.addEventListener('DOMContentLoaded', updateUIText);
