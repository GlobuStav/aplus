import { Atom } from "lucide-react";
import { TOPIC } from "../data/chemistry";

const STATS = [
  ["4", "מצבי למידה"],
  ["6", "פלאשקארדס"],
  ["3", "שאלות"],
];

/** Gradient hero banner introducing the current topic. */
export default function TopicHero() {
  return (
    <div className="bg-gradient-to-l from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-7 text-white shadow-xl shadow-indigo-100">
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0">
          <Atom size={28} className="text-white" />
        </div>
        <div>
          <p className="text-white/60 text-xs mb-1">{TOPIC.chapter}</p>
          <h1 className="text-2xl font-black mb-2">{TOPIC.title}</h1>
          <p className="text-white/75 text-sm leading-relaxed max-w-lg">{TOPIC.description}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-6 flex-wrap">
        {STATS.map(([v, l]) => (
          <div key={l} className="bg-white/15 backdrop-blur rounded-xl px-4 py-2">
            <p className="text-xl font-black">{v}</p>
            <p className="text-white/55 text-xs">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
