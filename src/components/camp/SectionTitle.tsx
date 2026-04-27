import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  size?: "md" | "lg";
}

export default function SectionTitle({ children, className = "", as = "h2", size = "md" }: SectionTitleProps) {
  const Tag = as;
  const fontSize =
    size === "lg"
      ? "clamp(2.4rem, 5.4vw, 4rem)"
      : "clamp(2rem, 4.6vw, 3.4rem)";

  return (
    <Tag
      className={`font-black leading-tight ${className}`}
      style={{
        fontFamily: "'Koyon', 'Nunito', sans-serif",
        fontSize,
        lineHeight: 1.15,
        letterSpacing: "0.04em",
        wordSpacing: "0.12em",
        WebkitTextStroke: "3px #5A1A00",
        paintOrder: "stroke fill",
        color: "#FF5E1A",
        textShadow:
          "0 1px 0 #FF7F3F, 0 2px 0 #E64D12, 0 3px 0 #CC3F0B, 0 4px 0 #B33307, 0 5px 0 #992A05, 0 6px 12px rgba(0,0,0,0.45)",
        textAlign: "center",
      }}
    >
      {children}
    </Tag>
  );
}
