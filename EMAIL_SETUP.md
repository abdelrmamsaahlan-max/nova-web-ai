# Nova Web AI email system

The contact form now uses a server-side Vercel Function at `/api/contact` and Resend. The Resend API key is never exposed in browser JavaScript.

## One-time setup

1. Create a Resend account.
2. Create an API key in Resend.
3. In the Vercel project settings, add an Environment Variable:
   - Name: `RESEND_API_KEY`
   - Value: your Resend API key
   - Enable it for Production and Preview as needed.
4. Redeploy the project.

Do **not** put the API key in `index.html`, `script.js`, or any public file.

## What happens after setup

- Visitor submits the Nova Web AI form.
- `/api/contact` validates the request server-side.
- Nova Web AI receives a formatted notification at `sniperalt17@gmail.com`.
- The visitor receives an automatic confirmation email.
- Replying to the owner notification replies directly to the visitor's submitted email.
- Resend provides delivery/event logs for troubleshooting.

The implementation currently uses Resend's `onboarding@resend.dev` sender for initial setup. For a fully branded sender such as `hello@novawebai.com`, verify a domain in Resend and change `FROM_EMAIL` in `api/contact.js`.
