// Book types
export interface CreateBookRequest {
  title: string;
  author?: string;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  status?: 'reading' | 'finished';
}

// Note types
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

// Card types
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

export interface CardFilters {
  search?: string;
  bucketId?: string;
  bookId?: string;
  limit?: number;
  offset?: number;
}

// Bucket types
export interface CreateBucketRequest {
  name: string;
}

export interface UpdateBucketRequest {
  name: string;
}

// Stats types
export interface StatsResponse {
  totalBooks: number;
  totalCards: number;
  streak: number;
  cardsThisWeek: number;
  cardsThisMonth: number;
  cardsThisYear: number;
}

// Settings types
export interface UpdateSettingsRequest {
  retentionQuestions: string[];
}
