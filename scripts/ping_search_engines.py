import urllib.request
import urllib.parse
import json
import xml.etree.ElementTree as ET
import sys

INDEXNOW_KEY = "45598f4e24eb4bdf9891e4a106e23298"
HOST = "hentaivault.me"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"

def submit_indexnow(urls):
    print(f"Submitting {len(urls)} URLs to Bing via IndexNow REST API...")
    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "HentaiVault-Indexer/1.0"}
    )
    
    try:
        with urllib.request.urlopen(req) as res:
            if res.status in (200, 202):
                print(f"[SUCCESS] Successfully submitted {len(urls)} URLs to IndexNow (Bing / Yandex). Status: {res.status}")
            else:
                print(f"[WARNING] IndexNow returned status code: {res.status}")
    except Exception as e:
        print(f"[ERROR] Error submitting to IndexNow: {e}")

def fetch_sitemap_urls(sitemap_url):
    print(f"Fetching sitemap from: {sitemap_url}")
    req = urllib.request.Request(sitemap_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as res:
            xml_data = res.read()
            root = ET.fromstring(xml_data)
            # Handle XML namespace
            namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            urls = [elem.text for elem in root.findall('.//ns:loc', namespaces)]
            if not urls:
                urls = [elem.text for elem in root.findall('.//loc')]
            return urls
    except Exception as e:
        print(f"❌ Failed to fetch/parse sitemap: {e}")
        return []

if __name__ == '__main__':
    sitemap = f"https://{HOST}/sitemap.xml"
    urls = fetch_sitemap_urls(sitemap)
    if urls:
        # IndexNow accepts up to 10,000 URLs per request
        submit_indexnow(urls[:10000])
    else:
        print("No URLs found to submit.")
