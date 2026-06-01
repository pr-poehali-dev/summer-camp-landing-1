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
  return `${SITE}/?shift=${shiftId}&utm_source=yandex&utm_medium=cpc&utm_campaign=${campaign}&utm_content={ad_id}&utm_term={keyword}`;
}

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
        <b>Как использовать:</b> скопируйте ссылку нужной смены и вставьте её в поле
        «Ссылка в объявлении» при создании рекламы в Яндекс.Директе. Метки
        <code className="mx-1 px-1 rounded" style={{ background: "#FFE5D9" }}>{"{ad_id}"}</code>
        и
        <code className="mx-1 px-1 rounded" style={{ background: "#FFE5D9" }}>{"{keyword}"}</code>
        Директ заполнит сам — менять их не нужно.
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