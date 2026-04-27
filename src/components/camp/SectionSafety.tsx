import SectionTitle from "./SectionTitle";

export default function SectionSafety() {
  return (
    <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #FFF8F0 0%, #FFE5D9 100%)"}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <SectionTitle className="mb-3">🛡️ Безопасность — наш приоритет №1</SectionTitle>
          <p style={{color:"rgba(61,61,61,0.7)"}}>Что мы делаем, чтобы вы были спокойны:</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { emoji: "🚑", title: "Первая помощь", desc: "Вожатые с сертификатами — обучение каждый год" },
            { emoji: "🎒", title: "Аптечка всегда рядом", desc: "Йод, бинты, антисептики, средства от ожогов" },
            { emoji: "🏊", title: "Купание под контролем", desc: "На 3 детей — 1 взрослый, всегда рядом" },
            { emoji: "🗺️", title: "Проверенные маршруты", desc: "Пляжи с костром — безопасные и проверенные места" },
            { emoji: "📞", title: "Связь весь день", desc: "Вы всегда можете позвонить и узнать как дела" },
            { emoji: "📸", title: "Родители в курсе", desc: "Фото и видео каждый день в родительском чате" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm summer-card text-center" style={{border:"2px solid #FFE5D9"}}>
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="font-black mb-1" style={{color:"#3D3D3D"}}>{item.title}</h3>
              <p className="text-sm" style={{color:"rgba(61,61,61,0.7)"}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}