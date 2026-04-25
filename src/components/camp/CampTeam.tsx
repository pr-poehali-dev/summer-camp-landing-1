export default function CampTeam() {
  return (
    <section id="team" className="py-16 px-4" style={{ background: "#FFF8F0" }}>
      <div className="max-w-5xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* НАТАЛЬЯ ПЕТРОВНА */}
          <article
            className="bg-white rounded-3xl overflow-hidden flex flex-col"
            style={{ border: "2px solid #FFE5D9", boxShadow: "0 10px 30px rgba(255,154,86,0.15)" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "4 / 5", background: "#FFE5D9" }}>
              <img
                src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/6b445411-c7a1-4537-8a40-f07b41d6f97e.jpg"
                alt="Наталья Петровна — главный вожатый"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black text-white"
                style={{ background: "linear-gradient(90deg,#FF3D8B,#FF9A56)", boxShadow: "0 4px 12px rgba(255,61,139,0.4)" }}
              >
                ⭐ ГЛАВНЫЙ ВОЖАТЫЙ
              </div>
            </div>
            <div className="p-6 md:p-7">
              <h3 className="text-2xl font-black mb-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}>
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
            style={{ border: "2px solid #FFE5D9", boxShadow: "0 10px 30px rgba(255,154,86,0.15)" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "4 / 5", background: "#FFE5D9" }}>
              <img
                src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/67f89cbe-6ce7-41ce-b8a4-52fa6d5cad61.jpg"
                alt="Ирина Павловна — вожатая-исследователь"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black text-white"
                style={{ background: "linear-gradient(90deg,#00C9A7,#6C5CE7)", boxShadow: "0 4px 12px rgba(108,92,231,0.4)" }}
              >
                🔬 ИССЛЕДОВАТЕЛЬ
              </div>
            </div>
            <div className="p-6 md:p-7">
              <h3 className="text-2xl font-black mb-1" style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}>
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

        {/* КАРТОЧКА БЕЗ ФОТО — ПОМОЩНИКИ */}
        <article
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #6C5CE7 0%, #A855F7 50%, #FF3D8B 100%)",
            boxShadow: "0 14px 36px rgba(108,92,231,0.35)",
          }}
        >
          <div className="absolute -top-8 -right-6 text-9xl opacity-15 select-none">🎉</div>
          <div className="absolute -bottom-8 -left-6 text-8xl opacity-10 select-none">🤝</div>
          <div className="relative z-10 p-6 md:p-10 text-white">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div
                className="px-3 py-1.5 rounded-full text-xs font-black"
                style={{ background: "#FFD93D", color: "#3D1E70" }}
              >
                ✨ А ЕЩЁ В НАШЕЙ КОМАНДЕ…
              </div>
            </div>
            <h3
              className="text-2xl md:text-3xl font-black mb-2"
              style={{ fontFamily: "'Baloo 2', cursive", textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
            >
              Вожатые-помощники — старшие друзья для детей
            </h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-5 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.92)" }}>
              <p>
                В каждой смене с нами работают молодые вожатые 17–20 лет — студенты, которые обожают работу с детьми и
                приходят к нам снова и снова.
              </p>
              <p>
                Они не просто помощники — они становятся для детей старшими друзьями и примером для подражания.
              </p>
              <p>
                С ними легко найти общий язык: они говорят на одном языке с детьми, понимают их интересы, знают
                актуальные мемы и тренды. При этом достаточно взрослые, чтобы быть авторитетом.
              </p>
              <p>
                Дети особенно тянутся к молодым вожатым: с ними можно поговорить по душам, поделиться секретами,
                спросить совета. Они создают атмосферу доверия и дружбы.
              </p>
            </div>
            <div
              className="mt-6 rounded-2xl p-4 md:p-5 font-semibold text-[15px]"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px dashed rgba(255,217,61,0.6)" }}
            >
              Наша команда постоянно обновляется, но принцип остаётся неизменным: только те, кто искренне любит детей и
              готов отдавать им энергию и внимание.
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
