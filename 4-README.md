# Omar Bazeed Portfolio: design preview

A separate redesign of the portfolio, not a production release. The original live Render site has not been changed.

## Run locally
Node.js 22 recommended.

```
npm ci
npm run dev
```

```
npm run build
npm run preview
```

Stack: React 18, Vite 6 and CSS. Selected projects are in the `projects` array in `src/main.jsx`. Local optimized WebP assets and the two approved services videos are in `public/media`. The removed legacy app remains available in Git history.

## Current preview scope
- One scrolling page: hero, four filterable projects, e-commerce focus, bilingual services showreel, about/toolkit, contact.
- Mobile menu, readable content without hover, reduced-motion support, keyboard focus and skip navigation.
- Reliable email links instead of an unverified EmailJS form. No messages are sent by this site itself.
- Old CV download intentionally omitted pending a current approved document.
- No invented employment dates, client identities, platforms or performance numbers.
- Project-management system is credited as collaborative. Exact contribution needs confirmation.
- Video graphics and campaign figures explicitly labeled illustrative.

## Before a public launch
1. Confirm latest CV, current location/availability and employment dates.
2. Confirm real store links/platforms, individual role, approved screenshots and any supported results.
3. Replace preview banner/content notes with approved final content.
4. Confirm project contributions and recheck live demos before adding demo buttons. Three development projects now have verified-resolving demo links and source links. Login-protected functions were not tested. NYLON links to its live verified store at https://www.nylonsa.com/.
5. Verify the preview in the target host, all contact links, video playback, direct entry/reload and latest CV.
6. Get approval to publish the final version and verify the existing Render service settings first.

## Hosting a separate preview
The optional `render.yaml` describes a NEW static preview site, not the current production service. Build: `npm ci && npm run build`. Publish directory: `dist`. SPA fallback: rewrite `/*` to `/index.html`. Auto-deploy is disabled in this proposed blueprint. No hosting service was created by this work.

The one-page navigation uses anchors. Old paths can serve the same entry page when the host fallback is configured. The live server's current Not Found behavior cannot be fixed until its actual settings are changed. Local verification does not establish production configuration.

## Checks performed
Production build succeeded. Browser checks at 320, 390 and 1280 CSS pixels: no horizontal overflow, four cards rendered, images decoded, no uncaught page errors. Mobile menu, anchor navigation, Commerce filter (one project), Arabic video source selection and overview disclosure exercised. No external contact message or job application was sent by these checks.

## Project shortlist, 23 November update
Exactly four cards: featured NYLON, Project Management System, Food App, Real Estate App. The latter three were selected from the approved selected-projects PDF. Hotel Management was left out because its demo contains placeholder content, and the selection already covers management workflows and Next.js/API work. Generic storefront, dashboard, food-delivery cards and the More experiments link were removed from the preview. NYLON responsibilities come from Omar’s own statements. Its card uses a real storefront screenshot captured from https://www.nylonsa.com/ on 23 November 2026, cropped to the header/hero to avoid the cookie banner and unrelated overlays. The screenshot does not imply sole authorship of every page element.

## NYLON visual update
Actual store URL supplied by Omar and verified in the browser: https://www.nylonsa.com/. Replaced title artwork with an optimized WebP storefront capture and added Visit NYLON store. Other three selected projects unchanged. No actions, cart changes or forms submitted on the store.
