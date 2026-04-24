import { useState, useEffect, useRef } from "react";
import { useRobokassa, openPaymentPage, isValidEmail, isValidPhone } from "@/components/extensions/robokassa/useRobokassa";
import func2url from "../../backend/func2url.json";
import { useCountdown, SHIFTS, PRICE_SALE, PRICE_FULL } from "@/components/camp/CampData";
import CampHero from "@/components/camp/CampHero";
import CampProgram from "@/components/camp/CampProgram";
import CampBooking from "@/components/camp/CampBooking";

export default function Index() {
  const deadline = new Date("2026-05-15T23:59:00");
  const countdown = useCountdown(deadline);

  const [selectedShift, setSelectedShift] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", comment: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bookingRef = useRef<HTMLDivElement>(null);

  const { createPayment } = useRobokassa({
    apiUrl: func2url["robokassa-robokassa"],
    onError: (err) => alert("Ошибка оплаты: " + err.message),
  });

  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  const shiftObj = SHIFTS.find((s) => s.id === selectedShift);
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

  return (
    <div className="min-h-screen" style={{background: "#FFF8F0"}}>
      <CampHero scrollToBooking={scrollToBooking} />
      <CampProgram
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
        scrollToBooking={scrollToBooking}
        setSelectedShift={setSelectedShift}
      />
      <CampBooking
        bookingRef={bookingRef}
        selectedShift={selectedShift}
        setSelectedShift={setSelectedShift}
        form={form}
        setForm={setForm}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        isSubmitting={isSubmitting}
        submitted={submitted}
        setSubmitted={setSubmitted}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
