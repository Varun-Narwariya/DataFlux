import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";

export default function AccountSettings() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // TODO: call API to update profile
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="max-w-lg space-y-8">
      {/* Profile */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">👤 Profile</h2>
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={set("name")} />
          <Input label="Email" type="email" value={form.email} onChange={set("email")} />
          <Button onClick={handleSave} size="md">
            {saved ? "✅ Saved!" : "Save Changes"}
          </Button>
        </div>
      </section>

      {/* Password */}
      <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">🔒 Change Password</h2>
        <div className="space-y-4">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="Min 8 characters" />
          <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
          <Button variant="secondary" size="md">Update Password</Button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
        <h2 className="font-bold text-rose-700 mb-2">⚠️ Danger Zone</h2>
        <p className="text-sm text-rose-600 mb-4">Permanently delete your account and all your data.</p>
        <Button variant="danger" size="sm">Delete Account</Button>
      </section>
    </div>
  );
}
