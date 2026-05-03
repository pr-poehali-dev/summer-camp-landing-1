export default function CampFAQHeader() {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center gap-2 font-bold px-4 py-1.5 rounded-full text-xs mb-3 text-white" style={{ background: "linear-gradient(90deg,#FF9A56,#FFD93D)" }}>
        ❓ FAQ
      </div>
      <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}>
        Частые вопросы
      </h2>
      <p className="mt-2" style={{ color: "rgba(61,61,61,0.7)" }}>
        Мы собрали то, что чаще всего спрашивают родители
      </p>
    </div>
  );
}
