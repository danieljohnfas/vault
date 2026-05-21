"""
standardize_ui.py - HentaiVault Page Standardizer
Strips carriage returns, fixes double blank lines, syncs navbar/footer/ads/hreflang
"""
import os
import re

INDEX_FILE = "index.html"
CATEGORY_DIR = "category"
BLOG_DIR = "blog"

ROOT_FILES = [
    "about.html",
    "contact.html",
    "privacy.html",
    "terms.html",
    "disclaimer.html",
    "dmca.html",
    "site.html",
]

ADSTERRA_HEAD = (
    '<script src="https://pl29414985.profitablecpmratenetwork.com/99/45/11/'
    '994511c440490953ceb331525d9f463f.js"></script>\n'
    '    <script src="https://pl29414982.profitablecpmratenetwork.com/ba/67/44/'
    'ba6744afc790009f7b04d7509a97ea2f.js"></script>\n'
    '    <script async="async" data-cfasync="false" src="https://pl29414983.'
    'profitablecpmratenetwork.com/a098db90df9a9b985c317d9ba01e155e/invoke.js">'
    '</script>'
)

SKYSCRAPERS = (
    '<!-- Sticky Skyscraper Ads (Wide Screens Only) -->\n'
    '    <div class="skyscraper skyscraper-left">\n'
    '        <script>\n'
    '          atOptions = {\n'
    "            'key' : '13ca4044b4b6e65ef15f10d18752754e',\n"
    "            'format' : 'iframe',\n"
    "            'height' : 600,\n"
    "            'width' : 160,\n"
    "            'params' : {}\n"
    '          };\n'
    '        </script>\n'
    '        <script src="https://www.highperformanceformat.com/13ca4044b4b6e65ef15f10d18752754e/invoke.js"></script>\n'
    '    </div>\n'
    '    <div class="skyscraper skyscraper-right">\n'
    '        <script>\n'
    '          atOptions = {\n'
    "            'key' : '13ca4044b4b6e65ef15f10d18752754e',\n"
    "            'format' : 'iframe',\n"
    "            'height' : 600,\n"
    "            'width' : 160,\n"
    "            'params' : {}\n"
    '          };\n'
    '        </script>\n'
    '        <script src="https://www.highperformanceformat.com/13ca4044b4b6e65ef15f10d18752754e/invoke.js"></script>\n'
    '    </div>'
)

STICKY_BOTTOM_AD = (
    '<!-- Sticky Bottom Ad -->\n'
    '    <div id="sticky-bottom-ad">\n'
    '        <div class="sticky-ad-inner">\n'
    '            <script type="text/javascript">\n'
    "                atOptions = {'key' : '40d623b6e8e7efa7651f8c6fbeb29bef', "
    "'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {}};\n"
    '            </script>\n'
    '            <script type="text/javascript" src="https://www.highperformanceformat.com/40d623b6e8e7efa7651f8c6fbeb29bef/invoke.js"></script>\n'
    '        </div>\n'
    '        <button onclick="document.getElementById(\'sticky-bottom-ad\').style.display=\'none\'" class="btn-close-ad">&times;</button>\n'
    '    </div>'
)

LEADERBOARD_AD = (
    '<!-- Ad Leaderboard -->\n'
    '    <div class="ad-container leaderboard">\n'
    '        <script>\n'
    '          atOptions = {\n'
    "            'key' : '40d623b6e8e7efa7651f8c6fbeb29bef',\n"
    "            'format' : 'iframe',\n"
    "            'height' : 90,\n"
    "            'width' : 728,\n"
    "            'params' : {}\n"
    '          };\n'
    '        </script>\n'
    '        <script src="https://www.highperformanceformat.com/40d623b6e8e7efa7651f8c6fbeb29bef/invoke.js"></script>\n'
    '    </div>'
)

SIDEBAR_ADS = (
    '<!-- Ad Sidebar 1 -->\n'
    '            <div class="ad-container sidebar-ad">\n'
    '                <script>\n'
    '                  atOptions = {\n'
    "                    'key' : '384264be4aaafb8eb28962829e409253',\n"
    "                    'format' : 'iframe',\n"
    "                    'height' : 250,\n"
    "                    'width' : 300,\n"
    "                    'params' : {}\n"
    '                  };\n'
    '                </script>\n'
    '                <script src="https://www.highperformanceformat.com/384264be4aaafb8eb28962829e409253/invoke.js"></script>\n'
    '            </div>\n'
    '\n'
    '            <!-- Ad Sidebar 2 -->\n'
    '            <div class="ad-container sidebar-ad sidebar-ad-secondary">\n'
    '                <script>\n'
    '                  atOptions = {\n'
    "                    'key' : '384264be4aaafb8eb28962829e409253',\n"
    "                    'format' : 'iframe',\n"
    "                    'height' : 250,\n"
    "                    'width' : 300,\n"
    "                    'params' : {}\n"
    '                  };\n'
    '                </script>\n'
    '                <script src="https://www.highperformanceformat.com/384264be4aaafb8eb28962829e409253/invoke.js"></script>\n'
    '            </div>'
)

