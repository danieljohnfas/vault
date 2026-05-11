import os
import re

def fix_file(path):
    print(f"Fixing {path}...")
    try:
        with open(path, 'rb') as f:
            raw = f.read()
        
        try:
            content = raw.decode('utf-8')
        except:
            content = raw.decode('latin-1')

        # Restoration Dictionary
        reps = {
            '<span class="logo-icon">??</span>': '<span class="logo-icon">💎</span>',
            '<button class="btn-search-mobile" id="btnSearchMobile" aria-label="Search">??</button>': '<button class="btn-search-mobile" id="btnSearchMobile" aria-label="Search">🔍</button>',
            '<option value="en">???? EN</option>': '<option value="en">🇺🇸 EN</option>',
            '<option value="es">???? ES</option>': '<option value="es">🇪🇸 ES</option>',
            '<option value="jp">???? JP</option>': '<option value="jp">🇯🇵 JP</option>',
            '<div id="qr-label">?? Scan Me</div>': '<div id="qr-label">📱 Scan Me</div>',
            '<div class="age-gate-icon">??</div>': '<div class="age-gate-icon">🔞</div>',
            'I am 18+ - Enter': 'I am 18+ — Enter',
            'content: \'?\';': 'content: \'📱\';',
            'content: \'?\'': 'content: \'📱\''
        }

        for old, new in reps.items():
            content = content.replace(old, new)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Failed to fix {path}: {e}")

# Fix root files
for root, dirs, files in os.walk("."):
    if ".git" in dirs: dirs.remove(".git")
    for file in files:
        if file.endswith(".html"):
            fix_file(os.path.join(root, file))
