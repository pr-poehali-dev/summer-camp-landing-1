export default function QuizCallout() {
  return (
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
  );
}
