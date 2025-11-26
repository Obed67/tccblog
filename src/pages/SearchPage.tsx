import { Search, X, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Article, mockArticles } from "../lib/supabase";
import { useFilter, SortOption } from "../hooks/useFilter";
import { debounce } from "../utils/helpers";
import ArticleCard from "../components/ArticleCard";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [articles] = useState<Article[]>(mockArticles);
  const [showFilters, setShowFilters] = useState(false);

  const {
    filteredArticles,
    filters,
    setQuery,
    toggleCategory,
    toggleAuthor,
    setSortBy,
    resetFilters,
    hasActiveFilters,
  } = useFilter(articles);

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get("q") || "";
    if (query) {
      setQuery(query);
    }
  }, []);

  // Debounced search to update URL
  const debouncedUpdateURL = debounce((query: string) => {
    if (query.trim()) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, 500);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    debouncedUpdateURL(value);
  };

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  // Get unique categories and authors
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const authors = Array.from(new Set(articles.map((a) => a.author.name)));

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "recent", label: "Plus récents" },
    { value: "popular", label: "Plus populaires" },
    { value: "alphabetical", label: "Alphabétique" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 md:py-16 px-4 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-accent/10 p-3 rounded-xl">
              <Search className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">
              Recherche
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Rechercher des articles, événements, catégories..."
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent text-lg"
                autoFocus
              />
              {filters.query && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Effacer"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">
                Filtres {hasActiveFilters && `(${filteredArticles.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`md:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="sticky top-24 space-y-6">
              {/* Results Count */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <p className="text-2xl font-bold text-accent">
                  {filteredArticles.length}
                </p>
                <p className="text-sm text-secondary dark:text-gray-400">
                  résultat{filteredArticles.length > 1 ? "s" : ""} trouvé
                  {filteredArticles.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Sort */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-primary dark:text-white uppercase tracking-wider mb-3">
                  Trier par
                </h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Categories Filter */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-primary dark:text-white uppercase tracking-wider mb-3">
                  Catégories
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="text-sm text-secondary dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Authors Filter */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-primary dark:text-white uppercase tracking-wider mb-3">
                  Auteurs
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {authors.map((author) => (
                    <label
                      key={author}
                      className="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.authors.includes(author)}
                        onChange={() => toggleAuthor(author)}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="text-sm text-secondary dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-colors">
                        {author}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-secondary dark:text-gray-400 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all font-semibold"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
