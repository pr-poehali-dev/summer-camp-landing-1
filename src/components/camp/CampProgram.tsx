import Icon from "@/components/ui/icon";
import { SHIFTS } from "./CampData";

interface CampProgramProps {
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
}

export default function CampProgram({
  openAccordion,
  setOpenAccordion,
  scrollToBooking,
  setSelectedShift,
}: CampProgramProps) {
  return (
    <section id="programmy" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Программа смен детского лагеря в Керчи 2026 (10 дней)</h2>
          <p style={{color:"rgba(61,61,61,0.7)"}}>Городской лагерь дневного пребывания: каждая смена — отдельная история с уникальной темой!</p>
        </div>
        <div className="space-y-4">
          {SHIFTS.map((shift) => {
            const isTeen = shift.id === 4 || shift.id === 5;
            const isShort = shift.id === 7;
            const shiftAccusative: Record<number, string> = {
              1: "«Сундук со сказками»",
              2: "«Вкусные открытия»",
              3: "«Мульти-драйв»",
              4: "«Поколение АЛЬФА»",
              5: "«Тинейджер-2026»",
              6: "«Робинзоны»",
              7: "«Лабораторию чудес»",
            };
            const shiftName = shiftAccusative[shift.id] ?? `«${shift.name}»`;
            return (
            <div key={shift.id} className={`rounded-3xl overflow-hidden transition-transform hover:-translate-y-0.5 relative ${isShort ? "animate-short-shift" : ""}`} style={isTeen ? {border:"3px solid #6C5CE7", boxShadow:"0 14px 0 rgba(108,92,231,0.25), 0 18px 50px rgba(108,92,231,0.45), 0 0 0 4px rgba(255,217,61,0.35), 0 2px 0 rgba(255,255,255,0.5) inset"} : isShort ? {border:"3px solid #00C9A7"} : {border:"3px solid #FFE5D9", boxShadow:"0 14px 0 rgba(204,106,0,0.18), 0 18px 40px rgba(255,154,86,0.3), 0 2px 0 rgba(255,255,255,0.5) inset"}}>
              <button
                onClick={() => setOpenAccordion(openAccordion === shift.id ? null : shift.id)}
                className="shift-icon-wrap w-full flex items-center justify-between px-4 py-3 md:px-5 md:py-3.5 text-left font-black hover:brightness-105 transition-all"
                style={isTeen ? {
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
                      alt={`Программа смены «${shift.name}» детского лагеря Рыбка Долли в Керчи`}
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
                    <div className="text-lg md:text-xl" style={(isTeen || isShort) ? {textShadow:"0 1px 2px rgba(0,0,0,0.3)"} : {textShadow:"0 1px 0 rgba(255,255,255,0.5)"}}>Смена {shift.id}: «{shift.name}»</div>
                    <div className="text-sm font-semibold" style={(isTeen || isShort) ? {color:"rgba(255,255,255,0.9)"} : {color:"rgba(92,46,0,0.75)"}}>{shift.dates} · {shift.age} · Осталось {shift.spots} мест{isShort ? " · 7 000 ₽" : ""}</div>
                  </div>
                </div>
                <Icon name={openAccordion === shift.id ? "ChevronUp" : "ChevronDown"} size={22} />
              </button>
              {openAccordion === shift.id && (
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
                  <button
                    onClick={() => { setSelectedShift(shift.id); scrollToBooking(); }}
                    className="mt-4 font-bold px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:scale-105"
                    style={isTeen ? {background:"linear-gradient(90deg,#6C5CE7,#FF3D8B,#FFD93D)", boxShadow:"0 6px 18px rgba(108,92,231,0.45)"} : isShort ? {background:"linear-gradient(90deg,#00C9A7,#0094C6,#FFD93D)", boxShadow:"0 6px 18px rgba(0,201,167,0.45)"} : {background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}
                  >
                    {isTeen ? `🚀 Забронировать ${shiftName} →` : isShort ? `💰 Забронировать ${shiftName} за 7 000 ₽ →` : `Забронировать ${shiftName} →`}
                  </button>
                </div>
              )}
            </div>
            );
          })}
        </div>
        <p className="text-center text-warm-600 mt-6 text-sm">И это только малая часть активностей! Скорее бронируйте, пока места не закончились!</p>
      </div>
    </section>
  );
}