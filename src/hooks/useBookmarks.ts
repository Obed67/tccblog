import { useState, useEffect } from "react";

interface BookmarkState {
  bookmarks: string[]; // Array of article IDs
  addBookmark: (articleId: string) => void;
  removeBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  toggleBookmark: (articleId: string) => void;
  clearBookmarks: () => void;
}

const STORAGE_KEY = "tcc-blog-bookmarks";

export function useBookmarks(): BookmarkState {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }, [bookmarks]);

  const addBookmark = (articleId: string) => {
    setBookmarks((prev) => {
      if (prev.includes(articleId)) return prev;
      return [...prev, articleId];
    });
  };

  const removeBookmark = (articleId: string) => {
    setBookmarks((prev) => prev.filter((id) => id !== articleId));
  };

  const isBookmarked = (articleId: string): boolean => {
    return bookmarks.includes(articleId);
  };

  const toggleBookmark = (articleId: string) => {
    if (isBookmarked(articleId)) {
      removeBookmark(articleId);
    } else {
      addBookmark(articleId);
    }
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearBookmarks,
  };
}
