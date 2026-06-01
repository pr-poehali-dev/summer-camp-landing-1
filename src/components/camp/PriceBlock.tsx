import { SHIFTS } from "./CampData";

interface PriceBlockProps {
  isShort: boolean;
  shortShiftId: number;
  displayPrice: number;
}

export default function PriceBlock({
  isShort,
  shortShiftId,
  displayPrice,
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
      <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
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
        {isShort && (
          <span
            className="font-black px-3 py-1 rounded-full text-sm text-white"
            style={{ background: "linear-gradient(90deg,#00C9A7,#0094C6)" }}
          >
            💰 Короткая смена · 5 дней
          </span>
        )}
      </div>

      <a
        href="https://disk.yandex.ru/d/FQH7Qmhi6x2Rfw"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold mb-4 hover:underline"
        style={{ color: "rgba(61,61,61,0.6)" }}
      >
        📄 Ознакомиться с договором
      </a>

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

      <div
        className="max-w-2xl mx-auto mt-4 rounded-2xl px-4 py-3 flex items-center gap-3 text-left"
        style={{
          background: "linear-gradient(135deg, #00C9A7 0%, #00A67E 55%, #00DEB8 100%)",
          boxShadow: "0 6px 18px rgba(0,201,167,0.35), 0 2px 0 rgba(255,255,255,0.25) inset",
        }}
      >
        <span className="text-2xl md:text-3xl flex-shrink-0">👯</span>
        <div className="min-w-0">
          <div className="font-black text-sm md:text-base text-white">
            Акция «Я с другом»
          </div>
          <div className="text-xs md:text-sm font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>
            Минус <b>500 ₽</b> и вам, и другу при совместной брони. Отметьте галочку при бронировании.
          </div>
        </div>
      </div>

    </div>
  );
}