export default function Stars({ value }: { value: number }) {
  return (
    <div className="inline-flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= value ? "#FFD93D" : "#E5E5E5" }}>
          ★
        </span>
      ))}
    </div>
  );
}
