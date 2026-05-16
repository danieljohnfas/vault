// app.js

document.addEventListener('DOMContentLoaded', () => {
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

    const ageGate = document.getElementById('ageGate');
    const btnEnter = document.getElementById('btnEnter');
    const btnSearchMobile = document.getElementById('btnSearchMobile');
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

    try {
        // Assign a random order to each site on page load for consistent shuffling
        if (typeof sitesData !== 'undefined' && Array.isArray(sitesData)) {
            sitesData.forEach(site => { site.randomOrder = Math.random(); });
            currentSites = [...sitesData];
        } else {
            console.error("sitesData is not defined or not an array");
        }
    } catch (e) { console.error("State init failed", e); }

    // --- Favorites Logic ---
    let favorites = [];
    try {
        favorites = JSON.parse(localStorage.getItem('hv_favorites') || '[]');
    } catch (e) { console.error("Favorites parse failed", e); }
    let showFavoritesOnly = false;

    // --- Age Gate ---
    try {
        if (localStorage.getItem('hv_age_verified') === 'true') {
            if (ageGate) ageGate.classList.add('hidden');
        }
        if (btnEnter) {
            btnEnter.addEventListener('click', () => {
                try {
                    localStorage.setItem('hv_age_verified', 'true');
                } catch (e) {}
                if (ageGate) ageGate.classList.add('hidden');
            });
        }
    } catch (e) { console.error("Age gate init failed", e); }

    // --- Mobile Search Toggle ---
    btnSearchMobile.addEventListener('click', () => {
        searchBar.classList.toggle('mobile-open');
        if (searchBar.classList.contains('mobile-open')) {
            searchInput.focus();
        }
    });

    // --- Surprise Me Button ---
    const btnSurpriseMe = document.getElementById('btnSurpriseMe');
    if (btnSurpriseMe) {
        btnSurpriseMe.addEventListener('click', () => {
            const randomSite = sitesData[Math.floor(Math.random() * sitesData.length)];
            // Visual feedback
            const originalText = btnSurpriseMe.innerHTML;
            btnSurpriseMe.innerHTML = '<span style="font-size: 1.2rem;">✨</span> Opening...';
            setTimeout(() => { btnSurpriseMe.innerHTML = originalText; }, 1000);
            
            // Open random site
            window.open(randomSite.url, '_blank', 'noopener');
        });
    }

    // --- Initialization ---
    initFilters();

    // Pre-filter from category page (window.FILTER_CATEGORY) or URL ?q= param
    const urlParams = new URLSearchParams(window.location.search);
    const urlQ = urlParams.get('q');
    if (urlQ) { searchInput.value = urlQ; searchQuery = urlQ.toLowerCase(); }
    if (window.FILTER_CATEGORY) {
        activeCategories = [window.FILTER_CATEGORY];
        document.querySelectorAll('.cat-cb').forEach(cb => {
            if (cb.value === window.FILTER_CATEGORY) cb.checked = true;
        });
    }

    try {
        applyFiltersAndSort();
        syncMobileChips();
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
                        <input type="checkbox" id="favToggle">
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

        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            applyFiltersAndSort();
        });

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
            if (chip.innerText === 'All') {
                if (activeCategories.length === 0) chip.classList.add('active');
                else chip.classList.remove('active');
            } else {
                if (activeCategories.includes(chip.innerText)) chip.classList.add('active');
                else chip.classList.remove('active');
            }
        });
    }

    function applyFiltersAndSort() {
        // Filter
        currentSites = sitesData.filter(site => {
            // Favorites filter
            if (showFavoritesOnly && !favorites.includes(site.id)) return false;

            // Search filter
            const matchesSearch = searchQuery === "" || 
                                  site.name.toLowerCase().includes(searchQuery) || 
                                  site.description.toLowerCase().includes(searchQuery) ||
                                  site.category.toLowerCase().includes(searchQuery) ||
                                  site.tags.some(t => t.toLowerCase().includes(searchQuery));
            
            // Category filter (Match Any - OR logic for categories makes sense for UX)
            const matchesCategory = activeCategories.length === 0 || activeCategories.includes(site.category);
            
            // Tags filter (Match ALL - AND logic for power users)
            const matchesTags = activeTags.length === 0 || activeTags.every(t => site.tags.includes(t));

            return matchesSearch && matchesCategory && matchesTags;
        });

        // Sort
        currentSites.sort((a, b) => {
            // Priority 0: Promoted sites always first
            if (a.promoted && !b.promoted) return -1;
            if (!a.promoted && b.promoted) return 1;

            if (currentSort === 'random') {
                return a.randomOrder - b.randomOrder;
            } else if (currentSort === 'popular') {
                const scoreA = a.rating * 2 + (new Date(a.addedAt) / 1e11);
                const scoreB = b.rating * 2 + (new Date(b.addedAt) / 1e11);
                return scoreB - scoreA;
            } else if (currentSort === 'rating') {
                return b.rating - a.rating;
            } else if (currentSort === 'alpha') {
                return a.name.localeCompare(b.name);
            } else if (currentSort === 'newest') {
                return new Date(b.addedAt) - new Date(a.addedAt);
            }
            return 0;
        });

        currentPage = 1;
        renderSites(false);
    }

    function renderSites(append = false) {
        if (!append) siteGrid.innerHTML = '';

        const total = currentSites.length;
        const visible = append 
            ? currentSites.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            : currentSites.slice(0, currentPage * ITEMS_PER_PAGE);

        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        const startIdx = total === 0 ? 0 : 1;
        const countText = `${t.showing} ${startIdx} - ${visible.length} ${t.of} ${total} ${t.sites}`;
        resultsCount.innerText = countText;

        const mobileCount = document.getElementById('mobileResultsCount');
        if (mobileCount) mobileCount.innerText = countText;

        if (total === 0) {
            const emptyMsg = showFavoritesOnly 
                ? (currentLang === 'es' ? "¡Aún no has guardado favoritos! Haz clic en el icono ❤️ para guardar." : 
                   currentLang === 'jp' ? "お気に入りはまだありません。❤️アイコンをクリックして保存してください。" :
                   "You haven't saved any favorites yet! Click the ❤️ icon on any site to save it.")
                : (currentLang === 'es' ? "No se encontraron sitios con estos filtros." :
                   currentLang === 'jp' ? "フィルターに一致するサイトが見つかりませんでした。" :
                   "No sites found matching your filters.");
            siteGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px; line-height: 1.6;">${emptyMsg}</p>`;
            loadMoreBtn.style.display = 'none';
            return;
        }

        visible.forEach((site) => {
            const isRecentlyAdded = (new Date() - new Date(site.addedAt)) < (7 * 24 * 60 * 60 * 1000); // 7 days
            const isNew = (new Date() - new Date(site.addedAt)) < (30 * 24 * 60 * 60 * 1000); // 30 days
            const isTrending = site.rating >= 4.8 || (isNew && site.rating >= 4.5);
            
            const urlObj = new URL(site.url);
            const domain = urlObj.hostname;
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

            const tagsHtml = site.tags.map(t => `<span class="tag">${t}</span>`).join('');
            
            const fullStars = Math.floor(site.rating);
            const halfStar = site.rating % 1 !== 0;
            let starsHtml = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(site.rating));

            const isFav = favorites.includes(site.id);

            // Localization lookup
            const localName = site[`name_${currentLang}`] || site.name;
            const localDesc = site[`description_${currentLang}`] || site.description;
            const localCat  = (t.categories && t.categories[site.category]) ? t.categories[site.category] : site.category;

            // Format date
            const addedDate = new Date(site.addedAt).toLocaleDateString(currentLang, { year: 'numeric', month: 'short', day: 'numeric' });
            const lastAddedLabel = `${t.added}: ${addedDate}`;

            const card = document.createElement('div');
            card.className = `card ${site.promoted ? 'promoted' : ''}`;
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

            card.innerHTML = `
                <div class="badge-container" style="position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 8px; z-index: 10;">
                    ${isRecentlyAdded ? '<div class="new-badge">New</div>' : ''}
                    ${isTrending ? '<div class="trending-badge">🔥 Trending</div>' : ''}
                </div>
                <div class="card-header">
                    <img src="${faviconUrl}" alt="${localName} icon" class="card-icon" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\'><rect width=\'48\' height=\'48\' fill=\'%233f3f46\'/></svg>'">
                    <div>
                        <a href="site.html?id=${site.id}" class="card-title-link" style="text-decoration:none; color:inherit;">
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
                        <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${site.id}" title="${isFav ? 'Remove from Favorites' : 'Add to Favorites'}">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                        <a href="${trackedUrl}" target="_blank" rel="noopener noreferrer" class="btn-visit">${t.visit} &rarr;</a>
                    </div>
                </div>
            `;
            
            // Add Favorite Listener
            const favBtn = card.querySelector('.btn-favorite');
            favBtn.onclick = (e) => {
                e.preventDefault();
                toggleFavorite(site.id, favBtn);
            };

            siteGrid.appendChild(card);
        });

        loadMoreBtn.style.display = (visible.length < total) ? 'inline-block' : 'none';
    }

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
        
        // If we are in "Favorites Only" mode, re-filter immediately
        if (showFavoritesOnly) {
            applyFiltersAndSort();
        }
    }

    // Infinite Scroll (Load Automatically)
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadMoreBtn.style.display !== 'none') {
            currentPage++;
            renderSites(true);
        }
    }, { rootMargin: '300px' });

    observer.observe(loadMoreBtn);

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderSites(true);
    });

    // ── Form Submission → /api/submit (Cloudflare Pages Function) ────────────
    const submitForm   = document.getElementById('submitForm');
    const submitBtn    = document.getElementById('submitBtn');
    const submitStatus = document.getElementById('submitStatus');

    submitForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name        = submitForm.site_name.value.trim();
        const url         = submitForm.url.value.trim();
        const category    = submitForm.category.value;
        const description = submitForm.description.value.trim();

        // Loading state
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Submitting…';
        submitStatus.style.display = 'none';

        try {
            const res = await fetch('/api/submit', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ name, url, category, description }),
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
        const input = document.getElementById("searchInput");
        const tray = document.getElementById("searchAutocomplete");
        if (!input || !tray) return;
        input.oninput = (e) => {
            const val = e.target.value.toLowerCase().trim();
            if (val.length < 2) {
                tray.classList.remove("active");
                return;
            }
            const matches = sitesData.filter(s => 
                s.name.toLowerCase().includes(val) || 
                s.category.toLowerCase().includes(val)
            ).slice(0, 6);
            if (matches.length > 0) {
                tray.innerHTML = matches.map(s => `
                    <div class="autocomplete-item" onclick="window.location.href='site.html?id=${s.id}'">
                        <img src="https://www.google.com/s2/favicons?domain=${new URL(s.url).hostname}&sz=32" alt="">
                        <div class="autocomplete-info">
                            <div class="autocomplete-name">${s.name}</div>
                            <div class="autocomplete-cat">${s.category}</div>
                        </div>
                    </div>
                `).join("");
                tray.classList.add("active");
            } else {
                tray.classList.remove("active");
            }
        };
        document.addEventListener("click", (e) => {
            if (!input.contains(e.target) && !tray.contains(e.target)) {
                tray.classList.remove("active");
            }
        });
    }
});


