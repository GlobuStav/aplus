import { Star } from "lucide-react";
import { SUBJECTS } from "../data/subjects";

/** Left (RTL: right) sidebar — logo, subject list, last-score widget.
 *  Desktop: a static column that collapses its width.
 *  Phone:   an off-canvas drawer that slides in over the content. */
export default function Sidebar({ open, activeSubject, onSelectSubject, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

    <aside
      className={`fixed lg:static inset-y-0 right-0 z-40 w-64 flex-shrink-0 bg-white border-l border-slate-100 flex flex-col shadow-sm overflow-hidden transition-all duration-300 ${
        open ? "translate-x-0 lg:w-64" : "translate-x-full lg:translate-x-0 lg:w-0"
      }`}
    >
      {/* Logo */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-200 flex-shrink-0">
          <span className="text-white font-black text-base leading-none tracking-tight">A+</span>
        </div>
        <div>
          <p className="font-black text-slate-800 text-lg leading-none">A+</p>
          <p className="text-xs text-slate-400 mt-0.5 whitespace-nowrap">פלטפורמת למידה</p>
        </div>
      </div>

      {/* Subject nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">מקצועות</p>
        {SUBJECTS.map((s) => {
          const active = activeSubject === s.id;
          const Icon = s.Icon;
          return (
            <button
              key={s.id}
              onClick={() => onSelectSubject(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-right transition-all ${
                active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-indigo-100" : "bg-slate-100"}`}
              >
                <Icon size={16} className={active ? "text-indigo-600" : "text-slate-500"} />
              </div>
              <span className="font-medium text-sm flex-1 text-right">{s.label}</span>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Score widget */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Star size={13} className="text-amber-400" />
            <span className="text-xs font-semibold text-slate-600">ציון אחרון</span>
          </div>
          <p className="text-3xl font-black text-indigo-600 leading-none">
            87<span className="text-sm font-medium text-slate-400">/100</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">כימיה • קשרים כימיים</p>
        </div>
      </div>
    </aside>
    </>
  );
}
