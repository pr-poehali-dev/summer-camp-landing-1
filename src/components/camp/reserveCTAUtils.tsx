export const SHIFT_ACCUSATIVE: Record<number, string> = {
  1: "«Сундук со сказками»",
  2: "«Вкусные открытия»",
  3: "«Мульти-драйв»",
  4: "«Поколение АЛЬФА»",
  5: "«Есть ли жизнь на Марсе?»",
  6: "«Кругосветку»",
  7: "«Лабораторию чудес»",
};

export const RESERVATION_AMOUNT = 1000;

export const RESERVE_OPEN_EVENT = "reserve:open";

export function openReserveModal(shiftId?: number | null) {
  if (typeof window === "undefined") return;
  const target = document.getElementById("tseny");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.dispatchEvent(
    new CustomEvent(RESERVE_OPEN_EVENT, { detail: { shiftId: shiftId ?? null } }),
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold" style={{ color: "#3D3D3D" }}>
        {label} {required && <span style={{ color: "#FF3D8B" }}>*</span>}
      </span>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white outline-none"
        style={{ border: error ? "2px solid #E64D12" : "2px solid #FFE5D9" }}
      />
      {error && (
        <span className="text-xs font-bold mt-1 block" style={{ color: "#E64D12" }}>
          {error}
        </span>
      )}
    </label>
  );
}

export default Field;