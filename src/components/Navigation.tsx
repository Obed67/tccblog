import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/archives", label: "Archives" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 py-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="TCC Logo"
              className="h-12 w-auto"
              onError={(e) => {
                // Fallback si le logo n'est pas trouvé
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-xl font-bold text-gray-900">TCC</span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-1">
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
      </div>
    </nav>
  );
}
