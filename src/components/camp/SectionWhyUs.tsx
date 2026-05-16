import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/25b569de-b678-4f5c-bdb1-a55bb288df0e.png",
    text: "Насыщенные авторские смены от нашего клуба",
    grad: "linear-gradient(135deg, #FF9A56 0%, #FFD93D 100%)",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/650e4177-c68f-4536-81d5-635aebf0ccad.png",
    text: "Только качественные МК. Кулинарные, МК по сборке солнечных батарей и электронных проектов в лагере",
    grad: "linear-gradient(135deg, #FF6B9D 0%, #FF9A56 100%)",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/f2c3a70c-cfd7-41f8-bce0-ee9d80353fdb.png",
    text: "Возим на море. Это наше преимущество!",
    grad: "linear-gradient(135deg, #6C5CE7 0%, #FF6B9D 100%)",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/83018dd1-ffad-417c-a8e6-69738e9b7d59.png",
    text: "Даже после 18:00 дети вовлечены. Чат лагеря работает до 21:00. Задания в чате",
    grad: "linear-gradient(135deg, #00C9A7 0%, #6C5CE7 100%)",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/32a4d24b-9db1-4701-a70b-3e3dfb0bb1d1.png",
    text: "Смены для подростков. Это наша фишка!",
    grad: "linear-gradient(135deg, #FFD93D 0%, #FF9A56 100%)",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/04367786-44f3-4e0d-af51-4462a5999c0a.png",
    text: "Честная разумная цена",
    grad: "linear-gradient(135deg, #FF9A56 0%, #00C9A7 100%)",
  },
];

function WhyUsCard({
  icon,
  text,
  grad,
  delay,
}: {
  icon: string;
  text: string;
  grad: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: grad,
        borderRadius: "24px",
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.13)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0)`
          : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 20,
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <img
          src={icon}
          alt=""
          loading="lazy"
          style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.18))" }}
        />
      </div>
      <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.35, textShadow: "0 1px 4px rgba(0,0,0,0.25)" }}>
        {text}
      </p>
    </div>
  );
}

export default function SectionWhyUs() {
  return (
    <section className="py-12 px-4" style={{ background: "#FFF8F0" }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-black text-center mb-8"
          style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}
        >
          Почему именно мы?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ITEMS.slice(0, 4).map((it, i) => (
            <WhyUsCard key={i} icon={it.icon} text={it.text} grad={it.grad} delay={i * 80} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4 md:max-w-[50%] md:mx-auto">
          {ITEMS.slice(4).map((it, i) => (
            <WhyUsCard key={i + 4} icon={it.icon} text={it.text} grad={it.grad} delay={(i + 4) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
