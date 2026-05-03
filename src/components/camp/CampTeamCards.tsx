export default function CampTeamCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 max-w-4xl mx-auto">
      {/* НАТАЛЬЯ ПЕТРОВНА */}
      <article
        className="bg-white rounded-3xl overflow-hidden flex flex-col"
        style={{ border: "2px solid #FFE5D9", boxShadow: "0 8px 24px rgba(255,154,86,0.15)" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "4 / 5", background: "#FFE5D9" }}>
          <img
            src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/d3bca7f2-21f5-4ee8-919d-25cca436a8af.jpg"
            alt="Наталья Петровна — главный вожатый летнего клуба для детей в Керчи"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-black text-white"
            style={{ background: "linear-gradient(90deg,#FF3D8B,#FF9A56)", boxShadow: "0 3px 10px rgba(255,61,139,0.4)" }}
          >
            ⭐ ГЛАВНЫЙ ВОЖАТЫЙ
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="text-xl md:text-2xl font-black mb-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}>
            Наталья Петровна
          </h3>
          <p className="text-sm font-semibold mb-4" style={{ color: "#FF3D8B" }}>
            Главный вожатый и сердце клуба
          </p>
          <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: "rgba(61,61,61,0.85)" }}>
            <p>
              Человек-энтузиаст, для которого общение с детьми — это не работа, а источник энергии.
            </p>
            <p>
              Её талант — находить подход к любому ребёнку. Застенчивого раскрывает, активного направляет, скептика
              вдохновляет. Разговаривает с детьми «по-взрослому», без заигрывания, с искренним уважением.
            </p>
            <p>
              Рассказывает так увлекательно, что дети замирают и слушают, не шелохнувшись. Обладает огромным багажом
              знаний и щедро делится ими — от космоса до кулинарии, от истории до современных технологий.
            </p>
            <p>
              Участвует во всех активностях сама — подаёт пример, заражает энергией, мотивирует действием.
            </p>
          </div>
          <div
            className="mt-5 rounded-2xl p-4 italic font-semibold text-[15px]"
            style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFE5D9 100%)", color: "#3D3D3D", borderLeft: "4px solid #FF3D8B" }}
          >
            После смен дети говорят: «Можно я вернусь к Наталье Петровне?»
          </div>
        </div>
      </article>

      {/* ИРИНА ПАВЛОВНА */}
      <article
        className="bg-white rounded-3xl overflow-hidden flex flex-col"
        style={{ border: "2px solid #FFE5D9", boxShadow: "0 8px 24px rgba(255,154,86,0.15)" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "4 / 5", background: "#FFE5D9" }}>
          <img
            src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/4937136d-f7e6-44ad-b427-2a927b4483e6.jpg"
            alt="Ирина Павловна — вожатая-исследователь городского клуба Рыбка Долли в Керчи"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-black text-white"
            style={{ background: "linear-gradient(90deg,#00C9A7,#6C5CE7)", boxShadow: "0 3px 10px rgba(108,92,231,0.4)" }}
          >
            🔬 ИССЛЕДОВАТЕЛЬ
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="text-xl md:text-2xl font-black mb-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}>
            Ирина Павловна
          </h3>
          <p className="text-sm font-semibold mb-4" style={{ color: "#6C5CE7" }}>
            Вожатая-исследователь
          </p>
          <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: "rgba(61,61,61,0.85)" }}>
            <p>Её стихия — опыты, эксперименты и раскрытие тайн природы.</p>
            <p>
              Ирина Павловна из тех людей, кто не останавливается на поверхностных ответах. Она докапывается до самой
              сути каждого явления — и с огромным энтузиазмом делится своими открытиями с детьми.
            </p>
            <p>
              Особенно к ней тянутся подростки. Она умеет разговаривать с ними на одной волне: без нравоучений, с
              искренним интересом и уважением. Дети чувствуют, что их мнение важно, их вопросы ценны.
            </p>
            <p>
              Её «Чудесная лаборатория» — это не просто занятия. Это взрывы эмоций (в прямом и переносном смысле!),
              удивление, восторг и те самые моменты «Вау!», которые запоминаются на всю жизнь.
            </p>
            <p>
              Кто хоть раз побывал на занятии у Ирины Павловны, навсегда запоминает яркие эмоции, которые она щедро
              дарит каждому ребёнку.
            </p>
          </div>
          <div
            className="mt-5 rounded-2xl p-4 italic font-semibold text-[15px]"
            style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #E8FF6A 60%)", color: "#3D3D3D", borderLeft: "4px solid #6C5CE7" }}
          >
            «С Ириной Павловной даже физика становится любимым предметом!» — говорят дети.
          </div>
        </div>
      </article>
    </div>
  );
}
