import { useState } from "react";
import { NAV_LINKS, ROUTES } from "../../config/routes.config";

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        <a href={ROUTES.HOME} className="flex items-center gap-1.5 shrink-0">
          <span className="text-2xl">📕</span>
          <span className="font-black text-red-600 text-xl tracking-tight">DataFlux</span>
          <span className="font-light text-gray-400 text-xl">PDF</span>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition font-medium">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <a href={ROUTES.DASHBOARD}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
                <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold uppercase">
                  {user.name?.[0] || "U"}
                </span>
                {user.name}
              </a>
              <button onClick={onLogout}
                className="text-sm font-semibold text-gray-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition">
                Logout
              </button>
            </div>
          ) : (
            <>
              <a href={ROUTES.LOGIN}
                className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
                Login
              </a>
              <a href={ROUTES.SIGNUP}
                className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition shadow-sm">
                Sign Up Free
              </a>
            </>
          )}

          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((v) => !v)}>
            <span className={`block w-5 h-0.5 bg-gray-600 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm text-gray-600 hover:text-red-600 py-2 px-3 rounded-lg hover:bg-red-50 transition font-medium">
              {link.label}
            </a>
          ))}
          {!user && (
            <a href={ROUTES.LOGIN}
              className="text-sm text-gray-600 hover:text-red-600 py-2 px-3 rounded-lg hover:bg-red-50 transition font-medium">
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
}