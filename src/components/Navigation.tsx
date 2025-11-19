interface NavigationProps {
  currentPage: "accueil" | "evenements" | "apropos";
  onNavigate: (page: "accueil" | "evenements" | "apropos") => void;
}

export default function Navigation({
  currentPage,
  onNavigate,
}: NavigationProps) {
  const navItems = [
    { id: "accueil" as const, label: "Home" },
    { id: "evenements" as const, label: "Archives" },
    { id: "apropos" as const, label: "About" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 py-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("accueil")}
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
          </button>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
