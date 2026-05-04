import { useEffect, useState } from "react";
import { ymGoal } from "@/lib/ymGoal";
import { openReserveModal } from "./reserveCTAUtils";

export default function FloatingBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        ymGoal("floating_book_click");
        openReserveModal();
      }}
      aria-label="Забронировать место"
      style={{
        position: "fixed",
        right: "14px",
        bottom: "14px",
        zIndex: 50,
        padding: "10px 16px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        color: "white",
        fontWeight: 900,
        fontSize: "13px",
        background: "linear-gradient(90deg, #FF3D8B, #FF9A56, #FFD93D, #00C9A7, #6C5CE7)",
        backgroundSize: "300% 100%",
        boxShadow: "0 4px 14px rgba(255,94,26,0.45), 0 1px 0 rgba(255,255,255,0.35) inset",
        textShadow: "0 1px 0 rgba(0,0,0,0.25)",
        animation: "rainbow-shift 6s linear infinite",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      🎉 Забронировать
    </button>
  );
}
