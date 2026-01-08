/**
 * Tipos e interfaces compartilhadas do app BookShelf
 */

export type BookStatus = "reading" | "read" | "want" | "abandoned";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description?: string;
  isbn?: string;
  publisher?: string;
  publishedYear?: number;
  pages?: number;
  genres?: string[];
  rating?: number;
  status: BookStatus;
  addedAt: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  text: string;
  hasSpoiler: boolean;
  createdAt: string;
  updatedAt: string;
  likes?: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  booksRead: number;
  pagesRead: number;
  readingGoal?: number;
  followers: number;
  following: number;
  createdAt: string;
}

export interface Shelf {
  userId: string;
  books: Book[];
  lastUpdated: string;
}

export interface AppState {
  currentUser?: User;
  shelf?: Shelf;
  reviews: Review[];
  theme: "light" | "dark";
}
