import re
import json
import os

DATA_FILE = "js/data.js"

def clean_data():
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the array content
    match = re.search(r'const sitesData = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: Could not find sitesData array in data.js")
        return

    array_content = match.group(1)
    
    # Extract individual site objects
    # We use a non-greedy match for objects { ... }
    # This might be tricky if there are nested objects, but sitesData is flat.
    site_blocks = re.findall(r'\{\s*id:.*?\s*\}', array_content, re.DOTALL)
    
    clean_sites = []
    for block in site_blocks:
        # Convert JS-like object to JSON-compatible
        # 1. Add quotes to keys
        clean_block = re.sub(r'([{,]\s*)(\w+):', r'\1"\2":', block)
        # 2. Fix trailing commas before }
        clean_block = re.sub(r',\s+\}', r' }', clean_block)
        
        try:
            site = json.loads(clean_block)
            clean_sites.append(site)
        except Exception as e:
            print(f"Failed to parse block: {e}")

    print(f"Parsed {len(clean_sites)} sites.")

    # Reconstruct the file with ensure_ascii=False
    new_array_content = ""
    for i, site in enumerate(clean_sites):
        json_site = json.dumps(site, indent=8, ensure_ascii=False)
        # Fix indentation to match the file's style (4 spaces for the array, 8 for objects)
        json_site = json_site.replace('\n', '\n    ')
        new_array_content += f"\n    {json_site}"
        if i < len(clean_sites) - 1:
            new_array_content += ","

    # Construct the full file
    # We keep the header (everything before const sitesData)
    header_match = re.search(r'(.*?)const sitesData = \[', content, re.DOTALL)
    header = header_match.group(1) if header_match else "// data.js\n\n"
    
    new_full_content = f"{header}const sitesData = [{new_array_content}\n];\n"

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(new_full_content)
    
    print(f"Successfully cleaned {DATA_FILE}")

if __name__ == "__main__":
    clean_data()
