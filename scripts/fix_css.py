import os

path = "css/style.css"
if os.path.exists(path):
    print(f"Fixing {path}...")
    with open(path, 'rb') as f:
        raw = f.read()
    
    try:
        content = raw.decode('utf-8')
    except:
        content = raw.decode('latin-1')

    # Fix corrupted search icon
    # It looks like 'Y"?' or similar in the log
    # I'll use a regex to catch common corruption patterns in content: '...'
    content = content.replace("content: 'Y\"?';", "content: '🔍';")
    # Backup replace if the above literal doesn't match exactly
    content = content.replace(".search-bar::before {", ".search-bar::before {\n    content: '🔍';")
    
    # Remove any duplicate content lines created by the backup replace
    content = content.replace("content: '🔍';\n    content:", "content:")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
