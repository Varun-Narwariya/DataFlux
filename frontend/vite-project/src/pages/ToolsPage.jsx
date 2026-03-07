import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ToolCard from "../shared/components/ToolCard";
import { TOOLS, TOOL_CATEGORIES } from "../config/tools.config";
import { useDebounce } from "../shared/hooks/useDebounce";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 250);

  const filtered = TOOLS.filter((t) => {
    const matchCat = activeCategory === "All" || t.cat === activeCategory;
    const matchSearch =
      !search ||
      t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = TOOL_CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter((t) => t.cat === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const handleToolClick = (tool) => {
    window.location.href = tool.route;
  };

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-red-100">
            🚀 All PDF tools — 100% Free
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Every PDF tool you'll
            <br />
            <span className="text-red-600">ever need</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Merge, split, compress, convert, edit — all for free, right in your browser. No installation required.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search PDF tools…"
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition placeholder-gray-400"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-10 flex-wrap">
            {[["25+", "PDF Tools"], ["100%", "Free"], ["No Sign-up", "Required"], ["Secure", "& Private"]].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-xl font-black text-gray-800">{num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition whitespace-nowrap
                  ${activeCategory === cat
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tools Grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {search && (
          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-gray-800">"{search}"</span>
          </p>
        )}

        {activeCategory === "All" && !search ? (
          Object.entries(grouped).map(([cat, tools]) => (
            <section key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-black text-gray-800 tracking-tight">{cat}</h2>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                  {tools.length} tools
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {tools.map((t) => <ToolCard key={t.id} tool={t} onClick={handleToolClick} />)}
              </div>
            </section>
          ))
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.length > 0
              ? filtered.map((t) => <ToolCard key={t.id} tool={t} onClick={handleToolClick} />)
              : (
                <div className="col-span-full text-center py-24">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="font-semibold text-gray-600">No tools found</p>
                  <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
                </div>
              )
            }
          </div>
        )}
      </div>

      {/* ── Features strip ── */}
      <div className="bg-white border-t border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-10">Why DataFlux PDF?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Lightning Fast",  desc: "Process files in seconds. No waiting, no queues." },
              { icon: "🔒", title: "100% Secure",     desc: "Files are encrypted and permanently deleted after processing." },
              { icon: "🌐", title: "Works Anywhere",  desc: "No installation needed. Works in any modern browser." },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
