export default function CampHeroTeenBanner() {
  return (
    <section className="px-4 py-8" style={{background:"#FFF8F0"}}>
      <div className="max-w-5xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:"linear-gradient(135deg, #6C5CE7 0%, #A855F7 45%, #FF3D8B 100%)",
            boxShadow:"0 8px 0 rgba(108,92,231,0.3), 0 14px 36px rgba(108,92,231,0.4), 0 0 0 3px rgba(255,217,61,0.4) inset",
            padding:"1rem 1rem",
          }}
        >
          <div className="absolute -top-6 -right-6 text-7xl opacity-15 select-none">🚀</div>
          <div className="absolute -bottom-5 -left-5 text-6xl opacity-10 select-none">💜</div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <span className="text-4xl md:text-5xl">🌐</span>
              <div className="flex flex-col items-center px-2.5 py-1 rounded-xl" style={{background:"#FFD93D", color:"#3D1E70", boxShadow:"0 3px 0 rgba(204,150,0,0.35)", whiteSpace:"nowrap", lineHeight:1.15}}>
                <span className="font-black text-xs md:text-sm" style={{letterSpacing:"0.3px"}}>
                  Уникальная смена для подростка
                </span>
                <span className="font-semibold text-[9px] md:text-[10px]" style={{opacity:0.85}}>
                  для тех, кому скучно на обычных сменах
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-black text-white text-base md:text-lg leading-snug mb-1.5" style={{fontFamily:"'Nunito', sans-serif", textShadow:"0 2px 6px rgba(0,0,0,0.3)"}}>
                «Поколение АЛЬФА» и «Есть ли жизнь на Марсе?» — смены, созданные специально для возраста «уже не дети, ещё не взрослые»
              </h3>
              <p className="text-xs md:text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>
                Чат-боты, дизайн в Canva и Photoshop, фуд-блогинг, элитная парфюмерия, эксперименты и реальные навыки — вместо «положи телефон».
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href="#program"
                className="inline-flex items-center gap-2 font-black rounded-lg px-3.5 py-2 text-xs md:text-sm transition-transform hover:scale-105"
                style={{
                  background:"linear-gradient(90deg,#FFD93D,#FF9A56)",
                  color:"#3D1E70",
                  boxShadow:"0 4px 0 rgba(204,106,0,0.4), 0 8px 18px rgba(255,154,86,0.4), 0 1px 0 rgba(255,255,255,0.5) inset",
                  whiteSpace:"nowrap",
                }}
              >
                Смотреть смены →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
