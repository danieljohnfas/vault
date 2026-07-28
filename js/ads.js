// js/ads.js
(function() {
  const ADS = {
    'ad-top': { key: '40d623b6e8e7efa7651f8c6fbeb29bef', width: 728, height: 90 },
    'ad-hero': { key: '4179d9cf3a579f7778ba7a09f693ca35', width: 468, height: 60 },
    'ad-content': { key: '384264be4aaafb8eb28962829e409253', width: 300, height: 250 },
    'ad-sidebar': { key: 'f09dcac8f1df551ed650e4aee0028622', width: 160, height: 300 },
    'ad-skyscraper-left': { key: '13ca4044b4b6e65ef15f10d18752754e', width: 160, height: 600 },
    'ad-skyscraper-right': { key: '13ca4044b4b6e65ef15f10d18752754e', width: 160, height: 600 },
    'ad-sticky-bottom': { key: '90b220b63fa3e2eb3c163fec3b34a465', width: 320, height: 50 }
  };

  let adsLoaded = false;

  function loadAds() {
    if (adsLoaded) return;
    adsLoaded = true;
    
    Object.keys(ADS).forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        const config = ADS[id];
        const iframe = document.createElement('iframe');
        iframe.width = config.width;
        iframe.height = config.height;
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.style.margin = '0 auto';
        iframe.style.padding = '0';
        iframe.style.display = 'block';
        iframe.scrolling = 'no';
        
        // Use srcdoc to safely isolate the document.write script
        iframe.srcdoc = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; align-items: center; }</style>
          </head>
          <body>
            <script>
              atOptions = {
                'key' : '${config.key}',
                'format' : 'iframe',
                'height' : ${config.height},
                'width' : ${config.width},
                'params' : {}
              };
            </script>
            <script src="https://revolthem.com/${config.key}/invoke.js"></script>
          </body>
          </html>
        `;
        
        container.appendChild(iframe);
      }
    });
  }

  // Lazy load on first interaction or scroll
  const triggerAds = () => {
    loadAds();
    ['scroll', 'mousemove', 'touchstart', 'click'].forEach(evt => {
      document.removeEventListener(evt, triggerAds);
    });
  };

  ['scroll', 'mousemove', 'touchstart', 'click'].forEach(evt => {
    document.addEventListener(evt, triggerAds, { once: true, passive: true });
  });

  // Fallback timeout in case user doesn't interact immediately
  setTimeout(triggerAds, 3500);

})();
