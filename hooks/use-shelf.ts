import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book, BookStatus } from "@/lib/types";

const SHELF_STORAGE_KEY = "bookshelf_shelf";

export function useShelf() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar livros do AsyncStorage
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem(SHELF_STORAGE_KEY);
      if (data) {
        setBooks(JSON.parse(data));
      }
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveBooks = useCallback(async (updatedBooks: Book[]) => {
    try {
      await AsyncStorage.setItem(SHELF_STORAGE_KEY, JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Erro ao salvar livros:", error);
    }
  }, []);

  const addBook = useCallback(
    async (book: Omit<Book, "id" | "addedAt">) => {
      const newBook: Book = {
        ...book,
        id: Date.now().toString(),
        addedAt: new Date().toISOString(),
      };
      const updatedBooks = [...books, newBook];
      await saveBooks(updatedBooks);
      return newBook;
    },
    [books, saveBooks]
  );

  const updateBook = useCallback(
    async (bookId: string, updates: Partial<Book>) => {
      const updatedBooks = books.map((book) =>
        book.id === bookId ? { ...book, ...updates } : book
      );
      await saveBooks(updatedBooks);
    },
    [books, saveBooks]
  );

  const deleteBook = useCallback(
    async (bookId: string) => {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      await saveBooks(updatedBooks);
    },
    [books, saveBooks]
  );

  const getBooksByStatus = useCallback(
    (status: BookStatus) => {
      return books.filter((book) => book.status === status);
    },
    [books]
  );

  const searchBooks = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery)
      );
    },
    [books]
  );

  return {
    books,
    isLoading,
    addBook,
    updateBook,
    deleteBook,
    getBooksByStatus,
    searchBooks,
    loadBooks,
  };
}
