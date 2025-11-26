import { Article } from "../lib/supabase";
import ArticleCard from "./ArticleCard";
import { getRandomItems } from "../utils/helpers";

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  maxItems?: number;
}

export default function RelatedArticles({
  currentArticle,
  allArticles,
  maxItems = 3,
}: RelatedArticlesProps) {
  // Filter out current article and get articles from same category
  const relatedByCategory = allArticles.filter(
    (article) =>
      article.id !== currentArticle.id &&
      article.category === currentArticle.category
  );

  // If not enough articles in same category, add random articles
  let related = relatedByCategory;
  if (related.length < maxItems) {
    const otherArticles = allArticles.filter(
      (article) =>
        article.id !== currentArticle.id &&
        !relatedByCategory.find((r) => r.id === article.id)
    );
    const additionalNeeded = maxItems - related.length;
    const randomArticles = getRandomItems(otherArticles, additionalNeeded);
    related = [...related, ...randomArticles];
  }

  // Limit to maxItems
  related = related.slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-primary dark:text-white mb-8">
        Articles reliés
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => {
              window.location.href = `/article/${article.slug}`;
            }}
          />
        ))}
      </div>
    </div>
  );
}
