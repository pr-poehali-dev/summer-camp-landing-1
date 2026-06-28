import { SHIFTS } from "./CampData";
import CampProgramHeader from "./CampProgramHeader";
import ProgramShiftCard from "./ProgramShiftCard";
import { SHIFT_SPOTS } from "./ProgramShiftHeader";
import { ShiftSpotsProvider, useShiftSpots } from "./useShiftSpots";

interface CampProgramProps {
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
}

function ProgramList({
  openAccordion,
  setOpenAccordion,
  scrollToBooking,
  setSelectedShift,
}: CampProgramProps) {
  const spotsMap = useShiftSpots();

  const isClosed = (id: number) => {
    if (id === 1 || id === 2) return true;
    if (SHIFT_SPOTS[id] !== undefined) {
      const c = spotsMap[id] !== undefined ? spotsMap[id] : SHIFT_SPOTS[id].count;
      return c <= 0;
    }
    return false;
  };

  const order = [3, 4, 5, 6, 7];
  const rank = (id: number) => {
    const i = order.indexOf(id);
    return i === -1 ? 100 + id : i;
  };

  const sorted = [...SHIFTS].sort((a, b) => {
    if (isClosed(a.id) !== isClosed(b.id)) return isClosed(a.id) ? 1 : -1;
    if (isClosed(a.id)) return a.id - b.id;
    return rank(a.id) - rank(b.id);
  });

  return (
    <div className="space-y-4">
      {sorted.map((shift) => (
        <ProgramShiftCard
          key={shift.id}
          shift={shift}
          openAccordion={openAccordion}
          setOpenAccordion={setOpenAccordion}
          scrollToBooking={scrollToBooking}
          setSelectedShift={setSelectedShift}
        />
      ))}
    </div>
  );
}

export default function CampProgram(props: CampProgramProps) {
  return (
    <ShiftSpotsProvider>
      <section id="programmy" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <CampProgramHeader />
          <ProgramList {...props} />
          <p className="text-center text-warm-600 mt-6 text-sm">И это только малая часть активностей! Скорее бронируйте, пока места не закончились!</p>
        </div>
      </section>
    </ShiftSpotsProvider>
  );
}