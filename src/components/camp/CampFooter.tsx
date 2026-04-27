import { ymGoal } from "@/lib/ymGoal";

export default function CampFooter() {
  return (
    <footer className="text-white py-8 px-4" style={{background:"linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)"}}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="font-black text-xl" style={{fontFamily:"'Fredoka One',cursive"}}>Рыбка Долли</span>
        </div>
        <p className="text-sm mb-3" style={{color:"rgba(255,255,255,0.6)"}}>Летний городской клуб в Керчи · г. Керчь, ул. Циолковского, 12</p>
        <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
          <a href="tel:+79881521698" onClick={() => ymGoal("phone_click", { place: "footer", carrier: "mts" })} className="font-semibold" style={{color:"#FFD93D"}}>+7 988 152-16-98 (МТС)</a>
          <a href="tel:+79787120353" onClick={() => ymGoal("phone_click", { place: "footer", carrier: "volna" })} className="font-semibold" style={{color:"#FFD93D"}}>+7 978 712-03-53 (Волна)</a>
        </div>
        <nav className="flex items-center justify-center gap-4 flex-wrap mb-4 text-sm" aria-label="Разделы сайта">
          <a href="#programmy" className="hover:underline" style={{color:"rgba(255,255,255,0.75)"}}>Программа смен</a>
          <span style={{color:"rgba(255,255,255,0.3)"}}>·</span>
          <a href="#otzyvy" className="hover:underline" style={{color:"rgba(255,255,255,0.75)"}}>Отзывы</a>
          <span style={{color:"rgba(255,255,255,0.3)"}}>·</span>
          <a href="#tseny" className="hover:underline" style={{color:"rgba(255,255,255,0.75)"}}>Цены</a>
          <span style={{color:"rgba(255,255,255,0.3)"}}>·</span>
          <a href="#kontakty" className="hover:underline" style={{color:"rgba(255,255,255,0.75)"}}>Контакты</a>
        </nav>
        <a
          href="https://vk.com/app6379730_-179759189#l=8"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ymGoal("vk_click", { place: "footer" })}
          className="inline-flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm transition-all mb-4 hover:scale-105"
          style={{background:"rgba(255,154,86,0.2)", border:"1px solid rgba(255,154,86,0.4)", color:"white"}}
        >
          ВКонтакте
        </a>
        <p className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>
          © 2026 Летний клуб «Рыбка Долли» · <a href="/oferta" className="underline">Публичная оферта</a> · <a href="/admin" className="underline">Вход для администратора</a>
        </p>
      </div>
    </footer>
  );
}