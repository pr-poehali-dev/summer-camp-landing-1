import { SHIFTS } from "./CampData";
import ProgramShiftHeader from "./ProgramShiftHeader";
import ProgramShiftBody from "./ProgramShiftBody";

type Shift = (typeof SHIFTS)[number];

interface ProgramShiftCardProps {
  shift: Shift;
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
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
    <div className={`rounded-3xl overflow-hidden transition-transform hover:-translate-y-0.5 relative ${isShort ? "animate-short-shift" : ""}`} style={isTeen ? {border:"3px solid #6C5CE7", boxShadow:"0 14px 0 rgba(108,92,231,0.25), 0 18px 50px rgba(108,92,231,0.45), 0 0 0 4px rgba(255,217,61,0.35), 0 2px 0 rgba(255,255,255,0.5) inset"} : isShort ? {border:"3px solid #00C9A7"} : {border:"3px solid #FFE5D9", boxShadow:"0 14px 0 rgba(204,106,0,0.18), 0 18px 40px rgba(255,154,86,0.3), 0 2px 0 rgba(255,255,255,0.5) inset"}}>
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
  );
}
