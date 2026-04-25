import { useCountdown, PRICE_FULL, PRICE_SALE, SHIFTS } from "./CampData";
import ReserveCTA from "./ReserveCTA";

interface CampBookingProps {
  bookingRef: React.RefObject<HTMLDivElement>;
  selectedShift?: number | null;
}

const SHORT_SHIFT_ID = 7;
const SHORT_SHIFT_PRICE = 7000;

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-2xl px-4 py-3 min-w-[70px]">
    <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs text-white/80 font-semibold mt-1">{label}</span>
  </div>
);

export default function CampBooking({ bookingRef, selectedShift }: CampBookingProps) {
  const deadline = new Date("2026-05-15T23:59:00");
  const countdown = useCountdown(deadline);
  const afterDiscount = countdown.days > 0 || countdown.hours > 0;

  const isShort = selectedShift === SHORT_SHIFT_ID;
  const shortShift = SHIFTS.find((s) => s.id === SHORT_SHIFT_ID);
  const displayPrice = isShort ? SHORT_SHIFT_PRICE : (afterDiscount ? PRICE_SALE : PRICE_FULL);
  const oldPrice = isShort ? PRICE_SALE : PRICE_FULL;

  return (
    <>
      {/* ── ФИНАЛЬНЫЙ БЛОК: ЦЕНА + CTA + КВИЗ ─────────────────────────────────── */}
      <section
        ref={bookingRef}
        className="py-16 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)" }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            {isShort && shortShift && (
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs md:text-sm font-black text-white" style={{background:"linear-gradient(90deg,#00C9A7,#0094C6,#FFD93D)", boxShadow:"0 6px 18px rgba(0,201,167,0.45)"}}>
                ⚡ Выбрана смена «{shortShift.name}» · 5 дней
              </div>
            )}
            <h2
              className="text-3xl md:text-4xl font-black mb-2"
              style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}
            >
              💰 Стоимость смены ({isShort ? "5 дней" : "10 дней"})
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
              <span className="line-through text-2xl" style={{ color: "rgba(61,61,61,0.5)" }}>
                {oldPrice.toLocaleString()} ₽
              </span>
              <span
                className="font-black text-4xl px-4 py-1 rounded-xl"
                style={isShort ? {
                  color: "#00A67E",
                  border: "4px solid #FFD93D",
                  textShadow: "0 2px 8px rgba(0,201,167,0.3)",
                } : {
                  color: "#FF9A56",
                  border: "4px solid #FFD93D",
                  textShadow: "0 2px 8px rgba(255,154,86,0.3)",
                }}
              >
                {displayPrice.toLocaleString()} ₽
              </span>
              {isShort ? (
                <span
                  className="font-black px-3 py-1 rounded-full text-sm text-white"
                  style={{ background: "linear-gradient(90deg,#00C9A7,#0094C6)" }}
                >
                  💰 Экономия почти в 2 раза
                </span>
              ) : afterDiscount && (
                <span
                  className="font-black px-3 py-1 rounded-full text-sm text-white"
                  style={{ background: "#FF9A56" }}
                >
                  −12% до 15 мая
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto text-left mb-2">
              {[
                "✅ 2-разовое питание",
                "✅ Все мастер-классы",
                "✅ Поездки на море",
                "✅ Походы с костром",
                "✅ Фото и видео каждый день",
                "✅ Доступ в родительский чат",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl px-3 py-2 text-sm font-semibold bg-white"
                  style={{ border: "2px solid #FFE5D9", color: "#3D3D3D" }}
                >
                  {item}
                </div>
              ))}
            </div>

            {afterDiscount && (
              <div className="mt-6 mb-4">
                <p className="font-bold mb-3" style={{ color: "#FF9A56" }}>
                  ⏰ До конца акции осталось:
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <TimerBlock value={countdown.days} label="ДНЕЙ" />
                  <span className="text-warm-700 text-2xl font-bold">:</span>
                  <TimerBlock value={countdown.hours} label="ЧАСОВ" />
                  <span className="text-warm-700 text-2xl font-bold">:</span>
                  <TimerBlock value={countdown.minutes} label="МИНУТ" />
                </div>
              </div>
            )}
          </div>

          {/* CTA: крупная переливающаяся кнопка */}
          <div className="mb-8">
            <ReserveCTA />
          </div>

          {/* Блок «Глаза разбегаются» — большой и яркий */}
          <div
            className="relative rounded-3xl p-6 md:p-10 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #FFE55A 0%, #FF9A56 50%, #FF3D8B 100%)",
              boxShadow:
                "0 12px 0 rgba(204,63,11,0.35), 0 20px 40px rgba(255,94,26,0.45), 0 2px 0 rgba(255,255,255,0.3) inset",
            }}
          >
            <div className="absolute -top-6 -right-6 text-9xl opacity-20 select-none">🎯</div>
            <div className="absolute -bottom-8 -left-6 text-8xl opacity-15 select-none">🤔</div>

            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur rounded-full px-4 py-1.5 text-xs md:text-sm font-black mb-4 uppercase tracking-wider">
                💡 Помощь в выборе
              </div>
              <h3
                className="font-black text-2xl md:text-4xl mb-3 leading-tight"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  textShadow: "0 3px 0 rgba(0,0,0,0.15), 0 6px 20px rgba(0,0,0,0.2)",
                }}
              >
                😵 Глаза разбегаются?
                <br />
                Не знаешь, какую смену выбрать?
              </h3>
              <p className="text-base md:text-lg font-semibold mb-6 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.95)" }}>
                Пройди короткий квиз — за 2 минуты подберём идеальную смену именно для твоего ребёнка!
              </p>

              <a
                href="https://vk.com/app6379730_-179759189#l=8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-black px-7 md:px-10 py-4 md:py-5 rounded-2xl transition-transform hover:scale-105 active:scale-[0.98] text-base md:text-xl"
                style={{
                  background: "white",
                  color: "#FF3D8B",
                  boxShadow:
                    "0 8px 0 rgba(0,0,0,0.18), 0 12px 30px rgba(0,0,0,0.2), 0 2px 0 rgba(255,255,255,0.5) inset",
                }}
              >
                🎯 Пройти квиз
                <span className="text-xl">→</span>
              </a>
              <p className="text-xs md:text-sm mt-4 font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                ⭐ Создан профессионалами · Бесплатно · 2 минуты
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ФУТЕР ─────────────────────────────────────────────────────────────── */}
      <footer className="text-white py-8 px-4" style={{background:"linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)"}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-black text-xl" style={{fontFamily:"'Fredoka One',cursive"}}>Рыбка Долли</span>
          </div>
          <p className="text-sm mb-3" style={{color:"rgba(255,255,255,0.6)"}}>г. Керчь, ул. Циолковского, 12</p>
          <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
            <a href="tel:+79881521698" className="font-semibold" style={{color:"#FFD93D"}}>+7 988 152-16-98 (МТС)</a>
            <a href="tel:+79787120353" className="font-semibold" style={{color:"#FFD93D"}}>+7 978 712-03-53 (Волна)</a>
          </div>
          <a
            href="https://vk.com/app6379730_-179759189#l=8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm transition-all mb-4 hover:scale-105"
            style={{background:"rgba(255,154,86,0.2)", border:"1px solid rgba(255,154,86,0.4)", color:"white"}}
          >
            ВКонтакте
          </a>
          <p className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>
            © 2026 Летний клуб «Рыбка Долли» · <a href="/oferta" className="underline">Публичная оферта</a>
          </p>
        </div>
      </footer>
    </>
  );
}