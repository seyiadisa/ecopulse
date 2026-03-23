# EcoPulse

EcoPulse is a modern environmental intelligence dashboard focused on air quality monitoring across major African cities. It combines authenticated access, interactive geospatial visualization, and trend analytics in a polished, responsive interface.

Built as a portfolio-grade frontend application with real API integration points, EcoPulse demonstrates product thinking, clean architecture, and strong UI execution.

## Highlights

- Real-time city-level air quality reads via OpenAQ-backed API routes
- Interactive Mapbox map with city markers and contextual side panel
- 30-day PM2.5 trend visualization with summary stats and thresholds
- Clerk-based authentication with protected dashboard routes
- Dark/light theming with persisted user preference
- Token-driven design system using Tailwind CSS v4 + CSS custom properties
- Mobile-first responsive layout with dedicated dashboard shell

## Tech Stack

- Next.js 16 (App Router, React Compiler enabled)
- React 19 + TypeScript (strict mode)
- Tailwind CSS v4
- Clerk (authentication)
- Mapbox GL JS (maps)
- Recharts (data visualization)
- TanStack Query (client-side data fetching/cache)

## Project Structure

```text
app/
	api/air-quality/
		data/route.ts          # Fetches latest pollutant readings for a location
		trends/route.ts        # Fetches 30-day PM2.5 trend data
	dashboard/
		layout.tsx             # Protected app shell (Sidebar + TopBar)
		page.tsx               # Interactive map + city detail panel
		trends/page.tsx        # PM2.5 trend analytics page
	sign-in/[[...sign-in]]/page.tsx
	sign-up/[[...sign-up]]/page.tsx
	layout.tsx               # Root providers (Clerk + Theme)
	page.tsx                 # Landing page

components/
	dashboard/               # Dashboard UI and chart/map components
	landing/                 # Landing page layout
	layout/                  # Shared UI primitives

lib/
	data.ts                  # Monitored city metadata
	utils.ts                 # AQI helpers + OpenAQ base URL

providers/
	query.tsx                # TanStack Query provider
	sidebar.tsx              # Sidebar state provider
	theme.tsx                # Light/dark theme context

types/
	index.ts                 # Shared domain types

proxy.ts                   # Clerk route protection middleware
```

## Routes

Public routes:

- /
- /sign-in
- /sign-up

Protected routes:

- /dashboard
- /dashboard/trends

## Environment Variables

Create a .env.local file in the project root:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
CLERK_SECRET_KEY=
OPENAQ_API_KEY=
```

Notes:

- NEXT_PUBLIC_MAPBOX_TOKEN is required for map rendering.
- Clerk keys are required for authentication.
- OPENAQ_API_KEY is required for successful OpenAQ API requests from server routes.

## Getting Started

### 1. Install dependencies

This project uses Bun as the primary package manager.

```bash
bun install
```

### 2. Run the development server

```bash
bun run dev
```

Open http://localhost:3000 in your browser.

### 3. Build for production validation

```bash
bun run build
```

## Available Scripts

- bun run dev: Start local development server
- bun run build: Build production bundle
- bun run start: Start production server
- bun run lint: Run ESLint
- bun run format: Format with Prettier

## Internal API Endpoints

- GET /api/air-quality/data?openaqId=<locationId>
  - Returns latest sensor readings for a location (for example pm25, pm10, etc.)

- GET /api/air-quality/trends?openaqId=<locationId>
  - Returns day-level PM2.5 trend points for the last ~30 days

## Monitored Cities

Current city set is maintained in lib/data.ts and includes:

- Lagos (Nigeria)
- Kigali (Rwanda)
- Cairo (Egypt)
- Accra (Ghana)
- Antananarivo (Madagascar)
- Dakar (Senegal)
- Addis Ababa (Ethiopia)

## Design System Notes

- Theme tokens are defined in app/globals.css and exposed through semantic Tailwind utilities.
- Use semantic classes (bg-background, text-foreground, bg-card, border-border, text-muted, bg-primary) over ad-hoc color values.
- AQI thresholds in utility logic are centered on PM2.5 ranges:
  - Good: <= 12
  - Moderate: <= 35
  - Unhealthy: >= 36

## Current Status

Implemented:

- End-to-end UI flow from landing page to authenticated dashboard
- Real API route integration for latest and trend air quality data
- Interactive map and trend analytics experiences
- Responsive dashboard shell and theme system

Planned / in progress:

- Search and notifications UX
- Expanded alerts workflow and export options
- Additional type safety and production hardening
- Deployment and environment documentation improvements

## Deployment

EcoPulse is ready to deploy on Vercel or any Node-compatible hosting platform.

For production deployments:

- Set all required environment variables in your hosting provider
- Run bun run build as part of CI/CD validation
- Verify Clerk allowed origins and redirect URLs for your deployed domain

## License

This project is intended for educational and portfolio use.
