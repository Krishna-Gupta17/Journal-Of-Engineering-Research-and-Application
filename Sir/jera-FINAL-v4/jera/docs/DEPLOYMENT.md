# JERA — Deployment & Setup Guide

## Journal of Engineering Research Application
**Tech Stack:** Next.js 15 · Express.js · PostgreSQL · Cloudflare R2 · NextAuth

---

## 1. Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥ 20 LTS | Runtime |
| pnpm / npm | ≥ 9 | Package manager |
| PostgreSQL | ≥ 15 | Database |
| Git | any | Version control |

---

## 2. Project Structure

```
jera/
├── src/                          # Next.js frontend
│   ├── app/                      # App Router pages (18 pages)
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx
│   │   ├── aims-scope/page.tsx
│   │   ├── editorial-board/page.tsx
│   │   ├── editorial-policies/page.tsx
│   │   ├── ethics-policy/page.tsx
│   │   ├── current-issue/page.tsx
│   │   ├── archives/page.tsx
│   │   ├── call-for-papers/page.tsx
│   │   ├── author-guidelines/page.tsx
│   │   ├── submit-manuscript/page.tsx
│   │   ├── peer-review/page.tsx
│   │   ├── publication-charges/page.tsx
│   │   ├── indexing/page.tsx
│   │   ├── downloads/page.tsx
│   │   ├── announcements/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── contact/page.tsx
│   │   └── articles/[id]/page.tsx  # Article detail
│   ├── components/
│   │   ├── layout/               # Header, Footer, PageWrapper, ThemeProvider
│   │   └── article/              # ArticleCard
│   ├── lib/data.ts               # Mock data (replace with API calls)
│   ├── types/index.ts            # TypeScript types
│   └── styles/globals.css        # Design system & Tailwind
├── backend/                      # Express.js API
│   └── src/
│       ├── server.ts             # Entry point
│       ├── db.ts                 # PostgreSQL pool
│       ├── middleware/auth.ts    # JWT auth middleware
│       ├── lib/utils.ts          # DOI, tracking number generators
│       └── routes/
│           ├── articles.ts       # Full CRUD + submission + publish
│           ├── reviews.ts        # Peer review workflow
│           └── index.ts          # users, issues, announcements, upload, metrics
└── docs/
    ├── schema.sql                # Full PostgreSQL schema
    ├── DEPLOYMENT.md             # This file
    └── API.md                    # API reference
```

---

## 3. Local Development Setup

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-org/jera-journal.git
cd jera-journal

# Frontend
npm install

# Backend
cd backend && npm install && cd ..
```

### Step 2 — Environment Variables

```bash
# Frontend
cp .env.example .env.local

# Backend
cp .env.example backend/.env
```

Edit both files with your credentials (see `.env.example` for all required variables).

### Step 3 — Database Setup

```bash
# Create database
psql -U postgres -c "CREATE DATABASE jera_db;"

# Run schema
psql -U postgres -d jera_db -f docs/schema.sql

# Verify tables
psql -U postgres -d jera_db -c "\dt"
```

### Step 4 — Start Dev Servers

```bash
# Terminal 1: Next.js frontend (http://localhost:3000)
npm run dev

# Terminal 2: Express backend (http://localhost:4000)
cd backend && npm run dev
```

---

## 4. Production Deployment

### Option A — Vercel (Frontend) + Railway (Backend + DB)

**Frontend → Vercel**
```bash
npm install -g vercel
vercel --prod
# Set env vars in Vercel dashboard
```

**Backend + PostgreSQL → Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli
railway login

# Create project
railway init
railway up

# Add PostgreSQL plugin in Railway dashboard
# Set DATABASE_URL from Railway PostgreSQL connection string
```

### Option B — VPS (Ubuntu 22.04)

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Clone repo
git clone https://github.com/your-org/jera-journal.git /var/www/jera
cd /var/www/jera

# Build frontend
npm install && npm run build

# Build backend
cd backend && npm install && npx tsc && cd ..

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**PM2 ecosystem.config.js:**
```javascript
module.exports = {
  apps: [
    {
      name: 'jera-frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/jera',
      env: { NODE_ENV: 'production', PORT: 3000 },
    },
    {
      name: 'jera-api',
      script: 'dist/server.js',
      cwd: '/var/www/jera/backend',
      env: { NODE_ENV: 'production', PORT: 4000 },
    },
  ],
}
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/jera-journal.org
server {
    listen 80;
    server_name jera-journal.org www.jera-journal.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jera-journal.org www.jera-journal.org;

    ssl_certificate /etc/letsencrypt/live/jera-journal.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jera-journal.org/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# SSL with Let's Encrypt
sudo certbot --nginx -d jera-journal.org -d www.jera-journal.org
```

