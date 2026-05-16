const ITEMS = [
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/25b569de-b678-4f5c-bdb1-a55bb288df0e.png",
    text: "Насыщенные авторские смены от нашего клуба",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/650e4177-c68f-4536-81d5-635aebf0ccad.png",
    text: "Только качественные МК. Кулинарные, МК по сборке солнечных батарей и электронных проектов в лагере",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/f2c3a70c-cfd7-41f8-bce0-ee9d80353fdb.png",
    text: "Возим на море. Это наше преимущество!",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/83018dd1-ffad-417c-a8e6-69738e9b7d59.png",
    text: "Даже после 18:00 дети вовлечены. Чат лагеря работает до 21:00. Задания в чате",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/32a4d24b-9db1-4701-a70b-3e3dfb0bb1d1.png",
    text: "Смены для подростков. Это наша фишка!",
  },
  {
    icon: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/04367786-44f3-4e0d-af51-4462a5999c0a.png",
    text: "Честная разумная цена",
  },
];

export default function SectionWhyUs() {
  const Card = ({ icon, text }: { icon: string; text: string }) => (
    <div
      className="bg-white rounded-3xl p-4 md:p-5 flex flex-col items-center text-center transition-transform hover:-translate-y-1"
      style={{ border: "2px solid #FFE5D9", boxShadow: "0 6px 18px rgba(255,154,86,0.10)" }}
    >
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: "linear-gradient(135deg,#FFF3E6,#FFE5D9)" }}
      >
        <img src={icon} alt="" className="w-14 h-14 md:w-16 md:h-16 object-contain" loading="lazy" />
      </div>
      <p className="text-sm md:text-[15px] font-bold leading-snug" style={{ color: "#3D3D3D" }}>
        {text}
      </p>
    </div>
  );

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
            <Card key={i} {...it} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4 md:max-w-[50%] md:mx-auto">
          {ITEMS.slice(4).map((it, i) => (
            <Card key={i + 4} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
