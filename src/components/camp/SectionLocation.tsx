export default function SectionLocation() {
  return (
    <section className="px-4 py-12 md:py-16" style={{ background: "#FFF8F0" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2
            className="font-black text-3xl md:text-5xl mb-3"
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: "#FF5E1A",
              textShadow:
                "0 1px 0 #FF7F3F, 0 2px 0 #E64D12, 0 3px 0 #CC3F0B, 0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            📍 Как нас найти
          </h2>
          <p
            className="text-base md:text-lg font-bold"
            style={{ color: "#3D3D3D" }}
          >
            г. Керчь, ул. Циолковского, 12
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch"
        >
          <div
            className="md:col-span-2 rounded-3xl overflow-hidden bg-white"
            style={{
              border: "3px solid #FFE5D9",
              boxShadow: "0 12px 30px rgba(255,154,86,0.25)",
              minHeight: "320px",
            }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=120578628138"
              width="100%"
              height="400"
              frameBorder="0"
              title="Карта проезда — Рыбка Долли, Керчь, ул. Циолковского, 12"
              style={{ display: "block", border: 0, width: "100%" }}
              loading="lazy"
            />
          </div>

          <div
            className="rounded-3xl p-5 md:p-6 flex flex-col gap-4"
            style={{
              background:
                "linear-gradient(160deg, #FFE55A 0%, #FFB830 50%, #FF8C00 100%)",
              boxShadow:
                "0 6px 0 #CC6A00, 0 10px 24px rgba(255,150,0,0.4), 0 2px 0 rgba(255,255,255,0.35) inset",
              color: "white",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🏠</span>
              <div>
                <div
                  className="font-black text-sm uppercase tracking-wider mb-1"
                  style={{ textShadow: "0 1px 2px rgba(92,46,0,0.4)" }}
                >
                  Адрес
                </div>
                <div
                  className="font-bold text-base leading-snug"
                  style={{ textShadow: "0 1px 2px rgba(92,46,0,0.4)" }}
                >
                  г. Керчь,<br />
                  ул. Циолковского, 12
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📞</span>
              <div>
                <div
                  className="font-black text-sm uppercase tracking-wider mb-1"
                  style={{ textShadow: "0 1px 2px rgba(92,46,0,0.4)" }}
                >
                  Телефоны
                </div>
                <a
                  href="tel:+79881521698"
                  className="block font-bold text-base hover:underline"
                  style={{ color: "white", textShadow: "0 1px 2px rgba(92,46,0,0.4)" }}
                >
                  +7 988 152-16-98 (МТС)
                </a>
                <a
                  href="tel:+79787120353"
                  className="block font-bold text-base hover:underline"
                  style={{ color: "white", textShadow: "0 1px 2px rgba(92,46,0,0.4)" }}
                >
                  +7 978 712-03-53 (Волна)
                </a>
              </div>
            </div>

            <a
              href="https://yandex.ru/maps/?ol=biz&oid=120578628138"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 font-black rounded-2xl px-4 py-3 transition-transform hover:scale-105"
              style={{
                background: "white",
                color: "#FF5E1A",
                boxShadow:
                  "0 4px 0 rgba(204,63,11,0.35), 0 8px 18px rgba(0,0,0,0.15)",
                textDecoration: "none",
              }}
            >
              🗺️ Построить маршрут
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
