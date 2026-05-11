// app.js

document.addEventListener('DOMContentLoaded', () => {
    
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
    // Assign a random order to each site on page load for consistent shuffling
    sitesData.forEach(site => { site.randomOrder = Math.random(); });
    
    let currentSites = [...sitesData];
    let activeCategories = [];
    let activeTags = [];
    let searchQuery = "";
    let currentSort = "random";
    let currentPage = 1;

    // --- Age Gate ---
    if (localStorage.getItem('hv_age_verified') === 'true') {
        ageGate.classList.add('hidden');
    }
    btnEnter.addEventListener('click', () => {
        localStorage.setItem('hv_age_verified', 'true');
        ageGate.classList.add('hidden');
    });

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

    applyFiltersAndSort();

    // --- Functions ---

    function initFilters() {
        // Render Categories
        ALL_CATEGORIES.forEach(cat => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${cat}" class="cat-cb"> ${cat}`;
            categoryFiltersContainer.appendChild(label);
        });

        // Render Tags
        ALL_TAGS.forEach(tag => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${tag}" class="tag-cb"> ${tag}`;
            tagFiltersContainer.appendChild(label);
        });

        // Add Listeners
        document.querySelectorAll('.cat-cb').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if(e.target.checked) activeCategories.push(e.target.value);
                else activeCategories = activeCategories.filter(c => c !== e.target.value);
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
    }

    function applyFiltersAndSort() {
        // Filter
        currentSites = sitesData.filter(site => {
            // Search filter
            const matchesSearch = site.name.toLowerCase().includes(searchQuery) || 
                                  site.description.toLowerCase().includes(searchQuery) ||
                                  site.category.toLowerCase().includes(searchQuery) ||
                                  site.tags.some(t => t.toLowerCase().includes(searchQuery));
            
            // Category filter
            const matchesCategory = activeCategories.length === 0 || activeCategories.includes(site.category);
            
            // Tags filter (MUST have all active tags)
            const matchesTags = activeTags.length === 0 || activeTags.every(t => site.tags.includes(t));

            return matchesSearch && matchesCategory && matchesTags;
        });

        // Sort
        currentSites.sort((a, b) => {
            if (currentSort === 'random') {
                return a.randomOrder - b.randomOrder;
            } else if (currentSort === 'popular') {
                // Weighted score: rating * 2 + recency bonus
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
        renderSites();
    }

    function renderSites() {
        siteGrid.innerHTML = '';

        const total = currentSites.length;
        const visible = currentSites.slice(0, currentPage * ITEMS_PER_PAGE);

        const startIdx = total === 0 ? 0 : 1;
        resultsCount.innerText = `Showing ${startIdx} - ${visible.length} of ${total} Sites`;

        if (total === 0) {
            siteGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No sites found matching your filters.</p>`;
            loadMoreBtn.style.display = 'none';
            return;
        }

        visible.forEach((site, index) => {
            const urlObj = new URL(site.url);
            const domain = urlObj.hostname;
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

            const tagsHtml = site.tags.map(t => `<span class="tag">${t}</span>`).join('');
            
            const fullStars = Math.floor(site.rating);
            const halfStar = site.rating % 1 !== 0;
            let starsHtml = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(site.rating));

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <img src="${faviconUrl}" alt="${site.name} icon" class="card-icon" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\'><rect width=\'48\' height=\'48\' fill=\'%233f3f46\'/></svg>'">
                    <div>
                        <div class="card-title">${site.name}</div>
                        <div class="card-category">${site.category}</div>
                    </div>
                </div>
                <div class="card-desc">${site.description}</div>
                <div class="card-tags">${tagsHtml}</div>
                <div class="card-footer">
                    <div class="rating" title="Rating: ${site.rating}/5">${starsHtml}</div>
                    <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="btn-visit">Visit &rarr;</a>
                </div>
            `;
            
            siteGrid.appendChild(card);
        });

        // Show/hide Load More button
        loadMoreBtn.style.display = (visible.length < total) ? 'inline-block' : 'none';
    }

    // Load More
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderSites();
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

});
