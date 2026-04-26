import { ymGoal } from "@/lib/ymGoal";

export default function QuizCallout() {
  return (
    <div
      className="relative rounded-3xl p-5 md:p-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FFE55A 0%, #FF9A56 50%, #FF3D8B 100%)",
        boxShadow:
          "0 8px 0 rgba(204,63,11,0.3), 0 14px 30px rgba(255,94,26,0.4), 0 2px 0 rgba(255,255,255,0.3) inset",
      }}
    >
      <div className="absolute -top-6 -right-6 text-9xl opacity-20 select-none">🎯</div>
      <div className="absolute -bottom-8 -left-6 text-8xl opacity-15 select-none">🤔</div>

      <div className="relative z-10 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur rounded-full px-4 py-1.5 text-xs md:text-sm font-black mb-4 uppercase tracking-wider">
          💡 Помощь в выборе
        </div>
        <h3
          className="font-black text-xl md:text-3xl mb-3 leading-tight"
          style={{
            fontFamily: "'Fredoka One', cursive",
            textShadow: "0 2px 0 rgba(0,0,0,0.15), 0 4px 14px rgba(0,0,0,0.18)",
          }}
        >
          😵 Глаза разбегаются?
          <br />
          Не знаешь, какую смену выбрать?
        </h3>
        <p className="text-sm md:text-base font-semibold mb-5 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.95)" }}>
          Пройди короткий квиз — за 2 минуты подберём идеальную смену именно для твоего ребёнка!
        </p>

        <a
          href="https://vk.com/app6379730_-179759189#l=8"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ymGoal("quiz_click")}
          className="inline-flex items-center gap-2 font-black px-6 md:px-8 py-3 md:py-3.5 rounded-2xl transition-transform hover:scale-105 active:scale-[0.98] text-sm md:text-base"
          style={{
            background: "white",
            color: "#FF3D8B",
            boxShadow:
              "0 6px 0 rgba(0,0,0,0.16), 0 10px 22px rgba(0,0,0,0.18), 0 2px 0 rgba(255,255,255,0.5) inset",
          }}
        >
          🎯 Пройти квиз
          <span className="text-lg">→</span>
        </a>
        <p className="text-xs md:text-sm mt-4 font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
          ⭐ Создан профессионалами · Бесплатно · 2 минуты
        </p>
      </div>
    </div>
  );
}