# 📰 TCC Blog

> Plateforme de documentation des événements Tech Communities Clubs à travers l'Afrique

![TCC Blog](https://img.shields.io/badge/TCC-Blog-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Objectif du Projet

TCC Blog est un **journal numérique** qui documente les événements et activités des Tech Communities Clubs (TCC). Chaque article publié raconte l'histoire d'un événement passé, permettant ainsi à ceux qui ont manqué l'événement de découvrir ce qui s'est passé, et aux nouveaux membres d'explorer l'historique de la communauté.

### 📚 Cas d'usage

- **Documentation** : Archivage des workshops, conférences et formations
- **Partage** : Diffusion des connaissances et expériences
- **Engagement** : Interaction via likes et commentaires
- **Découverte** : Exploration des événements passés par catégorie

## ✨ Fonctionnalités

### 🏠 Page d'Accueil

- Affichage de tous les articles publiés
- Grille responsive avec cartes d'articles
- Métadonnées : date, catégorie, auteur, chapitre
- Hero section moderne avec message d'accueil

### 📝 Création d'Articles

- **Éditeur riche** (React Quill) avec formatage :
  - Gras, italique, souligné, barré
  - Titres (H1, H2, H3)
  - Listes à puces et numérotées
  - Couleurs de texte et fond
  - Liens hypertextes
- **Auto-génération du slug** depuis le titre
- **Prévisualisation en direct** avant publication
- Upload d'image (URL)
- Sélection de catégorie
- Informations auteur et chapitre

### 📖 Page de Détail d'Article

- Affichage complet de l'article avec formatage
- **Système de likes** interactif
- **Section commentaires** avec affichage et formulaire
- Métadonnées complètes (vues, date, auteur)
- Navigation retour vers l'accueil

### 🗂️ Archives

- Liste des articles groupés par catégorie
- Statistiques globales (articles, catégories, vues)
- Vue d'ensemble de tous les événements documentés

### ℹ️ À Propos

- Mission, Vision & Impact du TCC
- Statistiques de la communauté
- Citation inspirante du Program Manager
- Design centré et moderne

## 🛠️ Technologies Utilisées

| Technologie      | Version | Usage                  |
| ---------------- | ------- | ---------------------- |
| **React**        | 18.3.1  | Framework UI           |
| **TypeScript**   | 5.6.2   | Typage statique        |
| **Vite**         | 5.4.11  | Build tool             |
| **Tailwind CSS** | 3.4.15  | Styling                |
| **React Quill**  | 2.0.0   | Éditeur de texte riche |
| **Lucide React** | 0.462.0 | Icônes                 |

## 🚀 Installation et Démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/Obed67/tccblog.git
cd tccblog
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Placer le logo** (optionnel)

```bash
# Placer votre logo TCC dans le dossier public/
# Nom du fichier : logo.png ou logo.svg
```

4. **Démarrer le serveur de développement**

```bash
npm run dev
```

5. **Ouvrir dans le navigateur**

```
http://localhost:5173
```

## 📦 Scripts Disponibles

```bash
# Démarrage en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualisation du build
npm run preview

# Linting du code
npm run lint
```

## 📁 Structure du Projet

```
tccblog/
├── public/               # Fichiers statiques (logo)
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── Navigation.tsx
│   │   └── ArticleCard.tsx
│   ├── pages/           # Pages de l'application
│   │   ├── HomePage.tsx
│   │   ├── ArticleDetailPage.tsx
│   │   ├── CreateArticlePage.tsx
│   │   ├── EventsPage.tsx (Archives)
│   │   └── AboutPage.tsx
│   ├── lib/             # Utilitaires et données
│   │   └── supabase.ts  # Types et données mockées
│   ├── styles/          # Styles personnalisés
│   │   └── quill-custom.css
│   ├── App.tsx          # Composant racine
│   ├── main.tsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design System

### Couleurs

- **Primary** : `#1a1a1a` (Noir/texte principal)
- **Secondary** : `#4a5568` (Gris/texte secondaire)
- **Accent** : `#3b82f6` (Bleu/actions)
- **Accent Green** : `#10b981` (Vert/succès)

### Typographie

- **Police principale** : Inter
- **Tailles** : Responsive et hiérarchiques

### Composants

- Bordures arrondies (`rounded-lg`, `rounded-xl`, `rounded-2xl`)
- Ombres légères pour la profondeur
- Transitions fluides
- Design mobile-first

## 💾 Gestion des Données

### État Actuel

Les données sont actuellement **mockées** dans `src/lib/supabase.ts` :

- 6 articles d'exemple avec événements TCC réels
- Commentaires associés aux articles
- Système de likes et vues

### Future Intégration API

Le projet est structuré pour faciliter l'intégration d'une API backend :

- Types TypeScript déjà définis
- Séparation logique des données
- Prêt pour connexion REST ou GraphQL

## 🚧 Roadmap

### Phase 1 - Frontend ✅ (Complété)

- [x] Design et UI/UX
- [x] Système de navigation
- [x] Création d'articles avec éditeur riche
- [x] Affichage et détail des articles
- [x] Likes et commentaires (UI)
- [x] Archives et catégories

### Phase 2 - Backend (À venir)

- [ ] API REST ou GraphQL
- [ ] Authentification des utilisateurs
- [ ] Base de données (PostgreSQL/MongoDB)
- [ ] Upload d'images sur serveur
- [ ] Système de commentaires persistant
- [ ] Gestion des rôles (admin, rédacteur)

### Phase 3 - Fonctionnalités Avancées

- [ ] Recherche et filtres avancés
- [ ] Tags et mots-clés
- [ ] Newsletter
- [ ] Partage sur réseaux sociaux
- [ ] Analytics et statistiques
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **TCC Team** - _Développement initial_ - [Tech Communities Club](https://tcc.hyver.org)

## 🙏 Remerciements

- Tech Communities Club pour l'inspiration
- Tous les leads et membres qui organisent des événements
- La communauté open source pour les outils utilisés

## 📞 Contact

Pour toute question ou suggestion :

- Email : info@tcc.hyver.org
- Site Web : [tcc.hyver.org](https://tcc.hyver.org)
- LinkedIn : [Tech Communities Club](https://www.linkedin.com/company/techcommunitiesclubs)

---

<p align="center">
  Made with ❤️ by the TCC Team
</p>

<p align="center">
  <i>"Chaque événement, chaque connexion, chaque opportunité est un pas en avant dans votre parcours technologique."</i>
</p>
