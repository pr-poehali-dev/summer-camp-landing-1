export default function CampTeamHeader() {
  return (
    <div className="text-center mb-10">
      <div
        className="inline-flex items-center gap-2 font-bold px-4 py-1.5 rounded-full text-xs mb-3 text-white"
        style={{ background: "linear-gradient(90deg,#FF9A56,#FFD93D)" }}
      >
        👥 НАША КОМАНДА
      </div>
      <h2
        className="text-3xl md:text-5xl font-black mb-3 animate-rainbow-pulse"
        style={{
          fontFamily: "'Fredoka One', cursive",
          backgroundImage:
            "linear-gradient(90deg, #FF3D8B 0%, #FF9A56 20%, #FFD93D 40%, #00C9A7 60%, #6C5CE7 80%, #FF3D8B 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.5px",
        }}
      >
        💛 Кто будет с вашим ребёнком
      </h2>
      <p className="max-w-2xl mx-auto" style={{ color: "rgba(61,61,61,0.7)" }}>
        Не случайные люди, а те, кто искренне любит детей и работает с ними годами.
      </p>
    </div>
  );
}
