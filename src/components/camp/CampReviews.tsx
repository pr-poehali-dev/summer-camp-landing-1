import { useEffect, useState } from "react";

const REVIEWS_URL = "https://functions.poehali.dev/f0ac4a46-76e0-4844-9a17-0e69fca7a807";

interface Review {
  id: number;
  parent_name: string;
  child_name: string | null;
  rating: number;
  text: string;
  created_at: string | null;
}

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={onChange ? () => onChange(n) : undefined}
          className={onChange ? "transition-transform hover:scale-110" : "cursor-default"}
          style={{
            color: n <= value ? "#FFD93D" : "#E5E5E5",
            fontSize: "1.5rem",
            lineHeight: 1,
            filter: n <= value ? "drop-shadow(0 1px 2px rgba(255,154,86,0.3))" : "none",
          }}
          aria-label={`${n} звёзд`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function CampReviews() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(REVIEWS_URL);
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !text.trim()) {
      setErrorMsg("Заполни имя и текст отзыва");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parent_name: parentName,
          child_name: childName,
          rating,
          text,
        }),
      });
      if (!res.ok) throw new Error("err");
      setStatus("sent");
      setParentName("");
      setChildName("");
      setRating(5);
      setText("");
    } catch {
      setErrorMsg("Не удалось отправить. Попробуй ещё раз.");
      setStatus("error");
    }
  };

  const closeModal = () => {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section id="reviews" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 font-bold px-4 py-1.5 rounded-full text-xs mb-3 text-white"
            style={{ background: "linear-gradient(90deg,#FF9A56,#FFD93D)" }}
          >
            💬 ОТЗЫВЫ РОДИТЕЛЕЙ
          </div>
          <h2
            className="text-3xl md:text-5xl font-black mb-3 animate-rainbow-pulse"
            style={{
              fontFamily: "'Fredoka One', cursive",
              backgroundImage:
                "linear-gradient(90deg, #FF3D8B 0%, #FF9A56 20%, #FFD93D 40%, #00C9A7 60%, #6C5CE7 80%, #FF3D8B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.5px",
            }}
          >
            ⭐ Что говорят родители
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "rgba(61,61,61,0.7)" }}>
            Реальные отзывы родителей наших маленьких рыбок
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10" style={{ color: "rgba(61,61,61,0.5)" }}>
            Загружаем отзывы...
          </div>
        ) : items.length === 0 ? (
          <div
            className="rounded-3xl p-10 text-center"
            style={{ background: "#FFF8F0", border: "2px dashed #FF9A56" }}
          >
            <div className="text-5xl mb-3">💌</div>
            <p className="font-bold mb-2" style={{ color: "#3D3D3D" }}>
              Пока нет опубликованных отзывов
            </p>
            <p className="text-sm" style={{ color: "rgba(61,61,61,0.65)" }}>
              Будьте первыми — оставьте отзыв и помогите другим родителям сделать выбор!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((r) => (
              <article
                key={r.id}
                className="rounded-3xl p-6 bg-white relative"
                style={{ border: "2px solid #FFE5D9", boxShadow: "0 8px 24px rgba(255,154,86,0.12)" }}
              >
                <div className="absolute -top-3 -left-2 text-5xl select-none" style={{ color: "#FF9A56", opacity: 0.25 }}>
                  ❝
                </div>
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <Stars value={r.rating} />
                  <span className="text-xs" style={{ color: "rgba(61,61,61,0.5)" }}>
                    {r.created_at ? new Date(r.created_at).toLocaleDateString("ru-RU") : ""}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "rgba(61,61,61,0.85)" }}>
                  {r.text}
                </p>
                <div className="pt-3" style={{ borderTop: "1px dashed #FFE5D9" }}>
                  <div className="font-black" style={{ color: "#3D3D3D" }}>
                    {r.parent_name}
                  </div>
                  {r.child_name && (
                    <div className="text-sm" style={{ color: "#FF9A56" }}>
                      мама/папа {r.child_name}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div
          className="mt-8 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:justify-between"
          style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFE5D9 100%)", border: "2px dashed #FF9A56" }}
        >
          <div>
            <h3 className="font-black text-xl md:text-2xl mb-1" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
              💛 Был у нас в лагере? Поделись впечатлениями!
            </h3>
            <p className="text-sm md:text-base" style={{ color: "rgba(61,61,61,0.75)" }}>
              Отзыв появится на сайте после короткой проверки модератором.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="font-black rounded-2xl px-6 py-3.5 text-base transition-transform hover:scale-105 whitespace-nowrap"
            style={{
              background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
              color: "white",
              boxShadow: "0 6px 0 rgba(255,61,139,0.35), 0 10px 24px rgba(255,154,86,0.45)",
            }}
          >
            Оставить отзыв →
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg relative"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
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
                  onClick={closeModal}
                  className="font-bold rounded-xl px-5 py-2.5"
                  style={{ background: "#FF9A56", color: "white" }}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 md:p-7 space-y-3">
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
                  <Stars value={rating} onChange={setRating} />
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
      )}
    </section>
  );
}
