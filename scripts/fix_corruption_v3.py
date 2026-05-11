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

        # Dictionary of specific fixes
        reps = {
            'id="themeToggle" class="btn-favorite" title="Toggle Theme" style="background: none; border: 1px solid var(--border); font-size: 1rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">??</button>': 'id="themeToggle" class="btn-favorite" title="Toggle Theme" style="background: none; border: 1px solid var(--border); font-size: 1rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">🌓</button>',
            '<span style="font-size: 1.2rem;">??</span> Surprise Me': '<span style="font-size: 1.2rem;">🎲</span> Surprise Me',
            '?? Scan Me': '📱 Scan Me',
            '??</span> HentaiVault': '💎</span> HentaiVault',
            'aria-label="Search">??</button>': 'aria-label="Search">🔍</button>',
            '??</div>': '🔞</div>',
            'I am 18+ - Enter': 'I am 18+ — Enter',
            '?? EN': '🇺🇸 EN',
            '?? ES': '🇪🇸 ES',
            '?? JP': '🇯🇵 JP'
        }

        for old, new in reps.items():
            content = content.replace(old, new)
        
        # Catch-all for any remaining corrupted emojis in the lang switcher or buttons
        # Match anything that looks like mojibake: weird characters followed by EN/ES/JP
        content = re.sub(r'value="en">.*? EN', 'value="en">🇺🇸 EN', content)
        content = re.sub(r'value="es">.*? ES', 'value="es">🇪🇸 ES', content)
        content = re.sub(r'value="jp">.*? JP', 'value="jp">🇯🇵 JP', content)
        
        # Fix the specific theme toggle ?? if the full string match failed
        content = re.sub(r'id="themeToggle".*?>\?\?</button>', 'id="themeToggle" class="btn-favorite" title="Toggle Theme" style="background: none; border: 1px solid var(--border); font-size: 1rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">🌓</button>', content)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Failed to fix {path}: {e}")

for root, dirs, files in os.walk("."):
    if ".git" in dirs: dirs.remove(".git")
    for file in files:
        if file.endswith(".html"):
            fix_file(os.path.join(root, file))
