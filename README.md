# TurfFlow — Football & Cricket Turf Arena

A premium, floodlit football and cricket turf slot booking & management system built for sports arenas.

## Features

- ⚽ **Instant Slot Booking**: Real-time interactive slot selector for 5-a-side football and box cricket.
- 📅 **Dynamic Slot Pricing**: Daytime, evening, and weekend prime rate calculations.
- 🏆 **Arena Facilities & Tournaments**: Photo galleries, facility overviews, and team event bookings.
- 📊 **Owner Dashboard**: Revenue analytics, booking management, slot calendar, customer tracking, and review moderation.
- 🎨 **Modern Neon UI**: Built with dark mode aesthetics, glassmorphism, and responsive layouts.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start)
- **Library**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Lucide Icons + Framer Motion
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Ensure you have Node.js (v20+) or Bun installed.

### Installation

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your console) to view the application.

### Production Build

To build the application for production:

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/      # UI, Site Header/Footer, Home sections
│   ├── data/            # Mock booking data & turf configuration
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── routes/          # TanStack Start file-based routes
│   ├── router.tsx       # Router configuration
│   ├── server.ts        # Server entry & SSR handler
│   └── styles.css       # Main design tokens & global CSS
├── public/              # Static assets & favicon
└── vite.config.ts       # Vite build configuration
```
