# Book Brain — Architecture Document

## Overview

This document describes the technical architecture for Book Brain, a web application for capturing and retaining knowledge from books. The architecture prioritizes simplicity, maintainability, and a clear path from MVP to scale.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                          │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                      React Application                         │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │
│  │  │  Home   │ │Bookshelf│ │ Logging │ │Distill  │ │ Library │  │  │
│  │  │  Page   │ │  Page   │ │  Page   │ │  Mode   │ │  Page   │  │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │  │
│  │       │           │           │           │           │        │  │
│  │       └───────────┴───────────┴───────────┴───────────┘        │  │
│  │                              │                                  │  │
│  │                     ┌────────▼────────┐                        │  │
│  │                     │  State Manager  │                        │  │
│  │                     │   (Context +    │                        │  │
│  │                     │    Reducers)    │                        │  │
│  │                     └────────┬────────┘                        │  │
│  │                              │                                  │  │
│  │                     ┌────────▼────────┐                        │  │
│  │                     │   API Client    │                        │  │
│  │                     └────────┬────────┘                        │  │
│  └──────────────────────────────┼────────────────────────────────┘  │
└─────────────────────────────────┼───────────────────────────────────┘
                                  │ HTTPS
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                           SERVER (API)                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Node.js / Express                          │  │
│  │  ┌──────────────────────────────────────────────────────────┐ │  │
│  │  │                    Route Handlers                         │ │  │
│  │  │  /api/books    /api/notes    /api/cards    /api/buckets  │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  │                              │                                 │  │
│  │  ┌──────────────────────────▼───────────────────────────────┐ │  │
│  │  │                   Service Layer                           │ │  │
│  │  │  BookService   NoteService   CardService   BucketService │ │  │
│  │  └──────────────────────────┬───────────────────────────────┘ │  │
│  │                              │                                 │  │
│  │  ┌──────────────────────────▼───────────────────────────────┐ │  │
│  │  │                   Data Access Layer                       │ │  │
│  │  │                      (Prisma ORM)                         │ │  │
│  │  └──────────────────────────┬───────────────────────────────┘ │  │
│  └──────────────────────────────┼────────────────────────────────┘  │
└─────────────────────────────────┼───────────────────────────────────┘
                                  │
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                          DATABASE                                    │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                      PostgreSQL                                │  │
│  │                                                                │  │
│  │   ┌──────┐  ┌───────┐  ┌───────┐  ┌────────┐  ┌───────────┐   │  │
│  │   │Users │  │ Books │  │ Notes │  │ Cards  │  │CardBuckets│   │  │
│  │   └──┬───┘  └───┬───┘  └───┬───┘  └───┬────┘  └─────┬─────┘   │  │
│  │      │          │          │          │             │          │  │
│  │      └──────────┴──────────┴──────────┴─────────────┘          │  │
│  │                                                                │  │
│  │   ┌─────────┐                                                  │  │
│  │   │ Buckets │                                                  │  │
│  │   └─────────┘                                                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **React 18** | UI framework | Industry standard, large ecosystem, good for component-based UI |
| **TypeScript** | Type safety | Catches errors early, improves maintainability |
| **React Router** | Navigation | Standard routing solution for React SPAs |
| **React Context + useReducer** | State management | Sufficient for this scale; avoids Redux complexity |
| **CSS Modules** or **Styled Components** | Styling | Scoped styles, component co-location |
| **Vite** | Build tool | Fast development, modern defaults |

### Backend
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Node.js** | Runtime | JavaScript full-stack, large ecosystem |
| **Express** | Web framework | Minimal, flexible, well-documented |
| **TypeScript** | Type safety | Consistent with frontend |
| **Prisma** | ORM | Type-safe database access, great DX, migrations |
| **PostgreSQL** | Database | Robust, scalable, good JSON support |

### Infrastructure (Production)
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Vercel** | Frontend hosting | Zero-config React deployment, great DX |
| **Railway** or **Render** | Backend + DB hosting | Simple deployment, managed Postgres |
| **Auth0** or **Clerk** | Authentication | Outsource auth complexity |

### Development
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Jest** | Unit testing |
| **Playwright** | E2E testing |

---

## Database Schema

