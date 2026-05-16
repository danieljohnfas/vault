import os
import re
from bs4 import BeautifulSoup

INDEX_FILE = "index.html"
CATEGORY_DIR = "category"
BLOG_DIR = "blog"

def get_section(soup, selector):
    section = soup.select_one(selector)
    return str(section) if section else None

def standardize_file(file_path, base_navbar, base_footer, base_qr, is_subdir=True):
    print(f"Standardizing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to adjust asset paths in the base sections if it's in a subdirectory
    # index.html uses: css/style.css, js/data.js
    # Subdir files should use: ../css/style.css, ../js/data.js
    
    current_navbar = base_navbar
    current_footer = base_footer
    current_qr = base_qr
    
    if is_subdir:
        # Replace paths like href="css/..." with href="../css/..."
        current_navbar = re.sub(r'(href|src)="((?!http|https|/|#).+?)"', r'\1="../\2"', current_navbar)
        current_footer = re.sub(r'(href|src)="((?!http|https|/|#).+?)"', r'\1="../\2"', current_footer)
        current_qr = re.sub(r'(href|src)="((?!http|https|/|#).+?)"', r'\1="../\2"', current_qr)

    # Use regex to replace sections to avoid BeautifulSoup reformatting the whole file
    # (BeautifulSoup can sometimes mess up script tags or attributes)
    
    # 1. Navbar
    content = re.sub(r'<nav class="navbar">.*?</nav>', current_navbar, content, flags=re.DOTALL)
    
    # 2. Footer
    content = re.sub(r'<footer class="site-footer">.*?</footer>', current_footer, content, flags=re.DOTALL)
    
    # 3. QR Widget (find by ID)
    content = re.sub(r'<div id="qr-widget".*?</div>\s*<style>.*?</style>', current_qr, content, flags=re.DOTALL)

    # 4. Standardize the Age Gate (some might be missing the 'hidden' class)
    # index.html age gate:
    # <div class="age-gate" id="ageGate">...</div>
    # Category pages often have <div class="age-gate hidden" id="ageGate">...</div>
    # We should keep it hidden by default if that's the pattern, or follow index.html.
    # Actually, index.html doesn't have 'hidden' by default in the HTML, but JS adds it.
    
    # 5. Fix script paths at the bottom
    if is_subdir:
        content = re.sub(r'<script src="js/(.*?)"', r'<script src="../js/\1"', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def run_standardization():
    if not os.path.exists(INDEX_FILE):
        print("Error: index.html not found")
        return

    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        index_soup = BeautifulSoup(f.read(), 'html.parser')

    base_navbar = get_section(index_soup, '.navbar')
    base_footer = get_section(index_soup, '.site-footer')
    
    # Extract QR widget and its style
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        index_content = f.read()
    qr_match = re.search(r'<div id="qr-widget".*?</div>\s*<style>.*?</style>', index_content, re.DOTALL)
    base_qr = qr_match.group(0) if qr_match else ""

    # Standardize categories
    if os.path.exists(CATEGORY_DIR):
        for file in os.listdir(CATEGORY_DIR):
            if file.endswith(".html"):
                standardize_file(os.path.join(CATEGORY_DIR, file), base_navbar, base_footer, base_qr, is_subdir=True)

    # Standardize blog
    if os.path.exists(BLOG_DIR):
        for file in os.listdir(BLOG_DIR):
            if file.endswith(".html"):
                standardize_file(os.path.join(BLOG_DIR, file), base_navbar, base_footer, base_qr, is_subdir=True)

    print("UI Standardization complete.")

if __name__ == "__main__":
    run_standardization()
