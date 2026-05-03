import { useState } from "react";
import { ymGoal } from "@/lib/ymGoal";
import PrivacyConsent from "./PrivacyConsent";

const APPLY_URL = "https://functions.poehali.dev/888ad9f6-9ffa-4eb9-a1b3-84ae5e011c17";

interface CampTeamApplyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CampTeamApplyModal({ open, onClose }: CampTeamApplyModalProps) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg("Заполни имя и телефон");
      setStatus("error");
      return;
    }
    if (!privacyConsent) {
      setErrorMsg("Необходимо согласие на обработку персональных данных");
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
      ymGoal("team_apply_submit");
      setStatus("sent");
      setFullName("");
      setAge("");
      setPhone("");
      setEmail("");
      setAbout("");
      setExperience("");
      setPrivacyConsent(false);
    } catch {
      setErrorMsg("Не получилось отправить. Попробуй ещё раз или позвони нам.");
      setStatus("error");
    }
  };

  const closeModal = () => {
    onClose();
    setStatus("idle");
    setErrorMsg("");
  };

  if (!open) return null;

  return (
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

            <PrivacyConsent
              checked={privacyConsent}
              onChange={setPrivacyConsent}
              id="team-privacy"
            />

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
          </form>
        )}
      </div>
    </div>
  );
}