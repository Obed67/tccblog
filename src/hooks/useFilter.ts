import { useState, useMemo } from "react";
import { Article } from "../lib/supabase";
import { searchArticles, sortByRelevance } from "../utils/searchUtils";

export type SortOption = "recent" | "popular" | "alphabetical";

interface FilterState {
  query: string;
  categories: string[];
  authors: string[];
  sortBy: SortOption;
}

interface UseFilterResult {
  filteredArticles: Article[];
  filters: FilterState;
  setQuery: (query: string) => void;
  toggleCategory: (category: string) => void;
  toggleAuthor: (author: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const initialFilters: FilterState = {
  query: "",
  categories: [],
  authors: [],
  sortBy: "recent",
};

export function useFilter(articles: Article[]): UseFilterResult {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Search filter
    if (filters.query.trim()) {
      result = searchArticles(result, filters.query);
      result = sortByRelevance(result, filters.query);
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((article) =>
        filters.categories.includes(article.category)
      );
    }

    // Author filter
    if (filters.authors.length > 0) {
      result = result.filter((article) =>
        filters.authors.includes(article.author.name)
      );
    }

    // Sort (only if no search query, as search has its own sorting)
    if (!filters.query.trim()) {
      switch (filters.sortBy) {
        case "recent":
          result.sort(
            (a, b) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          );
          break;
        case "popular":
          result.sort((a, b) => b.views - a.views);
          break;
        case "alphabetical":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    return result;
  }, [articles, filters]);

  const setQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleAuthor = (author: string) => {
    setFilters((prev) => ({
      ...prev,
      authors: prev.authors.includes(author)
        ? prev.authors.filter((a) => a !== author)
        : [...prev.authors, author],
    }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.categories.length > 0 ||
    filters.authors.length > 0 ||
    filters.sortBy !== "recent";

  return {
    filteredArticles,
    filters,
    setQuery,
    toggleCategory,
    toggleAuthor,
    setSortBy,
    resetFilters,
    hasActiveFilters,
  };
}
