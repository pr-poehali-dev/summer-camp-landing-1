import { SHIFTS } from "./CampData";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

interface PriceBlockProps {
  isShort: boolean;
  shortShiftId: number;
  displayPrice: number;
  oldPrice: number;
  afterDiscount: boolean;
  countdown: Countdown;
}

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-2xl px-4 py-3 min-w-[70px]">
    <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs text-white/80 font-semibold mt-1">{label}</span>
  </div>
);

export default function PriceBlock({
  isShort,
  shortShiftId,
  displayPrice,
  oldPrice,
  afterDiscount,
  countdown,
}: PriceBlockProps) {
  const shortShift = SHIFTS.find((s) => s.id === shortShiftId);

  return (
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

      {/* Подзаголовок про скидку для жителей Керчи */}
      {!isShort && afterDiscount && (
        <div
          className="inline-block mb-4 px-5 py-3 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #FF3D8B 0%, #FF9A56 50%, #FFD93D 100%)",
            boxShadow: "0 6px 18px rgba(255,61,139,0.4), 0 2px 0 rgba(255,255,255,0.4) inset",
          }}
        >
          <p
            className="font-black text-base md:text-lg text-white"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.35)", fontFamily: "'Baloo 2', cursive" }}
          >
            🏖️ Для жителей Керчи действует скидка <span style={{ color: "#FFFFFF", background: "rgba(255,255,255,0.25)", padding: "0 8px", borderRadius: "8px" }}>−26%</span>
          </p>
          <p className="text-sm md:text-base font-bold text-white mt-1" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            Стоимость со скидкой <b>11 000 ₽</b> · только до 15 мая
          </p>
        </div>
      )}

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
            −26% для керчан до 15 мая
          </span>
        )}
      </div>

      {/* Плашка: цены после 15 мая */}
      {!isShort && afterDiscount && (
        <div
          className="max-w-2xl mx-auto mb-5 rounded-2xl px-4 py-3"
          style={{
            background: "#FFF8F0",
            border: "2px dashed #FF9A56",
          }}
        >
          <p className="text-sm md:text-base font-bold mb-2" style={{ color: "#3D3D3D" }}>
            ⏳ С 15 мая цены вырастут:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm">
            <span
              className="font-black px-3 py-1.5 rounded-xl"
              style={{
                background: "linear-gradient(90deg, #00C9A7, #0094C6)",
                color: "white",
                boxShadow: "0 3px 0 rgba(0,148,198,0.35)",
              }}
            >
              🏖️ Жители Керчи · 12 500 ₽
            </span>
            <span
              className="font-black px-3 py-1.5 rounded-xl"
              style={{
                background: "linear-gradient(90deg, #FF9A56, #FF3D8B)",
                color: "white",
                boxShadow: "0 3px 0 rgba(255,61,139,0.35)",
              }}
            >
              🌍 Все остальные · 15 000 ₽
            </span>
          </div>
        </div>
      )}

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
  );
}