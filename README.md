# Habitus

A calm, offline-first habit tracker built with TanStack Start, React, Vite, and Tailwind CSS.

## Features

- Track daily habits in a visual calendar-style dashboard
- Drag and reorder habits directly in the tracker
- View streaks, weekly goals, heatmaps, and analytics
- Edit, add, import, export, and reset habits locally
- Works offline with local persistence

## Tech Stack

- React 19
- TanStack Start / TanStack Router
- Vite
- Tailwind CSS
- Zustand
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- npm, pnpm, or bun

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Deployment

This project is configured for Vercel deployment.

- Build command: `npm run build`
- Output is generated through Nitro's Vercel preset

If you connect the GitHub repo to Vercel, it should deploy with the default production settings. You can also set the build command explicitly to `npm run build`.

## Project Structure

- `src/routes/` - app pages and dashboard views
- `src/components/` - shared UI components
- `src/store/` - Zustand habit state
- `src/lib/` - utility functions
- `public/` - static assets and manifest files

## Notes

- Habit data is stored locally in the browser.
- Import/export uses JSON backups.
- The tracker supports drag-to-reorder on the main dashboard table.
