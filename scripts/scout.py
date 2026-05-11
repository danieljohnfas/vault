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

# --- Configuration ---
DATA_FILE = "js/data.js"
TARGET_COUNT = 100
BLACKLIST = [
    "scam", "phishing", "malware", "virus", "hack", "crack", "free-money",
    "casino", "betting", "gambling", "crypto-giveaway"
]
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

def is_compliant(text):
    low_text = text.lower()
    for word in BLACKLIST:
        if word in low_text:
            return False
    return True

def translate_text(text, target_lang):
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        return translated
    except Exception as e:
        print(f"Translation failed ({target_lang}): {e}")
        return text

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
                    if href.startswith("//duckduckgo.com/y.js"):
                        match = re.search(r'uddg=([^&]+)', href)
                        if match:
                            href = requests.utils.unquote(match.group(1))
                    
                    if href and href.startswith("http") and "duckduckgo.com" not in href:
                        discovered.append({"name": title, "url": href})
            
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
        if url in existing_urls or url.rstrip('/') in existing_urls:
            continue
            
        if not is_compliant(link['name']):
            continue

        print(f"Validating: {url}")
        try:
            res = requests.get(url, headers=HEADERS, timeout=8, verify=False)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                desc_tag = soup.find('meta', attrs={'name': 'description'})
                desc = desc_tag['content'] if desc_tag and desc_tag.has_attr('content') else link['name']
                desc = desc[:150]
                
                if not is_compliant(desc):
                    continue

                print(f"Translating description...")
                desc_es = translate_text(desc, 'es')
                desc_jp = translate_text(desc, 'ja')

                category = "Uncategorized"
                low_title = link['name'].lower()
                low_url = url.lower()
                
                if "t.me" in low_url: category = "Communities"
                elif any(k in low_title or k in low_url for k in ["anime", "stream"]): category = "Anime Streaming"
                elif any(k in low_title or k in low_url for k in ["hentai", "xxx", "porn"]): category = "Hentai Streaming"
                elif any(k in low_title or k in low_url for k in ["manga", "doujin"]): category = "Manga/Doujin"
                elif any(k in low_title or k in low_url for k in ["game", "vn"]): category = "Games"
                elif any(k in low_title or k in low_url for k in ["booru", "image"]): category = "Images/Boorus"

                site = {
                    "id": str(uuid.uuid4())[:8],
                    "name": link['name'][:50],
                    "url": url,
                    "category": category,
                    "description": desc,
                    "description_es": desc_es,
                    "description_jp": desc_jp,
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
        return
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    insertion_point = content.find('];')
    if insertion_point == -1: return
    
    last_brace_match = list(re.finditer(r'\}', content[:insertion_point]))
    if not last_brace_match:
        indent = "    "
    else:
        last_brace_pos = last_brace_match[-1].start()
        line_start = content.rfind('\n', 0, last_brace_pos) + 1
        indent = content[line_start:last_brace_pos]

    formatted_entries = ""
    for site in new_sites:
        json_site = json.dumps(site, indent=len(indent))
        json_site = json_site.replace('\n', '\n' + indent)
        formatted_entries += f",\n{indent}{json_site}"

    new_content = content[:insertion_point] + formatted_entries + content[insertion_point:]
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            existing_urls = re.findall(r'url:\s*"([^"]+)"', content)
    except: existing_urls = []
    links = scout_links()
    new_sites = validate_and_enrich(links, existing_urls)
    update_data_file(new_sites)

if __name__ == "__main__":
    main()
