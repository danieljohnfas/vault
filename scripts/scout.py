import requests
from bs4 import BeautifulSoup
import json
import re
import random
import time
import uuid
import datetime
import os
from deep_translator import GoogleTranslator
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# --- Configuration ---
DATA_FILE = "js/data.js"
TARGET_COUNT = 100
BLACKLIST = [
    "scam", "phishing", "malware", "virus", "hack", "crack", "free-money",
    "casino", "betting", "gambling", "crypto-giveaway", "survey-vortex",
    "win-iphone", "prize-winner", "best-hentai-sites.com", "top-hentai-sites.com"
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

# Setup robust session
session = requests.Session()
retry = Retry(connect=3, backoff_factor=1)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

def is_compliant(text):
    if not text: return False
    low_text = text.lower()
    for word in BLACKLIST:
        if word in low_text:
            return False
    return True

def translate_text(text, target_lang):
    if not text or len(text) < 5: return text
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        return translated
    except Exception as e:
        print(f"Translation failed ({target_lang}): {e}")
        return text

def scout_from_directories():
    discovered = []
    sources = [
        "https://everythingmoe.com/",
        "https://theindex.moe/",
        "https://www.hentairules.net/index2.html",
        "https://moe.guide/",
        "https://thehentaiworld.com/hentai-sites/",
        "https://hentai-cosplay.com/",
        "https://www.hentaicloud.com/",
        "https://www.hentaihome.net/",
        "https://fap.directory/",
        "https://nsfw-links.com/",
        "https://pornsites.xxx/",
        "https://www.adult-site-directory.com/",
        "https://anime-index.org/",
        "https://www.fakku.net/links"
    ]
    
    for url in sources:
        print(f"Scouting source: {url}")
        try:
            res = session.get(url, headers=HEADERS, timeout=20)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                links = soup.find_all('a', href=True)
                print(f"Found {len(links)} raw links in {url}")
                for link in links:
                    href = link.get('href')
                    title = link.get_text().strip()
                    
                    if href and href.startswith("http"):
                        domain = url.split('/')[2]
                        # Filter out internal, social media, and ads
                        if domain not in href and not any(x in href for x in ["facebook", "twitter", "google", "adsterra", "exoclick"]):
                            # Normalize URL
                            href = href.split('?')[0].rstrip('/')
                            discovered.append({"name": title if title and len(title) > 2 else href, "url": href})
            
            time.sleep(random.uniform(1, 3))
        except Exception as e:
            print(f"Error scouting {url}: {e}")
            
    return discovered

def generate_dynamic_queries():
    bases = [
        "doujin sites", "hentai streaming", "hentai boorus", "anime streaming",
        "read hentai manga", "visual novel adult games", "hentai communities",
        "eroge download", "free hentai comics", "nsfw anime games", "uncensored hentai",
        "hentai games list", "best doujinshi portals", "watch hentai free"
    ]
    modifiers = [
        "2026", "free", "no ads", "best", "top", "list", "directory",
        "unblocked", "mobile friendly", "high quality", "hd", "english sub",
        "raw", "translated", "forums", "recommendations", "reddit alternatives"
    ]
    
    queries = set()
    while len(queries) < 15:
        base = random.choice(bases)
        mod = random.choice(modifiers)
        if random.random() > 0.5:
            queries.add(f"{mod} {base}")
        else:
            queries.add(f"{base} {mod}")
            
    return list(queries)

def scout_with_tavily_api(query):
    api_key = os.environ.get('TAVILY_API_KEY')
    if not api_key: return []
    discovered = []
    try:
        res = requests.post(
            "https://api.tavily.com/search",
            json={"api_key": api_key, "query": query, "max_results": 10},
            timeout=10
        )
        if res.status_code == 200:
            data = res.json()
            for r in data.get("results", []):
                discovered.append({"name": r.get("title", ""), "url": r.get("url", "")})
    except Exception as e:
        print(f"Tavily API error: {e}")
    return discovered

def scout_with_ddg_lib(query):
    discovered = []
    try:
        from duckduckgo_search import DDGS
        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=10)
            if results:
                for r in results:
                    discovered.append({"name": r.get("title", ""), "url": r.get("href", "")})
    except ImportError:
        print("duckduckgo_search not installed.")
    except Exception as e:
        print(f"DDG lib error: {e}")
    return discovered

def scout_from_search():
    discovered = []
    search_queries = generate_dynamic_queries()
    print(f"Generated {len(search_queries)} dynamic search queries.")
    
    use_official_api = bool(os.environ.get('TAVILY_API_KEY'))
    print(f"Tavily API Key configured: {use_official_api}")
    
    for query in search_queries:
        print(f"Searching: {query}")
        try:
            results = []
            if use_official_api:
                results = scout_with_tavily_api(query)
            
            # Fallback to DDG library if Tavily returned nothing or is unconfigured
            if not results:
                results = scout_with_ddg_lib(query)
                
            discovered.extend(results)
            time.sleep(random.uniform(2, 4))
        except Exception as e:
            print(f"Search failed for {query}: {e}")
            
    return discovered

