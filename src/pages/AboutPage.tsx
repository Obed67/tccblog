import { Info, Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Notre Communauté",
      description:
        "Une plateforme dédiée à connecter et informer notre communauté.",
      color: "#53A9E0",
    },
    {
      icon: Target,
      title: "Notre Mission",
      description:
        "Partager des informations pertinentes et créer du contenu de qualité.",
      color: "#41B07A",
    },
    {
      icon: Heart,
      title: "Nos Valeurs",
      description:
        "Transparence, engagement et excellence dans tout ce que nous faisons.",
      color: "#F0B429",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-accent-green/10 p-3 rounded-xl">
              <Info className="w-10 h-10 text-accent-green" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              À propos
            </h1>
          </div>
          <p className="text-xl text-secondary max-w-2xl leading-relaxed">
            Découvrez qui nous sommes et notre mission pour l'écosystème tech
            africain.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-10 md:p-14 mb-12">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Bienvenue sur la plateforme TCC
          </h2>
          <p className="text-secondary leading-relaxed mb-6 text-lg">
            TCC est une plateforme dédiée à la diffusion d'informations,
            d'actualités et d'événements importants pour notre communauté. Nous
            nous engageons à fournir un contenu de qualité, pertinent et
            accessible à tous.
          </p>
          <p className="text-secondary leading-relaxed text-lg">
            Notre blog est conçu pour être votre source d'information
            privilégiée, avec des articles régulièrement mis à jour sur les
            sujets qui vous intéressent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:border-accent hover:shadow-lg transition-all"
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
