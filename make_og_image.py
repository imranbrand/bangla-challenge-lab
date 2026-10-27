from pathlib import Path
from playwright.sync_api import sync_playwright

project = Path(__file__).parent
output = project / "assets" / "og-card.png"
output.parent.mkdir(parents=True, exist_ok=True)

html = r"""
<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<style>
* { box-sizing: border-box; }
html, body {
    margin: 0;
    width: 1200px;
    height: 630px;
    overflow: hidden;
}
body {
    font-family: "Nirmala UI", "Vrinda", sans-serif;
    color: #ffffff;
    background:
        radial-gradient(circle at 95% 5%, #29255d 0, transparent 34%),
        radial-gradient(circle at 100% 100%, #123d4a 0, transparent 30%),
        #10162b;
}
.panel {
    position: absolute;
    inset: 35px;
    border: 3px solid #34456b;
    border-radius: 35px;
    background: rgba(23,31,58,.88);
}
.brand {
    position: absolute;
    top: 75px;
    left: 75px;
    padding: 13px 20px;
    border-radius: 22px;
    background: #183d49;
    color: #70f0d0;
    font: bold 25px Arial, sans-serif;
    letter-spacing: 1px;
}
.title-bn {
    position: absolute;
    top: 174px;
    left: 78px;
    font-size: 57px;
    line-height: 1.55;
    font-weight: bold;
    white-space: nowrap;
}
.title-en {
    position: absolute;
    top: 270px;
    left: 78px;
    color: #72f0d2;
    font: bold 57px Arial, sans-serif;
}
.description {
    position: absolute;
    left: 82px;
    top: 370px;
    font-size: 30px;
    line-height: 1.8;
}
.description p { margin: 0 0 7px 0; }
.description p:last-child { color: #bfcbe4; }
.quiz {
    position: absolute;
    left: 820px;
    top: 180px;
    width: 245px;
    height: 245px;
    border: 5px solid #72f0d2;
    border-radius: 38px;
    background: #26385c;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.score {
    font: bold 54px Arial, sans-serif;
}
.quiz-label {
    margin-top: 20px;
    color: #72f0d2;
    font: bold 25px Arial, sans-serif;
}
.footer {
    position: absolute;
    left: 82px;
    bottom: 75px;
    color: #72f0d2;
    font: bold 25px Arial, sans-serif;
    letter-spacing: 1px;
}
</style>
</head>
<body>
<div class="panel"></div>
<div class="brand">BANGLA CHALLENGE LAB</div>
<div class="title-bn">তুমি কতটা</div>
<div class="title-en">Tech-Smart?</div>
<div class="description">
    <p>৭টি প্রশ্নে নিজের স্কোর জানো</p>
    <p>বন্ধুদের চ্যালেঞ্জ করো!</p>
</div>
<div class="quiz">
    <div class="score">7/7</div>
    <div class="quiz-label">QUIZ</div>
</div>
<div class="footer">PLAY&nbsp; | &nbsp;LEARN&nbsp; | &nbsp;SHARE</div>
</body>
</html>
"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(
        viewport={"width": 1200, "height": 630},
        device_scale_factor=1
    )
    page.set_content(html, wait_until="networkidle")
    page.screenshot(path=str(output), full_page=True)
    browser.close()

print("OG image created successfully!")
print(f"File: {output}")
print("Dimensions: 1200 x 630")
print(f"File size: {output.stat().st_size:,} bytes")
