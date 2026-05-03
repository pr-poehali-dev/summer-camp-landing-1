export default function SectionSchedule() {
  return (
    <section className="py-14 px-4" style={{background:"linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)"}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold px-4 py-1.5 rounded-full text-xs mb-3 text-white" style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}>
            ⏰ РАСПИСАНИЕ
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-2" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Как проходит день в клубе?</h2>
          <p style={{color:"rgba(61,61,61,0.7)"}}>Каждая минута продумана — дети под контролем и в движении!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { time: "10:00", emoji: "👋", title: "Сбор в клубе", desc: "Общение, зарядка настроения", gradient: "linear-gradient(135deg,#FFE55A,#FFB830)" },
            { time: "11:00", emoji: "🎨", title: "Тема смены", desc: "МК, презентации, активности", gradient: "linear-gradient(135deg,#FF9A56,#FF5E1A)" },
            { time: "12:30", emoji: "💬", title: "Свободное общение", desc: "Дружба, игры, отдых", gradient: "linear-gradient(135deg,#00DEB8,#00A67E)" },
            { time: "13:30", emoji: "🍜", title: "Вкусный обед", desc: "Домашняя горячая еда", gradient: "linear-gradient(135deg,#FFB830,#FF8C00)" },
            { time: "14:00", emoji: "🌊", title: "Приключения!", desc: "Море, прогулка, поход с костром", gradient: "linear-gradient(135deg,#00C9A7,#0094C6)" },
            { time: "16:30", emoji: "🍎", title: "Полдник", desc: "Перекус и заряд бодрости", gradient: "linear-gradient(135deg,#FF6B9D,#FF3D8B)" },
            { time: "17:00", emoji: "⭐", title: "Итоги дня", desc: "Номинации, доллики, настолки", gradient: "linear-gradient(135deg,#6C5CE7,#A855F7)" },
            { time: "18:00", emoji: "🏠", title: "Идём домой", desc: "Но на этом не всё!", gradient: "linear-gradient(135deg,#FF9A56,#FFCC00)" },
            { time: "19:30", emoji: "📲", title: "Задание в чат", desc: "Борьба за доллики!", gradient: "linear-gradient(135deg,#3D3D3D,#6C5CE7)" },
          ].map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-3 md:p-4 bg-white transition-transform hover:scale-[1.03] hover:-translate-y-0.5"
              style={{
                border: "2px solid #FFE5D9",
                boxShadow: "0 6px 16px rgba(255,154,86,0.12)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: item.gradient, boxShadow: "0 3px 0 rgba(0,0,0,0.1)" }}
                >
                  {item.emoji}
                </div>
                <span
                  className="font-black tabular-nums text-sm md:text-base px-2 py-0.5 rounded-lg text-white"
                  style={{ background: item.gradient }}
                >
                  {item.time}
                </span>
              </div>
              <div className="font-black text-sm md:text-base leading-tight mb-0.5" style={{ color: "#3D3D3D" }}>
                {item.title}
              </div>
              <p className="text-xs md:text-[13px] leading-snug" style={{ color: "rgba(61,61,61,0.65)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 font-bold text-sm text-center" style={{ border: "2px solid #FFE5D9", color: "#3D3D3D", boxShadow: "0 6px 16px rgba(255,154,86,0.15)" }}>
            <span className="text-lg">🕙</span>
            Пребывание с 10:00 до 18:00 · 8 часов насыщенной программы
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm text-center text-white" style={{ background: "linear-gradient(90deg,#FF9A56,#FF5E1A)", boxShadow: "0 6px 16px rgba(255,94,26,0.25)" }}>
            <span className="text-lg">🌅</span>
            Возможно раннее посещение с 8:00 — доплата 3000 ₽ (с завтраком)
          </div>
        </div>
      </div>
    </section>
  );
}