# Book Brain — Build Plan

## Overview

This document provides a step-by-step guide to building Book Brain from scratch. The plan is organized into phases, with each phase building on the previous one. Each step is small enough to complete in 1-4 hours.

**Total estimated time:** 60-80 hours for a solo developer

---

## Phase 0: Setup & Infrastructure (4-6 hours)

### Step 0.1: Initialize the Monorepo

**Goal:** Set up the project structure for both frontend and backend.

**Tasks:**
1. Create root directory `book-brain/`
2. Initialize git repository
3. Create directory structure:
   ```
   book-brain/
   ├── client/          # React frontend
   ├── server/          # Node.js backend
   ├── shared/          # Shared types (if needed)
   └── README.md
   ```
4. Create root `.gitignore`
5. Make initial commit

**Deliverable:** Empty project structure in git

---

### Step 0.2: Set Up Backend Project

**Goal:** Initialize Node.js/Express/TypeScript backend with Prisma.

**Tasks:**
1. In `server/`, run `npm init -y`
2. Install dependencies:
   ```bash
   npm install express cors dotenv
   npm install -D typescript ts-node nodemon @types/node @types/express @types/cors
   npm install prisma @prisma/client
   ```
3. Create `tsconfig.json` with strict settings
4. Create basic `src/app.ts` with Express hello world
5. Create `src/server.ts` entry point
6. Add scripts to `package.json`:
   ```json
   "scripts": {
     "dev": "nodemon src/server.ts",
     "build": "tsc",
     "start": "node dist/server.js"
   }
   ```
7. Verify server runs on `localhost:3001`

**Deliverable:** Express server returning "Hello World" on GET /

---

### Step 0.3: Set Up Database with Prisma

**Goal:** Configure Prisma and create initial schema.

**Tasks:**
1. Run `npx prisma init`
2. Set up local PostgreSQL (Docker recommended):
   ```bash
   docker run --name bookbrain-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=bookbrain -p 5432:5432 -d postgres
   ```
3. Update `.env` with DATABASE_URL
4. Create Prisma schema with User model only (for now)
5. Run `npx prisma migrate dev --name init`
6. Verify database created with `npx prisma studio`

**Deliverable:** Connected database with users table

---

### Step 0.4: Set Up Frontend Project

**Goal:** Initialize React/TypeScript frontend with Vite.

**Tasks:**
1. In `client/`, run `npm create vite@latest . -- --template react-ts`
2. Install additional dependencies:
   ```bash
   npm install react-router-dom axios
   npm install -D @types/react-router-dom
   ```
3. Clean up default Vite content
4. Create basic App.tsx with "Book Brain" heading
5. Verify app runs on `localhost:5173`

**Deliverable:** React app displaying "Book Brain"

---

### Step 0.5: Connect Frontend to Backend

**Goal:** Verify full-stack communication works.

**Tasks:**
1. Add CORS to backend (`app.use(cors())`)
2. Create test endpoint: GET `/api/health` returning `{ status: 'ok' }`
3. Create `client/src/api/client.ts` with Axios instance
4. Fetch health endpoint from React and display result
5. Verify cross-origin communication works

**Deliverable:** Frontend displaying data fetched from backend

---

## Phase 1: Core Data Layer (8-10 hours)

### Step 1.1: Complete Database Schema

**Goal:** Add all tables to Prisma schema.

**Tasks:**
1. Add Book model to schema
2. Add Note model with relations
3. Add Bucket model
4. Add Card model with relations
5. Add CardBucket junction table
6. Add UserSettings model
7. Run migration: `npx prisma migrate dev --name add-all-models`
8. Verify with Prisma Studio

**Deliverable:** Complete database schema matching architecture doc

---

### Step 1.2: Create Type Definitions

**Goal:** Define TypeScript types for all entities.

**Tasks:**
1. Create `server/src/types/index.ts`
2. Define interfaces: Book, Note, Card, Bucket, UserSettings
3. Define API request/response types
4. Create `client/src/types/` with matching types (or use shared folder)

