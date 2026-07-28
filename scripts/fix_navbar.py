import os
import re

NAVBAR_INJECT = """
    <!-- Navigation -->
    <div id="loadingBar"></div>
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="logo" style="text-decoration:none;">
                <span class="logo-icon">🌐</span> HentaiVault
            </a>
            
            <div class="search-bar">
                <div class="search-container">
                    <form onsubmit="handleSearch(event)" style="display:flex; width:100%;">
                        <input type="text" id="searchInput" placeholder="Search 1,900+ sites..." autocomplete="off" style="width:100%;">
                    </form>
                    <div id="searchAutocomplete" class="search-autocomplete"></div>
                </div>
            </div>
"""

def fix_navbar(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it's missing the navbar but has the search mobile button, it's corrupted
    if '<nav class="navbar">' not in content and 'class="btn-search-mobile"' in content:
        # We find the button and insert the missing navbar code before it
        content = re.sub(
            r'(\s*<button class="btn-search-mobile")',
            NAVBAR_INJECT + r'\1',
            content
        )
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {os.path.basename(filepath)}")

if __name__ == "__main__":
    directory = r"c:\\Users\\nnm\\Documents\\projects\\vault"
    for root, dirs, files in os.walk(directory):
        # Exclude node_modules, .git, etc just in case
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                fix_navbar(filepath)
