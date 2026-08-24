import React from 'react';
import {
  X,
  Star,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  User
} from 'lucide-react';
import { School } from '../types';
import { getScoreColor } from '../utils/scoreColors';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedSchools: School[];
  allSchools: School[];
  onRemoveFromCompare: (schoolId: string) => void;
  onAddToCompare: (schoolId: string) => void;
  onSelectSchool?: (schoolId: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedSchools,
  allSchools,
  onRemoveFromCompare,
  onAddToCompare,
  onSelectSchool,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#101624] border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Side-by-Side School & Program Comparison</span>
              <span className="text-xs bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60 px-2 py-0.5 rounded-full font-mono font-semibold">
                {comparedSchools.length} Selected
              </span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Compare academic focus, admission deadlines, extracurriculars, Aiden's feedback, and commute to Sunnyvale MP4
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Print Comparison Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add more schools dropdown bar if < 4 schools */}
        {comparedSchools.length < 4 && (
          <div className="px-6 py-2.5 bg-slate-100/70 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-600 dark:text-slate-400">Add another school to compare:</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onAddToCompare(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="" disabled>
                + Select a school to add...
              </option>
              {allSchools
                .filter((s) => !comparedSchools.some((cs) => cs.id === s.id))
                .map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name} ({school.district}) - Score {school.familyScore.toFixed(2)}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Body Matrix Table */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          {comparedSchools.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-300">No schools selected for comparison yet.</p>
              <p className="text-xs mt-1">Select "Compare" on school cards or choose from the dropdown above.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-3 text-xs uppercase font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#0d131f] border-b border-slate-200 dark:border-slate-800 w-44 sticky left-0 z-20">
                    Dimension
                  </th>
                  {comparedSchools.map((school) => (
                    <th
                      key={school.id}
                      className="p-4 text-left bg-slate-50 dark:bg-[#0f1523] border-b border-l border-slate-200 dark:border-slate-800 min-w-[240px] relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 dark:text-sky-400 font-mono">
                            {school.district} • {school.city}
                          </span>
                          <h3
                            onClick={() => {
                              if (onSelectSchool) {
                                onClose();
                                onSelectSchool(school.id);
                              }
                            }}
                            className={`font-bold text-sm text-slate-900 dark:text-white mt-0.5 line-clamp-2 ${
                              onSelectSchool ? 'hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer' : ''
                            }`}
                            title={onSelectSchool ? 'Open dedicated school page' : undefined}
                          >
                            {school.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => onRemoveFromCompare(school.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-200 dark:divide-slate-800/80">
                {/* Family Weighted Score */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Family Weighted Score
                  </td>
                  {comparedSchools.map((s) => {
                    const scoreColor = getScoreColor(s.familyScore);
                    return (
                      <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800">
                        <div className={`flex items-center gap-1.5 font-mono font-bold text-sm ${scoreColor.textColor}`}>
                          <Star className="w-4 h-4 fill-current" />
                          <span>{s.familyScore.toFixed(2)} / 10</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Aiden's Post-Visit Score */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 bg-sky-50/50 dark:bg-sky-950/20">
                  <td className="p-3 font-semibold text-sky-800 dark:text-sky-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span>Aiden's Post-Visit Score</span>
                    </div>
                  </td>
                  {comparedSchools.map((s) => {
                    const aidenScore = s.aidenEvaluation?.overallScore ?? (s.aidenScore > 0 ? s.aidenScore : null);
                    const aidenTheme = aidenScore ? getScoreColor(aidenScore) : null;
                    return (
                      <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800">
                        {s.aidenEvaluation ? (
                          <div>
                            <div className={`font-mono font-bold ${aidenTheme?.textColor}`}>
                              {s.aidenEvaluation.overallScore.toFixed(2)} / 10
                            </div>
                            {s.aidenEvaluation.overallNotes && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                                "{s.aidenEvaluation.overallNotes}"
                              </p>
                            )}
                          </div>
                        ) : s.aidenScore > 0 ? (
                          <div>
                            <div className={`font-mono font-bold ${aidenTheme?.textColor}`}>
                              {s.aidenScore.toFixed(1)} / 10
                            </div>
                            {s.aidenNotes && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                                "{s.aidenNotes}"
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Pending campus visit</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Dad's Post-Visit Score */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 bg-indigo-50/50 dark:bg-indigo-950/20">
                  <td className="p-3 font-semibold text-indigo-800 dark:text-indigo-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Dad's Post-Visit Score</span>
                    </div>
                  </td>
                  {comparedSchools.map((s) => {
                    const dadScore = s.dadEvaluation?.overallScore ?? (s.dadScore !== undefined ? s.dadScore : null);
                    const dadTheme = dadScore ? getScoreColor(dadScore) : null;
                    return (
                      <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800">
                        {s.dadEvaluation ? (
                          <div>
                            <div className={`font-mono font-bold ${dadTheme?.textColor}`}>
                              {s.dadEvaluation.overallScore.toFixed(2)} / 10
                            </div>
                            {s.dadEvaluation.overallNotes && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                                "{s.dadEvaluation.overallNotes}"
                              </p>
                            )}
                          </div>
                        ) : s.dadScore !== undefined ? (
                          <div>
                            <div className={`font-mono font-bold ${dadTheme?.textColor}`}>
                              {s.dadScore.toFixed(1)} / 10
                            </div>
                            {s.dadNotes && (
                              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                                "{s.dadNotes}"
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Pending campus visit</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Commute to Sunnyvale MP4 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Commute to MP4
                  </td>
                  {comparedSchools.map((s) => (
                    <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {s.commuteToMP4Min} min
                    </td>
                  ))}
                </tr>

                {/* Tuition */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Annual Tuition
                  </td>
                  {comparedSchools.map((s) => (
                    <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800 font-mono font-semibold">
                      {s.tuition === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Public ($0)</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-300">{s.tuitionDisplay}</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Academic Highlights */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Academic Focus
                  </td>
                  {comparedSchools.map((s) => (
                    <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800">
                      <div className="flex flex-wrap gap-1">
                        {s.academicFocus.map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Family Fit Strengths */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Key Strengths
                  </td>
                  {comparedSchools.map((s) => (
                    <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {s.topStrengths}
                    </td>
                  ))}
                </tr>

                {/* Trade-Offs / Considerations */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-amber-700 dark:text-amber-400 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Considerations
                  </td>
                  {comparedSchools.map((s) => (
                    <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {s.considerations}
                    </td>
                  ))}
                </tr>

                {/* Matched Rentals Count */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0d131f] sticky left-0 z-10">
                    Matched Rentals
                  </td>
                  {comparedSchools.map((s) => (
                    <td key={s.id} className="p-3.5 border-l border-slate-200 dark:border-slate-800">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {s.housingCandidates.length} candidate properties
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Zone: {s.targetResidentialZone}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