**Deliverable:** Type definitions for all entities

---

### Step 1.3: Build Book Service & Routes

**Goal:** Implement CRUD operations for books.

**Tasks:**
1. Create `server/src/services/bookService.ts`:
   - `getBooks(userId)`
   - `getBook(userId, bookId)`
   - `createBook(userId, data)`
   - `updateBook(userId, bookId, data)`
   - `deleteBook(userId, bookId)`
2. Create `server/src/routes/books.ts` with routes
3. Add validation middleware (basic for now)
4. Test with Postman/curl (mock userId for now)

**Deliverable:** Working /api/books endpoints

---

### Step 1.4: Build Note Service & Routes

**Goal:** Implement CRUD operations for notes.

**Tasks:**
1. Create `server/src/services/noteService.ts`:
   - `getNotes(userId, filters)`
   - `getNote(userId, noteId)`
   - `createNote(userId, data)`
   - `updateNote(userId, noteId, data)`
   - `deleteNote(userId, noteId)`
2. Create `server/src/routes/notes.ts`
3. Implement filters: bookId, status
4. Test endpoints

**Deliverable:** Working /api/notes endpoints

---

### Step 1.5: Build Bucket Service & Routes

**Goal:** Implement CRUD operations for buckets.

**Tasks:**
1. Create `server/src/services/bucketService.ts`
2. Create `server/src/routes/buckets.ts`
3. Ensure unique constraint on (userId, name)
4. Test endpoints

**Deliverable:** Working /api/buckets endpoints

---

### Step 1.6: Build Card Service & Routes

**Goal:** Implement CRUD operations for cards with search.

**Tasks:**
1. Create `server/src/services/cardService.ts`:
   - `getCards(userId, filters)` — with search and bucket filter
   - `getCard(userId, cardId)`
   - `createCard(userId, data)` — includes bucket assignment
   - `updateCard(userId, cardId, data)` — includes bucket changes
   - `deleteCard(userId, cardId)`
2. Create `server/src/routes/cards.ts`
3. Implement full-text search (PostgreSQL to_tsvector)
4. Test endpoints including search

**Deliverable:** Working /api/cards endpoints with search

---

### Step 1.7: Build Stats Service & Route

**Goal:** Implement stats endpoint for home page.

**Tasks:**
1. Create `server/src/services/statsService.ts`:
   - `getStats(userId)` — returns totalBooks, totalCards, streak, cardsThisPeriod
2. Implement streak calculation logic
3. Create `server/src/routes/stats.ts`
4. Test endpoint

**Deliverable:** Working /api/stats endpoint

---

## Phase 2: Authentication (4-6 hours)

### Step 2.1: Set Up Auth0 (or Clerk)

**Goal:** Configure authentication provider.

**Tasks:**
1. Create Auth0 account and application
2. Configure allowed callbacks, logout URLs, web origins
3. Note down domain, client ID, audience
4. Create API in Auth0 dashboard

**Deliverable:** Auth0 configured for the application

---

### Step 2.2: Add Auth to Frontend

**Goal:** Implement login/logout in React.

**Tasks:**
1. Install `@auth0/auth0-react`
2. Create `AuthProvider` wrapper in App
3. Create `useAuth` hook
4. Add Login/Logout buttons to header
5. Protect routes that require auth
6. Attach JWT to API requests

**Deliverable:** Users can log in and out

---

### Step 2.3: Add Auth to Backend

**Goal:** Verify JWTs and protect routes.

**Tasks:**
1. Install `express-oauth2-jwt-bearer` (or `jsonwebtoken` + `jwks-rsa`)
2. Create auth middleware to verify tokens
3. Extract userId from token and attach to request
4. Apply middleware to all API routes
5. Create/update user in database on first request

**Deliverable:** All API routes require valid authentication

---

### Step 2.4: Test Full Auth Flow

