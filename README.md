# 🧪 Life's Potion

A whimsical, vintage-apothecary-themed motivational quote app. Click the
potion, choose a mood and language, and receive a quote pulled from a real
database — save favorites to your Grimoire, browse your own submitted notes
in your Archives, and leave suggestions at the Apothecary.

> **Add your own screenshot/GIF here** (I can't capture your live app myself — you'll need to do this step):
> 1. Run the app locally and get it looking good (the Potion screen or Quote Reveal screen make the best first impression)
> 2. Take a screenshot (Win+Shift+S on Windows), or record a short GIF of the click-through flow using a free tool like [ScreenToGif](https://www.screentogif.com/)
> 3. Save it into a new `docs/` folder in this repo, e.g. `docs/screenshot.png`
> 4. Replace this whole blockquote with: `![Life's Potion screenshot](docs/screenshot.png)`

## Features

- 🧪 Animated potion-click interaction leading into a mood/language picker
- 📜 Real quote database (216 starter quotes across 6 moods, in English, Hindi, Urdu, and Latin — never repeats the same quote twice in a row)
- 🔐 Real user accounts — register/login, passwords hashed with bcrypt, sessions via JWT
- 📖 **Grimoire** — save and search your favorite quotes
- 🗃️ **Archives** — a log of every note you've submitted through the Apothecary
- 🔥 Daily-visit streak tracker
- 🌐 Client-side routing (back/forward buttons work correctly)
- ✅ Backend test suite (Jest + Supertest) and a CI workflow that runs it on every push
- 🛡️ Rate limiting on auth routes, input validation on all write endpoints

## Tech stack

| Layer      | Tech |
|------------|------|
| Frontend   | React 18, Vite, React Router, Tailwind CSS (via CDN) |
| Backend    | Node.js, Express, Mongoose |
| Database   | MongoDB |
| Auth       | JWT + bcrypt |
| Testing    | Jest, Supertest |
| CI         | GitHub Actions |

## Project structure

```
potion-website/
├── frontend/            React + Vite app
│   └── src/
│       ├── components/  One component per screen
│       └── api/         Fetch wrapper for the backend
├── backend/              Express + MongoDB API
│   ├── models/          Mongoose schemas (User, Quote, Favorite, Suggestion, Visit)
│   ├── routes/          API route handlers
│   ├── middleware/       Auth middleware
│   └── __tests__/       Backend test suite
└── .github/workflows/    CI pipeline
```

## Setup

### Prerequisites
- Node.js 18+
- A MongoDB instance — either [MongoDB Atlas](https://mongodb.com/cloud/atlas) (free tier) or a local install

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run seed             # loads the starter quote library
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. API calls proxy to `http://localhost:5000`.

## Testing

```bash
cd backend
npm test
```

Tests run against a separate `potion_test` database (set `MONGODB_TEST_URI`
to point elsewhere if needed) so they never touch your real data. The
GitHub Actions workflow in `.github/workflows/backend-tests.yml` runs the
same suite automatically on every push, spinning up a throwaway MongoDB
instance in CI.

## API overview

| Method | Route | Auth required | Description |
|--------|-------|:---:|-------------|
| POST | `/api/auth/register` | – | Create an account |
| POST | `/api/auth/login` | – | Log in, returns a JWT |
| GET | `/api/quotes/random?mood=&lang=` | – | Get a random quote |
| GET | `/api/favorites` | ✅ | Get your saved quotes |
| POST | `/api/favorites` | ✅ | Save a quote |
| DELETE | `/api/favorites/:quoteId` | ✅ | Remove a saved quote |
| POST | `/api/suggestions` | ✅ | Submit a note to the Apothecary |
| GET | `/api/suggestions/mine` | ✅ | Get your own submitted notes |
| POST | `/api/visits` | – | Record today's visit (streak tracking) |
| GET | `/api/visits/streak` | – | Get current streak |

## Deployment

This app deploys as three separate pieces: frontend, backend, and database.

**Database — MongoDB Atlas**
1. Create a free M0 cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Under Network Access, allow access from anywhere (0.0.0.0/0) — needed since your backend host's IP isn't known in advance
3. Copy your connection string for use in the backend's environment variables

**Backend — Render (or Railway)**
1. Push this repo to GitHub (see below)
2. Create a new Web Service on [render.com](https://render.com), connect your GitHub repo, set the root directory to `backend`
3. Build command: `npm install` — Start command: `npm start`
4. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN` (your frontend's URL, added after the step below), `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`
5. Once deployed, note your backend's URL (e.g. `https://potion-backend.onrender.com`)

**Frontend — Vercel (or Netlify)**
1. Import the same GitHub repo on [vercel.com](https://vercel.com), set the root directory to `frontend`
2. Add environment variable `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
3. Deploy — Vercel auto-detects the Vite build settings
4. Copy your frontend's URL, go back to your backend's environment variables on Render, and set `CLIENT_ORIGIN` to it (fixes CORS)

### Common deployment issues

| Problem | Likely cause | Fix |
|---|---|---|
| Frontend loads but nothing works, network errors in console | `VITE_API_URL` missing or wrong | Double-check it points to your backend + `/api`, redeploy frontend |
| "CORS error" in browser console | `CLIENT_ORIGIN` on the backend doesn't match your actual frontend URL | Update it on Render, redeploy backend |
| Backend crashes on start | `MONGODB_URI` or `JWT_SECRET` missing on the host | Check the host's environment variable settings, not just your local `.env` (which never gets deployed) |
| Backend works but times out on first request | Free-tier hosts (Render) spin down when idle and take ~30s to wake up | Normal for free tier — first request after inactivity is just slow, not broken |
| Emails don't send in production | Same Gmail/SMTP credentials issue as local dev | Re-verify `SMTP_USER`/`SMTP_PASS` are set correctly in the host's environment variables |
| 404 on page refresh (e.g. refreshing `/grimoire`) | Host doesn't know to serve `index.html` for client-side routes | Most static hosts (Vercel/Netlify) handle this automatically for Vite/React apps — if not, add a rewrite rule sending all paths to `index.html` |

## Getting this onto GitHub

```bash
cd potion-website
git init
git add .
git commit -m "Initial commit"
```
Then create a new empty repository on GitHub (no README/license — you already have one), and:
```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## Roadmap

- [ ] Deploy (frontend → Vercel/Netlify, backend → Render/Railway, DB → MongoDB Atlas)
- [ ] Connect the companion [Telegram quote bot](#) as a shared data source
- [ ] Replace the hardcoded English/Latin toggle with a real i18n library

## Password reset & email

Registration now requires an email, and there's a full forgot/reset password
flow (`/login` → "Forgot your password?" → emailed link → `/reset-password`).

### Sending real emails via Gmail

By default, no email setup is required — the backend automatically creates a
free Ethereal test inbox and prints a preview link to the terminal instead of
actually delivering anything (good for development, but nothing lands in a
real inbox). To send real emails through Gmail:

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Turn on **2-Step Verification** if it isn't already on (Gmail requires this before it'll let you create an app password)
3. In the search bar at the top of your Google Account settings, search "App Passwords" and open it
4. Under "App name," type something like `potion-website`, then click **Create**
5. Google shows you a 16-character password (like `abcd efgh ijkl mnop`) — copy it. This is **not** your normal Gmail password, and you'll only see it once.
6. In `backend/.env`, add:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=youraddress@gmail.com
   SMTP_PASS=abcdefghijklmnop
   ```
   (paste the 16-character app password with no spaces)
7. Restart your backend (`Ctrl+C`, then `npm run dev`). You should see `Mailer: using configured SMTP (smtp.gmail.com)` in the terminal instead of the Ethereal message.
8. Try "Forgot your password?" again — the email should now actually arrive in the inbox you requested it for, usually within a few seconds (check spam the first time).
