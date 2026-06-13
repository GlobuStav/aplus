import { useState } from "react";
import { Trophy, Check, X, Info, ChevronLeft, RotateCcw } from "lucide-react";
import { QUIZ } from "../data/chemistry";

/**
 * Multiple-choice quiz.
 * - One question at a time.
 * - Correct pick → green highlight + green explanation.
 * - Wrong pick   → red on choice, green on the right answer, blue explanation.
 */
export default function Quiz({ onClose }) {
  const [qi, setQi] = useState(0);
  const [answers, setAns] = useState({}); // { [questionIndex]: chosenOptionIndex }
  const [finished, setDone] = useState(false);

  const q = QUIZ[qi];
  const picked = answers[qi] ?? null;
  const answered = picked !== null;
  const correct = picked === q.ans;

  const score = Object.keys(answers).filter((k) => answers[k] === QUIZ[+k].ans).length;

  const pick = (idx) => {
    if (answered) return;
    setAns((prev) => ({ ...prev, [qi]: idx }));
  };

  const next = () => (qi < QUIZ.length - 1 ? setQi(qi + 1) : setDone(true));

  const reset = () => {
    setQi(0);
    setAns({});
    setDone(false);
  };

  const optClass = (idx) => {
    const base = "w-full text-right flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ";
    if (!answered) return base + "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer";
    if (idx === q.ans) return base + "border-emerald-400 bg-emerald-50";
    if (idx === picked) return base + "border-red-400 bg-red-50";
    return base + "border-slate-100 opacity-50";
  };

  const badgeClass = (idx) => {
    const base = "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors ";
    if (!answered) return base + "bg-slate-100 text-slate-500";
    if (idx === q.ans) return base + "bg-emerald-500 text-white";
    if (idx === picked) return base + "bg-red-500 text-white";
    return base + "bg-slate-100 text-slate-400";
  };

  // ── Results screen ──
  if (finished) {
    const pct = Math.round((score / QUIZ.length) * 100);
    const good = pct >= 67;
    return (
      <div className="text-center py-8 fade-up">
        <div
          className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-5 ${good ? "bg-emerald-100" : "bg-amber-100"}`}
        >
          <Trophy size={42} className={good ? "text-emerald-500" : "text-amber-500"} />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">
          {good ? "כל הכבוד! עבודה מצוינת" : "כמעט — שווה לחזור על החומר"}
        </h3>
        <p className="text-slate-500 text-sm mb-1">
          ענית נכון על {score} מתוך {QUIZ.length} שאלות
        </p>
        <p className={`text-5xl font-black my-5 ${good ? "text-emerald-500" : "text-amber-500"}`}>{pct}%</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2 text-sm shadow-sm shadow-indigo-200"
          >
            <RotateCcw size={15} />
            נסה שוב
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm"
          >
            חזור ללמידה
          </button>
        </div>
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div className="space-y-5 fade-up">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {QUIZ.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < qi ? "bg-indigo-500" : i === qi ? "bg-indigo-300" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-400 whitespace-nowrap">
          {qi + 1} / {QUIZ.length}
        </span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <p className="text-base font-bold text-slate-800 leading-relaxed">{q.q}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {q.opts.map((opt, idx) => (
          <button key={idx} onClick={() => pick(idx)} className={optClass(idx)}>
            <div className={badgeClass(idx)}>{String.fromCharCode(65 + idx)}</div>
            <span className="flex-1 text-sm font-medium text-slate-700">{opt}</span>
            {answered && idx === q.ans && <Check size={18} className="text-emerald-500 flex-shrink-0" />}
            {answered && idx === picked && idx !== q.ans && <X size={18} className="text-red-500 flex-shrink-0" />}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`rounded-2xl p-5 border fade-up ${correct ? "bg-emerald-50 border-emerald-200" : "bg-sky-50 border-sky-200"}`}>
          <div className="flex gap-3">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${correct ? "bg-emerald-500" : "bg-sky-500"}`}
            >
              <Info size={14} className="text-white" />
            </div>
            <div>
              <p className={`text-sm font-bold mb-1.5 ${correct ? "text-emerald-800" : "text-sky-800"}`}>
                {correct ? "מצוין! תשובה נכונה" : `התשובה הנכונה היא ${String.fromCharCode(65 + q.ans)}`}
              </p>
              <p className={`text-sm leading-relaxed ${correct ? "text-emerald-700" : "text-sky-700"}`}>{q.exp}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={reset}
          className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw size={13} />
          התחל מחדש
        </button>
        {answered && (
          <button
            onClick={next}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm shadow-indigo-200 flex items-center gap-2"
          >
            {qi < QUIZ.length - 1 ? "שאלה הבאה" : "סיום"}
            <ChevronLeft size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
