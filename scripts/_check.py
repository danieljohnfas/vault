import re

def read_f(p):
    with open(p, 'r', encoding='utf-8', errors='replace') as f:
        return f.read()

c = read_f('about.html')
doubles = len(re.findall(r'\n\n\n', c))
print('about.html double blank line runs:', doubles)
lines = c.split('\n')
print('about.html total lines:', len(lines))

# Find page-content in about.html
m = re.search(r'<div class="page-content">', c)
if m:
    print('page-content found at char:', m.start())
    print('snippet:', repr(c[m.start():m.start()+200]))

print()
c2 = read_f('site.html')
has_hero = 'class="hero"' in c2
has_pc = 'page-content' in c2
has_review = 'site-detail' in c2 or 'review' in c2.lower()
print('site.html:')
print('  has hero:', has_hero)
print('  has page-content:', has_pc)
print('  has review/detail:', has_review)
m2 = re.search(r'<main[^>]*>', c2)
if m2:
    print('  <main> found, snippet after:', repr(c2[m2.start():m2.start()+150]))

print()
# Check blog post structure
cb = read_f('blog/best-streaming-2026.html')
m3 = re.search(r'<article|<main|<div class="article', cb)
if m3:
    print('blog: found', repr(cb[m3.start():m3.start()+100]))
