import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useRobokassa, openPaymentPage, formatPhoneNumber, isValidEmail, isValidPhone } from "@/components/extensions/robokassa/useRobokassa";
import func2url from "../../backend/func2url.json";

// ── данные смен ────────────────────────────────────────────────────────────────
const SHIFTS = [
  { id: 1, name: "Сундук со сказками", emoji: "🧙‍♀️", dates: "1–12 июня", age: "7–9 лет", spots: 5, color: "from-[#FF6B6B] to-[#E84444]", lightColor: "bg-[#FFF0F0]", borderColor: "border-[#FFD6D6]", days: [
    "День 1: Введение в смену. МК «Волшебная шляпа» и интерактив со сказочными героями",
    "День 2: Сказочная почта прямо у нас в центре. Викторина с волшебными существами",
    "День 3: Подводный мир тоже бывает волшебным. МК «Черепаха»",
    "День 4: Что же ела Фрекен Бок? Карлсон добыл нам рецепт — готовим плюшки!",
    "День 5: Магическая школа. Что-нибудь да намагичим!",
    "День 6: Волшебство с песком. Картины на световых столах — красиво и снимает стресс",
    "День 7: Сказочный скворечник для волшебных жар-птиц — необычным способом",
    "День 8: Снова песок! Яркая картина, которую можно забрать домой",
    "День 9: А вы знали, что бывают игрушки из ваты? 3, 2, 1...",
    "День 10: Театр теней — волшебно, интересно и немного страшно. Управляем героями сами!"
  ]},
  { id: 2, name: "Вкусные открытия", emoji: "👨‍🍳", dates: "15–26 июня", age: "7–12 лет", spots: 4, color: "from-[#FFE66D] to-[#FFD43B]", lightColor: "bg-[#FFFBE6]", borderColor: "border-[#FFE680]", days: [] },
  { id: 3, name: "Мульти-драйв", emoji: "🎨", dates: "29 июня – 10 июля", age: "7–10 лет", spots: 6, color: "from-[#4ECDC4] to-[#38b2ab]", lightColor: "bg-[#E6FAFA]", borderColor: "border-[#B2EBE8]", days: [] },
  { id: 4, name: "Поколение АЛЬФА", emoji: "🚀", dates: "13–24 июля", age: "10–14 лет", spots: 8, color: "from-[#FF6B6B] to-[#4ECDC4]", lightColor: "bg-[#FFF0F0]", borderColor: "border-[#FFD6D6]", days: [
    "День 1: Создание коллажа с помощью программы Flyvi — первые шаги в технологичном мире",
    "День 2: Учимся создавать подкасты. Ораторское искусство — говорим так, чтобы хотелось слушать",
    "День 3: Проект полезного приложения — развиваем в себе создателя",
    "День 4: Глобально об экологии. МК «Огород в пластиковой бутылке» — возможно ли это?",
    "День 5: 2 в 1 — фуд-блогинг и фуд-фото. Готовим, снимаем видео и фотографируем",
    "День 6: Знакомимся с нейросетями, создаём чат-бот",
    "День 7: Красота и стиль. Создаём неоновую вывеску",
    "День 8: Элитная парфюмерия. Секреты. Создаём сухие духи",
    "День 9: Легко ли быть дизайнером? Создаём макет термонаклейки и переводим на футболку",
    "День 10: Кто лучшие кондитеры? Десерт «Корзиночка из песочного теста с кремом маскарпоне»"
  ]},
  { id: 5, name: "Есть ли жизнь на Марсе?", emoji: "🪐", dates: "27 июля – 7 августа", age: "10–14 лет", spots: 5, color: "from-[#4ECDC4] to-[#38b2ab]", lightColor: "bg-[#E6FAFA]", borderColor: "border-[#B2EBE8]", days: [] },
  { id: 6, name: "Кругосветка", emoji: "🌍", dates: "10–21 августа", age: "7–10 лет", spots: 9, color: "from-[#FFE66D] to-[#FFD43B]", lightColor: "bg-[#FFFBE6]", borderColor: "border-[#FFE680]", days: [] },
  { id: 7, name: "Лаборатория чудес", emoji: "🔬", dates: "24–28 августа", age: "7–12 лет", spots: 10, color: "from-[#FF6B6B] to-[#E84444]", lightColor: "bg-[#FFF0F0]", borderColor: "border-[#FFD6D6]", days: [] },
];

