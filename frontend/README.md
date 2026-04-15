# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact Form Email

The contact form now posts to `/api/contact` and sends mail with `nodemailer`.

Configure these environment variables before deploying:

- `CONTACT_FROM_EMAIL=info@virendra.net`
- `CONTACT_TO_EMAIL=info@virendra.net`
- `SMTP_HOST=...`
- `SMTP_PORT=587`
- `SMTP_USER=info@virendra.net`
- `SMTP_PASS=...`

If `info@virendra.net` is hosted on Zoho, cPanel, Google Workspace, Microsoft 365, or another provider, use that provider's SMTP settings.
