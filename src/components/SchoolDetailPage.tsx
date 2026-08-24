import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Car,
  DollarSign,
  Users,
  GraduationCap,
  Calendar,
  ExternalLink,
  MapPin,
  Heart,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Award,
  BookOpen,
  Trophy,
  ShieldCheck,
  Building,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Flame,
  Activity,
  HeartHandshake,
  ListOrdered,
  ShieldAlert,
  Newspaper,
  Library,
  Lightbulb,
  Globe,
  UserCheck,
  Clock,
} from 'lucide-react';
import { School, CategoryKey } from '../types';
import { getGreatSchoolsData } from '../data/schoolDeepDiveData';
import { INSTITUTIONAL_REPORTS } from '../data/schoolInstitutionalReports';
import { getScoreColor } from '../utils/scoreColors';

interface SchoolDetailPageProps {
  school: School;
  allSchools: School[];
  isCompared?: boolean;
  onBack: () => void;
  onSelectSchool: (schoolId: string) => void;
  onToggleCompare: (school: School) => void;
  onOpenEvaluation: (school: School, evaluator: 'Aiden' | 'Dad') => void;
  onEditSchool: (school: School) => void;
  onAddRental: (schoolId: string) => void;
  onToggleFavorite: (schoolId: string) => void;
}

export const SchoolDetailPage: React.FC<SchoolDetailPageProps> = ({
  school,
  allSchools,
  onBack,
  onSelectSchool,
  onOpenEvaluation,
  onEditSchool,
  onToggleFavorite,
}) => {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);

  // Scroll to top on mount or school change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [school.id]);

  // Derived data
  const gsData = getGreatSchoolsData(school);
  const scoreTheme = getScoreColor(school.familyScore);
  const report = INSTITUTIONAL_REPORTS[school.id];

  const aidenScoreDisplay =
    school.aidenEvaluation?.overallScore ?? (school.aidenScore > 0 ? school.aidenScore : school.familyScore);
  const dadScoreDisplay =
    school.dadEvaluation?.overallScore ?? (school.dadScore !== undefined ? school.dadScore : school.familyScore);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const sectionLinks = [
    { id: 'section-overview', label: 'Overview' },
    { id: 'section-academics', label: 'Academics' },
    { id: 'section-athletics', label: 'Athletics' },
    { id: 'section-community', label: 'Community' },
    { id: 'section-facilities', label: 'Facilities' },
    { id: 'section-logistics', label: 'Logistics' },
    { id: 'section-extracurriculars', label: 'Extracurriculars' },
    ...(report?.historyAndLeadership ? [{ id: 'section-history', label: 'History & Media' }] : []),
    { id: 'section-tours', label: 'Tours' },
    ...(report?.worksCited ? [{ id: 'section-references', label: 'References' }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] pb-24 transition-colors">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121826]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: Back button & School Selector */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all shrink-0"
              title="Back to all schools"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to search</span>
            </button>

            {/* School Switcher Dropdown */}
            <div className="relative hidden md:flex items-center gap-2">
              <span className="text-slate-400 dark:text-slate-500 text-xs">/</span>
              <div className="relative inline-block">
                <select
                  value={school.id}
                  onChange={(e) => onSelectSchool(e.target.value)}
                  aria-label="Switch School"
                  className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  {allSchools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.familyScore.toFixed(1)} ★)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(school.id)}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                school.isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
              }`}
              title="Save to favorites"
            >
              <Heart
                className={`w-4 h-4 ${school.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
              />
              <span className="hidden sm:inline">
                {school.isFavorite ? 'Saved' : 'Save'}
              </span>
            </button>

            <button
              onClick={() => onEditSchool(school)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Edit school parameters"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with 2-Column Split: Content on Left, Sticky Sidebar on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Top Header & Core Metadata Hero Row */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                    school.type === 'Private'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                  }`}
                >
                  {school.type === 'Private' ? 'Private Independent' : 'Public Middle School'}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {school.district}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  • {school.city}, CA
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  • Grades {school.gradeSpan}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {school.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                {school.address}
              </p>
            </div>

            {/* Official School Website Link at Top */}
            {school.websiteUrl && (
              <div className="shrink-0 pt-1">
                <a
                  href={school.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/50 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold shadow-sm transition-all group"
                >
                  <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>Official School Website</span>
                  <ExternalLink className="w-3 h-3 text-sky-500 opacity-70 group-hover:opacity-100" />
                </a>
              </div>
            )}
          </div>

          {/* Numeric Metric Callout Strip */}
          <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
              {/* Family Fit Score */}
              <div className="pt-2 sm:pt-0 sm:pr-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Family Fit Score
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span
                    className={`text-2xl sm:text-3xl font-extrabold font-mono ${scoreTheme.textColor}`}
                  >
                    {school.familyScore.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/ 10</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Unweighted: {school.unweightedScore.toFixed(2)}
                </span>
              </div>

              {/* Tuition */}
              <div className="pt-3 sm:pt-0 sm:px-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Annual Tuition
                </span>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                  {school.tuition === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">$0 (Public)</span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">
                      {school.tuitionDisplay}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {school.type === 'Private' ? 'Need-based aid available' : 'Tax-funded district'}
                </span>
              </div>

              {/* Commute */}
              <div className="pt-3 sm:pt-0 sm:px-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Commute to MP4
                </span>
                <div className="flex items-center gap-1 text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  <Car className="w-5 h-5 inline text-emerald-600 dark:text-emerald-400" />
                  <span>{school.commuteToMP4Min} min</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                  {school.commuteSummary.split(';')[0]}
                </span>
              </div>

              {/* Ratio / Students */}
              <div className="pt-3 sm:pt-0 sm:pl-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Ratio & Enrollment
                </span>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                  {school.studentTeacherRatio}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {school.studentCount} students total
                </span>
              </div>
            </div>
          </div>

          {/* Clickable Quick Score Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Aiden's Score Badge (Clickable -> Opens Aiden evaluation modal) */}
            <button
              onClick={() => onOpenEvaluation(school, 'Aiden')}
              title="Click to view & edit Aiden's evaluation score"
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 rounded-xl px-3 py-1.5 transition-all shadow-xs cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-emerald-900 dark:text-emerald-300">
                Aiden's Score:
              </span>
              <span className="font-bold font-mono text-emerald-700 dark:text-emerald-300">
                {aidenScoreDisplay.toFixed(1)} / 10
              </span>
              <Edit3 className="w-3 h-3 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
            </button>

            {/* Dad's Score Badge (Clickable -> Opens Dad evaluation modal) */}
            <button
              onClick={() => onOpenEvaluation(school, 'Dad')}
              title="Click to view & edit Dad's (Paul's) evaluation score"
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100/80 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 rounded-xl px-3 py-1.5 transition-all shadow-xs cursor-pointer group"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                Dad's (Paul's) Score:
              </span>
              <span className="font-bold font-mono text-indigo-700 dark:text-indigo-300">
                {dadScoreDisplay.toFixed(1)} / 10
              </span>
              <Edit3 className="w-3 h-3 text-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
            </button>

            {/* GreatSchools Rating Badge (Clickable -> Opens official GreatSchools site) */}
            {gsData.sourceUrl ? (
              <a
                href={gsData.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to view full profile on GreatSchools.org"
                className="flex items-center gap-2 bg-sky-50 hover:bg-sky-100/80 dark:bg-sky-950/40 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800/60 rounded-xl px-3 py-1.5 transition-all shadow-xs cursor-pointer group"
              >
                <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sky-900 dark:text-sky-300">
                  GreatSchools Rating:
                </span>
                <span className="font-bold font-mono text-sky-700 dark:text-sky-300">
                  {gsData.summaryRating} / 10
                </span>
                <ExternalLink className="w-3 h-3 text-sky-500 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
              </a>
            ) : (
              <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-xl px-3 py-1.5">
                <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="font-semibold text-sky-900 dark:text-sky-300">
                  GreatSchools Rating:
                </span>
                <span className="font-bold font-mono text-sky-700 dark:text-sky-300">
                  {gsData.summaryRating} / 10
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Layout: Main Content (Left) + Floating Sticky Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Continuous Detailed Sections (Narrowed for perfect side-by-side reading) */}
          <div className="lg:col-span-8 space-y-12 min-w-0">

            {/* 1. OVERVIEW SECTION */}
            <section id="section-overview" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Overview & Institutional Profile
                  </h2>
                </div>
                {report && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-10.5">
                    {report.subtitle}
                  </p>
                )}
              </div>

              {/* Lead Report Paragraphs */}
              {report ? (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {report.overview.leadParagraph}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {report.overview.metricsParagraph}
                  </p>

                  {/* Standardized Benchmark Table */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Standardized Performance Comparison
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold">
                          <tr>
                            <th className="p-3">Metric</th>
                            <th className="p-3 text-sky-700 dark:text-sky-400">{school.shortName}</th>
                            <th className="p-3">{school.district} District</th>
                            <th className="p-3">California State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#121826]">
                          {report.overview.benchmarkTable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{row.metric}</td>
                              <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.schoolValue}</td>
                              <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{row.districtValue}</td>
                              <td className="p-3 font-mono text-slate-500 dark:text-slate-500">{row.stateValue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white dark:bg-[#121826] border border-emerald-200/60 dark:border-emerald-900/40 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Key School Strengths
                      </h3>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {school.topStrengths}
                    </p>
                  </div>

                  {/* Considerations */}
                  <div className="bg-white dark:bg-[#121826] border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Key Trade-offs & Considerations
                      </h3>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {school.considerations}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* 2. ACADEMICS SECTION */}
            <section id="section-academics" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Academics & Instructional Frameworks
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Academics: {school.categoryScores.academics.toFixed(1)} / 10
                </span>
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* Lead text & Pure Teaming Card */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      <GraduationCap className="w-4 h-4" />
                      <h3>{report.academics.teamingModel.title}</h3>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.academics.lead}
                    </p>
                  </div>

                  {/* Math Progression & Choice Program */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Math */}
                    <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        {report.academics.mathProgression.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {report.academics.mathProgression.description}
                      </p>
                    </div>

                    {/* Choice Program */}
                    {report.academics.choiceProgram && (
                      <div className="bg-white dark:bg-[#121826] border border-sky-200/80 dark:border-sky-900/40 rounded-2xl p-6 shadow-sm space-y-3">
                        <h4 className="text-sm font-bold text-sky-900 dark:text-sky-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-sky-600" />
                          {report.academics.choiceProgram.name}
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {report.academics.choiceProgram.description}
                        </p>
                        <div className="space-y-1.5 pt-2">
                          {report.academics.choiceProgram.pillars.map((pillar, pIdx) => (
                            <div key={pIdx} className="text-xs bg-sky-50/60 dark:bg-sky-950/30 p-2 rounded-lg">
                              <strong className="text-sky-900 dark:text-sky-300 font-semibold">{pillar.title}: </strong>
                              <span className="text-slate-600 dark:text-slate-400">{pillar.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Foundation Support / PiE */}
                  <div className="bg-gradient-to-r from-indigo-50/80 to-sky-50/80 dark:from-indigo-950/30 dark:to-sky-950/30 border border-indigo-200 dark:border-indigo-900/60 rounded-2xl p-6 space-y-3">
                    <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-indigo-600" />
                      {report.academics.foundationFunding.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.academics.foundationFunding.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {report.academics.foundationFunding.initiatives.map((init, iIdx) => (
                        <li key={iIdx} className="text-xs bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40 text-slate-700 dark:text-slate-300">
                          • {init}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Signature Academic Foci & Electives
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {school.academicFocus.map((focus, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/40"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Standardized Subject Proficiency Bars (CAASPP) */}
              <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Standardized Subject Proficiency vs. California State Average
                  </h4>
                  <span className="text-[11px] text-slate-500">CAASPP & CAST Assessments</span>
                </div>

                {/* Math */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">Mathematics Proficiency</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {gsData.mathProficiency}% (CA Avg: {gsData.stateMathAvg}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden flex relative">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${gsData.mathProficiency}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10"
                      style={{ left: `${gsData.stateMathAvg}%` }}
                      title={`CA State Average: ${gsData.stateMathAvg}%`}
                    />
                  </div>
                </div>

                {/* English */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">English Language Arts / Reading</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">
                      {gsData.englishProficiency}% (CA Avg: {gsData.stateEnglishAvg}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden flex relative">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${gsData.englishProficiency}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10"
                      style={{ left: `${gsData.stateEnglishAvg}%` }}
                      title={`CA State Average: ${gsData.stateEnglishAvg}%`}
                    />
                  </div>
                </div>

                {/* Science */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">Science Standards (CAST)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      {gsData.scienceProficiency}% (CA Avg: {gsData.stateScienceAvg}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden flex relative">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${gsData.scienceProficiency}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10"
                      style={{ left: `${gsData.stateScienceAvg}%` }}
                      title={`CA State Average: ${gsData.stateScienceAvg}%`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. ATHLETICS SECTION */}
            <section id="section-athletics" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Athletics & Physical Balance
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Athletics: {school.categoryScores.athletics.toFixed(1)} / 10
                </span>
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* League Architecture */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-600" />
                      {report.athletics.leagueArchitecture.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {report.athletics.leagueArchitecture.leagues.map((lg, lIdx) => (
                        <div key={lIdx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                          <strong className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{lg.name}</strong>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{lg.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seasonal Schedule Table */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Seasonal Sports Calendar & Participation Structure
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold">
                          <tr>
                            <th className="p-3">Athletic Season</th>
                            <th className="p-3">Primary Sports</th>
                            <th className="p-3">Participation Structure</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#121826]">
                          {report.athletics.seasonalSchedule.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td className="p-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">{row.season}</td>
                              <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-300">{row.sports}</td>
                              <td className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed">{row.structure}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Focus Sports Analysis (Track & Soccer) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.athletics.focusSportsAnalysis.map((fa, fIdx) => (
                      <div key={fIdx} className="bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 rounded-2xl p-5 space-y-2">
                        <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">{fa.title}</h5>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{fa.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Competitive League & Interscholastic Sports
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {school.name} participates in competitive middle school leagues with cross country, soccer, basketball, track & field, and volleyball.
                  </p>
                </div>
              )}
            </section>

            {/* 4. SCHOOL CULTURE & COMMUNITY */}
            <section id="section-community" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    School Culture & Community
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  Culture: {school.categoryScores.community.toFixed(1)} / 10
                </span>
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* The JLS Way */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-rose-600" />
                        {report.community.behavioralCharter.name}
                      </h3>
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 italic">
                        "{report.community.behavioralCharter.motto}"
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
                      {report.community.behavioralCharter.pillars.map((pil, idx) => (
                        <div key={idx} className="bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 p-3 rounded-xl text-center space-y-1">
                          <span className="text-xs font-bold text-rose-900 dark:text-rose-300 block">{pil.name}</span>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">{pil.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* District Culture, Academic Pressure & Mental Health Countermeasures */}
                  <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-600" />
                      District Context, Academic Climate & Mental Health Safeguards
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.community.academicClimateAndWellbeing.historicalContext}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.community.academicClimateAndWellbeing.investigationFindings}
                    </p>
                    <div className="bg-white dark:bg-[#121826] p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <strong className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        Systemic Structural Modifications Implemented by PAUSD:
                      </strong>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {report.community.academicClimateAndWellbeing.countermeasures.map((cm, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span>{cm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Strong community culture with dedicated advisory cohorts, phone-free campus enforcement, and high neighborhood engagement.
                  </p>
                </div>
              )}
            </section>

            {/* 5. FACILITIES & PHYSICAL ENVIRONMENT */}
            <section id="section-facilities" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Physical Environment & Facilities
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Facilities: {school.categoryScores.facilities.toFixed(1)} / 10
                </span>
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* Architectural Heritage */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-600" />
                      Architectural Origins: {report.facilities.architecturalHeritage.architects} ({report.facilities.architecturalHeritage.year})
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {report.facilities.architecturalHeritage.history}
                    </p>
                  </div>

                  {/* Key Facilities Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.facilities.keyFacilities.map((fac, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          {fac.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{fac.name}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{fac.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Campus features dedicated grade-level quads, regulation soccer fields, multi-purpose gyms, and modern STEM makerspaces.
                  </p>
                </div>
              )}
            </section>

            {/* 6. LOGISTICS & SUPPORT */}
            <section id="section-logistics" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Logistics, Commute & Support Services
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Logistics: {school.categoryScores.logistics.toFixed(1)} / 10
                </span>
              </div>

              {report ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Looping Counseling */}
                    <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-teal-600" />
                        {report.logistics.counselingModel.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {report.logistics.counselingModel.description}
                      </p>
                    </div>

                    {/* Homework Habitat */}
                    <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky-600" />
                        {report.logistics.academicInterventions.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {report.logistics.academicInterventions.description}
                      </p>
                    </div>
                  </div>

                  {/* Health, Safety & Safe Routes */}
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {report.logistics.safetyAndTransit.title}
                    </h4>
                    <ul className="space-y-2">
                      {report.logistics.safetyAndTransit.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-teal-500 font-bold shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Estimated commute: {school.commuteToMP4Min} minutes to Sunnyvale MP4. Extended study hall and after-school programs available.
                  </p>
                </div>
              )}
            </section>

            {/* 7. EXTRACURRICULARS & OUTDOOR EDUCATION */}
            <section id="section-extracurriculars" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Extracurriculars, STEM & Outdoor Education
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Enrichment: {school.categoryScores.extracurriculars.toFixed(1)} / 10
                </span>
              </div>

              {report ? (
                <div className="space-y-6">
                  {/* STEM Competitions */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      STEM Competitions & Academic Olympiads
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {report.extracurriculars.stemCompetitions.map((stem, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                            {stem.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{stem.name}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{stem.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outdoor Education & Media */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.extracurriculars.outdoorAndMedia.map((om, omIdx) => (
                      <div key={omIdx} className="bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 rounded-2xl p-5 space-y-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200">
                          {om.grade}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{om.name}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{om.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* A Day in the Life Schedule */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-600" />
                      A Day in the Life of a Student at {school.shortName}
                    </h3>
                    <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                      {report.extracurriculars.dayInTheLife.map((step, dIdx) => (
                        <div key={dIdx} className="relative pl-8 space-y-0.5">
                          <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white dark:border-[#121826]" />
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{step.time}</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{step.activity}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Active Clubs & Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.extracurriculars.map((ec, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {ec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 8. INSTITUTIONAL HISTORY, LEADERSHIP & MEDIA (If available) */}
            {report?.historyAndLeadership && (
              <section id="section-history" className="scroll-mt-24 space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold">
                      8
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Institutional History, Leadership & Media Analysis
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* History & Chronology */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Library className="w-4 h-4 text-slate-600" />
                      Institutional History & Naming Background
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {report.historyAndLeadership.historicalChronology.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="text-sky-500 font-bold shrink-0">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 italic">
                      Namesake: {report.historyAndLeadership.namesakeBackground}
                    </p>
                  </div>

                  {/* Leadership Cohort Table */}
                  <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Administrative Leadership & Counseling Team
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold">
                          <tr>
                            <th className="p-3">Cohort / Role</th>
                            <th className="p-3">Site Administrator</th>
                            <th className="p-3">Cohort Counselor</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#121826]">
                          {report.historyAndLeadership.leadershipCohort.map((lead, lIdx) => (
                            <tr key={lIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td className="p-3 font-semibold text-slate-900 dark:text-white">{lead.gradeOrRole}</td>
                              <td className="p-3 text-slate-700 dark:text-slate-300">{lead.administrator}</td>
                              <td className="p-3 text-slate-600 dark:text-slate-400">{lead.counselor}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Media Coverage Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Positive */}
                    <div className="bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 rounded-2xl p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Newspaper className="w-3.5 h-3.5" /> Positive Press Coverage
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {report.historyAndLeadership.mediaAnalysis.positive}
                      </p>
                    </div>

                    {/* Neutral */}
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Newspaper className="w-3.5 h-3.5" /> Neutral / Health Response
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {report.historyAndLeadership.mediaAnalysis.neutral}
                      </p>
                    </div>

                    {/* Critical / Safety */}
                    <div className="bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> Safety & Critical Analysis
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {report.historyAndLeadership.mediaAnalysis.critical.incidentSummary}
                      </p>
                      <div className="pt-1">
                        <strong className="text-[11px] font-bold text-amber-900 dark:text-amber-300 block mb-1">
                          Safety Overhaul Measures:
                        </strong>
                        <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                          {report.historyAndLeadership.mediaAnalysis.critical.reforms.map((rf, rIdx) => (
                            <li key={rIdx}>• {rf}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 9. TOURS & ADMISSIONS DEADLINES */}
            <section id="section-tours" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Admissions Timeline & Campus Tours
                  </h2>
                </div>
              </div>

              {/* Deadlines Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                    Primary Application / Enrollment Deadline
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {school.admissionDeadline}
                  </span>
                </div>

                {school.financialAidDeadline && (
                  <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                      Financial Aid (Clarity) Deadline
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {school.financialAidDeadline}
                    </span>
                  </div>
                )}
              </div>

              {/* Tour Events Stream */}
              <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upcoming Tours, Information Nights & Orientations
                </h4>

                {school.tourDates && school.tourDates.length > 0 ? (
                  <div className="space-y-3">
                    {school.tourDates.map((tour) => (
                      <div
                        key={tour.id}
                        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {tour.date}
                            </span>
                            <span className="text-xs text-slate-500">• {tour.time}</span>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                              {tour.status}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {tour.type}
                          </p>
                          {tour.notes && (
                            <p className="text-xs text-slate-500 italic">"{tour.notes}"</p>
                          )}
                        </div>

                        <button
                          onClick={() => onOpenEvaluation(school, 'Dad')}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all shrink-0"
                        >
                          Prep Tour Look-Fors
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    No tour events currently listed. Contact admissions.
                  </p>
                )}
              </div>
            </section>

            {/* 10. WORKS CITED / REFERENCES (Collapsible, collapsed by default) */}
            {report?.worksCited && (
              <section id="section-references" className="scroll-mt-24">
                <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setIsReferencesOpen(!isReferencesOpen)}
                    aria-expanded={isReferencesOpen}
                    className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                          <span>References & Works Cited</span>
                          <span className="text-xs font-normal text-slate-500">
                            ({report.worksCited.length} sources)
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Primary source documentation, district disclosures & institutional reporting
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{isReferencesOpen ? 'Hide' : 'Show'}</span>
                      {isReferencesOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isReferencesOpen && (
                    <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2">
                      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-4">
                        {report.worksCited.map((cite) => (
                          <li
                            key={cite.id}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2"
                          >
                            <span className="font-mono font-bold text-sky-600 dark:text-sky-400 shrink-0">
                              [{cite.id}]
                            </span>
                            <div className="min-w-0 flex-1">
                              <a
                                href={cite.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:underline line-clamp-2"
                              >
                                {cite.title}
                              </a>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Floating In-Page Section Navigation */}
          <div className="lg:col-span-4 sticky top-20 space-y-4">
            
            {/* Quick In-Page Section Jump Navigation */}
            <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2 hidden lg:block">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5 text-slate-500" />
                <span>Jump to Section</span>
              </h4>
              <div className="space-y-1">
                {sectionLinks.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{sec.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-40" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
