import requests
from bs4 import BeautifulSoup
import json
import re
import random
import time
import uuid
import datetime
import os

# --- Configuration ---
DATA_FILE = "js/data.js"
TARGET_COUNT = 100
QUERIES = [
    "site:t.me anime streaming",
    "site:t.me hentai",
    "site:t.me manga doujin",
    "best free anime sites 2026",
    "new hentai streaming platforms",
    "best manga reader sites 2026",
    "adult games download links",
    "high quality booru sites",
    "uncensored hentai videos"
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
}

def scout_links():
    discovered = []
    for query in QUERIES:
        print(f"Searching for: {query}")
        try:
            url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
            res = requests.get(url, headers=HEADERS, timeout=10)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                links = soup.find_all('a', class_='result__a')
                for link in links:
                    title = link.get_text()
                    href = link.get('href')
                    # Clean DuckDuckGo redirect links
                    if href.startswith("//duckduckgo.com/y.js"):
                        match = re.search(r'uddg=([^&]+)', href)
                        if match:
                            href = requests.utils.unquote(match.group(1))
                    
                    if href and href.startswith("http") and "duckduckgo.com" not in href:
                        discovered.append({"name": title, "url": href})
            
            # Rate limiting
            time.sleep(random.uniform(2, 5))
            if len(discovered) >= TARGET_COUNT * 2:
                break
        except Exception as e:
            print(f"Error searching {query}: {e}")
            
    return discovered

def validate_and_enrich(links, existing_urls):
    valid_sites = []
    for link in links:
        url = link['url']
        
        # Skip if already exists
        if url in existing_urls or url.rstrip('/') in existing_urls:
            continue
            
        print(f"Validating: {url}")
        try:
            # Full GET to check content and metadata
            res = requests.get(url, headers=HEADERS, timeout=8, verify=False)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                
                # Extract meta description
                desc_tag = soup.find('meta', attrs={'name': 'description'})
                desc = desc_tag['content'] if desc_tag and desc_tag.has_attr('content') else link['name']
                
                # Clean description
                desc = desc[:150] + "..." if len(desc) > 150 else desc
                
                # Determine category based on URL and Title
                category = "Uncategorized"
                low_title = link['name'].lower()
                low_url = url.lower()
                
                if "t.me" in low_url:
                    category = "Communities"
                elif any(k in low_title or k in low_url for k in ["anime", "stream", "watch"]):
                    category = "Anime Streaming"
                elif any(k in low_title or k in low_url for k in ["hentai", "xxx", "porn", "adult"]):
                    category = "Hentai Streaming"
                elif any(k in low_title or k in low_url for k in ["manga", "doujin", "read", "comic"]):
                    category = "Manga/Doujin"
                elif any(k in low_title or k in low_url for k in ["game", "vn", "visual novel", "play"]):
                    category = "Games"
                elif any(k in low_title or k in low_url for k in ["booru", "image", "art"]):
                    category = "Images/Boorus"

                site = {
                    "id": str(uuid.uuid4())[:8],
                    "name": link['name'][:50],
                    "url": url,
                    "category": category,
                    "description": desc,
                    "tags": ["Scouted", "Active"],
                    "rating": round(random.uniform(3.5, 4.8), 1),
                    "addedAt": datetime.datetime.now().strftime("%Y-%m-%d")
                }
                valid_sites.append(site)
                if len(valid_sites) >= TARGET_COUNT:
                    break
        except Exception as e:
            print(f"Validation failed for {url}: {e}")
            
    return valid_sites

def update_data_file(new_sites):
    if not new_sites:
        print("No new sites to add.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the insertion point: just before the closing '];' of sitesData
    # We look for the FIRST '];' which should be the end of the array
    insertion_point = content.find('];')
    if insertion_point == -1:
        print("Could not find insertion point '];' in data.js")
        return

    # Look for the last curly brace before '];' to determine indentation
    last_brace_match = list(re.finditer(r'\}', content[:insertion_point]))
    if not last_brace_match:
        print("Could not find any entries in data.js to match indentation")
        indent = "    "
    else:
        last_brace_pos = last_brace_match[-1].start()
        # Find indentation of the last brace
        line_start = content.rfind('\n', 0, last_brace_pos) + 1
        indent = content[line_start:last_brace_pos]

    # Format new sites
    formatted_entries = ""
    for i, site in enumerate(new_sites):
        json_site = json.dumps(site, indent=len(indent))
        # Adjust indentation
        json_site = json_site.replace('\n', '\n' + indent)
        formatted_entries += f",\n{indent}{json_site}"

    new_content = content[:insertion_point] + formatted_entries + content[insertion_point:]
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Successfully added {len(new_sites)} new sites to {DATA_FILE}")

def main():
    print("Starting HV Scout...")
    
    # Get existing URLs to avoid duplicates
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            existing_urls = re.findall(r'"url":\s*"([^"]+)"', content)
    except Exception:
        existing_urls = []

    links = scout_links()
    print(f"Found {len(links)} potential links. Starting validation...")
    
    new_sites = validate_and_enrich(links, existing_urls)
    update_data_file(new_sites)

if __name__ == "__main__":
    main()
