import { useState } from "react";

const POSTER = "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/fa71cd69-fc8a-4f3c-b87d-072c612d8d49.png";

const VIDEOS = [
  { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/69878726-465d-473a-9d01-5984d7c6234a.mp4", name: "Полина", shift: "4 смена" },
  { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/5aa0afd9-eb3f-40b0-aae7-55eb0abab924.mp4", name: "Амира", shift: "2 смена" },
  { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/8d89b8bb-e70d-47d5-8dbb-f80fb41670b6.mp4", name: "Лиза", shift: "2 смена" },
  { src: "https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/11c3322d-2b5b-4e36-8b45-97a6b5f197ec.mp4", name: "Настя", shift: "2 смена" },
];

export default function VideoReviews() {
  const [played, setPlayed] = useState<boolean[]>(VIDEOS.map(() => false));

  const handlePlay = (i: number) => {
    setPlayed((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
    setTimeout(() => {
      const v = document.getElementById(`videoreview-${i}`) as HTMLVideoElement | null;
      if (v) v.play().catch(() => {});
    }, 50);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {VIDEOS.map((v, i) => (
        <div key={i} className="flex flex-col">
          <div
            className="relative overflow-hidden bg-white"
            style={{
              borderRadius: "24px",
              border: "3px solid #FFE5D9",
              boxShadow:
                "0 12px 30px rgba(255,154,86,0.25), 0 2px 0 rgba(255,255,255,0.4) inset",
              aspectRatio: "9/16",
            }}
          >
            {!played[i] ? (
              <button
                onClick={() => handlePlay(i)}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                style={{ border: "none", padding: 0, background: "transparent" }}
                aria-label={`Смотреть отзыв ${v.name}`}
              >
                <img
                  src={POSTER}
                  alt={`Видеоотзыв ребёнка ${v.name} о летнем клубе Рыбка Долли в Керчи`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      width: "70px",
                      height: "70px",
                      background:
                        "linear-gradient(135deg, #FF3D8B 0%, #FF9A56 50%, #FFD93D 100%)",
                      boxShadow:
                        "0 8px 24px rgba(255,61,139,0.5), 0 2px 0 rgba(255,255,255,0.4) inset",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{ marginLeft: "4px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div
                  className="absolute bottom-3 left-3 right-3 text-white font-black text-sm text-center"
                  style={{
                    textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                    fontFamily: "'Baloo 2', cursive",
                  }}
                >
                  ▶ Смотреть отзыв
                </div>
              </button>
            ) : (
              <video
                id={`videoreview-${i}`}
                src={v.src}
                controls
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="mt-3 text-center">
            <p
              className="font-black text-base"
              style={{ fontFamily: "'Baloo 2', cursive", color: "#3D3D3D" }}
            >
              {v.name}
            </p>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#FF9A56" }}
            >
              {v.shift}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}