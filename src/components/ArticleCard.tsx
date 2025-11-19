import { Calendar, Tag, User } from "lucide-react";
import { Article } from "../lib/supabase";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

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
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-300 text-6xl font-bold">TCC</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-secondary dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Tag className="w-4 h-4 text-accent-green" />
              <span className="capitalize">{article.category}</span>
            </div>
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
