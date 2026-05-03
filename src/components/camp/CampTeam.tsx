import { useState } from "react";
import CampTeamHeader from "./CampTeamHeader";
import CampTeamCards from "./CampTeamCards";
import CampTeamHelpers from "./CampTeamHelpers";
import CampTeamApplyModal from "./CampTeamApplyModal";

export default function CampTeam() {
  const [open, setOpen] = useState(false);

  return (
    <section id="team" className="py-16 px-4" style={{ background: "#FFF8F0" }}>
      <div className="max-w-5xl mx-auto">
        <CampTeamHeader />

        <CampTeamCards />

        <CampTeamHelpers onApplyOpen={() => setOpen(true)} />
      </div>

      {/* МОДАЛКА */}
      <CampTeamApplyModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
