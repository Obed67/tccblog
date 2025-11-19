import { useState, useRef } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Presentation,
  Image as ImageIcon,
} from "lucide-react";
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
  const quillRef = useRef<ReactQuill>(null);

  // Refs for hidden file inputs (PDF and Slides only)
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const slidesInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection and insertion at cursor position
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "pdf" | "slides"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      // Get current cursor position
      const range = quill.getSelection(true);
      const cursorPosition = range ? range.index : quill.getLength();

      if (type === "pdf") {
        // Create PDF embed at cursor position
        const pdfHtml = `
          <div class="media-embed pdf-embed" contenteditable="false">
            <div class="media-header">
              <svg width="20" height="20" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span class="media-title">${file.name}</span>
              <div class="media-actions">
                <a href="${result}" download="${file.name}" class="btn-open">Télécharger →</a>
              </div>
            </div>
            <div class="media-viewer">
              <iframe src="${result}" frameborder="0"></iframe>
            </div>
            <p class="media-caption">📄 Document PDF intégré - Cliquez pour naviguer ou télécharger</p>
          </div>
          <p><br></p>
        `;
        quill.clipboard.dangerouslyPasteHTML(cursorPosition, pdfHtml);
        quill.setSelection(cursorPosition + 2);
      } else if (type === "slides") {
        // For slides (PowerPoint, etc.), show preview with download
        const slidesHtml = `
          <div class="media-embed slides-embed" contenteditable="false">
            <div class="media-header">
              <svg width="20" height="20" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span class="media-title">${file.name}</span>
              <div class="media-actions">
                <a href="${result}" download="${file.name}" class="btn-open">Télécharger →</a>
              </div>
            </div>
            <div class="media-viewer slides-viewer">
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6;">
                <div style="text-align: center; padding: 40px;">
                  <svg width="64" height="64" fill="none" stroke="#10b981" stroke-width="2" style="margin: 0 auto 16px;">
                    <rect x="2" y="3" width="60" height="42" rx="2" ry="2"></rect>
                    <line x1="20" y1="51" x2="44" y2="51"></line>
                    <line x1="32" y1="45" x2="32" y2="51"></line>
                  </svg>
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">Présentation prête à être téléchargée</p>
                  <p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">${file.name}</p>
                </div>
              </div>
            </div>
            <p class="media-caption">📊 Fichier de présentation - Téléchargez pour visualiser</p>
          </div>
          <p><br></p>
        `;
        quill.clipboard.dangerouslyPasteHTML(cursorPosition, slidesHtml);
        quill.setSelection(cursorPosition + 2);
      }
    };

    // Read file as Data URL (Base64)
    reader.readAsDataURL(file);

    // Reset input value to allow same file selection again
    event.target.value = "";
  };

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

  // Handlers pour insérer les médias via file input
  const handleInsertPDF = () => {
    pdfInputRef.current?.click();
  };

  const handleInsertSlides = () => {
    slidesInputRef.current?.click();
  };

  // Configuration de l'éditeur Quill
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
    },
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
    "image",
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-secondary dark:text-gray-400 hover:text-accent transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
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
              <h1 className="text-4xl font-bold text-primary dark:text-white mb-2">
                Créer un nouvel article
              </h1>
              <p className="text-secondary dark:text-gray-400">
                Documentez votre événement TCC et partagez-le avec la communauté
              </p>
            </div>

            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                Titre de l'article *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ex: Workshop Python : Retour sur notre Session du 15 Novembre"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-lg"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="workshop-python-session-nov-2024"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-secondary dark:text-gray-400 mt-1">
                Généré automatiquement depuis le titre, personnalisable
              </p>
            </div>

            {/* Résumé */}
            <div>
              <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                Résumé *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Un résumé court et accrocheur de l'article (2-3 phrases)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                Contenu de l'article *
              </label>

              {/* Hidden file inputs */}
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileSelect(e, "pdf")}
                className="hidden"
              />
              <input
                ref={slidesInputRef}
                type="file"
                accept=".ppt,.pptx,.pdf,.odp"
                onChange={(e) => handleFileSelect(e, "slides")}
                className="hidden"
              />

              {/* Boutons d'insertion de médias */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={handleInsertPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  📄 Importer PDF
                </button>
                <button
                  type="button"
                  onClick={handleInsertSlides}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  <Presentation className="w-4 h-4" />
                  📊 Importer Slides
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden dark:text-white">
                <ReactQuill
                  ref={quillRef}
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
              <p className="text-xs text-secondary dark:text-gray-400 mt-2">
                Utilisez la barre d'outils pour formater votre texte. Les
                boutons ci-dessus permettent d'insérer des médias riches.
              </p>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                URL de l'image
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://exemple.com/image.jpg"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ImageIcon className="w-5 h-5 text-secondary dark:text-gray-400" />
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
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
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
                <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                  Nom de l'auteur *
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  required
                  placeholder="Ex: TCC ESGIS"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* Chapitre */}
            <div>
              <label className="block text-sm font-semibold text-primary dark:text-white mb-2">
                Chapitre / Localisation *
              </label>
              <input
                type="text"
                name="author_chapter"
                value={formData.author_chapter}
                onChange={handleChange}
                required
                placeholder="Ex: Lomé, Togo"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </form>
        ) : (
          /* Preview */
          <div className="space-y-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 text-yellow-800 dark:text-yellow-300">
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
              <div className="flex items-center space-x-3 text-sm text-secondary dark:text-gray-400 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                  {formData.category || "Catégorie"}
                </span>
                <span>•</span>
                <span>{formData.author_name || "Auteur"}</span>
                <span>•</span>
                <span>{formData.author_chapter || "Localisation"}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight">
                {formData.title || "Titre de l'article"}
              </h1>

              <p className="text-xl text-secondary dark:text-gray-300 leading-relaxed mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                {formData.summary || "Résumé de l'article..."}
              </p>

              <article className="prose prose-lg max-w-none">
                {formData.content ? (
                  <div
                    className="text-secondary dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                ) : (
                  <p className="text-secondary dark:text-white italic">
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