SIDEBAR_FILTERS = (
    '<div class="filter-group">\n'
    '                <h3 data-i18n="sort_by">Sort By</h3>\n'
    '                <select id="sortSelect" title="Sort Sites By">\n'
    '                    <option value="random" data-i18n="random">Random (Shuffle)</option>\n'
    '                    <option value="popular" data-i18n="popular">Popularity</option>\n'
    '                    <option value="alpha" data-i18n="alpha">Alphabetical (A-Z)</option>\n'
    '                    <option value="newest" data-i18n="newest">Newest Added</option>\n'
    '                    <option value="rating" data-i18n="rating">Highest Rated</option>\n'
    '                </select>\n'
    '            </div>\n'
    '\n'
    '            <div class="filter-group">\n'
    '                <h3 data-i18n="categories_title">Categories</h3>\n'
    '                <div class="checkbox-list" id="categoryFilters">\n'
    '                    <!-- Categories injected via JS -->\n'
    '                </div>\n'
    '            </div>\n'
    '\n'
    '            <div class="filter-group">\n'
    '                <h3 data-i18n="tags_title">Tags</h3>\n'
    '                <div class="checkbox-list" id="tagFilters">\n'
    '                    <!-- Tags injected via JS -->\n'
    '                </div>\n'
    '            </div>'
)


def read_file(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        return f.read().replace('\r', '')


def write_file(path, content):
    content = re.sub(r'\n{4,}', '\n\n\n', content)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)


def fix_paths_for_subdir(html):
    return re.sub(
        r'(href|src)="((?!http|https|//|/|#|data:)[^"]+)"',
        r'\1="../\2"',
        html,
    )


def extract_navbar(c):
    m = re.search(r'<nav class="navbar">.*?</nav>', c, re.DOTALL)
    return m.group(0) if m else None


def extract_footer(c):
    m = re.search(r'<footer class="site-footer">.*?</footer>', c, re.DOTALL)
    return m.group(0) if m else None


def extract_qr(c):
    m = re.search(r'<div id="qr-widget".*?</div>', c, re.DOTALL)
    return m.group(0).strip() if m else None


def inject_hreflang(content):
    content = re.sub(r'\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">', '', content)
    m = re.search(r'<link rel="canonical" href="([^"]+)">', content)
    if m:
        url = m.group(1).rstrip('/')
        hl = (
            '\n    <link rel="alternate" hreflang="x-default" href="' + url + '">'
            '\n    <link rel="alternate" hreflang="en" href="' + url + '?lang=en">'
            '\n    <link rel="alternate" hreflang="es" href="' + url + '?lang=es">'
            '\n    <link rel="alternate" hreflang="ja" href="' + url + '?lang=jp">'
            '\n    <link rel="alternate" hreflang="fr" href="' + url + '?lang=fr">'
        )
        content = re.sub(r'(<link rel="canonical" href="[^"]+">)', r'\1' + hl, content)
    return content


