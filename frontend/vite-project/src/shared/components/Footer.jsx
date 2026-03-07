export default function Footer() {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "Tools",
      links: ["Merge PDF", "Split PDF", "Compress PDF", "Convert PDF", "Edit PDF"],
    },
    {
      title: "Convert",
      links: ["PDF to Word", "PDF to JPG", "Word to PDF", "JPG to PDF", "Excel to PDF"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Pricing", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="text-white font-bold text-sm mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs hover:text-white transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📕</span>
            <span className="font-black text-white text-lg">DataFlux</span>
            <span className="text-gray-500 font-light">PDF</span>
          </div>
          <p className="text-xs">© {year} DataFlux. All rights reserved.</p>
          <div className="flex gap-4">
            {["🐦", "💼", "📘"].map((icon, i) => (
              <a key={i} href="#" className="text-lg hover:scale-110 transition-transform">{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