**Goal:** Verify end-to-end authentication works.

**Tasks:**
1. Log in from frontend
2. Make API request to protected endpoint
3. Verify user is created in database
4. Test token expiry handling
5. Test logout flow

**Deliverable:** Complete authentication working

---

## Phase 3: Frontend - Core Views (16-20 hours)

### Step 3.1: Set Up Routing & Layout

**Goal:** Create app shell with navigation.

**Tasks:**
1. Set up React Router with routes:
   - `/` — Home
   - `/bookshelf` — Bookshelf
   - `/book/:id/log` — Logging
   - `/book/:id/inbox` — Inbox
   - `/book/:id/distill` — Distillation
   - `/library` — Library
   - `/book/:id/cards` — Book Cards
2. Create Header component with navigation
3. Create PageContainer layout component
4. Add route protection (redirect to login if not authed)

**Deliverable:** Navigation between empty page shells

---

### Step 3.2: Create Common Components

**Goal:** Build reusable UI components.

**Tasks:**
1. Create Button component (primary, secondary, danger variants)
2. Create Input component
3. Create TextArea component
4. Create Modal component
5. Create Badge component
6. Create loading spinner
7. Style all with the warm Book Brain theme

**Deliverable:** Component library ready for use

---

### Step 3.3: Build Bookshelf Page

**Goal:** Display and manage books.

**Tasks:**
1. Create BooksContext with state management
2. Create API hooks: `useBooks()`
3. Build BookCard component
4. Build BookGrid component
5. Build AddBookModal component
6. Assemble BookshelfPage
7. Connect to backend API
8. Test: add book, see it appear

**Deliverable:** Working Bookshelf page

---

### Step 3.4: Build Note Logging Page

**Goal:** Create the note logging form.

**Tasks:**
1. Create NotesContext
2. Create `useNotes(bookId)` hook
3. Build NoteForm component with all fields
4. Build LinkSuggestion component
5. Implement page overlap detection
6. Assemble LoggingPage
7. Connect to backend
8. Test: log a note, see it saved

**Deliverable:** Working note logging

---

### Step 3.5: Build Inbox Page

**Goal:** View unprocessed notes for a book.

**Tasks:**
1. Build NoteCard component (read-only display)
2. Build NoteList component
3. Assemble InboxPage
4. Add "Begin Distillation" button
5. Connect to backend
6. Test: see logged notes in inbox

**Deliverable:** Working Inbox page

---

### Step 3.6: Build Distillation Mode

**Goal:** The core processing ritual.

**Tasks:**
1. Build DistillationView (single-note display)
2. Build RetentionQuestions component
3. Build BucketSelector component (with create inline)
4. Build action buttons (Promote, Discard, Skip)
5. Build progress indicator
6. Build CompletionSummary component
7. Assemble DistillationPage with state machine
8. Connect to backend (create card, update note status)
9. Test full distillation flow

**Deliverable:** Working Distillation mode

---

### Step 3.7: Build Library Page

**Goal:** Browse and search cards.

**Tasks:**
1. Create CardsContext
2. Create `useCards(filters)` hook with search
3. Build CardFilters component (search + bucket dropdown)
4. Build CardDisplay component (collapsed/expanded states)
5. Build CardList component
6. Build CardEditor component (inline editing)
7. Implement delete with confirmation
8. Assemble LibraryPage
9. Connect to backend
10. Test: search, filter, expand, edit, delete

**Deliverable:** Working Library page

---

### Step 3.8: Build Home Page

**Goal:** Dashboard with stats and quick actions.

**Tasks:**
1. Create `useStats()` hook
2. Build StatsRow component with period toggle
3. Build CurrentlyReading component
4. Build DailyCard component (with expand)
5. Build quick access buttons
6. Implement daily random card logic
7. Assemble HomePage
8. Connect to backend
9. Test all interactions

**Deliverable:** Working Home page

---

### Step 3.9: Build Book Cards Page

