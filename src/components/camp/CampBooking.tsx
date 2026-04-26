import { useCountdown, PRICE_FULL, PRICE_SALE } from "./CampData";
import ReserveCTA from "./ReserveCTA";
import PriceBlock from "./PriceBlock";

interface CampBookingProps {
  bookingRef: React.RefObject<HTMLDivElement>;
  selectedShift?: number | null;
}

const SHORT_SHIFT_ID = 7;
const SHORT_SHIFT_PRICE = 7000;

export default function CampBooking({ bookingRef, selectedShift }: CampBookingProps) {
  const deadline = new Date("2026-05-15T23:59:00");
  const countdown = useCountdown(deadline);
  const afterDiscount = countdown.days > 0 || countdown.hours > 0;

  const isShort = selectedShift === SHORT_SHIFT_ID;
  const displayPrice = isShort ? SHORT_SHIFT_PRICE : (afterDiscount ? PRICE_SALE : PRICE_FULL);
  const oldPrice = isShort ? PRICE_SALE : PRICE_FULL;

  return (
    <>
      {/* ── ФИНАЛЬНЫЙ БЛОК: ЦЕНА + CTA + КВИЗ ─────────────────────────────────── */}
      <section
        ref={bookingRef}
        className="py-16 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)" }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <PriceBlock
            isShort={isShort}
            shortShiftId={SHORT_SHIFT_ID}
            displayPrice={displayPrice}
            oldPrice={oldPrice}
            afterDiscount={afterDiscount}
            countdown={countdown}
          />

          {/* CTA: крупная переливающаяся кнопка */}
          <div className="mb-2">
            <ReserveCTA defaultShiftId={selectedShift ?? null} />
          </div>
        </div>
      </section>
    </>
  );
}