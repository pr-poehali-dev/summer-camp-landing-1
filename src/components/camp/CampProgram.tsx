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
  return (
    <>
      {/* ── БЛОК 3: ЧТО ТАКОЕ РЫБКА ДОЛЛИ ───────────────────────────────────── */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Что такое наши летние смены?</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{color:"rgba(61,61,61,0.75)"}}>
              Это лето, о котором ваш ребёнок будет вспоминать всю жизнь.
              Не просто «занять детей», а настоящие приключения!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {[
              { emoji: "🌊", title: "Море каждый день", desc: "Не «раз в неделю автобусом», а каждый день!" },
              { emoji: "🔥", title: "Походы с костром", desc: "Барбекю, природа, настоящие приключения" },
              { emoji: "🎨", title: "Мастер-классы", desc: "Гончарка, роспись, кулинария и многое другое" },
              { emoji: "🎭", title: "Квесты и игры", desc: "Дети сами придумывают сценарии!" },
              { emoji: "🏕️", title: "Самостоятельность", desc: "Готовим на костре, ставим палатку, работаем в команде" },
              { emoji: "👫", title: "Друзья навсегда", desc: "Настоящие дружбы, которые остаются после смены" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-5 summer-card text-center bg-white" style={{border:"2px solid #FFE5D9", boxShadow:"0 10px 30px rgba(255,154,86,0.15)"}}>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-black mb-1" style={{color:"#3D3D3D"}}>{item.title}</h3>
                <p className="text-sm" style={{color:"rgba(61,61,61,0.7)"}}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* видео с ВК */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{paddingBottom:"56.25%", boxShadow:"0 10px 25px rgba(0,0,0,0.15)"}}>
                <iframe
                  src="https://vk.com/video_ext.php?oid=-179759189&id=456239214&hd=2&t=4m8s"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  allowFullScreen
                  title="Видео Рыбка Долли — смена 1"
                />
              </div>
              <div className="relative w-full overflow-hidden rounded-2xl bg-white" style={{paddingBottom:"56.25%", boxShadow:"0 10px 25px rgba(0,0,0,0.15)"}}>
                <iframe
                  src="https://vk.com/widget_post.php?app=0&width=100%25&_ver=1&owner_id=-179759189&post_id=2691&hash=auto"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  allowFullScreen
                  title="Видео Рыбка Долли — смена 2"
                  scrolling="no"
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
          <div className="space-y-3">
            {SHIFTS.map((shift) => (
              <div key={shift.id} className="rounded-2xl overflow-hidden shadow-sm" style={{border:"2px solid #FFE5D9", boxShadow:"0 10px 30px rgba(255,154,86,0.15)"}}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === shift.id ? null : shift.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-black hover:opacity-90 transition-opacity"
                  style={{background:"linear-gradient(90deg, #FF9A56 0%, #FFD93D 100%)"}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{shift.emoji}</span>
                    <div>
                      <div className="text-lg" style={{textShadow:"0 1px 3px rgba(0,0,0,0.15)"}}>Смена {shift.id}: «{shift.name}»</div>
                      <div className="text-sm font-normal opacity-80">{shift.dates} · {shift.age} · Осталось {shift.spots} мест</div>
                    </div>
                  </div>
                  <Icon name={openAccordion === shift.id ? "ChevronUp" : "ChevronDown"} size={20} />
                </button>
                {openAccordion === shift.id && (
                  <div className="p-5" style={{background:"#FFF8F0"}}>
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
                      style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}
                    >
                      Забронировать эту смену →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-warm-600 mt-6 text-sm">И это только малая часть активностей! Скорее бронируйте, пока места не закончились!</p>
        </div>
      </section>

      {/* ── БЛОК 6: РАСПИСАНИЕ ДНЯ ───────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)"}}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Как проходит день в клубе?</h2>
            <p style={{color:"rgba(61,61,61,0.7)"}}>Каждая минута продумана — дети под контролем и в движении!</p>
          </div>
          <div className="relative space-y-4">
            {[
              { time: "10:00", emoji: "👋", title: "Сбор в клубе", desc: "Общение, зарядка настроения" },
              { time: "11:00", emoji: "🎨", title: "Тема смены", desc: "МК, презентации и другие активности" },
              { time: "12:30", emoji: "💬", title: "Свободное общение", desc: "Дружба, игры, отдых" },
              { time: "13:30", emoji: "🍜", title: "Вкусный обед", desc: "Домашняя горячая еда" },
              { time: "14:00", emoji: "🌊", title: "Приключения!", desc: "Прогулка, море, поход с костром" },
              { time: "16:30", emoji: "🍎", title: "Полдник", desc: "Перекус и заряд бодрости" },
              { time: "17:00", emoji: "⭐", title: "Итоги дня", desc: "Номинации, доллики, рефлексия, настолки" },
              { time: "18:00", emoji: "🏠", title: "Идём домой", desc: "Но на этом не всё!" },
              { time: "19:30", emoji: "📲", title: "Задание в чат", desc: "Борьба за доллики — игровую валюту клуба!" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative timeline-item">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black flex-shrink-0 z-10" style={{background:"linear-gradient(135deg,#FF9A56,#FFD93D)"}}>
                    {item.emoji}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 flex-1 shadow-sm mb-2" style={{border:"2px solid #FFE5D9"}}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-sm" style={{color:"#FF9A56"}}>{item.time}</span>
                    <span className="font-bold" style={{color:"#3D3D3D"}}>{item.title}</span>
                  </div>
                  <p className="text-sm text-warm-600">{item.desc}</p>
                </div>
              </div>
            ))}
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

      {/* ── БЛОК 10–11: ОТЗЫВЫ ───────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"#FFF8F0"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>⭐ Что говорят дети и родители?</h2>
          </div>

          {/* видео-отзывы заглушка */}
          <div className="bg-white rounded-3xl p-8 mb-6 text-center shadow-sm" style={{border:"3px solid #00C9A7", boxShadow:"0 8px 25px rgba(0,201,167,0.2)"}}>
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="font-black text-xl mb-2" style={{color:"#3D3D3D"}}>Видео-отзывы детей</h3>
            <p style={{color:"rgba(61,61,61,0.7)"}}>Сюда добавьте 3–4 коротких видео с отзывами детей (30–60 сек)</p>
          </div>

          {/* фото-отзывы заглушка */}
          <div className="bg-white rounded-3xl p-8 mb-6 text-center shadow-sm" style={{border:"2px solid #FFE5D9"}}>
            <div className="text-5xl mb-4">📱</div>
            <h3 className="font-black text-xl mb-2" style={{color:"#3D3D3D"}}>Отзывы родителей</h3>
            <p style={{color:"rgba(61,61,61,0.7)"}}>Добавьте скриншоты переписок, скриншоты из ВКонтакте со звёздочками 5/5</p>
          </div>

          <div className="text-center">
            <a
              href="https://vk.com/app6379730_-179759189#l=8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-black px-8 py-4 rounded-2xl transition-all hover:scale-105"
              style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.305.585-1.496c.596-.188 1.361 1.26 2.174 1.815.614.418 1.08.326 1.08.326l2.17-.03s1.135-.071.597-1.002c-.044-.076-.312-.681-1.608-1.927-1.356-1.303-1.173-1.093.459-3.348.997-1.384 1.395-2.228 1.269-2.588-.12-.344-.876-.253-.876-.253l-2.443.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.386 1.077-.901 1.991c-1.085 1.923-1.52 2.025-1.698 1.905-.413-.274-.31-1.112-.31-1.705 0-1.854.273-2.628-.537-2.824-.27-.067-.468-.111-1.158-.118-.885-.009-1.633.003-2.057.218-.282.144-.499.463-.367.48.163.022.532.103.727.378.252.352.243 1.143.243 1.143s.145 2.186-.338 2.453c-.331.181-.786-.188-1.761-1.876-.5-.896-.878-1.888-.878-1.888s-.072-.177-.202-.272c-.157-.115-.376-.151-.376-.151l-2.322.015s-.348.01-.476.166c-.114.139-.009.427-.009.427s1.816 4.424 3.872 6.651c1.885 2.042 4.026 1.907 4.026 1.907h.97z"/></svg>
              Читать все отзывы ВКонтакте
            </a>
          </div>
        </div>
      </section>
    </>
  );
}