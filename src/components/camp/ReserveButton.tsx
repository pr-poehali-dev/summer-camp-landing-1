import { ymGoal } from "@/lib/ymGoal";
import { SHIFT_ACCUSATIVE } from "./reserveCTAUtils";

interface ReserveButtonProps {
  defaultShiftId?: number | null;
  onClick: () => void;
}

export default function ReserveButton({ defaultShiftId = null, onClick }: ReserveButtonProps) {
  const ctaShiftName = defaultShiftId ? SHIFT_ACCUSATIVE[defaultShiftId] : null;

  return (
    <div className="mt-3 flex flex-col items-center">
      <button
        onClick={() => {
          ymGoal("reserve_cta_click", { shift_id: defaultShiftId ?? null });
          onClick();
        }}
        className="rainbow-cta group relative font-black text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl text-sm md:text-base transition-transform hover:scale-[1.03] active:scale-[0.98] w-full max-w-md"
        style={{
          background:
            "linear-gradient(90deg, #FF3D8B, #FF9A56, #FFD93D, #00C9A7, #6C5CE7, #FF3D8B)",
          backgroundSize: "300% 100%",
          boxShadow:
            "0 6px 0 rgba(204,63,11,0.4), 0 10px 24px rgba(255,94,26,0.4), 0 2px 0 rgba(255,255,255,0.3) inset",
          letterSpacing: "0.01em",
          lineHeight: 1.2,
        }}
      >
        <span className="inline-flex items-center gap-2 justify-center flex-wrap">
          <span className="text-lg">🎉</span>
          <span>{ctaShiftName ? `Забронировать ${ctaShiftName} — место будет ваше` : "Оплати — и место в смене гарантированно ваше"}</span>
        </span>
      </button>
      <p className="text-xs md:text-sm mt-2 font-semibold text-center" style={{ color: "rgba(61,61,61,0.65)" }}>
        Предоплата брони — всего 1 000 ₽ · остаток оплачиваете в первый день смены
      </p>
    </div>
  );
}
