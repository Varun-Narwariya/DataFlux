import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvider";
import QueryProvider from "./providers/QueryProvider";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
