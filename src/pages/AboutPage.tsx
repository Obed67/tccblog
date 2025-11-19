import { Info, Users, Target, Heart, Globe, Award, Rocket } from "lucide-react";
import { mockArticles } from "../lib/supabase";

export default function AboutPage() {
  const stats = [
    { label: "Membres Actifs", value: "+4,931" },
    { label: "Universités", value: "27" },
    { label: "Événements", value: "210+" },
    { label: "Pays", value: "6" },
  ];

  const features = [
    {
      icon: Target,
      title: "Mission",
      description:
        "Former et responsabiliser les étudiants à travers l'Afrique par le biais de communautés d'apprentissage technologique.",
      color: "#3b82f6",
    },
    {
      icon: Rocket,
      title: "Vision",
      description:
        "Créer une nouvelle génération de leaders technologiques africains innovants.",
      color: "#10b981",
    },
    {
      icon: Globe,
      title: "Impact",
      description:
        "Transformer l'éducation et créer des opportunités dans les pays africains.",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Tech Communities <span className="text-accent">Club</span>
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Construire une génération numérique forte et engagée à travers
            l'Afrique.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 text-center hover:border-accent transition-all"
            >
              <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </p>
              <p className="text-secondary font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-10 md:p-14 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            À propos du TCC Blog
          </h2>
          <p className="text-secondary leading-relaxed mb-6 text-lg">
            Le <strong>TCC Blog</strong> est l'espace officiel de documentation
            des événements et activités des Tech Communities Clubs à travers
            l'Afrique. Chaque article publié ici raconte l'histoire d'un
            événement, partage les connaissances acquises et célèbre les
            réussites de notre communauté.
          </p>
          <p className="text-secondary leading-relaxed text-lg">
            Que vous ayez manqué un workshop, une conférence ou une session de
            formation, vous trouverez ici tous les compte-rendus détaillés.
            Notre mission : rendre accessible à tous les ressources et
            expériences partagées lors de nos événements.
          </p>
        </div>

        {/* Mission, Vision, Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Notre Mission, Vision & Impact
          </h2>
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
                    <Icon
                      className="w-8 h-8"
                      style={{ color: feature.color }}
                    />
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

        {/* Citation */}
        <div className="bg-gradient-to-br from-accent/5 to-accent-green/5 border border-accent/20 rounded-2xl p-10 text-center">
          <p className="text-lg md:text-xl text-primary italic leading-relaxed mb-4">
            "Croyez au pouvoir du TCC : chaque événement, chaque connexion,
            chaque opportunité est un pas en avant dans votre parcours
            technologique. Faites confiance au processus — nous sommes là pour
            vous aider à devenir les talents et les leaders de demain."
          </p>
          <p className="text-secondary font-semibold">
            — Parfait TOKE, Program Manager TCC
          </p>
        </div>
      </div>
    </div>
  );
}
