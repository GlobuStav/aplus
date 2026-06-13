import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { WAVE } from "../../data/chemistry";

const DURATION = 847; // seconds (~14 min)

const CHAPTERS = [
  { t: "0:00", l: "מבוא לקשרים כימיים" },
  { t: "3:20", l: "תהליכים אקסותרמיים" },
  { t: "7:45", l: "תהליכים אנדותרמיים" },
  { t: "11:30", l: "חוק הס ויישומים" },
];

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// Fill the range track from the right (RTL) up to the given percentage.
const trackStyle = (v) => ({
  background: `linear-gradient(to left, rgba(255,255,255,0.25) ${100 - v}%, rgba(255,255,255,0.85) ${100 - v}%)`,
});

/** Audio learning mode — custom podcast player with waveform, scrubbing & chapters. */
export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0); // 0–100
  const [vol, setVol] = useState(70);
  const tickRef = useRef(null);

  useEffect(() => {
    if (playing) {
      tickRef.current = setInterval(() => {
        setProg((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return +(p + 100 / DURATION).toFixed(3);
        });
      }, 1000);
    } else {
      clearInterval(tickRef.current);
    }
    return () => clearInterval(tickRef.current);
  }, [playing]);

  const cur = Math.floor((prog * DURATION) / 100);

  return (
    <div className="space-y-5 fade-up">
      {/* Player card */}
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-7 text-white shadow-2xl shadow-indigo-200">
        {/* Waveform */}
        <div className="flex items-end justify-center gap-px h-14 mb-6">
          {WAVE.map((h, i) => {
            const pct = (i / WAVE.length) * 100;
            return (
              <span
                key={i}
                className="wave-bar flex-shrink-0"
                style={{
                  height: `${h}px`,
                  background: pct <= prog ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                }}
              />
            );
          })}
        </div>

        {/* Meta */}
        <div className="text-center mb-5">
          <p className="text-white/60 text-xs mb-0.5">פרק לימודי • כימיה</p>
          <h3 className="text-lg font-bold">קשרים כימיים ואנרגיה</h3>
          <p className="text-white/55 text-xs mt-0.5">ד"ר מיכל לוי • {fmt(DURATION)}</p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={prog}
            onChange={(e) => setProg(+e.target.value)}
            style={trackStyle(prog)}
          />
          <div className="flex justify-between text-xs text-white/55 mt-1">
            <span>{fmt(cur)}</span>
            <span>{fmt(DURATION)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setProg((p) => Math.max(0, p - 5))}
            className="opacity-70 hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            {playing ? (
              <Pause size={20} className="text-indigo-600" />
            ) : (
              <Play size={20} className="text-indigo-600" style={{ marginInlineStart: "2px" }} />
            )}
          </button>
          <button
            onClick={() => setProg((p) => Math.min(100, p + 5))}
            className="opacity-70 hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mt-5">
          <Volume2 size={15} className="opacity-60 flex-shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={vol}
            onChange={(e) => setVol(+e.target.value)}
            style={trackStyle(vol)}
          />
        </div>
      </div>

      {/* Chapter list */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">פרקי הפודקאסט</p>
        <div className="space-y-1">
          {CHAPTERS.map((c, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-colors text-right group"
              onClick={() => setProg((i / CHAPTERS.length) * 100)}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors">
                <span className="text-xs font-bold text-indigo-600">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{c.l}</p>
                <p className="text-xs text-slate-400">{c.t}</p>
              </div>
              <Play size={13} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
