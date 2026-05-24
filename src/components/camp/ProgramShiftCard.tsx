import { SHIFTS } from "./CampData";
import ProgramShiftHeader, { SHIFT_SPOTS } from "./ProgramShiftHeader";
import ProgramShiftBody from "./ProgramShiftBody";

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
  const isTeen = shift.id === 4 || shift.id === 5;
  const isShort = shift.id === 7;
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
    <div className="relative" style={{ marginBottom: spots ? "28px" : "0" }}>
      <div
        className={`rounded-3xl transition-transform hover:-translate-y-0.5 relative ${isShort ? "animate-short-shift" : ""}`}
        style={isTeen ? {
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

      {spots && (
        <div
          className="tag-swing absolute pointer-events-none"
          style={{
            bottom: "-34px",
            right: "20px",
            zIndex: 20,
            transformOrigin: "top center",
          }}
        >
          <div style={shift.id === 4 ? {
            background: "#EFEFEF",
            border: "2.5px solid #666666",
            borderRadius: "8px",
            padding: "5px 12px 6px",
            fontSize: "10px",
            fontWeight: 900,
            color: "#333333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
            lineHeight: 1.4,
            textAlign: "center",
            position: "relative",
            maxWidth: "180px",
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
              borderLeft: shift.id === 4 ? "2.5px solid #666666" : "1.5px solid #E53E3E",
              borderRight: shift.id === 4 ? "2.5px solid #666666" : "1.5px solid #E53E3E",
              borderTop: shift.id === 4 ? "2.5px solid #666666" : "1.5px solid #E53E3E",
              borderRadius: "5px 5px 0 0",
              background: shift.id === 4 ? "#F0F0F0" : "#FFFAF0",
            }} />
            {shift.id === 4 ? (
              <>
                🚫 Места закончились
                <br />
                <span style={{ fontSize: "9px", fontWeight: 800, color: "#555555" }}>
                  Могут появиться перед началом смены,<br />если кто-то откажется от брони
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
                {spots.discount && (
                  <div style={{ marginTop: "2px", fontSize: "9px", fontWeight: 900, color: "#C53030" }}>
                    + скидка 20%
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}