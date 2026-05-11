import requests
import os
import re
import datetime

# --- Configuration ---
DATA_FILE = "js/data.js"
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID")

def broadcast_updates():
    print("Preparing Telegram broadcast...")
    
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHANNEL_ID:
        print("Telegram configuration missing. Skipping broadcast.")
        return

    if not os.path.exists(DATA_FILE): return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    today = datetime.datetime.now().strftime("%Y-%m-%d")
    # Find sites added today
    added_today = re.findall(f'"addedAt":\s*"{today}"', content)
    count = len(added_today)

    if count == 0:
        print("No new sites added today. Nothing to broadcast.")
        return

    message = f"🚀 *HentaiVault Update: {today}*\n\n"
    message += f"Today we have added *{count}* new active websites and communities to the directory!\n\n"
    message += "🔥 *Check out the latest additions:* \n"
    message += "🔗 [hentaivault.me/?sort=newest](https://hentaivault.me/?sort=newest)\n\n"
    message += "#Hentai #Anime #Directory #Updates"

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHANNEL_ID,
        "text": message,
        "parse_mode": "Markdown",
        "disable_web_page_preview": False
    }

    try:
        res = requests.post(url, json=payload)
        if res.status_code == 200:
            print(f"Broadcast successful! Notified channel about {count} sites.")
        else:
            print(f"Broadcast failed: {res.text}")
    except Exception as e:
        print(f"Error sending broadcast: {e}")

if __name__ == "__main__":
    broadcast_updates()
