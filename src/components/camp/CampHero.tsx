import Icon from "@/components/ui/icon";
import { SHIFTS, useCountdown } from "./CampData";

interface CampHeroProps {
  scrollToBooking: () => void;
}

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-xl px-2 py-1.5 flex-1 min-w-0">
    <span className="text-2xl font-black text-white tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] text-white/80 font-semibold mt-0.5">{label}</span>
  </div>
);

export default function CampHero({ scrollToBooking }: CampHeroProps) {
  const deadline = new Date("2026-05-15T23:59:00");
  const countdown = useCountdown(deadline);

  return (
    <>
      {/* ── ШАПКА ─────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm" style={{background: "rgba(255,154,86,0.97)"}}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-lg leading-tight" style={{fontFamily:"'Nunito', sans-serif", fontSize:"1.25rem"}}>Рыбка Долли</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <a href="tel:+79881521698" className="flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white transition-colors">
              <Icon name="Phone" size={15} />
              <span className="hidden sm:inline">+7 988 152-16-98</span>
              <span className="sm:hidden">МТС</span>
            </a>
            <a href="tel:+79787120353" className="flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white transition-colors">
              <Icon name="Phone" size={15} />
              <span className="hidden sm:inline">+7 978 712-03-53</span>
              <span className="sm:hidden">Волна</span>
            </a>
            <a
              href="https://vk.com/app6379730_-179759189#l=8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2"
              style={{background:"rgba(255,255,255,0.25)", border:"1px solid rgba(255,255,255,0.5)", color:"white"}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.305.585-1.496c.596-.188 1.361 1.26 2.174 1.815.614.418 1.08.326 1.08.326l2.17-.03s1.135-.071.597-1.002c-.044-.076-.312-.681-1.608-1.927-1.356-1.303-1.173-1.093.459-3.348.997-1.384 1.395-2.228 1.269-2.588-.12-.344-.876-.253-.876-.253l-2.443.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.386 1.077-.901 1.991c-1.085 1.923-1.52 2.025-1.698 1.905-.413-.274-.31-1.112-.31-1.705 0-1.854.273-2.628-.537-2.824-.27-.067-.468-.111-1.158-.118-.885-.009-1.633.003-2.057.218-.282.144-.499.463-.367.48.163.022.532.103.727.378.252.352.243 1.143.243 1.143s.145 2.186-.338 2.453c-.331.181-.786-.188-1.761-1.876-.5-.896-.878-1.888-.878-1.888s-.072-.177-.202-.272c-.157-.115-.376-.151-.376-.151l-2.322.015s-.348.01-.476.166c-.114.139-.009.427-.009.427s1.816 4.424 3.872 6.651c1.885 2.042 4.026 1.907 4.026 1.907h.97z"/></svg>
              ВКонтакте
            </a>
          </div>
        </div>
      </header>

      {/* ── БЛОК 1: HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-16" style={{background:"linear-gradient(180deg, rgba(255,217,61,0.18) 0%, rgba(255,154,86,0.28) 100%)", backgroundColor:"#FFF8F0", overflow:"clip"}}>

        <div className="relative z-10 w-full" style={{display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"stretch"}}>

            {/* ── ЛЕВАЯ КОЛОНКА: фото ── */}
            <div style={{position:"relative", overflow:"hidden", minHeight:"480px"}}>
              <img
                src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/9b990763-8f65-44b0-a17c-bc2d40ad3847.jpg"
                alt="Дети в летнем клубе Рыбка Долли, Керчь"
                style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"contain", objectPosition:"center top", background:"transparent"}}
              />
            </div>

            {/* ── ПРАВАЯ КОЛОНКА: текст ── */}
            <div style={{textAlign:"left", padding:"1rem 2.5rem 2rem 2rem", display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>

              {/* Бейдж — у верха, на уровне фото */}
              <div className="animate-bounce-slow" style={{alignSelf:"flex-start", marginBottom:"1.25rem"}}>
                <div style={{
                  background:"linear-gradient(135deg, #00C9A7 0%, #00A67E 60%, #00DEB8 100%)",
                  boxShadow:"0 6px 20px rgba(0,201,167,0.5), 0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.15) inset",
                  borderRadius:"999px",
                  padding:"0.5rem 1.25rem",
                  display:"inline-flex",
                  flexDirection:"column",
                  gap:"2px",
                }}>
                  <span style={{color:"white", fontWeight:800, fontSize:"0.9rem", letterSpacing:"0.01em"}}>
                    🌊 Керчь · Городской летний клуб · Для детей 7–14 лет
                  </span>
                  <span style={{color:"rgba(255,255,255,0.9)", fontWeight:600, fontSize:"0.78rem", textAlign:"center"}}>
                    ⭐ Работаем с детьми с 2018 года
                  </span>
                </div>
              </div>

              <h1 className="font-black mb-3 leading-tight" style={{fontFamily:"'Nunito', sans-serif", fontSize:"clamp(2.6rem, 5.4vw, 4rem)", lineHeight:1.1, textAlign:"center"}}>
                <span style={{
                  color:"#FF5E1A",
                  textShadow:"0 0 20px rgba(255,94,26,0.5), 0 1px 0 #FF7F3F, 0 2px 0 #E64D12, 0 3px 0 #CC3F0B, 0 4px 0 #B33307, 0 5px 0 #992A05, 0 6px 12px rgba(0,0,0,0.35)",
                  WebkitTextStroke:"1px #FF4500",
                }}>Рыбка </span>
                <span style={{
                  color:"#FFCC00",
                  textShadow:"0 0 20px rgba(255,204,0,0.6), 0 1px 0 #FFE066, 0 2px 0 #E6B800, 0 3px 0 #CC9E00, 0 4px 0 #B38600, 0 5px 0 #996F00, 0 6px 12px rgba(0,0,0,0.35)",
                  WebkitTextStroke:"1px #E6B800",
                }}>Долли</span>
                <br />
                <span style={{
                  background:"linear-gradient(135deg, #FF5E1A 0%, #FF9A00 50%, #FFCC00 100%)",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  backgroundClip:"text",
                  fontSize:"0.7em",
                  letterSpacing:"0.05em",
                  filter:"drop-shadow(0 2px 0 #CC3F0B) drop-shadow(0 4px 0 rgba(153,42,5,0.6)) drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
                  display:"inline-block",
                }}>Лето 2026</span>
              </h1>

              <p className="text-lg font-bold mb-2" style={{fontFamily:"'Nunito', sans-serif", color:"#3D3D3D"}}>
                <span style={{color:"#00C9A7"}}>🌊</span> Море · <span style={{color:"#00C9A7"}}>🎨</span> Творчество · <span style={{color:"#00C9A7"}}>⛺</span> Походы
              </p>

              <p className="text-base mb-5 font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"rgba(61,61,61,0.8)"}}>
                Авторские смены, где дети становятся самостоятельнее,
                находят друзей и возвращаются окрылёнными!
              </p>

            </div>
        </div>

        {/* ── ПОЛОСА «АКЦИЯ» — ДЛИННАЯ, НА ВСЮ ШИРИНУ СТРАНИЦЫ ── */}
        <div style={{padding:"0 2rem 1.5rem 2rem", marginTop:"-3rem"}}>
          <div style={{
            borderRadius:"22px",
            padding:"1rem 1.5rem",
            background:"linear-gradient(160deg, #FFE55A 0%, #FFB830 50%, #FF8C00 100%)",
            boxShadow:"0 8px 0 #CC6A00, 0 12px 30px rgba(255,150,0,0.45), 0 2px 0 rgba(255,255,255,0.35) inset",
            display:"flex",
            alignItems:"center",
            gap:"1.5rem",
            flexWrap:"wrap",
          }}>
            <div style={{display:"flex", alignItems:"center", gap:"0.5rem", flexShrink:0}}>
              <span style={{fontSize:"1.5rem"}}>⏰</span>
              <div style={{display:"flex", flexDirection:"column", lineHeight:1.1}}>
                <span className="font-black text-white" style={{fontFamily:"'Nunito', sans-serif", fontSize:"1rem"}}>АКЦИЯ ДО 15 МАЯ</span>
                <span style={{color:"rgba(255,255,255,0.9)", fontSize:"0.75rem", fontWeight:600}}>Осталось мест: <b>45</b> из 70</span>
              </div>
            </div>

            <span style={{
              background:"#00C9A7",
              boxShadow:"0 3px 0 #008F78, 0 1px 0 rgba(255,255,255,0.3) inset",
              borderRadius:"10px",
              padding:"4px 14px",
              color:"white",
              fontWeight:900,
              fontSize:"1.1rem",
              flexShrink:0,
            }}>−12%</span>

            <div style={{display:"flex", alignItems:"stretch", gap:"0.35rem", flex:"1 1 300px", minWidth:"260px"}}>
              <TimerBlock value={countdown.days} label="ДНЕЙ" />
              <TimerBlock value={countdown.hours} label="ЧАСОВ" />
              <TimerBlock value={countdown.minutes} label="МИНУТ" />
              <TimerBlock value={countdown.seconds} label="СЕКУНД" />
            </div>

            <div style={{display:"flex", gap:"0.75rem", flexShrink:0}}>
              <button onClick={scrollToBooking} style={{
                padding:"0.75rem 1.25rem",
                fontSize:"0.95rem",
                whiteSpace:"nowrap",
                background:"#00C9A7",
                color:"white",
                fontWeight:900,
                borderRadius:"14px",
                border:"none",
                cursor:"pointer",
                boxShadow:"0 4px 0 #008F78, 0 8px 20px rgba(0,201,167,0.4), 0 1px 0 rgba(255,255,255,0.3) inset",
                transition:"transform 0.15s",
              }} onMouseEnter={(e) => e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={(e) => e.currentTarget.style.transform="scale(1)"}>
                🎉 Забронировать −12%
              </button>
              <a
                href="#about"
                className="font-bold rounded-2xl border-2 bg-white/90 transition-all hover:scale-105"
                style={{padding:"0.75rem 1.25rem", fontSize:"0.95rem", color:"#FF9A56", borderColor:"white", display:"flex", alignItems:"center", whiteSpace:"nowrap"}}
              >
                Программа смен
              </a>
            </div>
          </div>
          <p className="text-sm mt-2 font-semibold text-center" style={{color:"rgba(61,61,61,0.6)"}}>Раннее бронирование — оплата онлайн, место гарантировано!</p>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </section>

      {/* ── БЛОК 2: ДОВЕРИЕ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #E8FF6A 0%, #C8F000 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm mb-4 text-white" style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}>
              ⚡ Уже забронировали 25 семей
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Отзывы детей</h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"rgba(61,61,61,0.85)"}}>
              Послушайте, что говорят сами дети — их слова честнее любой рекламы. Горящие глаза, счастливые голоса — вот что остаётся после наших смен.
            </p>
          </div>

          {/* видеоотзывы детей */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/69878726-465d-473a-9d01-5984d7c6234a.mp4", name: "Полина", shift: "4 смена" },
              { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/5aa0afd9-eb3f-40b0-aae7-55eb0abab924.mp4", name: "Амира", shift: "2 смена" },
              { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/8d89b8bb-e70d-47d5-8dbb-f80fb41670b6.mp4", name: "Лиза", shift: "2 смена" },
              { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/11c3322d-2b5b-4e36-8b45-97a6b5f197ec.mp4", name: "Настя", shift: "2 смена" },
            ].map((v, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className="relative rounded-2xl overflow-hidden bg-white shadow-md"
                  style={{border:"3px solid #FFE5D9", boxShadow:"0 10px 25px rgba(255,154,86,0.2)", aspectRatio:"9/16"}}
                >
                  <video
                    src={v.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-black text-base" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>{v.name}</p>
                  <p className="text-sm font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"#FF9A56"}}>{v.shift}</p>
                </div>
              </div>
            ))}
          </div>

          {/* счётчики мест по сменам */}
          <div className="bg-white rounded-3xl p-6 shadow-sm" style={{border:"2px solid #FFE5D9", boxShadow:"0 10px 30px rgba(255,154,86,0.15)"}}>
            <p className="text-center font-black text-lg mb-4" style={{color:"#FF9A56"}}>🔥 Мест становится меньше каждый день!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SHIFTS.map((s) => (
                <div key={s.id} className={`rounded-2xl p-4 ${s.lightColor} border ${s.borderColor}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{s.emoji}</span>
                    <span className="font-bold text-warm-800 text-sm">{s.name}</span>
                  </div>
                  <p className="text-xs text-warm-600 mb-2">{s.dates} · {s.age}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-700">Осталось мест:</span>
                    <span className={`font-black text-lg ${s.spots <= 5 ? "text-red-500" : "text-[#00C9A7]"}`}>{s.spots}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <button onClick={scrollToBooking} className="btn-cta px-8 py-3 font-black">
                Забронировать место сейчас →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}