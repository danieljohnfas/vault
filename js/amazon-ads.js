/**
 * amazon-ads.js — HentaiVault Amazon Affiliate Ad Engine (Dynamic)
 * Tag: photoid03-20
 * Fetches relevant ads from the backend API, tracks clicks, and auto-rotates.
 */

(function () {
  'use strict';

  const AMAZON_TAG = 'photoid03-20';

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function buildAmazonUrl(asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
  }

  function detectContext() {
    const path = window.location.pathname;
    if (window.FILTER_CATEGORY) return window.FILTER_CATEGORY;
    const segment = path.split('/').filter(Boolean).pop() || '';
    return segment.replace('.html', '') || 'default';
  }

  async function registerClick(asin) {
    try {
      await fetch(`/api/amazon-ads/click?id=${encodeURIComponent(asin)}`, {
        method: 'POST'
      });
    } catch (err) {
      console.error('Failed to register ad click:', err);
    }
  }

  function handleAdClick(event, asin, url) {
    event.preventDefault();
    event.stopPropagation();
    registerClick(asin).finally(() => {
      window.open(url, '_blank', 'noopener');
    });
  }

  // ─── Renderers ─────────────────────────────────────────────────────────────

  function renderInlineBanner(container, ad) {
    const url = buildAmazonUrl(ad.asin);
    container.innerHTML = `
      <div id="hv-amazon-inline-${ad.asin}" class="hv-amazon-ad-card" style="
        margin: 28px auto;
        max-width: 720px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        border: 1px solid rgba(255,153,0,0.35);
        border-radius: 14px;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        transition: border-color 0.2s, box-shadow 0.2s;
        cursor: pointer;
      "
      onmouseover="this.style.borderColor='rgba(255,153,0,0.7)';this.style.boxShadow='0 6px 28px rgba(255,153,0,0.2)'"
      onmouseout="this.style.borderColor='rgba(255,153,0,0.35)';this.style.boxShadow='0 4px 20px rgba(0,0,0,0.4)'"
      role="link" aria-label="Amazon affiliate ad: ${ad.title}">
        <div style="font-size: 2.8rem; flex-shrink:0; line-height:1;">${ad.emoji}</div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span style="background:#ff9900; color:#000; font-size:0.65rem; font-weight:800; padding:2px 7px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">Amazon</span>
            <span style="color:#ff9900; font-size:0.75rem; font-weight:600;">Sponsored</span>
          </div>
          <div style="font-weight:800; font-size:1.05rem; color:#fff; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${ad.title}</div>
          <div style="font-size:0.85rem; color:#a0aec0; line-height:1.4; margin-bottom:8px;">${ad.desc}</div>
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <span style="color:#ff9900; font-weight:700; font-size:0.9rem;">${ad.priceHint}</span>
            <a href="${url}" class="hv-amazon-cta"
               style="background:#ff9900; color:#000; font-weight:800; font-size:0.8rem; padding:6px 14px; border-radius:20px; text-decoration:none; transition:background 0.2s; white-space:nowrap;"
               onmouseover="this.style.background='#e68900'" onmouseout="this.style.background='#ff9900'">
              ${ad.cta} →
            </a>
          </div>
        </div>
      </div>`;

    // Attach click handler dynamically to prevent inline eval issues
    const card = container.querySelector('.hv-amazon-ad-card');
    if (card) {
      card.addEventListener('click', (e) => handleAdClick(e, ad.asin, url));
    }
  }

  function renderFooterGrid(container, ads) {
    const items = ads.map(ad => {
      const url = buildAmazonUrl(ad.asin);
      return `
        <a href="${url}" data-asin="${ad.asin}" class="hv-amazon-footer-item"
           style="
             flex: 1; min-width: 180px; max-width: 260px;
             background: linear-gradient(180deg, #1e1e2e 0%, #111827 100%);
             border: 1px solid rgba(255,153,0,0.25);
             border-radius: 12px; padding: 18px 16px;
             text-decoration: none; color: #fff;
             display: flex; flex-direction: column; align-items: center;
             gap: 10px; text-align: center;
             transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
           "
           onmouseover="this.style.borderColor='rgba(255,153,0,0.6)';this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(255,153,0,0.15)'"
           onmouseout="this.style.borderColor='rgba(255,153,0,0.25)';this.style.transform='';this.style.boxShadow=''">
          <div style="font-size:2rem;">${ad.emoji}</div>
          <div style="font-weight:700; font-size:0.9rem; color:#e2e8f0; line-height:1.3;">${ad.title}</div>
          <div style="font-size:0.75rem; color:#718096; line-height:1.4; flex:1;">${ad.desc}</div>
          <div style="background:#ff9900; color:#000; font-weight:800; font-size:0.75rem; padding:6px 14px; border-radius:20px; width:100%; box-sizing:border-box;">${ad.cta}</div>
          <div style="font-size:0.65rem; color:rgba(255,153,0,0.6);">Amazon | ${ad.priceHint}</div>
        </a>`;
    }).join('');

    container.innerHTML = `
      <div style="max-width: 860px; margin: 32px auto; padding: 0 16px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px; justify-content:center;">
          <span style="background:#ff9900; color:#000; font-size:0.65rem; font-weight:800; padding:3px 8px; border-radius:4px;">AMAZON PICKS</span>
          <span style="color:#718096; font-size:0.8rem;">As an Amazon Associate, HentaiVault earns from qualifying purchases.</span>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:14px; justify-content:center;">
          ${items}
        </div>
      </div>`;
      
    // Attach click handlers
    const links = container.querySelectorAll('.hv-amazon-footer-item');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        handleAdClick(e, link.dataset.asin, link.href);
      });
    });
  }

  // ─── Disclosure ────────────────────────────────────────────────────────────

  function injectDisclosure() {
    if (document.getElementById('hv-amazon-disclosure')) return;
    const existing = document.querySelector('footer .footer-content');
    if (!existing) return;
    const disc = document.createElement('p');
    disc.id = 'hv-amazon-disclosure';
    disc.style.cssText = 'font-size:0.72rem;color:#4a5568;text-align:center;margin:8px 0 0;padding:0 16px;';
    disc.textContent = '★ Some links on this page are Amazon affiliate links. As an Amazon Associate, HentaiVault earns from qualifying purchases at no extra cost to you.';
    existing.appendChild(disc);
  }

  // ─── Bootstrap ────────────────────────────────────────────────────────────

  async function init() {
    const context = detectContext();
    const inlineSlots = document.querySelectorAll('.hv-amazon-inline-slot');
    const footerSlots = document.querySelectorAll('.hv-amazon-footer-slot');

    if (!inlineSlots.length && !footerSlots.length) return;

    // We need 1 for inline, up to 3 for footer -> fetch 4 max
    const needed = (inlineSlots.length ? 1 : 0) + (footerSlots.length ? 3 : 0);
    
    try {
      const res = await fetch(`/api/amazon-ads?context=${encodeURIComponent(context)}&limit=${needed}`);
      if (!res.ok) throw new Error('API failed');
      const ads = await res.json();
      
      if (!ads || !ads.length) return;

      if (inlineSlots.length && ads.length > 0) {
        const ad = ads[0];
        inlineSlots.forEach(slot => renderInlineBanner(slot, ad));
      }

      if (footerSlots.length && ads.length > 1) {
        const footerAds = inlineSlots.length ? ads.slice(1, 4) : ads.slice(0, 3);
        footerSlots.forEach(slot => renderFooterGrid(slot, footerAds));
      }

      injectDisclosure();
    } catch (err) {
      console.error('Failed to load Amazon ads:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
