import ReviewStars from "./ReviewStars";

export interface Review {
  id: number;
  parent_name: string;
  child_name: string | null;
  rating: number;
  text: string;
  created_at: string | null;
}

interface ReviewsListProps {
  items: Review[];
  loading: boolean;
  onOpenForm: () => void;
}

export default function ReviewsList({ items, loading, onOpenForm }: ReviewsListProps) {
  return (
    <>
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
                <ReviewStars value={r.rating} />
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
            💛 Был у нас в клубе? Поделись впечатлениями!
          </h3>
          <p className="text-sm md:text-base" style={{ color: "rgba(61,61,61,0.75)" }}>
            Отзыв появится на сайте после короткой проверки модератором.
          </p>
        </div>
        <button
          onClick={onOpenForm}
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
    </>
  );
}