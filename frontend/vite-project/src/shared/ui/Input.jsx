export default function Input({
  label,
  error,
  hint,
  className = "",
  icon = null,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full bg-gray-50 border rounded-xl text-sm text-gray-800
            placeholder-gray-400 transition-all duration-150 outline-none
            px-3.5 py-3
            ${icon ? "pl-10" : ""}
            ${error
              ? "border-rose-400 focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
              : "border-gray-200 focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:bg-white"
            }
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
