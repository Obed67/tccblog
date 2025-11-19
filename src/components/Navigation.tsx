import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/archives", label: "Archives" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 py-3 md:py-4">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/logo.png"
              alt="TCC Logo"
              className="h-10 md:h-12 w-auto"
              onError={(e) => {
                // Fallback si le logo n'est pas trouvé
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-xl font-bold text-gray-900">TCC</span>
          </Link>

          {/* Hamburger Button - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent border-l-4 border-accent"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
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
