# Cloudflare Pages Setup — safe-streets-co

One-time setup to wire this repo to Cloudflare Pages. After setup, `git push`
= deploy.

## 1. Create Pages project

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Authorize GitHub, select `ahonnecke/safe-streets-co`
3. Project name: `safe-streets-co` → you'll get `safe-streets-co.pages.dev`
4. Branch: `main`
5. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (leave as repo root)
6. Save & Deploy

The `_redirects` file at repo root will send `/` → `/HB26-1318/` (302), so
`https://safe-streets-co.pages.dev/` lands visitors on the bill page.

## 2. Custom domain (optional, later)

Pages project → **Custom domains** → **Set up a custom domain**

Candidate domains (all available to register or already owned — confirm
before wiring):

- `safestreetsco.org` (cause-aligned, memorable)
- `cobikeadvocacy.org`
- `hb1318.org` (hearing-urgent short URL — narrow to this bill only)

DNS: if the domain is on Cloudflare, it wires automatically. If not:

```
CNAME   @     safe-streets-co.pages.dev
CNAME   www   safe-streets-co.pages.dev
```

SSL is auto via Cloudflare Universal SSL.

## 3. Verify after setup

- [ ] `https://safe-streets-co.pages.dev/` redirects to `/HB26-1318/`
- [ ] `https://safe-streets-co.pages.dev/HB26-1318/` loads, Google Fonts render
- [ ] Security headers present (check via `curl -sI` or securityheaders.com)
- [ ] Every `git push origin main` triggers a new Pages deployment

## 4. Retire the rsync path

Once Cloudflare Pages is the canonical URL:

- Update any printed/shared links to the Pages URL
- Keep `deploy.sh` around as a backup path for a release or two
- Consider adding a `_redirects` entry on the honnecke.us side (or a `<meta http-equiv="refresh">` on the legacy URL) pointing at the new canonical URL
