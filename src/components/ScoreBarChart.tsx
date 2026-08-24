import React from 'react';
import { CategoryScores } from '../types';
import { getScoreColor } from '../utils/scoreColors';

interface ScoreBarChartProps {
  scores: CategoryScores;
}

export const ScoreBarChart: React.FC<ScoreBarChartProps> = ({ scores }) => {
  const items = [
    { label: 'Academics', fullLabel: 'Academic Fit & Scaffolding', score: scores?.academics ?? 9.0 },
    { label: 'Athletics', fullLabel: 'Athletics & Physical Balance', score: scores?.athletics ?? 9.0 },
    { label: 'Community', fullLabel: 'School Culture & Community', score: scores?.community ?? 9.0 },
    { label: 'Facilities', fullLabel: 'Middle School Environment & Facilities', score: scores?.facilities ?? 9.0 },
    { label: 'Logistics', fullLabel: 'Logistics, Commute & Support', score: scores?.logistics ?? 9.0 },
    { label: 'Extracurriculars', fullLabel: 'Extracurriculars & Outdoor Ed', score: scores?.extracurriculars ?? 9.0 },
  ];

  const maxVal = 10.0;

  return (
    <div className="bg-slate-50 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800/80 rounded-xl p-3.5 sm:p-5 my-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[11px] font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
          Weighted Category Score Breakdown
        </h4>
        <span className="text-xs text-slate-500 font-mono">Scale 1.0 – 10.0</span>
      </div>

      {/* Bar Chart Container */}
      <div className="relative pt-2 pb-6">
        {/* Horizontal grid lines */}
        <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none opacity-25">
          <div className="border-b border-dashed border-slate-400 w-full flex justify-end pr-1 text-[10px] text-slate-400">10</div>
          <div className="border-b border-dashed border-slate-400 w-full flex justify-end pr-1 text-[10px] text-slate-400">7.5</div>
          <div className="border-b border-dashed border-slate-400 w-full flex justify-end pr-1 text-[10px] text-slate-400">5.0</div>
          <div className="border-b border-dashed border-slate-400 w-full flex justify-end pr-1 text-[10px] text-slate-400">2.5</div>
          <div className="border-b border-slate-400 w-full flex justify-end pr-1 text-[10px] text-slate-400">0</div>
        </div>

        {/* Vertical Bars (6 columns) */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-3 h-36 items-end relative z-10 px-1 sm:px-3">
          {items.map((item) => {
            const clampedScore = Math.max(0, Math.min(maxVal, item.score));
            const heightPercent = (clampedScore / maxVal) * 100;
            const scoreColor = getScoreColor(item.score);

            return (
              <div key={item.label} className="flex flex-col items-center h-full justify-end group" title={`${item.fullLabel}: ${item.score.toFixed(1)} / 10`}>
                {/* Score label */}
                <div className={`mb-1 text-[11px] sm:text-xs font-mono font-bold ${scoreColor.textColor}`}>
                  {item.score.toFixed(1)}
                </div>

                {/* Bar */}
                <div className="w-7 sm:w-11 bg-slate-200 dark:bg-slate-800/80 rounded-t-md h-full flex items-end justify-center overflow-hidden p-0.5">
                  <div
                    className="w-full rounded-t-sm transition-all duration-500 ease-out"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: scoreColor.hex,
                    }}
                  />
                </div>

                {/* Label under bar */}
                <div className="mt-2 text-center w-full">
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-400 block truncate" title={item.fullLabel}>
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
