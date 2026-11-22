from playwright.sync_api import sync_playwright
import json
JS="""()=>{const out=new Set();const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentNode;if(['SCRIPT','STYLE'].includes(p.tagName))continue;const t=n.nodeValue.trim();if(t.length>1)out.add(t)}
document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(e=>['placeholder','aria-label','title'].forEach(a=>{const v=e.getAttribute(a);if(v&&v.trim().length>1)out.add(v.trim())}));return[...out]}"""
allS=set()
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':900})
    pg.route('**/*.{jpg,jpeg,png,webp}',lambda r:r.fulfill(path='/tmp/fake.jpg') if 'http' in r.request.url else r.continue_())
    pg.goto('file:///home/claude/afa-tours-website/index.html');pg.wait_for_timeout(1200)
    pg.click('[data-lang=en]');pg.wait_for_timeout(500)
    def grab():
        pg.wait_for_timeout(120); allS.update(pg.evaluate(JS))
    grab()
    for k in ['circuit','hotel','heb','resto','transport','vodun','plan']:
        try:
            pg.evaluate(f"openBook('{k}')");pg.wait_for_timeout(200);grab()
            for step in range(3):
                pg.evaluate("(()=>{const n=document.querySelector('#bk [data-nx]');n&&n.click()})()");pg.wait_for_timeout(150);grab()
            pg.evaluate("document.getElementById('bk').close()")
        except Exception as e: print(k,e)
    pg.evaluate("document.querySelector('[data-join]').click()");pg.wait_for_timeout(200);grab()
    for t in ['heb','resto','trans','other']:
        pg.select_option('#jtype',t);grab()
    pg.evaluate("document.getElementById('jd').close();window.__plan.open()");pg.wait_for_timeout(200);grab()
    pg.evaluate("document.getElementById('pl').close();window.__myBk.open()");pg.wait_for_timeout(200);grab()
    pg.evaluate("document.getElementById('mb').close()")
    for id in ['sej','trn','part','team']: pass
    for pk in ['hotel','resto','heb','trans']:
        try: pg.evaluate(f"document.querySelector('[data-pk={pk}]').click()");grab()
        except: pass
    for pid in ['vodun','sejour','transport','avis','partners']:
        try: pg.evaluate(f"window.__popTest.show('{pid}')");grab()
        except Exception as e: pass
    b.close()
json.dump(sorted(allS),open('/tmp/strings.json','w'),ensure_ascii=False,indent=0)
print(len(allS))
