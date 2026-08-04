/**
 * amazon-ads.js — HentaiVault Amazon Affiliate Ad Engine (Dynamic)
 * Tag: photoid03-20
 * Fetches relevant ads from the backend API, tracks clicks, and auto-rotates.
 * Renders product cover images using Amazon's Associates image CDN.
 */

(function () {
  'use strict';

  const AMAZON_TAG = 'photoid03-20';

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function buildAmazonUrl(asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
  }

  /** Extract ASIN from any Amazon URL (product pages only) */
  function extractAsin(url) {
    if (!url) return null;
    const match = url.match(/\/dp\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
  }

  /**
   * Get the canonical URL for an ad — use ad.url (custom full link) if set,
   * otherwise fall back to building from ASIN.
   */
  function getAdUrl(ad) {
    return ad.url || buildAmazonUrl(ad.asin || ad.id);
  }

  /**
   * Get the Amazon Associates product cover image URL.
   * Works for any ASIN using the official adsystem widget endpoint.
   * Returns null for search pages / non-product URLs.
   */
  function getProductImage(ad) {
    if (ad.image_url) return ad.image_url;
    const asin = extractAsin(ad.url) || ad.asin || ad.id;
    if (asin && asin.match(/^[A-Z0-9]{10}$/)) {
      return `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${AMAZON_TAG}`;
    }
    return null;
  }

  function detectContext() {
    const path = window.location.pathname;
    if (window.FILTER_CATEGORY) return window.FILTER_CATEGORY;
    const segment = path.split('/').filter(Boolean).pop() || '';
    return segment.replace('.html', '') || 'default';
  }

  async function registerClick(id) {
    try {
      await fetch(`/api/amazon-ads/click?id=${encodeURIComponent(id)}`, {
        method: 'POST'
      });
    } catch (err) {
      console.error('Failed to register ad click:', err);
    }
  }

  function handleAdClick(event, id, url) {
    event.preventDefault();
    event.stopPropagation();
    registerClick(id).finally(() => {
      window.open(url, '_blank', 'noopener');
    });
  }

  // ─── Renderers ─────────────────────────────────────────────────────────────

  function renderInlineBanner(container, ad) {
    const url = getAdUrl(ad);
    const imgSrc = getProductImage(ad);
    const adId = ad.asin || ad.id;

    const imageHtml = imgSrc
      ? `<img
           src="${imgSrc}"
           alt="${ad.title}"
           loading="lazy"
           onerror="this.parentElement.style.display='none'"
           style="
             width: 90px;
             height: 130px;
             object-fit: cover;
             border-radius: 8px;
             flex-shrink: 0;
             box-shadow: 0 4px 12px rgba(0,0,0,0.5);
             border: 1px solid rgba(255,153,0,0.2);
           "
         >`
      : `<div style="font-size: 2.8rem; flex-shrink:0; line-height:1; width:90px; text-align:center;">${ad.emoji || '🛒'}</div>`;

    container.innerHTML = `
      <div id="hv-amazon-inline-${adId}" class="hv-amazon-ad-card btn-visit-tracked" data-id="${ad.id}" tabindex="0" style="
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
        outline-offset: 3px;
      "
      onmouseover="this.style.borderColor='rgba(255,153,0,0.7)';this.style.boxShadow='0 6px 28px rgba(255,153,0,0.2)'"
      onmouseout="this.style.borderColor='rgba(255,153,0,0.35)';this.style.boxShadow='0 4px 20px rgba(0,0,0,0.4)'"
      onkeydown="if(event.key==='Enter'||event.key===' '){this.querySelector('.hv-amazon-cta').click();}"
      role="link" aria-label="Amazon affiliate ad: ${ad.title}">
        ${imageHtml}
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span style="background:#ff9900; color:#000; font-size:0.65rem; font-weight:800; padding:2px 7px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">Amazon</span>
            <span style="color:#ff9900; font-size:0.75rem; font-weight:600;">Sponsored</span>
          </div>
          <div style="font-weight:800; font-size:1.05rem; color:#fff; margin-bottom:4px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${ad.title}</div>
          <div style="font-size:0.85rem; color:#a0aec0; line-height:1.4; margin-bottom:8px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${ad.desc}</div>
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

    const card = container.querySelector('.hv-amazon-ad-card');
    if (card) {
      card.addEventListener('click', (e) => handleAdClick(e, adId, url));
    }
  }

  function renderFooterGrid(container, ads) {
    const items = ads.map(ad => {
      const url = getAdUrl(ad);
      const imgSrc = getProductImage(ad);
      const adId = ad.asin || ad.id;

      const imageHtml = imgSrc
        ? `<img
             src="${imgSrc}"
             alt="${ad.title}"
             loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
             style="width:100px; height:140px; object-fit:cover; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.5); border:1px solid rgba(255,153,0,0.2); margin-bottom:10px; display:block;"
           >
           <div style="font-size:2rem; display:none; margin-bottom:10px;">${ad.emoji || '🛒'}</div>`
        : `<div style="font-size:2rem; margin-bottom:10px;">${ad.emoji || '🛒'}</div>`;

      return `
        <a href="${url}" data-adid="${adId}" class="hv-amazon-footer-item"
           style="
             flex: 1; min-width: 160px; max-width: 220px;
             background: linear-gradient(180deg, #1e1e2e 0%, #111827 100%);
             border: 1px solid rgba(255,153,0,0.25);
             border-radius: 12px; padding: 16px 14px;
             text-decoration: none; color: #fff;
             display: flex; flex-direction: column; align-items: center;
             gap: 6px; text-align: center;
             transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
           "
           onmouseover="this.style.borderColor='rgba(255,153,0,0.6)';this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(255,153,0,0.15)'"
           onmouseout="this.style.borderColor='rgba(255,153,0,0.25)';this.style.transform='';this.style.boxShadow=''">
          ${imageHtml}
          <div style="font-weight:700; font-size:0.85rem; color:#e2e8f0; line-height:1.3; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${ad.title}</div>
          <div style="font-size:0.72rem; color:#718096; line-height:1.4; flex:1; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${ad.desc}</div>
          <div style="background:#ff9900; color:#000; font-weight:800; font-size:0.75rem; padding:6px 14px; border-radius:20px; width:100%; box-sizing:border-box; margin-top:4px;">${ad.cta} →</div>
          <div style="font-size:0.62rem; color:rgba(255,153,0,0.5);">Amazon | ${ad.priceHint}</div>
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

    const links = container.querySelectorAll('.hv-amazon-footer-item');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        handleAdClick(e, link.dataset.adid, link.href);
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

  const pcloudAds = [
    { url: 'https://partner.pcloud.com/r/156786', title: 'Get 10TB Cloud Storage', desc: 'Running out of space for your collection? One-time payment, yours forever.', cta: 'Click Here', icon: '☁️' },
    { url: 'https://partner.pcloud.com/r/156784', title: 'pCloud Pass Manager', desc: 'The most secure password manager. Save and access your passwords anywhere.', cta: 'Secure Now', icon: '🔐' },
    { url: 'https://partner.pcloud.com/r/156776', title: 'Lifetime Cloud Storage', desc: 'Pay once and keep your files secure forever with pCloud Lifetime.', cta: 'Get Deal', icon: '♾️' },
    { url: 'https://partner.pcloud.com/r/156778', title: 'Secure Cloud Storage', desc: 'Access your files on any device. Highly secure, easy to use cloud storage.', cta: 'View Plans', icon: '🛡️' },
    { url: 'https://partner.pcloud.com/r/156782', title: 'pCloud Family Plan', desc: 'Share up to 10TB of Lifetime storage with up to 5 family members.', cta: 'View Family Plan', icon: '👨‍👩‍👧‍👦' },
    { url: 'https://partner.pcloud.com/r/156781', title: 'pCloud for Business', desc: 'Secure cloud storage for your team. Easy collaboration and access control.', cta: 'Start Business Trial', icon: '💼' },
    { url: 'https://partner.pcloud.com/r/156780', title: 'pCloud Crypto', desc: 'Client-side encryption for your most sensitive files. Zero-knowledge privacy.', cta: 'Encrypt Files', icon: '🔒' },
    { url: 'https://partner.pcloud.com/r/156783', title: 'pCloud Europe', desc: 'Store your files securely in our European data center (Luxembourg).', cta: 'EU Data Region', icon: '🇪🇺' },
    { url: 'https://partner.pcloud.com/r/156785', title: 'pCloud Drive for Mac', desc: 'Access all your files directly from your Mac without taking up local space.', cta: 'Download Now', icon: '🍏' }
  ];

  function renderRailAd(ad, isAmazon) {
    if (isAmazon) {
      const asin = extractAsin(ad.url);
      const imgUrl = getProductImage(ad);
      return `
        <a href="${ad.url}" target="_blank" rel="nofollow noopener noreferrer sponsored" class="btn-visit-tracked" data-id="${ad.id}" data-outbound="${ad.url}"
           style="display:block; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 16px; padding: 16px; text-decoration: none; transition: border-color 0.2s;"
           onmouseover="this.style.borderColor='#ff9900'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="font-size:0.65rem; color:#ff9900; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">★ Amazon Pick</div>
          ${imgUrl ? `<img src="${imgUrl}" alt="${ad.title}" onerror="this.style.display='none'" style="width:100%; height:140px; object-fit:contain; border-radius:10px; margin-bottom:12px; background:#111;">` : ''}
          <div style="font-size:0.88rem; font-weight:700; color:var(--text-main); line-height:1.3; margin-bottom:6px;">${ad.title}</div>
          <div style="font-size:0.8rem; color:#a0aec0; line-height:1.4; margin-bottom:12px;">${ad.desc || ''}</div>
          <div style="display:block; width:100%; text-align:center; background:#ff9900; color:#000; font-weight:800; font-size:0.85rem; padding:9px 0; border-radius:8px;">${ad.cta || 'Shop Now'} →</div>
        </a>`;
    } else {
      return `
        <a href="${ad.url}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit-tracked" data-outbound="${ad.url}"
           style="display:flex; flex-direction:column; background:linear-gradient(135deg, #007EE5, #0056b3); border-radius:16px; padding:20px; color:white; text-align:center; text-decoration:none; transition: transform 0.2s; box-shadow:0 4px 15px rgba(0,126,229,0.3);"
           onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            <div style="font-size:0.65rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Advertisement</div>
            <div style="font-size:2.5rem; margin-bottom:10px;">${ad.icon}</div>
            <h3 style="margin:0 0 10px 0; font-size:1.05rem; font-weight:700;">${ad.title}</h3>
            <p style="font-size:0.85rem; opacity:0.9; margin:0 0 15px 0; line-height:1.4;">${ad.desc}</p>
            <div style="margin-top:auto; background:white; color:#007EE5; padding:9px; border-radius:50px; font-weight:bold; font-size:0.85rem;">${ad.cta} &rarr;</div>
        </a>`;
    }
  }

  // ─── Bootstrap ────────────────────────────────────────────────────────────

  async function init() {
    const context = detectContext();
    const leftStack = document.querySelector('.hv-ad-stack-left');
    const rightStack = document.querySelector('.hv-ad-stack-right');
    const inlineSlots  = document.querySelectorAll('.hv-amazon-inline-slot');
    const footerSlots  = document.querySelectorAll('.hv-amazon-footer-slot');

    if (!leftStack && !rightStack && !inlineSlots.length && !footerSlots.length) return;

    // We fetch a lot of ads if we have side rails to fill
    const needed = (leftStack || rightStack) ? 12 : (inlineSlots.length ? 1 : 0) + (footerSlots.length ? 3 : 0);

    try {
      const res = await fetch(`/api/amazon-ads?context=${encodeURIComponent(context)}&limit=${needed}`);
      if (!res.ok) throw new Error('API failed');
      let ads = await res.json();
      if (!ads) ads = [];

      let idx = 0;

      // Inline banner (takes 1 Amazon ad)
      if (inlineSlots.length && ads[idx]) {
        const ad = ads[idx++];
        inlineSlots.forEach(slot => renderInlineBanner(slot, ad));
      }

      // Footer grid (takes 3 Amazon ads)
      if (footerSlots.length && ads[idx]) {
        const footerAds = ads.slice(idx, idx + 3);
        idx += Math.min(3, footerAds.length);
        footerSlots.forEach(slot => renderFooterGrid(slot, footerAds));
      }

      // Left & Right Ad Rails (Subpages)
      if (leftStack || rightStack) {
        const remainingAmazonAds = ads.slice(idx);
        const combinedPool = [];
        
        // Shuffle pcloud ads to vary what's shown
        const pcloudPool = [...pcloudAds].sort(() => Math.random() - 0.5);

        // Interleave 1 Amazon, 1 pCloud
        const maxLength = Math.max(remainingAmazonAds.length, pcloudPool.length);
        for (let i = 0; i < maxLength; i++) {
          if (remainingAmazonAds[i]) combinedPool.push({ type: 'amazon', ad: remainingAmazonAds[i] });
          if (pcloudPool[i]) combinedPool.push({ type: 'pcloud', ad: pcloudPool[i] });
        }

        // Divide into left and right (Max 4 per rail)
        const leftHtml = [];
        const rightHtml = [];
        combinedPool.forEach((item, i) => {
          const html = renderRailAd(item.ad, item.type === 'amazon');
          if (i % 2 === 0 && leftStack && leftHtml.length < 4) {
            leftHtml.push(html);
          } else if (rightStack && rightHtml.length < 4) {
            rightHtml.push(html);
          } else if (leftStack && leftHtml.length < 4) {
            leftHtml.push(html);
          }
        });

        if (leftStack) leftStack.innerHTML = leftHtml.join('<div style="height:20px;"></div>');
        if (rightStack) rightStack.innerHTML = rightHtml.join('<div style="height:20px;"></div>');
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
