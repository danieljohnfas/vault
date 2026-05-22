import urllib.request
import urllib.parse
import sys

def ping_search_engines(sitemap_url):
    print(f"Pinging search engines with sitemap: {sitemap_url}")
    
    engines = [
        # Google deprecated the ping endpoint in early 2024, but some older systems still log it.
        # The recommended way for Google is to submit via Google Search Console.
        ('Bing', 'http://www.bing.com/ping?sitemap='),
        ('Yandex', 'http://blogs.yandex.ru/pings/?status=success&url=')
    ]
    
    for name, url_prefix in engines:
        try:
            ping_url = f"{url_prefix}{urllib.parse.quote(sitemap_url)}"
            req = urllib.request.Request(ping_url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            if response.status == 200:
                print(f"✅ Successfully pinged {name}.")
            else:
                print(f"❌ Failed to ping {name}. Status code: {response.status}")
        except Exception as e:
            print(f"❌ Error pinging {name}: {e}")

    print("\n" + "="*50)
    print("🚨 IMPORTANT GOOGLE INDEXING INSTRUCTIONS 🚨")
    print("="*50)
    print("Google has deprecated their automatic ping URL endpoint.")
    print("To force Google to re-crawl your 127 'Crawled - currently not indexed' pages:")
    print("1. Log in to Google Search Console.")
    print("2. Navigate to 'Sitemaps' on the left menu.")
    print("3. Submit your URL: https://hentaivault.me/sitemap.xml (even if it's already there, submit it again to force a refresh).")
    print("4. Go to the 'Pages' report, click 'Crawled - currently not indexed'.")
    print("5. Click 'VALIDATE FIX'. This will put your URLs into Google's priority crawling queue.")

if __name__ == '__main__':
    sitemap = "https://hentaivault.me/sitemap.xml"
    ping_search_engines(sitemap)
