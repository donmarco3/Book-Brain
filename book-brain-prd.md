# Book Brain — Product Requirements Document

## Executive Summary

Book Brain is a reading notes application designed to help readers retain and retrieve knowledge from the books they read. Unlike traditional note-taking apps that optimize for speed and convenience, Book Brain enforces a deliberate, multi-phase process that mirrors proven analog systems for deep learning and long-term retention.

The core insight: **Most readers forget 90% of what they read within weeks. The problem isn't reading—it's the absence of a system for processing and retrieving knowledge.**

---

## The Problem

### Why Readers Forget

When people read books, they often highlight passages, write margin notes, or feel moved by ideas in the moment. But these efforts typically fail because:

1. **Notes stay trapped in books** — Marginalia remains in the physical book, never reviewed or connected to other ideas
2. **Digital highlights become graveyards** — Kindle highlights and similar tools create long lists that are never revisited
3. **No retrieval system exists** — Even if notes are taken, there's no organized way to find relevant ideas when needed
4. **Speed undermines retention** — Quick capture tools optimize for convenience, not the cognitive work required for memory formation

### The Underlying Psychology

Research on memory and learning shows that:
- **Retrieval practice** (actively recalling information) strengthens memory far more than passive review
- **Elaboration** (connecting new ideas to existing knowledge) creates durable mental models
- **Spaced repetition** of material over time prevents forgetting
- **Active processing** (rewriting in your own words) beats passive highlighting

Most reading apps ignore these principles entirely.

---

## The Solution

Book Brain implements a three-phase system inspired by Ryan Holiday's analog notecard method, adapted for digital use while preserving the cognitive benefits of slow, deliberate processing.

### The Three Phases

#### Phase 1: Capture (During/After Reading)
The reader annotates their physical book while reading—highlighting passages, writing margin notes, folding page corners. After each reading session, they spend 1-10 minutes logging these raw notes into Book Brain.

**Key principle:** This phase should be quick and low-friction. The goal is simply to get material out of the book and into a holding area before it's forgotten.

#### Phase 2: Distillation (After Finishing the Book)
When the reader finishes a book, they enter Distillation Mode. They review each captured note one by one, deciding whether to promote it to a permanent Card or discard it.

**Key principle:** This phase is intentionally slow. The reader must:
- Re-engage with the material days or weeks after first encountering it
- Answer retention questions that force elaboration and connection
- Make an active decision about each note's value

This is where the real learning happens.

#### Phase 3: Library (Ongoing)
Promoted Cards live in the Library—an organized, searchable "exterior brain." Cards are organized by thematic Buckets (not by book), allowing ideas from different sources to connect.

**Key principle:** The Library's value is retrieval. The reader doesn't need to remember facts—they just need to know where to find them.

---

## Why This Approach Works

### Intentional Friction

Most productivity apps try to eliminate friction. Book Brain deliberately introduces it at specific points:

| Point of Friction | Why It Helps |
|-------------------|--------------|
| Manual logging after reading | Forces first review of material while it's fresh |
| One-at-a-time distillation | Prevents skimming; demands attention to each note |
| Retention questions | Triggers elaboration and connection-making |
| No copy-paste from captures | Rewriting in own words aids memory |
| Delayed distillation | Spacing effect improves long-term retention |

### Cross-Source Organization

Traditional note systems organize by source (Book A, Book B, Book C). This makes sense for storage but fails for retrieval.

Book Brain organizes by theme (Buckets like "Leadership," "Decision-Making," "Creativity"). A card about decision-making from "Thinking, Fast and Slow" sits alongside one from "The Effective Executive"—because when you need ideas about decision-making, you don't care which book they came from.

### The Exterior Brain Concept

The Library isn't meant to replace memory—it's meant to extend it. The reader's job is to:
1. Know that relevant knowledge exists somewhere
2. Know roughly what category it falls under
3. Trust the system to surface it when searched

This frees mental energy for synthesis and application rather than rote recall.

---

## User Personas

