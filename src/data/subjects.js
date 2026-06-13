import { Atom, Zap, Dna, Calculator } from "lucide-react";

// Available subjects shown in the sidebar.
// `Icon` is a lucide-react component; `grad` is a Tailwind gradient.
export const SUBJECTS = [
  { id: "chemistry", label: "כימיה",    Icon: Atom,       grad: "from-violet-500 to-indigo-600" },
  { id: "physics",   label: "פיזיקה",   Icon: Zap,        grad: "from-blue-500 to-cyan-500"     },
  { id: "biology",   label: "ביולוגיה", Icon: Dna,        grad: "from-emerald-500 to-teal-500"  },
  { id: "math",      label: "מתמטיקה",  Icon: Calculator, grad: "from-orange-500 to-amber-500"  },
];
