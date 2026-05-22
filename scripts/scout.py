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
        "https://www.hentaihome.net/"
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

def scout_from_search():
    discovered = []
    # DuckDuckGo Lite doesn't require JS and is less likely to block simple scripts
    # Updated queries based on Google Search Console performance data
    search_queries = [
        "best doujin sites 2026",
        "best doujinshi websites",
        "best hentai streaming sites 2026",
        "nhentai alternatives",
        "hanime alternatives",
        "best hentai boorus",
        "game free hentai browser japan",
        "uncensored hentai games list",
        "best hentai manga sites",
        "anime torrent sites",
        "site:t.me hentai channels"
    ]
    
    for query in search_queries:
        print(f"Searching: {query}")
        try:
            search_url = f"https://duckduckgo.com/lite/?q={query.replace(' ', '+')}"
            res = session.get(search_url, headers=HEADERS, timeout=15)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                # In DDG Lite, results are in tables
                for link in soup.find_all('a', class_='result-link', href=True):
                    href = link.get('href')
                    title = link.get_text().strip()
                    if href and href.startswith("http") and "duckduckgo" not in href:
                        discovered.append({"name": title, "url": href})
            
            time.sleep(random.uniform(3, 6))
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

                category = "Uncategorized"
                low_title = link['name'].lower()
                low_url = url.lower()
                
                if "t.me" in low_url: category = "Communities"
                elif any(k in low_title or k in low_url for k in ["anime", "stream", "episodes", "watch"]): category = "Anime Streaming"
                elif any(k in low_title or k in low_url for k in ["hentai", "xxx", "porn", "adult"]): category = "Hentai Streaming"
                elif any(k in low_title or k in low_url for k in ["manga", "doujin", "comic", "read"]): category = "Manga/Doujin"
                elif any(k in low_title or k in low_url for k in ["game", "vn", "eroge", "play"]): category = "Games"
                elif any(k in low_title or k in low_url for k in ["booru", "image", "gallery", "pic"]): category = "Images/Boorus"

                site = {
                    "id": str(uuid.uuid4())[:8],
                    "name": link['name'][:50],
                    "url": url,
                    "category": category,
                    "description": desc,
                    "description_es": desc_es,
                    "description_jp": desc_jp,
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
    update_data_file(new_sites)

if __name__ == "__main__":
    main()
