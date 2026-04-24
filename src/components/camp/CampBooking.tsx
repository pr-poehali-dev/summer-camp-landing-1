import { useCountdown, SHIFTS, PRICE_FULL, PRICE_SALE } from "./CampData";
import { formatPhoneNumber, isValidEmail, isValidPhone } from "@/components/extensions/robokassa/useRobokassa";

interface CampBookingProps {
  bookingRef: React.RefObject<HTMLDivElement>;
  selectedShift: number | null;
  setSelectedShift: (id: number) => void;
  form: { name: string; age: string; phone: string; email: string; comment: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; age: string; phone: string; email: string; comment: string }>>;
  formErrors: Record<string, string>;
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-2xl px-4 py-3 min-w-[70px]">
    <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs text-white/80 font-semibold mt-1">{label}</span>
  </div>
);

export default function CampBooking({
  bookingRef,
  selectedShift,
  setSelectedShift,
  form,
  setForm,
  formErrors,
  setFormErrors,
  isSubmitting,
  submitted,
  setSubmitted,
  handleSubmit,
}: CampBookingProps) {
  const deadline = new Date("2026-05-15T23:59:00");
  const countdown = useCountdown(deadline);
  const afterDiscount = countdown.days > 0 || countdown.hours > 0;
  const shiftObj = SHIFTS.find((s) => s.id === selectedShift);

  return (
    <>
      {/* ── БЛОК 12: ЦЕНЫ + ФОРМА ─────────────────────────────────────────────── */}
      <section ref={bookingRef} className="py-16 px-4" style={{background:"linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)"}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-2" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>💰 Стоимость смены (10 дней)</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
              <span className="line-through text-2xl" style={{color:"rgba(61,61,61,0.5)"}}>{PRICE_FULL.toLocaleString()} ₽</span>
              <span className="font-black text-4xl px-4 py-1 rounded-xl" style={{color:"#FF9A56", border:"4px solid #FFD93D", textShadow:"0 2px 8px rgba(255,154,86,0.3)"}}>
                {afterDiscount ? PRICE_SALE.toLocaleString() : PRICE_FULL.toLocaleString()} ₽
              </span>
              {afterDiscount && <span className="font-black px-3 py-1 rounded-full text-sm text-white" style={{background:"#FF9A56"}}>−12% до 15 мая</span>}
            </div>

            {/* что включено */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto text-left mb-6">
              {["✅ 2-разовое питание", "✅ Все мастер-классы", "✅ Поездки на море", "✅ Походы с костром", "✅ Фото и видео каждый день", "✅ Доступ в родительский чат"].map((item, i) => (
                <div key={i} className="rounded-xl px-3 py-2 text-sm font-semibold bg-white" style={{border:"2px solid #FFE5D9", color:"#3D3D3D"}}>{item}</div>
              ))}
            </div>

            {/* таймер */}
            {afterDiscount && (
              <div className="mb-6">
                <p className="font-bold mb-3" style={{color:"#FF9A56"}}>⏰ До конца акции осталось:</p>
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
              <h3 className="font-black text-xl mb-5 text-center" style={{fontFamily:"'Baloo 2',cursive", color:"#FF9A56"}}>💳 Оплата онлайн — место гарантировано!</h3>

              {/* выбор смены */}
              <div className="mb-5">
                <label className="font-bold text-warm-800 block mb-3">Выберите смену:</label>
                <div className="grid grid-cols-1 gap-2">
                  {SHIFTS.map((s) => (
                    <label key={s.id} className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all" style={{borderColor: selectedShift === s.id ? "#FF9A56" : "#FFE5D9", background: selectedShift === s.id ? "#FFF8F0" : "white"}}>
                      <input type="radio" name="shift" className="accent-[#FF9A56]" checked={selectedShift === s.id} onChange={() => setSelectedShift(s.id)} />
                      <span className="text-xl">{s.emoji}</span>
                      <div className="flex-1">
                        <span className="font-bold" style={{color:"#3D3D3D"}}>Смена {s.id}: «{s.name}»</span>
                        <span className="text-xs ml-2" style={{color:"rgba(61,61,61,0.6)"}}>{s.dates} · {s.age}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.spots <= 5 ? "bg-red-100 text-red-600" : "bg-[#FFF8F0] text-[#FF9A56]"}`}>
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
                  style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}
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
                  <div className="rounded-2xl p-4 mb-5 flex items-center justify-between flex-wrap gap-2" style={{background:"#FFF8F0", border:"2px solid #FFE5D9"}}>
                    <div>
                      <p className="font-bold" style={{color:"#3D3D3D"}}>Смена: «{shiftObj?.name}»</p>
                      <p className="text-sm" style={{color:"rgba(61,61,61,0.7)"}}>{shiftObj?.dates} · {shiftObj?.age}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-2xl" style={{color:"#FF9A56"}}>
                        {(afterDiscount ? PRICE_SALE : PRICE_FULL).toLocaleString()} ₽
                      </p>
                      {afterDiscount && <p className="text-xs font-bold" style={{color:"#00C9A7"}}>Скидка 12% — до 15 мая!</p>}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pay disabled:opacity-50 font-black text-xl"
                >
                  {isSubmitting ? "⏳ Создаём заказ..." : "💳 Оплатить и забронировать место"}
                </button>
                <p className="text-center text-xs mt-3" style={{color:"rgba(61,61,61,0.5)"}}>
                  Нажимая кнопку, вы соглашаетесь с <a href="/oferta" className="underline">публичной офертой</a>.
                  Оплата через Robokassa — безопасно и надёжно.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── ФУТЕР ─────────────────────────────────────────────────────────────── */}
      <footer className="text-white py-8 px-4" style={{background:"linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)"}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-black text-xl" style={{fontFamily:"'Fredoka One',cursive"}}>Рыбка Долли</span>
          </div>
          <p className="text-sm mb-3" style={{color:"rgba(255,255,255,0.6)"}}>г. Керчь, ул. Циолковского, 12</p>
          <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
            <a href="tel:+79881521698" className="font-semibold" style={{color:"#FFD93D"}}>+7 988 152-16-98 (МТС)</a>
            <a href="tel:+79787120353" className="font-semibold" style={{color:"#FFD93D"}}>+7 978 712-03-53 (Волна)</a>
          </div>
          <a
            href="https://vk.com/app6379730_-179759189#l=8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm transition-all mb-4 hover:scale-105"
            style={{background:"rgba(255,154,86,0.2)", border:"1px solid rgba(255,154,86,0.4)", color:"white"}}
          >
            ВКонтакте
          </a>
          <p className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>
            © 2026 Летний клуб «Рыбка Долли» · <a href="/oferta" className="underline">Публичная оферта</a>
          </p>
        </div>
      </footer>
    </>
  );
}