export default function ToolOptionsPanel({ title = "Options", children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mt-4">
      <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>⚙️</span> {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function OptionRow({ label, hint, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="sm:w-40 shrink-0">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function OptionSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
