const VARIANTS = {
  primary:  "bg-red-600 hover:bg-red-700 text-white shadow-sm",
  secondary:"bg-white hover:bg-gray-50 text-gray-700 border border-gray-200",
  ghost:    "bg-transparent hover:bg-gray-100 text-gray-600",
  danger:   "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
};

const SIZES = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 rounded-xl",
  lg: "text-base px-6 py-3 rounded-xl font-semibold",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  icon = null,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : icon ? (
        <span className="text-base">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
