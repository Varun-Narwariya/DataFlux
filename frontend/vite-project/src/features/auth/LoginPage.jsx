import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import { useAuth } from "./useAuth";
import { ROUTES } from "../../config/routes.config";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setServerError("");
    try {
      await login(form.email, form.password);
      window.location.href = ROUTES.DASHBOARD;
    } catch (err) {
      setServerError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <AuthLayout title="Welcome back 👋" subtitle="Log in to your DataFlux account">
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon="📧"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          icon="🔒"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
        />

        {serverError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
            ⚠️ {serverError}
          </div>
        )}

        <div className="flex justify-end">
          <a href="#" className="text-xs text-red-600 hover:underline font-medium">Forgot password?</a>
        </div>

        <Button className="w-full" size="lg" loading={loading} onClick={handleSubmit}>
          Log In
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href={ROUTES.SIGNUP} className="text-red-600 font-semibold hover:underline">Sign up free</a>
        </p>
      </div>
    </AuthLayout>
  );
}
