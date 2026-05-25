import { useEffect, useState } from "react";
import { ymGoal } from "@/lib/ymGoal";
import { openReserveModal } from "./reserveCTAUtils";

export default function FloatingBookButton() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOpen = () => setModalOpen(true);
    const onClose = () => setModalOpen(false);
    window.addEventListener("reserve:open", onOpen);
    window.addEventListener("reserve:close", onClose);
    return () => {
      window.removeEventListener("reserve:open", onOpen);
      window.removeEventListener("reserve:close", onClose);
    };
  }, []);

  if (!visible || modalOpen) return null;

  return (
    <>
      <style>{`
        @keyframes floating-book-pulse {
          0%, 100% {
            box-shadow: 0 4px 14px rgba(255,94,26,0.45), 0 0 0 0 rgba(255,94,26,0.55), 0 1px 0 rgba(255,255,255,0.35) inset;
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 14px rgba(255,94,26,0.55), 0 0 0 12px rgba(255,94,26,0), 0 1px 0 rgba(255,255,255,0.35) inset;
            transform: scale(1.04);
          }
        }
      `}</style>
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
          animation: "floating-book-pulse 2.4s ease-in-out infinite",
          transformOrigin: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
          e.currentTarget.style.transform = "";
        }}
      >
        🎉 Забронировать
      </button>
    </>
  );
}