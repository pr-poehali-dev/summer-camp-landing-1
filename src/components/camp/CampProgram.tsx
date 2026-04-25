import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { SHIFTS } from "./CampData";

interface CampProgramProps {
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
}

export default function CampProgram({
  openAccordion,
  setOpenAccordion,
  scrollToBooking,
  setSelectedShift,
}: CampProgramProps) {
  const firstVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = firstVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── БЛОК: ВИДЕО СО СМЕН ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-6 md:p-8" style={{background:"#FFF8F0", border:"2px solid #FFE5D9", boxShadow:"0 10px 30px rgba(255,154,86,0.15)"}}>
            <h3
              className="font-black text-3xl md:text-5xl mb-6 text-center animate-rainbow-pulse"
              style={{
                fontFamily:"'Fredoka One', cursive",
                backgroundImage:"linear-gradient(90deg, #FF3D8B 0%, #FF9A56 20%, #FFD93D 40%, #00C9A7 60%, #6C5CE7 80%, #FF3D8B 100%)",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                letterSpacing:"0.5px",
              }}
            >
              📹 Смотрите, как это было в прошлом году! 🎉
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto items-stretch">
              <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{aspectRatio:"16 / 9", boxShadow:"0 10px 25px rgba(0,0,0,0.15)"}}>
                <video
                  ref={firstVideoRef}
                  src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/034b7134-32f7-411e-b6a7-e99bc9f8c195.mp4"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  controls
                  playsInline
                  muted
                  loop
                  preload="metadata"
                />
              </div>
              <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{aspectRatio:"16 / 9", boxShadow:"0 10px 25px rgba(0,0,0,0.15)"}}>
                <video
                  src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/db6717d2-5463-4014-a065-2eab9a7a2743.mp4"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ТЁМНЫЙ БЛОК ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)"}} />
        <div className="absolute inset-0 opacity-15" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #FF9A56 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFD93D 0%, transparent 40%)"}} />
        <div className="absolute top-6 right-12 text-5xl opacity-30 animate-float">⭐</div>
        <div className="absolute bottom-8 left-16 text-3xl opacity-20 animate-float delay-300">✦</div>
        <div className="absolute top-12 left-1/3 text-2xl opacity-15 animate-float delay-200">✦</div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-7xl md:text-9xl font-black block mb-2 leading-none" style={{fontFamily:"'Fredoka One', cursive", background:"linear-gradient(135deg, #FF9A56 0%, #FFD93D 50%, #fff 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>
              РЫБКА ДОЛЛИ
            </span>
            <span className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-white/70 block" style={{fontFamily:"'Fredoka One', cursive"}}>
              ДЕТСКИЙ КЛУБ
            </span>
          </div>
          <div className="flex justify-center gap-2 mb-8">
            <span className="text-2xl text-white/30">★</span>
            <span className="text-2xl" style={{color:"#FFD93D"}}>★</span>
            <span className="text-2xl text-white/30">★</span>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 font-semibold">
            Лето 2026 в Керчи — это море, песок, изумрудная трава и столько радости, что хватит на весь год!
          </p>
          <button onClick={scrollToBooking} className="btn-cta text-lg px-10 py-4">
            🌊 Забронировать место на лето
          </button>
        </div>
      </section>

      {/* ── БЛОК 4: ДЛЯ КОГО ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #E8FF6A 0%, #C8F000 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Рыбка Долли — это для вашего ребёнка, если:</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { emoji: "🎂", text: "Ему 7–14 лет", detail: "Смены разделены по возрастам — каждый в своей группе" },
              { emoji: "🛡️", text: "Он любит приключения, но вы переживаете за безопасность", detail: "Опытные педагоги-вожатые с опытом более 5 лет" },
              { emoji: "🤝", text: "Он застенчивый, мало друзей", detail: "Наши программы раскрывают детей через игру и творчество" },
              { emoji: "💪", text: "Вы хотите научить его самостоятельности", detail: "Готовим на костре, ставим палатку, работаем в команде" },
              { emoji: "📱", text: "Он «залипает» в гаджетах", detail: "Телефоны только для связи с родителями — вечером 30 минут" },
              { emoji: "🌟", text: "Вы хотите, чтобы лето было незабываемым", detail: "Каждая смена — отдельная история с уникальной темой!" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm summer-card" style={{border:"2px solid #FFE5D9"}}>
                <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                <div>
                  <p className="font-bold" style={{color:"#3D3D3D"}}>✅ {item.text}</p>
                  <p className="text-sm mt-0.5" style={{color:"rgba(61,61,61,0.7)"}}>→ {item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl p-6 text-white text-center" style={{background:"linear-gradient(90deg, #00C9A7 0%, #FFD93D 100%)"}}>
            <p className="text-xl font-black mb-2">🎯 Мы чётко разделяем возраст!</p>
            <p className="text-white/90">
              В смене для детей 10–14 лет мы не рисуем котиков — мы создаём чат-ботов, элитную парфюмерию,
              солнечные батареи и дизайнерские вещи. Разный возраст — разные интересы.
              <br/><strong>Лето не должно быть испорчено ни у кого! Только радость и восторг!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── БЛОК 5: ПРОГРАММА СМЕН ────────────────────────────────────────────── */}
      <section id="program" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Программа смен (10 дней)</h2>
            <p style={{color:"rgba(61,61,61,0.7)"}}>Каждая смена — отдельная история с уникальной темой!</p>
          </div>
          <div className="space-y-4">
            {SHIFTS.map((shift) => {
              const isTeen = shift.id === 4 || shift.id === 5;
              const isShort = shift.id === 7;
              const shiftAccusative: Record<number, string> = {
                1: "«Сундук со сказками»",
                2: "«Вкусные открытия»",
                3: "«Мульти-драйв»",
                4: "«Поколение АЛЬФА»",
                5: "«Есть ли жизнь на Марсе?»",
                6: "«Кругосветку»",
                7: "«Лабораторию чудес»",
              };
              const shiftName = shiftAccusative[shift.id] ?? `«${shift.name}»`;
              return (
              <div key={shift.id} className={`rounded-3xl overflow-hidden transition-transform hover:-translate-y-0.5 relative ${isShort ? "animate-short-shift" : ""}`} style={isTeen ? {border:"3px solid #6C5CE7", boxShadow:"0 14px 0 rgba(108,92,231,0.25), 0 18px 50px rgba(108,92,231,0.45), 0 0 0 4px rgba(255,217,61,0.35), 0 2px 0 rgba(255,255,255,0.5) inset"} : isShort ? {border:"3px solid #00C9A7"} : {border:"3px solid #FFE5D9", boxShadow:"0 14px 0 rgba(204,106,0,0.18), 0 18px 40px rgba(255,154,86,0.3), 0 2px 0 rgba(255,255,255,0.5) inset"}}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === shift.id ? null : shift.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-black hover:brightness-105 transition-all"
                  style={isTeen ? {
                    background:"linear-gradient(135deg, #6C5CE7 0%, #A855F7 50%, #FF3D8B 100%)",
                    color:"#FFFFFF",
                    boxShadow:"0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.18) inset",
                  } : isShort ? {
                    background:"linear-gradient(135deg, #00DEB8 0%, #00C9A7 50%, #0094C6 100%)",
                    color:"#FFFFFF",
                    boxShadow:"0 2px 0 rgba(255,255,255,0.25) inset, 0 -3px 0 rgba(0,0,0,0.18) inset",
                  } : {
                    background:"linear-gradient(135deg, #FFE55A 0%, #FFB830 50%, #FF8C00 100%)",
                    color:"#5C2E00",
                    boxShadow:"0 2px 0 rgba(255,255,255,0.45) inset, 0 -3px 0 rgba(204,106,0,0.18) inset",
                  }}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-3xl flex-shrink-0" style={{filter:"drop-shadow(0 2px 3px rgba(92,46,0,0.25))"}}>{shift.emoji}</span>
                    <div className="min-w-0 flex-1">
                      {isTeen && (
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full text-white shadow animate-rainbow-pulse" style={{background:"linear-gradient(90deg,#FFD93D,#FF3D8B,#FFD93D)", color:"#3D1E70", letterSpacing:"0.5px"}}>
                            🔥 ДЛЯ ПОДРОСТКОВ
                          </span>
                          <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow" style={{background:"#FFD93D", color:"#3D1E70"}}>
                            ⚡ АНАЛОГОВ В КЕРЧИ НЕТ
                          </span>
                        </div>
                      )}
                      {isShort && (
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow animate-rainbow-pulse" style={{background:"#FFD93D", color:"#1A5C4D", letterSpacing:"0.5px"}}>
                            ⚡ ФИНАЛ ЛЕТА · 5 ДНЕЙ
                          </span>
                          <span className="text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full shadow" style={{background:"#fff", color:"#1A5C4D"}}>
                            💰 ВСЕГО 7 000 ₽
                          </span>
                        </div>
                      )}
                      <div className="text-lg md:text-xl" style={(isTeen || isShort) ? {textShadow:"0 1px 2px rgba(0,0,0,0.3)"} : {textShadow:"0 1px 0 rgba(255,255,255,0.5)"}}>Смена {shift.id}: «{shift.name}»</div>
                      <div className="text-sm font-semibold" style={(isTeen || isShort) ? {color:"rgba(255,255,255,0.9)"} : {color:"rgba(92,46,0,0.75)"}}>{shift.dates} · {shift.age} · Осталось {shift.spots} мест{isShort ? " · 7 000 ₽" : ""}</div>
                    </div>
                  </div>
                  <Icon name={openAccordion === shift.id ? "ChevronUp" : "ChevronDown"} size={22} />
                </button>
                {openAccordion === shift.id && (
                  <div className="p-5" style={{background:"#FFF8F0"}}>
                    {isTeen && (
                      <div className="mb-4 rounded-2xl p-4" style={{background:"linear-gradient(135deg, #6C5CE7 0%, #FF3D8B 100%)", color:"#fff", boxShadow:"0 8px 20px rgba(108,92,231,0.35)"}}>
                        <p className="font-black text-sm md:text-base mb-1">⚡ Единственная такая смена в Керчи!</p>
                        <p className="text-sm" style={{color:"rgba(255,255,255,0.92)"}}>Программа специально для подростков 10–14 лет: технологии, творчество, реальные навыки. Аналогов в городе нет — мы первые, кто делает это для возраста, который «уже не дети».</p>
                      </div>
                    )}
                    {isShort && (
                      <div className="mb-4 rounded-2xl p-4" style={{background:"linear-gradient(135deg, #00C9A7 0%, #0094C6 100%)", color:"#fff", boxShadow:"0 8px 20px rgba(0,201,167,0.35)"}}>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[11px] font-black px-2 py-0.5 rounded-full" style={{background:"#FFD93D", color:"#1A5C4D"}}>5-ДНЕВНЫЙ ФОРМАТ</span>
                          <span className="text-[11px] font-black px-2 py-0.5 rounded-full" style={{background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.4)"}}>ФИНАЛ ЛЕТА</span>
                        </div>
                        <p className="font-black text-base md:text-lg mb-1">💰 Всего 7 000 ₽ — экономия почти в 2 раза!</p>
                        <p className="text-sm mb-2" style={{color:"rgba(255,255,255,0.92)"}}>Идеальный финал лета: 5 насыщенных дней, 20+ научных опытов и яркие впечатления перед школой. Подойдёт, если хотите сэкономить, ребёнок уже был в основной смене или нужно «протестировать» наш клуб.</p>
                        <div className="flex flex-wrap gap-3 text-xs font-bold">
                          <span>✅ 2-разовое питание</span>
                          <span>✅ Все материалы и реактивы</span>
                          <span>✅ Море каждый день</span>
                          <span>✅ Подарки и диплом</span>
                        </div>
                      </div>
                    )}
                    {shift.days.length > 0 ? (
                      <ol className="space-y-2">
                        {shift.days.map((day, i) => (
                          <li key={i} className="flex gap-3 text-sm" style={{color:"#3D3D3D"}}>
                            <span className="font-black flex-shrink-0" style={{background:"linear-gradient(135deg,#00C9A7,#FFD93D)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>{i + 1}.</span>
                            <span>{day}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-sm italic" style={{color:"rgba(61,61,61,0.7)"}}>Подробная программа скоро появится. Следите за обновлениями в ВКонтакте!</p>
                    )}
                    <button
                      onClick={() => { setSelectedShift(shift.id); scrollToBooking(); }}
                      className="mt-4 font-bold px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:scale-105"
                      style={isTeen ? {background:"linear-gradient(90deg,#6C5CE7,#FF3D8B,#FFD93D)", boxShadow:"0 6px 18px rgba(108,92,231,0.45)"} : isShort ? {background:"linear-gradient(90deg,#00C9A7,#0094C6,#FFD93D)", boxShadow:"0 6px 18px rgba(0,201,167,0.45)"} : {background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}
                    >
                      {isTeen ? `🚀 Забронировать ${shiftName} →` : isShort ? `💰 Забронировать ${shiftName} за 7 000 ₽ →` : `Забронировать ${shiftName} →`}
                    </button>
                  </div>
                )}
              </div>
              );
            })}
          </div>
          <p className="text-center text-warm-600 mt-6 text-sm">И это только малая часть активностей! Скорее бронируйте, пока места не закончились!</p>
        </div>
      </section>

      {/* ── БЛОК 6: РАСПИСАНИЕ ДНЯ ───────────────────────────────────────────── */}
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

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 font-bold text-sm" style={{ border: "2px solid #FFE5D9", color: "#3D3D3D", boxShadow: "0 6px 16px rgba(255,154,86,0.15)" }}>
              <span className="text-lg">🕙</span>
              Пребывание с 10:00 до 18:00 · 8 часов насыщенной программы
            </div>
          </div>
        </div>
      </section>

      {/* ── БЛОК 7: КОМАНДА ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Наша команда</h2>
          <p className="mb-10" style={{color:"rgba(61,61,61,0.7)"}}>Педагоги-профессионалы, а не «студенты-аниматоры»</p>
          <div className="rounded-3xl p-10 border-2 border-dashed" style={{background:"#FFF8F0", borderColor:"#00C9A7"}}>
            <div className="text-5xl mb-4">👩‍🏫</div>
            <p className="text-warm-700 text-lg font-semibold">Здесь появятся фото и рассказы о вожатых</p>
            <p className="text-sm text-warm-500 mt-2">Добавьте реальные фотографии команды — это вызывает доверие родителей!</p>
          </div>
        </div>
      </section>

      {/* ── БЛОК 8: БЕЗОПАСНОСТЬ ──────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>🛡️ Безопасность — наш приоритет №1</h2>
            <p style={{color:"rgba(61,61,61,0.7)"}}>Что мы делаем, чтобы вы были спокойны:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "🚑", title: "Первая помощь", desc: "Вожатые с сертификатами — обучение каждый год" },
              { emoji: "🎒", title: "Аптечка всегда рядом", desc: "Йод, бинты, антисептики, средства от ожогов" },
              { emoji: "🏊", title: "Купание под контролем", desc: "На 3 детей — 1 взрослый, всегда рядом" },
              { emoji: "🗺️", title: "Проверенные маршруты", desc: "Пляжи с костром — безопасные и проверенные места" },
              { emoji: "📞", title: "Связь весь день", desc: "Вы всегда можете позвонить и узнать как дела" },
              { emoji: "📸", title: "Родители в курсе", desc: "Фото и видео каждый день в родительском чате" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm summer-card text-center" style={{border:"2px solid #FFE5D9"}}>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-black mb-1" style={{color:"#3D3D3D"}}>{item.title}</h3>
                <p className="text-sm" style={{color:"rgba(61,61,61,0.7)"}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 9: ПИТАНИЕ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>🍜 Чем кормим?</h2>
            <p style={{color:"rgba(61,61,61,0.7)"}}>Вкусно, сытно и по-домашнему!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                day: "🗓️ Среда", color: "from-[#FF9A56] to-[#FFD93D]",
                meals: [
                  { type: "🍲 Обед", items: ["Чечевичный суп с сухариками", "Плов с говядиной", "Овощная нарезка (помидоры, огурцы, салат)", "Компот из сезонных фруктов"] },
                  { type: "🍎 Полдник", items: ["Булочка со штрейзельной крошкой", "Чай", "Фрукты по сезону"] },
                ]
              },
              {
                day: "🗓️ Пятница", color: "from-[#FFD93D] to-[#FF9A3C]",
                meals: [
                  { type: "🍲 Обед", items: ["Зелёный борщ", "Хлеб с маслом", "Пельмени с куриным фаршем", "Салат из моркови", "Чай с лимоном"] },
                  { type: "🍎 Полдник", items: ["Шарлотка с яблоками", "Чай с молоком (по желанию)"] },
                ]
              }
            ].map((menu, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm" style={{border:"2px solid #FFE5D9"}}>
                <div className={`bg-gradient-to-r ${menu.color} font-black text-xl p-4 text-white`} style={{textShadow:"0 1px 3px rgba(0,0,0,0.15)"}}>{menu.day}</div>
                <div className="p-5 space-y-4">
                  {menu.meals.map((meal, j) => (
                    <div key={j}>
                      <p className="font-bold mb-2" style={{color:"#3D3D3D"}}>{meal.type}</p>
                      <ul className="space-y-1">
                        {meal.items.map((item, k) => (
                          <li key={k} className="text-sm flex gap-2" style={{color:"rgba(61,61,61,0.85)"}}>
                            <span style={{color:"#00C9A7"}}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}