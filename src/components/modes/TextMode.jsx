import { Info } from "lucide-react";
import { TEXT_SECTIONS } from "../../data/chemistry";

/** Text learning mode — clean typography sections with formula & example callouts. */
export default function TextMode() {
  return (
    <div className="space-y-5 fade-up">
      {TEXT_SECTIONS.map((s) => (
        <div
          key={s.n}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              {s.n}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-800 text-base mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>

              {s.code && (
                <div className="mt-3 px-4 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <code className="text-indigo-700 text-sm font-mono">{s.code}</code>
                </div>
              )}

              {s.note && (
                <div className="mt-3 flex gap-2 px-4 py-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                  <Info size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-700 text-sm">{s.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
