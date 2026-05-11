import os
import re

def fix_file(path):
    print(f"Fixing {path}...")
    try:
        with open(path, 'rb') as f:
            raw = f.read()
        
        # Try to decode as utf-8, fallback to latin-1
        try:
            content = raw.decode('utf-8')
        except:
            content = raw.decode('latin-1')

        # Fix Emojis
        content = content.replace('<div class="age-gate-icon">??</div>', '<div class="age-gate-icon">🔞</div>')
        content = content.replace("<div class=\"age-gate-icon\">??</div>", "<div class=\"age-gate-icon\">🔞</div>")
        
        # Fix QR Icon
        content = content.replace("content: '?';", "content: '📱';")
        content = content.replace("content: '?'", "content: '📱'")
        
        # Fix Buttons
        content = content.replace("I am 18+ - Enter", "I am 18+ — Enter")

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Failed to fix {path}: {e}")

# Fix root files
for f in ["index.html", "about.html", "contact.html", "disclaimer.html", "dmca.html", "privacy.html", "terms.html", "site.html"]:
    if os.path.exists(f):
        fix_file(f)

# Fix category files
if os.path.exists("category"):
    for f in os.listdir("category"):
        if f.endswith(".html"):
            fix_file(os.path.join("category", f))
