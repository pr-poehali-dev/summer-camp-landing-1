interface CampHeroPromoProps {
  scrollToBooking: () => void;
}

export default function CampHeroPromo({ scrollToBooking }: CampHeroPromoProps) {
  return (
    <div className="hero-promo" style={{
      borderRadius:"20px",
      background:"linear-gradient(160deg, #FFE55A 0%, #FFB830 50%, #FF8C00 100%)",
      boxShadow:"0 6px 0 #CC6A00, 0 10px 24px rgba(255,150,0,0.4), 0 2px 0 rgba(255,255,255,0.35) inset",
      display:"flex",
      flexDirection:"column",
      gap:"0.7rem",
      minWidth:0,
      maxWidth:"100%",
    }}>
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:"0.2rem",
        background:"rgba(255,255,255,0.22)",
        borderRadius:"12px",
        padding:"0.5rem 0.7rem",
        border:"1.5px solid rgba(255,255,255,0.5)",
      }}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", flexWrap:"wrap"}}>
          <span style={{
            color:"white",
            fontWeight:900,
            fontSize:"1.25rem",
            textShadow:"0 1px 0 rgba(204,106,0,0.85), 0 2px 4px rgba(92,46,0,0.45)",
          }}>
            14 500 ₽
          </span>
          <span style={{
            color:"rgba(255,255,255,0.95)",
            fontWeight:700,
            fontSize:"0.72rem",
            textShadow:"0 1px 0 rgba(204,106,0,0.6)",
          }}>
            за смену · 10 дней
          </span>
        </div>
        <span style={{
          color:"#FFF200",
          fontWeight:800,
          fontSize:"0.66rem",
          letterSpacing:"0.01em",
          textShadow:"0 1px 0 rgba(204,106,0,0.7)",
        }}>
          🔥 горящие путёвки со скидкой 15%
        </span>
      </div>

      <div style={{
        display:"flex",
        alignItems:"center",
        gap:"0.55rem",
        background:"linear-gradient(135deg, #00C9A7 0%, #00A67E 55%, #00DEB8 100%)",
        borderRadius:"14px",
        padding:"0.5rem 0.7rem",
        boxShadow:"0 4px 0 #008F78, 0 6px 16px rgba(0,201,167,0.4), 0 1px 0 rgba(255,255,255,0.3) inset",
      }}>
        <span style={{fontSize:"1.4rem", flexShrink:0, filter:"drop-shadow(0 1px 2px rgba(0,77,64,0.4))"}}>👯</span>
        <div style={{display:"flex", flexDirection:"column", lineHeight:1.15, minWidth:0}}>
          <span style={{
            color:"#fff",
            fontWeight:900,
            fontSize:"0.9rem",
            textShadow:"0 1px 0 rgba(0,143,120,0.9), 0 2px 4px rgba(0,77,64,0.5)",
          }}>Акция «Я с другом»</span>
          <span style={{
            color:"rgba(255,255,255,0.95)",
            fontWeight:700,
            fontSize:"0.72rem",
            textShadow:"0 1px 2px rgba(0,77,64,0.4)",
          }}>Минус 500 ₽ каждому при совместной брони</span>
        </div>
      </div>

      <div style={{display:"flex", gap:"0.5rem", flexWrap:"wrap"}}>
        <button onClick={scrollToBooking} className="rainbow-cta" style={{
          flex:"2 1 180px",
          minWidth:0,
          padding:"0.65rem 0.85rem",
          fontSize:"clamp(0.8rem, 3.4vw, 0.9rem)",
          color:"white",
          fontWeight:900,
          borderRadius:"12px",
          border:"none",
          cursor:"pointer",
          background:"linear-gradient(90deg, #FF3D8B, #FF9A56, #FFD93D, #00C9A7, #6C5CE7, #FF3D8B)",
          backgroundSize:"300% 100%",
          boxShadow:"0 3px 0 rgba(204,63,11,0.45), 0 6px 16px rgba(255,94,26,0.4), 0 1px 0 rgba(255,255,255,0.35) inset",
          transition:"transform 0.15s",
          textShadow:"0 1px 0 rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.3)",
        }} onMouseEnter={(e) => e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={(e) => e.currentTarget.style.transform="scale(1)"}>
          🎉 Забронировать
        </button>
        <a
          href="#program"
          className="font-bold rounded-xl border-2 bg-white/90 transition-all hover:scale-105"
          style={{flex:"1 1 110px", minWidth:0, padding:"0.65rem 0.85rem", fontSize:"clamp(0.8rem, 3.4vw, 0.9rem)", color:"#FF9A56", borderColor:"white", display:"flex", alignItems:"center", justifyContent:"center", whiteSpace:"nowrap"}}
        >
          Программа
        </a>
      </div>

      <a
        href="https://max.ru/u/f9LHodD0cOIBNFUsB_OY0OUavQDjw_Wx94xIjk6Ikef9qAnQGfZvFH_YhuQ"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all hover:scale-[1.03]"
        style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          gap:"0.5rem",
          padding:"0.6rem 0.85rem",
          borderRadius:"12px",
          background:"linear-gradient(135deg, #1FA2FF 0%, #12D8FA 55%, #1FA2FF 100%)",
          boxShadow:"0 3px 0 #0B7FCC, 0 6px 16px rgba(18,162,250,0.4), 0 1px 0 rgba(255,255,255,0.35) inset",
          color:"#fff",
          fontWeight:900,
          fontSize:"clamp(0.8rem, 3.4vw, 0.9rem)",
          textShadow:"0 1px 0 rgba(0,0,0,0.2)",
          textDecoration:"none",
        }}
      >
        <span style={{fontSize:"1.15rem"}}>💬</span>
        Написать в МАКС
      </a>

      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"0.4rem",
        background:"rgba(255,255,255,0.92)",
        borderRadius:"12px",
        padding:"0.45rem 0.7rem",
        boxShadow:"0 2px 0 rgba(204,106,0,0.35), 0 1px 0 rgba(255,255,255,0.6) inset",
      }}>
        <span style={{fontSize:"1.1rem", flexShrink:0}}>⚡</span>
        <span style={{
          color:"#C81E5B",
          fontWeight:900,
          fontSize:"0.78rem",
          lineHeight:1.25,
          textAlign:"center",
        }}>
          Ответим за 5 минут и закрепим место за вашим ребёнком
        </span>
      </div>
    </div>
  );
}