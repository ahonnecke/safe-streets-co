# safe-streets-co

Source for **[safestreetsco.com](https://safestreetsco.com)** — Colorado-first
traffic safety legislation tracking. A static [Eleventy](https://www.11ty.dev/) site.

## Layout

```
.
├── eleventy.config.mjs       # 11ty config (filters, custom collection, passthrough)
├── package.json              # eleventy 3.x, ESM
├── src/
│   ├── _data/site.js         # site metadata (name, tagline, nav, jurisdictions)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk      # html shell + og/twitter meta + nav + footer
│   │   │   └── bill.njk      # bill detail layout (renders fully from frontmatter)
│   │   └── partials/         # nav, footer, og
│   ├── styles/main.css       # all CSS, served at /styles/main.css
│   ├── bills/
│   │   ├── bills.json        # directory data: layout = layouts/bill.njk
│   │   ├── index.njk         # /bills/ — all bills index
│   │   └── co/
│   │       └── HB26-1318.md  # bill content as frontmatter + markdown
│   ├── public/               # static passthrough → site root (ics, photos, og images)
│   ├── _headers              # Cloudflare Pages security headers
│   ├── _redirects            # legacy URL → new structure
│   ├── index.njk             # homepage
│   └── about.md              # /about/
├── _site/                    # build output (gitignored)
├── HB26-1318/                # legacy rsync source (kept until honnecke.us deploy retired)
├── deploy.sh                 # legacy rsync to honnecke.us/bike_bus/hb26-1318/
├── FAQ.txt                   # source FAQ from advocates
├── RETRO.md                  # HB26-1318 retrospective notes
└── CLOUDFLARE.md             # Pages setup walkthrough
```

## Develop

```bash
npm install
npm run dev    # http://localhost:8080, live reload
npm run build  # one-shot build to _site/
```

## Add a new bill

1. Create `src/bills/<jurisdiction>/<BILL-ID>.md`
2. Fill in the frontmatter — see `src/bills/co/HB26-1318.md` as the canonical example
3. Body of the markdown is rendered as the "What is this bill?" intro prose
4. Push — Cloudflare Pages builds and deploys automatically

The bill layout (`src/_includes/layouts/bill.njk`) renders the entire page from
frontmatter; sections (provisions, feature, testimony drafts, FAQ) auto-show
or hide based on whether the data is present, and on `status`.

## Status values

`active` · `passed-committee` · `passed-chamber` · `signed` · `dead`

Drives banner color, hero eyebrow, and whether the testimony/CTA sections render.

## Deploy

- **Cloudflare Pages** (canonical): push to `main`. See `CLOUDFLARE.md` for one-time setup.
- **Legacy rsync**: `./deploy.sh` rsyncs `HB26-1318/` to `honnecke.us` (kept while custom domain wires up; will retire).
