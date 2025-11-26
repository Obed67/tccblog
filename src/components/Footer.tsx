import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: "Accueil", path: "/" },
      { name: "Archives", path: "/archives" },
      { name: "À propos", path: "/about" },
      { name: "Recherche", path: "/search" },
    ],
    resources: [
      { name: "Favoris", path: "/bookmarks" },
      { name: "Statistiques", path: "/stats" },
      { name: "Timeline", path: "/timeline" },
    ],
    social: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/techcommunitiesclubs",
        icon: Linkedin,
      },
      {
        name: "Twitter",
        url: "https://twitter.com/tcc_africa",
        icon: Twitter,
      },
      {
        name: "GitHub",
        url: "https://github.com/Obed67/tccblog",
        icon: Github,
      },
      {
        name: "Email",
        url: "mailto:info@tcc.hyver.org",
        icon: Mail,
      },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="TCC Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div>
                <h3 className="text-xl font-bold text-primary dark:text-white">
                  TCC Blog
                </h3>
                <p className="text-sm text-secondary dark:text-gray-400">
                  Tech Communities Club
                </p>
              </div>
            </div>
            <p className="text-secondary dark:text-gray-400 leading-relaxed mb-4">
              Plateforme de documentation des événements Tech Communities Clubs
              à travers l'Afrique. Partagez, apprenez et grandissez avec la
              communauté.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white dark:hover:bg-accent text-gray-600 dark:text-gray-400 rounded-lg transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-primary dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-primary dark:text-white uppercase tracking-wider mb-4">
              Ressources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary dark:text-gray-400 text-center md:text-left">
              © {currentYear} Tech Communities Club. Tous droits réservés.
            </p>
            <p className="text-sm text-secondary dark:text-gray-400 flex items-center">
              Made with{" "}
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by
              the TCC Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
