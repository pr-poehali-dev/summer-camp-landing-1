import { SHIFTS } from "./CampData";
import { formatPhoneNumber } from "@/components/extensions/robokassa/useRobokassa";
import { Field, RESERVATION_AMOUNT } from "./reserveCTAUtils";
import PrivacyConsent from "./PrivacyConsent";

interface ReserveModalFormProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  motherName: string;
  setMotherName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  childName: string;
  setChildName: (v: string) => void;
  age: string;
  setAge: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  shiftId: number | null;
  setShiftId: (v: number) => void;
  earlyStart: boolean;
  setEarlyStart: (v: boolean) => void;
  withFriend: boolean;
  setWithFriend: (v: boolean) => void;
  friendName: string;
  setFriendName: (v: string) => void;
  privacyConsent: boolean;
  setPrivacyConsent: (v: boolean) => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
  debugLogs: string[];
  showDebug: boolean;
  onToggleDebug: () => void;
}

export default function ReserveModalForm({
  onClose,
  onSubmit,
  motherName,
  setMotherName,
  phone,
  setPhone,
  childName,
  setChildName,
  age,
  setAge,
  email,
  setEmail,
  shiftId,
  setShiftId,
  earlyStart,
  setEarlyStart,
  withFriend,
  setWithFriend,
  friendName,
  setFriendName,
  privacyConsent,
  setPrivacyConsent,
  errors,
  isSubmitting,
  debugLogs,
  showDebug,
  onToggleDebug,
}: ReserveModalFormProps) {
  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{ background: "rgba(30,20,10,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white"
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="px-5 py-4 md:px-6 md:py-5 text-white relative"
          style={{
            background:
              "linear-gradient(135deg, #FF3D8B 0%, #FF9A56 50%, #FFD93D 100%)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 transition-colors flex items-center justify-center text-white font-black text-xl"
            aria-label="Закрыть"
          >
            ×
          </button>
          <div className="font-black text-xl md:text-2xl leading-tight pr-10" style={{ fontFamily: "'Baloo 2', cursive" }}>
            🎉 Бронирование места
          </div>
          <div className="text-sm md:text-base mt-1 text-white/90 font-semibold">
            Предоплата {RESERVATION_AMOUNT.toLocaleString("ru-RU")} ₽ — остаток оплачиваете в первый день смены
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-5 md:p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field
              label="Имя мамы"
              required
              error={errors.motherName}
              value={motherName}
              onChange={setMotherName}
              placeholder="Анна"
            />
            <Field
              label="Телефон"
              required
              error={errors.phone}
              value={phone}
              onChange={(v) => setPhone(formatPhoneNumber(v))}
              placeholder="+7 (___) ___-__-__"
              inputMode="tel"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field
              label="Имя ребёнка"
              required
              error={errors.childName}
              value={childName}
              onChange={setChildName}
              placeholder="Миша"
            />
            <Field
              label="Возраст"
              required
              error={errors.age}
              value={age}
              onChange={setAge}
              placeholder="9"
              inputMode="numeric"
            />
          </div>

          <Field
            label="Email (для копии чека)"
            required
            error={errors.email}
            value={email}
            onChange={setEmail}
            placeholder="mama@example.com"
            inputMode="email"
          />

          <div>
            <label className="text-sm font-bold block mb-2" style={{ color: "#3D3D3D" }}>
              Выберите смену <span style={{ color: "#FF3D8B" }}>*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SHIFTS.filter((s) => s.id !== 4 && s.id !== 2).map((s) => {
                const active = shiftId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShiftId(s.id)}
                    className="aspect-square rounded-xl font-black text-lg transition-transform hover:scale-105"
                    style={{
                      background: active
                        ? "linear-gradient(135deg,#FF3D8B,#FF9A56)"
                        : "#FFF8F0",
                      color: active ? "white" : "#3D3D3D",
                      border: active ? "2px solid #FF3D8B" : "2px solid #FFE5D9",
                      boxShadow: active ? "0 6px 16px rgba(255,61,139,0.35)" : "none",
                    }}
                  >
                    {s.id}
                  </button>
                );
              })}
            </div>
            {errors.shift && (
              <p className="text-xs font-bold mt-1" style={{ color: "#E64D12" }}>
                {errors.shift}
              </p>
            )}
            <p className="text-xs mt-2" style={{ color: "rgba(61,61,61,0.6)" }}>
              Номера смен смотрите в блоке «Программа смен» выше
            </p>
          </div>

          <label
            className="flex items-start gap-3 rounded-2xl p-3 md:p-4 cursor-pointer transition-colors"
            style={{
              background: earlyStart ? "#FFF1E2" : "#FFF8F0",
              border: earlyStart ? "2px solid #FF9A56" : "2px solid #FFE5D9",
            }}
          >
            <input
              type="checkbox"
              checked={earlyStart}
              onChange={(e) => setEarlyStart(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded accent-orange-500 flex-shrink-0 cursor-pointer"
            />
            <div className="flex-1">
              <div className="font-bold text-sm md:text-base flex items-center gap-2 flex-wrap" style={{ color: "#3D3D3D" }}>
                <span>🌅 Раннее посещение с 8:00</span>
                <span
                  className="font-black px-2 py-0.5 rounded-lg text-white text-xs"
                  style={{ background: "linear-gradient(90deg,#FF9A56,#FF5E1A)" }}
                >
                  +3000 ₽
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: "rgba(61,61,61,0.7)" }}>
                Включён завтрак. Доплата за смену — оплачивается в первый день.
              </p>
            </div>
          </label>

          <div
            className="rounded-2xl p-3 md:p-4"
            style={{
              background: withFriend ? "#FFF1E2" : "#FFF8F0",
              border: withFriend ? "2px solid #FF9A56" : "2px solid #FFE5D9",
            }}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={withFriend}
                onChange={(e) => setWithFriend(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded accent-orange-500 flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1">
                <div className="font-bold text-sm md:text-base flex items-center gap-2 flex-wrap" style={{ color: "#3D3D3D" }}>
                  <span>👯 Я с другом</span>
                  <span
                    className="font-black px-2 py-0.5 rounded-lg text-white text-xs"
                    style={{ background: "linear-gradient(90deg,#00C9A7,#0094C6)" }}
                  >
                    −500 ₽ каждому
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "rgba(61,61,61,0.7)" }}>
                  Минус 500 ₽ и вам, и другу при совместной брони.
                </p>
              </div>
            </label>
            {withFriend && (
              <div className="mt-3">
                <Field
                  label="Имя и фамилия друга"
                  required
                  error={errors.friendName}
                  value={friendName}
                  onChange={setFriendName}
                  placeholder="Иван Петров"
                />
              </div>
            )}
          </div>

          <div
            className="rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3"
            style={{ background: "#FFF8F0", border: "2px dashed #FF9A56" }}
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#FF9A56" }}>
                К оплате сейчас
              </div>
              <div className="font-black text-2xl" style={{ color: "#3D3D3D" }}>
                {RESERVATION_AMOUNT.toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <div className="text-xs text-right" style={{ color: "rgba(61,61,61,0.7)" }}>
              Только бронь места.
              <br />
              Полную стоимость оплачиваете
              <br />
              в первый день смены.
            </div>
          </div>

          <p
            className="text-[11px] md:text-xs leading-snug px-1"
            style={{ color: "rgba(61,61,61,0.6)" }}
          >
            Кассовые чеки мы формируем на физической кассе в нашем центре — вы можете получить оригинал у нас в любое время или в первый день смены. Копию чека направим вам на email после оплаты.
          </p>

          <PrivacyConsent
            checked={privacyConsent}
            onChange={setPrivacyConsent}
            error={errors.privacy}
            id="reserve-privacy"
          />

          {Object.keys(errors).length > 0 && (
            <div
              data-field-error
              className="rounded-2xl px-4 py-3 text-sm font-bold"
              style={{ background: "#FFF0ED", border: "2px solid #E64D12", color: "#E64D12" }}
            >
              ⚠️ Пожалуйста, заполните все обязательные поля выше
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-black text-white py-4 rounded-2xl text-base md:text-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
            style={{
              background:
                "linear-gradient(90deg,#00C9A7,#00A67E)",
              boxShadow: "0 6px 0 #008F78, 0 10px 25px rgba(0,201,167,0.4)",
            }}
          >
            {isSubmitting ? "Переходим к оплате..." : `💳 Оплатить ${RESERVATION_AMOUNT.toLocaleString("ru-RU")} ₽ и забронировать`}
          </button>

          <p className="text-xs text-center" style={{ color: "rgba(61,61,61,0.55)" }}>
            Оплата через Robokassa — безопасно. Нажимая «Оплатить», вы соглашаетесь с условиями оферты.
          </p>

          <div>
            <button
              type="button"
              onClick={onToggleDebug}
              className="text-xs underline"
              style={{ color: "rgba(61,61,61,0.35)" }}
            >
              {showDebug ? "Скрыть диагностику" : "🔍 Диагностика"}
            </button>
            {showDebug && (
              <div
                className="mt-2 rounded-xl p-3 text-[11px] font-mono overflow-auto max-h-48"
                style={{ background: "#1a1a2e", color: "#00ff88", border: "1px solid #333" }}
              >
                {debugLogs.length === 0 ? (
                  <div style={{ color: "#888" }}>Нажмите кнопку оплаты — здесь появятся логи</div>
                ) : (
                  debugLogs.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            )}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}