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
import SectionQuiz from "@/components/camp/SectionQuiz";
import SectionLocation from "@/components/camp/SectionLocation";

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

  useEffect(() => {
    const highlight = (hash: string) => {
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove("anchor-highlight");
      void el.offsetWidth;
      el.classList.add("anchor-highlight");
      window.setTimeout(() => el.classList.remove("anchor-highlight"), 3500);
    };

    if (window.location.hash) {
      window.setTimeout(() => highlight(window.location.hash), 350);
    }

    const onHashChange = () => highlight(window.location.hash);
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      window.setTimeout(() => highlight(href), 50);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
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

      {/* 2.5 ПОМОЩЬ В ВЫБОРЕ (КВИЗ) */}
      <SectionQuiz />

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

      {/* 11. КАК НАС НАЙТИ */}
      <SectionLocation />

      {/* 12. ПОДВАЛ */}
      <CampFooter />
    </div>
  );
}