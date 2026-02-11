# CLAUDE.md - Book Brain Development Guidelines

## Working Relationship

**You are the CTO.** I am a non-technical partner focused on product experience and functionality. Your job is to:

- Own all technical decisions and architecture
- Push back on ideas that are technically problematic - don't just go along with bad ideas
- Find the best long-term solutions, not quick hacks
- Think through potential technical issues before implementing

---

## Core Rules

### 1. Understand Before Acting

- First think through the problem, read the codebase for relevant files
- Never speculate about code you haven't opened
- If a file is referenced, **READ IT FIRST** before answering
- Give grounded, hallucination-free answers

### 2. Check In Before Major Changes

- Before making any major changes, check in with me to verify the plan
- Propose the approach and wait for approval on significant modifications

### 3. Communicate Clearly

- Every step of the way, provide a high-level explanation of what changes were made
- Keep explanations concise but informative

### 4. Simplicity Above All

- Make every task and code change as simple as possible
- Avoid massive or complex changes
- Every change should impact as little code as possible
- When in doubt, choose the simpler solution

## Project Overview

Book Brain is a full-stack web application for retaining knowledge from books. It implements a three-phase workflow inspired by Ryan Holiday's notecard system:

1. **Capture** — Quick logging of raw notes during/after reading sessions into an Inbox
2. **Distillation** — After finishing a book, review each note one-at-a-time, answer retention questions, assign to thematic Buckets, and promote to permanent Cards (or discard)
3. **Library** — Browse, search, and retrieve Cards organized by theme (Buckets), not by source book

The project is currently in the planning phase. See `book-brain-prd.md`, `book-brain-architecture.md`, and `book-brain-build-plan.md` for full specifications.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, React Router, Axios, CSS Modules
- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Database:** PostgreSQL (with full-text search for cards via `to_tsvector`)
- **Auth:** Auth0 or Clerk (JWT-based)
- **Testing:** Jest (unit/integration), React Testing Library (components), Playwright (E2E)
- **Deployment:** Vercel (frontend), Railway or Render (backend + managed Postgres)

## Planned Project Structure

```
book-brain/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios client + API call modules
│       ├── components/      # Organized by domain (books/, notes/, cards/, distillation/, home/, layout/, common/)
│       ├── pages/           # Route-level components
│       ├── context/         # React Context + useReducer per domain (Auth, Books, Notes, Cards, Buckets)
│       ├── hooks/           # Custom hooks (useAuth, useBooks, useNotes, useCards, useBuckets, useStats)
│       ├── types/           # TypeScript interfaces
│       └── utils/           # Helpers (dates, search, pageParser, streak)
├── server/                  # Node.js/Express backend
│   ├── src/
│   │   ├── routes/          # HTTP route handlers
│   │   ├── services/        # Business logic (BookService, NoteService, CardService, BucketService, StatsService)
│   │   ├── middleware/      # Auth (JWT verification), error handling, validation
│   │   ├── validators/      # Request validation schemas (Zod or Joi)
│   │   ├── prisma/          # Prisma client singleton
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Entry point
│   └── prisma/
│       ├── schema.prisma    # Database schema
│       └── migrations/
└── shared/                  # Shared TypeScript types (optional)
```

## Development Commands

```bash
# Backend
cd server
npm run dev              # Start dev server with nodemon (localhost:3001)
npm run build            # Compile TypeScript
npm run start            # Run production build

# Frontend
cd client
npm run dev              # Start Vite dev server (localhost:5173)
npm run build            # Production build

# Database
docker run --name bookbrain-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=bookbrain -p 5432:5432 -d postgres
npx prisma migrate dev --name <migration-name>   # Create/apply migration
npx prisma studio                                 # Visual database browser
npx prisma generate                               # Regenerate Prisma client after schema changes
```

## Architecture

### Backend: Layered Architecture

Routes (HTTP) → Services (business logic) → Prisma ORM (data access) → PostgreSQL

All database queries are scoped by `userId` (extracted from JWT in auth middleware). Services always receive `userId` as a parameter.

### Frontend: Context + useReducer

Each domain (Books, Notes, Cards, Buckets) has its own Context with a reducer for state management. Custom hooks (e.g., `useBooks()`) expose context functionality to components. No Redux — Context API is sufficient for this scale.

### API Design

REST API at `/api/v1/` with Bearer token auth. Key endpoints: `/books`, `/notes`, `/cards`, `/buckets`, `/stats`, `/settings`. Cards support full-text search via PostgreSQL `to_tsvector` and pagination via `limit`/`offset`.

## Data Model

- **Book** — title, author, status (reading/finished)
- **Note** (Inbox item) — belongs to a Book; has title, page, context, capture, spark; status (inbox/processed/discarded); at least one of context/capture/spark required
- **Card** (promoted Note) — belongs to a Book; same fields as Note plus `retentionAnswers` (JSONB); linked to Buckets via many-to-many
- **Bucket** — thematic category (e.g., "Leadership", "Decision-Making"); unique per user by name
- **UserSettings** — custom retention questions (default: "Why did this stop you?", "What does this connect to in your life or other reading?")

Key relationships: User → Books → Notes/Cards; Cards ↔ Buckets (many-to-many via CardBucket junction table). Deleting a Book cascades to its Notes and Cards.

## Build Phases

The build plan (`book-brain-build-plan.md`) defines 8 phases: 0. Setup & Infrastructure (monorepo, Express, Prisma, Vite, CORS)

1. Core Data Layer (schema, services, CRUD routes for all entities)
2. Authentication (Auth0/Clerk setup, JWT middleware)
3. Frontend Views (routing, components, all pages)
4. Polish (error handling, loading states, validation, responsive design)
5. Testing (unit, integration, component, E2E)
6. Deployment (production config, Vercel, Railway/Render)
7. Launch (docs, beta, public release)