```sql
-- Users table (for authentication)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    name            VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE books (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(500) NOT NULL,
    author          VARCHAR(500),
    status          VARCHAR(20) DEFAULT 'reading' CHECK (status IN ('reading', 'finished')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_books_user_id ON books(user_id);
CREATE INDEX idx_books_status ON books(status);

-- Notes table (inbox items)
CREATE TABLE notes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id         UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    title           VARCHAR(500) NOT NULL,
    page            VARCHAR(100) NOT NULL,
    context         TEXT,
    capture         TEXT,
    spark           TEXT,
    linked_note_id  UUID REFERENCES notes(id) ON DELETE SET NULL,
    status          VARCHAR(20) DEFAULT 'inbox' CHECK (status IN ('inbox', 'processed', 'discarded')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure at least one content field is filled
    CONSTRAINT content_required CHECK (
        context IS NOT NULL OR capture IS NOT NULL OR spark IS NOT NULL
    )
);

CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_book_id ON notes(book_id);
CREATE INDEX idx_notes_status ON notes(status);

-- Buckets table
CREATE TABLE buckets (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, name)
);

CREATE INDEX idx_buckets_user_id ON buckets(user_id);

-- Cards table
CREATE TABLE cards (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id         UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    title           VARCHAR(500) NOT NULL,
    page            VARCHAR(100) NOT NULL,
    context         TEXT,
    capture         TEXT,
    spark           TEXT,
    linked_note_id  UUID REFERENCES notes(id) ON DELETE SET NULL,
    retention_answers JSONB DEFAULT '{}',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_cards_book_id ON cards(book_id);
CREATE INDEX idx_cards_created_at ON cards(created_at DESC);

-- Full-text search index for cards
CREATE INDEX idx_cards_search ON cards USING GIN (
    to_tsvector('english', coalesce(title, '') || ' ' || 
                           coalesce(context, '') || ' ' || 
                           coalesce(capture, '') || ' ' || 
                           coalesce(spark, ''))
);

-- Card-Bucket junction table (many-to-many)
CREATE TABLE card_buckets (
    card_id         UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    bucket_id       UUID NOT NULL REFERENCES buckets(id) ON DELETE CASCADE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (card_id, bucket_id)
);

CREATE INDEX idx_card_buckets_bucket_id ON card_buckets(bucket_id);

-- User settings table (for custom retention questions, etc.)
CREATE TABLE user_settings (
    user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    retention_questions JSONB DEFAULT '["Why did this stop you?", "What does this connect to in your life or other reading?"]',
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  books    Book[]
  notes    Note[]
  cards    Card[]
  buckets  Bucket[]
  settings UserSettings?

  @@map("users")
}

model Book {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  title     String
  author    String?
  status    String   @default("reading")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  notes Note[]
  cards Card[]

  @@index([userId])
  @@index([status])
  @@map("books")
}

model Note {
  id           String   @id @default(uuid())
  userId       String   @map("user_id")
  bookId       String   @map("book_id")
  title        String
  page         String
  context      String?
  capture      String?
  spark        String?
  linkedNoteId String?  @map("linked_note_id")
  status       String   @default("inbox")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  user       User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  book       Book  @relation(fields: [bookId], references: [id], onDelete: Cascade)
  linkedNote Note? @relation("NoteLinks", fields: [linkedNoteId], references: [id])
  linkedFrom Note[] @relation("NoteLinks")

  @@index([userId])
  @@index([bookId])
  @@index([status])
  @@map("notes")
}

model Bucket {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  name      String
  createdAt DateTime @default(now()) @map("created_at")

  user  User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  cards CardBucket[]

  @@unique([userId, name])
  @@index([userId])
  @@map("buckets")
}

model Card {
  id               String   @id @default(uuid())
  userId           String   @map("user_id")
  bookId           String   @map("book_id")
  title            String
  page             String
  context          String?
  capture          String?
  spark            String?
  linkedNoteId     String?  @map("linked_note_id")
  retentionAnswers Json     @default("{}") @map("retention_answers")
  createdAt        DateTime @default(now()) @map("created_at")
  updatedAt        DateTime @updatedAt @map("updated_at")

  user    User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  book    Book         @relation(fields: [bookId], references: [id], onDelete: Cascade)
  buckets CardBucket[]

  @@index([userId])
  @@index([bookId])
  @@index([createdAt(sort: Desc)])
  @@map("cards")
}

model CardBucket {
  cardId    String   @map("card_id")
  bucketId  String   @map("bucket_id")
  createdAt DateTime @default(now()) @map("created_at")

  card   Card   @relation(fields: [cardId], references: [id], onDelete: Cascade)
  bucket Bucket @relation(fields: [bucketId], references: [id], onDelete: Cascade)

  @@id([cardId, bucketId])
  @@index([bucketId])
  @@map("card_buckets")
}

model UserSettings {
  userId             String   @id @map("user_id")
  retentionQuestions Json     @default("[\"Why did this stop you?\", \"What does this connect to in your life or other reading?\"]") @map("retention_questions")
  updatedAt          DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_settings")
}
```