### Primary: The Intentional Reader

**Demographics:** 25-45, reads 10-30 books per year, often non-fiction
**Goals:** Extract lasting value from reading time; build a personal knowledge base
**Frustrations:** Forgets books shortly after finishing; can't recall specific ideas when needed
**Behavior:** Already highlights or annotates books; may have tried other note systems without success

### Secondary: The Aspiring Writer

**Demographics:** Any age, reads widely, creates content (blog posts, articles, books)
**Goals:** Build a repository of quotes, stories, and ideas to draw from when writing
**Frustrations:** Spends hours searching for half-remembered passages; ideas feel scattered
**Behavior:** May already use a physical notecard system or a patchwork of digital tools

---

## Feature Specification

### 1. Bookshelf

**Purpose:** Manage the books you're reading and have read.

**Functionality:**
- Add books (title, author)
- View book status (Reading / Finished)
- See counts: notes in inbox, cards created
- Access points: Log Notes, Distill, View Cards

**Design considerations:**
- Books are visual (cover placeholder with initial)
- Status is clear at a glance
- Primary actions are prominent

---

### 2. Note Logging

**Purpose:** Quickly capture raw material from a reading session.

**Functionality:**
- Select current book (pre-selected if coming from Bookshelf)
- Enter for each note:
  - **Page** (required) — exact page, range, or chapter
  - **Title** (required) — short name for the note
  - **Context** (optional) — your summary of the surrounding situation
  - **Capture** (optional) — the actual passage from the book
  - **Spark** (optional) — your thought, reaction, or connection
- Link notes that overlap in page range
- Save to Inbox

**Validation:**
- At least one of Context, Capture, or Spark required
- Page and Title always required

