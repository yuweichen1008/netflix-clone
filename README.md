# Netflix Clone

A full-stack Netflix UI clone built with Next.js, TypeScript, Firebase, and the TMDB API.

![homepage](https://github.com/yuweichen1008/netflix-clone/blob/main/img/homepage.PNG?raw=true)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (SSR via `getServerSideProps`) |
| Language | TypeScript |
| Styling | Tailwind CSS + Material UI |
| Auth | Firebase Authentication |
| State | Recoil |
| Data | TMDB API |
| Forms | React Hook Form |
| Video | react-player (YouTube trailers) |

## Features

- Email/password authentication (sign up, sign in, sign out) via Firebase
- Server-side rendered home page with 8 movie categories fetched in parallel
- Horizontal scrollable movie carousels with chevron navigation
- Hero banner with a randomly featured Netflix Original
- Modal overlay with YouTube trailer playback, genre info, match score, and overview
- Mute/unmute toggle on the trailer player
- Inline form error messages (no browser alerts)
- Graceful fallback when a movie has no trailer

## Setup

### 1. Clone and install

```bash
git clone https://github.com/yuweichen1008/netflix-clone.git
cd netflix-clone
npm install
```

### 2. Environment variables

Create a `.env.local` file at the project root:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
```

Get a free TMDB API key at [themoviedb.org](https://www.themoviedb.org/settings/api).  
Firebase credentials are found in your Firebase project settings under **General → Your apps → SDK setup**.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/login` if you are not authenticated.

## Project Structure

```
├── atoms/          # Recoil global state (modal visibility, selected movie)
├── components/     # Banner, Header, Row, Thumbnail, Modal
├── constants/      # TMDB image base URL
├── hooks/          # useAuth (Firebase auth context)
├── pages/          # Next.js routes: / (home), /login
├── styles/         # Tailwind directives + global CSS
├── typings.d.ts    # Shared TypeScript types
└── utils/          # TMDB API endpoint map
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yuweichen1008/netflix-clone)

Add the two environment variables in your Vercel project settings before deploying.
