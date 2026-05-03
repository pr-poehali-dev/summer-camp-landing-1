import { useEffect, useRef, useState } from "react";
import { SHIFTS } from "./CampData";
import { ymGoal, ecommerceAddToCart } from "@/lib/ymGoal";
import {
  useRobokassa,
  openPaymentPage,
  isValidEmail,
  isValidPhone,
} from "@/components/extensions/robokassa/useRobokassa";
import func2url from "../../../backend/func2url.json";
import { RESERVATION_AMOUNT } from "./reserveCTAUtils";
import ReserveButton from "./ReserveButton";
import ReserveModalForm from "./ReserveModalForm";

interface ReserveCTAProps {
  defaultShiftId?: number | null;
}

export default function ReserveCTA({ defaultShiftId = null }: ReserveCTAProps = {}) {
  const [open, setOpen] = useState(false);
  const [motherName, setMotherName] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [shiftId, setShiftId] = useState<number | null>(defaultShiftId);
  const [earlyStart, setEarlyStart] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);
  const openedAtRef = useRef<number>(0);
  const formSnapshotRef = useRef({
    motherName: "",
    phone: "",
    childName: "",
    age: "",
    email: "",
    shiftId: null as number | null,
    earlyStart: false,
  });
  const abandonNotifiedRef = useRef(false);

  useEffect(() => {
    formSnapshotRef.current = {
      motherName,
      phone,
      childName,
      age,
      email,
      shiftId,
      earlyStart,
    };
  }, [motherName, phone, childName, age, email, shiftId, earlyStart]);

  useEffect(() => {
    if (defaultShiftId) setShiftId(defaultShiftId);
  }, [defaultShiftId]);

  useEffect(() => {
    const openByHash = () => {
      const h = window.location.hash.replace(/^#/, "").toLowerCase();
      if (h === "book" || h === "забронировать" || h === "broni" || h === "bron") {
        setOpen(true);
        ymGoal("reserve_cta_click", { shift_id: defaultShiftId ?? null, source: "anchor" });
      }
    };
    openByHash();
    window.addEventListener("hashchange", openByHash);
    return () => window.removeEventListener("hashchange", openByHash);
  }, [defaultShiftId]);

  const { createPayment } = useRobokassa({
    apiUrl: func2url["robokassa-robokassa"],
    onError: (err) => alert("Ошибка оплаты: " + err.message),
  });

  const sendAbandonNotification = () => {
    if (abandonNotifiedRef.current || submittedRef.current) return;
    const elapsed = Date.now() - openedAtRef.current;
    if (elapsed < 30000) return;
    const snap = formSnapshotRef.current;
    const filledCount = [
      snap.motherName,
      snap.phone,
      snap.childName,
      snap.age,
      snap.email,
    ].filter((v) => v && v.trim().length > 0).length;
    if (filledCount === 0 && !snap.shiftId) return;
    abandonNotifiedRef.current = true;
    const shift = SHIFTS.find((s) => s.id === snap.shiftId);
    try {
      const url = func2url["booking-notify"];
      const body = JSON.stringify({
        mother_name: snap.motherName || "(не указано)",
        phone: snap.phone || "(не указано)",
        child_name: snap.childName,
        age: snap.age,
        email: snap.email,
        shift_id: snap.shiftId,
        shift_name: shift?.name ?? "",
        early_start: snap.earlyStart,
        stage: "abandoned",
      });
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      } else {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
      ymGoal("reserve_form_abandoned", { shift_id: snap.shiftId, filled: filledCount });
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    if (!open) {
      if (window.location.hash === "#book") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      return;
    }
    submittedRef.current = false;
    abandonNotifiedRef.current = false;
    openedAtRef.current = Date.now();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onBeforeUnload = () => sendAbandonNotification();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") sendAbandonNotification();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", onVisibility);
      sendAbandonNotification();
    };
  }, [open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!motherName.trim()) errs.motherName = "Введите имя мамы";
    if (!isValidPhone(phone)) errs.phone = "Введите корректный телефон";
    if (!childName.trim()) errs.childName = "Введите имя ребёнка";
    if (!age.trim()) errs.age = "Введите возраст";
    if (!shiftId) errs.shift = "Выберите смену";
    if (!email.trim()) errs.email = "Введите email — на него придёт копия чека";
    else if (!isValidEmail(email)) errs.email = "Некорректный email";
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
    submittedRef.current = true;
    ymGoal("reserve_pay_submit", { shift_id: shiftId });
    try {
      const shift = SHIFTS.find((s) => s.id === shiftId);
      try {
        fetch(func2url["booking-notify"], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mother_name: motherName,
            phone,
            child_name: childName,
            age,
            email: email.trim(),
            shift_id: shiftId,
            shift_name: shift?.name ?? "",
            early_start: earlyStart,
            stage: "submit",
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* noop */
      }
      const productId = `reserve-shift-${shiftId}`;
      const productName = `Бронирование смены №${shiftId}${shift ? ` — ${shift.name}` : ""}`;
      ecommerceAddToCart([
        {
          id: productId,
          name: productName,
          price: RESERVATION_AMOUNT,
          quantity: 1,
          category: "Бронирование смены",
          brand: "Рыбка Долли",
        },
      ]);
      const data = await createPayment({
        amount: RESERVATION_AMOUNT,
        userName: motherName,
        userEmail: email.trim(),
        userPhone: phone,
        orderComment: `БРОНЬ. Мама: ${motherName}. Ребёнок: ${childName}, ${age} лет. Смена №${shiftId}${shift ? ` (${shift.name})` : ""}.${earlyStart ? " ДОП. ОПЦИЯ: раннее посещение с 8:00 (+3000 ₽ с завтраком, оплата в первый день)." : ""}`,
        cartItems: [
          {
            id: `reserve-${shiftId}`,
            name: `Бронирование места на смену №${shiftId}`,
            price: RESERVATION_AMOUNT,
            quantity: 1,
          },
        ],
      });
      try {
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            id: productId,
            name: productName,
            price: RESERVATION_AMOUNT,
            shiftId,
            ts: Date.now(),
          }),
        );
      } catch {
        /* noop */
      }
      openPaymentPage(data.payment_url);
    } catch {
      /* onError handled */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ReserveButton defaultShiftId={defaultShiftId} onClick={() => setOpen(true)} />

      {open && (
        <ReserveModalForm
          onClose={() => setOpen(false)}
          onSubmit={submit}
          motherName={motherName}
          setMotherName={setMotherName}
          phone={phone}
          setPhone={setPhone}
          childName={childName}
          setChildName={setChildName}
          age={age}
          setAge={setAge}
          email={email}
          setEmail={setEmail}
          shiftId={shiftId}
          setShiftId={setShiftId}
          earlyStart={earlyStart}
          setEarlyStart={setEarlyStart}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
