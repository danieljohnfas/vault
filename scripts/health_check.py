import requests
import json
import re
import concurrent.futures
import os

# --- Configuration ---
DATA_FILE = "js/data.js"
CONCURRENCY = 10
TIMEOUT = 10

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
}

def check_url(site):
    url = site['url']
    print(f"Checking: {url}")
    try:
        res = requests.get(url, headers=HEADERS, timeout=TIMEOUT, verify=False)
        if res.status_code >= 200 and res.status_code < 400:
            return site, True
        else:
            print(f"Dead (Status {res.status_code}): {url}")
            return site, False
    except Exception as e:
        print(f"Dead (Error {e}): {url}")
        return site, False

def run_health_check():
    print("Starting Global Health Check...")
    
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the sitesData array using regex
    # We find the content between 'const sitesData = [' and '];'
    match = re.search(r'const sitesData = \[(.*?)\s+\];', content, re.DOTALL)
    if not match:
        print("Error: Could not parse sitesData from data.js")
        return

    # Extract individual site objects more robustly
    site_blocks = re.findall(r'\{\s*"id":.*?\s*\}', match.group(1), re.DOTALL)
    
    sites = []
    for block in site_blocks:
        # Convert JS-like object to JSON-compatible
        # 1. Add quotes to keys ONLY (preceded by { or , and followed by :)
        # This prevents corrupting values like https://
        clean_block = re.sub(r'([{,]\s*)(\w+):', r'\1"\2":', block)
        
        # 2. Fix trailing commas before }
        clean_block = re.sub(r',\s+\}', r' }', clean_block)
        
        # 3. Ensure the whole thing is wrapped in valid JSON braces if findall missed them
        if not clean_block.startswith('{'): clean_block = '{' + clean_block
        if not clean_block.endswith('}'): clean_block = clean_block + '}'
        
        try:
            sites.append(json.loads(clean_block))
        except Exception as e:
            print(f"Failed to parse block: {e}")
            # print(f"Raw block: {block}")
            # print(f"Cleaned block: {clean_block}")

    print(f"Loaded {len(sites)} sites for verification.")
    
    alive_sites = []
    dead_count = 0
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
        future_to_site = {executor.submit(check_url, site): site for site in sites}
        for future in concurrent.futures.as_completed(future_to_site):
            site, is_alive = future.result()
            if is_alive:
                alive_sites.append(site)
            else:
                dead_count += 1

    if dead_count == 0:
        print("All sites are healthy.")
        return

    print(f"Health Check Complete: {len(alive_sites)} alive, {dead_count} removed.")

    # Reconstruct the file
    # Instead of full rewrite, we'll replace the array content
    new_array_content = ""
    for i, site in enumerate(alive_sites):
        json_site = json.dumps(site, indent=8, ensure_ascii=False)
        # Fix indentation
        json_site = json_site.replace('\n', '\n    ')
        new_array_content += f"\n    {json_site}"
        if i < len(alive_sites) - 1:
            new_array_content += ","

    # Fix: Use a safer replacement to avoid 'bad escape \u' issues in re.sub
    pattern = r'const sitesData = \[.*?\s+\];'
    replacement = f'const sitesData = [{new_array_content}\n];'
    
    # We use string replace instead of re.sub to avoid template escape issues
    # First we find the exact text to replace
    match = re.search(pattern, content, flags=re.DOTALL)
    if match:
        new_full_content = content[:match.start()] + replacement + content[match.end():]
    else:
        print("Error: Could not find sitesData array for replacement.")
        return


    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(new_full_content)
    
    print("Successfully updated data.js with healthy sites.")

if __name__ == "__main__":
    run_health_check()
