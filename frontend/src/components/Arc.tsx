export default function Arc({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 22C2 10.402 11.402 1 23 1s21 9.402 21 21"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
