import { useEffect, useRef, useState } from "react";
import CampHero from "@/components/camp/CampHero";
import CampProgram from "@/components/camp/CampProgram";
import CampTeam from "@/components/camp/CampTeam";
import CampReviews from "@/components/camp/CampReviews";
import CampBooking from "@/components/camp/CampBooking";
import CampFooter from "@/components/camp/CampFooter";
import SectionSchedule from "@/components/camp/SectionSchedule";
import SectionSafety from "@/components/camp/SectionSafety";
import SectionFood from "@/components/camp/SectionFood";
import SectionForWhom from "@/components/camp/SectionForWhom";
import SectionVideos from "@/components/camp/SectionVideos";
import SectionDarkPromo from "@/components/camp/SectionDarkPromo";
import SectionKidsReviews from "@/components/camp/SectionKidsReviews";
import SectionFAQ from "@/components/camp/SectionFAQ";

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
      {/* 1. ПЕРВЫЙ ЭКРАН (Hero) */}
      <CampHero scrollToBooking={scrollToBooking} />

      {/* 2. ПРОГРАММА СМЕН */}
      <CampProgram
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
        scrollToBooking={scrollToBooking}
        setSelectedShift={setSelectedShift}
      />

      {/* 3. РАСПИСАНИЕ ДНЯ */}
      <SectionSchedule />

      {/* 4. БЕЗОПАСНОСТЬ + ПИТАНИЕ */}
      <SectionSafety />
      <SectionFood />

      {/* 5. КОМАНДА */}
      <CampTeam />

      {/* 6. ЭТО ДЛЯ ВАС, ЕСЛИ... */}
      <SectionForWhom />

      {/* 7. ФОТО/ВИДЕО ПРОШЛОГО ГОДА + промо-блок */}
      <SectionVideos />
      <SectionDarkPromo scrollToBooking={scrollToBooking} />

      {/* 8. ОТЗЫВЫ ДЕТЕЙ + РОДИТЕЛЕЙ */}
      <SectionKidsReviews />
      <CampReviews />

      {/* 9. СТОИМОСТЬ И ОПЛАТА */}
      <CampBooking bookingRef={bookingRef} selectedShift={selectedShift} />

      {/* 10. FAQ */}
      <SectionFAQ />

      {/* 11. ПОДВАЛ */}
      <CampFooter />
    </div>
  );
}
