# AFA TOURS INNOVANT — V2 implementation plan

Official public brand: **AFRIQUE AUTHENTIQUE INNOVANT (AFA TOURS INNOVANT)**

Brand promise: **Découvrir l’Afrique à travers le Bénin.**

## Product decisions already confirmed
- Keep and extend the existing website; do not restart from a blank template.
- Official logo is the existing `afa-tours-logo.jpg` at the repository root.
- Brand colours must follow the logo. Photography will be replaced later with authentic AFA Tours photographs.
- Visitors can browse, book, contact the team and publish a review without creating an account.
- Offer two booking paths: request/book an existing tour, or request a tailor-made itinerary.
- Both on-site messaging and WhatsApp contact are required.
- Visitors may submit written reviews and optionally attach photos or videos.
- Administration must be simple for the AFA Tours team.
- Target public domain: `afatours.com`.

## Important current limitation
The current GitHub Pages site is a static front end. A static website alone cannot securely store shared bookings, messages, public reviews or visitor media. Browser local storage is not a shared database and must not be used to pretend that public submissions have been saved.

## Recommended production architecture
- Front end: retain the existing HTML/CSS/JavaScript website and GitHub Pages deployment for now.
- Database and anonymous submissions: Supabase (Postgres + Edge Functions).
- Media: Supabase Storage, with upload size/type limits and server-side validation.
- Abuse protection: rate limiting and CAPTCHA/Turnstile on public forms; validate all submissions server-side.
- Admin: private dashboard protected by Supabase Auth; visitors do not need accounts.
- Messaging: website contact thread / enquiry form routed to the admin inbox; WhatsApp remains a separate direct channel.
- Reservations: booking request first; team confirms availability and price. Online payment can be added after a payment provider and settlement account are selected. Never collect card details directly in this website.
- Reviews: public submission without account, moderation queue before publication, optional media attachment, spam protection.
- Privacy: publish a privacy notice, retention policy and consent text for submitted images/videos.

## Core data modules
1. Tours and experiences: title, location, duration, language, price basis, availability, description, status, cover media.
2. Reservations: guest contact, tour or custom itinerary, preferred date, party size, message, status, quote, confirmation reference.
3. Reviews: display name, rating, text, optional trip/date, optional media, moderation status.
4. Messages: visitor contact, subject, message, conversation status, timestamps.
5. Media: storage path, media type, uploader context, consent and moderation status.
6. Admin users and audit trail: roles, changes and timestamps.

## Release gates before launch
- Verify every form from a phone and desktop.
- Test anonymous booking and review submission end-to-end.
- Verify uploaded images/videos are size-limited, validated and moderated.
- Test admin authentication and ensure visitors cannot read private reservations/messages.
- Configure backups, domain DNS, HTTPS, analytics consent and privacy page.
- Keep the current production branch unchanged until the V2 release is reviewed.

## Pending configuration (must be supplied by the owner)
- Supabase project URL and public anon key (never a service-role key in browser code).
- AFA Tours WhatsApp number confirmation.
- Admin email addresses and team roles.
- Booking confirmation workflow and cancellation rules.
- Payment provider decision and business settlement details.
- Exact legal business address and privacy contact.
