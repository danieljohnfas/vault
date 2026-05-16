import json
import re
import os

DATA_FILE = "js/data.js"

def enhance_metadata():
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'const sitesData = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: Could not find sitesData array.")
        return

    array_content = match.group(1)
    site_blocks = re.findall(r'\{\s*"id":.*?\s*\}', array_content, re.DOTALL)
    
    sites = []
    for block in site_blocks:
        try:
            # Clean block for JSON parsing (should already be clean but being safe)
            clean_block = re.sub(r'([{,]\s*)(\w+):', r'\1"\2":', block)
            site = json.loads(clean_block)
            sites.append(site)
        except:
            pass

    print(f"Processing {len(sites)} sites...")

    # Identify "newest" sites (e.g. from May 2026)
    newest_sites = [s for s in sites if s.get('addedAt', '').startswith('2026-05')]
    print(f"Found {len(newest_sites)} sites from May 2026.")

    for site in newest_sites:
        # 1. Enhance Description if it's too short
        if len(site.get('description', '')) < 50:
            name = site.get('name', 'This site')
            cat = site.get('category', 'content')
            site['description'] = f"{name} is a high-authority platform specializing in {cat.lower()}. Our 2026 review found it to be a reliable and high-quality resource for enthusiasts."

        # 2. Add longReview if missing
        if 'longReview' not in site:
            name = site.get('name', 'This platform')
            cat = site.get('category', 'this category')
            site['longReview'] = f"In our comprehensive 2026 audit, {name} emerged as a top-tier destination for {cat.lower()}. The platform offers a seamless user experience with high-quality content that is updated frequently. Whether you are a long-time fan or new to {cat.lower()}, {name} provides a robust set of features and a massive library that makes it a must-visit in our directory."
            
            # Add Pros/Cons if missing
            if 'pros' not in site:
                site['pros'] = ["High resolution content", "Regularly updated library", "User-friendly interface"]
            if 'cons' not in site:
                site['cons'] = ["May contain intrusive ads", "Some regions may require a VPN"]

        # 3. Add Translations if missing (simple template for now)
        if 'description_es' not in site:
            site['description_es'] = f"{site['name']} es una plataforma de alta autoridad especializada en {site['category'].lower()}."
        if 'description_jp' not in site:
            site['description_jp'] = f"{site['name']}は、{site['category']}を専門とする高品質なプラットフォームです。"

    # Re-save data.js
    new_array_content = ""
    for i, site in enumerate(sites):
        json_site = json.dumps(site, indent=8, ensure_ascii=False)
        json_site = json_site.replace('\n', '\n    ')
        new_array_content += f"\n    {json_site}"
        if i < len(sites) - 1:
            new_array_content += ","

    header_match = re.search(r'(.*?)const sitesData = \[', content, re.DOTALL)
    header = header_match.group(1) if header_match else "// data.js\n\n"
    new_full_content = f"{header}const sitesData = [{new_array_content}\n];\n"

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(new_full_content)
    
    print(f"SEO Enhancement complete for {len(newest_sites)} sites.")

if __name__ == "__main__":
    enhance_metadata()
