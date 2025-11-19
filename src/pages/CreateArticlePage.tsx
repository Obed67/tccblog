import { useState } from "react";
import { ArrowLeft, Save, Eye, Image as ImageIcon } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/quill-custom.css";

interface CreateArticlePageProps {
  onBack: () => void;
  onPublish: (article: unknown) => void;
}

export default function CreateArticlePage({
  onBack,
  onPublish,
}: CreateArticlePageProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    image_url: "",
    category: "",
    author_name: "",
    author_chapter: "",
  });

  const [preview, setPreview] = useState(false);

  const categories = [
    "Cybersécurité",
    "Programmation",
    "Intelligence Artificielle",
    "Communauté",
    "Carrière",
    "Événement Majeur",
    "Data Science",
    "DevOps",
    "Web Development",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto-générer le slug depuis le titre
      ...(name === "title" && {
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }),
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  // Configuration de l'éditeur Quill
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "link",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle = {
      id: Date.now().toString(),
      ...formData,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes: 0,
      views: 0,
      author: {
        name: formData.author_name,
        chapter: formData.author_chapter,
      },
    };

    onPublish(newArticle);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-secondary hover:text-accent transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-secondary hover:bg-gray-50 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>{preview ? "Éditer" : "Prévisualiser"}</span>
              </button>

              <button
                onClick={handleSubmit}
                className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-2.5 rounded-lg hover:bg-accent/90 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Publier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form or Preview */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                Créer un nouvel article
              </h1>
              <p className="text-secondary">
                Documentez votre événement TCC et partagez-le avec la communauté
              </p>
            </div>

            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Titre de l'article *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ex: Workshop Python : Retour sur notre Session du 15 Novembre"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-lg"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="workshop-python-session-nov-2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-secondary mt-1">
                Généré automatiquement depuis le titre, personnalisable
              </p>
            </div>

            {/* Résumé */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Résumé *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Un résumé court et accrocheur de l'article (2-3 phrases)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Contenu de l'article *
              </label>
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Rédigez le contenu complet de votre article..."
                  className="custom-quill-editor"
                  style={{ minHeight: "400px" }}
                />
              </div>
              <p className="text-xs text-secondary mt-2">
                Utilisez la barre d'outils pour formater votre texte (gras,
                italique, titres, listes, etc.)
              </p>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                URL de l'image
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://exemple.com/image.jpg"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ImageIcon className="w-5 h-5 text-secondary" />
                </button>
              </div>
              {formData.image_url && (
                <div className="mt-3">
                  <img
                    src={formData.image_url}
                    alt="Aperçu"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = "";
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Catégorie */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Auteur */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Nom de l'auteur *
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  required
                  placeholder="Ex: TCC ESGIS"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* Chapitre */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Chapitre / Localisation *
              </label>
              <input
                type="text"
                name="author_chapter"
                value={formData.author_chapter}
                onChange={handleChange}
                required
                placeholder="Ex: Lomé, Togo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </form>
        ) : (
          /* Preview */
          <div className="space-y-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
              <strong>Mode prévisualisation</strong> - Ceci est un aperçu de
              votre article
            </div>

            {formData.image_url && (
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                <img
                  src={formData.image_url}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-center space-x-3 text-sm text-secondary mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                  {formData.category || "Catégorie"}
                </span>
                <span>•</span>
                <span>{formData.author_name || "Auteur"}</span>
                <span>•</span>
                <span>{formData.author_chapter || "Localisation"}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                {formData.title || "Titre de l'article"}
              </h1>

              <p className="text-xl text-secondary leading-relaxed mb-8 pb-8 border-b border-gray-200">
                {formData.summary || "Résumé de l'article..."}
              </p>

              <article className="prose prose-lg max-w-none">
                {formData.content ? (
                  <div
                    className="text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                ) : (
                  <p className="text-secondary italic">
                    Contenu de l'article...
                  </p>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
