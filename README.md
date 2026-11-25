# Thomas & Erika — wedding website

A responsive, multi-page wedding site for the June 25–26, 2027 celebration in the Columbus, Ohio area.

## Wedding photos
The ten photo files are now in the repository root. `engagement.jpg` is the main image on the home page. The other nine images are included in the gallery, and `florence-photo1.jpg` also appears in the home-page feature section.

Image references currently use the root-level filenames (for example, `engagement.jpg`) so they match the files already committed and work with the Cloudflare Pages build. The current repository editing tools can update text files but cannot relocate the committed binary image files into a directory. To physically move them into `images/`, move the ten files in a local Git checkout, update the HTML image paths to `images/<filename>`, and commit that change.

## Before sharing with guests
- Replace `[add RSVP deadline]` in `index.html` with the reply-by date.
- Connect the RSVP form to a form provider or backend. It is currently a front-end preview and does not send or save submissions.
- Add confirmed addresses, hotel recommendations, transportation information, and the welcome-party time when available.
- Verify map results and venue details with the venues.

Open `index.html` in a browser to preview the site. No build step is required.