**Design considerations:**
- Large text areas for comfortable typing
- Visual distinction between Capture (author's words) and Spark (your words)
- Link suggestions appear automatically based on page overlap

---

### 3. Inbox

**Purpose:** Holding area for unprocessed notes.

**Functionality:**
- View all notes for a specific book
- See note content (Context, Capture, Spark)
- See linked notes
- Begin Distillation when ready

**Design considerations:**
- Notes displayed in full (not truncated)
- Clear count of unprocessed notes
- Prominent Distillation entry point

---

### 4. Distillation Mode

**Purpose:** The core retention-building ritual. Transform raw notes into permanent Cards.

**Functionality:**
- Review notes one at a time (not as a scrollable list)
- For each note:
  - View full content
  - Edit if desired (title, context, capture, spark)
  - Answer retention questions
  - Assign to one or more Buckets
  - Choose: Promote to Card / Discard / Skip for Now
- Track progress (e.g., "3 of 12")
- See completion summary (cards created, discarded, buckets used)

**Retention Questions (user-customizable):**
- Default: "Why did this stop you?"
- Default: "What does this connect to in your life or other reading?"

**Bucket Assignment:**
- Select from existing Buckets
- Create new Buckets inline

**Design considerations:**
- Single-note focus prevents skimming
- Retention questions are mandatory before promotion
- Edit mode is optional (view-only by default)
- Progress indicator maintains momentum

---

### 5. Library

**Purpose:** The exterior brain. Browse, search, and retrieve your accumulated knowledge.

**Functionality:**
- View all Cards, sorted by most recent
- Search across all Card content (title, context, capture, spark, retention answers, book title)
- Filter by Bucket
- Expand Card inline to see full content
- Edit Cards (all fields including Bucket assignment)
- Delete Cards (with confirmation)

**Design considerations:**
- E-commerce-style browse experience (filter bar at top)
- Cards show preview when collapsed, full content when expanded
- Visual distinction maintained (Capture italic with left border, Spark with warm background)

---

### 6. Home Page

**Purpose:** Landing page that orients the user and encourages engagement.

**Functionality:**
- Display stats: total books, total cards, logging streak, cards this period (week/month/year toggle)
- Show Currently Reading books (max 3, sorted by most recent note activity)
- Display Daily Random Card (changes once per day, clickable to expand)
- Quick access buttons to Bookshelf and Library

**Streak Logic:**
- A day counts as "logged" if at least one note was saved to any Inbox
- Streak shows consecutive days of logging

**Currently Reading Sort:**
- Books with status "Reading"
- Ordered by timestamp of most recent note added
- Limited to 3 books

**Daily Random Card:**
- Deterministic based on date (same card all day, changes next day)
- Clickable to expand and view full content

**Design considerations:**
- Stats provide motivation without pressure (no explicit goals)
- Currently Reading drives immediate action (Log Notes button)
- Random Card provides serendipitous rediscovery of past knowledge

---

### 7. Book Cards View

**Purpose:** View all Cards created from a specific book.

**Functionality:**
- Access from Bookshelf (View Cards button)
- Shows all Cards with that book as source
- Same Card display as Library (expand, edit, delete)

**Design considerations:**
- Maintains book context while providing Card functionality
- Useful for reviewing everything learned from a single book

---

## Data Model

### Book
- ID
- Title
- Author
- Status (reading / finished)
- Created timestamp

### Note (Inbox Item)
- ID
- Book ID (foreign key)
- Title
- Page
- Context (optional)
- Capture (optional)
- Spark (optional)
- Linked Note ID (optional, foreign key to another Note)
- Status (inbox / processed / discarded)
- Created timestamp

### Card
- ID
- Book ID (foreign key, for metadata only)
- Title
- Page
- Context (optional)
- Capture (optional)
- Spark (optional)
- Linked Note ID (optional)
- Retention Answers (object with question index as key)
- Buckets (array of Bucket names)
- Created timestamp

### Bucket
- Name (unique identifier)
- Created timestamp

### User Settings (future)
- Custom retention questions
- Display preferences

---

## Design Principles

### 1. Warmth Over Sterility
The visual design evokes physical books and paper—warm cream backgrounds, serif fonts for content, subtle shadows. This isn't a cold productivity tool; it's a companion for readers.

### 2. Friction Where It Helps
Speed is not always the goal. The app deliberately slows users down at moments where cognitive effort improves outcomes (distillation, retention questions).

### 3. Clarity of State
The user should always know: What book am I working on? How many notes are waiting? What phase am I in? Visual hierarchy and clear labeling prevent confusion.

### 4. Respect for Content
User's words (Sparks) and author's words (Captures) are visually distinct. Context provides framing. The structure honors the different roles each plays.

### 5. Retrieval Over Storage
The system is designed for getting knowledge out, not just putting it in. Search, Buckets, and the Random Card all serve retrieval.

---

## Success Metrics

### Engagement
- Daily/weekly active users
- Notes logged per reading session
- Distillation completion rate (% of inbox notes that become Cards)
- Library search frequency

### Retention (User Learning)
- Time between book completion and distillation (target: 1-7 days)
- Retention question answer length (proxy for elaboration depth)
- Cards per book (target: 5-20, depending on book length)

### Habit Formation
- Logging streak length
- Return rate after 7/30/90 days
- Books completed in-app

---

## Out of Scope (V1)

The following features are explicitly excluded from the initial version:

- **Mobile app** — Web-first, mobile planned for future
- **Book cover fetching** — Manual entry only; API integration later
- **Social/sharing features** — Solo tool initially
- **Spaced repetition system** — Random Card provides light version; full SRS later
- **Import from Kindle/other sources** — Intentional friction; may reconsider
- **Goals/targets** — Stats without pressure; goals add complexity
- **Custom themes** — Single warm theme initially
- **Collaboration** — Single-user only

---

## Conclusion

Book Brain exists to solve a specific, painful problem: readers invest significant time in books but retain almost nothing. The solution isn't more reading or faster note-taking—it's a system that respects how memory actually works.

By enforcing deliberate processing, cross-source organization, and easy retrieval, Book Brain transforms reading from a fleeting experience into a lasting investment in personal knowledge.

The measure of success is simple: **When a user needs an idea they once read, they find it.**
