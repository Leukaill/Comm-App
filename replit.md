# BPN NGO Mobile PWA

## Overview
BPN (Business Professionals Network) is a mobile-first progressive web application designed for an NGO that connects business professionals. The application serves as a networking platform where professionals can access events, notes, connect with other members, and participate in community activities. The design follows iOS-inspired patterns with a professional yet approachable interface, targeting business professionals while remaining accessible to all beneficiaries.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system implementing iOS-inspired aesthetics
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider supporting light/dark modes with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **API Structure**: RESTful APIs with `/api` prefix routing
- **Session Management**: PostgreSQL session store using connect-pg-simple
- **Development**: Hot module replacement with Vite integration

### Mobile-First Design System
- **Progressive Web App**: Full PWA capabilities with mobile-optimized viewport settings
- **Navigation Pattern**: Bottom tab navigation (Home, Events, Notes, Network, Profile)
- **Component Library**: Custom components following iOS design patterns including cards, avatars, floating action buttons
- **Typography**: Inter font family with iOS-inspired weight hierarchy
- **Color System**: Professional blue primary palette with semantic color tokens for success, warning, and error states

### Data Models
- **User System**: Basic authentication with username/password using PostgreSQL UUID primary keys
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development
- **Schema Management**: Drizzle migrations with Zod validation schemas

### Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for server compilation
- **Development Server**: Express server with Vite middleware integration
- **Type Safety**: Strict TypeScript configuration across client, server, and shared modules
- **Path Aliases**: Organized imports using @ aliases for components, utils, and shared modules

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with React DOM and TypeScript support
- **Build Tools**: Vite with React plugin and runtime error overlay for Replit integration
- **State Management**: TanStack React Query for server state and caching

### UI and Design Dependencies  
- **Component Library**: Radix UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, etc.)
- **Styling**: Tailwind CSS with PostCSS, class-variance-authority for component variants
- **Icons**: Lucide React icon library
- **Animations**: Embla Carousel for announcement carousels
- **Utilities**: clsx and tailwind-merge via custom cn utility function

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL with Drizzle ORM
- **Session Management**: connect-pg-simple for PostgreSQL-based session storage
- **Validation**: Drizzle-Zod integration for schema validation
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development and Tooling
- **Type Checking**: TypeScript with strict configuration
- **Development Server**: Vite development server with HMR
- **Database Tools**: Drizzle Kit for schema management and migrations
- **Replit Integration**: Custom Vite plugins for Replit development environment

### Asset Management
- **Static Assets**: Images stored in attached_assets directory with generated content for announcements and UI elements
- **Font Loading**: Google Fonts (Inter) with preconnect optimization
- **PWA Assets**: Configured meta tags for mobile web app experience