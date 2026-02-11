// Entity types

export interface Book {
  id: string;
  userId: string;
  title: string;
  author: string | null;
  status: 'reading' | 'finished';
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  userId: string;
  bookId: string;
  title: string;
  page: string;
  context: string | null;
  capture: string | null;
  spark: string | null;
  linkedNoteId: string | null;
  status: 'inbox' | 'processed' | 'discarded';
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  id: string;
  userId: string;
  bookId: string;
  title: string;
  page: string;
  context: string | null;
  capture: string | null;
  spark: string | null;
  linkedNoteId: string | null;
  retentionAnswers: Record<string, string>;
  buckets: Bucket[];
  createdAt: string;
  updatedAt: string;
}

export interface Bucket {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

export interface UserSettings {
  userId: string;
  retentionQuestions: string[];
  updatedAt: string;
}

export interface Stats {
  totalBooks: number;
  totalCards: number;
  streak: number;
  cardsThisWeek: number;
  cardsThisMonth: number;
  cardsThisYear: number;
}

// Request types

export interface CreateBookRequest {
  title: string;
  author?: string;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  status?: 'reading' | 'finished';
}

export interface CreateNoteRequest {
  bookId: string;
  title: string;
  page: string;
  context?: string;
  capture?: string;
  spark?: string;
  linkedNoteId?: string;
}

export interface UpdateNoteRequest {
  title?: string;
  page?: string;
  context?: string;
  capture?: string;
  spark?: string;
  linkedNoteId?: string;
  status?: 'inbox' | 'processed' | 'discarded';
}

export interface CreateCardRequest {
  bookId: string;
  title: string;
  page: string;
  context?: string;
  capture?: string;
  spark?: string;
  linkedNoteId?: string;
  retentionAnswers?: Record<string, string>;
  bucketIds?: string[];
}

export interface UpdateCardRequest {
  title?: string;
  page?: string;
  context?: string;
  capture?: string;
  spark?: string;
  retentionAnswers?: Record<string, string>;
  bucketIds?: string[];
}

export interface CreateBucketRequest {
  name: string;
}

export interface UpdateBucketRequest {
  name: string;
}

export interface UpdateSettingsRequest {
  retentionQuestions: string[];
}
