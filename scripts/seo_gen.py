import re
import os
import datetime

# --- Configuration ---
DATA_FILE = "js/data.js"
SITEMAP_FILE = "sitemap.xml"
BASE_URL = "https://hentaivault.me"

CATEGORIES = [
    "anime-streaming",
    "hentai-streaming",
    "manga-doujin",
    "images-boorus",
    "games",
    "communities",
    "downloads",
    "visual-novels",
    "adult-studios",
    "adult-vr",
    "premium-creators",
    "adult-dating",
    "adult-stores",
    "adult-tubes",
    "audio-asmr",
    "creator-platforms",
    "erotica-reading",
    "news-info",
    "live-cams"
]

def generate_sitemap():
    print("Generating dynamic sitemap...")
    
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Get last update date
    lastmod = datetime.datetime.now().strftime("%Y-%m-%d")

    # Header
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    # Static Pages
    static_pages = [
        {"url": "/", "priority": "1.0", "changefreq": "daily"},
        {"url": "/about", "priority": "0.5", "changefreq": "monthly"},
        {"url": "/contact", "priority": "0.5", "changefreq": "monthly"},
        {"url": "/privacy", "priority": "0.3", "changefreq": "monthly"},
        {"url": "/terms", "priority": "0.3", "changefreq": "monthly"},
        {"url": "/disclaimer", "priority": "0.3", "changefreq": "monthly"},
        {"url": "/dmca", "priority": "0.3", "changefreq": "monthly"},
        {"url": "/blog", "priority": "0.7", "changefreq": "weekly"},
    ]

    for page in static_pages:
        sitemap += f'  <url>\n    <loc>{BASE_URL}{page["url"]}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <changefreq>{page["changefreq"]}</changefreq>\n    <priority>{page["priority"]}</priority>\n  </url>\n'

    # Category Pages
    for cat in CATEGORIES:
        sitemap += f'  <url>\n    <loc>{BASE_URL}/category/{cat}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n'

    # Blog Articles (Extensionless)
    blog_dir = "blog"
    if os.path.exists(blog_dir):
        for file in os.listdir(blog_dir):
            if file.endswith(".html") and file != "index.html":
                slug = file[:-5]
                sitemap += f'  <url>\n    <loc>{BASE_URL}/blog/{slug}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n'

    # Individual Site Detail Pages (Extensionless)
    ids = re.findall(r'"id":\s*"([^"]+)"', content)
    for site_id in ids:
        sitemap += f'  <url>\n    <loc>{BASE_URL}/site?id={site_id}</loc>\n    <lastmod>{lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n'

    # Footer
    sitemap += '</urlset>'

    with open(SITEMAP_FILE, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    
    print(f"Successfully generated {SITEMAP_FILE} with {len(ids)} site links.")

if __name__ == "__main__":
    generate_sitemap()
