import os
import json
import re
import datetime

def main():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'js', 'data.js')
    blog_dir = os.path.join(base_dir, 'blog')
    i18n_path = os.path.join(base_dir, 'js', 'i18n.js')

    # Read data.js
    with open(data_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract sitesData array
    match = re.search(r'const\s+sitesData\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        print("Could not find sitesData in data.js")
        return
    
    # Parse JSON
    try:
        # data.js might not be strict JSON (single quotes, trailing commas, unquoted keys)
        # Using a simple eval equivalent in python for this specific structure is hard
        # But we can try to extract just the needed fields using regex to be safe
        sites = []
        site_blocks = re.finditer(r'\{[^{}]*id:\s*["\'](.*?)["\'].*?name:\s*["\'](.*?)["\'].*?category:\s*["\'](.*?)["\'].*?rating:\s*([\d\.]+).*?addedAt:\s*["\'](.*?)["\'].*?description:\s*["\'](.*?)["\'].*?\}', content, re.DOTALL | re.IGNORECASE)
        for b in site_blocks:
            sites.append({
                'id': b.group(1),
                'name': b.group(2),
                'category': b.group(3),
                'rating': float(b.group(4)),
                'addedAt': b.group(5),
                'description': b.group(6)
            })
    except Exception as e:
        print(f"Error parsing sites: {e}")
        return

    # Sort by rating and recency
    # We want top 10 highest rated sites added recently
    sites.sort(key=lambda x: (x['rating'], x['addedAt']), reverse=True)
    top_10 = sites[:10]

    # Date info
    now = datetime.datetime.now()
    month_name = now.strftime('%B')
    year = now.strftime('%Y')
    slug = f"top-10-sites-{month_name.lower()}-{year}"
    filename = f"{slug}.html"
    filepath = os.path.join(blog_dir, filename)

    # HTML Generation
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top 10 Hentai & Doujin Sites - {month_name} {year}</title>
    <meta name="description" content="Discover the best new adult sites added to HentaiVault in {month_name} {year}. We ranked the top 10 platforms for manga, streaming, and games.">
    <link rel="canonical" href="https://hentaivault.me/blog/{slug}">
    <link rel="icon" type="image/png" href="../assets/favicon.png">
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#09090b">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="logo"><span class="logo-icon">💎</span> HentaiVault</a>
            <div class="nav-actions">
                <a href="/blog" class="btn-outline">Back to Blog</a>
            </div>
        </div>
    </nav>

    <main class="review-layout" style="margin-top: 100px; max-width: 800px; padding: 24px; margin-left: auto; margin-right: auto;">
        <article class="review-content">
            <h1 style="color: var(--text-main); font-size: 2.5rem; margin-bottom: 20px;">Top 10 Hentai & Doujin Sites — {month_name} {year}</h1>
            <p style="color: var(--text-muted); margin-bottom: 40px;">Published: <strong>{month_name} {year}</strong></p>
            
            <p>Every month, the HentaiVault team reviews hundreds of adult platforms to find the best experiences. For {month_name} {year}, we've selected the top 10 highest-rated sites across all categories.</p>
"""

    for i, site in enumerate(top_10):
        html_content += f"""
            <h2 style="color: var(--text-main); margin-top: 40px;">{i+1}. {site['name']}</h2>
            <p><strong>Category:</strong> {site['category']} | <strong>Rating:</strong> {site['rating']} ★</p>
            <p>{site['description']}</p>
            <a href="/site?id={site['id']}" class="btn-primary" style="display: inline-block; margin-top: 10px; padding: 10px 20px; border-radius: 20px; color: white;">Read Full Review &rarr;</a>
"""

    html_content += """
        </article>
    </main>
    <footer class="site-footer">
        <div class="footer-content" style="text-align: center;">
            <p class="disclaimer">© 2026 HentaiVault. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>"""

    # Write file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Generated {filepath}")

    # Update i18n.js
    try:
        with open(i18n_path, 'r', encoding='utf-8') as f:
            i18n_content = f.read()
        
        # Find the META_TRANSLATIONS block
        if f'"{slug}"' not in i18n_content:
            new_entry = f"""
    "{slug}": {{
        en: {{ title: "Top 10 Sites - {month_name} {year}", desc: "The best new sites added this month." }}
    }},"""
            i18n_content = re.sub(r'(const\s+META_TRANSLATIONS\s*=\s*\{)', r'\1' + new_entry, i18n_content)
            with open(i18n_path, 'w', encoding='utf-8') as f:
                f.write(i18n_content)
            print(f"Updated i18n.js with {slug}")
    except Exception as e:
        print(f"Failed to update i18n.js: {e}")

if __name__ == "__main__":
    main()
