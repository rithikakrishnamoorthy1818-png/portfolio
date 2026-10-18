# 🌸 Rithika's Dreamy Portfolio

A soft, girly, Ghibli-twilight-sky portfolio site made with **plain HTML, CSS and a little JavaScript**.
No frameworks, no build step — just open it and it works.

The site is 4 full-screen pages that you **swipe left/right** through (like an Instagram story):

1. **Home** — your banner photo
2. **About me** — short intro + skill chips
3. **Projects** — ThreatTrace, NetGuardian AI, Resume Analyzer & CryptoFlow Analyzer
4. **Contact** — GitHub, LinkedIn, Email

---

## 📂 Files

```
portfolio/
├── index.html      ← all the text/content lives here
├── style.css       ← all the colours and looks live here
├── script.js       ← the swipe logic (you rarely need to touch this)
└── assets/
    └── hero.png    ← YOUR banner image
```

---

## ▶️ How to open it locally

**Easiest way (no install):**

1. Open the `portfolio` folder.
2. Double-click **`index.html`**.
3. It opens in your browser. Done! 🎉

**Tip:** To test the phone swipe on your laptop, drag the browser window narrow (or open DevTools → click the phone icon 📱).

---

## 🖼️ How to swap my picture

1. Make your new image file (`.jpg` or `.png`).
2. Drop it into the `assets/` folder.
3. **Rename it `hero.png`** (or open `index.html` and change `src="assets/hero.png"` to your new filename).
4. Refresh the browser.

> If your face sits too high or too low in the frame, open `style.css` and change the number in
> `object-position: 50% 30%;` — bigger `30%` shows more of the top, smaller shows more of the bottom.

Also update the `alt="..."` text in `index.html` so screen readers describe the new image correctly.

---

## ✏️ How to edit the text

All wording lives in **`index.html`** — just read down the file:

| Where | What it controls |
|---|---|
| `<title>` + `<meta name="description">` | The browser tab title & Google preview |
| Page 2 paragraph | Your About Me blurb |
| `.chip` items | The skill chips |
| Page 3 `.card` blocks | Project names, emojis & descriptions |
| Page 4 links | GitHub / LinkedIn / Email URLs |
| `footer` text | "Made with 💜 by Rithika" |

## 🎨 How to change the colours

Open **`style.css`** and find the `:root` block at the very top. Every colour is a variable:

```css
--lilac:      #E4D4FF;
--purple:     #C9B1FF;
--orchid:     #F5C6EC;
--periwinkle: #DDE3FF;
--cream:      #FFF9FD;
--plum:       #3F2D5A;  /* text colour */
--rose:       #FF9ACB;  /* accent pink */
```

Change a hex code → the whole site updates. No other editing needed.

---

## 🚀 How to publish on GitHub Pages

1. Create a new repository on GitHub (name it e.g. `portfolio`). Keep it **Public**.
2. Open a terminal (or use GitHub Desktop) in this folder and run:

   ```bash
   git init
   git add .
   git commit -m "My dreamy portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, pick `main` / `(root)`, and click **Save**.
5. Wait ~1 minute, then visit:
   `https://YOUR-USERNAME.github.io/portfolio/` 🌸

> To update later: edit files, then run `git add . && git commit -m "update" && git push`.

---

Made with 💜 by Rithika
