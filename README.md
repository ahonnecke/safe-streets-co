# safe-streets-co

Colorado bike/pedestrian advocacy. Currently hosts the support site for
**HB26-1318** (school zone definition + School Streets amendment).

## Live URLs

- **Primary:** <https://honnecke.us/bike_bus/hb26-1318/> (rsync deploy — legacy path)
- **Cloudflare Pages:** see `CLOUDFLARE.md` for setup

## Layout

```
.
├── HB26-1318/              # the HB26-1318 site (static)
│   ├── index.html
│   ├── cal.html
│   ├── ics/                # iCal hearing invites
│   ├── telraam/            # traffic-count photos
│   └── testimony/          # speaker notes
├── FAQ.txt                 # authoritative FAQ source from advocates
├── _headers                # Cloudflare Pages security headers
├── _redirects              # Cloudflare Pages redirect (/ → /HB26-1318/)
├── deploy.sh               # rsync to honnecke.us (legacy deploy path)
└── CLOUDFLARE.md           # Cloudflare Pages setup steps
```

## Deploy

- **rsync (honnecke.us):** `./deploy.sh` (or `--dry-run` to preview)
- **Cloudflare Pages:** push to `main` (after initial Pages project setup — see `CLOUDFLARE.md`)

## Future

Expected to expand beyond HB26-1318 as more Colorado bike/ped bills come up.
Per-bill content lives in its own top-level directory (`HB26-1318/`, etc.).
