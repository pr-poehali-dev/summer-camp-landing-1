import Icon from "@/components/ui/icon";
import { ymGoal } from "@/lib/ymGoal";

function isVictoryPeriod(): boolean {
  const now = new Date();
  const y = now.getFullYear();
  const start = new Date(y, 4, 9, 0, 0, 0);
  const end = new Date(y, 4, 11, 23, 59, 59);
  return now >= start && now <= end;
}

export default function CampHeroTopBar() {
  const showVictory = isVictoryPeriod();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm" style={{background: "rgba(255,154,86,0.97)"}}>
      <div className="max-w-5xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 min-w-0 flex-shrink">
          <span className="font-black text-white leading-tight whitespace-nowrap" style={{fontFamily:"'Nunito', sans-serif", fontSize:"clamp(0.95rem, 3.5vw, 1.25rem)"}}>Рыбка Долли</span>
          {showVictory && (
            <span
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-black text-sm md:text-base whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg,#C0392B,#E74C3C,#FFD93D)",
                color: "#fff",
                border: "2px solid #FFD93D",
                boxShadow: "0 3px 10px rgba(192,57,43,0.45)",
                fontFamily: "'Nunito', sans-serif",
              }}
              title="9 мая — День Победы"
            >
              <span aria-hidden>⭐</span>
              <span>9 мая · 81 год</span>
              <span aria-hidden>🕊</span>
            </span>
          )}
          {showVictory && (
            <span
              className="sm:hidden inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 font-black text-xs whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg,#C0392B,#E74C3C,#FFD93D)",
                color: "#fff",
                border: "1.5px solid #FFD93D",
                fontFamily: "'Nunito', sans-serif",
              }}
              title="9 мая — День Победы, 81 год"
            >
              81 год 🕊
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 md:gap-3 justify-end flex-shrink-0">
          <a href="tel:+79881521698" onClick={() => ymGoal("phone_click", { place: "header", carrier: "mts" })} className="flex items-center gap-1 text-xs md:text-sm font-bold text-white/90 hover:text-white transition-colors">
            <Icon name="Phone" size={14} />
            <span className="hidden sm:inline">+7 988 152-16-98</span>
            <span className="sm:hidden">МТС</span>
          </a>
          <a href="tel:+79787120353" onClick={() => ymGoal("phone_click", { place: "header", carrier: "volna" })} className="flex items-center gap-1 text-xs md:text-sm font-bold text-white/90 hover:text-white transition-colors">
            <Icon name="Phone" size={14} />
            <span className="hidden sm:inline">+7 978 712-03-53</span>
            <span className="sm:hidden">Волна</span>
          </a>
          <a
            href="https://vk.com/app6379730_-179759189#l=8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => ymGoal("vk_click", { place: "header" })}
            className="text-xs md:text-sm font-bold px-2.5 md:px-4 py-1.5 md:py-2 rounded-full transition-all flex items-center gap-1.5 md:gap-2"
            style={{background:"rgba(255,255,255,0.25)", border:"1px solid rgba(255,255,255,0.5)", color:"white"}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.305.585-1.496c.596-.188 1.361 1.26 2.174 1.815.614.418 1.08.326 1.08.326l2.17-.03s1.135-.071.597-1.002c-.044-.076-.312-.681-1.608-1.927-1.356-1.303-1.173-1.093.459-3.348.997-1.384 1.395-2.228 1.269-2.588-.12-.344-.876-.253-.876-.253l-2.443.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.386 1.077-.901 1.991c-1.085 1.923-1.52 2.025-1.698 1.905-.413-.274-.31-1.112-.31-1.705 0-1.854.273-2.628-.537-2.824-.27-.067-.468-.111-1.158-.118-.885-.009-1.633.003-2.057.218-.282.144-.499.463-.367.48.163.022.532.103.727.378.252.352.243 1.143.243 1.143s.145 2.186-.338 2.453c-.331.181-.786-.188-1.761-1.876-.5-.896-.878-1.888-.878-1.888s-.072-.177-.202-.272c-.157-.115-.376-.151-.376-.151l-2.322.015s-.348.01-.476.166c-.114.139-.009.427-.009.427s1.816 4.424 3.872 6.651c1.885 2.042 4.026 1.907 4.026 1.907h.97z"/></svg>
            <span className="hidden xs:inline">ВКонтакте</span>
            <span className="xs:hidden">ВК</span>
          </a>
        </div>
      </div>
    </header>
  );
}