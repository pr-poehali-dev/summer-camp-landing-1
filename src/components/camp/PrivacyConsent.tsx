interface PrivacyConsentProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  id?: string;
}

export default function PrivacyConsent({ checked, onChange, error, id = "privacy-consent" }: PrivacyConsentProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-orange-500 flex-shrink-0 cursor-pointer"
          style={{ outline: error ? "2px solid #E64D12" : "none", outlineOffset: 2 }}
        />
        <span className="text-[12px] leading-snug" style={{ color: "rgba(61,61,61,0.75)" }}>
          Я согласен с{" "}
          <a
            href="/personal-data"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "#FF5E1A" }}
            onClick={(e) => e.stopPropagation()}
          >
            обработкой персональных данных
          </a>{" "}
          и{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "#FF5E1A" }}
            onClick={(e) => e.stopPropagation()}
          >
            политикой конфиденциальности
          </a>
        </span>
      </label>
      {error && (
        <p className="text-xs font-bold mt-1" style={{ color: "#E64D12" }}>
          {error}
        </p>
      )}
    </div>
  );
}