import sys
content = open('disclaimer.html', 'r', encoding='utf-8').readlines()
good_content = content[:267]
footer = '''
    <!-- Sticky Bottom Ad -->
    <div id="sticky-bottom-ad">
        <div class="sticky-ad-inner">
            <script type="text/javascript">
                atOptions = {'key' : '90b220b63fa3e2eb3c163fec3b34a465', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {}};
            </script>
            <script async type="text/javascript" src="https://www.revolthem.com/90b220b63fa3e2eb3c163fec3b34a465/invoke.js"></script>
        </div>
        <button onclick="document.getElementById('sticky-bottom-ad').style.display='none'" class="btn-close-ad">&times;</button>
    </div>

    <!-- QR Code Widget -->
    <div id="qr-widget" title="Scan to visit on mobile">
        <div id="qr-label">📱 Scan Me</div>
        <img id="qr-img"
             src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fhentaivault.me&bgcolor=18181b&color=ff2a5f&format=svg&qzone=1"
             alt="QR Code — HentaiVault.me"
             width="160" height="160">
        <p id="qr-caption">hentaivault.me</p>
    </div>

    <!-- PWA Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) { console.log('SW registered'); })
                    .catch(function(err) { console.log('SW error:', err); });
            });
        }
    </script>

    <!-- Adsterra SocialBar -->
    <script async type="text/javascript" src="https://www.revolthem.com/ba/67/44/ba6744afc790009f7b04d7509a97ea2f.js"></script>
</body>
</html>
'''
with open('disclaimer.html', 'w', encoding='utf-8') as f:
    f.writelines(good_content)
    f.write(footer)
print('Fixed disclaimer.html')
