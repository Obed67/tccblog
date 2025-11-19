import { useEffect, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Article } from "../lib/supabase";
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
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    // Mettre à jour les articles quand les props changent
    setArticles(propArticles);
    // Simuler un chargement
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [propArticles]);

  // Calcul de la pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => onArticleClick(article)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 mb-8">
                <div className="flex flex-col items-center gap-6">
                  {/* Info page */}
                  <div className="text-sm text-secondary">
                    Page{" "}
                    <span className="font-semibold text-primary">
                      {currentPage}
                    </span>{" "}
                    sur{" "}
                    <span className="font-semibold text-primary">
                      {totalPages}
                    </span>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-3">
                    {/* Bouton Précédent */}
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-accent hover:text-accent hover:shadow-md"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Précédent</span>
                    </button>

                    {/* Numéros de page - affiche max 7 pages */}
                    <div className="flex gap-2">
                      {(() => {
                        const pages = [];
                        const maxVisible = 7;

                        if (totalPages <= maxVisible) {
                          // Afficher toutes les pages si moins de 7
                          for (let i = 1; i <= totalPages; i++) {
                            pages.push(i);
                          }
                        } else {
                          // Logique pour afficher avec "..."
                          if (currentPage <= 4) {
                            for (let i = 1; i <= 5; i++) pages.push(i);
                            pages.push("...");
                            pages.push(totalPages);
                          } else if (currentPage >= totalPages - 3) {
                            pages.push(1);
                            pages.push("...");
                            for (let i = totalPages - 4; i <= totalPages; i++)
                              pages.push(i);
                          } else {
                            pages.push(1);
                            pages.push("...");
                            for (
                              let i = currentPage - 1;
                              i <= currentPage + 1;
                              i++
                            )
                              pages.push(i);
                            pages.push("...");
                            pages.push(totalPages);
                          }
                        }

                        return pages.map((pageNumber, index) =>
                          pageNumber === "..." ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="w-10 h-10 flex items-center justify-center text-gray-400"
                            >
                              •••
                            </span>
                          ) : (
                            <button
                              key={pageNumber}
                              onClick={() => goToPage(pageNumber as number)}
                              className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                                currentPage === pageNumber
                                  ? "bg-accent text-white shadow-lg scale-110"
                                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-accent hover:text-accent hover:shadow-md"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          )
                        );
                      })()}
                    </div>

                    {/* Bouton Suivant */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-accent hover:text-accent hover:shadow-md"
                      }`}
                    >
                      <span className="hidden sm:inline">Suivant</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
