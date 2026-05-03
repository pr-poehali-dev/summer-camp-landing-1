import { useEffect, useState } from "react";

const STORAGE_KEY = "cookies-accepted-v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        const t = window.setTimeout(() => setVisible(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Использование cookies"
      className="fixed left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 md:max-w-md z-[9999] animate-in"
      style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 18px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,154,86,0.2)",
        border: "2px solid #FFE5D9",
        padding: "16px 18px",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0" aria-hidden>🍪</div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-[15px] mb-1" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
            Мы используем cookies
          </div>
          <p className="text-[12.5px] leading-snug mb-3" style={{ color: "rgba(61,61,61,0.75)" }}>
            Чтобы сайт работал корректно и мы могли улучшать его для вас. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
              style={{ color: "#FF5E1A" }}
            >
              политикой конфиденциальности
            </a>
            .
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={accept}
              className="font-black text-white text-sm px-4 py-2 rounded-xl transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#FF9A56,#FF5E1A)",
                boxShadow: "0 4px 0 #CC3F0B, 0 6px 16px rgba(255,94,26,0.35)",
              }}
            >
              Принять
            </button>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold underline"
              style={{ color: "rgba(61,61,61,0.65)" }}
            >
              Подробнее
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
