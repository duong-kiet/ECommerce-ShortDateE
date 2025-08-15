"use client";

export default function LoadingSpinner({
  size = 48,
  label,
  overlay = false,
  overlayClassName = "bg-white/20 backdrop-blur-sm pointer-events-none",
}: {
  size?: number;
  label?: string;
  overlay?: boolean;
  overlayClassName?: string;
}) {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg
        style={{ width: size, height: size }}
        className="animate-spin text-green-600"
        viewBox="0 0 50 50"
        aria-hidden
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeOpacity="0.12"
        />
        <path
          fill="currentColor"
          d="M45 25c0-11.046-8.954-20-20-20v5a15 15 0 1015 15h5z"
        />
      </svg>
      {label && <span className="text-sm text-green-700">{label}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
      >
        <div className="p-2 rounded-md pointer-events-none">{spinner}</div>
      </div>
    );
  }

  return spinner;
}
