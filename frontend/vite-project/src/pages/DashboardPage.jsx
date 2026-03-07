import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import UserFiles from "../features/storage/UserFiles";
import AccountSettings from "../features/account/AccountSettings";
import MainLayout from "../layouts/MainLayout";

const TABS = ["My Files", "Settings"];

export default function DashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("My Files");

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl font-black">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">
              Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-100 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm font-semibold px-4 py-2.5 border-b-2 transition -mb-px
                ${tab === t
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "My Files" && <UserFiles />}
        {tab === "Settings" && <AccountSettings />}
      </div>
    </MainLayout>
  );
}
