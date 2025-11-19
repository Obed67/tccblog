import {
  ArrowLeft,
  Calendar,
  Tag,
  Heart,
  Eye,
  MessageCircle,
  User,
} from "lucide-react";
import { Article, mockComments } from "../lib/supabase";
import { useState } from "react";

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
}

export default function ArticleDetailPage({
  article,
  onBack,
}: ArticleDetailPageProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const comments = mockComments[article.id] || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 transition-colors">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-secondary dark:text-gray-400 hover:text-accent transition-colors mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm md:text-base"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour aux articles</span>
          </button>

          {article.image_url && (
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-gray-100 to-gray-50">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center space-x-6 text-secondary dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span>{formatDate(article.published_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-accent-green" />
              <span className="capitalize">{article.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-gray-400" />
              <span>{article.views} vues</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm text-secondary dark:text-gray-400 mb-6">
            <User className="w-5 h-5" />
            <span className="font-medium">{article.author.name}</span>
            <span className="text-gray-400">•</span>
            <span>{article.author.chapter}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-secondary dark:text-gray-300 leading-relaxed mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none">
          <div
            className="text-secondary dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Section Likes & Commentaires */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          {/* Likes */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                liked
                  ? "bg-red-50 text-red-600 border-2 border-red-600"
                  : "bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              <span>{likesCount}</span>
            </button>
            <div className="flex items-center space-x-2 text-secondary dark:text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">
                {comments.length} commentaires
              </span>
            </div>
          </div>

          {/* Commentaires */}
          {comments.length > 0 && (
            <div className="space-y-6 mb-8">
              <h3 className="text-2xl font-bold text-primary dark:text-white">
                Commentaires
              </h3>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary dark:text-white">
                          {comment.author}
                        </p>
                        <p className="text-sm text-secondary dark:text-gray-400">
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{comment.likes}</span>
                    </div>
                  </div>
                  <p className="text-secondary dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire de commentaire */}
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
              Laisser un commentaire
            </h3>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-4 mb-4 focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              rows={4}
              placeholder="Partagez votre avis sur cet événement..."
            />
            <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-all font-semibold shadow-md hover:shadow-lg">
              Publier le commentaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
