import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/files/6a758c5c-7949-438b-9910-7517ba7c0847.jpg";

const SHIFTS = [
  {
    num: "01",
    title: "Первооткрыватели",
    dates: "1 — 21 июня",
    age: "7–10 лет",
    price: "42 000 ₽",
    icon: "Compass",
    color: "#E8621A",
    desc: "Первый шаг в большое приключение. Походы, ориентирование, командные игры и знакомство с природой.",
    tags: ["Походы", "Ориентирование", "Игры"]
  },
  {
    num: "02",
    title: "Исследователи",
    dates: "25 июня — 15 июля",
    age: "11–14 лет",
    price: "48 000 ₽",
    icon: "Mountain",
    color: "#52B788",
    desc: "Скалодром, верёвочный курс, выживание в лесу. Настоящие испытания для тех, кто не боится трудностей.",
    tags: ["Скалодром", "Выживание", "Верёвочный курс"]
  },
  {
    num: "03",
    title: "Покорители",
    dates: "19 июля — 8 августа",
    age: "14–17 лет",
    price: "56 000 ₽",
    icon: "Tent",
    color: "#F5973A",
    desc: "Многодневный поход, лидерские тренинги и финальный костёр у реки. Для тех, кто готов к максимуму.",
    tags: ["Многодневный поход", "Лидерство", "Экспедиция"]
  }
];

const FAQ_ITEMS = [
  {
    q: "Что входит в стоимость смены?",
    a: "Проживание в благоустроенных корпусах или кемпинговых модулях, 5-разовое питание, все снаряжение и оборудование, медицинское сопровождение и трансфер от города."
  },
  {
    q: "Какой опыт нужен для участия?",
    a: "Никакого! Все смены подходят для новичков. Наши инструкторы имеют многолетний опыт работы с детьми и обучат всему с нуля."
  },
  {
    q: "Как устроена безопасность?",
    a: "На каждые 8 детей — один вожатый. Круглосуточный медпункт, страховка, современное снаряжение с сертификатами безопасности."
  },
  {
    q: "Можно ли приехать родителям?",
    a: "Да! Каждые выходные — день открытых дверей. Родители могут навещать детей, участвовать в совместных активностях и видеть лагерь изнутри."
  },
  {
    q: "Как оплатить и можно ли в рассрочку?",
    a: "Принимаем оплату картой, по счёту и через СБП. Рассрочка на 3 месяца — без переплат. При записи до 1 мая — скидка 10%."
  }
];

