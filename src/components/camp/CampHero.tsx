import { useCountdown } from "./CampData";
import CampHeroTopBar from "./CampHeroTopBar";
import CampHeroMain from "./CampHeroMain";
import CampHeroTeenBanner from "./CampHeroTeenBanner";

interface CampHeroProps {
  scrollToBooking: () => void;
}

export default function CampHero({ scrollToBooking }: CampHeroProps) {
  const deadline = new Date("2026-05-31T23:59:00");
  const countdown = useCountdown(deadline);

  return (
    <>
      {/* ── ШАПКА ─────────────────────────────────────────────────────────────── */}
      <CampHeroTopBar />

      {/* ── БЛОК 1: HERO ──────────────────────────────────────────────────────── */}
      <CampHeroMain countdown={countdown} scrollToBooking={scrollToBooking} />

      {/* ── БАННЕР: УНИКАЛЬНЫЕ ПОДРОСТКОВЫЕ СМЕНЫ ─────────────────────────────── */}
      <CampHeroTeenBanner />
    </>
  );
}