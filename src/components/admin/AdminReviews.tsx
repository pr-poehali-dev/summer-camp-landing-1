import Stars from "./Stars";
import type { Review, ReviewFilter } from "./types";

interface AdminReviewsProps {
  reviews: Review[];
  loading: boolean;
  reviewFilter: ReviewFilter;
  setReviewFilter: (f: ReviewFilter) => void;
  setReviewStatus: (id: number, status: Review["status"]) => void;
  deleteReview: (id: number) => void;
}

export default function AdminReviews({
  reviews,
  loading,
  reviewFilter,
  setReviewFilter,
  setReviewStatus,
  deleteReview,
}: AdminReviewsProps) {
  return (
    <>
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["pending", "approved", "rejected", "all"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setReviewFilter(s)}
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{
              background: reviewFilter === s ? "#3D3D3D" : "white",
              color: reviewFilter === s ? "white" : "#3D3D3D",
              border: "2px solid #FFE5D9",
            }}
          >
            {s === "pending" ? "На модерации" : s === "approved" ? "Опубликованы" : s === "rejected" ? "Отклонены" : "Все"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
          Загрузка...
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
          Нет отзывов
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-2xl p-5"
              style={{ border: "2px solid #FFE5D9" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div>
                  <div className="font-black" style={{ color: "#3D3D3D" }}>
                    {r.parent_name}
                    {r.child_name && (
                      <span className="font-normal ml-2" style={{ color: "rgba(61,61,61,0.6)" }}>
                        · {r.child_name}
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(61,61,61,0.5)" }}>
                    {new Date(r.created_at).toLocaleString("ru-RU")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Stars value={r.rating} />
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        r.status === "approved" ? "#D1FAE5" : r.status === "rejected" ? "#FEE2E2" : "#FEF3C7",
                      color:
                        r.status === "approved" ? "#065F46" : r.status === "rejected" ? "#991B1B" : "#92400E",
                    }}
                  >
                    {r.status === "approved" ? "Опубликован" : r.status === "rejected" ? "Отклонён" : "На модерации"}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(61,61,61,0.85)" }}>
                {r.text}
              </p>
              <div className="flex gap-2 flex-wrap">
                {r.status !== "approved" && (
                  <button
                    onClick={() => setReviewStatus(r.id, "approved")}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: "#00C9A7", color: "white" }}
                  >
                    ✓ Опубликовать
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button
                    onClick={() => setReviewStatus(r.id, "rejected")}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: "#FFE5D9", color: "#3D3D3D" }}
                  >
                    ✕ Отклонить
                  </button>
                )}
                {r.status === "approved" && (
                  <button
                    onClick={() => setReviewStatus(r.id, "pending")}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: "#FEF3C7", color: "#92400E" }}
                  >
                    ↩ Снять с публикации
                  </button>
                )}
                <button
                  onClick={() => deleteReview(r.id)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "#FEE2E2", color: "#991B1B" }}
                >
                  🗑 Удалить
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
