# Project Structure

## Overview
This project has been organized following Next.js best practices with a clean separation of concerns.

## Directory Structure

```
Aria-home/
├── public/                     # Static assets
│   ├── icon-*.{jpg,svg}       # App icons
│   ├── placeholder-*.*        # Placeholder images
│   └── news-collage.png       # News images
│
├── src/                        # Source code
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── api/               # API routes
│   │       └── weather/       # Weather API endpoint
│   │           └── route.ts
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (50+ components)
│   │   │
│   │   ├── features/         # Feature-specific components
│   │   │   ├── news-card.tsx
│   │   │   ├── news-feed.tsx
│   │   │   ├── search-bar.tsx
│   │   │   ├── search-result.tsx
│   │   │   ├── weather-widget.tsx
│   │   │   ├── install-prompt.tsx
│   │   │   ├── loading.tsx
│   │   │   └── empty.tsx
│   │   │
│   │   └── layout/           # Layout components
│   │       └── app-header.tsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Common utilities (cn helper, etc.)
│   │
│   └── styles/               # Global styles
│       └── globals.css       # Tailwind and global CSS
│
├── components.json           # shadcn/ui configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── package.json              # Dependencies and scripts
├── pnpm-lock.yaml            # Lock file
├── manifest.json             # PWA manifest
└── README.md                 # Project documentation
```

## Import Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of: import { Button } from "../../../../components/ui/button"
import { Button } from "@/components/ui/button"

// Available aliases:
@/components    -> src/components
@/hooks         -> src/hooks
@/lib           -> src/lib
@/styles        -> src/styles
@/app           -> src/app
```

## Component Categories

### UI Components (`src/components/ui/`)
Reusable, atomic UI components from shadcn/ui library:
- Form elements (button, input, select, etc.)
- Layout components (card, separator, etc.)
- Feedback components (alert, toast, dialog, etc.)
- Navigation (breadcrumb, menubar, tabs, etc.)

### Feature Components (`src/components/features/`)
Business logic and feature-specific components:
- `news-card.tsx` - Individual news article cards
- `news-feed.tsx` - News feed container
- `search-bar.tsx` - AI-powered search interface
- `search-result.tsx` - Search result display
- `weather-widget.tsx` - Weather information widget
- `install-prompt.tsx` - PWA install prompt
- `loading.tsx` - Loading states
- `empty.tsx` - Empty states

### Layout Components (`src/components/layout/`)
Page layout and structure:
- `app-header.tsx` - Main application header

## Configuration Files

- **tsconfig.json**: TypeScript configuration with `@/*` path alias pointing to `src/*`
- **components.json**: shadcn/ui configuration specifying component locations
- **next.config.mjs**: Next.js configuration for PWA features and typed routes
- **manifest.json**: PWA manifest for installable app features

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **AI Integration**: OpenAI GPT-4 for search
- **PWA**: Progressive Web App capabilities
