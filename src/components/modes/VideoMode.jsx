import { useState } from "react";
import { Play, Video } from "lucide-react";

const RELATED = [
  { title: "חישוב ΔH באמצעות אנרגיות קשר", dur: "12:30", lvl: "בינוני" },
  { title: "חוק הס — תרגול ודוגמאות", dur: "15:20", lvl: "מתקדם" },
];

/** Video learning mode — stylized player placeholder + related clips. */
export default function VideoMode() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="space-y-5 fade-up">
      <div className="relative rounded-3xl overflow-hidden bg-slate-900" style={{ aspectRatio: "16/9" }}>
        {!clicked ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => setClicked(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-violet-900/60 to-slate-900" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 50%, #818cf8 0%, transparent 50%), radial-gradient(circle at 70% 30%, #a78bfa 0%, transparent 40%)",
              }}
            />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-2xl">
                <Play size={30} className="text-white" style={{ marginInlineStart: "3px" }} />
              </div>
              <h3 className="text-white text-xl font-bold mb-1">סרטון הסבר: קשרים כימיים ואנרגיה</h3>
              <p className="text-white/60 text-sm">18:45 • ד"ר מיכל לוי</p>
            </div>
          </div>
        ) : (
          // Replace this block with a real <iframe> when a video URL is available.
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800">
            <Video size={52} className="text-white/20 mb-3" />
            <p className="text-white/40 text-sm">הסרטון יתחיל כאן</p>
            <p className="text-white/25 text-xs mt-1">(חבר URL אמיתי ל-iframe)</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RELATED.map((v, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 flex gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center flex-shrink-0 group-hover:from-indigo-200 group-hover:to-violet-200 transition-colors">
              <Play size={18} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors mb-1">
                {v.title}
              </p>
              <p className="text-xs text-slate-400">
                {v.dur} • {v.lvl}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
