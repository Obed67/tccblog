import { Archive } from "lucide-react";
import { mockArticles } from "../lib/supabase";

export default function EventsPage() {
  // Grouper les articles par catégorie
  const categories = Array.from(new Set(mockArticles.map((a) => a.category)));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 px-4 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-accent/10 p-3 rounded-xl">
              <Archive className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary dark:text-white">
              Archives
            </h1>
          </div>
          <p className="text-xl text-secondary dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explorez tous nos événements passés et ressources par catégorie.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-accent mb-2">
              {mockArticles.length}
            </p>
            <p className="text-secondary dark:text-gray-400 font-medium">
              Articles publiés
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-accent-green mb-2">
              {categories.length}
            </p>
            <p className="text-secondary dark:text-gray-400 font-medium">
              Catégories
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-primary dark:text-white mb-2">
              {mockArticles.reduce((sum, a) => sum + a.views, 0)}
            </p>
            <p className="text-secondary dark:text-gray-400 font-medium">
              Vues totales
            </p>
          </div>
        </div>

        {/* Liste par catégorie */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">
            Par catégorie
          </h2>
          {categories.map((category) => {
            const articlesInCategory = mockArticles.filter(
              (a) => a.category === category
            );
            return (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-primary dark:text-white mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                  {category} ({articlesInCategory.length})
                </h3>
                <div className="space-y-3">
                  {articlesInCategory.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-start justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary dark:text-white hover:text-accent transition-colors cursor-pointer">
                          {article.title}
                        </h4>
                        <p className="text-sm text-secondary dark:text-gray-400 mt-1">
                          {new Date(article.published_at).toLocaleDateString(
                            "fr-FR"
                          )}{" "}
                          • {article.author.name}
                        </p>
                      </div>
                      <div className="text-sm text-secondary dark:text-gray-400 ml-4">
                        {article.views} vues
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
