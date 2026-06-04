import { useEffect, useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminApplications from "@/components/admin/AdminApplications";
import AdminAds from "@/components/admin/AdminAds";
import AdminSpots from "@/components/admin/AdminSpots";
import {
  ADMIN_URL,
  TOKEN_KEY,
  type Review,
  type Application,
  type Stats,
  type ReviewFilter,
  type AdminTab,
} from "@/components/admin/types";

export default function Admin() {
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<AdminTab>("reviews");
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("pending");
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
      <AdminLogin
        password={password}
        setPassword={setPassword}
        loginErr={loginErr}
        loggingIn={loggingIn}
        onSubmit={login}
      />
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
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              style={{ background: "linear-gradient(135deg,#FF9A56,#FFD93D)", color: "white" }}
            >
              ← На сайт
            </a>
            <button
              onClick={logout}
              className="text-sm font-bold px-4 py-2 rounded-xl"
              style={{ background: "#FFE5D9", color: "#3D3D3D" }}
            >
              Выйти
            </button>
          </div>
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
          <button
            onClick={() => setTab("ads")}
            className="font-bold px-4 py-2 rounded-xl text-sm"
            style={{
              background: tab === "ads" ? "#00C9A7" : "white",
              color: tab === "ads" ? "white" : "#3D3D3D",
              border: "2px solid #FFE5D9",
            }}
          >
            📣 Ссылки для рекламы
          </button>
          <button
            onClick={() => setTab("spots")}
            className="font-bold px-4 py-2 rounded-xl text-sm"
            style={{
              background: tab === "spots" ? "#FF3D8B" : "white",
              color: tab === "spots" ? "white" : "#3D3D3D",
              border: "2px solid #FFE5D9",
            }}
          >
            🔢 Места в сменах
          </button>
        </div>

        {tab === "reviews" && (
          <AdminReviews
            reviews={reviews}
            loading={loading}
            reviewFilter={reviewFilter}
            setReviewFilter={setReviewFilter}
            setReviewStatus={setReviewStatus}
            deleteReview={deleteReview}
          />
        )}

        {tab === "applications" && (
          <AdminApplications
            applications={applications}
            loading={loading}
            deleteApplication={deleteApplication}
          />
        )}

        {tab === "ads" && <AdminAds />}

        {tab === "spots" && <AdminSpots apiCall={apiCall} />}
      </main>
    </div>
  );
}