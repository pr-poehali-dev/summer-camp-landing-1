import Icon from "@/components/ui/icon";
import { SHIFTS, TESTIMONIALS, useCountdown } from "./CampData";

interface CampHeroProps {
  scrollToBooking: () => void;
}

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-2xl px-4 py-3 min-w-[70px]">
    <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs text-white/80 font-semibold mt-1">{label}</span>
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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-20" style={{background:"linear-gradient(180deg, rgba(255,217,61,0.18) 0%, rgba(255,154,86,0.28) 100%)", backgroundColor:"#FFF8F0"}}>
        {/* декоративные кружки */}
        <div className="absolute top-24 right-8 w-28 h-28 rounded-full opacity-20 animate-float" style={{background:"#FFD93D"}} />
        <div className="absolute bottom-40 right-16 w-20 h-20 rounded-full opacity-20 animate-float delay-300" style={{background:"#00C9A7"}} />
        <div className="absolute top-1/2 right-1/3 w-14 h-14 rounded-full opacity-15 animate-float delay-500" style={{background:"#FF9A56"}} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">

            {/* ── ЛЕВАЯ КОЛОНКА: фото с SVG-брызгами ── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center animate-fade-in">
              <div className="relative w-full max-w-[460px]">

                {/* SVG-брызги: лайм + немного розового, эффект разбрызгивания с хвостиками */}
                <svg className="absolute pointer-events-none" style={{inset:"-24%", width:"148%", height:"148%", zIndex:3}} viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg">

                  {/* ── УГОЛ СВЕРХУ-СЛЕВА: лайм ── */}
                  <ellipse cx="72" cy="52" rx="28" ry="12" fill="#8BC400" opacity="0.95" transform="rotate(-35 72 52)"/>
                  <ellipse cx="50" cy="38" rx="18" ry="6"  fill="#8BC400" opacity="0.8"  transform="rotate(-50 50 38)"/>
                  <ellipse cx="95" cy="28" rx="10" ry="4"  fill="#8BC400" opacity="0.7"  transform="rotate(-20 95 28)"/>
                  <circle  cx="110" cy="18" r="5"  fill="#8BC400" opacity="0.6"/>
                  <circle  cx="32"  cy="55" r="4"  fill="#8BC400" opacity="0.55"/>
                  <circle  cx="120" cy="35" r="3"  fill="#8BC400" opacity="0.5"/>
                  <circle  cx="20"  cy="40" r="3"  fill="#8BC400" opacity="0.45"/>
                  <ellipse cx="60"  cy="18" rx="7" ry="3"  fill="#8BC400" opacity="0.6"  transform="rotate(-60 60 18)"/>

                  {/* ── УГОЛ СВЕРХУ-СПРАВА: розовый ── */}
                  <ellipse cx="488" cy="55" rx="26" ry="11" fill="#FF2D9B" opacity="0.9" transform="rotate(40 488 55)"/>
                  <ellipse cx="510" cy="38" rx="16" ry="6"  fill="#FF2D9B" opacity="0.75" transform="rotate(55 510 38)"/>
                  <ellipse cx="465" cy="30" rx="12" ry="5"  fill="#FF2D9B" opacity="0.65" transform="rotate(25 465 30)"/>
                  <circle  cx="530" cy="60" r="5"  fill="#FF2D9B" opacity="0.6"/>
                  <circle  cx="452" cy="18" r="4"  fill="#FF2D9B" opacity="0.55"/>
                  <circle  cx="540" cy="42" r="3"  fill="#FF2D9B" opacity="0.5"/>
                  <circle  cx="475" cy="12" r="3"  fill="#FF2D9B" opacity="0.45"/>

                  {/* ── УГОЛ СНИЗУ-СЛЕВА: лайм ── */}
                  <ellipse cx="68"  cy="508" rx="30" ry="11" fill="#8BC400" opacity="0.95" transform="rotate(30 68 508)"/>
                  <ellipse cx="42"  cy="528" rx="20" ry="7"  fill="#8BC400" opacity="0.8"  transform="rotate(50 42 528)"/>
                  <ellipse cx="100" cy="530" rx="12" ry="5"  fill="#8BC400" opacity="0.7"  transform="rotate(15 100 530)"/>
                  <circle  cx="25"  cy="510" r="5"  fill="#8BC400" opacity="0.6"/>
                  <circle  cx="115" cy="545" r="4"  fill="#8BC400" opacity="0.55"/>
                  <circle  cx="18"  cy="540" r="3"  fill="#8BC400" opacity="0.5"/>
                  <circle  cx="88"  cy="548" r="3"  fill="#8BC400" opacity="0.45"/>
                  <ellipse cx="55"  cy="548" rx="10" ry="4"  fill="#8BC400" opacity="0.6"  transform="rotate(40 55 548)"/>

                  {/* ── УГОЛ СНИЗУ-СПРАВА: вперемешку ── */}
                  <ellipse cx="492" cy="510" rx="26" ry="10" fill="#FF2D9B" opacity="0.9"  transform="rotate(-30 492 510)"/>
                  <ellipse cx="518" cy="530" rx="17" ry="6"  fill="#8BC400" opacity="0.85" transform="rotate(-50 518 530)"/>
                  <ellipse cx="468" cy="532" rx="11" ry="5"  fill="#FF2D9B" opacity="0.7"  transform="rotate(-15 468 532)"/>
                  <circle  cx="540" cy="515" r="5"  fill="#8BC400" opacity="0.6"/>
                  <circle  cx="455" cy="548" r="4"  fill="#FF2D9B" opacity="0.55"/>
                  <circle  cx="530" cy="546" r="3"  fill="#8BC400" opacity="0.5"/>
                  <circle  cx="510" cy="548" r="3"  fill="#FF2D9B" opacity="0.45"/>

                  {/* ── БОКОВЫЕ ОДИНОЧНЫЕ КАПЛИ ── */}
                  {/* лево */}
                  <ellipse cx="22"  cy="200" rx="10" ry="4"  fill="#8BC400" opacity="0.6"  transform="rotate(80 22 200)"/>
                  <circle  cx="14"  cy="240" r="4"  fill="#FF2D9B" opacity="0.45"/>
                  <ellipse cx="18"  cy="320" rx="8"  ry="3"  fill="#8BC400" opacity="0.5"  transform="rotate(70 18 320)"/>
                  {/* право */}
                  <ellipse cx="540" cy="190" rx="9"  ry="4"  fill="#FF2D9B" opacity="0.55" transform="rotate(-75 540 190)"/>
                  <circle  cx="546" cy="350" r="4"  fill="#8BC400" opacity="0.5"/>
                  {/* верх */}
                  <ellipse cx="200" cy="16"  rx="10" ry="4"  fill="#8BC400" opacity="0.55" transform="rotate(10 200 16)"/>
                  <circle  cx="340" cy="12"  r="4"  fill="#FF2D9B" opacity="0.5"/>
                  {/* низ */}
                  <ellipse cx="280" cy="548" rx="12" ry="5"  fill="#8BC400" opacity="0.6"  transform="rotate(5 280 548)"/>
                  <circle  cx="380" cy="552" r="3"  fill="#FF2D9B" opacity="0.45"/>
                </svg>

                {/* Фото детей */}
                <img
                  src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/3d9a57af-1bab-46c2-b523-b89695373724.jpg"
                  alt="Дети в летнем клубе Рыбка Долли, Керчь"
                  className="w-full object-cover"
                  style={{
                    aspectRatio:"4/3",
                    display:"block",
                    borderRadius:"20px",
                    border:"6px solid #FF9A56",
                    boxShadow:"0 8px 40px rgba(255,154,86,0.35)",
                    position:"relative",
                    zIndex:2,
                  }}
                />
              </div>
            </div>

            {/* ── ПРАВАЯ КОЛОНКА: текст ── */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-white font-bold px-5 py-2 rounded-full text-sm mb-5 animate-bounce-slow" style={{background:"#00C9A7", boxShadow:"0 4px 15px rgba(0,201,167,0.4)"}}>
                🌊 Керчь · Городской летний клуб · Для детей 7–14 лет
              </div>

              <h1 className="font-black mb-4 leading-tight" style={{fontFamily:"'Nunito', sans-serif", fontSize:"clamp(2.4rem, 5vw, 3.6rem)", lineHeight:1.1}}>
                <span style={{color:"#FF9A56"}}>Рыбка </span>
                <span style={{color:"#FFD93D"}}>Долли</span>
                <br />
                <span style={{
                  background:"linear-gradient(135deg, #FF9A56 0%, #FFD93D 100%)",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  backgroundClip:"text",
                  fontSize:"0.7em",
                  letterSpacing:"0.05em",
                }}>Лето 2026</span>
              </h1>

              <p className="text-lg md:text-xl font-bold mb-3" style={{fontFamily:"'Nunito', sans-serif", color:"#3D3D3D"}}>
                <span style={{color:"#00C9A7"}}>🌊</span> Море · <span style={{color:"#00C9A7"}}>🎨</span> Творчество · <span style={{color:"#00C9A7"}}>⛺</span> Походы · <span style={{color:"#00C9A7"}}>🎭</span> Квесты
              </p>

              <p className="text-base mb-6 font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"rgba(61,61,61,0.8)"}}>
                Авторские смены, где дети становятся самостоятельнее,
                находят друзей и возвращаются окрылёнными!
              </p>

              {/* Таймер-акция */}
              <div className="rounded-[20px] p-5 mb-6" style={{background:"linear-gradient(90deg, #FFD93D 0%, #FF9A56 100%)", boxShadow:"0 12px 40px rgba(255,217,61,0.4)"}}>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <span className="text-xl">⏰</span>
                  <span className="font-black text-lg text-white" style={{fontFamily:"'Nunito', sans-serif"}}>
                    АКЦИЯ ДО 15 МАЯ — СКИДКА{" "}
                    <span style={{outline:"3px solid #00C9A7", outlineOffset:"2px", borderRadius:"4px", padding:"0 4px"}}>12%</span>!
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 flex-wrap">
                  <TimerBlock value={countdown.days} label="ДНЕЙ" />
                  <span className="text-white text-2xl font-black animate-colon">:</span>
                  <TimerBlock value={countdown.hours} label="ЧАСОВ" />
                  <span className="text-white text-2xl font-black animate-colon">:</span>
                  <TimerBlock value={countdown.minutes} label="МИНУТ" />
                  <span className="text-white text-2xl font-black animate-colon">:</span>
                  <TimerBlock value={countdown.seconds} label="СЕКУНД" />
                </div>
                <p className="text-white/90 text-sm font-semibold text-center lg:text-left">
                  Осталось мест: <span className="font-black text-lg text-white">45</span> из 70
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button onClick={scrollToBooking} className="btn-cta text-lg px-8 py-4">
                  🎉 Забронировать со скидкой 12%
                </button>
                <a
                  href="#about"
                  className="font-bold text-lg px-8 py-4 rounded-2xl border-2 bg-white/80 transition-all hover:scale-105"
                  style={{color:"#FF9A56", borderColor:"#FF9A56"}}
                >
                  Программа смен
                </a>
              </div>
              <p className="text-sm mt-3 font-semibold" style={{color:"rgba(61,61,61,0.6)"}}>Раннее бронирование — оплата онлайн, место гарантировано!</p>
            </div>
          </div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </section>

      {/* ── БЛОК 2: ДОВЕРИЕ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"#FFF8F0"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm mb-4 text-white" style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}>
              ⚡ Уже забронировали 25 семей
            </div>
            <h2 className="text-3xl md:text-4xl font-black" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Что говорят родители?</h2>
          </div>

          {/* отзывы */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl p-5 shadow-sm summer-card quote-bg" style={{background:"#FFE5D9", border:"1px solid #FFD9C5", boxShadow:"0 5px 20px rgba(255,154,86,0.1)"}}>
                <div className="text-[#FFD93D] text-sm mb-2">⭐⭐⭐⭐⭐</div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{background:"rgba(255,154,86,0.15)"}}>
                    {t.emoji}
                  </div>
                  <div>
                    <p className="text-warm-800 font-semibold italic mb-1">«{t.text}»</p>
                    <p className="text-sm text-warm-600">— {t.author}, {t.child}</p>
                  </div>
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