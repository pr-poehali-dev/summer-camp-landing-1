import { useEffect, useRef, useState } from "react";
import CampHero from "@/components/camp/CampHero";
import CampProgram from "@/components/camp/CampProgram";
import CampBooking from "@/components/camp/CampBooking";

export default function Index() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedShift, setSelectedShift] = useState<number | null>(null);

  const bookingRef = useRef<HTMLDivElement>(null);
  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("opacity-100", "translate-y-0");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FFF8F0" }}>
      <CampHero scrollToBooking={scrollToBooking} />
      <CampProgram
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
        scrollToBooking={scrollToBooking}
        setSelectedShift={setSelectedShift}
      />
      <CampBooking bookingRef={bookingRef} selectedShift={selectedShift} />
    </div>
  );
}