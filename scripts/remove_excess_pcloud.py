import os
import re

def remove_excess_banners(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remove Sticky Bottom Banner
    content = re.sub(r'<!-- pCloud Sticky Bottom Banner -->[\s\S]*?</div>\s*</div>\s*', '', content)
    
    # Remove Skyscrapers
    content = re.sub(r'<!-- pCloud Skyscrapers -->[\s\S]*?<div class="pcloud-sky pcloud-sky-right">[\s\S]*?</div>\s*</div>\s*', '', content)
    
    # Remove Sidebar Banner
    content = re.sub(r'<!-- pCloud Sidebar Banner -->[\s\S]*?</div>\s*', '', content)

    # Remove Native Banner
    content = re.sub(r'<!-- pCloud Native Banner -->[\s\S]*?</div>\s*', '', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned {os.path.basename(filepath)}")

if __name__ == "__main__":
    directory = r"c:\\Users\\nnm\\Documents\\projects\\vault"
    for root, dirs, files in os.walk(directory):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                remove_excess_banners(filepath)
