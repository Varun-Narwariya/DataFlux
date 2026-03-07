import { ROUTES } from "../config/routes.config";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex flex-col">
      {/* Minimal nav */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <a href={ROUTES.HOME} className="flex items-center gap-1.5">
          <span className="text-2xl">📕</span>
          <span className="font-black text-red-600 text-xl tracking-tight">DataFlux</span>
          <span className="font-light text-gray-400 text-xl">PDF</span>
        </a>
        <a href={ROUTES.HOME} className="text-sm text-gray-500 hover:text-red-600 transition font-medium">
          ← Back to tools
        </a>
      </nav>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 w-full max-w-md p-8">
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && <h1 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h1>}
              {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} DataFlux PDF. All rights reserved.
      </p>
    </div>
  );
}
