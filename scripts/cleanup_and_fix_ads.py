"""
cleanup_and_fix_ads.py
- Collapses excess blank lines (3+ consecutive \n -> max 2)
- Injects leaderboard ad into static pages that don't have hero/sidebar
"""
import os
import re

LEADERBOARD_AD = (
    '\n    <!-- Ad Leaderboard -->\n'
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
    '    </div>\n'
)

# Static root pages that have <div class="page-content">
STATIC_ROOT = [
    'about.html', 'contact.html', 'privacy.html',
    'terms.html', 'disclaimer.html', 'dmca.html',
]

def read_f(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        return f.read().replace('\r', '')

def write_f(path, content):
    # Collapse 3+ consecutive newlines to exactly 2
    content = re.sub(r'\n{3,}', '\n\n', content)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)

def process_static_page(path):
    print('  Cleaning: ' + path)
    c = read_f(path)

    # Inject leaderboard after <div class="page-content"> or <main class="legal-content"> if missing
    if 'class="ad-container leaderboard"' not in c:
        if 'class="page-content"' in c:
            c = re.sub(
                r'(<div class="page-content">)',
                r'\1' + LEADERBOARD_AD,
                c, count=1
            )
            print('    + injected leaderboard (page-content)')
        elif 'class="legal-content"' in c:
            c = re.sub(
                r'(<main[^>]*legal-content[^>]*>)',
                r'\1' + LEADERBOARD_AD,
                c, count=1
            )
            print('    + injected leaderboard (legal-content)')

    write_f(path, c)

def process_site_html(path):
    print('  Cleaning: ' + path)
    c = read_f(path)

    # Inject leaderboard after <main class="review-layout"...> if missing
    if 'class="ad-container leaderboard"' not in c:
        c = re.sub(
            r'(<main[^>]*review-layout[^>]*>)',
            r'\1' + LEADERBOARD_AD,
            c, count=1
        )
        print('    + injected leaderboard into site.html')

    write_f(path, c)

def clean_only(path):
    """Just collapse blank lines — for files that already have ads."""
    print('  Cleaning: ' + path)
    c = read_f(path)
    write_f(path, c)

def run():
    print('Static root pages...')
    for fname in STATIC_ROOT:
        if os.path.exists(fname):
            process_static_page(fname)

    print('\nsite.html...')
    if os.path.exists('site.html'):
        process_site_html('site.html')

    print('\nindex.html...')
    if os.path.exists('index.html'):
        clean_only('index.html')

    print('\nCategory pages...')
    for fname in sorted(os.listdir('category')):
        if fname.endswith('.html'):
            clean_only(os.path.join('category', fname))

    print('\nBlog pages...')
    for fname in sorted(os.listdir('blog')):
        if fname.endswith('.html'):
            clean_only(os.path.join('blog', fname))

    print('\nDONE.')

if __name__ == '__main__':
    run()
