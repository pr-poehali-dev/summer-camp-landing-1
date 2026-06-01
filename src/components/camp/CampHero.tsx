import CampHeroTopBar from "./CampHeroTopBar";
import CampHeroMain from "./CampHeroMain";
import CampHeroTeenBanner from "./CampHeroTeenBanner";

interface CampHeroProps {
  scrollToBooking: () => void;
}

export default function CampHero({ scrollToBooking }: CampHeroProps) {
  return (
    <>
      {/* ── ШАПКА ─────────────────────────────────────────────────────────────── */}
      <CampHeroTopBar />

      {/* ── БЛОК 1: HERO ──────────────────────────────────────────────────────── */}
      <CampHeroMain scrollToBooking={scrollToBooking} />

      {/* ── БАННЕР: УНИКАЛЬНЫЕ ПОДРОСТКОВЫЕ СМЕНЫ ─────────────────────────────── */}
      <CampHeroTeenBanner />
    </>
  );
}