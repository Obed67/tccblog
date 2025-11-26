import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Moon, Sun, Home, Search, Archive, Bookmark, Info } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useBookmarks } from "../hooks/useBookmarks";

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { bookmarks } = useBookmarks();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Recherche", icon: Search },
    { path: "/archives", label: "Archives", icon: Archive },
    { path: "/bookmarks", label: "Favoris", icon: Bookmark },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 py-3 md:py-4 transition-colors">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm px-4 md:px-5 py-2.5 flex items-center justify-between transition-colors">
          {/* Logo + Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 flex-1">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="TCC Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <span className="hidden text-xl font-bold text-gray-900 dark:text-white">
                TCC
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-gray-700"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                    {item.path === "/bookmarks" && bookmarks.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-accent text-white text-xs font-bold rounded-full">
                        {bookmarks.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Dark Mode Toggle - Desktop */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile: Logo */}
          <Link
            to="/"
            className="flex lg:hidden flex-shrink-0 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/logo.png"
              alt="TCC Logo"
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-xl font-bold text-gray-900 dark:text-white">
              TCC
            </span>
          </Link>

          {/* Actions - Mobile/Tablet */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Hamburger Button - Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-colors">
            <div className="py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent dark:bg-accent/20 border-l-4 border-accent"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.path === "/bookmarks" && bookmarks.length > 0 && (
                      <span className="ml-auto px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full">
                        {bookmarks.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
