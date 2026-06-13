import { useState } from "react";
import { FlipHorizontal2, RefreshCw } from "lucide-react";
import { FLASHCARDS } from "../../data/chemistry";

/** A single flip card — front shows the term, back shows the explanation. */
function FlashCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-3d h-48 cursor-pointer select-none" onClick={() => setFlipped((f) => !f)}>
      <div className={`flip-inner w-full h-full ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flip-face rounded-2xl overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${card.grad} p-6 flex flex-col justify-between`}>
            <div className="flex justify-between items-center">
              <span className="text-white/55 text-xs font-medium">מושג</span>
              <FlipHorizontal2 size={14} className="text-white/40" />
            </div>
            <h3 className="text-white text-xl font-bold text-center">{card.front}</h3>
            <p className="text-white/45 text-xs text-center">לחץ להצגת ההסבר</p>
          </div>
        </div>
        {/* Back */}
        <div className="flip-face flip-back rounded-2xl overflow-hidden">
          <div className="w-full h-full bg-white border-2 border-indigo-100 p-6 flex flex-col justify-between">
            <span className="text-indigo-400 text-xs font-medium">הסבר</span>
            <p className="text-slate-700 text-sm leading-relaxed text-center">{card.back}</p>
            <p className="text-indigo-300 text-xs text-center">לחץ לחזרה</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Flashcards learning mode — responsive grid of flip cards. */
export default function Flashcards() {
  // Bumping `seed` remounts every card, resetting them all to the front.
  const [seed, setSeed] = useState(0);

  return (
    <div className="space-y-5 fade-up">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">{FLASHCARDS.length} כרטיסיות — לחץ לגילוי ההסבר</p>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1.5"
        >
          <RefreshCw size={14} />
          אפס הכל
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FLASHCARDS.map((c) => (
          <FlashCard key={`${c.id}-${seed}`} card={c} />
        ))}
      </div>
    </div>
  );
}
