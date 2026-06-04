import { useEffect, useState } from "react";
import { SHIFT_TITLES } from "./types";

interface AdminSpotsProps {
  apiCall: (
    method: string,
    action: string,
    extraQuery?: string,
    body?: unknown
  ) => Promise<Response>;
}

const SHIFT_IDS = [3, 5, 6, 7];

export default function AdminSpots({ apiCall }: AdminSpotsProps) {
  const [spots, setSpots] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedId, setSavedId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiCall("GET", "shift_spots");
      const data = await res.json();
      const raw = (data.spots || {}) as Record<string, number>;
      const next: Record<number, number> = {};
      SHIFT_IDS.forEach((id) => {
        next[id] = typeof raw[String(id)] === "number" ? raw[String(id)] : 0;
      });
      setSpots(next);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = (id: number, value: number) => {
    setSpots((prev) => ({ ...prev, [id]: Math.max(0, value) }));
    setSavedId(null);
  };

  const save = async (id: number) => {
    setSavingId(id);
    setSavedId(null);
    try {
      const res = await apiCall("PUT", "shift_spots", "", {
        shift_id: id,
        count: spots[id] ?? 0,
      });
      if (res.ok) {
        setSavedId(id);
        setTimeout(() => setSavedId((cur) => (cur === id ? null : cur)), 2500);
      }
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
        Загрузка...
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm mb-2" style={{ color: "rgba(61,61,61,0.7)" }}>
        Укажите, сколько свободных мест осталось в каждой смене. Изменения сразу
        появятся на сайте.
      </p>
      {SHIFT_IDS.map((id) => (
        <article
          key={id}
          className="bg-white rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap"
          style={{ border: "2px solid #FFE5D9" }}
        >
          <div className="font-black" style={{ color: "#3D3D3D" }}>
            {SHIFT_TITLES[id] ?? `Смена ${id}`}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setValue(id, (spots[id] ?? 0) - 1)}
              className="w-9 h-9 rounded-xl font-black text-lg"
              style={{ background: "#FFE5D9", color: "#3D3D3D" }}
              aria-label="Меньше"
            >
              −
            </button>
            <input
              type="number"
              min={0}
              value={spots[id] ?? 0}
              onChange={(e) => setValue(id, parseInt(e.target.value || "0", 10))}
              className="w-16 text-center font-black text-lg rounded-xl py-1.5 outline-none"
              style={{ border: "2px solid #FFE5D9", color: "#3D3D3D" }}
            />
            <button
              onClick={() => setValue(id, (spots[id] ?? 0) + 1)}
              className="w-9 h-9 rounded-xl font-black text-lg"
              style={{ background: "#FFE5D9", color: "#3D3D3D" }}
              aria-label="Больше"
            >
              +
            </button>
            <button
              onClick={() => save(id)}
              disabled={savingId === id}
              className="font-bold px-4 py-2 rounded-xl text-sm ml-2 disabled:opacity-60"
              style={{
                background:
                  savedId === id
                    ? "#00C9A7"
                    : "linear-gradient(135deg,#FF9A56,#FFD93D)",
                color: "white",
                minWidth: "110px",
              }}
            >
              {savingId === id
                ? "Сохраняю..."
                : savedId === id
                ? "✓ Сохранено"
                : "Сохранить"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
