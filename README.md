# Pace Converter Table

A mini React + Vite project focused on displaying a running pace conversion table, optimized for mobile usage.

## Project Goal

This is a small UI-focused project whose main purpose is to render a clean, readable conversion table on both desktop and mobile, with a mobile-first behavior for scrolling and navigation.

## Features

- Pace to speed conversion (`min/km` -> `km/h`)
- Estimated times for:
  - 5 km
  - 10 km
  - Half marathon
  - Marathon
- Sticky header and sticky first column for easier navigation
- Click-to-select row highlight for better readability
- Mobile-optimized horizontal scrolling for smaller screens

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    PaceConversionTable.tsx
  utils/
    pace.ts
  App.tsx
  main.tsx
  index.css
```

## License

This project is available under the MIT License.