const TESTIMONIALS = [
  { text: "Сын вернулся и неделю рассказывал про поход!", author: "Анна", child: "мама Артёма, 9 лет", emoji: "💙" },
  { text: "Дочка попросилась на вторую смену!", author: "Ольга", child: "мама Софии, 7 лет", emoji: "💛" },
  { text: "Первый раз отпустила одна — не пожалела ни на секунду!", author: "Марина", child: "мама Миши, 11 лет", emoji: "💚" },
  { text: "Ребёнок перестал сидеть в телефоне, появились друзья!", author: "Светлана", child: "мама Кати, 10 лет", emoji: "🧡" },
];

// ── таймер до 15 мая 2026 ─────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function Index() {
  const deadline = new Date("2026-05-15T23:59:00");
  const countdown = useCountdown(deadline);

  const [selectedShift, setSelectedShift] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", comment: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bookingRef = useRef<HTMLDivElement>(null);

  const { createPayment } = useRobokassa({
    apiUrl: func2url["robokassa-robokassa"],
    onError: (err) => alert("Ошибка оплаты: " + err.message),
  });

  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  const shiftObj = SHIFTS.find((s) => s.id === selectedShift);
  const PRICE_FULL = 12500;
  const PRICE_SALE = 11000;
  const afterDiscount = countdown.days > 0 || countdown.hours > 0;

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Введите имя ребёнка";
    if (!form.age.trim()) errs.age = "Введите возраст";
    if (!isValidPhone(form.phone)) errs.phone = "Введите корректный телефон";
    if (!isValidEmail(form.email)) errs.email = "Введите корректный email";
    if (!selectedShift) errs.shift = "Выберите смену";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    setIsSubmitting(true);
    try {
      const price = afterDiscount ? PRICE_SALE : PRICE_FULL;
      const data = await createPayment({
        amount: price,
        userName: form.name,
        userEmail: form.email,
        userPhone: form.phone,
        orderComment: `Смена: ${shiftObj?.name}. Возраст: ${form.age}. ${form.comment}`,
        cartItems: [{ id: String(selectedShift), name: `Смена ${shiftObj?.name}`, price, quantity: 1 }],
      });
      openPaymentPage(data.payment_url);
      setSubmitted(true);
    } catch {
      /* handled by onError */
    } finally {
      setIsSubmitting(false);
    }
  };

  // reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("opacity-100", "translate-y-0"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const TimerBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-2xl px-4 py-3 min-w-[70px]">
      <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-white/80 font-semibold mt-1">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen" style={{background: "#fdf6ef"}}>

      {/* ── ШАПКА ─────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm" style={{background: "rgba(234,89,42,0.95)"}}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐟</span>
            <span className="font-black text-white text-lg leading-tight hidden sm:block" style={{fontFamily:"'Fredoka One', cursive"}}>Рыбка Долли</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <a href="tel:+79881521698" className="flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-[#FFD93D] transition-colors">
              <Icon name="Phone" size={15} />
              <span className="hidden sm:inline">+7 988 152-16-98</span>
              <span className="sm:hidden">МТС</span>
            </a>
            <a href="tel:+79787120353" className="flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-[#FFD93D] transition-colors">
              <Icon name="Phone" size={15} />
              <span className="hidden sm:inline">+7 978 712-03-53</span>
              <span className="sm:hidden">Волна</span>
            </a>
            <a
              href="https://vk.com/app6379730_-179759189#l=8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#fff7ee] text-[#ea592a] text-sm font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.305.585-1.496c.596-.188 1.361 1.26 2.174 1.815.614.418 1.08.326 1.08.326l2.17-.03s1.135-.071.597-1.002c-.044-.076-.312-.681-1.608-1.927-1.356-1.303-1.173-1.093.459-3.348.997-1.384 1.395-2.228 1.269-2.588-.12-.344-.876-.253-.876-.253l-2.443.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.386 1.077-.901 1.991c-1.085 1.923-1.52 2.025-1.698 1.905-.413-.274-.31-1.112-.31-1.705 0-1.854.273-2.628-.537-2.824-.27-.067-.468-.111-1.158-.118-.885-.009-1.633.003-2.057.218-.282.144-.499.463-.367.48.163.022.532.103.727.378.252.352.243 1.143.243 1.143s.145 2.186-.338 2.453c-.331.181-.786-.188-1.761-1.876-.5-.896-.878-1.888-.878-1.888s-.072-.177-.202-.272c-.157-.115-.376-.151-.376-.151l-2.322.015s-.348.01-.476.166c-.114.139-.009.427-.009.427s1.816 4.424 3.872 6.651c1.885 2.042 4.026 1.907 4.026 1.907h.97z"/></svg>
              ВКонтакте
            </a>
          </div>
        </div>
      </header>

      {/* ── БЛОК 1: HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Тёплый кремово-персиковый фон */}
        <div className="absolute inset-0" style={{background: "linear-gradient(160deg, #fff7ee 0%, #fde8d0 30%, #fcd4b0 60%, #fde8d0 80%, #fff7ee 100%)"}} />
        {/* декоративные элементы */}
        <div className="absolute top-24 left-8 w-32 h-32 rounded-full opacity-30 animate-float" style={{background:"#ea592a"}} />
        <div className="absolute top-40 right-12 w-20 h-20 rounded-full opacity-25 animate-float delay-300" style={{background:"#FFD93D"}} />
        <div className="absolute bottom-52 left-16 w-24 h-24 rounded-full opacity-20 animate-float delay-500" style={{background:"#3dbfb8"}} />
        <div className="absolute bottom-32 right-8 w-14 h-14 rounded-full opacity-25 animate-float delay-200" style={{background:"#f7c59f"}} />
        <div className="absolute top-32 left-1/3 text-3xl animate-float delay-400 opacity-50">🕊️</div>
        <div className="absolute top-20 right-1/4 text-2xl animate-float delay-100 opacity-40">🕊️</div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-16">
          {/* лейбл */}
          <div className="inline-flex items-center gap-2 text-white font-bold px-5 py-2 rounded-full text-sm mb-6 animate-bounce-slow" style={{background:"#ea592a"}}>
            🌊 Керчь · Городской летний клуб · Для детей 7–14 лет
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4" style={{fontFamily:"'Fredoka One', cursive"}}>
            <span style={{color:"#ea592a"}}>🐟 Рыбка Долли</span>
            <br />
            <span style={{background:"linear-gradient(135deg, #ea592a 0%, #f7843a 50%, #FFD93D 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"brightness(0.92)"}}>Лето 2026</span>
          </h1>

          <p className="text-xl md:text-2xl font-bold mb-4" style={{color:"#3d2c1e"}}>
            🌊 Море · 🎨 Творчество · ⛺ Походы · 🎭 Квесты
          </p>

          <p className="text-lg mb-8 max-w-2xl mx-auto font-semibold" style={{color:"#6b4c38"}}>
            Авторские смены, где дети становятся самостоятельнее, находят друзей
            и возвращаются окрылёнными!
          </p>

          {/* Акция */}
          <div className="rounded-3xl p-6 mb-8 max-w-2xl mx-auto border" style={{background:"rgba(234,89,42,0.9)", backdropFilter:"blur(12px)", borderColor:"rgba(255,255,255,0.3)"}}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">⏰</span>
              <span className="font-black text-xl text-white" style={{fontFamily:"'Fredoka One', cursive"}}>АКЦИЯ ДО 15 МАЯ — СКИДКА 12%!</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <TimerBlock value={countdown.days} label="ДНЕЙ" />
              <span className="text-white/60 text-2xl font-bold">:</span>
              <TimerBlock value={countdown.hours} label="ЧАСОВ" />
              <span className="text-white/60 text-2xl font-bold">:</span>
              <TimerBlock value={countdown.minutes} label="МИНУТ" />
              <span className="text-white/60 text-2xl font-bold">:</span>
              <TimerBlock value={countdown.seconds} label="СЕКУНД" />
            </div>
            <p className="text-white/90 text-sm">
              Осталось мест: <span className="text-[#FFD93D] font-black text-lg">45</span> из 70
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToBooking}
              className="font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105"
              style={{background:"linear-gradient(135deg, #ea592a 0%, #FFD93D 100%)", color:"#fff"}}
            >
              🎉 Забронировать со скидкой 12%
            </button>
            <a
              href="#about"
              className="font-bold text-lg px-8 py-4 rounded-2xl border-2 transition-all hover:scale-105"
              style={{background:"rgba(255,255,255,0.6)", backdropFilter:"blur(8px)", color:"#ea592a", borderColor:"#ea592a"}}
            >
              Смотреть программу смен
            </a>
          </div>
          <p className="text-sm mt-4 font-semibold" style={{color:"#8a5a3a"}}>Раннее бронирование — оплата онлайн, место гарантировано!</p>
        </div>

        {/* волны */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fdf6ef"/>
          </svg>
        </div>
      </section>

      {/* ── БЛОК 2: ДОВЕРИЕ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"#fdf6ef"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm mb-4" style={{background:"linear-gradient(135deg,#ea592a,#FFD93D)", color:"#fff"}}>
              ⚡ Уже забронировали 25 семей
            </div>
            <h2 className="text-3xl md:text-4xl font-black" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>Что говорят родители?</h2>
          </div>

          {/* отзывы */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100 summer-card">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#E6FAFA] flex items-center justify-center text-2xl flex-shrink-0">
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
          <div className="bg-white rounded-3xl p-6 shadow-sm" style={{border:"1px solid #f7c59f"}}>
            <p className="text-center font-black text-lg mb-4" style={{color:"#ea592a"}}>🔥 Мест становится меньше каждый день!</p>
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
                    <span className={`font-black text-lg ${s.spots <= 5 ? "text-red-500" : "text-[#4ECDC4]"}`}>{s.spots}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <button onClick={scrollToBooking} className="text-white font-black px-8 py-3 rounded-2xl shadow-md transition-all hover:scale-105" style={{background:"linear-gradient(135deg, #EA592A 0%, #FFD93D 100%)"}}>
                Забронировать место сейчас →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── БЛОК 3: ЧТО ТАКОЕ РЫБКА ДОЛЛИ ───────────────────────────────────── */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>Что такое наши летние смены?</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{color:"#6b4c38", opacity:0.9}}>
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
              <div key={i} className="rounded-2xl p-5 summer-card text-center" style={{background:"linear-gradient(135deg, #fff7ee 0%, #fde8d0 100%)", border:"1px solid #f7c59f"}}>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-black mb-1" style={{color:"#2a1a0e"}}>{item.title}</h3>
                <p className="text-sm" style={{color:"#8a5a3a"}}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* видео-заглушка */}
          <div className="rounded-3xl p-10 text-center border-2 border-dashed" style={{background:"linear-gradient(135deg,#fff7ee,#fde8d0)", borderColor:"#f7c59f"}}>
            <div className="text-6xl mb-4">📹</div>
            <h3 className="font-black text-warm-800 text-xl mb-2">Смотрите, как это было в прошлом году</h3>
            <p className="text-warm-600 mb-4">Видео с прошлых смен — дети плавают, готовят на костре, смеются у палатки</p>
            <p className="text-sm text-[#4ECDC4] font-semibold">Вставьте ссылку на видео с ВКонтакте или YouTube</p>
          </div>
        </div>
      </section>

      {/* ── ТЁМНО-СИНИЙ БЛОК — КАК НА КАРТИНКЕ ───────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg, #ea592a 0%, #d44a1e 40%, #c03d14 100%)"}} />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #FFD93D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff7ee 0%, transparent 40%)"}} />
        <div className="absolute top-6 right-12 text-5xl opacity-30 animate-float">⭐</div>
        <div className="absolute bottom-8 left-16 text-3xl opacity-20 animate-float delay-300">✦</div>
        <div className="absolute top-12 left-1/3 text-2xl opacity-15 animate-float delay-200">✦</div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-7xl md:text-9xl font-black block mb-2 leading-none" style={{fontFamily:"'Fredoka One', cursive", background:"linear-gradient(135deg, #fff7ee 0%, #FFD93D 40%, #ffffff 80%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>
              РЫБКА ДОЛЛИ
            </span>
            <span className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-white/80 block" style={{fontFamily:"'Fredoka One', cursive"}}>
              ДЕТСКИЙ КЛУБ
            </span>
          </div>
          <div className="flex justify-center gap-2 mb-8">
            <span className="text-2xl text-white/60">★</span>
            <span className="text-2xl text-[#FFD93D]">★</span>
            <span className="text-2xl text-white/60">★</span>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-semibold">
            Лето 2026 в Керчи — это море, песок, изумрудная трава и столько радости, что хватит на весь год!
          </p>
          <button
            onClick={scrollToBooking}
            className="inline-block font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
            style={{background:"linear-gradient(135deg, #EA592A 0%, #FFD93D 100%)", color:"#fff"}}
          >
            🌊 Забронировать место на лето
          </button>
        </div>
      </section>

      {/* ── БЛОК 4: ДЛЯ КОГО ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #fdf6ef 0%, #fde8d0 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>Рыбка Долли — это для вашего ребёнка, если:</h2>
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
              <div key={i} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm summer-card" style={{border:"1px solid #f7c59f"}}>
                <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                <div>
                  <p className="font-bold" style={{color:"#2a1a0e"}}>✅ {item.text}</p>
                  <p className="text-sm mt-0.5" style={{color:"#8a5a3a"}}>→ {item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl p-6 text-white text-center" style={{background:"linear-gradient(135deg, #ea592a 0%, #f7843a 100%)"}}>
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
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>Программа смен (10 дней)</h2>
            <p style={{color:"#8a5a3a"}}>Каждая смена — отдельная история с уникальной темой!</p>
          </div>
          <div className="space-y-3">
            {SHIFTS.map((shift) => (
              <div key={shift.id} className="rounded-2xl overflow-hidden shadow-sm" style={{border:"1px solid #f7c59f"}}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === shift.id ? null : shift.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-black hover:opacity-90 transition-opacity"
                  style={{background:"linear-gradient(135deg, #ea592a 0%, #f7843a 100%)"}}>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{shift.emoji}</span>
                    <div>
                      <div className="text-lg">Смена {shift.id}: «{shift.name}»</div>
                      <div className="text-sm font-normal opacity-80">{shift.dates} · {shift.age} · Осталось {shift.spots} мест</div>
                    </div>
                  </div>
                  <Icon name={openAccordion === shift.id ? "ChevronUp" : "ChevronDown"} size={20} />
                </button>
                {openAccordion === shift.id && (
                  <div className="p-5" style={{background:"linear-gradient(135deg, #fff7ee 0%, #fde8d0 100%)"}}>
                    {shift.days.length > 0 ? (
                      <ol className="space-y-2">
                        {shift.days.map((day, i) => (
                          <li key={i} className="flex gap-3 text-sm" style={{color:"#3d2c1e"}}>
                            <span className="font-black flex-shrink-0" style={{color:"#ea592a"}}>{i + 1}.</span>
                            <span>{day}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-sm italic" style={{color:"#8a5a3a"}}>Подробная программа скоро появится. Следите за обновлениями в ВКонтакте!</p>
                    )}
                    <button
                      onClick={() => { setSelectedShift(shift.id); scrollToBooking(); }}
                      className="mt-4 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105"
                      style={{background:"linear-gradient(135deg, #ea592a 0%, #f7843a 100%)"}}
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
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #fdf6ef 0%, #fde8d0 100%)"}}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>Как проходит день в клубе?</h2>
            <p style={{color:"#8a5a3a"}}>Каждая минута продумана — дети под контролем и в движении!</p>
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 z-10" style={{background:"linear-gradient(135deg,#ea592a,#f7843a)"}}>
                    {item.emoji}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 flex-1 shadow-sm mb-2" style={{border:"1px solid #f7c59f"}}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-sm" style={{color:"#ea592a"}}>{item.time}</span>
                    <span className="font-bold" style={{color:"#2a1a0e"}}>{item.title}</span>
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
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>Наша команда</h2>
          <p className="mb-10" style={{color:"#8a5a3a"}}>Педагоги-профессионалы, а не «студенты-аниматоры»</p>
          <div className="rounded-3xl p-10 border-2 border-dashed" style={{background:"linear-gradient(135deg,#fff7ee,#fde8d0)", borderColor:"#f7c59f"}}>
            <div className="text-5xl mb-4">👩‍🏫</div>
            <p className="text-warm-700 text-lg font-semibold">Здесь появятся фото и рассказы о вожатых</p>
            <p className="text-sm text-warm-500 mt-2">Добавьте реальные фотографии команды — это вызывает доверие родителей!</p>
          </div>
        </div>
      </section>

      {/* ── БЛОК 8: БЕЗОПАСНОСТЬ ──────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #fdf6ef 0%, #fde8d0 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>🛡️ Безопасность — наш приоритет №1</h2>
            <p style={{color:"#8a5a3a"}}>Что мы делаем, чтобы вы были спокойны:</p>
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
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm summer-card text-center" style={{border:"1px solid #f7c59f"}}>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-black mb-1" style={{color:"#2a1a0e"}}>{item.title}</h3>
                <p className="text-sm" style={{color:"#8a5a3a"}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 9: ПИТАНИЕ ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>🍜 Чем кормим?</h2>
            <p style={{color:"#8a5a3a"}}>Вкусно, сытно и по-домашнему!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                day: "🗓️ Среда", color: "from-[#ea592a] to-[#f7843a]",
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
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm" style={{border:"1px solid #f7c59f"}}>
                <div className={`bg-gradient-to-r ${menu.color} font-black text-xl p-4 text-white`}>{menu.day}</div>
                <div className="p-5 space-y-4">
                  {menu.meals.map((meal, j) => (
                    <div key={j}>
                      <p className="font-bold mb-2" style={{color:"#2a1a0e"}}>{meal.type}</p>
                      <ul className="space-y-1">
                        {meal.items.map((item, k) => (
                          <li key={k} className="text-sm flex gap-2" style={{color:"#3d2c1e"}}>
                            <span style={{color:"#ea592a"}}>✓</span> {item}
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
      <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #fdf6ef 0%, #fde8d0 100%)"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#2a1a0e"}}>⭐ Что говорят дети и родители?</h2>
          </div>

          {/* видео-отзывы заглушка */}
          <div className="bg-white rounded-3xl p-8 mb-6 text-center shadow-sm" style={{border:"1px solid #f7c59f"}}>
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="font-black text-xl mb-2" style={{color:"#2a1a0e"}}>Видео-отзывы детей</h3>
            <p style={{color:"#8a5a3a"}}>Сюда добавьте 3–4 коротких видео с отзывами детей (30–60 сек)</p>
          </div>

          {/* фото-отзывы заглушка */}
          <div className="bg-white rounded-3xl p-8 mb-6 text-center shadow-sm" style={{border:"1px solid #ea592a"}}>
            <div className="text-5xl mb-4">📱</div>
            <h3 className="font-black text-xl mb-2" style={{color:"#2a1a0e"}}>Отзывы родителей</h3>
            <p style={{color:"#8a5a3a"}}>Добавьте скриншоты переписок, скриншоты из ВКонтакте со звёздочками 5/5</p>
          </div>

          <div className="text-center">
            <a
              href="https://vk.com/app6379730_-179759189#l=8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-black px-8 py-4 rounded-2xl transition-all hover:scale-105"
              style={{background:"linear-gradient(135deg,#ea592a,#f7843a)"}}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.305.585-1.496c.596-.188 1.361 1.26 2.174 1.815.614.418 1.08.326 1.08.326l2.17-.03s1.135-.071.597-1.002c-.044-.076-.312-.681-1.608-1.927-1.356-1.303-1.173-1.093.459-3.348.997-1.384 1.395-2.228 1.269-2.588-.12-.344-.876-.253-.876-.253l-2.443.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.386 1.077-.901 1.991c-1.085 1.923-1.52 2.025-1.698 1.905-.413-.274-.31-1.112-.31-1.705 0-1.854.273-2.628-.537-2.824-.27-.067-.468-.111-1.158-.118-.885-.009-1.633.003-2.057.218-.282.144-.499.463-.367.48.163.022.532.103.727.378.252.352.243 1.143.243 1.143s.145 2.186-.338 2.453c-.331.181-.786-.188-1.761-1.876-.5-.896-.878-1.888-.878-1.888s-.072-.177-.202-.272c-.157-.115-.376-.151-.376-.151l-2.322.015s-.348.01-.476.166c-.114.139-.009.427-.009.427s1.816 4.424 3.872 6.651c1.885 2.042 4.026 1.907 4.026 1.907h.97z"/></svg>
              Читать все отзывы ВКонтакте
            </a>
          </div>
        </div>
      </section>

      {/* ── БЛОК 12: ЦЕНЫ + ФОРМА ─────────────────────────────────────────────── */}
      <section ref={bookingRef} className="py-16 px-4" style={{background:"linear-gradient(135deg, #ea592a 0%, #d44a1e 50%, #c03d14 100%)"}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-2" style={{fontFamily:"'Baloo 2', cursive"}}>💰 Стоимость смены (10 дней)</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
              <span className="line-through text-white/60 text-2xl">{PRICE_FULL.toLocaleString()} ₽</span>
              <span className="font-black text-3xl px-4 py-1 rounded-xl" style={{background:"linear-gradient(135deg,#FFD93D,#fff7ee)", color:"#2a1a0e"}}>
                {afterDiscount ? PRICE_SALE.toLocaleString() : PRICE_FULL.toLocaleString()} ₽
              </span>
              {afterDiscount && <span className="font-black px-3 py-1 rounded-full text-sm" style={{background:"#FFD93D", color:"#2a1a0e"}}>−12% до 15 мая</span>}
            </div>

            {/* что включено */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto text-left mb-6">
              {["✅ 2-разовое питание", "✅ Все мастер-классы", "✅ Поездки на море", "✅ Походы с костром", "✅ Фото и видео каждый день", "✅ Доступ в родительский чат"].map((item, i) => (
                <div key={i} className="rounded-xl px-3 py-2 text-sm text-white font-semibold" style={{background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)"}}>{item}</div>
              ))}
            </div>

            {/* таймер */}
            {afterDiscount && (
              <div className="mb-6">
                <p className="font-bold mb-3 text-[#FFD93D]">⏰ До конца акции осталось:</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <TimerBlock value={countdown.days} label="ДНЕЙ" />
                  <span className="text-white/60 text-2xl font-bold">:</span>
                  <TimerBlock value={countdown.hours} label="ЧАСОВ" />
                  <span className="text-white/60 text-2xl font-bold">:</span>
                  <TimerBlock value={countdown.minutes} label="МИНУТ" />
                </div>
              </div>
            )}
          </div>

          {/* форма */}
          {submitted ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-black text-warm-900 mb-2">Оплата принята!</h3>
              <p className="text-warm-700 mb-6">Мы свяжемся с вами в ближайшее время. Спасибо, что выбрали Рыбку Долли!</p>
              <button onClick={() => setSubmitted(false)} className="text-sky-600 font-bold underline">Записать ещё одного ребёнка</button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="font-black text-xl mb-5 text-center" style={{fontFamily:"'Baloo 2',cursive", color:"#ea592a"}}>💳 Оплата онлайн — место гарантировано!</h3>

              {/* выбор смены */}
              <div className="mb-5">
                <label className="font-bold text-warm-800 block mb-3">Выберите смену:</label>
                <div className="grid grid-cols-1 gap-2">
                  {SHIFTS.map((s) => (
                    <label key={s.id} className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all" style={{borderColor: selectedShift === s.id ? "#ea592a" : "#f7c59f", background: selectedShift === s.id ? "#fff7ee" : "white"}}>
                      <input type="radio" name="shift" className="accent-[#ea592a]" checked={selectedShift === s.id} onChange={() => setSelectedShift(s.id)} />
                      <span className="text-xl">{s.emoji}</span>
                      <div className="flex-1">
                        <span className="font-bold" style={{color:"#2a1a0e"}}>Смена {s.id}: «{s.name}»</span>
                        <span className="text-xs ml-2" style={{color:"#8a5a3a"}}>{s.dates} · {s.age}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.spots <= 5 ? "bg-red-100 text-red-600" : "bg-[#fff7ee] text-[#ea592a]"}`}>
                        {s.spots} мест
                      </span>
                    </label>
                  ))}
                </div>
                {formErrors.shift && <p className="text-red-500 text-sm mt-1">{formErrors.shift}</p>}
              </div>

              {/* квиз-кнопка */}
              <div className="rounded-2xl p-4 mb-5 text-center" style={{background:"linear-gradient(135deg,#fffde7,#fff8c4)", border:"2px solid #FFD93D"}}>
                <p className="font-bold mb-2" style={{color:"#0d4f6e"}}>😵 Глаза разбегаются? Не знаешь какую смену выбрать?</p>
                <a
                  href="https://vk.com/app6379730_-179759189#l=8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-black px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md"
                  style={{background:"linear-gradient(135deg,#FFD93D,#FF9A3C)", color:"#0d4f6e"}}
                >
                  🎯 Пройти квиз «Какая смена подойдёт моему ребёнку?»
                </a>
                <p className="text-xs text-warm-600 mt-2">Создан профессионалами — точно подскажет!</p>
              </div>

              {/* поля формы */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-bold block mb-1 text-sm" style={{color:"#0d4f6e"}}>Имя ребёнка *</label>
                    <input
                      className="summer-input"
                      placeholder="Артём"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-sm" style={{color:"#0d4f6e"}}>Возраст *</label>
                    <input
                      className="summer-input"
                      placeholder="9"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                    />
                    {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-sm" style={{color:"#0d4f6e"}}>Ваш телефон *</label>
                    <input
                      className="summer-input"
                      placeholder="+7 988 152-16-98"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-sm" style={{color:"#0d4f6e"}}>Email *</label>
                    <input
                      className="summer-input"
                      type="email"
                      placeholder="mama@mail.ru"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                <div className="mb-5">
                  <label className="font-bold block mb-1 text-sm" style={{color:"#0d4f6e"}}>Комментарий (необязательно)</label>
                  <textarea
                    className="summer-input resize-none"
                    rows={2}
                    placeholder="Особые пожелания или вопросы..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  />
                </div>

                {selectedShift && (
                  <div className="rounded-2xl p-4 mb-5 flex items-center justify-between flex-wrap gap-2" style={{background:"linear-gradient(135deg,#fff7ee,#fde8d0)", border:"1px solid #f7c59f"}}>
                    <div>
                      <p className="font-bold" style={{color:"#2a1a0e"}}>Смена: «{shiftObj?.name}»</p>
                      <p className="text-sm" style={{color:"#8a5a3a"}}>{shiftObj?.dates} · {shiftObj?.age}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-2xl" style={{color:"#ea592a"}}>
                        {(afterDiscount ? PRICE_SALE : PRICE_FULL).toLocaleString()} ₽
                      </p>
                      {afterDiscount && <p className="text-xs font-bold" style={{color:"#ea592a"}}>Скидка 12% — до 15 мая!</p>}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full disabled:opacity-50 text-white font-black text-xl py-4 rounded-2xl shadow-lg transition-all hover:scale-105"
                  style={{background:"linear-gradient(135deg, #EA592A 0%, #FFD93D 100%)"}}
                >
                  {isSubmitting ? "⏳ Создаём заказ..." : "💳 Оплатить и забронировать место"}
                </button>
                <p className="text-center text-xs mt-3" style={{color:"#6b9aaa"}}>
                  Нажимая кнопку, вы соглашаетесь с <a href="/oferta" className="underline">публичной офертой</a>.
                  Оплата через Robokassa — безопасно и надёжно.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── ФУТЕР ─────────────────────────────────────────────────────────────── */}
      <footer className="text-white py-8 px-4" style={{background:"linear-gradient(135deg, #c03d14 0%, #ea592a 100%)"}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🐟</span>
            <span className="font-black text-xl" style={{fontFamily:"'Fredoka One',cursive"}}>Рыбка Долли</span>
          </div>
          <p className="text-sm mb-3" style={{color:"rgba(255,255,255,0.8)"}}>г. Керчь, ул. Циолковского, 12</p>
          <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
            <a href="tel:+79881521698" className="font-semibold text-[#FFD93D]">+7 988 152-16-98 (МТС)</a>
            <a href="tel:+79787120353" className="font-semibold text-[#FFD93D]">+7 978 712-03-53 (Волна)</a>
          </div>
          <a
            href="https://vk.com/app6379730_-179759189#l=8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm transition-all mb-4 hover:scale-105"
            style={{background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.4)", color:"white"}}
          >
            ВКонтакте
          </a>
          <p className="text-xs" style={{color:"rgba(255,255,255,0.6)"}}>
            © 2026 Летний клуб «Рыбка Долли» · <a href="/oferta" className="underline">Публичная оферта</a>
          </p>
        </div>
      </footer>
    </div>
  );
}