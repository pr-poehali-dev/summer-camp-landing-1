import { useState } from "react";

const APPLY_URL = "https://functions.poehali.dev/888ad9f6-9ffa-4eb9-a1b3-84ae5e011c17";

export default function CampTeam() {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg("Заполни имя и телефон");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(APPLY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          age,
          phone,
          email,
          about,
          experience,
        }),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setStatus("sent");
      setFullName("");
      setAge("");
      setPhone("");
      setEmail("");
      setAbout("");
      setExperience("");
    } catch {
      setErrorMsg("Не получилось отправить. Попробуй ещё раз или позвони нам.");
      setStatus("error");
    }
  };

  const closeModal = () => {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
  };

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

        {/* CTA: записаться в команду */}
        <div
          className="mt-8 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:justify-between"
          style={{
            background: "linear-gradient(135deg, #FFF8F0 0%, #FFE5D9 100%)",
            border: "2px dashed #FF9A56",
          }}
        >
          <div>
            <h3 className="font-black text-xl md:text-2xl mb-1" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
              🌟 Хочешь стать частью нашей команды?
            </h3>
            <p className="text-sm md:text-base" style={{ color: "rgba(61,61,61,0.75)" }}>
              Если тебе 17–20 лет, ты любишь детей и горишь идеями — оставь заявку, мы свяжемся!
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="font-black rounded-2xl px-6 py-3.5 text-base transition-transform hover:scale-105 whitespace-nowrap"
            style={{
              background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
              color: "white",
              boxShadow: "0 6px 0 rgba(255,61,139,0.35), 0 10px 24px rgba(255,154,86,0.45)",
            }}
          >
            Записаться в команду →
          </button>
        </div>
      </div>

      {/* МОДАЛКА */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg relative"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-xl font-black"
              style={{ background: "#FFE5D9", color: "#3D3D3D" }}
              aria-label="Закрыть"
            >
              ×
            </button>

            <div
              className="rounded-t-3xl p-6 text-center text-white"
              style={{ background: "linear-gradient(135deg,#6C5CE7 0%,#A855F7 50%,#FF3D8B 100%)" }}
            >
              <div className="text-4xl mb-2">🌟</div>
              <h3 className="text-xl md:text-2xl font-black" style={{ fontFamily: "'Baloo 2', cursive" }}>
                Заявка в команду вожатых
              </h3>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                Расскажи о себе — и мы свяжемся!
              </p>
            </div>

            {status === "sent" ? (
              <div className="p-6 md:p-8 text-center">
                <div className="text-5xl mb-3">✅</div>
                <h4 className="text-xl font-black mb-2" style={{ color: "#3D3D3D" }}>
                  Заявка отправлена!
                </h4>
                <p className="text-sm mb-5" style={{ color: "rgba(61,61,61,0.75)" }}>
                  Мы получили твою заявку и свяжемся с тобой в ближайшее время.
                </p>
                <button
                  onClick={closeModal}
                  className="font-bold rounded-xl px-5 py-2.5"
                  style={{ background: "#FF9A56", color: "white" }}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 md:p-7 space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                    placeholder="Анна Иванова"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                      Возраст
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                      placeholder="19"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                      placeholder="+7 ___ ___-__-__"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                    О себе
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                    placeholder="Студентка, люблю работу с детьми..."
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "#3D3D3D" }}>
                    Опыт работы с детьми
                  </label>
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
                    placeholder="Была вожатой в школе, занималась с младшим братом..."
                    rows={2}
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p className="text-sm font-semibold" style={{ color: "#FF3D8B" }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full font-black rounded-2xl py-3.5 text-base transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
                    color: "white",
                    boxShadow: "0 6px 0 rgba(255,61,139,0.35)",
                  }}
                >
                  {status === "sending" ? "Отправляем..." : "Отправить заявку"}
                </button>
                <p className="text-xs text-center" style={{ color: "rgba(61,61,61,0.55)" }}>
                  Нажимая кнопку, ты соглашаешься на обработку персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
