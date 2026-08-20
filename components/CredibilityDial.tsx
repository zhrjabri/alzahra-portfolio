export default function CredibilityDial({
  size = 40,
  value = 74,
  strokeWidth = 3,
  showLabel = false,
  className = "",
}: {
  size?: number;
  value?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const radius = 50 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E0DAD0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#9A6B12"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      {showLabel && (
        <span className="absolute font-mono text-xs text-gold">{value}</span>
      )}
    </div>
  );
}
