import { useState } from "react";
import Icon from "@/components/ui/icon";

const QUESTIONS_URL = "https://functions.poehali.dev/e5f876ee-298a-401b-b6dd-8251bc6df945";

const FAQ_ITEMS = [
  {
    emoji: "🛡️",
    title: "Безопасность",
    question: "Как вы следите за детьми? Что если ребёнок потеряется или поранится?",
    answer: [
      "Безопасность — наш приоритет №1. Вот что мы делаем:",
      "✅ На каждые 5 детей — 1 вожатый (постоянный контроль)",
      "✅ Все вожатые имеют сертификаты по оказанию первой помощи",
      "✅ Аптечка всегда с группой",
      "✅ Гуляем только на оборудованных площадках",
      "✅ Купание только под присмотром (вожатый в воде с детьми)",
      "✅ Родители получают фото/видео каждый вечер + можно позвонить ребёнку",
    ],
  },
  {
    emoji: "🤗",
    title: "Адаптация застенчивого ребёнка",
    question: "Мой ребёнок застенчивый, мало друзей. Не будет ли ему некомфортно?",
    answer: [
      "Наша программа специально создана для раскрытия таких детей!",
      "Что мы делаем:",
      "✅ Первый день — игры на знакомство (без давления, в игровой форме)",
      "✅ Вожатые помогают найти «друга по интересам» (наблюдаем, кто с кем тянется)",
      "✅ Малые группы (до 12 детей) — легче влиться",
      "✅ Творческие задания (где можно проявить себя, не выступая перед всеми)",
      "✅ Вечерние «круги» — каждый делится впечатлениями (учимся говорить о себе)",
      "Статистика: 8 из 10 застенчивых детей к концу смены становятся активными участниками. Родители пишут: «Не узнаю ребёнка!»",
    ],
  },
  {
    emoji: "📱",
    title: "Гаджеты",
    question: "Можно ли ребёнку брать телефон/планшет?",
    answer: [
      "Телефон брать можно (и нужно — для связи с родителями!).",
      "Правила использования:",
      "📱 С 10:00 до 18:00 — телефонами мы не пользуемся. Только для связи с родителями.",
      "🎮 Планшеты и игровые приставки — просим оставить дома",
      "Почему: наша цель — живое общение, игры на свежем воздухе, творчество. Дети так увлечены программой, что даже не вспоминают про гаджеты!",
    ],
  },
  {
    emoji: "🎒",
    title: "Что брать с собой",
    question: "Что нужно взять ребёнку с собой?",
    answer: [
      "Мы пришлём подробный список после бронирования. Основное:",
      "Одежда:",
      "• Головной убор от солнца",
      "• Сменная обувь",
      "• Купальник/плавки (для моря)",
      "Гигиена:",
      "• Полотенце (1 шт) для моря",
      "• Расчёска",
      "Дополнительно:",
      "• Бутылка для воды",
      "• Солнцезащитный крем",
      "• Средство от комаров (если есть аллергия на укусы)",
      "НЕ нужно:",
      "❌ Дорогие вещи (могут потеряться)",
      "❌ Много сладостей (кормим, не переживайте!)",
      "❌ Планшеты, игровые приставки",
    ],
  },
  {
    emoji: "📞",
    title: "Связь с ребёнком",
    question: "Как я буду на связи с ребёнком? Можно ли приехать проведать?",
    answer: [
      "Вы будете в курсе всего, что происходит!",
      "Ежедневно:",
      "📸 Фото дня (10–15 штук в общем чате родителей)",
      "📹 Короткое видео (1–2 минуты: чем занимались сегодня)",
      "📝 Отчёт вожатого (как ребёнок себя чувствует, что ел, во что играл)",
    ],
  },
  {
    emoji: "🌟",
    title: "Первый раз в лагере",
    question: "Ребёнок ни разу не был в лагере. Вдруг будет плакать, проситься домой?",
    answer: [
      "Это нормальный страх! Мы работаем с новичками постоянно.",
      "Что делаем:",
      "✅ Первый день — игры на знакомство. Вожатые помогают найти друзей.",
      "✅ Программа настолько насыщенная, что некогда грустить (буквально каждые полчаса — новая активность).",
      "✅ Вожатые на связи — если ребёнок расстроен, уделяем время, разговариваем, включаем в процесс.",
      "Статистика: 9 из 10 детей адаптируются за 1–2 дня. К концу смены просят: «Можно я останусь ещё?»",
    ],
  },
];

