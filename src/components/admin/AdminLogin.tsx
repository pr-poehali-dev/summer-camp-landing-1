interface AdminLoginProps {
  password: string;
  setPassword: (v: string) => void;
  loginErr: string;
  loggingIn: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AdminLogin({ password, setPassword, loginErr, loggingIn, onSubmit }: AdminLoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#FFF8F0" }}>
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-sm"
        style={{ border: "2px solid #FFE5D9", boxShadow: "0 20px 60px rgba(255,154,86,0.2)" }}
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-2xl font-black" style={{ color: "#3D3D3D", fontFamily: "'Baloo 2', cursive" }}>
            Админка
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(61,61,61,0.6)" }}>
            Рыбка Долли
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ border: "2px solid #FFE5D9", background: "#FFF8F0" }}
            placeholder="Пароль"
            autoFocus
            required
          />
          {loginErr && (
            <p className="text-sm font-semibold" style={{ color: "#FF3D8B" }}>
              {loginErr}
            </p>
          )}
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full font-black rounded-2xl py-3 text-base disabled:opacity-60"
            style={{
              background: "linear-gradient(90deg,#FF3D8B,#FF9A56)",
              color: "white",
              boxShadow: "0 6px 0 rgba(255,61,139,0.35)",
            }}
          >
            {loggingIn ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
