import { useState } from "react";
import Icon from "@/components/ui/icon";

const SITE = "https://dolliklub.ru";

const ADS: { emoji: string; name: string; campaign: string; shiftId: number }[] = [
  { emoji: "🎬", name: "Мульти-драйв", campaign: "multidrive", shiftId: 3 },
  { emoji: "🪐", name: "Есть ли жизнь на Марсе?", campaign: "mars", shiftId: 5 },
  { emoji: "🌍", name: "Кругосветка", campaign: "krugosvetka", shiftId: 6 },
  { emoji: "🔬", name: "Лаборатория чудес", campaign: "laboratoria", shiftId: 7 },
];

function buildUrl(shiftId: number, campaign: string) {
  return `${SITE}/?shift=${shiftId}&utm_source=yandex&utm_medium=cpc&utm_campaign=${campaign}`;
}

const QUICK_BOOK_URL = `${SITE}/?utm_source=yandex&utm_medium=cpc&utm_campaign=booking#book`;

export default function AdminAds() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (url: string, shiftId: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(shiftId);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div>
      <div
        className="rounded-2xl p-4 mb-5 text-sm"
        style={{ background: "#FFF1E2", border: "2px solid #FFE5D9", color: "#7B4A1E" }}
      >
        <b>Как использовать:</b> скопируйте ссылку нужной смены и вставьте её
        целиком в поле «Ссылка в объявлении» при создании рекламы в
        Яндекс.Директе. По ссылке человек попадёт сразу на описание нужной смены,
        а в Метрике будет видно, с какого объявления пришла заявка.
      </div>

      <div
        className="rounded-2xl p-4 mb-5"
        style={{ background: "linear-gradient(135deg,#FF3D8B,#FF9A56)", border: "2px solid #FF9A56" }}
      >
        <div className="flex items-center gap-2 mb-2 text-white">
          <span className="text-xl">⚡</span>
          <span className="font-black">Быстрая ссылка — сразу к форме оплаты</span>
        </div>
        <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>
          Человек нажимает и сразу попадает в открытую форму бронирования. Удобно для быстрых ссылок в Директе.
        </div>
        <div className="flex items-stretch gap-2">
          <div className="flex-1 text-xs font-mono break-all rounded-xl px-3 py-2 bg-white" style={{ color: "#6B6B6B" }}>
            {QUICK_BOOK_URL}
          </div>
          <button
            onClick={() => copy(QUICK_BOOK_URL, 0)}
            className="font-bold px-4 rounded-xl text-sm whitespace-nowrap flex items-center gap-1.5"
            style={{ background: copied === 0 ? "#00C9A7" : "white", color: copied === 0 ? "white" : "#FF3D8B" }}
          >
            <Icon name={copied === 0 ? "Check" : "Copy"} size={16} />
            {copied === 0 ? "Скопировано" : "Копировать"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {ADS.map((ad) => {
          const url = buildUrl(ad.shiftId, ad.campaign);
          const isCopied = copied === ad.shiftId;
          return (
            <div
              key={ad.shiftId}
              className="bg-white rounded-2xl p-4"
              style={{ border: "2px solid #FFE5D9" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{ad.emoji}</span>
                <span className="font-black" style={{ color: "#3D3D3D" }}>
                  {ad.name}
                </span>
              </div>
              <div className="flex items-stretch gap-2">
                <div
                  className="flex-1 text-xs font-mono break-all rounded-xl px-3 py-2"
                  style={{ background: "#FFF8F0", border: "1.5px solid #FFE5D9", color: "#6B6B6B" }}
                >
                  {url}
                </div>
                <button
                  onClick={() => copy(url, ad.shiftId)}
                  className="font-bold px-4 rounded-xl text-sm whitespace-nowrap flex items-center gap-1.5"
                  style={{
                    background: isCopied ? "#00C9A7" : "linear-gradient(135deg,#FF9A56,#FFD93D)",
                    color: "white",
                  }}
                >
                  <Icon name={isCopied ? "Check" : "Copy"} size={16} />
                  {isCopied ? "Скопировано" : "Копировать"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}