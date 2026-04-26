import { useEffect, useRef } from "react";

export default function SectionVideos() {
  const firstVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = firstVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl p-6 md:p-8" style={{background:"#FFF8F0", border:"2px solid #FFE5D9", boxShadow:"0 10px 30px rgba(255,154,86,0.15)"}}>
          <h3
            className="font-black text-3xl md:text-5xl mb-6 text-center animate-rainbow-pulse"
            style={{
              fontFamily:"'Fredoka One', cursive",
              backgroundImage:"linear-gradient(90deg, #FF3D8B 0%, #FF9A56 20%, #FFD93D 40%, #00C9A7 60%, #6C5CE7 80%, #FF3D8B 100%)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              backgroundClip:"text",
              letterSpacing:"0.5px",
            }}
          >
            📹 Смотрите, как это было в прошлом году! 🎉
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto items-stretch">
            <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{aspectRatio:"16 / 9", boxShadow:"0 10px 25px rgba(0,0,0,0.15)"}}>
              <video
                ref={firstVideoRef}
                src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/034b7134-32f7-411e-b6a7-e99bc9f8c195.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                playsInline
                muted
                loop
                preload="metadata"
              />
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{aspectRatio:"16 / 9", boxShadow:"0 10px 25px rgba(0,0,0,0.15)"}}>
              <video
                src="https://cdn.poehali.dev/projects/2b4c2b75-58ba-4ecb-8368-ef9eaf1417bb/bucket/db6717d2-5463-4014-a065-2eab9a7a2743.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
