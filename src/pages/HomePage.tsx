import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { mockArticles, Article } from "../lib/supabase";
import ArticleCard from "../components/ArticleCard";

interface HomePageProps {
  onArticleClick: (article: Article) => void;
  articles: Article[];
}

export default function HomePage({
  onArticleClick,
  articles: propArticles,
}: HomePageProps) {
  const [articles, setArticles] = useState<Article[]>(propArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mettre à jour les articles quand les props changent
    setArticles(propArticles);
    // Simuler un chargement
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [propArticles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Nous connectons les étudiants aux{" "}
            <span className="text-accent">Communautés Tech</span>
          </h1>
          <p className="text-xl text-secondary mx-auto max-w-3xl leading-relaxed">
            Découvrez nos dernières actualités, événements et ressources pour la
            communauté technologique africaine.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-secondary text-lg">
              Aucun article disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => onArticleClick(article)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
