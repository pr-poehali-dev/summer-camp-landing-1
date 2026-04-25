import ReviewStars from "./ReviewStars";

type Status = "idle" | "sending" | "sent" | "error";

interface ReviewModalProps {
  parentName: string;
  setParentName: (v: string) => void;
  childName: string;
  setChildName: (v: string) => void;
  rating: number;
  setRating: (v: number) => void;
  text: string;
  setText: (v: string) => void;
  status: Status;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function ReviewModal({
  parentName,
  setParentName,
  childName,
  setChildName,
  rating,
  setRating,
  text,
  setText,
  status,
  errorMsg,
  onSubmit,
  onClose,
}: ReviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg relative"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-xl font-black"
          style={{ background: "#FFE5D9", color: "#3D3D3D" }}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div
          className="rounded-t-3xl p-6 text-center text-white"
          style={{ background: "linear-gradient(135deg,#FF3D8B 0%,#FF9A56 50%,#FFD93D 100%)" }}
        >
          <div className="text-4xl mb-2">💌</div>
          <h3 className="text-xl md:text-2xl font-black" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Оставьте отзыв
          </h3>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.9)" }}>
            Поделитесь, как ваш ребёнок провёл время у нас
          </p>
        </div>

        {status === "sent" ? (
          <div className="p-6 md:p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h4 className="text-xl font-black mb-2" style={{ color: "#3D3D3D" }}>
              Спасибо за отзыв!
            </h4>
            <p className="text-sm mb-5" style={{ color: "rgba(61,61,61,0.75)" }}>
              Мы получили его и опубликуем после короткой проверки.
            </p>
            <button
              onClick={onClose}
              className="font-bold rounded-xl px-5 py-2.5"
              style={{ background: "#FF9A56", color: "white" }}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6 md:p-7 space-y-3">
            <div>
              <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                Ваше имя *
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                placeholder="Анна Иванова"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                Имя ребёнка
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                placeholder="Маша, 8 лет"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "#3D3D3D" }}>
                Оценка
              </label>
              <ReviewStars value={rating} onChange={setRating} />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                Ваш отзыв *
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                placeholder="Что понравилось, какие впечатления..."
                rows={4}
                required
              />
            </div>

            {status === "error" && errorMsg && (
              <p className="text-sm font-semibold" style={{ color: "#FF3D8B" }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full font-black rounded-2xl py-3.5 text-base transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{
                background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
                color: "white",
                boxShadow: "0 6px 0 rgba(255,61,139,0.35)",
              }}
            >
              {status === "sending" ? "Отправляем..." : "Отправить отзыв"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
