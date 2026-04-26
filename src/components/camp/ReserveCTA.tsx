import { useEffect, useState } from "react";
import { SHIFTS } from "./CampData";

interface ReserveCTAProps {
  defaultShiftId?: number | null;
}

const SHIFT_ACCUSATIVE: Record<number, string> = {
  1: "«Сундук со сказками»",
  2: "«Вкусные открытия»",
  3: "«Мульти-драйв»",
  4: "«Поколение АЛЬФА»",
  5: "«Есть ли жизнь на Марсе?»",
  6: "«Кругосветку»",
  7: "«Лабораторию чудес»",
};
import {
  useRobokassa,
  openPaymentPage,
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
} from "@/components/extensions/robokassa/useRobokassa";
import func2url from "../../../backend/func2url.json";

const RESERVATION_AMOUNT = 1000;

export default function ReserveCTA({ defaultShiftId = null }: ReserveCTAProps = {}) {
  const [open, setOpen] = useState(false);
  const [motherName, setMotherName] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [shiftId, setShiftId] = useState<number | null>(defaultShiftId);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultShiftId) setShiftId(defaultShiftId);
  }, [defaultShiftId]);

  const ctaShiftName = defaultShiftId ? SHIFT_ACCUSATIVE[defaultShiftId] : null;

  const { createPayment } = useRobokassa({
    apiUrl: func2url["robokassa-robokassa"],
    onError: (err) => alert("Ошибка оплаты: " + err.message),
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!motherName.trim()) errs.motherName = "Введите имя мамы";
    if (!isValidPhone(phone)) errs.phone = "Введите корректный телефон";
    if (!childName.trim()) errs.childName = "Введите имя ребёнка";
    if (!age.trim()) errs.age = "Введите возраст";
    if (!shiftId) errs.shift = "Выберите смену";
    if (email && !isValidEmail(email)) errs.email = "Некорректный email";
    return errs;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const shift = SHIFTS.find((s) => s.id === shiftId);
      const userEmail = email.trim() || "noreply@rybka-dolly.ru";
      const data = await createPayment({
        amount: RESERVATION_AMOUNT,
        userName: motherName,
        userEmail,
        userPhone: phone,
        orderComment: `БРОНЬ. Мама: ${motherName}. Ребёнок: ${childName}, ${age} лет. Смена №${shiftId}${shift ? ` (${shift.name})` : ""}.`,
        cartItems: [
          {
            id: `reserve-${shiftId}`,
            name: `Бронирование места на смену №${shiftId}`,
            price: RESERVATION_AMOUNT,
            quantity: 1,
          },
        ],
      });
      openPaymentPage(data.payment_url);
    } catch {
      /* onError handled */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mt-3 flex flex-col items-center">
        <button
          onClick={() => setOpen(true)}
          className="rainbow-cta group relative font-black text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl text-sm md:text-base transition-transform hover:scale-[1.03] active:scale-[0.98] w-full max-w-md"
          style={{
            background:
              "linear-gradient(90deg, #FF3D8B, #FF9A56, #FFD93D, #00C9A7, #6C5CE7, #FF3D8B)",
            backgroundSize: "300% 100%",
            boxShadow:
              "0 6px 0 rgba(204,63,11,0.4), 0 10px 24px rgba(255,94,26,0.4), 0 2px 0 rgba(255,255,255,0.3) inset",
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}
        >
          <span className="inline-flex items-center gap-2 justify-center flex-wrap">
            <span className="text-lg">🎉</span>
            <span>{ctaShiftName ? `Забронировать ${ctaShiftName} — место будет ваше` : "Оплати — и место в смене гарантированно ваше"}</span>
          </span>
        </button>
        <p className="text-xs md:text-sm mt-2 font-semibold text-center" style={{ color: "rgba(61,61,61,0.65)" }}>
          Предоплата брони — всего 1 000 ₽ · остаток оплачиваете в первый день смены
        </p>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(30,20,10,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white overflow-hidden max-h-[92vh] overflow-y-auto"
            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-5 py-4 md:px-6 md:py-5 text-white relative"
              style={{
                background:
                  "linear-gradient(135deg, #FF3D8B 0%, #FF9A56 50%, #FFD93D 100%)",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 transition-colors flex items-center justify-center text-white font-black text-xl"
                aria-label="Закрыть"
              >
                ×
              </button>
              <div className="font-black text-xl md:text-2xl leading-tight pr-10" style={{ fontFamily: "'Baloo 2', cursive" }}>
                🎉 Бронирование места
              </div>
              <div className="text-sm md:text-base mt-1 text-white/90 font-semibold">
                Предоплата {RESERVATION_AMOUNT.toLocaleString("ru-RU")} ₽ — остаток оплачиваете в первый день смены
              </div>
            </div>

            <form onSubmit={submit} className="p-5 md:p-6 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field
                  label="Имя мамы"
                  required
                  error={errors.motherName}
                  value={motherName}
                  onChange={setMotherName}
                  placeholder="Анна"
                />
                <Field
                  label="Телефон"
                  required
                  error={errors.phone}
                  value={phone}
                  onChange={(v) => setPhone(formatPhoneNumber(v))}
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field
                  label="Имя ребёнка"
                  required
                  error={errors.childName}
                  value={childName}
                  onChange={setChildName}
                  placeholder="Миша"
                />
                <Field
                  label="Возраст"
                  required
                  error={errors.age}
                  value={age}
                  onChange={setAge}
                  placeholder="9"
                  inputMode="numeric"
                />
              </div>

              <Field
                label="Email (для чека)"
                error={errors.email}
                value={email}
                onChange={setEmail}
                placeholder="mama@example.com"
                inputMode="email"
              />

              <div>
                <label className="text-sm font-bold block mb-2" style={{ color: "#3D3D3D" }}>
                  Выберите смену <span style={{ color: "#FF3D8B" }}>*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {SHIFTS.map((s) => {
                    const active = shiftId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setShiftId(s.id)}
                        className="aspect-square rounded-xl font-black text-lg transition-transform hover:scale-105"
                        style={{
                          background: active
                            ? "linear-gradient(135deg,#FF3D8B,#FF9A56)"
                            : "#FFF8F0",
                          color: active ? "white" : "#3D3D3D",
                          border: active ? "2px solid #FF3D8B" : "2px solid #FFE5D9",
                          boxShadow: active ? "0 6px 16px rgba(255,61,139,0.35)" : "none",
                        }}
                      >
                        {s.id}
                      </button>
                    );
                  })}
                </div>
                {errors.shift && (
                  <p className="text-xs font-bold mt-1" style={{ color: "#E64D12" }}>
                    {errors.shift}
                  </p>
                )}
                <p className="text-xs mt-2" style={{ color: "rgba(61,61,61,0.6)" }}>
                  Номера смен смотрите в блоке «Программа смен» выше
                </p>
              </div>

              <div
                className="rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3"
                style={{ background: "#FFF8F0", border: "2px dashed #FF9A56" }}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#FF9A56" }}>
                    К оплате сейчас
                  </div>
                  <div className="font-black text-2xl" style={{ color: "#3D3D3D" }}>
                    {RESERVATION_AMOUNT.toLocaleString("ru-RU")} ₽
                  </div>
                </div>
                <div className="text-xs text-right" style={{ color: "rgba(61,61,61,0.7)" }}>
                  Только бронь места.
                  <br />
                  Полную стоимость оплачиваете
                  <br />
                  в первый день смены.
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-black text-white py-4 rounded-2xl text-base md:text-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg,#00C9A7,#00A67E)",
                  boxShadow: "0 6px 0 #008F78, 0 10px 25px rgba(0,201,167,0.4)",
                }}
              >
                {isSubmitting ? "Переходим к оплате..." : `💳 Оплатить ${RESERVATION_AMOUNT.toLocaleString("ru-RU")} ₽ и забронировать`}
              </button>

              <p className="text-xs text-center" style={{ color: "rgba(61,61,61,0.55)" }}>
                Оплата через Robokassa — безопасно. Нажимая «Оплатить», вы соглашаетесь с условиями оферты.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold" style={{ color: "#3D3D3D" }}>
        {label} {required && <span style={{ color: "#FF3D8B" }}>*</span>}
      </span>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white outline-none"
        style={{ border: error ? "2px solid #E64D12" : "2px solid #FFE5D9" }}
      />
      {error && (
        <span className="text-xs font-bold mt-1 block" style={{ color: "#E64D12" }}>
          {error}
        </span>
      )}
    </label>
  );
}