---

## 5. Cloudflare R2 Setup

```bash
# 1. Create R2 bucket in Cloudflare dashboard: "jera-manuscripts"
# 2. Enable public access or custom domain: files.jera-journal.org
# 3. Create API token with R2 permissions
# 4. Add to .env: R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
```

**Bucket structure:**
```
jera-manuscripts/
├── manuscripts/          # Submitted manuscript files
├── revised/              # Revised manuscripts
├── published/            # Final published PDFs
├── figures/              # Article figures
├── covers/               # Issue cover images
└── supplements/          # Supplementary materials
```

---

## 6. SEO & Google Scholar Setup

### Sitemap
Add `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://jera-journal.org', changeFrequency: 'daily', priority: 1 },
    { url: 'https://jera-journal.org/current-issue', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://jera-journal.org/about', changeFrequency: 'yearly', priority: 0.7 },
    // ... add all article URLs dynamically from DB
  ]
}
```

### Google Scholar Meta Tags
Each article page already includes Highwire Press citation_* meta tags required by Google Scholar.

### Crossref DOI Registration
1. Sign up at crossref.org as a member
2. Use the Crossref XML Deposit API to register DOIs
3. JERA DOI prefix: `10.56789` (update to your registered prefix)

---

## 7. Connecting Frontend to Backend API

Replace mock data in `src/lib/data.ts` with API calls:

```typescript
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchArticles(params?: Record<string, string>) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${API_URL}/api/articles?${qs}`, {
    next: { revalidate: 300 }, // ISR: cache 5 minutes
  })
  if (!res.ok) throw new Error('Failed to fetch articles')
  return res.json()
}

export async function fetchArticle(id: string) {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  return res.json()
}
```

---

## 8. API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/articles | Public | List published articles |
| GET | /api/articles/:id | Public | Article detail |
| POST | /api/articles/submit | Author | Submit manuscript |
| PATCH | /api/articles/:id/status | Editor | Update article status |
| POST | /api/articles/:id/publish | Editor | Publish to issue |
| GET | /api/articles/:id/download | Public | Download PDF |
| GET | /api/issues | Public | List all issues |
| GET | /api/issues/current | Public | Current issue |
| GET | /api/issues/:id/articles | Public | Issue articles |
| GET | /api/reviews/my | Reviewer | My review assignments |
| POST | /api/reviews/invite | Editor | Invite reviewer |
| PATCH | /api/reviews/:id/accept | Reviewer | Accept invitation |
| PATCH | /api/reviews/:id/decline | Reviewer | Decline invitation |
| POST | /api/reviews/:id/submit | Reviewer | Submit review |
| GET | /api/users/me | Any auth | My profile |
| POST | /api/users/register | Public | Register |
| GET | /api/users/submissions | Author | My submissions |
| POST | /api/upload/presign | Auth | R2 presigned URL |
| POST | /api/metrics/track | Public | Track view/download |
| GET | /api/announcements | Public | Journal announcements |

---

## 9. Design System

| Token | Value |
|-------|-------|
| Primary (Navy) | `#123458` |
| Secondary (Ocean Blue) | `#1E88E5` |
| Accent (Teal) | `#0F766E` |
| Background | `#F7F9FC` |
| Heading font | Merriweather (Google Fonts) |
| Body font | Inter (Google Fonts) |
| Border radius | `0.5rem` |
| Card shadow | `sm` + `md` on hover |

---

## 10. Accessibility (WCAG 2.1 AA)

- All interactive elements have `:focus-visible` ring outlines
- Color contrast ratios meet 4.5:1 minimum for normal text
- All images must have `alt` attributes
- Skip-to-main-content link (add to Header)
- ARIA labels on icon-only buttons
- Keyboard-navigable dropdown menus
- `lang="en"` on `<html>` element ✓
- `prefers-reduced-motion` respected in CSS ✓
- Dark mode supported via `dark:` Tailwind classes ✓

---

## 11. Maintenance Checklist

- [ ] Rotate JWT_SECRET every 90 days
- [ ] PostgreSQL backups daily (use pg_dump)
- [ ] R2 lifecycle rules for old manuscript versions
- [ ] Monitor Core Web Vitals (Vercel Analytics or Plausible)
- [ ] Update editorial board page when members change
- [ ] Submit new issue's articles to Google Scholar metadata
- [ ] Renew SSL certificates (auto-renews with Certbot)
- [ ] Review and update indexing applications (DOAJ, ROAD, Scopus)

---

*JERA v1.0.0 — Deployment Guide — June 2026*
