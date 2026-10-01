# Little Joys, Big Miles

Bri’s 2027 London Marathon fundraiser for USA for UNHCR. A responsive donation thank-you collection with a private owner dashboard, persistent inventory, photo uploads, events, and raffle drafts.

## Stack

React 19, TypeScript, Vinext/Vite, Cloudflare Workers, D1, R2, Radix UI, and Formspree notifications. Node 22.13 or later is required.

## Run locally

```sh
npm ci
npm run db:generate
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_ordinary_thunderball.sql
npm run dev
```

## Workflow

Visitors choose an available option and send a request before donating. Requests are saved before notification delivery. Pending requests do not reserve stock. Bri confirms stock, replies with donation and meetup instructions, and coordinates pickup. Confirmation deducts individual pieces; cancelling a confirmed request restores inventory. Mark complete after handoff or verified raffle payment.

Admin access at `/admin` uses Sites sign-in and a server-enforced email allowlist. The development preview uses a separate mock identity and cannot access Bri’s production dashboard. Production identity headers must come from the Sites dispatcher; do not expose the Worker directly behind an untrusted proxy.

Catalog and events are public projections; supporter names, emails, and notes are restricted to the admin API. Optimistic revision checks prevent stale dashboard saves and concurrent requests from overwriting each other. Uploads are restricted to raster images under 5 MB.

## Listing galleries

Each listing supports up to 60 uploaded photos, with captions, cover ordering, and optional links to variants. Existing single-photo listings remain compatible. Homepage cards show a swipeable cover and compact thumbnail strip; supporters can expand the gallery or browse all photos inside the request form. Linked photos and named design selection stay synchronized, and out-of-stock designs cannot be requested.

UNHCR impact copy is adapted from the owner-supplied Runner One Pager. Dollar examples describe potential support, not guaranteed gift allocations.

## Configuration and launch

The configured Formspree endpoint sends notifications with `[LONDON FUNDRAISER]` in the subject. Verify delivery with a real request before launch. Its free plan has submission limits. Delivery failure does not remove the saved request.

Initial stock is deliberately empty. Add photos, variants, individual piece counts, and publish settings through the dashboard. Sourdough starts as coming soon. The plant raffle is a draft requiring a photo, closing date, and entry/pickup details; resolve applicable raffle requirements before launch. Requests are not paid raffle entries until Bri verifies payment.

Sites provisions storage through `.openai/hosting.json` and applies schema migrations when publishing. No secrets, payment processing, or supporter records are committed to Git. The hero is an AI-created illustrative mood image, not a product photo.

## Validation

Type check: `npx tsc --noEmit`.
Build: `npm run build`.
Flow checks: `node --experimental-vm-modules scripts/verify-flows.mjs`.

Test donation requests, notification delivery, inventory confirmation/cancellation, and owner-only access before public sharing. Product photographs and starting quantities remain owner-supplied.
