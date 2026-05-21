"""
heal_bottom_layout.py
Self-healing script to clean up duplicated/corrupted bottom ad & QR widget HTML
across all pages in the HentaiVault directory.
"""
import os
import re

ROOT_STATIC = ["about.html", "contact.html", "privacy.html", "terms.html", "disclaimer.html", "dmca.html"]
CATEGORY_DIR = "category"
BLOG_DIR = "blog"

TRACKER = """
    <!-- Unique Visitor Hit Tracker -->
    <script>
        if (!localStorage.getItem("hv_counted")) {
            localStorage.setItem("hv_counted", "true");
            new Image().src = "https://hitscounter.dev/api/hit?url=https%3A%2F%2Fhentaivault.me&label=Visits&color=%23002d72&style=flat-square&tz=UTC";
        }
    </script>"""

STICKY_AD = """
    <!-- Sticky Bottom Ad -->
    <div id="sticky-bottom-ad">
        <div class="sticky-ad-inner">
            <script type="text/javascript">
                atOptions = {'key' : '40d623b6e8e7efa7651f8c6fbeb29bef', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {}};
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/40d623b6e8e7efa7651f8c6fbeb29bef/invoke.js"></script>
        </div>
        <button onclick="document.getElementById('sticky-bottom-ad').style.display='none'" class="btn-close-ad">&times;</button>
    </div>"""

QR_WIDGET = """
    <!-- QR Code Widget -->
    <div id="qr-widget" title="Scan to visit on mobile">
        <div id="qr-label">📱 Scan Me</div>
        <img id="qr-img"
             src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fhentaivault.me&bgcolor=18181b&color=ff2a5f&format=svg&qzone=1"
             alt="QR Code — HentaiVault.me"
             width="160" height="160">
        <p id="qr-caption">hentaivault.me</p>
    </div>"""

def read_f(p):
    with open(p, "r", encoding="utf-8", errors="replace") as f:
        return f.read().replace("\r", "")

def write_f(p, c):
    c = re.sub(r'\n{3,}', '\n\n', c)
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(c)

def heal_standard_page(p, is_subdir):
    c = read_f(p)
    if "</footer>" not in c:
        print(f"  [SKIP] {p} - no footer tag found")
        return
    
    print(f"  [HEAL] {p}")
    # Split by footer
    parts = c.split("</footer>")
    body = parts[0] + "</footer>\n"
    
    # Generate bottom section
    scripts_path = "../js/" if is_subdir else "js/"
    bottom = (
        f"\n    <!-- Scripts -->\n"
        f"    <script src=\"{scripts_path}data.js\"></script>\n"
        f"    <script src=\"{scripts_path}i18n.js\"></script>\n"
        f"    <script src=\"{scripts_path}app.js\"></script>\n"
    )
    bottom += TRACKER + "\n"
    bottom += STICKY_AD + "\n"
    bottom += QR_WIDGET + "\n"
    bottom += "</body>\n</html>\n"
    
    write_f(p, body + bottom)

def heal_site_html():
    p = "site.html"
    if not os.path.exists(p):
        return
    c = read_f(p)
    print(f"  [HEAL] site.html")
    
    # Split after the end of the relatedGrid review injection script block
    match = re.search(r'relatedGrid\.appendChild\(card\);\s*\}\);\s*\}\);\s*</script>', c)
    if not match:
        print("  [ERROR] site.html review script end not found!")
        return
    
    end_idx = match.end()
    body = c[:end_idx] + "\n"
    
    # Append ads, qr, body/html closing tags
    bottom = STICKY_AD + "\n"
    bottom += QR_WIDGET + "\n"
    bottom += "</body>\n</html>\n"
    
    write_f(p, body + bottom)

def run():
    print("Healing standard root pages...")
    for f in ROOT_STATIC:
        if os.path.exists(f):
            heal_standard_page(f, is_subdir=False)
            
    print("\nHearing site.html review page...")
    heal_site_html()
            
    print("\nHearing category pages...")
    if os.path.exists(CATEGORY_DIR):
        for f in sorted(os.listdir(CATEGORY_DIR)):
            if f.endswith(".html"):
                heal_standard_page(os.path.join(CATEGORY_DIR, f), is_subdir=True)
                
    print("\nHearing blog pages...")
    if os.path.exists(BLOG_DIR):
        for f in sorted(os.listdir(BLOG_DIR)):
            if f.endswith(".html"):
                heal_standard_page(os.path.join(BLOG_DIR, f), is_subdir=True)

    print("\nDONE healing bottom structures.")

if __name__ == "__main__":
    run()