---

## API Design

### Base URL
```
Production: https://api.bookbrain.app/v1
Development: http://localhost:3001/api/v1
```

### Authentication
All endpoints require authentication via Bearer token (JWT from Auth0/Clerk).

```
Authorization: Bearer <token>
```

### Endpoints

#### Books

```
GET     /books              List all books for user
POST    /books              Create a new book
GET     /books/:id          Get a specific book
PATCH   /books/:id          Update a book (title, author, status)
DELETE  /books/:id          Delete a book (cascades to notes and cards)
GET     /books/:id/notes    Get all inbox notes for a book
GET     /books/:id/cards    Get all cards for a book
```

#### Notes

```
GET     /notes              List all notes for user (with filters)
POST    /notes              Create a new note
GET     /notes/:id          Get a specific note
PATCH   /notes/:id          Update a note
DELETE  /notes/:id          Delete a note
```

Query parameters for `GET /notes`:
- `bookId` — Filter by book
- `status` — Filter by status (inbox, processed, discarded)

#### Cards

```
GET     /cards              List all cards for user (with filters/search)
POST    /cards              Create a new card
GET     /cards/:id          Get a specific card
PATCH   /cards/:id          Update a card
DELETE  /cards/:id          Delete a card
```

Query parameters for `GET /cards`:
- `search` — Full-text search across card content
- `bucketId` — Filter by bucket
- `bookId` — Filter by source book
- `limit` — Pagination limit
- `offset` — Pagination offset

#### Buckets

```
GET     /buckets            List all buckets for user
POST    /buckets            Create a new bucket
PATCH   /buckets/:id        Rename a bucket
DELETE  /buckets/:id        Delete a bucket (removes from cards, doesn't delete cards)
```

#### Stats (for home page)

```
GET     /stats              Get user statistics
```

Response:
```json
{
  "totalBooks": 12,
  "totalCards": 87,
  "streak": 5,
  "cardsThisWeek": 3,
  "cardsThisMonth": 12,
  "cardsThisYear": 87
}
```

#### User Settings

```
GET     /settings           Get user settings
PATCH   /settings           Update user settings
```

---

## Frontend Architecture

### Directory Structure

```
src/
├── api/
│   ├── client.ts           # Axios instance with auth
│   ├── books.ts            # Book API calls
│   ├── notes.ts            # Note API calls
│   ├── cards.ts            # Card API calls
│   ├── buckets.ts          # Bucket API calls
│   └── stats.ts            # Stats API calls
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── PageContainer.tsx
│   │
│   ├── books/
│   │   ├── BookCard.tsx
│   │   ├── BookGrid.tsx
│   │   ├── AddBookModal.tsx
│   │   └── BookSelector.tsx
│   │
│   ├── notes/
│   │   ├── NoteForm.tsx
│   │   ├── NoteCard.tsx
│   │   ├── NoteList.tsx
│   │   └── LinkSuggestion.tsx
│   │
│   ├── cards/
│   │   ├── CardDisplay.tsx
│   │   ├── CardList.tsx
│   │   ├── CardEditor.tsx
│   │   └── CardFilters.tsx
│   │
│   ├── distillation/
│   │   ├── DistillationView.tsx
│   │   ├── RetentionQuestions.tsx
│   │   ├── BucketSelector.tsx
│   │   └── CompletionSummary.tsx
│   │
│   └── home/
│       ├── StatsRow.tsx
│       ├── CurrentlyReading.tsx
│       └── DailyCard.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── BookshelfPage.tsx
│   ├── LoggingPage.tsx
│   ├── InboxPage.tsx
│   ├── DistillationPage.tsx
│   ├── LibraryPage.tsx
│   └── BookCardsPage.tsx
│
├── context/
│   ├── AuthContext.tsx
│   ├── BooksContext.tsx
│   ├── NotesContext.tsx
│   ├── CardsContext.tsx
│   └── BucketsContext.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useBooks.ts
│   ├── useNotes.ts
│   ├── useCards.ts
│   ├── useBuckets.ts
│   ├── useStats.ts
│   └── useDebounce.ts
│
├── types/
│   ├── book.ts
│   ├── note.ts
│   ├── card.ts
│   ├── bucket.ts
│   └── api.ts
│
├── utils/
│   ├── dates.ts
│   ├── search.ts
│   ├── pageParser.ts
│   └── streak.ts
│
├── styles/
│   ├── variables.css
│   ├── globals.css
│   └── theme.ts
│
├── App.tsx
├── main.tsx
└── router.tsx
```

