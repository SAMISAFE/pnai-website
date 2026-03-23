# PNAI Website — אתר PNAI

## Quick Edit Guide

To change your business details, open `app/page.js` and edit the `CONFIG` object at the top:

```js
const CONFIG = {
  whatsappNumber: "972541234567",  // ← Your WhatsApp number (country code, no +)
  ownerName: "Sami Safe",          // ← Your name
  email: "sami@pnai.co.il",       // ← Your email
  phone: "054-XXX-XXXX",          // ← Your phone
  domain: "pnai.co.il",           // ← Your domain
  tier1Price: "החל מ-₪2,500",     // ← Tier 1 price
  tier2Price: "החל מ-₪7,500",     // ← Tier 2 price
}
```

---

## Deployment Guide: GitHub + Vercel (Step by Step)

### Step 1: Create a GitHub Account
1. Go to https://github.com and click "Sign Up"
2. Create your account (free)
3. Verify your email

### Step 2: Upload This Project to GitHub
1. After logging in, click the **+** button (top right) → **New repository**
2. Name it: `pnai-website`
3. Set it to **Private**
4. Click **Create repository**
5. On the next page, click **"uploading an existing file"** link
6. Drag ALL the files from this project folder into the upload area
7. Click **Commit changes**

### Step 3: Deploy on Vercel
1. Go to https://vercel.com and click **Sign Up**
2. Choose **Continue with GitHub** (connects your accounts)
3. Click **Add New → Project**
4. Find `pnai-website` in your repository list and click **Import**
5. Leave all settings as default — Vercel auto-detects Next.js
6. Click **Deploy**
7. Wait 1-2 minutes — your site is LIVE!

### Step 4: Connect Your Domain (Optional)
1. In your Vercel project dashboard, go to **Settings → Domains**
2. Type your domain (e.g., `pnai.co.il`) and click **Add**
3. Vercel will show you DNS records to add
4. Go to your domain registrar and add those DNS records
5. Wait 5-30 minutes for DNS to propagate
6. Your site is now live on your custom domain!

---

## Making Changes

### Simple text changes:
1. Go to your repository on GitHub
2. Open `app/page.js`
3. Click the pencil icon (edit)
4. Make your changes
5. Click **Commit changes**
6. Vercel auto-deploys in ~30 seconds!

### Bigger changes:
1. Describe what you want to Claude
2. Claude generates updated code
3. Replace the file on GitHub
4. Vercel auto-deploys

---

## Tech Stack
- **Next.js 14** — React framework
- **Vercel** — Hosting (free tier)
- **Heebo** — Hebrew font (Google Fonts)
- No database needed for this version
