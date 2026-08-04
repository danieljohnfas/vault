// app.js

// ── Static lookup constants (previously in data.js) ─────────────────────────
const ALL_CATEGORIES = [
    'Manga & Doujinshi',
    'Hentai Streaming',
    'Anime Streaming',
    'Image Boards (Boorus)',
    'Games & Visual Novels',
    'Communities & Forums',
    'Downloads & Torrents',
    'Adult Tubes & Studios',
    'Creator Platforms',
    'Immersive & Interactive'
];

const ALL_TAGS = [
    'free', 'premium', 'english', 'japanese', 'subbed', 'dubbed',
    'HD', '4K', 'mobile-friendly', 'no-ads', 'download', 'streaming',
    'uncensored', 'censored', 'doujin', 'manga', 'hentai', 'vanilla',
    'NTR', 'yaoi', 'yuri', 'futanari', 'loli', 'shota', 'dark',
    'SFW', 'community', 'forum', 'discord', 'VPN-needed', 'safe',
    'updated-daily', 'curated', 'request', 'games', 'visual-novel'
];

window.escapeHTML = window.escapeHTML || ((str) => {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
});

document.addEventListener('DOMContentLoaded', () => {
    // Fetch Ad Configuration dynamically in the background
    fetch('/api/config')
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data) window.adConfig = data; })
        .catch(e => console.error("Failed to load ad config", e));

    let amzAdCards = [];
    let amzAdIndex = 0;
    fetch('/api/amazon-ads?context=default&limit=6')
        .then(r => r.json())
        .then(data => amzAdCards = data || [])
        .catch(e => console.error(e));

    try {
        initTheme();
    } catch (e) { console.error("Theme init failed", e); }

    // --- DOM Elements ---
    const siteGrid = document.getElementById('siteGrid');
    const categoryFiltersContainer = document.getElementById('categoryFilters');
    const tagFiltersContainer = document.getElementById('tagFilters');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const resultsCount = document.getElementById('resultsCount');
    const loadMoreBtn = document.getElementById('loadMore');
    
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');

    const submitModal = document.getElementById('submitModal');
    const btnSubmitSite = document.getElementById('btnSubmitSite');
    


    const closeBtns = document.getElementsByClassName('close-modal');

    const btnSearchMobile = document.getElementById('btnSearchMobile');

    // Uptime Status Observer
    const statusObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dot = entry.target;
                const url = dot.dataset.url;
                observer.unobserve(dot);
                dot.classList.add('status-loading');
                fetch(`/api/status?url=${encodeURIComponent(url)}`)
                    .then(r => r.json())
                    .then(data => {
                        dot.classList.remove('status-loading');
                        if (data.up) {
                            dot.classList.add('status-up');
                            dot.title = `Online (${data.latency}ms)`;
                        } else {
                            dot.classList.add('status-down');
                            dot.title = `Offline / Unreachable (HTTP ${data.status})`;
                        }
                    }).catch(() => {
                        dot.classList.remove('status-loading');
                        dot.classList.add('status-unknown');
                        dot.title = `Status check failed`;
                    });
            }
        });
    }, { rootMargin: '100px' });

    const searchBar = document.querySelector('.search-bar');

    // --- Constants ---
    const ITEMS_PER_PAGE = 24;

    // --- State ---
    let currentSites = [];
    let activeCategories = [];
    let activeTags = [];
    let searchQuery = "";
    let currentSort = "random";
    let currentPage = 1;
    let isLoading = false;
    let hasMoreSites = true;
    // Session seed for deterministic random shuffle — generated once per session,
    // re-generated when filters/sort changes. Avoids the URL length cap of the old exclude approach.
    let randomSeed = Math.floor(Math.random() * 2000000000) + 1;

    // Read current language set by i18n.js (exposed on window)
    const currentLang = window.currentLang || localStorage.getItem('hv_lang') || 'en';

    // --- Cloud Sync & Favorites Logic ---
    let syncCode = localStorage.getItem('hv_sync_code');
    if (!syncCode) {
        syncCode = Math.random().toString(36).substring(2,10).toUpperCase();
        localStorage.setItem('hv_sync_code', syncCode);
    }
    const mySyncCodeDisplay = document.getElementById('mySyncCodeDisplay');
    if (mySyncCodeDisplay) mySyncCodeDisplay.innerText = syncCode;

    let favorites = [];
    try {
        favorites = JSON.parse(localStorage.getItem('hv_favorites') || '[]');
    } catch (e) { console.error("Favorites parse failed", e); }
    let showFavoritesOnly = false;

    let syncTimeout;
    function triggerCloudSync() {
        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            fetch('/api/vault/sync?code=' + syncCode, {
                method: 'POST',
                body: JSON.stringify(favorites)
            }).catch(console.error);
        }, 1000);
    }

    const btnSyncRestore = document.getElementById('btnSyncRestore');
    const syncCodeInput = document.getElementById('syncCodeInput');
    if (btnSyncRestore && syncCodeInput) {
        btnSyncRestore.addEventListener('click', () => {
            const code = syncCodeInput.value.trim().toUpperCase();
            if (code.length < 8) return alert('Invalid code length.');
            btnSyncRestore.innerText = '...';
            fetch('/api/vault/sync?code=' + code)
                .then(r => r.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        favorites = data;
                        localStorage.setItem('hv_favorites', JSON.stringify(favorites));
                        syncCode = code;
                        localStorage.setItem('hv_sync_code', syncCode);
                        mySyncCodeDisplay.innerText = syncCode;
                        alert('Cloud Sync successful! ' + favorites.length + ' favorites loaded.');
                        applyFiltersAndSort();
                    } else {
                        alert('No backup found for this code.');
                    }
                })
                .catch(e => alert('Sync failed.'))
                .finally(() => btnSyncRestore.innerText = 'Load');
        });
    }

    
    // --- Share Logic ---
    window.openShareModal = function(url, title, text) {
        if (navigator.share) {
            navigator.share({ title: title, text: text, url: url }).catch(console.error);
        } else {
            const modal = document.getElementById('shareModal');
            if (!modal) return;
            document.getElementById('shareQrImg').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
            const btnCopy = document.getElementById('btnShareCopy');
            btnCopy.onclick = () => {
                navigator.clipboard.writeText(url);
                btnCopy.innerHTML = '✅ Copied!';
                setTimeout(() => btnCopy.innerHTML = '📋 Copy Link', 2000);
            };
            document.getElementById('btnShareTwitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            document.getElementById('btnShareReddit').href = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            modal.classList.add('active');
        }
    };

    document.addEventListener('click', (e) => {
        if (e.target.id === 'shareModal' || e.target.classList.contains('close-share')) {
            const modal = document.getElementById('shareModal');
            if (modal) modal.classList.remove('active');
        }
    });

    const btnShareVault = document.getElementById('btnShareVault');
    if (btnShareVault) {
        btnShareVault.addEventListener('click', () => {
            window.openShareModal('https://hentaivault.me', 'HentaiVault', 'Check out HentaiVault - The #1 directory for adult sites, games and manga!');
        });
    }


    // --- Mobile Search Toggle ---
    if (btnSearchMobile && searchBar && searchInput) {
        btnSearchMobile.addEventListener('click', () => {
            searchBar.classList.toggle('mobile-open');
            if (searchBar.classList.contains('mobile-open')) {
                searchInput.focus();
            }
        });
    }

    // --- Surprise Me Button ---
    const btnSurpriseMe = document.getElementById('btnSurpriseMe');
    if (btnSurpriseMe) {
        btnSurpriseMe.addEventListener('click', async () => {
            const originalText = btnSurpriseMe.innerHTML;
            btnSurpriseMe.innerHTML = '<span style="font-size: 1.2rem;">✨</span> Opening...';
            try {
                const res = await fetch('/api/sites?sort=random&limit=1');
                const data = await res.json();
                if (data && data.sites && data.sites.length > 0) {
                    window.location.href = `/site?id=${data.sites[0].id}`;
                } else {
                    btnSurpriseMe.innerHTML = originalText;
                }
            } catch (e) {
                btnSurpriseMe.innerHTML = originalText;
            }
        });
    }

    // --- Site of the DAY Spotlight (with FOMO countdown) ---
    const spotlightContainer = document.getElementById('spotlightContainer');
    if (spotlightContainer) {
        (async () => {
            try {
                const res = await fetch('/api/site-of-the-day');
                if (!res.ok) return;
                const { site } = await res.json();
                if (!site) return;
                const sUrl = new URL(site.url);
                const favicon = `https://icons.duckduckgo.com/ip3/${sUrl.hostname}.ico`;
                const currentLang = localStorage.getItem('hv_lang') || 'en';
                const localName = window.escapeHTML(site[`name_${currentLang}`] || site.name);
                const localDesc = window.escapeHTML(site[`description_${currentLang}`] || site.description);
                spotlightContainer.innerHTML = `
                    <div style="position:relative; overflow:hidden; border-radius: 20px; border: 1px solid rgba(255,42,95,0.4); background: linear-gradient(135deg, rgba(255,42,95,0.08) 0%, rgba(123,57,220,0.08) 100%); padding: 32px; display: flex; align-items: center; gap: 28px; box-shadow: 0 0 60px rgba(255,42,95,0.1);">
                        <div style="position:absolute; inset:0; background:url('https://image.thum.io/get/width/1200/crop/400/noanimate/${site.url}') center/cover no-repeat; opacity:0.06; border-radius: inherit;"></div>
                        <div style="position:relative; flex-shrink:0; background:rgba(255,42,95,0.15); border-radius:14px; padding:8px; border:1px solid rgba(255,42,95,0.3);">
                            <img src="${favicon}" alt="${localName}" style="width:80px; height:80px; border-radius:10px; display:block;">
                        </div>
                        <div style="position:relative; flex:1; min-width:0;">
                            <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,42,95,0.2); border:1px solid rgba(255,42,95,0.4); padding:4px 12px; border-radius:20px; margin-bottom:12px;">
                                <span style="font-size:0.7rem; text-transform:uppercase; letter-spacing:2px; font-weight:800; color:#ff2a5f;">⭐ Site of the Day &nbsp;|&nbsp; Resets in: <span id="sotd-countdown" style="font-variant-numeric:tabular-nums;">--:--:--</span></span>
                            </div>
                            <h2 style="margin:0 0 8px; font-size:2rem; font-weight:800; color:white;">${localName}</h2>
                            <p style="margin:0 0 20px; color:#a1a1aa; font-size:0.95rem; line-height:1.5; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${localDesc}</p>
                            <div style="display:flex; gap:12px; flex-wrap:wrap;">
                                <a href="/site?id=${site.id}" style="text-decoration:none; padding:10px 24px; background:var(--primary); color:white; border-radius:8px; font-weight:700; font-size:0.95rem;">Read Review →</a>
                                <a href="${site.url}" target="_blank" rel="nofollow noopener noreferrer" style="text-decoration:none; padding:10px 24px; border:1px solid rgba(255,255,255,0.2); color:white; border-radius:8px; font-weight:600; font-size:0.95rem;">Visit Site ↗</a>
                            </div>
                        </div>
                    </div>`;
                spotlightContainer.style.display = 'block';
                // FOMO Countdown to midnight UTC
                function updateCountdown() {
                    const el = document.getElementById('sotd-countdown');
                    if (!el) return;
                    const now = new Date();
                    const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
                    const diff = midnight - now;
                    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
                    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
                    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
                    el.textContent = `${h}:${m}:${s}`;
                }
                updateCountdown();
                setInterval(updateCountdown, 1000);
            } catch (e) { /* Silently fail */ }
        })();
    }

    // --- Trending Sites Shelf ---
    const trendingShelf = document.getElementById('trendingShelf');
    if (trendingShelf) {
        (async () => {
            try {
                const res = await fetch('/api/trending');
                if (!res.ok) return;
                const { sites } = await res.json();
                if (!sites || sites.length === 0) return;
                trendingShelf.innerHTML = sites.map(s => `
                    <a href="/site?id=${s.id}" style="display:flex; flex-direction:column; align-items:center; min-width:90px; max-width:90px; text-align:center; text-decoration:none; gap:6px;">
                        <div style="position:relative;">
                            <img src="https://icons.duckduckgo.com/ip3/${new URL(s.url).hostname}.ico" alt="${window.escapeHTML(s.name)} icon" style="width:52px;height:52px;border-radius:14px;background:var(--bg-surface);padding:4px;box-shadow:0 0 12px rgba(255,42,95,0.3);border:1px solid rgba(255,42,95,0.3);" loading="lazy">
                            <span style="position:absolute;top:-6px;right:-6px;font-size:0.75rem;">🔥</span>
                        </div>
                        <span style="font-size:0.72rem;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:88px;">${window.escapeHTML(s.name)}</span>
                    </a>`).join('');
                document.getElementById('trendingContainer').style.display = 'block';
            } catch(e) {}
        })();
    }

    // --- Collections / My List ---
    let myList = [];
    try { myList = JSON.parse(localStorage.getItem('hv_mylist') || '[]'); } catch(e) {}

    window.applyPlaylist = (tagsStr, cat) => {
        activeCategories = [];
        activeTags = [];
        document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('#tagFilters input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        if (cat) {
            activeCategories.push(cat);
            const cb = document.querySelector(`#categoryFilters input[value="${cat}"]`);
            if (cb) cb.checked = true;
        }
        
        if (tagsStr) {
            const tags = tagsStr.split(',');
            activeTags.push(...tags);
            tags.forEach(tag => {
                const cb = document.querySelector(`#tagFilters input[value="${tag}"]`);
                if (cb) cb.checked = true;
            });
        }
        
        showFavoritesOnly = false;
        myListMode = false;
        showSharedList = false;
        if (sortSelect) { sortSelect.value = 'rating'; currentSort = 'rating'; }
        
        document.getElementById('siteGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        applyFiltersAndSort();
    };

    window.toggleMyList = (siteId, siteName) => {
        const idx = myList.indexOf(siteId);
        if (idx === -1) { myList.push(siteId); showToast(`➕ Added "${siteName}" to My List`); }
        else { myList.splice(idx, 1); showToast(`✅ Removed from My List`); }
        try { localStorage.setItem('hv_mylist', JSON.stringify(myList)); } catch(e) {}
        document.querySelectorAll(`.mylist-btn[data-id="${siteId}"]`).forEach(btn => {
            btn.classList.toggle('mylist-active', myList.includes(siteId));
            btn.title = myList.includes(siteId) ? 'Remove from My List' : 'Add to My List';
        });
    };

    window.getMyListShareUrl = () => `${window.location.origin}/?list=${btoa(JSON.stringify(myList)).replace(/=/g,'')}`;

    // Load a shared list from URL param
    const sharedListParam = new URLSearchParams(window.location.search).get('list');
    if (sharedListParam) {
        try {
            const decoded = JSON.parse(atob(sharedListParam));
            if (Array.isArray(decoded)) {
                myList = decoded;
                localStorage.setItem('hv_mylist', JSON.stringify(myList));
                showToast('📋 Shared collection loaded!');
            }
        } catch(e) {}
    }

    // --- Push Notifications ---
    const btnSubscribePush = document.getElementById('btnSubscribePush');
    if (btnSubscribePush) {
        btnSubscribePush.addEventListener('click', async () => {
            if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                alert("Push notifications are not supported in your browser.");
                return;
            }
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const registration = await navigator.serviceWorker.ready;
                    const applicationServerKey = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB-5PNDEXcFS3-2cWZGxQGgA4"; 
                    const urlBase64ToUint8Array = (base64String) => {
                        const padding = '='.repeat((4 - base64String.length % 4) % 4);
                        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
                        const rawData = window.atob(base64);
                        return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
                    };
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
                    });
                    
                    fetch('/api/push-subscribe', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(subscription)
                    }).catch(console.error);

                    btnSubscribePush.innerHTML = '✅ Subscribed!';
                    btnSubscribePush.style.borderColor = 'var(--text-muted)';
                    btnSubscribePush.style.color = 'var(--text-muted)';
                    btnSubscribePush.disabled = true;
                } else {
                    alert("Permission denied. We cannot send you notifications.");
                }
            } catch (error) {
                console.error("Push subscription failed", error);
            }
        });
    }

    try {
        const uParams = new URLSearchParams(window.location.search);
        const sId = uParams.get('id');
        if (window.location.pathname === '/site' && sId) {
            let recent = JSON.parse(localStorage.getItem('hv_recent') || '[]');
            recent = recent.filter(id => id !== sId);
            recent.unshift(sId);
            if (recent.length > 5) recent.pop();
            localStorage.setItem('hv_recent', JSON.stringify(recent));
        }

        const recentContainer = document.getElementById('recentlyViewedContainer');
        const recentShelf = document.getElementById('recentlyViewedShelf');
        if (recentContainer && recentShelf) {
            const recent = JSON.parse(localStorage.getItem('hv_recent') || '[]');
            if (recent.length > 0) {
                recentContainer.style.display = 'block';
                Promise.all(recent.map(id => fetch(`/api/site?id=${id}`).then(r => r.ok ? r.json() : null)))
                .then(sites => {
                    const recentSites = sites.filter(Boolean);
                    if (recentSites.length > 0) {
                        recentShelf.innerHTML = recentSites.map(site => `
                            <a href="/site?id=${site.id}" style="display:flex; flex-direction:column; align-items:center; min-width: 80px; text-align:center; text-decoration:none; gap:6px; transition:transform 0.2s;">
                                <img src="https://icons.duckduckgo.com/ip3/${new URL(site.url).hostname}.ico" alt="" loading="lazy" decoding="async" style="width:48px; height:48px; border-radius:12px; background:var(--bg-surface); padding:4px; box-shadow:var(--shadow-glass);">
                                <span style="font-size:0.75rem; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:80px;">${escapeHTML(site.name)}</span>
                            </a>
                        `).join('');
                    } else {
                        recentContainer.style.display = 'none';
                    }
                }).catch(e => {
                    recentContainer.style.display = 'none';
                });
            }
        }
    } catch (e) { console.error("Recently viewed failed", e); }

    // --- Initialization ---
    if (siteGrid && sortSelect && categoryFiltersContainer && tagFiltersContainer) {
        initFilters();
    }

    // --- Click Tracking (Social Proof engine) ---
    // Delegate on document so it captures dynamically injected .btn-visit-tracked links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.btn-visit-tracked');
        if (link) {
            const id = link.dataset.id;
            if (id) {
                // Non-blocking, fire and forget
                fetch('/api/click', { method: 'POST', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } }).catch(() => {});
            }
        }
    });

    // --- For You Shelf (Endowed Progress / Personalisation) ---
    const forYouContainer = document.getElementById('forYouContainer');
    const forYouShelf = document.getElementById('forYouShelf');
    if (forYouContainer && forYouShelf && favorites.length >= 2) {
        (async () => {
            try {
                const res = await fetch('/api/recommend?likes=' + favorites.join(','));
                if (!res.ok) return;
                const { sites } = await res.json();
                if (!sites || sites.length === 0) return;
                forYouShelf.innerHTML = sites.map(s => `
                    <a href="/site?id=${s.id}" style="display:flex;flex-direction:column;align-items:center;min-width:90px;max-width:90px;text-align:center;text-decoration:none;gap:6px;">
                        <img src="https://icons.duckduckgo.com/ip3/${new URL(s.url).hostname}.ico" alt="${window.escapeHTML(s.name)} icon" style="width:52px;height:52px;border-radius:14px;background:var(--bg-surface);padding:4px;box-shadow:var(--shadow-glass);" loading="lazy">
                        <span style="font-size:0.72rem;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:88px;">${window.escapeHTML(s.name)}</span>
                    </a>`).join('');
                forYouContainer.style.display = 'block';
            } catch(e) {}
        })();
    }

    // --- Vault Progress Bar (Gamification) ---
    function updateVaultProgress() {
        const progressBar = document.getElementById('vaultProgressBar');
        const progressText = document.getElementById('vaultProgressText');
        if (!progressBar || !progressText) return;
        const count = favorites.length;
        const milestones = [1, 3, 5, 10, 25, 50];
        const nextMilestone = milestones.find(m => m > count) || milestones[milestones.length - 1];
        const prevMilestone = milestones[Math.max(0, milestones.indexOf(nextMilestone) - 1)] || 0;
        const pct = Math.min(100, Math.round(((count - prevMilestone) / (nextMilestone - prevMilestone)) * 100));
        progressBar.style.width = `${Math.max(5, pct)}%`;

        let badge = '';
        if (count >= 50) badge = '💎 Diamond Vault';
        else if (count >= 25) badge = '🥇 Gold Vault';
        else if (count >= 10) badge = '🥈 Silver Vault';
        else if (count >= 5) badge = '🌟 Veteran Explorer';
        else if (count >= 3) badge = '🔍 Explorer';
        else badge = '🆕 New Visitor';

        progressText.innerHTML = `${badge} &nbsp;·&nbsp; ${count} saved &nbsp;·&nbsp; Next: ${nextMilestone}`;
    }
    updateVaultProgress();

    // Pre-filter from category page (window.FILTER_CATEGORY) or URL ?q= param
    const urlParams = new URLSearchParams(window.location.search);
    const urlQ = urlParams.get('q');
    if (urlQ && searchInput) { searchInput.value = urlQ; searchQuery = urlQ.toLowerCase(); }
    if (window.FILTER_CATEGORY) {
        activeCategories = [window.FILTER_CATEGORY];
        document.querySelectorAll('.cat-cb').forEach(cb => {
            if (cb.value === window.FILTER_CATEGORY) cb.checked = true;
        });
    }

    try {
        if (siteGrid) {
            applyFiltersAndSort();
            syncMobileChips();
        }
        initAutocomplete();
        initThemeToggle();
    } catch (e) { console.error("Initialization failed", e); }

    // --- Functions ---

    function initFilters() {
        // Inject Favorites Toggle into Sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const favToggle = document.createElement('div');
            favToggle.className = 'fav-toggle-group';
            favToggle.innerHTML = `
                <label class="fav-toggle-label">
                    <span>❤️ My Favorites</span>
                    <label class="switch">
                        <input type="checkbox" id="favToggle" aria-label="Toggle favorites mode">
                        <span class="slider"></span>
                    </label>
                </label>
            `;
            sidebar.prepend(favToggle);
            
            document.getElementById('favToggle').addEventListener('change', (e) => {
                showFavoritesOnly = e.target.checked;
                applyFiltersAndSort();
            });
        }

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

        // Render Categories
        if (typeof ALL_CATEGORIES !== 'undefined') {
            ALL_CATEGORIES.forEach(cat => {
                const label = document.createElement('label');
                const displayLabel = t.categories && t.categories[cat] ? t.categories[cat] : cat;
                label.innerHTML = `<input type="checkbox" value="${cat}" class="cat-cb"> ${displayLabel}`;
                categoryFiltersContainer.appendChild(label);
            });
        }

        // Render Tags
        if (typeof ALL_TAGS !== 'undefined') {
            ALL_TAGS.forEach(tag => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" value="${tag}" class="tag-cb"> ${tag}`;
                tagFiltersContainer.appendChild(label);
            });
        }

        // Add Listeners
        document.querySelectorAll('.cat-cb').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if(e.target.checked) activeCategories.push(e.target.value);
                else activeCategories = activeCategories.filter(c => c !== e.target.value);
                syncMobileChips();
                applyFiltersAndSort();
            });
        });

        document.querySelectorAll('.tag-cb').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if(e.target.checked) activeTags.push(e.target.value);
                else activeTags = activeTags.filter(t => t !== e.target.value);
                applyFiltersAndSort();
            });
        });

        // Debounce helper
        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        const debouncedSearch = debounce((e) => {
            searchQuery = e.target.value.toLowerCase();
            applyFiltersAndSort();
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);

    const regionSelect = document.getElementById('regionSelect');
    const resetPagination = () => { currentPage = 1; };
    if (regionSelect) {
        regionSelect.addEventListener('change', () => {
            resetPagination();
            applyFiltersAndSort();
        });
    }


        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });

        // View Toggles
        gridViewBtn.addEventListener('click', () => {
            siteGrid.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', () => {
            siteGrid.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
        
        // Modal Logic
        const openModal = (e) => { e.preventDefault(); submitModal.classList.add('active'); };
        const closeModal = () => { submitModal.classList.remove('active'); };
        
        if (btnSubmitSite) btnSubmitSite.addEventListener('click', openModal);
        
        Array.from(closeBtns).forEach(btn => btn.addEventListener('click', closeModal));
        
        window.addEventListener('click', (e) => {
            if (e.target == submitModal) {
                closeModal();
            }
        });

        // --- Mobile Specific UI Injection ---
        const sidebarMain = document.querySelector('.sidebar');
        if (sidebarMain && window.innerWidth <= 900) {
            initMobileFilters(sidebarMain);
        }
    }

    function initMobileFilters(sidebar) {
        // Create Sidebar Overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        // Add Close Button to Sidebar
        const closeBtn = document.createElement('div');
        closeBtn.className = 'sidebar-close';
        closeBtn.innerHTML = '✕';
        sidebar.prepend(closeBtn);

        // Create Mobile Filter Bar
        const mobileFilterBar = document.createElement('div');
        mobileFilterBar.className = 'mobile-filter-bar';

        // 1. Category Chips
        const chipContainer = document.createElement('div');
        chipContainer.className = 'chip-container';
        
        // "All" Chip
        const allChip = document.createElement('div');
        allChip.className = 'filter-chip active';
        allChip.innerText = 'All';
        allChip.setAttribute('data-value', 'All');
        allChip.onclick = () => {
            activeCategories = [];
            document.querySelectorAll('.cat-cb').forEach(cb => cb.checked = false);
            syncMobileChips();
            applyFiltersAndSort();
        };
        chipContainer.appendChild(allChip);

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

        ALL_CATEGORIES.forEach(cat => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip';
            chip.setAttribute('data-value', cat);
            if (activeCategories.includes(cat)) chip.classList.add('active');
            chip.innerText = t.categories && t.categories[cat] ? t.categories[cat] : cat;
            chip.onclick = () => {
                const checkbox = Array.from(document.querySelectorAll('.cat-cb')).find(cb => cb.value === cat);
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            };
            chipContainer.appendChild(chip);
        });

        // 2. Control Row (Filters Toggle & Results)
        const ctrlRow = document.createElement('div');
        ctrlRow.className = 'mobile-ctrl-row';
        
        const filterToggle = document.createElement('button');
        filterToggle.className = 'btn-mobile-filter';
        filterToggle.innerHTML = '<span>⚙️</span> Sort & Tags';
        filterToggle.onclick = () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const mobileResults = document.createElement('div');
        mobileResults.id = 'mobileResultsCount';
        mobileResults.style.fontSize = '0.85rem';
        mobileResults.style.color = 'var(--text-muted)';

        ctrlRow.appendChild(filterToggle);
        ctrlRow.appendChild(mobileResults);

        mobileFilterBar.appendChild(chipContainer);
        mobileFilterBar.appendChild(ctrlRow);

        // Inject before the grid
        const listings = document.querySelector('.listings');
        if (listings) {
            listings.insertBefore(mobileFilterBar, siteGrid);
        }

        // Sidebar logic
        const closeSidebar = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.onclick = closeSidebar;
        overlay.onclick = closeSidebar;
    }

    function syncMobileChips() {
        const chips = document.querySelectorAll('.filter-chip');
        if (chips.length === 0) return;

        chips.forEach(chip => {
            const val = chip.getAttribute('data-value');
            if (val === 'All') {
                if (activeCategories.length === 0) chip.classList.add('active');
                else chip.classList.remove('active');
            } else {
                if (activeCategories.includes(val)) chip.classList.add('active');
                else chip.classList.remove('active');
            }
        });
    }

    async function applyFiltersAndSort(append = false) {
        if (isLoading) return;
        isLoading = true;

        const loadingBar = document.getElementById('loadingBar');
        if (loadingBar) loadingBar.classList.add('loading');

        if (!append) {
            currentPage = 1;
            currentSites = [];
            // Regenerate seed so each new filter/sort combo gets a fresh shuffle
            randomSeed = Math.floor(Math.random() * 2000000000) + 1;
            
            // Render skeleton loading cards
            siteGrid.innerHTML = Array(12).fill(`
                <div class="skeleton-card">
                    <div class="skeleton-header">
                        <div class="skeleton-icon skeleton-line"></div>
                        <div style="flex:1">
                            <div class="skeleton-title skeleton-line"></div>
                            <div class="skeleton-cat skeleton-line"></div>
                        </div>
                    </div>
                    <div class="skeleton-desc1 skeleton-line"></div>
                    <div class="skeleton-desc2 skeleton-line"></div>
                    <div class="skeleton-tags skeleton-line"></div>
                    <div class="skeleton-footer skeleton-line"></div>
                </div>
            `).join('');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }

        const params = new URLSearchParams();
        params.set('page', currentPage);
        params.set('limit', ITEMS_PER_PAGE);
        
        if (searchQuery) params.set('q', searchQuery);
        if (activeCategories.length > 0) params.set('category', activeCategories[0]);
        if (activeTags.length > 0) params.set('tags', activeTags.join(','));
        params.set('sort', currentSort);

        if (currentSort === 'random') {
            params.set('seed', randomSeed);
        }

        try {
            const res = await fetch('/api/sites?' + params.toString());
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            const data = await res.json();
            
            if (data && Array.isArray(data.sites)) {
                let fetchedSites = data.sites;
                // Client-side favorites filter if active
                if (showFavoritesOnly) {
                    fetchedSites = fetchedSites.filter(s => favorites.includes(s.id));
                }

                if (!append) {
                    currentSites = fetchedSites;
                } else {
                    currentSites = [...currentSites, ...fetchedSites];
                }

                // Use raw API count (before client-side favorites filter) so hasMoreSites
                // reflects DB pagination, not the locally-filtered subset
                hasMoreSites = (data.sites.length === ITEMS_PER_PAGE);
                renderSites(fetchedSites, append, data.total);
            } else {
                console.error('[HV] Unexpected API shape:', data);
                siteGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Unable to load sites (bad response shape). <a href="javascript:location.reload()" style="color:var(--primary)">Retry</a></div>`;
            }
        } catch (e) {
            console.error('API Fetch Failed', e);
            siteGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--primary);">Failed to load sites: ${e.message}. <a href="javascript:location.reload()" style="color:var(--primary)">Retry</a></div>`;
        } finally {
            isLoading = false;
            if (loadingBar) loadingBar.classList.remove('loading');
        }
    }

    // In-feed ad HTML (uses existing leaderboard ad key for in-feed placement)
    const IN_FEED_AD_HTML = `
        <div class="in-feed-ad" aria-hidden="true">
            <script>atOptions = {'key':'40d623b6e8e7efa7651f8c6fbeb29bef','format':'iframe','height':90,'width':728,'params':{}}<\/script>
            </div>`;

    function renderSites(batch, append = false, apiTotal = null) {
        if (!append) siteGrid.innerHTML = '';

        const escapeHTML = (str) => {
            if (!str) return '';
            return String(str).replace(/[&<>'"]/g, tag => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
            }[tag] || tag));
        };

        const total = apiTotal !== null ? apiTotal : currentSites.length;
        // pageItems is always the fresh batch passed in — no slice drift
        const pageItems = batch || [];

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        const startIdx = total === 0 ? 0 : 1;
        const countText = `${t.showing} ${startIdx} - ${currentSites.length} ${t.of} ${total} ${t.sites}`;
        if (resultsCount) resultsCount.innerText = countText;

        const mobileCount = document.getElementById('mobileResultsCount');
        if (mobileCount) mobileCount.innerText = countText;

        if (!append && total === 0) {
            const emptyMsg = showFavoritesOnly 
                ? (currentLang === 'es' ? "¡Aún no has guardado favoritos! Haz clic en el icono ❤️ para guardar." : 
                   currentLang === 'jp' ? "お気に入りはまだありません。❤️アイコンをクリックして保存してください。" :
                   "You haven't saved any favorites yet! Click the ❤️ icon on any site to save it.")
                : (currentLang === 'es' ? "No se encontraron sitios con estos filtros." :
                   currentLang === 'jp' ? "フィルターに一致するサイトが見つかりませんでした。" :
                   "No sites found matching your filters.");
            siteGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px; line-height: 1.6;">${emptyMsg}</p>`;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }
        // Track card index for this batch (for in-feed ad injection every 8 cards)
        const existingCards = siteGrid.querySelectorAll('.card').length;
        
        // --- NATIVE SPONSORED CARD INJECTION ---
        if (existingCards === 0 && !showFavoritesOnly) {
            const spCard = document.createElement('div');
            spCard.className = 'card card-entering promoted';
            spCard.style.border = '2px solid #007EE5';
            spCard.style.boxShadow = '0 0 15px rgba(0, 126, 229, 0.3)';
            
            const spUrl = 'https://partner.pcloud.com/r/156786';
            
            spCard.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`
                <div class="badge-container" style="position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 8px; z-index: 10;">
                    <div class="trending-badge" style="background:#007EE5;color:white;">⭐ Sponsored</div>
                </div>
                <div class="card-banner" style="background:#111; display:flex; justify-content:center; align-items:center;">
                    <span style="font-size:4rem;">☁️</span>
                </div>
                <div class="card-header">
                    <div style="position:relative; display:inline-block; line-height: 0;">
                        <img src="https://icons.duckduckgo.com/ip3/pcloud.com.ico" alt="pCloud icon" class="card-icon" loading="lazy">
                        <div class="status-dot status-up"></div>
                    </div>
                    <div>
                        <a href="${spUrl}" target="_blank" rel="nofollow noopener noreferrer" class="card-title-link" style="text-decoration:none; color:inherit;">
                            <div class="card-title">pCloud - 10TB Lifetime Storage</div>
                        </a>
                        <div class="card-category">Cloud Storage</div>
                    </div>
                </div>
                <div class="card-desc">Running out of space for your collection? Get up to 10TB of Lifetime Cloud Storage with pCloud. One-time payment, yours forever.</div>
                <div class="card-tags"><span class="tag">cloud</span><span class="tag">storage</span><span class="tag">lifetime</span><span class="tag">premium</span></div>
                <div class="last-added-label">Added: Just now</div>
                <div class="card-footer">
                    <div class="rating" title="Rating: 5/5">★★★★★</div>
                    <div class="card-actions">
                        <a href="${spUrl}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit" style="background:#007EE5;color:white;">Get Offer &rarr;</a>
                    </div>
                </div>
            `) : "";
            siteGrid.appendChild(spCard);
        }

        let batchIndex = 0;

        pageItems.forEach((site) => {
            const isRecentlyAdded = (new Date() - new Date(site.addedAt)) < (7 * 24 * 60 * 60 * 1000); // 7 days
            const isNew = (new Date() - new Date(site.addedAt)) < (30 * 24 * 60 * 60 * 1000); // 30 days
            const isTrending = site.isTrending || site.rating >= 4.8 || (isNew && site.rating >= 4.5);

            let domain = '';
            let faviconUrl = 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\'><rect width=\'48\' height=\'48\' fill=\'%233f3f46\'/></svg>';
            try {
                const urlObj = new URL(site.url);
                domain = urlObj.hostname;
                faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
            } catch(urlErr) {
                console.warn('[HV] Bad URL for site:', site.id, site.url);
            }

            const tagsHtml = (site.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');
            
            const fullStars = Math.floor(site.rating);
            const halfStar = (site.rating % 1) >= 0.5;
            let starsHtml = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - fullStars - (halfStar ? 1 : 0));

            const isFav = favorites.includes(site.id);

            // Localization lookup
            const localName = escapeHTML(site[`name_${currentLang}`] || site.name);
            const localDesc = escapeHTML(site[`description_${currentLang}`] || site.description);
            const localCat  = escapeHTML((t.categories && t.categories[site.category]) ? t.categories[site.category] : site.category);

            // Format date
            const addedDate = new Date(site.addedAt).toLocaleDateString(currentLang, { year: 'numeric', month: 'short', day: 'numeric' });
            const lastAddedLabel = `${t.added}: ${addedDate}`;

            const card = document.createElement('div');
            card.className = `card card-entering ${site.promoted ? 'promoted' : ''}`;
            // No animation delay — prevents cards sitting at opacity:0
            // Tracking & Linkbacks
            const trackedUrl = (() => {
                try {
                    const u = new URL(site.url);
                    u.searchParams.set('utm_source', 'hentaivault.me');
                    u.searchParams.set('utm_medium', 'directory');
                    u.searchParams.set('ref', 'hentaivault.me');
                    return u.toString();
                } catch (e) { return site.url; }
            })();

            card.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`
                <div class="badge-container" style="position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 8px; z-index: 10;">
                    ${isRecentlyAdded ? '<div class="new-badge">New</div>' : ''}
                    ${isTrending ? '<div class="trending-badge">🔥 Trending</div>' : ''}
                </div>
                <div class="card-banner">
                    <img
                        src="https://image.thum.io/get/width/400/crop/220/noanimate/${site.url}"
                        alt="${localName} screenshot"
                        loading="lazy"
                        onerror="this.parentElement.classList.add('card-banner--fallback'); this.remove();"
                    >
                </div>
                <div class="card-header">
                    <div style="position:relative; display:inline-block; line-height: 0;">
                        <img src="${faviconUrl}" alt="${localName} icon" class="card-icon" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\'><rect width=\'48\' height=\'48\' fill=\'%233f3f46\'/></svg>'">
                        <div class="status-dot" data-url="${site.url}"></div>
                    </div>
                    <div>
                        <a href="/site?id=${site.id}" class="card-title-link" style="text-decoration:none; color:inherit;">
                            <div class="card-title">${localName}</div>
                        </a>
                        <div class="card-category">${localCat}</div>
                    </div>
                </div>
                <div class="card-desc">${localDesc}</div>
                <div class="card-tags">${tagsHtml}</div>
                <div class="last-added-label">${lastAddedLabel}</div>
                <div class="card-footer">
                    <div class="rating" title="Rating: ${site.rating}/5">${starsHtml}</div>
                    <div class="card-actions">
                        <button class="btn-share-icon" data-id="${site.id}" title="Share ${localName}">📤</button>
                        <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${site.id}" title="${isFav ? 'Remove from Favorites' : 'Add to Favorites'}">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                        <button class="mylist-btn ${myList.includes(site.id) ? 'mylist-active' : ''}" data-id="${site.id}" title="${myList.includes(site.id) ? 'Remove from My List' : 'Add to My List'}">📋</button>
                        <a href="${trackedUrl}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit btn-visit-tracked" data-id="${site.id}" data-outbound="${escapeHTML(site.url)}">${t.visit} &rarr;</a>
                    </div>
                </div>
            `) : "";
            
            // Add Favorite Listener
            const shareBtn = card.querySelector('.btn-share-icon');
            if (shareBtn) {
                shareBtn.onclick = (e) => {
                    e.preventDefault();
                    window.openShareModal(`https://hentaivault.me/site?id=${site.id}`, `${localName} | HentaiVault`, `Check out ${localName} - The best ${localCat} site! Found on HentaiVault.`);
                };
            }
            const favBtn = card.querySelector('.btn-favorite');
            favBtn.onclick = (e) => {
                e.preventDefault();
                toggleFavorite(site.id, favBtn);
            };
            const mlBtn = card.querySelector('.mylist-btn');
            if (mlBtn) mlBtn.onclick = (e) => { e.preventDefault(); window.toggleMyList(site.id, localName); };

            // Make the entire card clickable to go to details page
            card.addEventListener('click', (e) => {
                // Ignore clicks on existing links or buttons
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }
                window.location.href = `/site?id=${site.id}`;
            });

            const dot = card.querySelector('.status-dot');
            if (dot) statusObserver.observe(dot);

            siteGrid.appendChild(card);

            // Inject in-feed ad every 6 cards (counting from start of full grid)
            const globalIndex = existingCards + batchIndex + 1;
            if (globalIndex % 6 === 0) {
                const adNumber = Math.floor(globalIndex / 6);
                
                const adDiv = document.createElement('div');
                adDiv.className = 'card in-feed-ad-card'; // Use card class to blend in
                adDiv.setAttribute('aria-hidden', 'true');
                adDiv.style.display = 'flex';
                adDiv.style.flexDirection = 'column';
                adDiv.style.justifyContent = 'center';
                adDiv.style.alignItems = 'center';
                adDiv.style.padding = '20px 0';
                adDiv.style.animationDelay = `${(batchIndex % 24) * 0.05}s`;

                if (adNumber % 3 === 1 && amzAdCards.length > 0) {
                    // Render Amazon Ad
                    const ad = amzAdCards[amzAdIndex % amzAdCards.length];
                    amzAdIndex++;
                    const adUrl = ad.url ? ad.url : `https://www.amazon.com/dp/${ad.asin || ad.id}?tag=photoid03-20`;
                    
                    adDiv.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`
                        <div style="font-size:0.65rem;color:rgba(161,161,170,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Advertisement</div>
                        <a href="${adUrl}" target="_blank" rel="nofollow noopener noreferrer" style="text-decoration:none; display:flex; flex-direction:column; background:linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius:12px; padding:20px; color:white; text-align:center; height:250px; width:300px; box-sizing:border-box; transition: transform 0.2s; box-shadow:0 4px 15px rgba(255,153,0,0.2); border: 1px solid rgba(255,153,0,0.35);"
                           onmouseover="this.style.borderColor='rgba(255,153,0,0.7)';this.style.transform='translateY(-2px)'"
                           onmouseout="this.style.borderColor='rgba(255,153,0,0.35)';this.style.transform='none'">
                            <div style="font-size:3rem; margin-bottom:10px;">${ad.emoji || '🛒'}</div>
                            <div style="display:flex; align-items:center; gap:8px; margin: 0 auto 4px;">
                              <span style="background:#ff9900; color:#000; font-size:0.65rem; font-weight:800; padding:2px 7px; border-radius:4px;">AMAZON</span>
                            </div>
                            <h3 style="margin:0 0 10px 0; font-size:1.1rem; color:#ff9900;">${ad.title || 'Amazon Deal'}</h3>
                            <p style="font-size:0.85rem; color:#a0aec0; margin:0 0 15px 0; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${ad.desc || 'Check out this deal on Amazon.'}</p>
                            <div style="margin-top:auto; background:#ff9900; color:#000; padding:10px; border-radius:50px; font-weight:bold; font-size:0.9rem;">${ad.cta || 'View on Amazon'} &rarr;</div>
                        </a>
                    `) : "";
                    
                    // Attach click tracking
                    adDiv.addEventListener('click', () => {
                        fetch(`/api/amazon-ads/click?id=${encodeURIComponent(ad.asin || ad.id)}`, { method: 'POST' }).catch(()=>{});
                    });
                    
                } else if (adNumber % 3 === 2) {
                    // Render Get Featured Ad
                    adDiv.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`
                        <div style="font-size:0.65rem;color:rgba(161,161,170,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Advertisement</div>
                        <a href="/contact" style="text-decoration:none; display:flex; flex-direction:column; background:linear-gradient(135deg, rgba(0,229,255,0.05), rgba(255,42,95,0.05)); border-radius:12px; padding:20px; color:white; text-align:center; height:250px; width:300px; box-sizing:border-box; transition: transform 0.2s; box-shadow:0 4px 15px rgba(255,42,95,0.1); border: 1px solid var(--border);"
                           onmouseover="this.style.borderColor='var(--primary)';this.style.transform='translateY(-2px)'"
                           onmouseout="this.style.borderColor='var(--border)';this.style.transform='none'">
                            <div style="font-size:3rem; margin-bottom:10px;">⭐</div>
                            <h3 style="margin:0 0 10px 0; font-size:1.2rem; color:var(--text-main);">Get Featured</h3>
                            <p style="font-size:0.9rem; color:var(--text-muted); margin:0 0 15px 0;">Reach 10,000+ monthly visitors. Boost your site's visibility at the top of the directory.</p>
                            <div style="margin-top:auto; background:linear-gradient(90deg, var(--primary), var(--accent)); color:#000; padding:10px; border-radius:50px; font-weight:bold; font-size:0.9rem;">Apply Now &rarr;</div>
                        </a>
                    `) : "";
                } else {
                    // Render pCloud Ad (Rotate between available affiliate links)
                    const pcloudAds = [
                        {
                            url: 'https://partner.pcloud.com/r/156786',
                            title: 'Get 10TB Cloud Storage',
                            desc: 'Running out of space for your collection? One-time payment, yours forever.',
                            cta: 'Click Here &rarr;',
                            icon: '☁️'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156784',
                            title: 'pCloud Pass Manager',
                            desc: 'The most secure password manager. Save and access your passwords anywhere.',
                            cta: 'Secure Now &rarr;',
                            icon: '🔐'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156776',
                            title: 'Lifetime Cloud Storage',
                            desc: 'Pay once and keep your files secure forever with pCloud Lifetime.',
                            cta: 'Get Deal &rarr;',
                            icon: '♾️'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156778',
                            title: 'Secure Cloud Storage',
                            desc: 'Access your files on any device. Highly secure, easy to use cloud storage.',
                            cta: 'View Plans &rarr;',
                            icon: '🛡️'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156782',
                            title: 'pCloud Family Plan',
                            desc: 'Share up to 10TB of Lifetime storage with up to 5 family members.',
                            cta: 'View Family Plan &rarr;',
                            icon: '👨‍👩‍👧‍👦'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156781',
                            title: 'pCloud for Business',
                            desc: 'Secure cloud storage for your team. Easy collaboration and access control.',
                            cta: 'Start Business Trial &rarr;',
                            icon: '💼'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156780',
                            title: 'pCloud Crypto',
                            desc: 'Client-side encryption for your most sensitive files. Zero-knowledge privacy.',
                            cta: 'Encrypt Files &rarr;',
                            icon: '🔒'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156783',
                            title: 'pCloud Europe',
                            desc: 'Store your files securely in our European data center (Luxembourg).',
                            cta: 'EU Data Region &rarr;',
                            icon: '🇪🇺'
                        },
                        {
                            url: 'https://partner.pcloud.com/r/156785',
                            title: 'pCloud Drive for Mac',
                            desc: 'Access all your files directly from your Mac without taking up local space.',
                            cta: 'Download Now &rarr;',
                            icon: '🍏'
                        }
                    ];
                    
                    const pAd = pcloudAds[Math.floor(globalIndex / 18) % pcloudAds.length];
                    
                    adDiv.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(`
                        <div style="font-size:0.65rem;color:rgba(161,161,170,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Advertisement</div>
                        <a href="${pAd.url}" target="_blank" rel="nofollow noopener noreferrer" style="text-decoration:none; display:flex; flex-direction:column; background:linear-gradient(135deg, #007EE5, #0056b3); border-radius:12px; padding:20px; color:white; text-align:center; height:250px; width:300px; box-sizing:border-box; transition: transform 0.2s; box-shadow:0 4px 15px rgba(0,126,229,0.3);"
                           onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                            <div style="font-size:3rem; margin-bottom:10px;">${pAd.icon}</div>
                            <h3 style="margin:0 0 10px 0; font-size:1.2rem;">${pAd.title}</h3>
                            <p style="font-size:0.9rem; opacity:0.9; margin:0 0 15px 0;">${pAd.desc}</p>
                            <div style="margin-top:auto; background:white; color:#007EE5; padding:10px; border-radius:50px; font-weight:bold; font-size:0.9rem;">${pAd.cta}</div>
                        </a>
                    `) : "";
                }
                
                siteGrid.appendChild(adDiv);
            }
            batchIndex++;
        });

        if (loadMoreBtn) {
            if (hasMoreSites) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    window.toggleFavorite = (id, event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
            showToast("Removed from Favorites");
        } else {
            favorites.push(id);
            showToast("Added to Favorites ❤️");
        }
        localStorage.setItem('hv_favorites', JSON.stringify(favorites));
        triggerCloudSync();
    };

    function toggleFavorite(id, btn) {
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
            btn.classList.remove('active');
            btn.innerHTML = '🤍';
        } else {
            favorites.push(id);
            btn.classList.add('active');
            btn.innerHTML = '❤️';
        }
        localStorage.setItem('hv_favorites', JSON.stringify(favorites));
        triggerCloudSync();
        
        // If we are in "Favorites Only" mode, re-filter immediately
        if (showFavoritesOnly) {
            applyFiltersAndSort();
        }
    }

    // Infinite Scroll — loadMoreBtn is an invisible sentinel element at the bottom of the grid
    // The IntersectionObserver fires when it enters the viewport (+ 200px buffer)
    // We use a debounce guard so rapid scroll events don't queue multiple fetches
    if (loadMoreBtn) {
        let scrollDebounce = null;
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) return;
            if (isLoading) return;
            if (loadMoreBtn.style.display === 'none') return;

            // Debounce: ignore repeated triggers within 200ms
            clearTimeout(scrollDebounce);
            scrollDebounce = setTimeout(() => {
                if (!isLoading) {
                    currentPage++;
                    applyFiltersAndSort(true);
                }
            }, 150);
        }, { rootMargin: '300px' });

        observer.observe(loadMoreBtn);

        // Visible fallback button (CSS keeps it hidden, but it works if JS observer fails)
        loadMoreBtn.addEventListener('click', () => {
            if (!isLoading) {
                currentPage++;
                applyFiltersAndSort(true);
            }
        });
    }

    // ── Form Submission → /api/submit (Cloudflare Pages Function) ────────────
    const submitForm   = document.getElementById('submitForm');
    const submitBtn    = document.getElementById('submitBtn');
    const submitStatus = document.getElementById('submitStatus');

    if (submitForm && submitBtn && submitStatus) {
    submitForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name        = submitForm.site_name.value.trim();
        const url         = submitForm.url.value.trim();
        const category    = submitForm.category.value;
        const description = submitForm.description.value.trim();
        const turnstileToken = submitForm.querySelector('[name="cf-turnstile-response"]')?.value || '';

        // Loading state
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Submitting…';
        submitStatus.style.display = 'none';

        try {
            const res = await fetch('/api/submit', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ name, url, category, description, turnstileToken }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                showStatus('success', `✅ ${data.message}`);
                submitForm.reset();
                // Auto-close modal after 3 seconds
                setTimeout(() => {
                    submitModal.classList.remove('active');
                    submitStatus.style.display = 'none';
                }, 3000);
            } else {
                showStatus('error', `❌ ${data.error || 'Something went wrong.'}`);
            }
        } catch (err) {
            showStatus('error', '❌ Network error. Please check your connection.');
        } finally {
            submitBtn.disabled    = false;
            submitBtn.textContent = 'Submit to Vault';
        }
    });
    }

    function showStatus(type, message) {
        submitStatus.textContent     = message;
        submitStatus.style.display   = 'block';
        submitStatus.style.color     = type === 'success' ? '#22c55e' : '#ff2a5f';
        submitStatus.style.padding   = '12px';
        submitStatus.style.borderRadius = '8px';
        submitStatus.style.background = type === 'success'
            ? 'rgba(34,197,94,0.1)' : 'rgba(255,42,95,0.1)';
        submitStatus.style.marginBottom = '12px';
        submitStatus.style.fontSize  = '0.9rem';
    }

    // === PROFESSIONAL FEATURES ===
    function initTheme() {
        const savedTheme = localStorage.getItem("hv_theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }
    function initThemeToggle() {
        const toggle = document.getElementById("themeToggle");
        if (!toggle) return;
        toggle.onclick = () => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("hv_theme", next);
        };
    }
    function initAutocomplete() {
        const searchInput = document.getElementById("searchInput");
        const autocompleteBox = document.getElementById("searchAutocomplete");
        if (!searchInput || !autocompleteBox) return;
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const val = e.target.value.toLowerCase().trim();
            if (!val) {
                autocompleteBox.classList.remove("active");
                return;
            }
            debounceTimer = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/sites?q=${encodeURIComponent(val)}&limit=5`);
                    const data = await res.json();
                    const matches = data.sites || [];
                    
                    if (matches.length === 0) {
                        autocompleteBox.classList.remove("active");
                        return;
                    }
                    
                    let html = '';
                    
                    html += matches.slice(0,4).map(s => `
                        <div class="autocomplete-item" onclick="window.location.href='/site?id=${s.id}'">
                            <img src="https://icons.duckduckgo.com/ip3/${new URL(s.url).hostname}.ico" alt="">
                            <div class="autocomplete-info">
                                <div class="autocomplete-name">${escapeHTML(s.name)}</div>
                                <div class="autocomplete-cat">${s.category}</div>
                            </div>
                        </div>
                    `).join("");
                    
                    autocompleteBox.innerHTML = html;
                    autocompleteBox.classList.add("active");
                } catch (err) {
                    autocompleteBox.classList.remove("active");
                }
            }, 300);
        });
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !autocompleteBox.contains(e.target)) {
                autocompleteBox.classList.remove("active");
            }
        });
    }

    // Global Event Delegation for Outbound Clicks
    document.body.addEventListener('click', (e) => {
        const visitBtn = e.target.closest('.btn-visit');
        if (visitBtn && visitBtn.hasAttribute('data-outbound')) {
            const destUrl = visitBtn.getAttribute('data-outbound');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'outbound_click', {
                    'event_category': 'outbound',
                    'event_label': destUrl,
                    'transport_type': 'beacon'
                });
            }
        }
    });

    // Initial grid load
    applyFiltersAndSort();
});
// ── Live Site Count ─────────────────────────────────────────────────────────
(function updateSiteCount() {
    const targets = document.querySelectorAll('[data-site-count]');
    
    function applyCount(n) {
        const label = n.toLocaleString() + '+';
        
        // Update direct DOM nodes
        if (targets.length) {
            targets.forEach(el => { el.textContent = label; });
        }
        
        // Update i18n translation strings dynamically for search placeholders
        if (typeof TRANSLATIONS !== 'undefined') {
            Object.keys(TRANSLATIONS).forEach(lang => {
                if (TRANSLATIONS[lang] && TRANSLATIONS[lang].search_placeholder) {
                    // Replace existing numbers (like 1,004+ or 500+) with the new dynamic label
                    TRANSLATIONS[lang].search_placeholder = TRANSLATIONS[lang].search_placeholder.replace(/(?:\d{1,3}(?:,\d{3})+|\d+)\+?/, label);
                }
            });
            // Re-trigger the UI translation update if it exists
            if (typeof updateUIText === 'function') {
                updateUIText();
            }
        }
    }

    fetch('/api/site-count')
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data && data.count) applyCount(data.count); })
        .catch(() => {});
})();

// ── Global Helpers ────────────────────────────────────────────────────────────
window.showToast = function(msg, duration = 3000) {
    let t = document.getElementById('hv-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'hv-toast';
        t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:#1e1e2e;color:#fff;padding:12px 22px;border-radius:10px;font-size:0.95rem;font-weight:600;z-index:99999;opacity:0;transition:all 0.3s ease;box-shadow:0 4px 20px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);pointer-events:none;white-space:nowrap;';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, duration);
};

window.subscribeDigest = async function(e) {
    e.preventDefault();
    const emailEl = document.getElementById('digestEmail');
    const statusEl = document.getElementById('digestStatus');
    if (!emailEl || !statusEl) return;
    statusEl.style.display = 'block';
    statusEl.style.color = 'var(--text-muted)';
    statusEl.textContent = 'Subscribing...';
    try {
        const res = await fetch('/api/subscribe-digest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailEl.value.trim() })
        });
        if (res.ok) {
            statusEl.style.color = '#22c55e';
            statusEl.textContent = '✅ Subscribed! Look out for your weekly digest.';
            emailEl.value = '';
        } else { throw new Error(); }
    } catch {
        statusEl.style.color = '#f59e0b';
        statusEl.textContent = '📧 Send an email with subject "Subscribe" to digest@hentaivault.me';
    }
};
