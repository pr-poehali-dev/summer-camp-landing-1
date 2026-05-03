import { useState } from "react";

const QUESTIONS_URL = "https://functions.poehali.dev/e5f876ee-298a-401b-b6dd-8251bc6df945";

export default function CampFAQForm() {
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
    <>
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
    </>
  );
}
