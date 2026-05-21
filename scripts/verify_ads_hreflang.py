"""
verify_ads_hreflang.py
Validates the presence of ads, popunders, skyscrapers, hreflangs, and widgets on every HTML page.
"""
import os
import re

ROOT_DIR = "."
CATEGORY_DIR = "category"
BLOG_DIR = "blog"

def verify_file(path, is_category=False, is_blog=False, is_static_or_review=False):
    errors = []
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # 1. Popunder scripts check
    if 'profitablecpmratenetwork.com' not in content:
        errors.append("Missing profitablecpmratenetwork.com Adsterra script in <head>")

    # 2. Skyscrapers check (left and right)
    if 'class="skyscraper skyscraper-left"' not in content:
        errors.append("Missing skyscraper-left div")
    if 'class="skyscraper skyscraper-right"' not in content:
        errors.append("Missing skyscraper-right div")

    # 3. Sticky bottom ad check
    if 'id="sticky-bottom-ad"' not in content:
        errors.append("Missing sticky bottom ad container")

    # 4. QR widget check
    if 'id="qr-widget"' not in content:
        errors.append("Missing qr-widget")

    # 5. Hreflang checks
    if 'hreflang="fr"' not in content:
        errors.append("Missing French hreflang alternate tag")
    if 'hreflang="es"' not in content:
        errors.append("Missing Spanish hreflang alternate tag")
    if 'hreflang="ja"' not in content:
        errors.append("Missing Japanese hreflang alternate tag")

    # 6. Leaderboard ad check (except index.html)
    if os.path.basename(path) != 'index.html':
        if 'class="ad-container leaderboard"' not in content:
            errors.append("Missing leaderboard ad container")

    # 7. Sidebar ads check for category pages
    if is_category:
        if 'class="ad-container sidebar-ad"' not in content:
            errors.append("Missing sidebar-ad container")

    return errors

def run():
    print("Running monetization and localization audit...")
    failed = False

    # Root pages
    for fname in ["index.html", "about.html", "contact.html", "privacy.html", "terms.html", "disclaimer.html", "dmca.html", "site.html"]:
        if os.path.exists(fname):
            errs = verify_file(fname, is_static_or_review=(fname != 'index.html'))
            if errs:
                print(f"[FAIL] {fname} failed verification:")
                for e in errs:
                    print(f"   - {e}")
                failed = True
            else:
                print(f"[PASS] {fname} passed")

    # Category pages
    print("\nAuditing categories...")
    if os.path.exists(CATEGORY_DIR):
        for fname in sorted(os.listdir(CATEGORY_DIR)):
            if fname.endswith(".html"):
                p = os.path.join(CATEGORY_DIR, fname)
                errs = verify_file(p, is_category=True)
                if errs:
                    print(f"[FAIL] {p} failed verification:")
                    for e in errs:
                        print(f"   - {e}")
                    failed = True
                else:
                    print(f"[PASS] {p} passed")

    # Blog pages
    print("\nAuditing blogs...")
    if os.path.exists(BLOG_DIR):
        for fname in sorted(os.listdir(BLOG_DIR)):
            if fname.endswith(".html"):
                p = os.path.join(BLOG_DIR, fname)
                errs = verify_file(p, is_blog=True)
                if errs:
                    print(f"[FAIL] {p} failed verification:")
                    for e in errs:
                        print(f"   - {e}")
                    failed = True
                else:
                    print(f"[PASS] {p} passed")

    if not failed:
        print("\nALL PAGES PASSED! Ad coverage is 100% complete and localization metadata is correct.")
    else:
        print("\nAudit failed. Some pages are missing monetizations or translations.")

if __name__ == "__main__":
    run()