### State Management Pattern

```tsx
// Example: BooksContext.tsx

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

type BooksAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Book[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: string };

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, books: action.payload };
    // ... etc
  }
};
```

---

## Backend Architecture

### Directory Structure

```
server/
├── src/
│   ├── routes/
│   │   ├── index.ts        # Route aggregator
│   │   ├── books.ts
│   │   ├── notes.ts
│   │   ├── cards.ts
│   │   ├── buckets.ts
│   │   ├── stats.ts
│   │   └── settings.ts
│   │
│   ├── services/
│   │   ├── bookService.ts
│   │   ├── noteService.ts
│   │   ├── cardService.ts
│   │   ├── bucketService.ts
│   │   └── statsService.ts
│   │
│   ├── middleware/
│   │   ├── auth.ts         # JWT verification
│   │   ├── errorHandler.ts
│   │   └── validate.ts     # Request validation
│   │
│   ├── validators/
│   │   ├── bookValidator.ts
│   │   ├── noteValidator.ts
│   │   └── cardValidator.ts
│   │
│   ├── utils/
│   │   ├── errors.ts       # Custom error classes
│   │   └── pagination.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── prisma/
│   │   └── client.ts       # Prisma client singleton
│   │
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── package.json
├── tsconfig.json
└── .env.example
```

---

## Security Considerations

### Authentication
- Use Auth0 or Clerk for authentication (don't roll your own)
- JWT tokens with short expiry (15 min) + refresh tokens
- HTTPS only in production

### Authorization
- All database queries filter by `userId`
- Middleware verifies JWT and attaches user to request
- Service layer always receives `userId` parameter

### Data Protection
- Input validation on all endpoints (Zod or Joi)
- Parameterized queries via Prisma (SQL injection protection)
- Rate limiting on API endpoints
- CORS configured for specific origins

### Sensitive Data
- No sensitive data stored (book content is user's own notes)
- User emails encrypted at rest (if required by policy)
- Database connection via SSL

---

## Deployment Architecture

### Development
```
Local machine:
├── Frontend (Vite dev server) → localhost:5173
├── Backend (Node/Express) → localhost:3001
└── Database (Docker PostgreSQL) → localhost:5432
```

### Production
```
Vercel (Frontend)
    ↓ API calls
Railway/Render (Backend + PostgreSQL)
    ↓
Managed PostgreSQL
```

### Environment Variables

```bash
# Backend
DATABASE_URL=postgresql://user:password@host:5432/bookbrain
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=https://api.bookbrain.app
NODE_ENV=production
PORT=3001

# Frontend
VITE_API_URL=https://api.bookbrain.app
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

---

## Performance Considerations

### Database
- Indexes on frequently queried columns (see schema)
- Full-text search index for card search
- Connection pooling via Prisma

### API
- Pagination for list endpoints
- Selective field loading where appropriate
- Response caching headers for static-ish data

### Frontend
- Code splitting by route (React lazy loading)
- Optimistic UI updates for better perceived performance
- Debounced search input
- Virtual scrolling if card lists get long (future)

---

## Monitoring & Logging

### Application Monitoring
- Error tracking: Sentry
- Performance monitoring: Vercel Analytics (frontend), Railway metrics (backend)

### Logging
- Structured JSON logging
- Request/response logging in development
- Error logging with stack traces

### Alerting
- Error rate thresholds
- Response time degradation
- Database connection issues

---

## Future Considerations

### Mobile App
- React Native sharing code with web
- Offline-first architecture with sync
- Same backend API

### Scaling
- Read replicas for database if needed
- CDN for static assets
- API caching layer (Redis) if needed

### Features
- Full spaced repetition system
- Book cover API integration
- Import/export functionality
- Collaboration features
