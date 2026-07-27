document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        let adBlocked = false;
        
        // Simple test: create a fake ad div
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;'; // Give it content so offsetHeight > 0 by default
        testAd.className = 'adsbox';
        testAd.style.position = 'absolute';
        testAd.style.top = '-999px';
        document.body.appendChild(testAd);

        if (testAd.offsetHeight === 0 || window.getComputedStyle(testAd).display === 'none') {
            adBlocked = true;
        }
        testAd.remove();

        if(adBlocked) {
            const modal = document.createElement('div');
            modal.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(9,9,11,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;color:#fff;font-family:sans-serif;text-align:center;flex-direction:column;backdrop-filter:blur(5px);";
            modal.innerHTML = `
                <div style="background:#18181b;padding:40px;border-radius:16px;max-width:500px;border:1px solid rgba(255,42,95,0.3);box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                    <div style="font-size:40px;margin-bottom:10px;">🛑</div>
                    <h2 style="color:#ff2a5f;margin-top:0;font-size:24px;">Ad Blocker Detected</h2>
                    <p style="font-size:16px;line-height:1.6;color:#d4d4d8;">HentaiVault relies on ads to keep our servers running and the directory updated daily with working links.</p>
                    <p style="font-size:16px;line-height:1.6;margin-bottom:30px;color:#d4d4d8;">Please whitelist our site to continue browsing the vault.</p>
                    <button onclick="location.reload()" style="background:#ff2a5f;color:#fff;border:none;padding:14px 28px;border-radius:8px;font-size:16px;cursor:pointer;font-weight:bold;transition:0.2s;">I disabled it, reload page</button>
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        }
    }, 1500);
});
