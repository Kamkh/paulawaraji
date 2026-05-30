# Paul Awaraji — Portfolio

Personal website for Paul Awaraji (Audio Director / Composer).
Static site — no build tools, no framework, no dependencies.

---

## Folder structure

```
paulnew/
├── index.html              ← page markup (sections, content)
├── README.md               ← this file
│
├── css/
│   └── styles.css          ← all visual design (organized in 16 numbered sections)
│
├── js/
│   ├── data.js             ← YOUR PROJECT LIST — edit this to add/remove work
│   └── main.js             ← site interactivity (tiles, modal, filters, scroll)
│
└── assets/
    ├── README.md           ← image instructions
    ├── portrait.webp       ← hero photo (transparent cutout)
    │   └── portrait-fallback.png  ← transparent PNG fallback
    └── posters/            ← short film poster artwork
        ├── half-way.jpg
        ├── macula.jpg
        └── one-night.jpg
```

---

## Quick edits — what file to touch

| Want to change… | Edit this file |
|---|---|
| **The hero photo** | Replace `assets/portrait.webp` + `assets/portrait-fallback.png` (use a transparent cutout) |
| **A short film poster** | Drop image at `assets/posters/<name>.jpg` |
| **Your projects** (add, remove, reorder) | `js/data.js` |
| **Wording** (hero copy, about, awards, contact) | `index.html` |
| **Colors / fonts / spacing** | `css/styles.css` — section 1 (Tokens) |
| **A specific component's style** | `css/styles.css` — find the numbered section |
| **Interactive behavior** | `js/main.js` |

---

## How to add a new project

Open `js/data.js` and add an entry to the `WORKS` array. Example:

```js
{
  cat:    'advertisement',     // 'advertisement' | 'theme' | 'film' | 'design'
  title:  'New Brand Spot',
  meta:   'Sound Design',
  year:   '2026',
  kind:   'youtube',           // 'youtube' | 'vimeo' | 'sc-track' | 'sc-playlist'
  src:    'YOUTUBE_VIDEO_ID',
  poster: 'https://i.ytimg.com/vi/YOUTUBE_VIDEO_ID/maxresdefault.jpg'
},
```

Save and refresh the browser. Done.

Full field reference is at the top of `js/data.js`.

---

## How to run the site locally

From the project folder, run:

```
python3 -m http.server 8765
```

Then open <http://localhost:8765/> in your browser.

Stop the server with `Ctrl+C`.

---

## How to deploy

The site is plain HTML/CSS/JS — drop the whole folder onto any static host:

- **Netlify**: drag-and-drop the folder at <https://app.netlify.com/drop>
- **Vercel**: run `vercel` in the folder (after installing the CLI)
- **GitHub Pages**: push to a repo, enable Pages in settings
- **Any web host**: upload via FTP/SFTP

No build step needed.

---

## Browser support

Modern browsers (Chrome, Safari, Firefox, Edge — last two versions).
Uses CSS features: `mix-blend-mode`, `mask-image`, `backdrop-filter`, `aspect-ratio`, `dvh` units.
