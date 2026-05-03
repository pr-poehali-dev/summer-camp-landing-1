import { SHIFTS } from "./CampData";
import { ymGoal } from "@/lib/ymGoal";

type Shift = (typeof SHIFTS)[number];

interface ProgramShiftBodyProps {
  shift: Shift;
  isTeen: boolean;
  isShort: boolean;
  shiftName: string;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
}

export default function ProgramShiftBody({
  shift,
  isTeen,
  isShort,
  shiftName,
  scrollToBooking,
  setSelectedShift,
}: ProgramShiftBodyProps) {
  return (
    <div className="p-5" style={{background:"#FFF8F0"}}>
      {isTeen && (
        <div className="mb-4 rounded-2xl p-4" style={{background:"linear-gradient(135deg, #6C5CE7 0%, #FF3D8B 100%)", color:"#fff", boxShadow:"0 8px 20px rgba(108,92,231,0.35)"}}>
          <p className="font-black text-sm md:text-base mb-1">⚡ Единственная такая смена в Керчи!</p>
          <p className="text-sm" style={{color:"rgba(255,255,255,0.92)"}}>Программа специально для подростков 10–14 лет: технологии, творчество, реальные навыки. Аналогов в городе нет — мы первые, кто делает это для возраста, который «уже не дети».</p>
        </div>
      )}
      {isShort && (
        <div className="mb-4 rounded-2xl p-4" style={{background:"linear-gradient(135deg, #00C9A7 0%, #0094C6 100%)", color:"#fff", boxShadow:"0 8px 20px rgba(0,201,167,0.35)"}}>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full" style={{background:"#FFD93D", color:"#1A5C4D"}}>5-ДНЕВНЫЙ ФОРМАТ</span>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full" style={{background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)"}}>ФИНАЛ ЛЕТА</span>
          </div>
          <p className="font-black text-base md:text-lg mb-1">💰 Всего 7 000 ₽ — экономия почти в 2 раза!</p>
          <p className="text-sm mb-2" style={{color:"rgba(255,255,255,0.92)"}}>Идеальный финал лета: 5 насыщенных дней, 20+ научных опытов и яркие впечатления перед школой. Подойдёт, если хотите сэкономить, ребёнок уже был в основной смене или нужно «протестировать» наш клуб.</p>
          <div className="flex flex-wrap gap-3 text-xs font-bold">
            <span>✅ 2-разовое питание</span>
            <span>✅ Все материалы и реактивы</span>
            <span>✅ Море каждый день</span>
            <span>✅ Подарки и диплом</span>
          </div>
        </div>
      )}
      {shift.days.length > 0 ? (
        <ol className="space-y-2">
          {shift.days.map((day, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{color:"#3D3D3D"}}>
              <span className="font-black flex-shrink-0" style={{background:"linear-gradient(135deg,#00C9A7,#FFD93D)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>{i + 1}.</span>
              <span>{day}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm italic" style={{color:"rgba(61,61,61,0.7)"}}>Подробная программа скоро появится. Следите за обновлениями в ВКонтакте!</p>
      )}
      {shift.id === 1 && (
        <p className="mt-3 text-[10px] italic leading-snug" style={{color:"rgba(61,61,61,0.55)"}}>
          * блюда могут быть изменены в зависимости от возраста детей и приоритетов центра
        </p>
      )}
      <button
        onClick={() => {
          ymGoal("shift_book_click", { shift_id: shift.id, shift_name: shift.name });
          setSelectedShift(shift.id);
          scrollToBooking();
        }}
        className="mt-4 font-bold px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:scale-105"
        style={isTeen ? {background:"linear-gradient(90deg,#6C5CE7,#FF3D8B,#FFD93D)", boxShadow:"0 6px 18px rgba(108,92,231,0.45)"} : isShort ? {background:"linear-gradient(90deg,#00C9A7,#0094C6,#FFD93D)", boxShadow:"0 6px 18px rgba(0,201,167,0.45)"} : {background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}
      >
        {isTeen ? `🚀 Забронировать ${shiftName} →` : isShort ? `💰 Забронировать ${shiftName} за 7 000 ₽ →` : `Забронировать ${shiftName} →`}
      </button>
    </div>
  );
}
