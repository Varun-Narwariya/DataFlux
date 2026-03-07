import { ACCENT_CLASSES } from "../../config/tools.config";

export default function ToolCard({ tool, onClick }) {
  const a = ACCENT_CLASSES[tool.accent];

  return (
    <button
      onClick={() => onClick?.(tool)}
      className={`
        group flex flex-col items-start gap-3 p-4 rounded-2xl border
        ${a.bg} ${a.border}
        hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200 text-left w-full cursor-pointer
      `}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${a.icon}`}>
        {tool.emoji}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm leading-tight">{tool.label}</p>
        <p className="text-xs text-gray-500 mt-1 leading-snug">{tool.desc}</p>
      </div>

      {/* Hover badge */}
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.badge} opacity-0 group-hover:opacity-100 transition-opacity duration-150`}>
        Open →
      </span>
    </button>
  );
}
