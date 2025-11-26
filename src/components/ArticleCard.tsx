import { Calendar, Tag, User, Bookmark, Clock } from "lucide-react";
import { Article } from "../lib/supabase";
import { useBookmarks } from "../hooks/useBookmarks";
import { calculateReadingTime } from "../utils/readingTime";
import { getRelativeTime } from "../utils/helpers";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  // Check if article is new (published within last 7 days)
  const isNew = () => {
    const publishedDate = new Date(article.published_at);
    const now = new Date();
    const diffInDays = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const readingTime = calculateReadingTime(article.content);

  return (
    <article
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-300 text-6xl font-bold">TCC</span>
          </div>
        )}
        
        {/* New Badge */}
        {isNew() && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
            NOUVEAU
          </div>
        )}
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            bookmarked
              ? "bg-accent text-white"
              : "bg-white/90 text-gray-700 hover:bg-accent hover:text-white"
          }`}
          aria-label={bookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-secondary dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{getRelativeTime(article.published_at)}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Tag className="w-4 h-4 text-accent-green" />
              <span className="capitalize">{article.category}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs">{readingTime}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-primary dark:text-white mb-3 group-hover:text-accent dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h2>

        <p className="text-secondary dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
          {article.summary}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4 text-secondary dark:text-gray-400" />
            <div className="flex flex-col">
              <span className="font-medium text-primary dark:text-white">
                {article.author.name}
              </span>
              <span className="text-xs text-secondary dark:text-gray-400">
                {article.author.chapter}
              </span>
            </div>
          </div>

          <span className="inline-flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
            Lire
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
