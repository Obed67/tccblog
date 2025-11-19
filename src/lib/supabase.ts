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

// Données mockées - Articles d'événements TCC
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Le Hacking Éthique : Retour sur notre Workshop du 15 Novembre",
    slug: "hacking-ethique-workshop-nov-2024",
    summary:
      "Plus de 80 participants ont découvert les bases du hacking éthique lors de notre workshop animé par des experts en cybersécurité. Une session interactive et enrichissante !",
    content: `Le 15 novembre 2024, la communauté TCC a organisé un workshop exceptionnel sur le thème du hacking éthique. Cet événement a réuni plus de 80 étudiants passionnés par la cybersécurité.

La session a débuté par une présentation des fondamentaux du hacking éthique, animée par des professionnels du secteur. Les participants ont découvert les différentes techniques utilisées par les hackers éthiques pour identifier et corriger les vulnérabilités des systèmes informatiques.

Durant l'atelier pratique, les étudiants ont pu mettre en application leurs connaissances sur des environnements de test sécurisés. Ils ont appris à utiliser des outils comme Kali Linux, Metasploit et Wireshark.

L'événement s'est terminé par une session de questions-réponses où les participants ont pu échanger directement avec les experts et obtenir des conseils pour démarrer une carrière dans la cybersécurité.

Un grand merci à tous les participants et aux intervenants qui ont rendu cet événement mémorable !`,
    image_url:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    category: "Cybersécurité",
    published_at: "2024-11-16T10:00:00Z",
    created_at: "2024-11-16T10:00:00Z",
    updated_at: "2024-11-16T10:00:00Z",
    likes: 45,
    views: 234,
    author: {
      name: "TCC ESGIS",
      chapter: "Lomé, Togo",
    },
  },
  {
    id: "2",
    title: "Introduction à Python : Partie 3 - Programmation Orientée Objet",
    slug: "intro-python-partie-3-poo",
    summary:
      "Suite de notre série sur Python ! Cette semaine, nous avons exploré la POO avec des exemples pratiques et des exercices en direct.",
    content: `Notre série de formations Python continue avec succès ! La troisième partie, consacrée à la Programmation Orientée Objet (POO), a attiré plus de 60 participants enthousiastes.

Au programme de cette session :
- Les concepts de classes et d'objets
- L'encapsulation et l'héritage
- Le polymorphisme en pratique
- Les méthodes spéciales (dunder methods)

Les participants ont travaillé sur un projet fil rouge : la création d'un système de gestion d'une bibliothèque numérique. Ce projet leur a permis d'appliquer concrètement tous les concepts abordés.

L'interaction était au rendez-vous avec de nombreuses questions pertinentes et des débats enrichissants sur les meilleures pratiques en Python.

Rendez-vous la semaine prochaine pour la partie 4 : Les frameworks web avec Flask !`,
    image_url:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
    category: "Programmation",
    published_at: "2024-11-17T14:30:00Z",
    created_at: "2024-11-17T14:30:00Z",
    updated_at: "2024-11-17T14:30:00Z",
    likes: 38,
    views: 189,
    author: {
      name: "TCC IAI-TOGO",
      chapter: "Lomé, Togo",
    },
  },
  {
    id: "3",
    title: "Session d'Information TCC UAC : Plus de 150 Nouveaux Membres !",
    slug: "session-info-tcc-uac-2024",
    summary:
      "Record de participation pour notre session d'information à l'UAC ! Découvrez le compte-rendu de cette journée exceptionnelle.",
    content: `La session d'information du TCC UAC a dépassé toutes nos espérances avec plus de 150 étudiants présents ! Cette affluence témoigne de l'engouement croissant pour les technologies et la communauté TCC.

Déroulement de la session :
1. Présentation de TCC et de sa mission
2. Témoignages d'anciens membres
3. Présentation des activités et événements à venir
4. Session de networking

Les étudiants ont particulièrement apprécié les témoignages inspirants des anciens membres qui ont partagé leur parcours et les opportunités qu'ils ont saisies grâce à TCC.

Nous avons également annoncé le lancement de plusieurs projets communautaires :
- Hackathon inter-universités en décembre
- Programme de mentorat en développement web
- Ateliers hebdomadaires sur diverses technologies

Bienvenue à tous nos nouveaux membres ! Ensemble, construisons l'écosystème tech africain de demain.`,
    image_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "Communauté",
    published_at: "2024-11-18T16:00:00Z",
    created_at: "2024-11-18T16:00:00Z",
    updated_at: "2024-11-18T16:00:00Z",
    likes: 67,
    views: 312,
    author: {
      name: "TCC UAC",
      chapter: "Abomey-Calavi, Bénin",
    },
  },
  {
    id: "4",
    title: "Vibe Coding avec l'IA : Construire son Premier Projet",
    slug: "vibe-coding-ia-premier-projet",
    summary:
      "Une session innovante où les participants ont créé des projets fonctionnels en utilisant l'IA comme assistant de développement.",
    content: `Le concept de "Vibe Coding" a fait son entrée chez TCC ! Cette nouvelle approche du développement assisté par IA a fasciné nos 45 participants.

Qu'est-ce que le Vibe Coding ?
C'est une méthodologie moderne où l'IA (ChatGPT, GitHub Copilot, etc.) assiste le développeur dans la création de projets. Au lieu de coder ligne par ligne, on décrit ce qu'on veut et l'IA nous aide à le réaliser.

Durant la session :
- Introduction aux outils d'IA pour développeurs
- Démonstration en direct : création d'une todo app
- Atelier pratique : chaque participant a créé son projet
- Discussions sur l'avenir du développement

Les projets réalisés étaient impressionnants : applications de gestion, jeux simples, sites web interactifs... Le tout en quelques heures seulement !

Cette session a prouvé que l'IA est un outil puissant qui démocratise la programmation. Elle ne remplace pas le développeur, mais augmente ses capacités.`,
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "Intelligence Artificielle",
    published_at: "2024-11-19T09:00:00Z",
    created_at: "2024-11-19T09:00:00Z",
    updated_at: "2024-11-19T09:00:00Z",
    likes: 52,
    views: 198,
    author: {
      name: "TCC UAC",
      chapter: "Abomey-Calavi, Bénin",
    },
  },
  {
    id: "5",
    title: "Optimiser son Profil LinkedIn : Workshop Carrière",
    slug: "optimiser-linkedin-workshop-carriere",
    summary:
      "Un atelier pratique pour apprendre à valoriser son profil LinkedIn et augmenter sa visibilité auprès des recruteurs tech.",
    content: `Dans un marché du travail de plus en plus digitalisé, avoir un profil LinkedIn optimisé est essentiel. C'est le thème de notre workshop qui a réuni 70 participants motivés.

Points clés abordés :
1. Créer un titre accrocheur
2. Rédiger un résumé impactant
3. Mettre en valeur ses compétences techniques
4. Optimiser pour les mots-clés recherchés
5. Construire son réseau stratégiquement

L'atelier était animé par un recruteur tech professionnel qui a partagé les coulisses du recrutement et ce que les entreprises recherchent vraiment.

Chaque participant a travaillé en direct sur son profil avec des retours personnalisés. Plusieurs ont déjà reçu des contacts de recruteurs dans les jours suivants !

Tips bonus partagés :
- Publier régulièrement du contenu technique
- Interagir avec les posts de professionnels du secteur
- Rejoindre des groupes pertinents
- Demander des recommandations

LinkedIn est votre vitrine professionnelle, soignez-la !`,
    image_url:
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&h=600&fit=crop",
    category: "Carrière",
    published_at: "2024-11-14T11:00:00Z",
    created_at: "2024-11-14T11:00:00Z",
    updated_at: "2024-11-14T11:00:00Z",
    likes: 41,
    views: 267,
    author: {
      name: "TCC LBS",
      chapter: "Lomé, Togo",
    },
  },
  {
    id: "6",
    title: "Dev Week 2024 : 5 Jours Intensifs de Code et d'Innovation",
    slug: "dev-week-2024-recap",
    summary:
      "Retour sur une semaine extraordinaire : hackathon, conférences, ateliers et networking. Plus de 200 participants pour célébrer la tech !",
    content: `La Dev Week 2024 restera gravée dans l'histoire de TCC ! Cet événement phare a transformé nos campus en véritables hubs d'innovation pendant 5 jours.

Programme de la semaine :

Jour 1 - Conférences d'ouverture
Des speakers inspirants ont partagé leur vision de la tech africaine. Thèmes : IA, Blockchain, Cybersécurité.

Jour 2 & 3 - Hackathon 48h
70 participants répartis en équipes ont développé des solutions innovantes. 12 projets finalisés, tous impressionnants !

Jour 4 - Ateliers techniques
Sessions parallèles sur React, Flutter, Data Science et DevOps. Ateliers pratiques animés par des professionnels.

Jour 5 - Pitch Day & Networking
Présentation des projets du hackathon devant un jury d'experts. Remise des prix et session networking avec des entreprises partenaires.

Résultats :
🏆 3 équipes gagnantes avec des prix
💼 15 offres de stage proposées
🤝 200+ connexions professionnelles créées

La Dev Week 2024 a démontré le potentiel incroyable de notre communauté. Rendez-vous en 2025 pour une édition encore plus grande !`,
    image_url:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    category: "Événement Majeur",
    published_at: "2024-11-10T18:00:00Z",
    created_at: "2024-11-10T18:00:00Z",
    updated_at: "2024-11-10T18:00:00Z",
    likes: 123,
    views: 456,
    author: {
      name: "TCC Network",
      chapter: "Multi-Chapitres",
    },
  },
];

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
