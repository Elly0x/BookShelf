import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Review } from "@/lib/types";

const REVIEWS_STORAGE_KEY = "bookshelf_reviews";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar resenhas do AsyncStorage
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem(REVIEWS_STORAGE_KEY);
      if (data) {
        setReviews(JSON.parse(data));
      }
    } catch (error) {
      console.error("Erro ao carregar resenhas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveReviews = useCallback(async (updatedReviews: Review[]) => {
    try {
      await AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Erro ao salvar resenhas:", error);
    }
  }, []);

  const addReview = useCallback(
    async (review: Omit<Review, "id" | "createdAt" | "updatedAt">) => {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedReviews = [...reviews, newReview];
      await saveReviews(updatedReviews);
      return newReview;
    },
    [reviews, saveReviews]
  );

  const updateReview = useCallback(
    async (reviewId: string, updates: Partial<Review>) => {
      const updatedReviews = reviews.map((review) =>
        review.id === reviewId
          ? { ...review, ...updates, updatedAt: new Date().toISOString() }
          : review
      );
      await saveReviews(updatedReviews);
    },
    [reviews, saveReviews]
  );

  const deleteReview = useCallback(
    async (reviewId: string) => {
      const updatedReviews = reviews.filter((review) => review.id !== reviewId);
      await saveReviews(updatedReviews);
    },
    [reviews, saveReviews]
  );

  const getReviewsByBook = useCallback(
    (bookId: string) => {
      return reviews.filter((review) => review.bookId === bookId);
    },
    [reviews]
  );

  const getReviewsByUser = useCallback(
    (userId: string) => {
      return reviews.filter((review) => review.userId === userId);
    },
    [reviews]
  );

  const getAverageRating = useCallback(
    (bookId: string) => {
      const bookReviews = getReviewsByBook(bookId);
      if (bookReviews.length === 0) return 0;
      const sum = bookReviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / bookReviews.length;
    },
    [getReviewsByBook]
  );

  return {
    reviews,
    isLoading,
    addReview,
    updateReview,
    deleteReview,
    getReviewsByBook,
    getReviewsByUser,
    getAverageRating,
    loadReviews,
  };
}
