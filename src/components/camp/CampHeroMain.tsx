import CampHeroPromo from "./CampHeroPromo";

interface CampHeroMainProps {
  scrollToBooking: () => void;
}

export default function CampHeroMain({ scrollToBooking }: CampHeroMainProps) {
  return (
    <section className="relative pt-16 pb-12 hero-section" style={{background:"linear-gradient(180deg, rgba(255,217,61,0.18) 0%, rgba(255,154,86,0.28) 100%)", backgroundColor:"#FFF8F0", overflow:"clip"}}>

      <div className="relative z-10 w-full hero-grid">

          {/* ── ЛЕВАЯ КОЛОНКА: фото на всю высоту правой колонки ── */}
          <div className="hero-photo" style={{position:"relative", overflow:"hidden", borderRadius:"24px", boxShadow:"0 12px 30px rgba(255,154,86,0.25), 0 2px 0 rgba(255,255,255,0.4) inset"}}>
            <img
              src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/9b990763-8f65-44b0-a17c-bc2d40ad3847.jpg"
              alt="Дети на море в летнем клубе Рыбка Долли Керчь"
              loading="eager"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({ fetchpriority: "high" } as any)}
              decoding="async"
              style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", background:"transparent"}}
            />
          </div>

          {/* ── ПРАВАЯ КОЛОНКА: текст + блок акция (выровнено по нижнему краю с фото) ── */}
          <div className="hero-text-col" style={{textAlign:"left", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"1rem"}}>

            <div style={{display:"flex", flexDirection:"column"}}>
            {/* Бейдж — у верха */}
            <div className="animate-bounce-slow" style={{alignSelf:"flex-start", marginBottom:"0.75rem"}}>
              <div style={{
                background:"linear-gradient(135deg, #00C9A7 0%, #00A67E 60%, #00DEB8 100%)",
                boxShadow:"0 6px 20px rgba(0,201,167,0.5), 0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.15) inset",
                borderRadius:"999px",
                padding:"0.5rem 1.25rem",
                display:"inline-flex",
                flexDirection:"column",
                gap:"2px",
              }}>
                <span style={{color:"white", fontWeight:800, fontSize:"0.9rem", letterSpacing:"0.01em", textAlign:"center"}}>
                  🌊 Летний городской клуб в Керчи, ул. Циолковского, 12
                </span>
                <span style={{color:"rgba(255,255,255,0.95)", fontWeight:700, fontSize:"0.78rem", textAlign:"center"}}>
                  ⭐ Для детей 7–14 лет
                </span>
                <span className="animate-rainbow-pulse" style={{display:"block", marginTop:"4px", background:"#FFF200", color:"#C81E5B", fontWeight:900, fontSize:"0.95rem", textAlign:"center", borderRadius:"999px", padding:"3px 10px", letterSpacing:"0.01em", textShadow:"0 1px 0 rgba(255,255,255,0.5)", boxShadow:"0 0 14px rgba(255,242,0,0.8)"}}>
                  🔥 В ближайшей смене осталось всего 2 места!
                </span>
              </div>
            </div>

            <h1 className="font-black mb-2 leading-tight" style={{fontFamily:"'Koyon', 'Nunito', sans-serif", fontSize:"clamp(2.6rem, 5.7vw, 4.2rem)", lineHeight:1.15, textAlign:"center", letterSpacing:"0.04em", wordSpacing:"0.12em", WebkitTextStroke:"3px #5A1A00", paintOrder:"stroke fill", marginLeft:"-1rem", marginRight:"-1rem", width:"calc(100% + 2rem)"}}>
              <div style={{whiteSpace:"nowrap"}}>
                <span style={{
                  color:"#FF5E1A",
                  textShadow:"0 1px 0 #FF7F3F, 0 2px 0 #E64D12, 0 3px 0 #CC3F0B, 0 4px 0 #B33307, 0 5px 0 #992A05, 0 6px 12px rgba(0,0,0,0.45)",
                }}>Рыбка </span>
                <span style={{
                  color:"#FFCC00",
                  textShadow:"0 1px 0 #FFE066, 0 2px 0 #E6B800, 0 3px 0 #CC9E00, 0 4px 0 #B38600, 0 5px 0 #996F00, 0 6px 12px rgba(0,0,0,0.45)",
                }}>Долли</span>
              </div>
              <div style={{
                whiteSpace:"nowrap",
                fontSize:"0.62em",
                letterSpacing:"0.08em",
                marginTop:"0.15em",
                color:"#FF9A00",
                textShadow:"0 1px 0 #FFB840, 0 2px 0 #E68A00, 0 3px 0 #CC7A00, 0 4px 0 #B36B00, 0 5px 0 #995C00, 0 6px 12px rgba(0,0,0,0.45)",
              }}>Лето 2026</div>
            </h1>

            <p className="text-base font-black mb-1" style={{fontFamily:"'Nunito', sans-serif", color:"#3D3D3D", lineHeight:1.35}}>
              <span style={{color:"#FF5E1A"}}>📵</span> 10 дней без гаджетов: <span style={{color:"#00C9A7"}}>🌊</span> море, <span style={{color:"#00C9A7"}}>🎨</span> творчество, <span style={{color:"#00C9A7"}}>⛺</span> походы и <span style={{color:"#00C9A7"}}>🤝</span> новые друзья
            </p>

            <p className="text-sm mb-1 font-black" style={{fontFamily:"'Nunito', sans-serif", color:"#C81E5B"}}>
              ⏳ Запись уже идёт. Места заканчиваются
            </p>

            <p className="text-sm mb-0 font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"rgba(61,61,61,0.8)"}}>
              Авторские смены, где дети становятся самостоятельнее,
              находят друзей и возвращаются окрылёнными!
            </p>
            </div>

            {/* ── БЛОК «АКЦИЯ» — компактный, под текстом, выровнен по низу с фото ── */}
            <CampHeroPromo scrollToBooking={scrollToBooking} />

          </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0"/>
        </svg>
      </div>
    </section>
  );
}