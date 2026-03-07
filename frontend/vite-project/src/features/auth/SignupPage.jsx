import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import { useAuth } from "./useAuth";
import { ROUTES } from "../../config/routes.config";

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setServerError("");
    try {
      await signup(form.name, form.email, form.password);
      window.location.href = ROUTES.DASHBOARD;
    } catch (err) {
      setServerError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <AuthLayout title="Create an account 🚀" subtitle="It's free — no credit card needed">
      <div className="space-y-4">
        <Input label="Full Name" placeholder="Jane Doe" icon="👤" value={form.name} onChange={set("name")} error={errors.name} />
        <Input label="Email" type="email" placeholder="you@example.com" icon="📧" value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Password" type="password" placeholder="Min 8 characters" icon="🔒" value={form.password} onChange={set("password")} error={errors.password} />
        <Input label="Confirm Password" type="password" placeholder="Repeat password" icon="🔒" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />

        {serverError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
            ⚠️ {serverError}
          </div>
        )}

        <Button className="w-full" size="lg" loading={loading} onClick={handleSubmit}>
          Create Free Account
        </Button>

        <p className="text-center text-xs text-gray-400">
          By signing up you agree to our{" "}
          <a href="#" className="text-red-600 hover:underline">Terms</a> and{" "}
          <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>.
        </p>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href={ROUTES.LOGIN} className="text-red-600 font-semibold hover:underline">Log in</a>
        </p>
      </div>
    </AuthLayout>
  );
}
