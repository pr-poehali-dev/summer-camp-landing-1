import { SHIFTS } from "./CampData";
import CampProgramHeader from "./CampProgramHeader";
import ProgramShiftCard from "./ProgramShiftCard";

interface CampProgramProps {
  openAccordion: number | null;
  setOpenAccordion: (id: number | null) => void;
  scrollToBooking: () => void;
  setSelectedShift: (id: number) => void;
}

export default function CampProgram({
  openAccordion,
  setOpenAccordion,
  scrollToBooking,
  setSelectedShift,
}: CampProgramProps) {
  return (
    <section id="programmy" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <CampProgramHeader />
        <div className="space-y-4">
          {[...SHIFTS]
            .sort((a, b) => {
              const closed = (id: number) => id === 1 || id === 2 || id === 4;
              const order = [3, 5, 6, 7];
              const rank = (id: number) => {
                const i = order.indexOf(id);
                return i === -1 ? 100 + id : i;
              };
              if (closed(a.id) !== closed(b.id)) return closed(a.id) ? 1 : -1;
              if (closed(a.id)) return a.id - b.id;
              return rank(a.id) - rank(b.id);
            })
            .map((shift) => (
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
        <p className="text-center text-warm-600 mt-6 text-sm">И это только малая часть активностей! Скорее бронируйте, пока места не закончились!</p>
      </div>
    </section>
  );
}