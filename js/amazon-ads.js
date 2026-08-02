/**
 * amazon-ads.js — HentaiVault Amazon Affiliate Ad Engine
 * Tag: photoid03-20
 * Rotates content-relevant Amazon ads across all pages.
 * Amazon Associates Program — disclosure required on every page.
 */

(function () {
  'use strict';

  const AMAZON_TAG = 'photoid03-20';

  // ─── Product Pool ──────────────────────────────────────────────────────────
  // Each product has: asin, title, desc, emoji, cta, category tags, price hint
  const AMAZON_ADS = [
    // Storage / Backup — universal appeal ("backup your collection")
    {
      asin: 'B09X7CRKRZ',
      title: 'Seagate 4TB Portable HDD',
      desc: 'Never lose your collection. 4TB portable drive — plug & play, works on PC & Mac.',
      emoji: '💾',
      cta: 'Check Price on Amazon',
      priceHint: 'From ~$79',
      tags: ['storage', 'all', 'downloads', 'manga', 'streaming'],
    },
    {
      asin: 'B0C4DV6P7M',
      title: 'Samsung T7 Shield 2TB SSD',
      desc: 'Blazing-fast 2TB portable SSD. Rugged, compact, perfect for large media libraries.',
      emoji: '⚡',
      cta: 'Shop on Amazon',
      priceHint: 'From ~$109',
      tags: ['storage', 'all', 'downloads', 'premium'],
    },
    {
      asin: 'B07Y7NFTQP',
      title: 'WD 8TB External Hard Drive',
      desc: 'Massive 8TB desktop drive. The ultimate backup solution for your entire digital library.',
      emoji: '🗄️',
      cta: 'View on Amazon',
      priceHint: 'From ~$129',
      tags: ['storage', 'all', 'downloads'],
    },
    {
      asin: 'B09C9M3TFM',
      title: '128GB High-Speed USB 3.2 Flash Drive',
      desc: 'Take your favorites anywhere. Ultra-fast 128GB USB drive with keychain clip.',
      emoji: '🔑',
      cta: 'Buy on Amazon',
      priceHint: 'From ~$14',
      tags: ['storage', 'all', 'mobile'],
    },
    // Manga / Books — manga-doujin category
    {
      asin: '1974732460',
      title: 'My Hero Academia Vol. 1 Manga',
      desc: 'Start the legendary series. Official English manga — collect the full run.',
      emoji: '📚',
      cta: 'Get it on Amazon',
      priceHint: 'From ~$9',
      tags: ['manga', 'anime', 'books'],
    },
    {
      asin: '1421578794',
      title: 'Attack on Titan Vol. 1 Manga',
      desc: 'Own the manga that defined a generation. Official English translation by Kodansha.',
      emoji: '📖',
      cta: 'Buy on Amazon',
      priceHint: 'From ~$10',
      tags: ['manga', 'anime', 'books'],
    },
    {
      asin: '197410237X',
      title: 'Demon Slayer Vol. 1 Manga',
      desc: 'Tanjiro\'s journey begins. Collect official Demon Slayer manga volumes.',
      emoji: '🗡️',
      cta: 'Shop Amazon',
      priceHint: 'From ~$9',
      tags: ['manga', 'anime', 'books'],
    },
    // Gaming peripherals — games / VN category
    {
      asin: 'B09W3VBQRS',
      title: 'Redragon S101 Gaming Keyboard + Mouse',
      desc: 'RGB gaming combo — mechanical keyboard and 7-button programmable mouse. Top-rated setup.',
      emoji: '⌨️',
      cta: 'Check Amazon Price',
      priceHint: 'From ~$35',
      tags: ['gaming', 'games', 'tech'],
    },
    {
      asin: 'B07ZGQJ4QQ',
      title: 'HyperX Cloud Stinger Gaming Headset',
      desc: 'Immersive audio, ultra-light design. Perfect for gaming sessions and visual novels.',
      emoji: '🎧',
      cta: 'View on Amazon',
      priceHint: 'From ~$39',
      tags: ['gaming', 'games', 'audio', 'streaming'],
    },
    {
      asin: 'B08F4XLKWZ',
      title: 'Logitech G305 Wireless Gaming Mouse',
      desc: 'HERO sensor, 250hr battery, 12000 DPI. Elite wireless gaming mouse.',
      emoji: '🖱️',
      cta: 'Buy on Amazon',
      priceHint: 'From ~$39',
      tags: ['gaming', 'games', 'tech'],
    },
    // Monitors — streaming/booru category
    {
      asin: 'B09VH4J4QL',
      title: 'LG 27" 4K IPS Monitor',
      desc: 'Stunning 4K UHD display with IPS panel — experience every detail in your media.',
      emoji: '🖥️',
      cta: 'Check Amazon',
      priceHint: 'From ~$249',
      tags: ['streaming', 'gaming', 'tech', 'booru', 'monitor'],
    },
    {
      asin: 'B09TDV74GH',
      title: 'ASUS 24" Full HD Gaming Monitor',
      desc: '1ms response, 165Hz refresh. Smooth, vivid, vibrant — built for maximum immersion.',
      emoji: '⚡',
      cta: 'Shop on Amazon',
      priceHint: 'From ~$139',
      tags: ['streaming', 'gaming', 'booru', 'tech'],
    },
    // Privacy / Security — privacy guide page
    {
      asin: 'B09G9FPHY6',
      title: 'Privacy Screen Protector (Universal)',
      desc: 'Browse privately IRL. Anti-spy filter keeps prying eyes away from your screen.',
      emoji: '🔒',
      cta: 'View on Amazon',
      priceHint: 'From ~$19',
      tags: ['privacy', 'security', 'all'],
    },
    {
      asin: 'B07XKQX3YT',
      title: 'Faraday Bag — Signal Blocker Pouch',
      desc: 'Block GPS, WiFi, RFID & cellular. Total signal isolation for your phone & cards.',
      emoji: '🛡️',
      cta: 'Buy on Amazon',
      priceHint: 'From ~$15',
      tags: ['privacy', 'security'],
    },
    // Collectibles / Figures — communities / general
    {
      asin: 'B08BWHJ6MT',
      title: 'Anime Figure Display Stand (6-pack)',
      desc: 'Showcase your collection in style. Adjustable acrylic stands for figures & models.',
      emoji: '🏆',
      cta: 'Get on Amazon',
      priceHint: 'From ~$12',
      tags: ['community', 'collectibles', 'all'],
    },
    {
      asin: 'B09PC26LNJ',
      title: 'VPN Router — GL.iNet Beryl AX',
      desc: 'Hardware VPN router — route all your devices through your VPN with zero software setup.',
      emoji: '🌐',
      cta: 'Check Amazon',
      priceHint: 'From ~$79',
      tags: ['privacy', 'vpn', 'security', 'streaming'],
    },
  ];

  // ─── Category → tag mapping ────────────────────────────────────────────────
  const CATEGORY_MAP = {
    'Manga & Doujinshi':        ['manga', 'books', 'storage'],
    'manga-doujin':             ['manga', 'books', 'storage'],
    'Hentai Streaming':         ['streaming', 'monitor', 'storage'],
    'hentai-streaming':         ['streaming', 'monitor', 'storage'],
    'Anime Streaming':          ['anime', 'streaming', 'monitor', 'storage'],
    'anime-streaming':          ['anime', 'streaming', 'monitor', 'storage'],
    'Image Boards (Boorus)':    ['booru', 'monitor', 'storage'],
    'images-boorus':            ['booru', 'monitor', 'storage'],
    'Games & Visual Novels':    ['gaming', 'games'],
    'games':                    ['gaming', 'games'],
    'visual-novels':            ['gaming', 'games'],
    'Communities & Forums':     ['community', 'collectibles', 'all'],
    'communities':              ['community', 'collectibles', 'all'],
    'Downloads & Torrents':     ['downloads', 'storage'],
    'downloads':                ['downloads', 'storage'],
    'privacy':                  ['privacy', 'vpn', 'security'],
    'default':                  ['all', 'storage'],
  };

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function buildAmazonUrl(asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
  }

  function detectContext() {
    const path = window.location.pathname;
    // Check window.FILTER_CATEGORY first (set by category pages)
    if (window.FILTER_CATEGORY) return window.FILTER_CATEGORY;
    // Derive from URL path
    const segment = path.split('/').filter(Boolean).pop() || '';
    return segment.replace('.html', '') || 'default';
  }

  function getRelevantAds(context, count) {
    const tags = CATEGORY_MAP[context] || CATEGORY_MAP['default'];
    const relevant = AMAZON_ADS.filter(ad =>
      ad.tags.some(t => tags.includes(t))
    );
    const pool = relevant.length >= count ? relevant : AMAZON_ADS;
    // Session-seeded shuffle for rotation
    const seed = sessionStorage.getItem('hv_ad_seed') || Date.now().toString();
    sessionStorage.setItem('hv_ad_seed', seed);
    const shuffled = pool.slice().sort(() => {
      const x = parseFloat('0.' + seed.slice(-6)) + Math.random() * 0.5;
      return x - 0.5;
    });
    return shuffled.slice(0, count);
  }

  // ─── Renderers ─────────────────────────────────────────────────────────────

  function renderInlineBanner(container, ad) {
    const url = buildAmazonUrl(ad.asin);
    container.innerHTML = `
      <div id="hv-amazon-inline" style="
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
      onclick="window.open('${url}','_blank','noopener')"
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
            <a href="${url}" target="_blank" rel="nofollow sponsored noopener"
               onclick="event.stopPropagation()"
               style="background:#ff9900; color:#000; font-weight:800; font-size:0.8rem; padding:6px 14px; border-radius:20px; text-decoration:none; transition:background 0.2s; white-space:nowrap;"
               onmouseover="this.style.background='#e68900'" onmouseout="this.style.background='#ff9900'">
              ${ad.cta} →
            </a>
          </div>
        </div>
        <div style="flex-shrink:0; text-align:center; background:rgba(255,153,0,0.1); border:1px solid rgba(255,153,0,0.2); border-radius:10px; padding:10px 14px; display:none;" id="hv-amz-img-${ad.asin}">
          <img src="https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${ad.asin}&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${AMAZON_TAG}"
               alt="${ad.title}" loading="lazy" width="80"
               style="border-radius:6px; display:block;"
               onerror="document.getElementById('hv-amz-img-${ad.asin}').style.display='none'"
               onload="document.getElementById('hv-amz-img-${ad.asin}').style.display='block'" />
        </div>
      </div>`;
  }

  function renderFooterGrid(container, ads) {
    const items = ads.map(ad => {
      const url = buildAmazonUrl(ad.asin);
      return `
        <a href="${url}" target="_blank" rel="nofollow sponsored noopener"
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

  function init() {
    const context = detectContext();
    const inlineSlots = document.querySelectorAll('.hv-amazon-inline-slot');
    const footerSlots = document.querySelectorAll('.hv-amazon-footer-slot');

    if (inlineSlots.length) {
      const [ad] = getRelevantAds(context, 1);
      inlineSlots.forEach(slot => {
        if (ad) renderInlineBanner(slot, ad);
      });
    }

    if (footerSlots.length) {
      const ads = getRelevantAds(context, 3);
      footerSlots.forEach(slot => {
        if (ads.length) renderFooterGrid(slot, ads);
      });
    }

    if (inlineSlots.length || footerSlots.length) {
      injectDisclosure();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