def standardize_file(path, navbar, footer, qr, is_subdir):
    print('  Processing: ' + path)
    c = read_file(path)

    nav = fix_paths_for_subdir(navbar) if is_subdir else navbar
    foot = fix_paths_for_subdir(footer) if is_subdir else footer
    qr2 = fix_paths_for_subdir(qr) if (is_subdir and qr) else qr

    # 1. Navbar
    c = re.sub(r'<nav class="navbar">.*?</nav>', nav, c, flags=re.DOTALL)

    # 2. Footer
    c = re.sub(r'<footer class="site-footer">.*?</footer>', foot, c, flags=re.DOTALL)

    # 3. Fix JS script src paths for subdirs
    if is_subdir:
        c = re.sub(r'<script src="(?!\.\./|http)js/', '<script src="../js/', c)

    # 4. Adsterra head scripts - remove all, re-inject
    c = re.sub(
        r'\s*<script[^>]*src="[^"]*profitablecpmratenetwork\.com[^"]*"[^>]*>\s*</script>',
        '', c
    )
    c = re.sub(r'(</head>)', '\n    ' + ADSTERRA_HEAD + '\n\\1', c, flags=re.IGNORECASE)

    # 5. Skyscrapers - remove all, re-inject after <body>
    c = re.sub(
        r'(?:<!-- Sticky Skyscraper Ads.*?-->)?\s*'
        r'<div class="skyscraper skyscraper-left">.*?</div>\s*'
        r'<div class="skyscraper skyscraper-right">.*?</div>',
        '', c, flags=re.DOTALL
    )
    c = re.sub(r'(<body[^>]*>)', r'\1\n' + SKYSCRAPERS + '\n', c, flags=re.IGNORECASE)

    # 6. Leaderboard ad - inject after first </header> if missing
    if 'class="ad-container leaderboard"' not in c:
        c = re.sub(r'(</header>)', r'\1\n\n    ' + LEADERBOARD_AD + '\n', c, count=1)

    # 7. Remove all old sidebar ad divs
    c = re.sub(
        r'\s*(?:<!--[^\n]*Ad Sidebar[^\n]*-->\s*)?<div class="ad-container sidebar-ad[^"]*">.*?</div>',
        '', c, flags=re.DOTALL
    )
    # Remove ExoClick comment blocks
    c = re.sub(r'\s*<!--\s*ExoClick[^\n]*-->\s*', '', c)

    # 8. Replace entire sidebar with canonical version (filters + 2 ads)
    def rep_sidebar(m):
        return (
            '<aside class="sidebar">\n'
            '            ' + SIDEBAR_FILTERS + '\n\n'
            '            ' + SIDEBAR_ADS + '\n'
            '        </aside>'
        )
    c = re.sub(r'<aside class="sidebar">.*?</aside>', rep_sidebar, c, flags=re.DOTALL)

    # 9. Sticky bottom ad - remove old, inject fresh before </body>
    c = re.sub(
        r'(?:<!-- Sticky Bottom Ad -->\s*)?<div id="sticky-bottom-ad">.*?</div>\s*',
        '', c, flags=re.DOTALL
    )
    c = re.sub(r'(</body>)', '\n    ' + STICKY_BOTTOM_AD + '\n\\1', c, flags=re.IGNORECASE)

    # 10. QR widget - remove old, inject before </body>
    c = re.sub(r'\s*<div id="qr-widget"[^>]*>.*?</div>\s*', '', c, flags=re.DOTALL)
    if qr2:
        c = re.sub(r'(</body>)', '\n    ' + qr2 + '\n\\1', c, flags=re.IGNORECASE)

    # 11. hreflang
    c = inject_hreflang(c)

    write_file(path, c)


def standardize_index(content):
    print('  Processing: index.html (ads + hreflang only)')
    # Adsterra
    content = re.sub(
        r'\s*<script[^>]*src="[^"]*profitablecpmratenetwork\.com[^"]*"[^>]*>\s*</script>',
        '', content
    )
    content = re.sub(
        r'(</head>)', '\n    ' + ADSTERRA_HEAD + '\n\\1', content, flags=re.IGNORECASE
    )
    # Skyscrapers
    content = re.sub(
        r'(?:<!-- Sticky Skyscraper Ads.*?-->)?\s*'
        r'<div class="skyscraper skyscraper-left">.*?</div>\s*'
        r'<div class="skyscraper skyscraper-right">.*?</div>',
        '', content, flags=re.DOTALL
    )
    content = re.sub(
        r'(<body[^>]*>)', r'\1\n' + SKYSCRAPERS + '\n', content, flags=re.IGNORECASE
    )
    # hreflang
    content = inject_hreflang(content)
    return content


def run():
    if not os.path.exists(INDEX_FILE):
        print('ERROR: index.html not found. Run from vault root directory.')
        return

    print('Reading index.html as template...')
    ic = read_file(INDEX_FILE)
    navbar = extract_navbar(ic)
    footer = extract_footer(ic)
    qr = extract_qr(ic)

    print('  navbar found: ' + str(navbar is not None))
    print('  footer found: ' + str(footer is not None))
    print('  qr found:     ' + str(qr is not None))

    if not navbar or not footer:
        print('ERROR: Could not extract navbar or footer from index.html')
        return

    print('\nRoot static pages...')
    for fname in ROOT_FILES:
        if os.path.exists(fname):
            standardize_file(fname, navbar, footer, qr, is_subdir=False)
        else:
            print('  Skipping (not found): ' + fname)

    print('\nCategory pages...')
    if os.path.exists(CATEGORY_DIR):
        for fname in sorted(os.listdir(CATEGORY_DIR)):
            if fname.endswith('.html'):
                standardize_file(
                    os.path.join(CATEGORY_DIR, fname),
                    navbar, footer, qr, is_subdir=True
                )

    print('\nBlog pages...')
    if os.path.exists(BLOG_DIR):
        for fname in sorted(os.listdir(BLOG_DIR)):
            if fname.endswith('.html'):
                standardize_file(
                    os.path.join(BLOG_DIR, fname),
                    navbar, footer, qr, is_subdir=True
                )

    print('\nApplying to index.html...')
    ic = standardize_index(ic)
    write_file(INDEX_FILE, ic)

    print('\nDONE - Standardization complete.')


if __name__ == '__main__':
    run()
