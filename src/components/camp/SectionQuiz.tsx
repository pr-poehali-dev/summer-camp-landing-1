import QuizCallout from "./QuizCallout";

export default function SectionQuiz() {
  return (
    <section id="kviz" className="py-12 px-4 scroll-mt-24" style={{ background: "#FFF8F0" }}>
      <div className="max-w-4xl mx-auto">
        <QuizCallout />
      </div>
    </section>
  );
}