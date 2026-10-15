# UmmahPulse

A calm, year-round Islamic digital companion — Qur'an, salah, dhikr, du'a
and the Islamic calendar, with Ramadan as one seasonal experience inside
the platform rather than the whole identity of it.

## Stack

- Next.js 14 (App Router) + TypeScript
- No CSS framework — a small hand-rolled design system in `app/globals.css`
  (deep green / cream / off-white / muted gold, Fraunces + Inter via `next/font`)
- [Al Adhan API](https://aladhan.com/prayer-times-api) for real prayer times — free, no API key
- `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The whole app is a single client-side
experience (see "Why is the app client-only?" below), so there's no
database or backend to set up locally.

## Project structure

```
app/                  Next.js App Router entry (page.tsx, layout.tsx, globals.css)
components/
  home/                Landing page, year-round Dashboard, Ramadan countdown, season teaser
  worship/             Prayer engine UI, Dhikr counter, Du'a library
  journey/             My Journey hub
  calendar/            Today card + full Islamic calendar view
  community/           Community hub — stories (fiction) + discussion live together
  learn/               Learn hub
  navigation/          TopBar, BottomNav, More menu
  ui/                  Small shared presentational pieces
lib/
  prayer/              Al Adhan API client, schedule building, time formatting
  calendar/            Hijri date math
  seasons/              getActiveSeason() — decides what Home features
  storage/             SSR-safe localStorage helpers
data/                  Static content: reflections, du'a categories, nav items, etc.
hooks/                 useNow, usePrayerEngine
types/                 Shared TypeScript types
```

## Prayer times

Real data from the Al Adhan API — **no API key required**. The only
network call is in `lib/prayer/aladhan.ts`; if you ever swap providers,
that's the one file to change.

Users can grant browser geolocation or pick a city manually (a curated
list including major Nigerian cities, plus free-text for anywhere else).
Calculation method and Asr school are user-selectable in Prayer Settings
(reachable from Worship's gear icon or More → Prayer Settings) — no
method is hardcoded as "correct."

## Persistence

Location and prayer settings are saved to the browser's `localStorage`
(see `lib/storage/local.ts`), so returning users don't have to re-enter
them. Nothing is sent to a server.

Personal data — the Dhikr counter (round count, target, daily totals for
the last 90 days) and saved reminders — lives in one store:
`lib/storage/journey.ts` (data rules) and `hooks/useJourney.ts` (React
hook, called once in `components/App.tsx`). The Dhikr counter, the Home
dashboard and My Journey all read from it, so they always agree. Data is
stored per device and browser; clearing browser data erases it.

## Why is the app client-only?

Almost everything UmmahPulse shows is inherently browser-only: the live
clock, geolocation, localStorage, and second-by-second countdowns. Rather
than fight Next.js's server rendering for content that's different on
every load, `app/page.tsx` loads the whole app via `next/dynamic` with
`ssr: false`. This avoids hydration-mismatch warnings and SSR crashes
entirely — see the comment in `app/page.tsx` and `hooks/useNow.ts`.

## Environment variables

None are required. `.env.example` documents one optional variable
(`NEXT_PUBLIC_PRAYER_API_BASE`) for future use if you ever put a proxy
in front of the Al Adhan API.

## Deploying on Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel — it auto-detects Next.js, no configuration needed.
3. No environment variables need to be set for prayer times to work.
4. Deploy.

## What's still mocked or unfinished

- **Qur'an progress** is not tracked yet. Home, Worship and My Journey
  say so plainly instead of showing sample numbers.
- **Saved du'as, saved stories and personal goals** in My Journey show
  "Coming soon" — those features don't exist yet.
- **Du'a library** shows real categories but placeholder text instead of
  sourced Arabic/transliteration/translation — intentionally, rather than
  risk misquoting.
- **Learn and Community** (stories + discussion) are structured but the
  actual content (articles, fiction episodes, moderation) hasn't been
  built yet.
- **Share button** on the daily reminder does nothing yet.
- **No sync between devices** — data is local to one browser.
- **Islamic calendar occasions** use estimated dates for Ramadan 1448
  onward; update `data/occasions.ts` and `lib/seasons/ramadan.ts` as
  official dates are confirmed.
