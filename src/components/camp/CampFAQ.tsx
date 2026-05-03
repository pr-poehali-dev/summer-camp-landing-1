import CampFAQHeader from "./CampFAQHeader";
import CampFAQList from "./CampFAQList";
import CampFAQForm from "./CampFAQForm";

export default function CampFAQ() {
  return (
    <section id="faq" className="bg-white rounded-3xl p-6 md:p-8" style={{ border: "2px solid #FFE5D9", boxShadow: "0 10px 30px rgba(255,154,86,0.15)" }}>
      <CampFAQHeader />

      <CampFAQList />

      <CampFAQForm />
    </section>
  );
}
