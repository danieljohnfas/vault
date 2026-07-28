import urllib.request
import json
import sys
import os

def generate_static_cards():
    print("Fetching top 30 sites for progressive enhancement...")
    req = urllib.request.Request(
        'https://hentaivault.me/api/sites?sort=popular&limit=30',
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            sites = data.get("sites", [])
    except Exception as e:
        print(f"Error fetching API: {e}")
        return ""
    
    html = '<noscript><div style="text-align: center; color: #ff2a5f; margin: 20px;">For the best experience (infinite scrolling, advanced filters), please enable JavaScript. Here are our top sites:</div></noscript>\n'
    html += '<div id="staticFallbackGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; width: 100%;">\n'
    
    for site in sites:
        domain = urllib.parse.urlparse(site['url']).hostname
        faviconUrl = f"https://www.google.com/s2/favicons?domain={domain}&sz=64"
        name = site.get('name', '').replace('<', '&lt;').replace('>', '&gt;')
        category = site.get('category', '').replace('<', '&lt;').replace('>', '&gt;')
        desc = site.get('description', '').replace('<', '&lt;').replace('>', '&gt;')
        html += f'''
        <div class="card">
            <div class="card-header">
                <img src="{faviconUrl}" alt="" class="card-icon" loading="lazy">
                <div>
                    <div class="card-title"><a href="/site?id={site['id']}" style="color:inherit;text-decoration:none;">{name}</a></div>
                    <div class="card-category">{category}</div>
                </div>
            </div>
            <div class="card-desc" style="font-size:0.85rem; -webkit-line-clamp: 3;">{desc}</div>
            <a href="/out?url={urllib.parse.quote(site['url'])}" target="_blank" rel="nofollow noopener noreferrer" class="btn-visit" style="display:block;text-align:center;margin-top:10px;">Visit {name}</a>
        </div>
        '''
    
    html += '</div>\n'
    return html

def inject_into_index(html):
    index_path = 'index.html'
    if not os.path.exists(index_path):
        print("index.html not found!")
        return
        
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to inject this inside <div id="siteGrid">
    # If the staticFallbackGrid is already there, replace it.
    
    import re
    if 'id="staticFallbackGrid"' in content:
        content = re.sub(r'<noscript>.*?</noscript>\s*<div id="staticFallbackGrid".*?</div>', html, content, flags=re.DOTALL)
    else:
        # Insert inside siteGrid
        content = re.sub(r'(<div id="siteGrid"[^>]*>)', r'\1\n' + html, content)
        
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully injected static fallback into index.html")

if __name__ == "__main__":
    html_cards = generate_static_cards()
    if html_cards:
        inject_into_index(html_cards)
