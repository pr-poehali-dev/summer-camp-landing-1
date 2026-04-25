import { useEffect, useState } from "react";

const ADMIN_URL = "https://functions.poehali.dev/4fc3a949-19b1-496b-9b78-f0fe9d34a3d0";
const TOKEN_KEY = "rd_admin_token";

interface Review {
  id: number;
  parent_name: string;
  child_name: string | null;
  rating: number;
  text: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface Application {
  id: number;
  full_name: string;
  age: string | null;
  phone: string;
  email: string | null;
  about: string | null;
  experience: string | null;
  created_at: string;
}

interface Stats {
  pending_reviews: number;
  approved_reviews: number;
  applications: number;
}

function Stars({ value }: { value: number }) {
  return (
    <div className="inline-flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= value ? "#FFD93D" : "#E5E5E5" }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<"reviews" | "applications">("reviews");
  const [reviewFilter, setReviewFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const apiCall = async (
    method: string,
    action: string,
    extraQuery: string = "",
    body?: unknown
  ): Promise<Response> => {
    const url = `${ADMIN_URL}?action=${action}${extraQuery}`;
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Token": token,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    setLoggingIn(true);
    try {
      const res = await fetch(`${ADMIN_URL}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        setLoginErr(data.error || "Неверный пароль");
        return;
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch {
      setLoginErr("Ошибка сети");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setReviews([]);
    setApplications([]);
    setStats(null);
  };

  const loadStats = async () => {
    try {
      const res = await apiCall("GET", "stats");
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch {
      /* ignore */
    }
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await apiCall("GET", "reviews", `&status=${reviewFilter}`);
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setReviews(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    setLoading(true);
    try {
      const res = await apiCall("GET", "applications");
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setApplications(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadStats();
    if (tab === "reviews") loadReviews();
    else loadApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tab, reviewFilter]);

  const setReviewStatus = async (id: number, status: Review["status"]) => {
    const res = await apiCall("PUT", "review_status", "", { id, status });
    if (res.ok) {
      loadReviews();
      loadStats();
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Удалить отзыв навсегда?")) return;
    const res = await apiCall("DELETE", "review", `&id=${id}`);
    if (res.ok) {
      loadReviews();
      loadStats();
    }
  };

  const deleteApplication = async (id: number) => {
    if (!confirm("Удалить заявку навсегда?")) return;
    const res = await apiCall("DELETE", "application", `&id=${id}`);
    if (res.ok) {
      loadApplications();
      loadStats();
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#FFF8F0" }}>
        <div
          className="bg-white rounded-3xl p-8 w-full max-w-sm"
          style={{ border: "2px solid #FFE5D9", boxShadow: "0 20px 60px rgba(255,154,86,0.2)" }}
        >
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🔐</div>
            <h1 className="text-2xl font-black" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
              Админка
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(61,61,61,0.6)" }}>
              Рыбка Долли
            </p>
          </div>
          <form onSubmit={login} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
              placeholder="Пароль"
              autoFocus
              required
            />
            {loginErr && (
              <p className="text-sm font-semibold" style={{ color: "#FF3D8B" }}>
                {loginErr}
              </p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full font-black rounded-2xl py-3 text-base disabled:opacity-60"
              style={{
                background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
                color: "white",
                boxShadow: "0 6px 0 rgba(255,61,139,0.35)",
              }}
            >
              {loggingIn ? "Входим..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#FFF8F0" }}>
      <header className="bg-white border-b" style={{ borderColor: "#FFE5D9" }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐠</span>
            <h1 className="text-xl font-black" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
              Админка · Рыбка Долли
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-sm font-bold px-4 py-2 rounded-xl"
            style={{ background: "#FFE5D9", color: "#3D3D3D" }}
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-2xl p-4" style={{ border: "2px solid #FFE5D9" }}>
              <div className="text-xs font-bold uppercase" style={{ color: "#FF9A56" }}>
                На модерации
              </div>
              <div className="text-3xl font-black mt-1" style={{ color: "#3D3D3D" }}>
                {stats.pending_reviews}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4" style={{ border: "2px solid #FFE5D9" }}>
              <div className="text-xs font-bold uppercase" style={{ color: "#00C9A7" }}>
                Опубликовано
              </div>
              <div className="text-3xl font-black mt-1" style={{ color: "#3D3D3D" }}>
                {stats.approved_reviews}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4" style={{ border: "2px solid #FFE5D9" }}>
              <div className="text-xs font-bold uppercase" style={{ color: "#6C5CE7" }}>
                Заявок вожатых
              </div>
              <div className="text-3xl font-black mt-1" style={{ color: "#3D3D3D" }}>
                {stats.applications}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab("reviews")}
            className="font-bold px-4 py-2 rounded-xl text-sm"
            style={{
              background: tab === "reviews" ? "#FF9A56" : "white",
              color: tab === "reviews" ? "white" : "#3D3D3D",
              border: "2px solid #FFE5D9",
            }}
          >
            💬 Отзывы
          </button>
          <button
            onClick={() => setTab("applications")}
            className="font-bold px-4 py-2 rounded-xl text-sm"
            style={{
              background: tab === "applications" ? "#6C5CE7" : "white",
              color: tab === "applications" ? "white" : "#3D3D3D",
              border: "2px solid #FFE5D9",
            }}
          >
            🌟 Заявки в команду
          </button>
        </div>

        {tab === "reviews" && (
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
        )}

        {tab === "applications" && (
          <>
            {loading ? (
              <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
                Загрузка...
              </p>
            ) : applications.length === 0 ? (
              <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
                Нет заявок
              </p>
            ) : (
              <div className="space-y-3">
                {applications.map((a) => (
                  <article
                    key={a.id}
                    className="bg-white rounded-2xl p-5"
                    style={{ border: "2px solid #FFE5D9" }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div>
                        <div className="font-black text-lg" style={{ color: "#3D3D3D" }}>
                          {a.full_name}
                          {a.age && (
                            <span className="font-normal ml-2 text-sm" style={{ color: "rgba(61,61,61,0.6)" }}>
                              · {a.age} лет
                            </span>
                          )}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "rgba(61,61,61,0.5)" }}>
                          {new Date(a.created_at).toLocaleString("ru-RU")}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteApplication(a.id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg"
                        style={{ background: "#FEE2E2", color: "#991B1B" }}
                      >
                        🗑 Удалить
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm" style={{ color: "rgba(61,61,61,0.85)" }}>
                      <div>
                        <span className="font-bold" style={{ color: "#FF9A56" }}>
                          📞 Телефон:
                        </span>{" "}
                        <a href={`tel:${a.phone}`} className="font-semibold" style={{ color: "#3D3D3D" }}>
                          {a.phone}
                        </a>
                      </div>
                      {a.email && (
                        <div>
                          <span className="font-bold" style={{ color: "#FF9A56" }}>
                            ✉️ Email:
                          </span>{" "}
                          <a href={`mailto:${a.email}`} className="font-semibold" style={{ color: "#3D3D3D" }}>
                            {a.email}
                          </a>
                        </div>
                      )}
                      {a.about && (
                        <div className="md:col-span-2">
                          <span className="font-bold" style={{ color: "#FF9A56" }}>
                            🌟 О себе:
                          </span>{" "}
                          {a.about}
                        </div>
                      )}
                      {a.experience && (
                        <div className="md:col-span-2">
                          <span className="font-bold" style={{ color: "#FF9A56" }}>
                            💼 Опыт:
                          </span>{" "}
                          {a.experience}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}