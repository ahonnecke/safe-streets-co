# Cloudflare Pages Setup — safestreetsco.com

One-time setup. After this, `git push` = deploy.

## 1. Pages project (rebuild for 11ty)

If a Pages/Worker project exists from the pre-11ty era, **delete it and
recreate** — build settings have changed.

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Authorize GitHub, select `ahonnecke/safe-streets-co`
3. Project name: `safe-streets-co` (gives `safe-streets-co.pages.dev`)
4. Branch: `main`
5. **Build settings:**
   - Framework preset: **None**
   - Build command: **`npm run build`**
   - Build output directory: **`_site`**
   - Root directory: *(leave default)*
   - Environment variables: none required
   - Node version: **20** (set `NODE_VERSION=20` in env vars if Pages defaults to older)
6. Save & Deploy

The `_redirects` file in `_site/` will route `/HB26-1318/*` → `/bills/co/HB26-1318/:splat` (301).

## 2. DNS for safestreetsco.com (Namecheap → Cloudflare)

The Pages custom domain feature requires the domain be on Cloudflare DNS.

### 2a. Add domain to Cloudflare

1. Cloudflare Dashboard → **Add a Site** → enter `safestreetsco.com` → free plan
2. Cloudflare scans DNS — there's nothing to import on a fresh domain, so the result will be empty (that's fine)
3. Cloudflare gives you 2 nameservers, e.g. `kara.ns.cloudflare.com`, `walt.ns.cloudflare.com`

### 2b. Update nameservers at Namecheap

1. Log into Namecheap → Domain List → `safestreetsco.com` → Manage
2. Nameservers section → switch to **Custom DNS** → paste the two Cloudflare NS values
3. Save. Propagation usually completes in 15 min – 2 hr (Cloudflare emails when active)

### 2c. Wire Pages custom domain

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Add `safestreetsco.com` → Cloudflare auto-creates the CNAME record and issues SSL
3. Add `www.safestreetsco.com` (set up the same way; Cloudflare will redirect to apex)

## 3. Verify

- [ ] `https://safestreetsco.com/` loads — Safe Streets Co homepage
- [ ] `https://safestreetsco.com/bills/co/HB26-1318/` loads
- [ ] `https://safestreetsco.com/HB26-1318/` redirects to `/bills/co/HB26-1318/` (301)
- [ ] `https://www.safestreetsco.com/` redirects to `https://safestreetsco.com/`
- [ ] SSL certificate issued (no browser warning)
- [ ] Security headers present: `curl -sI https://safestreetsco.com/ | grep -iE "frame|content-type|csp"`
- [ ] `git push` triggers a new Pages deployment

## 4. Retire the legacy honnecke.us path

Once the above is green:

1. Update any printed/shared links to `safestreetsco.com`
2. Add a redirect on `honnecke.us/bike_bus/hb26-1318/` pointing to the new canonical URL
   (or delete the directory + add a 301 in nginx config)
3. Remove `HB26-1318/` from this repo and remove `deploy.sh`
