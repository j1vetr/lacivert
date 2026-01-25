# Lacivert Teknoloji - Corporate IT & Satellite Solutions Website

## Overview

This is a corporate website for Lacivert Teknoloji, a Turkish technology company specializing in IT services, cybersecurity, satellite communications (Starlink, OneWeb, Iridium), and land-based network solutions (Peplink, Teltonika). The website is a modern, responsive React application with internationalization support (Turkish/English), featuring interactive 3D visualizations, a chatbot, and comprehensive service pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom plugins for meta images and Replit integration
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme configuration, shadcn/ui components (New York style)
- **State Management**: TanStack React Query for server state
- **3D Graphics**: React Three Fiber with Three.js for interactive globe and orbital visualizations
- **Internationalization**: i18next with browser language detection

### Backend Architecture
- **Runtime**: Node.js with Express
- **Development**: tsx for TypeScript execution, Vite dev server integration
- **Production**: esbuild bundling, static file serving
- **API Pattern**: RESTful endpoints under `/api` prefix

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (via Neon serverless driver)
- **Schema**: Located in `shared/schema.ts` with Zod validation integration
- **Current Tables**: Users table with UUID primary keys

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and configurations
│   └── public/           # Static assets
├── server/           # Backend Express application
├── shared/           # Shared types and schemas
└── migrations/       # Database migrations
```

### Key Design Patterns
- **Component-based architecture** with shadcn/ui primitives
- **Path aliases**: `@/` for client source, `@shared/` for shared modules
- **Theme system**: CSS variables with dark/light mode support via ThemeProvider
- **Form handling**: React Hook Form with Zod validation

## External Dependencies

### Third-Party Services
- **Database**: Neon PostgreSQL (serverless, requires `DATABASE_URL` environment variable)
- **Fonts**: Google Fonts (Inter, Outfit)
- **Map Data**: TopoJSON world atlas from CDN

### Key NPM Packages
- **UI Components**: Full Radix UI primitives suite (dialog, dropdown, accordion, etc.)
- **3D Visualization**: @react-three/fiber, @react-three/drei, three.js
- **Data Fetching**: @tanstack/react-query
- **Validation**: Zod with drizzle-zod integration
- **Email**: nodemailer (types present, for contact forms)
- **Geo/Data**: d3-geo, d3-scale, topojson-client

### Build & Development Tools
- **Vite plugins**: React, Tailwind CSS, Replit-specific plugins (cartographer, dev-banner, runtime-error-modal)
- **Database tooling**: drizzle-kit for schema push (`npm run db:push`)