export default function SectionFood() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{fontFamily:"'Baloo 2', cursive", color:"#3D3D3D"}}>🍜 Чем кормим?</h2>
          <p style={{color:"rgba(61,61,61,0.7)"}}>Вкусно, сытно и по-домашнему!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              day: "🗓️ Среда", color: "from-[#FF9A56] to-[#FFD93D]",
              meals: [
                { type: "🍲 Обед", items: ["Чечевичный суп с сухариками", "Плов с говядиной", "Овощная нарезка (помидоры, огурцы, салат)", "Компот из сезонных фруктов"] },
                { type: "🍎 Полдник", items: ["Булочка со штрейзельной крошкой", "Чай", "Фрукты по сезону"] },
              ]
            },
            {
              day: "🗓️ Пятница", color: "from-[#FFD93D] to-[#FF9A3C]",
              meals: [
                { type: "🍲 Обед", items: ["Зелёный борщ", "Хлеб с маслом", "Пельмени с куриным фаршем", "Салат из моркови", "Чай с лимоном"] },
                { type: "🍎 Полдник", items: ["Шарлотка с яблоками", "Чай с молоком (по желанию)"] },
              ]
            }
          ].map((menu, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm" style={{border:"2px solid #FFE5D9"}}>
              <div className={`bg-gradient-to-r ${menu.color} font-black text-xl p-4 text-white`} style={{textShadow:"0 1px 3px rgba(0,0,0,0.15)"}}>{menu.day}</div>
              <div className="p-5 space-y-4">
                {menu.meals.map((meal, j) => (
                  <div key={j}>
                    <p className="font-bold mb-2" style={{color:"#3D3D3D"}}>{meal.type}</p>
                    <ul className="space-y-1">
                      {meal.items.map((item, k) => (
                        <li key={k} className="text-sm flex gap-2" style={{color:"rgba(61,61,61,0.85)"}}>
                          <span style={{color:"#00C9A7"}}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}