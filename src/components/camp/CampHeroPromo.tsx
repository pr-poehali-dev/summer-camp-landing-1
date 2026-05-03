interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CampHeroPromoProps {
  countdown: Countdown;
  scrollToBooking: () => void;
}

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/20 backdrop-blur rounded-lg px-1 py-1 flex-1 min-w-0 basis-0">
    <span className="font-black text-white tabular-nums leading-none" style={{fontSize:"clamp(0.95rem, 4.2vw, 1.25rem)", textShadow:"0 1px 0 rgba(204,106,0,0.85), 0 2px 0 rgba(153,79,0,0.6), 0 3px 6px rgba(92,46,0,0.45)"}}>
      {String(value).padStart(2, "0")}
    </span>
    <span className="font-bold mt-0.5" style={{fontSize:"clamp(7px, 2vw, 9px)", color:"#fff", textShadow:"0 1px 2px rgba(92,46,0,0.5)"}}>{label}</span>
  </div>
);

export default function CampHeroPromo({ countdown, scrollToBooking }: CampHeroPromoProps) {
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
      <div style={{display:"flex", alignItems:"center", gap:"0.6rem", justifyContent:"space-between"}}>
        <div style={{display:"flex", alignItems:"center", gap:"0.4rem"}}>
          <span style={{fontSize:"1.25rem"}}>⏰</span>
          <div style={{display:"flex", flexDirection:"column", lineHeight:1.1}}>
            <span className="font-black text-white" style={{fontFamily:"'Nunito', sans-serif", fontSize:"0.9rem", textShadow:"0 1px 0 rgba(204,106,0,0.85), 0 2px 0 rgba(153,79,0,0.6), 0 3px 6px rgba(92,46,0,0.45)"}}>АКЦИЯ ДО 15 МАЯ</span>
            <span style={{color:"#fff", fontSize:"0.7rem", fontWeight:700, textShadow:"0 1px 0 rgba(204,106,0,0.7), 0 2px 4px rgba(92,46,0,0.4)"}}>Осталось мест: <b>45</b> из 70</span>
          </div>
        </div>
        <span style={{
          background:"#00C9A7",
          boxShadow:"0 3px 0 #008F78, 0 1px 0 rgba(255,255,255,0.3) inset",
          borderRadius:"9px",
          padding:"3px 11px",
          color:"white",
          fontWeight:900,
          fontSize:"0.95rem",
          flexShrink:0,
          textShadow:"0 1px 0 rgba(0,143,120,0.9), 0 2px 4px rgba(0,77,64,0.5)",
        }}>−12%</span>
      </div>

      <div style={{display:"flex", alignItems:"stretch", gap:"0.3rem"}}>
        <TimerBlock value={countdown.days} label="ДНЕЙ" />
        <TimerBlock value={countdown.hours} label="ЧАСОВ" />
        <TimerBlock value={countdown.minutes} label="МИНУТ" />
        <TimerBlock value={countdown.seconds} label="СЕКУНД" />
      </div>

      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"0.5rem",
        flexWrap:"wrap",
        background:"rgba(255,255,255,0.22)",
        borderRadius:"12px",
        padding:"0.4rem 0.7rem",
        border:"1.5px solid rgba(255,255,255,0.5)",
      }}>
        <span style={{
          color:"rgba(255,255,255,0.85)",
          fontWeight:700,
          fontSize:"0.85rem",
          textDecoration:"line-through",
          textShadow:"0 1px 0 rgba(204,106,0,0.7)",
        }}>
          12 500 ₽
        </span>
        <span style={{
          color:"white",
          fontWeight:900,
          fontSize:"1.1rem",
          textShadow:"0 1px 0 rgba(204,106,0,0.85), 0 2px 4px rgba(92,46,0,0.45)",
        }}>
          11 000 ₽
        </span>
        <span style={{
          color:"rgba(255,255,255,0.95)",
          fontWeight:700,
          fontSize:"0.72rem",
          textShadow:"0 1px 0 rgba(204,106,0,0.6)",
        }}>
          со скидкой до 15 мая
        </span>
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
          🎉 Забронировать −12%
        </button>
        <a
          href="#program"
          className="font-bold rounded-xl border-2 bg-white/90 transition-all hover:scale-105"
          style={{flex:"1 1 110px", minWidth:0, padding:"0.65rem 0.85rem", fontSize:"clamp(0.8rem, 3.4vw, 0.9rem)", color:"#FF9A56", borderColor:"white", display:"flex", alignItems:"center", justifyContent:"center", whiteSpace:"nowrap"}}
        >
          Программа
        </a>
      </div>
    </div>
  );
}
