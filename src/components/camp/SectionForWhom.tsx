export default function SectionForWhom() {
  return (
    <section className="py-16 px-4" style={{background:"linear-gradient(180deg, #E8FF6A 0%, #C8F000 100%)"}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>Рыбка Долли — это для вашего ребёнка, если:</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { emoji: "🎂", text: "Ему 7–14 лет", detail: "Смены разделены по возрастам — каждый в своей группе" },
            { emoji: "🛡️", text: "Он любит приключения, но вы переживаете за безопасность", detail: "Опытные педагоги-вожатые с опытом более 5 лет" },
            { emoji: "🤝", text: "Он застенчивый, мало друзей", detail: "Наши программы раскрывают детей через игру и творчество" },
            { emoji: "💪", text: "Вы хотите научить его самостоятельности", detail: "Готовим на костре, ставим палатку, работаем в команде" },
            { emoji: "📱", text: "Он «залипает» в гаджетах", detail: "Телефоны только для связи с родителями — вечером 30 минут" },
            { emoji: "🌟", text: "Вы хотите, чтобы лето было незабываемым", detail: "Каждая смена — отдельная история с уникальной темой!" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 flex gap-4 items-start shadow-sm summer-card" style={{border:"2px solid #FFE5D9"}}>
              <div className="text-3xl flex-shrink-0">{item.emoji}</div>
              <div>
                <p className="font-bold" style={{color:"#3D3D3D"}}>✅ {item.text}</p>
                <p className="text-sm mt-0.5" style={{color:"rgba(61,61,61,0.7)"}}>→ {item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl p-6 text-white text-center" style={{background:"linear-gradient(90deg, #00C9A7 0%, #FFD93D 100%)"}}>
          <p className="text-xl font-black mb-2">🎯 Мы чётко разделяем возраст!</p>
          <p className="text-white/90">
            В смене для детей 10–14 лет мы не рисуем котиков — мы создаём чат-ботов, элитную парфюмерию,
            солнечные батареи и дизайнерские вещи. Разный возраст — разные интересы.
            <br/><strong>Лето не должно быть испорчено ни у кого! Только радость и восторг!</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
