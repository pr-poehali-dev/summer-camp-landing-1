import { ymGoal } from "@/lib/ymGoal";

interface CampTeamHelpersProps {
  onApplyOpen: () => void;
}

export default function CampTeamHelpers({ onApplyOpen }: CampTeamHelpersProps) {
  return (
    <>
      {/* КАРТОЧКА БЕЗ ФОТО — ПОМОЩНИКИ */}
      <article
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #6C5CE7 0%, #A855F7 50%, #FF3D8B 100%)",
          boxShadow: "0 14px 36px rgba(108,92,231,0.35)",
        }}
      >
        <div className="absolute -top-8 -right-6 text-9xl opacity-15 select-none">🎉</div>
        <div className="absolute -bottom-8 -left-6 text-8xl opacity-10 select-none">🤝</div>
        <div className="relative z-10 p-6 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div
              className="px-3 py-1.5 rounded-full text-xs font-black"
              style={{ background: "#FFD93D", color: "#3D1E70" }}
            >
              ✨ А ЕЩЁ В НАШЕЙ КОМАНДЕ…
            </div>
          </div>
          <h3
            className="text-2xl md:text-3xl font-black mb-2"
            style={{ fontFamily: "'Baloo 2', cursive", textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
          >
            Вожатые-помощники — старшие друзья для детей
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-5 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.92)" }}>
            <p>
              В каждой смене с нами работают молодые вожатые 17–20 лет — студенты, которые обожают работу с детьми и
              приходят к нам снова и снова.
            </p>
            <p>
              Они не просто помощники — они становятся для детей старшими друзьями и примером для подражания.
            </p>
            <p>
              С ними легко найти общий язык: они говорят на одном языке с детьми, понимают их интересы, знают
              актуальные мемы и тренды. При этом достаточно взрослые, чтобы быть авторитетом.
            </p>
            <p>
              Дети особенно тянутся к молодым вожатым: с ними можно поговорить по душам, поделиться секретами,
              спросить совета. Они создают атмосферу доверия и дружбы.
            </p>
          </div>
          <div
            className="mt-6 rounded-2xl p-4 md:p-5 font-semibold text-[15px]"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px dashed rgba(255,217,61,0.6)" }}
          >
            Наша команда постоянно обновляется, но принцип остаётся неизменным: только те, кто искренне любит детей и
            готов отдавать им энергию и внимание.
          </div>
        </div>
      </article>

      {/* CTA: записаться в команду */}
      <div
        className="mt-8 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:justify-between"
        style={{
          background: "linear-gradient(135deg, #FFF8F0 0%, #FFE5D9 100%)",
          border: "2px dashed #FF9A56",
        }}
      >
        <div>
          <h3 className="font-black text-xl md:text-2xl mb-1" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
            🌟 Хочешь стать частью нашей команды?
          </h3>
          <p className="text-sm md:text-base" style={{ color: "rgba(61,61,61,0.75)" }}>
            Если тебе 17–20 лет, ты любишь детей и горишь идеями — оставь заявку, мы свяжемся!
          </p>
        </div>
        <button
          onClick={() => { ymGoal("team_apply_open"); onApplyOpen(); }}
          className="font-black rounded-2xl px-6 py-3.5 text-base transition-transform hover:scale-105 whitespace-nowrap"
          style={{
            background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
            color: "white",
            boxShadow: "0 6px 0 rgba(255,61,139,0.35), 0 10px 24px rgba(255,154,86,0.45)",
          }}
        >
          Записаться в команду →
        </button>
      </div>
    </>
  );
}
