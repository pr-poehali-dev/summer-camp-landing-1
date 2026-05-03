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
          {SHIFTS.map((shift) => (
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
