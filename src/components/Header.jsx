import { Menu, Check } from "lucide-react";
import { TOPIC, FLASHCARDS, QUIZ } from "../data/chemistry";

/** Top bar — sidebar toggle, topic title, status chip. */
export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-slate-100 px-5 py-4 flex items-center gap-4 shadow-sm flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
        aria-label="פתח/סגור תפריט"
      >
        <Menu size={20} />
      </button>
      <div className="min-w-0">
        <h2 className="font-bold text-slate-800 text-base leading-tight truncate">
          {TOPIC.subject}: {TOPIC.title}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          4 מצבי למידה · {FLASHCARDS.length} פלאשקארדס · {QUIZ.length} שאלות
        </p>
      </div>
      <div className="mr-auto hidden sm:flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-100">
          <Check size={11} />
          נלמד השבוע
        </div>
      </div>
    </header>
  );
}