**Goal:** View all cards from a specific book.

**Tasks:**
1. Create route `/book/:id/cards`
2. Reuse CardDisplay and CardList components
3. Filter cards by bookId
4. Add back navigation to Bookshelf
5. Test

**Deliverable:** Working Book Cards page

---

## Phase 4: Polish & Edge Cases (8-10 hours)

### Step 4.1: Error Handling

**Goal:** Graceful error handling throughout.

**Tasks:**
1. Create error boundary component
2. Add error states to all contexts
3. Display user-friendly error messages
4. Handle network failures
5. Handle 401/403 responses (redirect to login)
6. Add retry logic where appropriate

**Deliverable:** App handles errors gracefully

---

### Step 4.2: Loading States

**Goal:** Good UX during async operations.

**Tasks:**
1. Add loading states to all data fetching
2. Create skeleton loaders for cards and lists
3. Disable buttons during submission
4. Show optimistic updates where appropriate
5. Add loading indicators to page transitions

**Deliverable:** Smooth loading experience

---

### Step 4.3: Empty States

**Goal:** Helpful messaging when no data exists.

**Tasks:**
1. Design empty state for Bookshelf (no books)
2. Design empty state for Inbox (no notes)
3. Design empty state for Library (no cards)
4. Design empty state for search results (no matches)
5. Add calls-to-action in empty states

**Deliverable:** Informative empty states

---

### Step 4.4: Form Validation

**Goal:** Validate all user input.

**Tasks:**
1. Add validation to AddBookModal (title required)
2. Add validation to NoteForm (page + title required, one content field required)
3. Add validation to Distillation (retention answers + bucket required)
4. Display validation errors clearly
5. Prevent submission of invalid forms

**Deliverable:** All forms properly validated

---

### Step 4.5: Responsive Design

**Goal:** App works on all screen sizes.

**Tasks:**
1. Test and fix Home page on mobile
2. Test and fix Bookshelf grid on mobile
3. Test and fix Logging form on mobile
4. Test and fix Distillation on mobile
5. Test and fix Library on mobile
6. Adjust navigation for mobile (hamburger menu?)

**Deliverable:** Responsive across devices

---

### Step 4.6: Keyboard Navigation & Accessibility

**Goal:** App is accessible.

**Tasks:**
1. Add proper focus management in modals
2. Ensure tab order is logical
3. Add aria labels where needed
4. Test with screen reader
5. Ensure sufficient color contrast
6. Add keyboard shortcuts for common actions (optional)

**Deliverable:** Accessible application

---

## Phase 5: Testing (6-8 hours)

### Step 5.1: Backend Unit Tests

**Goal:** Test service layer logic.

**Tasks:**
1. Set up Jest for backend
2. Write tests for bookService
3. Write tests for noteService
4. Write tests for cardService (especially search)
5. Write tests for statsService (especially streak)

**Deliverable:** Backend services tested

---

### Step 5.2: Backend Integration Tests

**Goal:** Test API endpoints end-to-end.

**Tasks:**
1. Set up test database
2. Write tests for /api/books endpoints
3. Write tests for /api/notes endpoints
4. Write tests for /api/cards endpoints
5. Write tests for authentication middleware

**Deliverable:** API endpoints tested

---

### Step 5.3: Frontend Component Tests

**Goal:** Test key React components.

**Tasks:**
1. Set up React Testing Library
2. Write tests for NoteForm
3. Write tests for CardDisplay
4. Write tests for Distillation flow
5. Write tests for search/filter behavior

**Deliverable:** Key components tested

---

### Step 5.4: End-to-End Tests

**Goal:** Test critical user flows.

**Tasks:**
1. Set up Playwright
2. Write E2E test: Add book → Log notes → Distill → View in Library
3. Write E2E test: Search and find a card
4. Write E2E test: Edit a card
5. Run tests in CI

**Deliverable:** Critical flows tested end-to-end

---

## Phase 6: Deployment (4-6 hours)