const GALLERY_ITEMS = [
  { src: HERO_IMAGE, alt: "Лес на закате", big: true },
  { src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop", alt: "Кемпинг", big: false },
  { src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop", alt: "Поход", big: false },
  { src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop", alt: "Костёр", big: false },
  { src: "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=400&h=300&fit=crop", alt: "Природа", big: false },
];

const STATS = [
  { val: "12", label: "лет работы" },
  { val: "3 000+", label: "выпускников" },
  { val: "98%", label: "возвращаются снова" },
  { val: "4", label: "смены в сезоне" },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", shift: "", child: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .reveal.in-view { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); document.head.removeChild(style); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setNavOpen(false); };

  return (
    <div className="min-h-screen" style={{ background: "#0E0A06" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(14,10,6,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(232,98,26,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span className="text-xl font-bold" style={{ fontFamily: "Oswald", color: "#E8621A" }}>⛺ ГОРИЗОНТ</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["shifts","Смены"],["gallery","Галерея"],["faq","FAQ"],["register","Регистрация"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-sm font-medium" style={{ color: "rgba(244,233,216,0.7)", fontFamily: "Golos Text" }}>
                {label}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo("register")} className="hidden md:block px-5 py-2 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #F5973A, #E8621A)", color: "#0E0A06", fontFamily: "Oswald", letterSpacing: "0.05em" }}>
            ЗАПИСАТЬСЯ
          </button>

          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2" style={{ color: "#E8621A" }}>
            <Icon name={navOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(232,98,26,0.12)" }}>
            {[["shifts","Смены"],["gallery","Галерея"],["faq","FAQ"],["register","Регистрация"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-base font-medium py-2" style={{ color: "rgba(244,233,216,0.8)", fontFamily: "Golos Text" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Лагерь Горизонт" className="w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,10,6,0.2) 0%, transparent 35%, rgba(14,10,6,0.75) 75%, #0E0A06 100%)" }} />
        </div>

        {/* Floating sparks */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full animate-float pointer-events-none" style={{
            width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            background: i % 2 === 0 ? "#F5973A" : "#E8621A",
            left: `${8 + i * 11}%`, top: `${25 + (i * 7) % 40}%`,
            animationDelay: `${i * 0.5}s`, opacity: 0.5 + (i % 3) * 0.15
          }} />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest rounded-full mb-8" style={{ background: "rgba(232,98,26,0.15)", border: "1px solid rgba(232,98,26,0.4)", color: "#F5973A", fontFamily: "Oswald" }}>
              🔥 ЛЕТО 2026 · НАБОР ОТКРЫТ
            </span>
          </div>

          <h1 className="animate-fade-up delay-200 text-fire leading-none mb-6" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", fontFamily: "Oswald", fontWeight: 700 }}>
            ЗДЕСЬ<br/>РОЖДАЮТСЯ<br/>ГЕРОИ
          </h1>

          <p className="animate-fade-up delay-400 text-lg md:text-xl max-w-xl mx-auto mb-10" style={{ color: "rgba(244,233,216,0.65)", fontFamily: "Golos Text", lineHeight: 1.7 }}>
            Летний приключенческий лагерь для детей 7–17 лет. 21 день настоящих испытаний, дружбы и открытий.
          </p>

          <div className="animate-fade-up delay-600 flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollTo("register")} className="px-8 py-4 text-base font-bold rounded-xl transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #F5973A, #E8621A)", color: "#0E0A06", fontFamily: "Oswald", letterSpacing: "0.08em", boxShadow: "0 8px 40px rgba(232,98,26,0.45)" }}>
              ЗАПИСАТЬСЯ НА СМЕНУ
            </button>
            <button onClick={() => scrollTo("shifts")} className="px-8 py-4 text-base font-semibold rounded-xl transition-all hover:scale-105 active:scale-95" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(244,233,216,0.18)", color: "#F4E9D8", fontFamily: "Oswald", letterSpacing: "0.06em", backdropFilter: "blur(8px)" }}>
              СМОТРЕТЬ СМЕНЫ
            </button>
          </div>

          <div className="animate-float mt-20 flex justify-center opacity-40">
            <Icon name="ChevronDown" size={30} color="#F5973A" />
          </div>
        </div>
      </section>

      {/* MARQUEE STATS */}
      <div style={{ background: "linear-gradient(90deg, #C8531A, #E8621A, #F5973A, #E8621A, #C8531A)", overflow: "hidden", padding: "13px 0" }}>
        <div className="animate-marquee flex whitespace-nowrap" style={{ width: "max-content" }}>
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-10" style={{ color: "#0E0A06", fontFamily: "Oswald" }}>
              <span className="text-xl font-bold">{s.val}</span>
              <span className="text-sm opacity-70 tracking-widest">{s.label.toUpperCase()}</span>
              <span className="text-lg opacity-30 ml-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SHIFTS */}
      <section id="shifts" className="py-28 px-6 relative" style={{ background: "#0E0A06" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16 relative">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>ВЫБЕРИ СВОЁ ПРИКЛЮЧЕНИЕ</p>
            <h2 className="text-5xl md:text-7xl font-bold" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>
              СМЕНЫ <span className="text-fire">2026</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHIFTS.map((shift, i) => (
              <div key={i} className="reveal camp-card fire-border rounded-2xl p-8 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", animationDelay: `${i * 0.15}s` }}>
                <span className="absolute top-4 right-5 text-8xl font-bold" style={{ fontFamily: "Oswald", color: shift.color, opacity: 0.06 }}>{shift.num}</span>

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${shift.color}18`, border: `1px solid ${shift.color}35` }}>
                  <Icon name={shift.icon as "Compass"} size={22} color={shift.color} />
                </div>

                <h3 className="text-2xl font-bold mb-1" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>{shift.title}</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(244,233,216,0.45)" }}>{shift.dates} · {shift.age}</p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(244,233,216,0.6)", fontFamily: "Golos Text" }}>{shift.desc}</p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {shift.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 text-xs rounded-full" style={{ background: `${shift.color}12`, color: shift.color, border: `1px solid ${shift.color}28` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold" style={{ color: shift.color, fontFamily: "Oswald" }}>{shift.price}</p>
                  <button onClick={() => scrollTo("register")} className="px-5 py-2.5 text-sm font-bold rounded-xl transition-all hover:scale-105 active:scale-95" style={{ background: shift.color, color: "#0E0A06", fontFamily: "Oswald", letterSpacing: "0.05em" }}>
                    ВЫБРАТЬ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <div className="py-24 px-6" style={{ background: "linear-gradient(135deg, #130A03 0%, #0A130A 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="text-xs font-semibold tracking-widest mb-4" style={{ color: "#52B788", fontFamily: "Oswald" }}>О ЛАГЕРЕ</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>
              12 ЛЕТ<br/><span className="text-forest-grad">НАСТОЯЩИХ</span><br/>ПРИКЛЮЧЕНИЙ
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(244,233,216,0.6)", fontFamily: "Golos Text" }}>
              Лагерь «Горизонт» расположен в сосновом лесу у реки Ока, в 80 км от Москвы. Мы создали место, где дети учатся преодолевать себя, дружить и открывать новое — вдали от экранов и рутины.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[["🌲","Сосновый лес","Экологически чистая зона"],["🏊","Своё озеро","Пляж и водные активности"],["🧗","Скалодром","Сертифицированные маршруты"],["🍳","Питание 5 раз","Меню от шеф-повара"]].map(([icon, title, sub], i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>{title}</p>
                    <p className="text-xs" style={{ color: "rgba(244,233,216,0.4)", fontFamily: "Golos Text" }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 text-center fire-border" style={{ background: "rgba(255,255,255,0.025)" }}>
                <p className="text-4xl font-bold mb-1 text-fire" style={{ fontFamily: "Oswald" }}>{s.val}</p>
                <p className="text-sm" style={{ color: "rgba(244,233,216,0.5)", fontFamily: "Golos Text" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6" style={{ background: "#0E0A06" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>АТМОСФЕРА</p>
            <h2 className="text-5xl md:text-7xl font-bold" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>ГАЛЕРЕЯ</h2>
          </div>
          <div className="gallery-grid reveal">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl group ${item.big ? "gallery-big" : ""}`} style={{ minHeight: item.big ? "400px" : "180px" }}>
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: "brightness(0.72)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(to top, rgba(232,98,26,0.45), transparent)" }} />
                <p className="absolute bottom-4 left-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>{item.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6" style={{ background: "linear-gradient(180deg, #0E0A06 0%, #100C06 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="reveal mb-16">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>ЧАСТЫЕ ВОПРОСЫ</p>
            <h2 className="text-5xl md:text-7xl font-bold" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>FAQ</h2>
          </div>
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="reveal" style={{ borderBottom: "1px solid rgba(232,98,26,0.15)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left transition-colors" style={{ color: openFaq === i ? "#F5973A" : "#F4E9D8" }}>
                  <span className="text-lg pr-8" style={{ fontFamily: "Oswald", fontWeight: 500 }}>{item.q}</span>
                  <Icon name={openFaq === i ? "Minus" : "Plus"} size={20} color={openFaq === i ? "#F5973A" : "rgba(244,233,216,0.35)"} />
                </button>
                {openFaq === i && (
                  <p className="pb-6 text-base leading-relaxed" style={{ color: "rgba(244,233,216,0.6)", fontFamily: "Golos Text" }}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="py-28 px-6" style={{ background: "#0E0A06" }}>
        <div className="max-w-2xl mx-auto">
          <div className="reveal text-center mb-12">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>НАЧНИ ПРИКЛЮЧЕНИЕ</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>
              ЗАПИСЬ <span className="text-fire">НА СМЕНУ</span>
            </h2>
            <p style={{ color: "rgba(244,233,216,0.5)", fontFamily: "Golos Text" }}>
              Заполните форму — мы свяжемся в течение часа и подберём место
            </p>
          </div>

          {submitted ? (
            <div className="reveal text-center py-16 rounded-2xl fire-border" style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
              <h3 className="text-3xl font-bold mb-3" style={{ color: "#F5973A", fontFamily: "Oswald" }}>ЗАЯВКА ОТПРАВЛЕНА!</h3>
              <p style={{ color: "rgba(244,233,216,0.55)", fontFamily: "Golos Text" }}>Мы позвоним вам в течение часа</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reveal rounded-2xl p-8 md:p-10 fire-border" style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 tracking-wider" style={{ color: "rgba(244,233,216,0.45)", fontFamily: "Oswald" }}>ИМЯ РОДИТЕЛЯ *</label>
                  <input type="text" required placeholder="Иван Петров" className="camp-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 tracking-wider" style={{ color: "rgba(244,233,216,0.45)", fontFamily: "Oswald" }}>ТЕЛЕФОН *</label>
                  <input type="tel" required placeholder="+7 (999) 000-00-00" className="camp-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 tracking-wider" style={{ color: "rgba(244,233,216,0.45)", fontFamily: "Oswald" }}>ИМЯ РЕБЁНКА *</label>
                  <input type="text" required placeholder="Маша, 10 лет" className="camp-input" value={form.child} onChange={e => setForm({...form, child: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 tracking-wider" style={{ color: "rgba(244,233,216,0.45)", fontFamily: "Oswald" }}>СМЕНА *</label>
                  <select required className="camp-input" value={form.shift} onChange={e => setForm({...form, shift: e.target.value})} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,98,26,0.3)", color: form.shift ? "#F4E9D8" : "rgba(244,233,216,0.35)", borderRadius: "8px", padding: "12px 16px", width: "100%", fontFamily: "Golos Text", fontSize: "1rem", cursor: "pointer", appearance: "none" }}>
                    <option value="" style={{ background: "#1A0E06", color: "#F4E9D8" }}>Выберите смену</option>
                    {SHIFTS.map((s, i) => <option key={i} value={s.title} style={{ background: "#1A0E06", color: "#F4E9D8" }}>{s.title} · {s.dates}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-xs font-semibold mb-2 tracking-wider" style={{ color: "rgba(244,233,216,0.45)", fontFamily: "Oswald" }}>КОММЕНТАРИЙ</label>
                <textarea rows={3} placeholder="Особые пожелания, вопросы..." className="camp-input resize-none" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-4 text-base font-bold rounded-xl transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, #F5973A, #E8621A)", color: "#0E0A06", fontFamily: "Oswald", letterSpacing: "0.08em", boxShadow: "0 8px 32px rgba(232,98,26,0.35)" }}>
                ОТПРАВИТЬ ЗАЯВКУ
              </button>
              <p className="text-center text-xs mt-4" style={{ color: "rgba(244,233,216,0.25)", fontFamily: "Golos Text" }}>
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <section id="contacts" className="py-20 px-6" style={{ background: "#070503", borderTop: "1px solid rgba(232,98,26,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>АДРЕС</p>
              <p style={{ color: "rgba(244,233,216,0.6)", fontFamily: "Golos Text", lineHeight: 1.7 }}>Московская обл., Серпуховский р-н,<br/>с. Лужки, ул. Лесная, 1</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>ТЕЛЕФОН</p>
              <a href="tel:+74951234567" className="text-xl font-bold hover:text-fire transition-colors" style={{ color: "#F4E9D8", fontFamily: "Oswald" }}>+7 (495) 123-45-67</a>
              <p className="text-sm mt-1.5" style={{ color: "rgba(244,233,216,0.35)", fontFamily: "Golos Text" }}>Пн–Пт: 9:00–20:00</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#E8621A", fontFamily: "Oswald" }}>НАПИСАТЬ НАМ</p>
              <a href="mailto:info@gorizont-camp.ru" className="hover:text-fire transition-colors" style={{ color: "#F4E9D8", fontFamily: "Golos Text" }}>info@gorizont-camp.ru</a>
              <div className="flex gap-3 mt-4">
                {[["Vk","ВКонтакте"],["Send","Telegram"]].map(([icon, label]) => (
                  <button key={label} className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: "rgba(232,98,26,0.1)", border: "1px solid rgba(232,98,26,0.22)", color: "#F5973A", fontFamily: "Golos Text" }}>
                    <Icon name={icon as "Send"} size={14} color="#F5973A" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8" style={{ borderTop: "1px solid rgba(232,98,26,0.08)" }}>
            <p className="text-xl font-bold text-fire mb-3 md:mb-0" style={{ fontFamily: "Oswald" }}>⛺ ЛАГЕРЬ «ГОРИЗОНТ»</p>
            <p className="text-xs" style={{ color: "rgba(244,233,216,0.25)", fontFamily: "Golos Text" }}>© 2026 Все права защищены</p>
          </div>
        </div>
      </section>

    </div>
  );
}
