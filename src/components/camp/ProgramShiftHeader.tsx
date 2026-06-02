import Icon from "@/components/ui/icon";
import { SHIFTS } from "./CampData";
import { ymGoal, ecommerceDetail } from "@/lib/ymGoal";

const SHIFT_RESERVATION_PRICE = 1000;

export const SHIFT_SPOTS: Record<number, { count: number }> = {
  3: { count: 5 },
  5: { count: 2 },
  6: { count: 7 },
  7: { count: 8 },
};

type Shift = (typeof SHIFTS)[number];

interface ProgramShiftHeaderProps {
  shift: Shift;
  isTeen: boolean;
  isShort: boolean;
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
}

export default function ProgramShiftHeader({
  shift,
  isTeen,
  isShort,
  openAccordion,
  setOpenAccordion,
}: ProgramShiftHeaderProps) {
  return (
    <button
      onClick={() => {
        const isOpening = openAccordion !== shift.id;
        setOpenAccordion(isOpening ? shift.id : null);
        if (isOpening) {
          ymGoal("shift_open", { shift_id: shift.id, shift_name: shift.name });
          ecommerceDetail([
            {
              id: `reserve-shift-${shift.id}`,
              name: `Бронирование смены №${shift.id} — ${shift.name}`,
              price: SHIFT_RESERVATION_PRICE,
              category: "Бронирование смены",
              brand: "Рыбка Долли",
            },
          ]);
        }
      }}
      className={`shift-icon-wrap w-full flex items-center justify-between px-4 py-3 md:px-5 md:py-3.5 text-left font-black hover:brightness-105 transition-all ${shift.id === 3 ? "highlight-shift-header" : ""}`}
      style={shift.id === 1 || shift.id === 4 || shift.id === 2 ? {
        background:"linear-gradient(135deg, #D8D8D8 0%, #C8C8C8 50%, #B8B8B8 100%)",
        color:"#555555",
        boxShadow:"0 2px 0 rgba(255,255,255,0.3) inset, 0 -3px 0 rgba(0,0,0,0.1) inset",
      } : shift.id === 3 ? {
        color:"#FFFFFF",
        boxShadow:"0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.18) inset",
      } : isTeen ? {
        background:"linear-gradient(135deg, #6C5CE7 0%, #A855F7 50%, #FF3D8B 100%)",
        color:"#FFFFFF",
        boxShadow:"0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.18) inset",
      } : isShort ? {
        background:"linear-gradient(135deg, #00DEB8 0%, #00C9A7 50%, #0094C6 100%)",
        color:"#FFFFFF",
        boxShadow:"0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.18) inset",
      } : {
        background:"linear-gradient(135deg, #FFE55A 0%, #FFB830 50%, #FF8C00 100%)",
        color:"#5C2E00",
        boxShadow:"0 2px 0 rgba(255,255,255,0.45) inset, 0 -3px 0 rgba(204,106,0,0.18) inset",
      }}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {shift.iconUrl ? (
          <img
            src={shift.iconUrl}
            alt={`Программа смены «${shift.name}» городского клуба Рыбка Долли в Керчи`}
            loading="lazy"
            decoding="async"
            className="shift-icon w-20 h-20 md:w-24 md:h-24 flex-shrink-0 object-contain"
            style={{filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.35))"}}
          />
        ) : (
          <span className="text-3xl flex-shrink-0" style={{filter:"drop-shadow(0 2px 3px rgba(92,46,0,0.25))"}}>{shift.emoji}</span>
        )}
        <div className="min-w-0 flex-1">
          {isTeen && (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow" style={{background:"#FFD93D", color:"#3D1E70", letterSpacing:"0.5px"}}>
                🔥 ДЛЯ ПОДРОСТКОВ
              </span>
            </div>
          )}
          {isShort && (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow animate-rainbow-pulse" style={{background:"#FFD93D", color:"#1A5C4D", letterSpacing:"0.5px"}}>
                ⚡ ФИНАЛ ЛЕТА · 5 ДНЕЙ
              </span>
              <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow" style={{background:"#fff", color:"#1A5C4D"}}>
                💰 ВСЕГО 7 000 ₽
              </span>
            </div>
          )}
          {shift.id === 3 && (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow" style={{background:"#FFD93D", color:"#7B2D00", letterSpacing:"0.5px"}}>
                🔥 БЛИЖАЙШАЯ СМЕНА
              </span>
              <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow" style={{background:"#fff", color:"#FF3D8B"}}>
                ОСТАЛОСЬ 5 МЕСТ
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg md:text-xl" style={(isTeen || isShort || shift.id === 3) ? {textShadow:"0 1px 2px rgba(0,0,0,0.3)"} : {textShadow:"0 1px 0 rgba(255,255,255,0.5)"}}>Смена {shift.id}: «{shift.name}»</div>
          </div>
          <div className="text-sm font-semibold" style={(isTeen || isShort || shift.id === 3) ? {color:"rgba(255,255,255,0.95)"} : {color:"rgba(92,46,0,0.75)"}}>{shift.dates} · {shift.age}{isShort ? " · 7 000 ₽" : ""}</div>
        </div>
      </div>
      <Icon name={openAccordion === shift.id ? "ChevronUp" : "ChevronDown"} size={22} />
    </button>
  );
}