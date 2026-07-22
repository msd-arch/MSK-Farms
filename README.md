# MSK Farms — Interactive Business Website

A fully responsive, multi-page business website for **MSK Farms**, a Islamabad livestock &
dairy farm: year-round mutton, seasonal Eid ul Adha Qurbani cattle, animal boarding &
fattening, plus fresh Sahiwal milk and desi eggs delivered daily.

Built with **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step.
*(Task 02 — Devixo Solutions.)*

## Pages
`index.html` · `about.html` · `services.html` · `portfolio.html` (Our Livestock) · `contact.html`

## Interactive features (8 — requirement was ≥6)
1. **Responsive navigation menu** — slide-in mobile drawer with hamburger + overlay
2. **Image slider** — auto-playing carousel with arrows, dots, pause-on-hover
3. **FAQ accordion** — one-open-at-a-time, animated (Services & Contact)
4. **Form validation** — live, Pakistani mobile + email rules, success state (Contact)
5. **Scroll-to-top button** — appears after scrolling
6. **Dark mode** — toggle, remembers your choice, respects system preference
7. **Animated counters** — count up when scrolled into view (Home stats)
8. **Typing animation** — rotating word in the hero headline

*Bonus interactions:* portfolio filter buttons and scroll-reveal animations.

## Additional requirements
- **Responsive design** — fluid layouts down to small mobile
- **Modern UI/UX** — pasture-green + marigold + milk palette, custom SVG illustrations,
  a livestock "ID-tag" card motif, and accessible focus / reduced-motion support
- **Consistent color scheme** — driven by CSS custom properties (light + dark)
- **Organized folder structure** (below)

## Folder structure
```
msk-farms/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Run locally
Open `index.html` in any browser. (No server needed — everything is static.)

## Deploy free (Bonus)

**GitHub Pages**
1. Create a new GitHub repo and push these files (keep the folder structure).
2. Repo → **Settings → Pages** → *Source:* `Deploy from a branch` → branch `main`, folder `/root`.
3. Save. Your site goes live at `https://<username>.github.io/<repo>/` in a minute.

**Netlify (drag & drop)**
1. Go to app.netlify.com → **Add new site → Deploy manually**.
2. Drag the whole `msk-farms` folder onto the page. Done — you get a live URL instantly.

---
*Illustrations are hand-coded SVG, so the site works fully offline with no external images.*
