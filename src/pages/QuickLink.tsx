import { useEffect } from "react";
import Index from "./Index";

interface QuickLinkProps {
  target: "tseny" | "kviz" | "call";
}

export default function QuickLink({ target }: QuickLinkProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("go")) {
      params.set("go", target);
      const newUrl = `/?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    const t = window.setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${target}`);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    }, 500);
    return () => window.clearTimeout(t);
  }, [target]);

  return <Index />;
}
