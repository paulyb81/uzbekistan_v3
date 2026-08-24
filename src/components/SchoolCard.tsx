import React, { useState } from 'react';
import {
  Star,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  Edit3,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Heart,
  Car,
  User,
  Home
} from 'lucide-react';
import { School, RentalCandidate } from '../types';
import { ScoreBarChart } from './ScoreBarChart';
import { getScoreColor } from '../utils/scoreColors';

interface SchoolCardProps {
  school: School;
  isSelected?: boolean;
  isCompared?: boolean;
  onToggleCompare: (school: School) => void;
  onSelect: (school: School) => void;
  onOpenSchoolPage?: (school: School) => void;
  onEditSchool: (school: School) => void;
  onOpenEvaluation: (school: School, evaluator: 'Aiden' | 'Dad') => void;
  onAddRental: (schoolId: string) => void;
  onToggleFavorite: (schoolId: string) => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  isSelected,
  isCompared,
  onToggleCompare,
  onSelect,
  onOpenSchoolPage,
  onEditSchool,
  onOpenEvaluation,
  onAddRental,
  onToggleFavorite,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRentalsExpanded, setIsRentalsExpanded] = useState(false);

  const handleSchoolClick = () => {
    if (onOpenSchoolPage) {
      onOpenSchoolPage(school);
    } else {
      onSelect(school);
    }
  };

  // Evaluator scores with safe fallback to baseline
  const aidenScoreDisplay = school.aidenEvaluation?.overallScore ?? (school.aidenScore > 0 ? school.aidenScore : school.familyScore);
  const dadScoreDisplay = school.dadEvaluation?.overallScore ?? (school.dadScore !== undefined ? school.dadScore : school.familyScore);
  const aidenNotesDisplay = school.aidenEvaluation?.overallNotes || school.aidenNotes;
  const dadNotesDisplay = school.dadEvaluation?.overallNotes || school.dadNotes;

  // Score coloring: < 7.0 Red, 7.0 - 7.99 Yellow, >= 8.0 Green
  const scoreTheme = getScoreColor(school.familyScore);
  const aidenScoreTheme = getScoreColor(aidenScoreDisplay);
  const dadScoreTheme = getScoreColor(dadScoreDisplay);

  return (
    <div
      id={`school-card-${school.id}`}
      className={`rounded-2xl transition-all duration-300 border ${
        isSelected
          ? 'bg-emerald-50/70 dark:bg-[#151c2d] border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-[0_8px_30px_rgba(16,185,129,0.12)]'
          : 'bg-white dark:bg-[#121826] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md'
      } overflow-hidden p-5 sm:p-6 mb-6`}
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {/* School Thumbnail Image */}
          <div
            onClick={handleSchoolClick}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 cursor-pointer group"
          >
            <img
              src={school.imageUrl}
              alt={school.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80';
              }}
            />
            {school.type === 'Private' ? (
              <span className="absolute bottom-1 right-1 bg-amber-500/95 text-[9px] font-bold px-1.5 py-0.5 rounded text-slate-950">
                PVT
              </span>
            ) : (
              <span className="absolute bottom-1 right-1 bg-sky-600/95 text-[9px] font-bold px-1.5 py-0.5 rounded text-white">
                PUB
              </span>
            )}
          </div>

          {/* School Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800/40">
                {school.district}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                • {school.city}
              </span>
              {school.isFavorite && (
                <span className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-0.5 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Favorite
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <h3
                onClick={handleSchoolClick}
                className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
              >
                {school.name}
              </h3>
              <button
                onClick={handleSchoolClick}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/60 transition-colors border border-sky-200 dark:border-sky-800/50"
                title="Open dedicated school page"
              >
                <span>Deep-Dive Page</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Metrics Line */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">
                  Students
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                  {school.studentCount}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">
                  Student-Teacher
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                  {school.studentTeacherRatio}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">
                  Commute to MP4
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" /> {school.commuteToMP4Min} min
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] block font-semibold">
                  Tuition / Cost
                </span>
                <span
                  className={`font-semibold font-mono ${
                    school.tuition === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-300'
                  }`}
                >
                  {school.tuitionDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Score & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            {/* Overall Score Badge: Red (<7.0), Yellow (7.0-7.99), Green (>=8.0) */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-sm sm:text-base border shadow-sm ${scoreTheme.badgeBg}`}
              title={`Overall Family Fit Score: ${school.familyScore.toFixed(2)}`}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>{school.familyScore.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => onToggleFavorite(school.id)}
              title={school.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-1.5 rounded-lg border transition-colors ${
                school.isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800/80 text-rose-600 dark:text-rose-400'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${school.isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => onToggleCompare(school)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isCompared
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              {isCompared ? 'Comparing' : 'Compare'}
            </button>

            <button
              onClick={() => onEditSchool(school)}
              title="Edit School Details & Ratings"
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Twisty / Expand Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse evaluation details' : 'Expand evaluation details'}
              className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                isExpanded
                  ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-700'
              }`}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Twisty Toggle Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
            isExpanded
              ? 'bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80'
              : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-sky-700 dark:text-sky-400 border border-slate-200 dark:border-slate-700/60 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-transform duration-200 ${
              isExpanded ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400 rotate-180' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium">
              {isExpanded
                ? 'Collapse Evaluation Rubric & Details'
                : 'Show Rubric Ratings, Fit Strengths & Housing Candidates'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isExpanded && (
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline bg-white dark:bg-slate-900/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                {school.housingCandidates.length} Rentals • {school.tourDates?.length || 0} Tours
              </span>
            )}
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
              {isExpanded ? 'Hide Details' : 'Expand'}
            </span>
          </div>
        </button>
      </div>

      {/* Collapsible Detailed Section */}
      {isExpanded && (
        <div className="mt-4 pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Main Weighted Score Breakdown Component */}
          <ScoreBarChart scores={school.categoryScores} />

          {/* Key Strengths and Considerations Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            {/* Family Fit Strengths */}
            <div className="bg-emerald-50/60 dark:bg-[#0f1422] border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-3.5 flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5">
                  Top Family Fit Strengths
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {school.topStrengths}
                </p>
              </div>
            </div>

            {/* Considerations / Trade-Offs */}
            <div className="bg-amber-50/60 dark:bg-[#0f1422] border border-amber-200 dark:border-amber-900/40 rounded-xl p-3.5 flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">
                  Key Considerations & Trade-Offs
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {school.considerations}
                </p>
              </div>
            </div>
          </div>

          {/* Dual Post-Visit Evaluator Cards: Aiden & Dad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-4">
            {/* Aiden's Post-Visit Score Card */}
            <div className="bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-sky-900/50 hover:border-sky-400 dark:hover:border-sky-700/60 rounded-xl p-4 flex flex-col justify-between gap-3 transition-all shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800/60 text-sky-700 dark:text-sky-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                      Aiden's Post-Visit Score
                    </span>
                  </div>

                  <span
                    className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded-lg border ${aidenScoreTheme.badgeBg}`}
                  >
                    {aidenScoreDisplay.toFixed(2)} / 10
                  </span>
                </div>

                <div className="mt-2.5">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                    {aidenNotesDisplay ? `"${aidenNotesDisplay}"` : 'No post-visit notes logged yet. Evaluate all 6 rubric dimensions.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {school.aidenEvaluation ? 'Rubric Evaluated' : 'Preset Baseline'}
                </span>
                <button
                  onClick={() => onOpenEvaluation(school, 'Aiden')}
                  className="text-xs font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/80 dark:hover:bg-sky-900 border border-sky-300 dark:border-sky-700/60 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{school.aidenEvaluation ? "Update Aiden's Rating" : 'Rate School (Aiden)'}</span>
                </button>
              </div>
            </div>

            {/* Dad's Post-Visit Score Card */}
            <div className="bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-indigo-900/50 hover:border-indigo-400 dark:hover:border-indigo-700/60 rounded-xl p-4 flex flex-col justify-between gap-3 transition-all shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-400">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                      Dad's Post-Visit Score
                    </span>
                  </div>

                  <span
                    className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded-lg border ${dadScoreTheme.badgeBg}`}
                  >
                    {dadScoreDisplay.toFixed(2)} / 10
                  </span>
                </div>

                <div className="mt-2.5">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                    {dadNotesDisplay ? `"${dadNotesDisplay}"` : 'No post-visit notes logged yet. Evaluate all 6 rubric dimensions.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {school.dadEvaluation ? 'Rubric Evaluated' : 'Preset Baseline'}
                </span>
                <button
                  onClick={() => onOpenEvaluation(school, 'Dad')}
                  className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 border border-indigo-300 dark:border-indigo-700/60 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{school.dadEvaluation ? "Update Dad's Rating" : 'Rate School (Dad)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Campus Tour Dates & Deadlines */}
          <div className="bg-slate-50 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 my-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Tour Dates & Deadlines</span>
              </div>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono font-medium">
                {school.admissionDeadline}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {school.tourDates && school.tourDates.length > 0 ? (
                school.tourDates.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs flex items-center gap-2 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{tour.date}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">({tour.type})</span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/40 px-1.5 py-0.5 rounded font-mono font-semibold">
                      {tour.status}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">
                  Tour schedule to be announced by admissions.
                </span>
              )}
            </div>
          </div>

          {/* Matched Rental Listings Section (Collapsible Shelf) */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            {/* Shelf Header Banner */}
            <div
              onClick={() => setIsRentalsExpanded(!isRentalsExpanded)}
              className="bg-slate-50 hover:bg-slate-100 dark:bg-[#0f1424] dark:hover:bg-[#131a2e] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all shadow-sm select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      Matched Rental Listings
                    </h4>
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/50">
                      {school.housingCandidates.length}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/50 px-2 py-0.5 rounded font-mono">
                      MP4 Commute Matched
                    </span>
                  </div>
                  {!isRentalsExpanded && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {school.housingCandidates.length > 0
                        ? `Click to view ${school.housingCandidates.length} candidate ${school.housingCandidates.length === 1 ? 'home' : 'homes'} with specs, yard ratings & Zillow links`
                        : 'No candidate homes added yet. Click to view or add new listing'}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddRental(school.id);
                  }}
                  className="text-xs font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 border border-sky-300 dark:border-sky-800/50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Listing</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700/60 transition-colors">
                  <span>{isRentalsExpanded ? 'Hide Rentals' : 'Show Rentals'}</span>
                  {isRentalsExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Rental Candidates Shelf */}
            {isRentalsExpanded && (
              <div className="mt-3 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                {school.housingCandidates.length > 0 ? (
                  school.housingCandidates.map((rental: RentalCandidate) => (
                    <div
                      key={rental.id}
                      className="bg-slate-50 hover:bg-slate-100 dark:bg-[#0f1422] dark:hover:bg-[#131a2b] border border-slate-200 dark:border-slate-800/90 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between sm:justify-start gap-2">
                          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors truncate">
                            {rental.address}
                          </span>
                          <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 sm:hidden">
                            {rental.priceDisplay}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            {rental.beds} bd | {rental.baths} ba | {rental.sqft.toLocaleString()} sqft
                          </span>
                          <span>•</span>
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1 font-medium">
                            <Car className="w-3 h-3 text-sky-600 dark:text-sky-400 inline" /> {rental.commuteMin} min to MP4
                          </span>
                          {rental.neighborhood && (
                            <>
                              <span>•</span>
                              <span className="text-slate-500 dark:text-slate-400">{rental.neighborhood}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Price & Badge & Zillow button */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                        {/* Yard Rating */}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                          <span>Yard: {rental.yardRating}</span>
                        </div>

                        {/* Price Display on desktop */}
                        <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 hidden sm:inline">
                          {rental.priceDisplay}
                        </span>

                        {/* Zillow link button */}
                        <a
                          href={rental.zillowUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                          <span>Zillow</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-slate-50 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                    <span>No matched rental listings currently linked for this school. Click "Add Listing" above to link a candidate property.</span>
                  </div>
                )}

                {school.housingCandidates.length > 2 && (
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setIsRentalsExpanded(false)}
                      className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <ChevronUp className="w-3 h-3" />
                      <span>Collapse Rentals</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Target Residential Zone description */}
          <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
            <span>
              <strong className="text-slate-800 dark:text-slate-300">Target Residential Zone:</strong> {school.targetResidentialZone}
            </span>
            {school.websiteUrl && (
              <a
                href={school.websiteUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1 ml-2 shrink-0 font-medium"
              >
                Official Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Bottom Collapse Button */}
          <div className="mt-3 pt-2 text-center">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1 py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
