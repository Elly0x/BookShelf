import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/lib/types";

const USER_STORAGE_KEY = "bookshelf_user";

const DEFAULT_USER: User = {
  id: "user_1",
  name: "Seu Nome",
  bio: "Amante de livros",
  booksRead: 0,
  pagesRead: 0,
  readingGoal: 24,
  followers: 0,
  following: 0,
  createdAt: new Date().toISOString(),
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do AsyncStorage
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (data) {
        setUser(JSON.parse(data));
      } else {
        setUser(DEFAULT_USER);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setUser(DEFAULT_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (!user) return;
      const updatedUser = { ...user, ...updates };
      try {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      }
    },
    [user]
  );

  const incrementBooksRead = useCallback(
    async (pages: number = 0) => {
      if (!user) return;
      await updateUser({
        booksRead: user.booksRead + 1,
        pagesRead: user.pagesRead + pages,
      });
    },
    [user, updateUser]
  );

  return {
    user,
    isLoading,
    updateUser,
    incrementBooksRead,
    loadUser,
  };
}