export default function CampFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !question.trim()) {
      setErrorMsg("Заполни имя, email и вопрос");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(QUESTIONS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, child_age: age, email, question }),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setStatus("sent");
      setName("");
      setAge("");
      setEmail("");
      setQuestion("");
    } catch {
      setErrorMsg("Не получилось отправить. Попробуй ещё раз или позвони нам.");
      setStatus("error");
    }
  };

  return (
    <section id="faq" className="bg-white rounded-3xl p-6 md:p-8" style={{ border: "2px solid #FFE5D9", boxShadow: "0 10px 30px rgba(255,154,86,0.15)" }}>
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

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ border: "2px solid #FFE5D9", background: open ? "#FFF8F0" : "white" }}
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div className="min-w-0">
                    <div className="font-black" style={{ color: "#FF9A56", fontSize: "0.85rem", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                      {item.title}
                    </div>
                    <div className="font-bold text-base md:text-lg leading-tight" style={{ color: "#3D3D3D" }}>
                      {item.question}
                    </div>
                  </div>
                </div>
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform"
                  style={{
                    background: "linear-gradient(135deg,#FF9A56,#FFD93D)",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    color: "white",
                  }}
                >
                  <Icon name="ChevronDown" size={18} />
                </div>
              </button>
              {open && (
                <div className="px-5 pb-5 pt-1 space-y-2" style={{ color: "rgba(61,61,61,0.85)" }}>
                  {item.answer.map((line, idx) => (
                    <p key={idx} className="text-[15px] leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="mt-6 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:justify-between"
        style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFE5D9 100%)", border: "2px dashed #FF9A56" }}
      >
        <div>
          <h3 className="font-black text-lg md:text-xl mb-1" style={{ color: "#3D3D3D" }}>
            Не нашли ответа на свой вопрос?
          </h3>
          <p className="text-sm md:text-base" style={{ color: "rgba(61,61,61,0.75)" }}>
            Задайте его прямо здесь — мы ответим в ближайшее время.
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={() => setFormOpen(true)}
            className="font-black px-6 py-3 rounded-2xl text-white flex-shrink-0 transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#FF9A56,#FF5E1A)",
              boxShadow: "0 6px 0 #CC3F0B, 0 10px 25px rgba(255,94,26,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            ✉️ Задать вопрос
          </button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={submit}
          className="mt-4 rounded-2xl p-5 md:p-6 space-y-3"
          style={{ background: "#FFF8F0", border: "2px solid #FFE5D9" }}
        >
          {status === "sent" ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">✅</div>
              <h4 className="font-black text-xl mb-1" style={{ color: "#3D3D3D" }}>
                Спасибо! Вопрос отправлен
              </h4>
              <p style={{ color: "rgba(61,61,61,0.7)" }}>Мы ответим на ваш email в ближайшее время</p>
              <button
                type="button"
                onClick={() => {
                  setFormOpen(false);
                  setStatus("idle");
                }}
                className="mt-4 font-bold text-sm underline"
                style={{ color: "#FF9A56" }}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-bold" style={{ color: "#3D3D3D" }}>Ваше имя *</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white outline-none"
                    style={{ border: "2px solid #FFE5D9" }}
                    placeholder="Анна"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold" style={{ color: "#3D3D3D" }}>Возраст ребёнка</span>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white outline-none"
                    style={{ border: "2px solid #FFE5D9" }}
                    placeholder="9"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-bold" style={{ color: "#3D3D3D" }}>Email *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white outline-none"
                  style={{ border: "2px solid #FFE5D9" }}
                  placeholder="mama@example.com"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold" style={{ color: "#3D3D3D" }}>Ваш вопрос *</span>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white outline-none resize-none"
                  style={{ border: "2px solid #FFE5D9" }}
                  placeholder="Напишите, что вас волнует..."
                  required
                />
              </label>

              {status === "error" && errorMsg && (
                <p className="text-sm font-bold" style={{ color: "#E64D12" }}>
                  {errorMsg}
                </p>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-black px-6 py-3 rounded-2xl text-white transition-transform hover:scale-105 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg,#FF9A56,#FF5E1A)",
                    boxShadow: "0 6px 0 #CC3F0B, 0 10px 25px rgba(255,94,26,0.35)",
                  }}
                >
                  {status === "sending" ? "Отправляем..." : "Отправить вопрос"}
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="font-bold text-sm underline"
                  style={{ color: "rgba(61,61,61,0.6)" }}
                >
                  Отмена
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </section>
  );
}
