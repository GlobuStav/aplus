import { Trophy, ChevronLeft } from "lucide-react";
import { QUIZ } from "../data/chemistry";

/** Prominent call-to-action banner that opens the practice quiz. */
export default function QuizBanner({ onStart }) {
  return (
    <button
      onClick={onStart}
      className="w-full bg-gradient-to-l from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 glow-banner group"
    >
      <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <Trophy size={24} className="text-white" />
      </div>
      <div className="flex-1 text-right">
        <p className="font-bold text-lg leading-tight">מוכן לבדוק את עצמך?</p>
        <p className="text-white/75 text-sm mt-0.5">עברו למבחן התרגול — {QUIZ.length} שאלות</p>
      </div>
      <ChevronLeft size={22} className="text-white/60 group-hover:-translate-x-1 transition-transform" />
    </button>
  );
}
