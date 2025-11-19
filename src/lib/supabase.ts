// Types de données
export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  category: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  likes: number;
  views: number;
  author: {
    name: string;
    chapter: string;
  };
}

export interface Comment {
  id: string;
  article_id: string;
  author: string;
  content: string;
  created_at: string;
  likes: number;
}

// Fonction helper pour générer des articles
const generateMockArticles = (): Article[] => {
  const categories = [
    "Bootcamps",
    "Info Session",
    "Others",
    "Training",
    "Presentation",
    "Hackathon",
    "Checkout event",
    "Challenge",
  ];

  const chapters = [
    "TCC ESGIS - Lomé, Togo",
    "TCC IAI-TOGO - Lomé, Togo",
    "TCC UAC - Abomey-Calavi, Bénin",
    "TCC LBS - Lomé, Togo",
    "TCC UL - Lomé, Togo",
    "TCC IFRI - Cotonou, Bénin",
  ];

  const titles = [
    "Workshop sur le Hacking Éthique",
    "Introduction à Python - Partie",
    "Session d'Information TCC",
    "Vibe Coding avec l'IA",
    "Optimiser son Profil LinkedIn",
    "Conférence sur la Blockchain",
    "Hackathon Week-end",
    "Formation React.js",
    "Atelier Docker et Kubernetes",
    "Machine Learning pour Débutants",
    "Sécurité des Applications Web",
    "Git et GitHub Essentials",
    "Design Thinking Workshop",
    "Code Review Best Practices",
    "Développement Mobile avec Flutter",
    "Introduction à la Data Science",
    "Cloud Computing avec AWS",
    "API REST avec Node.js",
    "Testing et TDD",
    "Agile et Scrum Methodology",
  ];

  const images = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=600&fit=crop",
  ];

  const articles: Article[] = [];

  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const chapter = chapters[Math.floor(Math.random() * chapters.length)];
    const titleBase = titles[Math.floor(Math.random() * titles.length)];
    const image = images[Math.floor(Math.random() * images.length)];

    // Ajouter un numéro uniquement pour les titres génériques (pas tous les articles)
    const needsNumber = Math.random() > 0.7; // 30% des articles auront un numéro
    const title = needsNumber
      ? `${titleBase} ${Math.floor(Math.random() * 10) + 1}`
      : titleBase;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateString = date.toISOString();

    articles.push({
      id: String(i),
      title: title,
      slug: slug,
      summary: `Retour sur notre événement ${title}. Une session enrichissante qui a réuni de nombreux participants passionnés de technologie. Découvrez les points clés et les apprentissages de cet événement exceptionnel organisé par TCC.`,
      content: `<h2>Introduction</h2>
<p>Le ${date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}, la communauté TCC a organisé un événement exceptionnel sur le thème : <strong>${title}</strong>.</p>

<h2>Déroulement de l'événement</h2>
<p>Cette session a attiré de nombreux participants enthousiastes, désireux d'apprendre et de partager leurs connaissances dans le domaine de la ${category.toLowerCase()}.</p>

<p>Les points forts de l'événement :</p>
<ul>
  <li>Présentation théorique approfondie</li>
  <li>Ateliers pratiques interactifs</li>
  <li>Session de questions-réponses</li>
  <li>Networking entre participants</li>
</ul>

<h2>Retours des participants</h2>
<p>Les participants ont particulièrement apprécié l'approche pratique et les exemples concrets présentés durant la session. L'ambiance était conviviale et propice aux échanges.</p>

<blockquote>
  <p>"Un événement de qualité qui m'a permis d'élargir mes compétences et mon réseau professionnel !"</p>
  <cite>- Un participant</cite>
</blockquote>

<h2>Conclusion</h2>
<p>Ce fut encore une belle réussite pour la communauté TCC. Nous remercions tous les participants, les intervenants et les organisateurs qui ont contribué au succès de cet événement.</p>

<p>Restez connectés pour découvrir nos prochains événements !</p>`,
      image_url: image,
      category: category,
      published_at: dateString,
      created_at: dateString,
      updated_at: dateString,
      likes: Math.floor(Math.random() * 100) + 10,
      views: Math.floor(Math.random() * 500) + 50,
      author: {
        name: chapter.split(" - ")[0],
        chapter: chapter.split(" - ")[1],
      },
    });
  }

  return articles.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
};

// Données mockées - Articles d'événements TCC
export const mockArticles: Article[] = generateMockArticles();

// Données mockées - Commentaires
export const mockComments: { [articleId: string]: Comment[] } = {
  "1": [
    {
      id: "c1",
      article_id: "1",
      author: "Koffi M.",
      content:
        "Super workshop ! J'ai beaucoup appris sur les outils de pentesting. Merci aux organisateurs !",
      created_at: "2024-11-16T12:30:00Z",
      likes: 5,
    },
    {
      id: "c2",
      article_id: "1",
      author: "Aminata D.",
      content:
        "Est-ce qu'il y aura d'autres sessions sur la cybersécurité ? J'aimerais approfondir mes connaissances.",
      created_at: "2024-11-16T15:20:00Z",
      likes: 3,
    },
  ],
  "2": [
    {
      id: "c3",
      article_id: "2",
      author: "Moussa K.",
      content:
        "La POO était un concept difficile pour moi, mais maintenant c'est clair. Excellent formateur !",
      created_at: "2024-11-17T16:00:00Z",
      likes: 7,
    },
  ],
  "3": [
    {
      id: "c4",
      article_id: "3",
      author: "Fatoumata S.",
      content:
        "Fière de faire partie de cette communauté ! Hâte de participer aux prochaines activités.",
      created_at: "2024-11-18T17:45:00Z",
      likes: 12,
    },
    {
      id: "c5",
      article_id: "3",
      author: "Ibrahim L.",
      content:
        "Les témoignages étaient vraiment inspirants. TCC change des vies !",
      created_at: "2024-11-18T18:30:00Z",
      likes: 8,
    },
  ],
  "6": [
    {
      id: "c6",
      article_id: "6",
      author: "Grace A.",
      content:
        "La Dev Week était incroyable ! Notre équipe a appris énormément pendant le hackathon. 🚀",
      created_at: "2024-11-11T09:00:00Z",
      likes: 15,
    },
    {
      id: "c7",
      article_id: "6",
      author: "Yao E.",
      content:
        "Merci TCC pour l'organisation ! J'ai obtenu un stage grâce au networking day 🙏",
      created_at: "2024-11-11T14:20:00Z",
      likes: 20,
    },
  ],
};
