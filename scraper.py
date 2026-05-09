import json
import uuid
import datetime

# --- INSTRUCTIONS ---
# This is a helper script to convert large lists of websites into the JS array format needed for your site.
# Generating 10,000 websites inside the AI chat causes token limits to break.
# You can use this script to take a raw list of sites (e.g. from an API or a CSV)
# and convert it into the format for js/data.js.

def generate_js_array(raw_data_list):
    formatted_sites = []
    
    for item in raw_data_list:
        site = {
            "id": str(uuid.uuid4())[:8],
            "name": item.get("name", "Unknown Site"),
            "url": item.get("url", "#"),
            "category": item.get("category", "Uncategorized"),
            "description": item.get("description", "No description provided."),
            "tags": item.get("tags", []),
            "rating": item.get("rating", 0.0),
            "addedAt": datetime.datetime.now().strftime("%Y-%m-%d")
        }
        formatted_sites.append(site)
        
    js_output = f"const sitesData = {json.dumps(formatted_sites, indent=4)};"
    
    with open("js/data_bulk.js", "w") as f:
        f.write(js_output)
        
    print(f"Generated {len(formatted_sites)} sites into js/data_bulk.js")

if __name__ == "__main__":
    # Example raw data that you might scrape or download from somewhere
    example_raw_data = [
        {"name": "Example Anime", "url": "https://example.com", "category": "Anime Streaming", "tags": ["Free", "Subbed"], "rating": 4.5},
        # You can programmatically append thousands of items here
    ]
    
    generate_js_array(example_raw_data)
