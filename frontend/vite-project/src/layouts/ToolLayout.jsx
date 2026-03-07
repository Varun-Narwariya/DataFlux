import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import { useAuth } from "../features/auth/useAuth";
import { ACCENT_CLASSES } from "../config/tools.config";

export default function ToolLayout({ children, tool }) {
  const { user, logout } = useAuth();
  const a = tool ? ACCENT_CLASSES[tool.accent] : ACCENT_CLASSES.red;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar user={user} onLogout={logout} />

      {/* Tool Hero Header */}
      {tool && (
        <div className={`${a.bg} border-b ${a.border}`}>
          <div className="max-w-3xl mx-auto px-4 py-8 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${a.icon} shadow-sm`}>
              {tool.emoji}
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">{tool.label}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{tool.desc}</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
