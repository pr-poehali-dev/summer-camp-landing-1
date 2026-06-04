import { SHIFTS } from "./CampData";
import ProgramShiftHeader, { SHIFT_SPOTS } from "./ProgramShiftHeader";
import ProgramShiftBody from "./ProgramShiftBody";
import { useShiftSpots } from "./useShiftSpots";

type Shift = (typeof SHIFTS)[number];

interface ProgramShiftCardProps {
  shift: Shift;
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
}

function spotsWord(n: number) {
  if (n === 1) return "место";
  if (n <= 4) return "места";
  return "мест";
}

export default function ProgramShiftCard({
  shift,
  openAccordion,
  setOpenAccordion,
  scrollToBooking,
  setSelectedShift,
}: ProgramShiftCardProps) {
  const spotsMap = useShiftSpots();
  const hasSpotsConfig = SHIFT_SPOTS[shift.id] !== undefined;
  const liveCount = spotsMap[shift.id];
  const spotsCount = hasSpotsConfig
    ? (liveCount !== undefined ? liveCount : SHIFT_SPOTS[shift.id].count)
    : 0;
  const soldOut = hasSpotsConfig && spotsCount <= 0;
  const isTeen = shift.id === 4 || shift.id === 5;
  const isShort = shift.id === 7;
  const isClosed = shift.id === 1 || shift.id === 2 || shift.id === 4 || soldOut;
  const isHighlight = shift.id === 3 && !soldOut;
  const spots = SHIFT_SPOTS[shift.id];
  const shiftAccusative: Record<number, string> = {
    1: "«Сундук со сказками»",
    2: "«Вкусные открытия»",
    3: "«Мульти-драйв»",
    4: "«Поколение АЛЬФА»",
    5: "«Тинейджер-2026»",
    6: "«Робинзоны»",
    7: "«Лабораторию чудес»",
  };
  const shiftName = shiftAccusative[shift.id] ?? `«${shift.name}»`;
  return (
    <div id={`shift-${shift.id}`} className="relative scroll-mt-24" style={{ marginBottom: spots ? "28px" : "0" }}>
      <div
        className={`rounded-3xl transition-transform hover:-translate-y-0.5 relative ${isShort ? "animate-short-shift" : ""} ${isHighlight ? "animate-highlight-shift" : ""}`}
        style={isClosed ? {
          border:"3px solid #C8C8C8",
          boxShadow:"0 6px 0 rgba(0,0,0,0.07), 0 10px 24px rgba(0,0,0,0.1)",
          overflow: "hidden",
          opacity: 0.75,
        } : isHighlight ? {
          border:"3px solid #FFD93D",
          overflow: "hidden",
        } : isTeen ? {
          border:"3px solid #6C5CE7",
          boxShadow:"0 14px 0 rgba(108,92,231,0.25), 0 18px 50px rgba(108,92,231,0.45), 0 0 0 4px rgba(255,217,61,0.35), 0 2px 0 rgba(255,255,255,0.5) inset",
          overflow: "hidden",
        } : isShort ? {
          border:"3px solid #00C9A7",
          overflow: "hidden",
        } : {
          border:"3px solid #FFE5D9",
          boxShadow:"0 14px 0 rgba(204,106,0,0.18), 0 18px 40px rgba(255,154,86,0.3), 0 2px 0 rgba(255,255,255,0.5) inset",
          overflow: "hidden",
        }}
      >
        <ProgramShiftHeader
          shift={shift}
          isTeen={isTeen}
          isShort={isShort}
          soldOut={soldOut}
          openAccordion={openAccordion}
          setOpenAccordion={setOpenAccordion}
        />
        {openAccordion === shift.id && (
          <ProgramShiftBody
            shift={shift}
            isTeen={isTeen}
            isShort={isShort}
            shiftName={shiftName}
            scrollToBooking={scrollToBooking}
            setSelectedShift={setSelectedShift}
          />
        )}
      </div>

      {isClosed && (
        <div
          className="tag-swing absolute pointer-events-none"
          style={{
            bottom: "-34px",
            right: "20px",
            zIndex: 20,
            transformOrigin: "top center",
          }}
        >
          <div style={isClosed ? {
            background: "#EFEFEF",
            border: "2.5px solid #666666",
            borderRadius: "8px",
            padding: "6px 14px 8px",
            fontSize: "11px",
            fontWeight: 900,
            color: "#333333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
            lineHeight: 1.45,
            textAlign: "center",
            position: "relative",
            maxWidth: "200px",
            whiteSpace: "normal",
          } : isHighlight ? {
            background: "#FFFBEA",
            border: "2.5px solid #FF3D8B",
            borderRadius: "8px",
            padding: "6px 14px 8px",
            fontSize: "11px",
            fontWeight: 900,
            color: "#7B2D00",
            boxShadow: "0 4px 14px rgba(255,61,139,0.3)",
            lineHeight: 1.45,
            textAlign: "center",
            position: "relative",
            maxWidth: "210px",
            whiteSpace: "normal",
          } : {
            background: "#FFFAF0",
            border: "1.5px solid #E53E3E",
            borderRadius: "8px",
            padding: "5px 12px 6px",
            fontSize: "10px",
            fontWeight: 900,
            color: "#7B2D00",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
            lineHeight: 1.4,
            textAlign: "center",
            position: "relative",
          }}>
            <div style={{
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "12px",
              height: "8px",
              borderLeft: isClosed ? "2.5px solid #666666" : isHighlight ? "2.5px solid #FF3D8B" : "1.5px solid #E53E3E",
              borderRight: isClosed ? "2.5px solid #666666" : isHighlight ? "2.5px solid #FF3D8B" : "1.5px solid #E53E3E",
              borderTop: isClosed ? "2.5px solid #666666" : isHighlight ? "2.5px solid #FF3D8B" : "1.5px solid #E53E3E",
              borderRadius: "5px 5px 0 0",
              background: isClosed ? "#F0F0F0" : isHighlight ? "#FFFBEA" : "#FFFAF0",
            }} />
            {shift.id === 1 ? (
              <>
                ⏳ Смена идёт. Набор закрыт.
                <br />
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#555555" }}>
                  Узнать про свободные места<br />можно, позвонив нам.
                </span>
              </>
            ) : isClosed ? (
              <>
                🚫 Места закончились
                <br />
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#555555" }}>
                  Могут появиться перед началом смены,<br />если кто-то откажется от брони
                </span>
              </>
            ) : isHighlight ? (
              <>
                🔥 Ближайшая смена со свободными местами
                <br />
                <span className="animate-rainbow-pulse" style={{ display: "inline-block", marginTop: "3px", fontSize: "12px", fontWeight: 900, color: "#fff", background: "linear-gradient(90deg,#FF3D8B,#FF5E1A,#FF3D8B)", borderRadius: "999px", padding: "2px 10px", letterSpacing: "0.3px", textShadow: "0 1px 2px rgba(0,0,0,0.35)", boxShadow: "0 0 12px rgba(255,61,139,0.7)" }}>
                  ⚡ Успейте! Осталось всего 5 мест
                </span>
              </>
            ) : (
              <>
                📍 Осталось{" "}
                <strong style={{ color: "#C05621" }}>
                  {spots.count}
                </strong>{" "}
                {spotsWord(spots.count)}
                <br />
                <span style={{ fontSize: "9px", fontWeight: 700, color: "#A0522D" }}>
                  Успейте забронировать!
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}