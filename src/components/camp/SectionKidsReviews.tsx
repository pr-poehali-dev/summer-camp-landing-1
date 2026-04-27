import VideoReviews from "./VideoReviews";
import SectionTitle from "./SectionTitle";

export default function SectionKidsReviews() {
  return (
    <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #E8FF6A 0%, #C8F000 100%)"}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm mb-4 text-white" style={{background:"linear-gradient(90deg,#FF9A56,#FFD93D)"}}>
            ⚡ Уже забронировали 25 семей
          </div>
          <SectionTitle className="mb-4" size="lg">⭐ Отзывы детей ⭐</SectionTitle>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-semibold" style={{fontFamily:"'Nunito', sans-serif", color:"rgba(61,61,61,0.85)"}}>
            Послушайте, что говорят сами дети — их слова честнее любой рекламы. Горящие глаза, счастливые голоса — вот что остаётся после наших смен.
          </p>
        </div>

        <VideoReviews />
      </div>
    </section>
  );
}