import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ecommercePurchase, ymGoal } from "@/lib/ymGoal";

export default function PaymentSuccess() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const invId = params.get("InvId") || params.get("invId") || "";
      const outSum = parseFloat(params.get("OutSum") || params.get("outSum") || "0");

      const raw = localStorage.getItem("pendingOrder");
      let product: { id: string; name: string; price: number } | null = null;
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as { id?: string; name?: string; price?: number };
          if (parsed?.id && parsed?.name && typeof parsed.price === "number") {
            product = { id: parsed.id, name: parsed.name, price: parsed.price };
          }
        } catch {
          /* noop */
        }
      }

      const finalProduct = product ?? {
        id: "reserve-shift-unknown",
        name: "Бронирование смены",
        price: outSum || 1000,
      };
      const orderId = invId || `order-${Date.now()}`;

      ecommercePurchase(orderId, [
        {
          ...finalProduct,
          quantity: 1,
          category: "Бронирование смены",
          brand: "Рыбка Долли",
        },
      ]);
      ymGoal("reserve_payment_success", { order_id: orderId, amount: finalProduct.price });

      localStorage.removeItem("pendingOrder");
    } catch {
      /* noop */
    }
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)" }}
    >
      <div
        className="max-w-lg w-full rounded-3xl p-8 md:p-10 text-center bg-white"
        style={{ border: "2px solid #FFE5D9", boxShadow: "0 20px 60px rgba(255,154,86,0.25)" }}
      >
        <div
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl"
          style={{
            background: "linear-gradient(135deg,#00C9A7,#00A67E)",
            boxShadow: "0 10px 25px rgba(0,201,167,0.35)",
          }}
        >
          ✅
        </div>

        <h1
          className="font-black text-3xl md:text-4xl mb-3"
          style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}
        >
          Оплата прошла успешно!
        </h1>

        <p className="text-base md:text-lg mb-6" style={{ color: "rgba(61,61,61,0.8)" }}>
          Спасибо! Место для вашего ребёнка забронировано.
          <br />
          Мы свяжемся с вами в ближайшее время.
        </p>

        <div
          className="rounded-2xl p-4 mb-6 text-left"
          style={{ background: "#FFF8F0", border: "2px solid #FFE5D9" }}
        >
          <div className="font-black text-sm uppercase tracking-wider mb-2" style={{ color: "#FF9A56" }}>
            Что дальше?
          </div>
          <ul className="space-y-2 text-sm" style={{ color: "#3D3D3D" }}>
            <li>📞 В течение дня вам позвонит администратор</li>
            <li>✉️ Копию чека пришлём вам на email</li>
            <li>🎒 За неделю до смены пришлём памятку «что взять с собой»</li>
            <li>💰 Остаток за смену оплачивается в первый день</li>
          </ul>
        </div>

        <p
          className="text-[11px] md:text-xs leading-snug mb-6 px-1"
          style={{ color: "rgba(61,61,61,0.65)" }}
        >
          Кассовые чеки мы формируем на физической кассе в нашем центре — оригинал вы можете получить у нас в любое время или в первый день смены. Копию чека направим вам на email.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 font-black text-white px-8 py-3.5 rounded-2xl transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg,#FF9A56,#FF5E1A)",
            boxShadow: "0 6px 0 #CC3F0B, 0 10px 25px rgba(255,94,26,0.35)",
          }}
        >
          На главную
        </Link>

        <p className="text-xs mt-4" style={{ color: "rgba(61,61,61,0.6)" }}>
          Вопросы? Звоните: +7 988 152-16-98
        </p>
      </div>
    </div>
  );
}