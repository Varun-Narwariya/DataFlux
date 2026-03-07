import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import { useAuth } from "../features/auth/useAuth";

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
