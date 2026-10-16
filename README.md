# Advanced Business Website Starter

A polished, responsive, multi-page HouseCalls Home Care website starter built with plain HTML, CSS and JavaScript.
It is intentionally dependency-free so it can run locally or be deployed to static hosting.

## Important before publishing
The business identity and main contact details were cross-checked against the official website, https://housecallshc.org/. Opening hours and WhatsApp are not added because they were not verified. Confirm image reuse permissions and the exact office location before publishing.

The contact form is front-end validated but does **not** send email or store enquiries until a backend or form provider is configured. It shows a clear message about this limitation.

## Pages
- `index.html` — homepage
- `about.html` — about the business
- `services.html` — editable services overview
- `gallery.html` — image gallery placeholder
- `contact.html` — contact details, map link, validated form
- `privacy.html` — privacy policy draft
- `terms.html` — terms draft
- `404.html` — not found page

## Run locally
Option 1: Open `index.html` in your browser.

Option 2 (recommended): from this folder run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Edit business information
Edit `assets/js/business-config.js`. All pages read the same config file, so the name, tagline, address, phone and page navigation stay consistent.

For the logo and photos:
- Put approved files under `assets/images/`.
- Update image paths in `business-config.js` and the gallery data in `assets/js/site.js`.
- Use only images the business owns or has permission to use.

## Contact form production setup
The form currently validates input in the browser and then explains that delivery is not configured. To make it production-ready, connect it to a secure backend or a reputable form provider. Add server-side validation, spam protection/rate limiting, and a privacy notice. Never put private API keys in front-end JavaScript.

## Deployment
Suitable for Netlify, Cloudflare Pages, GitHub Pages, or any static web host.
1. Update the config and replace all placeholders.
2. Add approved business images.
3. Connect the contact form backend/provider.
4. Test all links and form submission.
5. Upload the project folder to your host or push it to GitHub and connect the repository.
6. Add your custom domain and enable HTTPS in hosting settings.
7. Verify metadata, sitemap, robots.txt, and contact details after deployment.

## Quality status
This is a starter implementation, not a verified live deployment. Test responsive behavior and all links in your target browsers before launch. No live deployment or real contact-form delivery has been performed.
