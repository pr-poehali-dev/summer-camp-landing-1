import { useEffect, useState } from "react";
import ReviewsList, { type Review } from "./ReviewsList";
import ReviewModal from "./ReviewModal";
import { ymGoal } from "@/lib/ymGoal";

const REVIEWS_URL = "https://functions.poehali.dev/f0ac4a46-76e0-4844-9a17-0e69fca7a807";

export default function CampReviews() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(REVIEWS_URL);
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !text.trim()) {
      setErrorMsg("Заполни имя и текст отзыва");
      setStatus("error");
      return;
    }
    if (!privacyConsent) {
      setErrorMsg("Необходимо согласие на обработку персональных данных");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parent_name: parentName,
          child_name: childName,
          rating,
          text,
        }),
      });
      if (!res.ok) throw new Error("err");
      ymGoal("review_form_submit");
      setStatus("sent");
      setParentName("");
      setChildName("");
      setRating(5);
      setText("");
      setPrivacyConsent(false);
    } catch {
      setErrorMsg("Не удалось отправить. Попробуй ещё раз.");
      setStatus("error");
    }
  };

  const closeModal = () => {
    setOpen(false);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section id="otzyvy" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <ReviewsList items={items} loading={loading} onOpenForm={() => { ymGoal("review_form_open"); setOpen(true); }} />
      </div>

      {open && (
        <ReviewModal
          parentName={parentName}
          setParentName={setParentName}
          childName={childName}
          setChildName={setChildName}
          rating={rating}
          setRating={setRating}
          text={text}
          setText={setText}
          privacyConsent={privacyConsent}
          setPrivacyConsent={setPrivacyConsent}
          status={status}
          errorMsg={errorMsg}
          onSubmit={submit}
          onClose={closeModal}
        />
      )}
    </section>
  );
}