def validate_and_enrich(links, existing_urls):
    valid_sites = []
    seen_urls = set(existing_urls)
    
    # Shuffle links to get a variety
    random.shuffle(links)
    
    for link in links:
        url = link['url']
        if url in seen_urls: continue
        if not is_compliant(link['name']): continue
        
        # Avoid common directory sites themselves
        if any(x in url for x in ["everythingmoe", "theindex", "hentairules", "moe.guide"]): continue

        print(f"Validating: {url}")
        try:
            # Quick head request first
            res = session.head(url, headers=HEADERS, timeout=5, allow_redirects=True)
            if res.status_code >= 400: continue
            
            # Now get full content
            res = session.get(url, headers=HEADERS, timeout=8, verify=True)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                desc_tag = soup.find('meta', attrs={'name': 'description'}) or \
                           soup.find('meta', attrs={'property': 'og:description'})
                
                desc = desc_tag['content'] if desc_tag and desc_tag.has_attr('content') else ""
                if not desc or len(desc) < 10:
                    desc = f"Discover {link['name']} - A high quality portal for your favorite content."
                
                desc = desc[:150]
                if not is_compliant(desc): continue

                print(f"Processing translations for: {link['name']}")
                desc_es = translate_text(desc, 'es')
                desc_jp = translate_text(desc, 'ja')
                desc_fr = translate_text(desc, 'fr')
                desc_pt = translate_text(desc, 'pt')
                desc_hi = translate_text(desc, 'hi')
                desc_ar = translate_text(desc, 'ar')
                desc_de = translate_text(desc, 'de')

                category = "Communities"
                low_title = link['name'].lower()
                low_url = url.lower()
                
                if "t.me" in low_url: category = "Communities"
                elif any(k in low_title or k in low_url for k in ["anime", "stream", "episodes", "watch"]): category = "Anime Streaming"
                elif any(k in low_title or k in low_url for k in ["hentai", "xxx", "porn", "adult", "tube", "video"]): category = "Hentai Streaming"
                elif any(k in low_title or k in low_url for k in ["manga", "doujin", "comic", "read", "book"]): category = "Manga/Doujin"
                elif any(k in low_title or k in low_url for k in ["game", "vn", "eroge", "play", "rpg"]): category = "Games"
                elif any(k in low_title or k in low_url for k in ["booru", "image", "gallery", "pic"]): category = "Images/Boorus"

                site = {
                    "id": str(uuid.uuid4())[:8],
                    "name": link['name'][:50],
                    "url": url,
                    "category": category,
                    "description": desc,
                    "description_es": desc_es,
                    "description_jp": desc_jp,
                    "description_fr": desc_fr,
                    "description_pt": desc_pt,
                    "description_hi": desc_hi,
                    "description_ar": desc_ar,
                    "description_de": desc_de,
                    "tags": ["Scouted", "Active", "New"],
                    "rating": 0,
                    "addedAt": datetime.datetime.now().strftime("%Y-%m-%d")
                }
                valid_sites.append(site)
                seen_urls.add(url)
                print(f"✅ Added: {link['name']} ({len(valid_sites)}/{TARGET_COUNT})")
                
                if len(valid_sites) >= TARGET_COUNT:
                    break
        except Exception as e:
            # print(f"❌ Failed {url}: {e}")
            pass
            
    return valid_sites

def update_data_file(new_sites):
    if not new_sites:
        print("No new sites to add.")
        return
        
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_match = re.search(r'const sitesData\s*=\s*\[', content)
    if not start_match:
        print("Error: Could not find sitesData array in data.js")
        return
        
    start_pos = start_match.end()
    end_pos = content.find('];', start_pos)
    if end_pos == -1:
        print("Error: Could not find end of sitesData array in data.js")
        return

    indent = "    "
    formatted_entries = ""
    
    array_content = content[start_pos:end_pos].strip()
    needs_initial_comma = len(array_content) > 0 and not array_content.endswith(',')

    for i, site in enumerate(new_sites):
        json_site = json.dumps(site, indent=4, ensure_ascii=False)
        json_site = json_site.replace('\n', '\n' + indent)
        prefix = "," if (i == 0 and needs_initial_comma) or i > 0 else ""
        formatted_entries += f"{prefix}\n{indent}{json_site}"

    new_content = content[:end_pos].rstrip() + formatted_entries + "\n];" + content[end_pos+2:]
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully added {len(new_sites)} sites to {DATA_FILE}")

def main():
    print(f"Starting Scout... Target: {TARGET_COUNT} new sites.")
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            # More robust URL extraction
            existing_urls = re.findall(r'"url":\s*"([^"]+)"', content)
            print(f"Found {len(existing_urls)} existing sites in database.")
    except: 
        existing_urls = []
        print("Starting with empty database.")
        
    links = scout_from_search()
    if len(links) < TARGET_COUNT:
        links += scout_from_directories()
        
    print(f"Discovered {len(links)} potential links. Starting validation...")
    new_sites = validate_and_enrich(links, existing_urls)
    
    # --- Starvation Check ---
    if len(new_sites) < 20:
        warning_msg = f"⚠️ CRITICAL STARVATION ALERT: Scout only added {len(new_sites)} sites today!"
        print(warning_msg)
        try:
            with open("scripts/starvation_alert.log", "a", encoding="utf-8") as af:
                af.write(f"{datetime.datetime.now().isoformat()} - {warning_msg}\n")
        except:
            pass
            
    update_data_file(new_sites)

    # Auto-regenerate sitemap.xml with hreflang tags for all 8 languages
    try:
        import subprocess, sys
        sitemap_script = os.path.join(os.path.dirname(__file__), "generate_sitemap.py")
        if os.path.exists(sitemap_script):
            subprocess.run([sys.executable, sitemap_script], check=True)
            print("✅ sitemap.xml regenerated automatically")
        else:
            print("⚠️  generate_sitemap.py not found — run it manually to update sitemap")
    except Exception as e:
        print(f"⚠️  Sitemap regeneration failed: {e}")

if __name__ == "__main__":
    main()