### Step 6.1: Prepare for Production

**Goal:** Production-ready configuration.

**Tasks:**
1. Create production environment variables
2. Set up production database (Railway/Render)
3. Run migrations on production database
4. Configure CORS for production domain
5. Set up Auth0 for production URLs

**Deliverable:** Production configuration ready

---

### Step 6.2: Deploy Backend

**Goal:** Backend running in production.

**Tasks:**
1. Create Railway/Render account
2. Connect GitHub repository
3. Configure environment variables
4. Deploy backend
5. Verify health endpoint works
6. Test API with production database

**Deliverable:** Backend deployed and accessible

---

### Step 6.3: Deploy Frontend

**Goal:** Frontend running in production.

**Tasks:**
1. Create Vercel account
2. Connect GitHub repository
3. Configure environment variables
4. Configure build settings
5. Deploy frontend
6. Configure custom domain (if desired)

**Deliverable:** Frontend deployed and accessible

---

### Step 6.4: Production Testing

**Goal:** Verify everything works in production.

**Tasks:**
1. Test login flow
2. Test complete user journey
3. Test on mobile device
4. Monitor for errors
5. Check performance

**Deliverable:** Production app verified working

---

### Step 6.5: Set Up Monitoring

**Goal:** Know when things break.

**Tasks:**
1. Set up Sentry for error tracking
2. Configure alerting rules
3. Set up basic analytics (optional: Plausible, Vercel Analytics)
4. Create status page (optional)

**Deliverable:** Monitoring in place

---

## Phase 7: Launch Preparation (4-6 hours)

### Step 7.1: Documentation

**Goal:** Document the project.

**Tasks:**
1. Write README.md with setup instructions
2. Document environment variables
3. Document deployment process
4. Create CONTRIBUTING.md (if open source)

**Deliverable:** Project documented

---

### Step 7.2: Landing Page (Optional)

**Goal:** Marketing page for the app.

**Tasks:**
1. Create simple landing page explaining the value
2. Add screenshots
3. Add sign-up CTA
4. Deploy to main domain

**Deliverable:** Landing page live

---

### Step 7.3: Beta Testing

**Goal:** Get feedback before public launch.

**Tasks:**
1. Invite 5-10 beta users
2. Create feedback collection mechanism
3. Monitor for bugs
4. Collect feature requests
5. Iterate based on feedback

**Deliverable:** Beta feedback collected

---

### Step 7.4: Launch

**Goal:** Release to the public.

**Tasks:**
1. Fix critical bugs from beta
2. Announce on relevant channels
3. Monitor for issues
4. Respond to user feedback

**Deliverable:** App launched! 🚀

---

## Summary: Build Order

| Phase | Steps | Hours | Cumulative |
|-------|-------|-------|------------|
| 0. Setup | 0.1 - 0.5 | 4-6 | 4-6 |
| 1. Data Layer | 1.1 - 1.7 | 8-10 | 12-16 |
| 2. Authentication | 2.1 - 2.4 | 4-6 | 16-22 |
| 3. Frontend Views | 3.1 - 3.9 | 16-20 | 32-42 |
| 4. Polish | 4.1 - 4.6 | 8-10 | 40-52 |
| 5. Testing | 5.1 - 5.4 | 6-8 | 46-60 |
| 6. Deployment | 6.1 - 6.5 | 4-6 | 50-66 |
| 7. Launch | 7.1 - 7.4 | 4-6 | 54-72 |

**Total: 54-72 hours**

---

## Tips for Success

1. **Build vertically, not horizontally** — Complete one feature end-to-end before starting another
2. **Test as you go** — Don't leave all testing until the end
3. **Commit frequently** — Small, focused commits make debugging easier
4. **Deploy early** — Get something running in production as soon as possible
5. **Don't over-engineer** — Build what's needed now, not what might be needed later
6. **Take breaks** — This is a marathon, not a sprint

Good luck building Book Brain! 📚🧠
