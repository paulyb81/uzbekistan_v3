import React, { useState, useEffect } from 'react';
import { School, CategoryScores, EvaluatorScoreBreakdown, RUBRIC_DIMENSIONS, CategoryKey } from '../types';
import { calculateWeightedEvaluatorScore, getOrCreateEvaluatorData } from '../utils/scoreCalculator';
import { SCHOOL_RUBRIC_GUIDES } from '../data/rubricLookFors';
import { getScoreColor } from '../utils/scoreColors';
import { X, Sparkles, User, Award, CheckCircle, HelpCircle, FileText, ChevronRight, Info } from 'lucide-react';

interface RubricEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: School;
  evaluator: 'Aiden' | 'Dad';
  onSave: (schoolId: string, evaluator: 'Aiden' | 'Dad', evaluation: EvaluatorScoreBreakdown) => void;
}

export const RubricEvaluationModal: React.FC<RubricEvaluationModalProps> = ({
  isOpen,
  onClose,
  school,
  evaluator,
  onSave,
}) => {
  const [scores, setScores] = useState<CategoryScores>({
    academics: 9.0,
    athletics: 9.0,
    community: 9.5,
    facilities: 9.0,
    logistics: 9.5,
    extracurriculars: 9.0,
  });

  const [dimensionNotes, setDimensionNotes] = useState<Record<CategoryKey, string>>({
    academics: '',
    athletics: '',
    community: '',
    facilities: '',
    logistics: '',
    extracurriculars: '',
  });

  const [overallNotes, setOverallNotes] = useState<string>('');

  // Load existing data when modal opens or school/evaluator changes
  useEffect(() => {
    if (isOpen && school) {
      const existing = getOrCreateEvaluatorData(school, evaluator);
      setScores({ ...existing.scores });
      setDimensionNotes({
        academics: existing.notes?.academics || '',
        athletics: existing.notes?.athletics || '',
        community: existing.notes?.community || '',
        facilities: existing.notes?.facilities || '',
        logistics: existing.notes?.logistics || '',
        extracurriculars: existing.notes?.extracurriculars || '',
      });
      setOverallNotes(existing.overallNotes || '');
    }
  }, [isOpen, school, evaluator]);

  if (!isOpen || !school) return null;

  // Real-time computed weighted score
  const computedOverallScore = calculateWeightedEvaluatorScore(scores);

  const handleScoreChange = (dimKey: CategoryKey, rawVal: number) => {
    const clamped = Math.max(0, Math.min(10, Math.round(rawVal * 10) / 10));
    setScores((prev) => ({
      ...prev,
      [dimKey]: clamped,
    }));
  };

  const handleNoteChange = (dimKey: CategoryKey, text: string) => {
    setDimensionNotes((prev) => ({
      ...prev,
      [dimKey]: text,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluationData: EvaluatorScoreBreakdown = {
      evaluator,
      scores,
      notes: dimensionNotes,
      overallNotes,
      overallScore: computedOverallScore,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onSave(school.id, evaluator, evaluationData);
    onClose();
  };

  const isAiden = evaluator === 'Aiden';
  const schoolGuides = SCHOOL_RUBRIC_GUIDES[school.id] || {};
  const overallTheme = getScoreColor(computedOverallScore);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0c101c] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`p-4 sm:p-6 border-b flex items-start justify-between ${
            isAiden
              ? 'bg-sky-50 dark:bg-gradient-to-r dark:from-sky-950/90 dark:via-slate-900 dark:to-slate-900 border-sky-200 dark:border-sky-800/60'
              : 'bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-950/90 dark:via-slate-900 dark:to-slate-900 border-indigo-200 dark:border-indigo-800/60'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-xl border shrink-0 ${
                isAiden
                  ? 'bg-sky-100 dark:bg-sky-900/50 border-sky-300 dark:border-sky-600/50 text-sky-700 dark:text-sky-300'
                  : 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-600/50 text-indigo-700 dark:text-indigo-300'
              }`}
            >
              {isAiden ? <Sparkles className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    isAiden
                      ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-700/60'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700/60'
                  }`}
                >
                  {isAiden ? "Aiden's Post-Visit Evaluation" : "Dad's Post-Visit Evaluation"}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {school.type} • {school.district}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {school.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Rate each of the 6 rubric dimensions on a <span className="text-slate-900 dark:text-slate-200 font-semibold font-mono">0.0 – 10.0</span> scale. 
                Weights are preset and locked.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 6 Rubric Dimensions Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="space-y-5">
            {RUBRIC_DIMENSIONS.map((dim, idx) => {
              const currentScore = scores[dim.key] ?? 9.0;
              const guide = schoolGuides[dim.key];
              const noteVal = dimensionNotes[dim.key] || '';
              const dimColor = getScoreColor(currentScore);

              return (
                <div
                  key={dim.key}
                  className="bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/90 rounded-xl p-4 sm:p-5 transition-all shadow-sm"
                >
                  {/* Rubric Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 flex items-center justify-center text-[10px] font-bold font-mono">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                        {dim.label}
                      </h3>
                      {/* Non-editable Weight Badge */}
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30"
                        title="Fixed Rubric Weight (Non-editable)"
                      >
                        Weight: {dim.weightPercent} (Locked)
                      </span>
                    </div>

                    {/* Rating display pill */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Rating:</span>
                      <span
                        className={`font-mono font-bold text-base px-2.5 py-0.5 rounded-lg border ${dimColor.badgeBg} ${dimColor.textColor} border-current/30`}
                      >
                        {currentScore.toFixed(1)} / 10.0
                      </span>
                    </div>
                  </div>

                  {/* Research context & Tour Look-Fors if available */}
                  {guide && (
                    <div className="my-3 p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 text-xs space-y-1.5 shadow-xs">
                      <div className="text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-sky-700 dark:text-sky-400">Research Baseline: </span>
                        {guide.researchJustification}
                      </div>
                      {guide.lookFors && guide.lookFors.length > 0 && (
                        <div className="text-slate-600 dark:text-slate-400 flex items-start gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-800/60">
                          <span className="font-semibold text-amber-700 dark:text-amber-400 shrink-0">Look-Fors:</span>
                          <span className="italic">{guide.lookFors.join(' ')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rating Controls: Slider + Number Input */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-8 flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">0.0</span>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={currentScore}
                        onChange={(e) => handleScoreChange(dim.key, parseFloat(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800 ${
                          isAiden ? 'accent-sky-500' : 'accent-indigo-500'
                        }`}
                      />
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">10.0</span>
                    </div>

                    <div className="sm:col-span-4 flex items-center justify-end gap-2">
                      <label className="text-xs text-slate-600 dark:text-slate-400">Exact Score:</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={currentScore}
                        onChange={(e) => handleScoreChange(dim.key, parseFloat(e.target.value) || 0)}
                        className="w-20 bg-white dark:bg-[#070a12] border border-slate-300 dark:border-slate-700 rounded-lg p-1.5 text-center font-mono font-bold text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* Supporting Notes for this dimension */}
                  <div className="mt-3">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      {evaluator}'s Observations & Notes for {dim.label}:
                    </label>
                    <textarea
                      value={noteVal}
                      onChange={(e) => handleNoteChange(dim.key, e.target.value)}
                      placeholder={`Add specific observations, pros, concerns, or tour reflections for ${dim.label.toLowerCase()}...`}
                      rows={2}
                      className="w-full bg-white dark:bg-[#070a12] border border-slate-300 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-600 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall Score Calculation & Impressions Footer Card */}
          <div
            className={`p-5 rounded-2xl border ${
              isAiden
                ? 'bg-sky-50/60 dark:bg-gradient-to-br dark:from-sky-950/70 dark:via-[#0f1424] dark:to-[#0f1424] border-sky-300 dark:border-sky-800/70'
                : 'bg-indigo-50/60 dark:bg-gradient-to-br dark:from-indigo-950/70 dark:via-[#0f1424] dark:to-[#0f1424] border-indigo-300 dark:border-indigo-800/70'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isAiden
                      ? 'bg-sky-100 dark:bg-sky-900/60 border-sky-300 dark:border-sky-600/60 text-sky-700 dark:text-sky-300'
                      : 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-300 dark:border-indigo-600/60 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Computed Overall {evaluator} Score
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Weighted average based on the 6 category scores above.
                  </div>
                </div>
              </div>

              {/* Large Score Indicator */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="text-right">
                  <div className={`text-2xl sm:text-3xl font-mono font-black ${overallTheme.textColor}`}>
                    {computedOverallScore.toFixed(2)}
                    <span className="text-sm font-normal text-slate-400"> / 10.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    {computedOverallScore >= 8.0
                      ? 'Top Tier Contender'
                      : computedOverallScore >= 7.0
                      ? 'Solid Fit'
                      : 'Requires Consideration'}
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Impressions Textarea */}
            <div className="mt-4">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Overall Impressions & Final Thoughts ({evaluator})</span>
              </label>
              <textarea
                value={overallNotes}
                onChange={(e) => setOverallNotes(e.target.value)}
                placeholder={`Write overall reflections, gut feel after the visit, standout highlights, and final thoughts on whether ${school.shortName || school.name} is the right fit...`}
                rows={3}
                className="w-full bg-white dark:bg-[#070a12] border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-2 ${
                isAiden
                  ? 'bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 shadow-sky-950/50'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-950/50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Save {evaluator}'s Evaluation ({computedOverallScore.toFixed(2)})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
