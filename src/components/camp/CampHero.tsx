import Icon from "@/components/ui/icon";
import { SHIFTS, useCountdown } from "./CampData";
import CampFAQ from "./CampFAQ";

interface CampHeroProps {
  scrollToBooking: () => void;
}

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-lg px-1.5 py-1 flex-1 min-w-0">
    <span className="text-xl font-black text-white tabular-nums leading-none" style={{textShadow:"0 1px 0 rgba(204,106,0,0.85), 0 2px 0 rgba(153,79,0,0.6), 0 3px 6px rgba(92,46,0,0.45)"}}>
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[9px] font-bold mt-0.5" style={{color:"#fff", textShadow:"0 1px 2px rgba(92,46,0,0.5)"}}>{label}</span>
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
      <section className="relative pt-16 pb-12" style={{background:"linear-gradient(180deg, rgba(255,217,61,0.18) 0%, rgba(255,154,86,0.28) 100%)", backgroundColor:"#FFF8F0", overflow:"clip"}}>

        <div className="relative z-10 w-full" style={{display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"stretch", padding:"0 1.25rem", gap:"1rem"}}>

            {/* ── ЛЕВАЯ КОЛОНКА: фото на всю высоту правой колонки ── */}
            <div style={{position:"relative", overflow:"hidden", minHeight:"560px", borderRadius:"24px", boxShadow:"0 12px 30px rgba(255,154,86,0.25), 0 2px 0 rgba(255,255,255,0.4) inset"}}>
              <img
                src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/9b990763-8f65-44b0-a17c-bc2d40ad3847.jpg"
                alt="Дети в летнем клубе Рыбка Долли, Керчь"
                style={{position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", background:"transparent"}}
              />
            </div>

            {/* ── ПРАВАЯ КОЛОНКА: текст + блок акция (выровнено по нижнему краю с фото) ── */}
            <div style={{textAlign:"left", padding:"0.75rem 2rem 1rem 2rem", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"1rem"}}>

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
                  <span style={{color:"white", fontWeight:800, fontSize:"0.9rem", letterSpacing:"0.01em"}}>
                    🌊 Керчь · Городской летний клуб · Для детей 7–14 лет
                  </span>
                  <span style={{color:"rgba(255,255,255,0.9)", fontWeight:600, fontSize:"0.78rem", textAlign:"center"}}>
                    ⭐ Работаем с детьми с 2018 года
                  </span>
                </div>
              </div>

              <h1 className="font-black mb-2 leading-tight" style={{fontFamily:"'Nunito', sans-serif", fontSize:"clamp(2.2rem, 4.6vw, 3.4rem)", lineHeight:1.1, textAlign:"center"}}>
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

              <p className="text-base font-bold mb-1" style={{fontFamily:"'Nunito', sans-serif", color:"#3D3D3D"}}>
                <span style={{color:"#00C9A7"}}>🌊</span> Море · <span style={{color:"#00C9A7"}}>🎨</span> Творчество · <span style={{color:"#00C9A7"}}>⛺</span> Походы
              </p>

              <p className="text-sm mb-0 font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"rgba(61,61,61,0.8)"}}>
                Авторские смены, где дети становятся самостоятельнее,
                находят друзей и возвращаются окрылёнными!
              </p>
              </div>

              {/* ── БЛОК «АКЦИЯ» — компактный, под текстом, выровнен по низу с фото ── */}
              <div style={{
                borderRadius:"20px",
                padding:"0.9rem 1.1rem",
                background:"linear-gradient(160deg, #FFE55A 0%, #FFB830 50%, #FF8C00 100%)",
                boxShadow:"0 6px 0 #CC6A00, 0 10px 24px rgba(255,150,0,0.4), 0 2px 0 rgba(255,255,255,0.35) inset",
                display:"flex",
                flexDirection:"column",
                gap:"0.7rem",
              }}>
                <div style={{display:"flex", alignItems:"center", gap:"0.6rem", justifyContent:"space-between"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"0.4rem"}}>
                    <span style={{fontSize:"1.25rem"}}>⏰</span>
                    <div style={{display:"flex", flexDirection:"column", lineHeight:1.1}}>
                      <span className="font-black text-white" style={{fontFamily:"'Nunito', sans-serif", fontSize:"0.9rem", textShadow:"0 1px 0 rgba(204,106,0,0.85), 0 2px 0 rgba(153,79,0,0.6), 0 3px 6px rgba(92,46,0,0.45)"}}>АКЦИЯ ДО 15 МАЯ</span>
                      <span style={{color:"#fff", fontSize:"0.7rem", fontWeight:700, textShadow:"0 1px 0 rgba(204,106,0,0.7), 0 2px 4px rgba(92,46,0,0.4)"}}>Осталось мест: <b>45</b> из 70</span>
                    </div>
                  </div>
                  <span style={{
                    background:"#00C9A7",
                    boxShadow:"0 3px 0 #008F78, 0 1px 0 rgba(255,255,255,0.3) inset",
                    borderRadius:"9px",
                    padding:"3px 11px",
                    color:"white",
                    fontWeight:900,
                    fontSize:"0.95rem",
                    flexShrink:0,
                    textShadow:"0 1px 0 rgba(0,143,120,0.9), 0 2px 4px rgba(0,77,64,0.5)",
                  }}>−12%</span>
                </div>

                <div style={{display:"flex", alignItems:"stretch", gap:"0.3rem"}}>
                  <TimerBlock value={countdown.days} label="ДНЕЙ" />
                  <TimerBlock value={countdown.hours} label="ЧАСОВ" />
                  <TimerBlock value={countdown.minutes} label="МИНУТ" />
                  <TimerBlock value={countdown.seconds} label="СЕКУНД" />
                </div>

                <div style={{display:"flex", gap:"0.5rem"}}>
                  <button onClick={scrollToBooking} className="rainbow-cta" style={{
                    flex:"1 1 auto",
                    padding:"0.65rem 1rem",
                    fontSize:"0.9rem",
                    whiteSpace:"nowrap",
                    color:"white",
                    fontWeight:900,
                    borderRadius:"12px",
                    border:"none",
                    cursor:"pointer",
                    background:"linear-gradient(90deg, #FF3D8B, #FF9A56, #FFD93D, #00C9A7, #6C5CE7, #FF3D8B)",
                    backgroundSize:"300% 100%",
                    boxShadow:"0 3px 0 rgba(204,63,11,0.45), 0 6px 16px rgba(255,94,26,0.4), 0 1px 0 rgba(255,255,255,0.35) inset",
                    transition:"transform 0.15s",
                    textShadow:"0 1px 0 rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.3)",
                  }} onMouseEnter={(e) => e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={(e) => e.currentTarget.style.transform="scale(1)"}>
                    🎉 Забронировать −12%
                  </button>
                  <a
                    href="#program"
                    className="font-bold rounded-xl border-2 bg-white/90 transition-all hover:scale-105"
                    style={{padding:"0.65rem 1rem", fontSize:"0.9rem", color:"#FF9A56", borderColor:"white", display:"flex", alignItems:"center", whiteSpace:"nowrap"}}
                  >
                    Программа
                  </a>
                </div>
              </div>

            </div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </section>

      {/* ── БАННЕР: УНИКАЛЬНЫЕ ПОДРОСТКОВЫЕ СМЕНЫ ─────────────────────────────── */}
      <section className="px-4 py-8" style={{background:"#FFF8F0"}}>
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:"linear-gradient(135deg, #6C5CE7 0%, #A855F7 45%, #FF3D8B 100%)",
              boxShadow:"0 10px 0 rgba(108,92,231,0.35), 0 18px 50px rgba(108,92,231,0.45), 0 0 0 4px rgba(255,217,61,0.45) inset",
              padding:"1.5rem 1.25rem",
            }}
          >
            <div className="absolute -top-8 -right-8 text-9xl opacity-20 select-none">🚀</div>
            <div className="absolute -bottom-6 -left-6 text-7xl opacity-15 select-none">💜</div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <span className="text-5xl md:text-6xl">🌐</span>
                <span className="text-[11px] md:text-xs font-black px-3 py-1 rounded-full animate-rainbow-pulse" style={{background:"linear-gradient(90deg,#FFD93D,#FF9A56,#FFD93D)", color:"#3D1E70", letterSpacing:"0.5px", whiteSpace:"nowrap"}}>
                  ⚡ АНАЛОГОВ В КЕРЧИ НЕТ
                </span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-black text-white text-2xl md:text-3xl leading-tight mb-2" style={{fontFamily:"'Nunito', sans-serif", textShadow:"0 2px 8px rgba(0,0,0,0.35)"}}>
                  Уникальные смены для подростков 10–14 лет
                </h3>
                <p className="text-sm md:text-base font-semibold mb-1" style={{color:"rgba(255,255,255,0.95)"}}>
                  «Поколение АЛЬФА» и «Есть ли жизнь на Марсе?» — единственные в Керчи программы, созданные специально для возраста, который «уже не дети».
                </p>
                <p className="text-sm font-medium" style={{color:"rgba(255,255,255,0.85)"}}>
                  Чат-боты, дизайн в Canva и Photoshop, фуд-блогинг, элитная парфюмерия, эксперименты и реальные навыки — вместо «положи телефон».
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href="#program"
                  className="inline-flex items-center gap-2 font-black rounded-xl px-5 py-3 text-sm md:text-base transition-transform hover:scale-105"
                  style={{
                    background:"linear-gradient(90deg,#FFD93D,#FF9A56)",
                    color:"#3D1E70",
                    boxShadow:"0 6px 0 rgba(204,106,0,0.45), 0 10px 24px rgba(255,154,86,0.45), 0 1px 0 rgba(255,255,255,0.5) inset",
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

      {/* ── БЛОК 2: ДОВЕРИЕ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #E8FF6A 0%, #C8F000 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm mb-4 text-white" style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}>
              ⚡ Уже забронировали 25 семей
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-4 animate-rainbow-pulse"
              style={{
                fontFamily:"'Fredoka One', cursive",
                backgroundImage:"linear-gradient(90deg, #FF3D8B 0%, #FF9A56 20%, #FFD93D 40%, #00C9A7 60%, #6C5CE7 80%, #FF3D8B 100%)",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                letterSpacing:"0.5px",
              }}
            >
              ⭐ Отзывы детей ⭐
            </h2>
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
                  className="relative overflow-hidden bg-white"
                  style={{borderRadius:"24px", border:"3px solid #FFE5D9", boxShadow:"0 12px 30px rgba(255,154,86,0.25), 0 2px 0 rgba(255,255,255,0.4) inset", aspectRatio:"9/16"}}
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

          <CampFAQ />
        </div>
      </section>
    </>
  );
}