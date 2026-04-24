import { Link } from "react-router-dom";

export default function PaymentFail() {
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
            background: "linear-gradient(135deg,#FF9A56,#E64D12)",
            boxShadow: "0 10px 25px rgba(230,77,18,0.35)",
          }}
        >
          😔
        </div>

        <h1
          className="font-black text-3xl md:text-4xl mb-3"
          style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}
        >
          Оплата не прошла
        </h1>

        <p className="text-base md:text-lg mb-6" style={{ color: "rgba(61,61,61,0.8)" }}>
          Ничего страшного — деньги не списаны.
          <br />
          Попробуйте ещё раз или свяжитесь с нами.
        </p>

        <div
          className="rounded-2xl p-4 mb-6 text-left"
          style={{ background: "#FFF8F0", border: "2px solid #FFE5D9" }}
        >
          <div className="font-black text-sm uppercase tracking-wider mb-2" style={{ color: "#FF9A56" }}>
            Возможные причины
          </div>
          <ul className="space-y-1.5 text-sm" style={{ color: "#3D3D3D" }}>
            <li>• Недостаточно средств на карте</li>
            <li>• Банк отклонил платёж</li>
            <li>• Закрыли страницу до завершения</li>
            <li>• Ошибка в данных карты</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 font-black text-white px-6 py-3 rounded-2xl transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#FF9A56,#FF5E1A)",
              boxShadow: "0 6px 0 #CC3F0B, 0 10px 25px rgba(255,94,26,0.35)",
            }}
          >
            🔄 Попробовать снова
          </Link>
          <a
            href="tel:+79881521698"
            className="inline-flex items-center justify-center gap-2 font-black px-6 py-3 rounded-2xl transition-transform hover:scale-105"
            style={{
              background: "white",
              color: "#FF9A56",
              border: "2px solid #FFE5D9",
            }}
          >
            📞 Позвонить нам
          </a>
        </div>

        <p className="text-xs mt-4" style={{ color: "rgba(61,61,61,0.6)" }}>
          +7 988 152-16-98 · +7 978 712-03-53
        </p>
      </div>
    </div>
  );
}
