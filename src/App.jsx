import { useState } from "react";
import { BookOpen, Video, Headphones, Layers, Trophy, X } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TopicHero from "./components/TopicHero";
import QuizBanner from "./components/QuizBanner";
import Quiz from "./components/Quiz";
import TextMode from "./components/modes/TextMode";
import VideoMode from "./components/modes/VideoMode";
import AudioPlayer from "./components/modes/AudioPlayer";
import Flashcards from "./components/modes/Flashcards";

// The four learning modes, each mapped to its component.
const TABS = [
  { id: "text", label: "טקסט לימודי", Icon: BookOpen, Component: TextMode },
  { id: "video", label: "סרטון הסבר", Icon: Video, Component: VideoMode },
  { id: "audio", label: "פודקאסט", Icon: Headphones, Component: AudioPlayer },
  { id: "flashcards", label: "פלאשקארדס", Icon: Layers, Component: Flashcards },
];

export default function App() {
  // Simple state machine driving the whole single-page app.
  const [subject, setSubject] = useState("chemistry");
  const [tab, setTab] = useState("text");
  const [showQuiz, setShowQuiz] = useState(false);
  // Sidebar starts open on desktop, closed on phones (where it's an overlay drawer).
  const [sidebar, setSidebar] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );

  const ActiveMode = TABS.find((t) => t.id === tab).Component;

  const handleSelectSubject = (id) => {
    setSubject(id);
    setShowQuiz(false);
    setTab("text");
    // On phones the drawer overlays content, so close it after a pick.
    if (window.innerWidth < 1024) setSidebar(false);
  };

  return (
    <div className="flex h-screen overflow-hidden" dir="rtl">
      <Sidebar
        open={sidebar}
        activeSubject={subject}
        onSelectSubject={handleSelectSubject}
        onClose={() => setSidebar(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebar((s) => !s)} />

        {/* Scrollable workspace */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-4xl mx-auto px-3 sm:px-5 py-5 sm:py-8 space-y-5 sm:space-y-7">
            <TopicHero />

            {!showQuiz && <QuizBanner onStart={() => setShowQuiz(true)} />}

            {showQuiz ? (
              /* Quiz panel */
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-l from-amber-500 to-orange-600 px-4 sm:px-7 py-4 sm:py-5 flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Trophy size={19} />
                    מבחן תרגול
                  </h3>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                    aria-label="סגור מבחן"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 sm:p-7">
                  <Quiz onClose={() => setShowQuiz(false)} />
                </div>
              </div>
            ) : (
              /* Learning-modes panel */
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-slate-100 px-6 pt-5">
                  <div className="flex gap-1 overflow-x-auto">
                    {TABS.map((t) => {
                      const active = tab === t.id;
                      const Icon = t.Icon;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTab(t.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all ${
                            active
                              ? "text-indigo-600 border-indigo-500 bg-indigo-50"
                              : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Icon size={15} />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Active mode */}
                <div className="p-4 sm:p-7">
                  <ActiveMode />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
