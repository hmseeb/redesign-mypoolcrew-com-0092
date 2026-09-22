# The Pool Crew — Website Redesign

A complete, from-scratch redesign of mypoolcrew.com for **The Pool Crew**, a veteran-owned and
family-operated pool cleaning service based in Rowlett, TX serving Dallas and the surrounding
DFW communities.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no environment variables.

```
index.html   # single-page site, semantic HTML + JSON-LD LocalBusiness schema
styles.css   # design system (custom properties), layout, responsive rules
script.js    # sticky header, mobile nav, scroll reveal, active nav, FAQ accordion, quote form
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Sections

Hero · Why homeowners trust us · What's included in weekly service · Services (8) ·
Free-quote band · How it works · What makes us different · Recent work · Reviews ·
Service areas · FAQ · Contact & quote form · Footer

## Business details

- Phone: (214) 304-9480
- Email: michael@mypoolcrew.com
- Based in Rowlett, TX
- CPO C-163589 · Texas Residential Appliance Installer License (RAIL) 335062

## Notes

- The quote form has no backend; it validates input and hands off to the visitor's mail client.
- The logo and the hero backyard-pool photo are the original site assets; remaining photography
  is sourced from Pexels and matched to each section's subject.
