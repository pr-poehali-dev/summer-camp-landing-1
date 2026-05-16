import { lazy, Suspense, useEffect, useRef, useState } from "react";
import CampHero from "@/components/camp/CampHero";
import FloatingBookButton from "@/components/camp/FloatingBookButton";
import { openReserveModal } from "@/components/camp/reserveCTAUtils";

const CampProgram = lazy(() => import("@/components/camp/CampProgram"));
const CampTeam = lazy(() => import("@/components/camp/CampTeam"));
const CampReviews = lazy(() => import("@/components/camp/CampReviews"));
const CampBooking = lazy(() => import("@/components/camp/CampBooking"));
const CampFooter = lazy(() => import("@/components/camp/CampFooter"));
const SectionSchedule = lazy(() => import("@/components/camp/SectionSchedule"));
const SectionSafety = lazy(() => import("@/components/camp/SectionSafety"));
const SectionFood = lazy(() => import("@/components/camp/SectionFood"));
const SectionForWhom = lazy(() => import("@/components/camp/SectionForWhom"));
const SectionVideos = lazy(() => import("@/components/camp/SectionVideos"));
const SectionDarkPromo = lazy(() => import("@/components/camp/SectionDarkPromo"));
const SectionKidsReviews = lazy(() => import("@/components/camp/SectionKidsReviews"));
const SectionFAQ = lazy(() => import("@/components/camp/SectionFAQ"));
const SectionQuiz = lazy(() => import("@/components/camp/SectionQuiz"));
const SectionLocation = lazy(() => import("@/components/camp/SectionLocation"));
const SectionWhyUs = lazy(() => import("@/components/camp/SectionWhyUs"));

const SectionFallback = () => (
  <div className="py-16 px-4 flex items-center justify-center" style={{ background: "#FFF8F0" }}>
    <div className="w-10 h-10 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
  </div>
);

export default function Index() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [selectedShift, setSelectedShift] = useState<number | null>(null);

  const bookingRef = useRef<HTMLDivElement>(null);
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#book");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

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
    if (window.location.hash === "#book") {
      const t = window.setTimeout(() => openReserveModal(), 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const go = params.get("go");
    if (!go) return;
    const targetId = go === "tseny" ? "tseny" : go === "kviz" ? "kviz" : go === "call" ? "call" : null;
    if (!targetId) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${targetId}`);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    }, 400);
    return () => window.clearTimeout(t);
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

      <Suspense fallback={<SectionFallback />}>
        {/* 1.5 ПОЧЕМУ ИМЕННО МЫ */}
        <SectionWhyUs />

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
      </Suspense>

      <FloatingBookButton />
    </div>
  );
}