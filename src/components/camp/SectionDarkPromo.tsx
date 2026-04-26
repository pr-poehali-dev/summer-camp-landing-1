interface Props {
  scrollToBooking: () => void;
}

export default function SectionDarkPromo({ scrollToBooking }: Props) {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{background:"linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)"}} />
      <div className="absolute inset-0 opacity-15" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #FF9A56 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFD93D 0%, transparent 40%)"}} />
      <div className="absolute top-6 right-12 text-5xl opacity-30 animate-float">⭐</div>
      <div className="absolute bottom-8 left-16 text-3xl opacity-20 animate-float delay-300">✦</div>
      <div className="absolute top-12 left-1/3 text-2xl opacity-15 animate-float delay-200">✦</div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-7xl md:text-9xl font-black block mb-2 leading-none" style={{fontFamily:"'Fredoka One', cursive", background:"linear-gradient(135deg, #FF9A56 0%, #FFD93D 50%, #fff 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>
            РЫБКА ДОЛЛИ
          </span>
          <span className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-white/70 block" style={{fontFamily:"'Fredoka One', cursive"}}>
            ДЕТСКИЙ КЛУБ
          </span>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          <span className="text-2xl text-white/30">★</span>
          <span className="text-2xl" style={{color:"#FFD93D"}}>★</span>
          <span className="text-2xl text-white/30">★</span>
        </div>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 font-semibold">
          Лето 2026 в Керчи — это море, песок, изумрудная трава и столько радости, что хватит на весь год!
        </p>
        <button onClick={scrollToBooking} className="btn-cta text-base px-7 py-3">
          🌊 Забронировать место на лето
        </button>
      </div>
    </section>
  );
}