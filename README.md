# Fydnex

A full-funnel campaign marketplace for brands and creators. This is the MVP
starting point: a home page and a working Brand Signup form connected to
Supabase.

## How to get this live (no local install needed)

### 1. Upload these files to your GitHub repo

- Unzip this folder on your computer.
- Go to your `FYDNEX` repo on GitHub.
- Click **Add file -> Upload files**.
- Drag the *entire unzipped folder* into the upload box (modern browsers
  preserve the folder structure automatically).
- Scroll down, click **Commit changes**.

### 2. Add your Supabase keys as Vercel environment variables

- Go to [vercel.com](https://vercel.com), sign in with GitHub.
- Click **Add New -> Project**, pick your `FYDNEX` repo, click **Import**.
- Before deploying, expand **Environment Variables** and add:
  - `NEXT_PUBLIC_SUPABASE_URL` = (from Supabase -> Project Settings -> API)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (same page)
- Click **Deploy**.

### 3. Test it

- Once deployed, Vercel gives you a live URL (e.g. `fydnex.vercel.app`).
- Visit `/brand/signup`, fill the form, submit.
- Check your Supabase `brands` table — a new row should appear.

That's the whole loop working end to end: real hosted app, real database,
zero local setup.

## Local development (optional, only if you later install Node.js)

```bash
npm install
cp .env.local.example .env.local   # then fill in your real keys
npm run dev
```
