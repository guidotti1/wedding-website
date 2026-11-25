# Thomas & Erika — wedding website

A responsive, multi-page wedding site for the June 25–26, 2027 celebration in the Columbus, Ohio area.

## Add your photos
The site references local image files so your personal photos stay under your control. Add the provided photos to an `images/` folder in the repository using these exact filenames (or update the corresponding `src` values in the HTML):

- `couple-florence.jpg` — home page and gallery
- `couple-iceland.jpg` — home-page feature and gallery
- `couple-waterfall.jpg`
- `couple-city.jpg`
- `couple-evening.jpg`
- `couple-outdoors.jpg`

The chat attachments are not automatically copied into GitHub. Until these six files exist in the repository at those paths, Cloudflare Pages will return 404s for the photo URLs. Download the images from this conversation, rename them as listed, and commit/upload them under `images/` (case-sensitive).

## Before sharing with guests
- Replace `[add RSVP deadline]` in `index.html` with the reply-by date.
- Connect the RSVP form to a form provider or backend. It is currently a front-end preview and does not send or save submissions.
- Add confirmed addresses, hotel recommendations, transportation information, and the welcome-party time when available.
- Verify map results and venue details with the venues.

Open `index.html` in a browser to preview the site. No build step is required.
