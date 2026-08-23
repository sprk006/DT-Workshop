# DT Workshop

React + TypeScript + Vite web app, wired to Supabase, packaged as an Android APK via Capacitor.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and anon key.
3. `npm run dev` to run the web app locally.

## Building the Android APK

```bash
npm run build
npx cap sync android
npx cap open android
```

Then build/run the APK from Android Studio.
