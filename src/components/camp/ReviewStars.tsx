export default function ReviewStars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={onChange ? () => onChange(n) : undefined}
          className={onChange ? "transition-transform hover:scale-110" : "cursor-default"}
          style={{
            color: n <= value ? "#FFD93D" : "#E5E5E5",
            fontSize: "1.5rem",
            lineHeight: 1,
            filter: n <= value ? "drop-shadow(0 1px 2px rgba(255,154,86,0.3))" : "none",
          }}
          aria-label={`${n} звёзд`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
