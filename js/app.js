// app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const siteGrid = document.getElementById('siteGrid');
    const categoryFiltersContainer = document.getElementById('categoryFilters');
    const tagFiltersContainer = document.getElementById('tagFilters');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const resultsCount = document.getElementById('resultsCount');
    
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');

    const submitModal = document.getElementById('submitModal');
    const btnSubmitSite = document.getElementById('btnSubmitSite');
    const btnSubmitFooter = document.getElementById('btnSubmitFooter');
    const closeBtns = document.getElementsByClassName('close-modal');

    // --- State ---
    let currentSites = [...sitesData];
    let activeCategories = [];
    let activeTags = [];
    let searchQuery = "";
    let currentSort = "popular"; // default

    // --- Initialization ---
    initFilters();
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
        
        btnSubmitSite.addEventListener('click', openModal);
        btnSubmitFooter.addEventListener('click', openModal);
        
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
                                  site.tags.some(t => t.toLowerCase().includes(searchQuery));
            
            // Category filter
            const matchesCategory = activeCategories.length === 0 || activeCategories.includes(site.category);
            
            // Tags filter (MUST have all active tags)
            const matchesTags = activeTags.length === 0 || activeTags.every(t => site.tags.includes(t));

            return matchesSearch && matchesCategory && matchesTags;
        });

        // Sort
        currentSites.sort((a, b) => {
            if (currentSort === 'popular' || currentSort === 'rating') {
                return b.rating - a.rating; // Highest rating first
            } else if (currentSort === 'alpha') {
                return a.name.localeCompare(b.name); // A-Z
            } else if (currentSort === 'newest') {
                return new Date(b.addedAt) - new Date(a.addedAt); // Newest first
            }
            return 0;
        });

        renderSites();
    }

    function renderSites() {
        siteGrid.innerHTML = '';
        
        resultsCount.innerText = `Showing ${currentSites.length} Sites`;

        if (currentSites.length === 0) {
            siteGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No sites found matching your filters.</p>`;
            return;
        }

        currentSites.forEach(site => {
            // Get domain to use google's favicon service
            const urlObj = new URL(site.url);
            const domain = urlObj.hostname;
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

            const tagsHtml = site.tags.map(t => `<span class="tag">${t}</span>`).join('');
            
            // Create Stars
            const fullStars = Math.floor(site.rating);
            const halfStar = site.rating % 1 !== 0;
            let starsHtml = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(site.rating));

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <img src="${faviconUrl}" alt="${site.name} icon" class="card-icon" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\'><rect width=\\'48\\' height=\\'48\\' fill=\\'%233f3f46\\'/></svg>'">
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
    }

    // Modal Form submission handling (Optional: Prevent default for demo, or let it post to Formspree)
    document.getElementById('submitForm').addEventListener('submit', (e) => {
        // e.preventDefault(); // Uncomment this to test without actually submitting
        // alert("Site submitted for review!");
        // submitModal.classList.remove('active');
    });

});
