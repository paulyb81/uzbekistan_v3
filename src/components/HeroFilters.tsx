import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  DollarSign,
  Clock,
  Calendar,
  Layers,
  RotateCcw
} from 'lucide-react';
import { FilterDistrict, FilterState } from '../types';

interface HeroFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

const DISTRICT_OPTIONS: { id: FilterDistrict; label: string }[] = [
  { id: 'All', label: 'All Districts' },
  { id: 'PAUSD', label: 'PAUSD' },
  { id: 'LASD', label: 'LASD' },
  { id: 'SSD', label: 'SSD' },
  { id: 'MPCSD', label: 'MPCSD' },
  { id: 'Private', label: 'Private' },
];

const ACADEMIC_FOCUS_TAGS = [
  'STEM / Robotics',
  'Advanced Math',
  'Writing Specialists',
  'Design Thinking',
  'Social-Emotional (SEL)',
  'Arts & Music',
  'World Languages',
  'Screen-Free'
];

export const HeroFilters: React.FC<HeroFiltersProps> = ({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleDistrictClick = (district: FilterDistrict) => {
    onFilterChange({
      ...filters,
      district,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const toggleAcademicFocus = (tag: string) => {
    const exists = filters.academicFocus.includes(tag);
    const updated = exists
      ? filters.academicFocus.filter((t) => t !== tag)
      : [...filters.academicFocus, tag];
    onFilterChange({
      ...filters,
      academicFocus: updated,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      searchQuery: '',
      district: 'All',
      schoolType: 'All',
      academicFocus: [],
      maxCommuteMin: 30,
      maxTuition: 70000,
      minScore: 7.0,
      tourStatus: 'All',
      status: 'All',
      sortBy: 'familyScore',
    });
  };

  const activeFiltersCount =
    (filters.district !== 'All' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.schoolType !== 'All' ? 1 : 0) +
    filters.academicFocus.length +
    (filters.maxCommuteMin < 30 ? 1 : 0) +
    (filters.maxTuition < 70000 ? 1 : 0) +
    (filters.minScore > 7.0 ? 1 : 0) +
    (filters.tourStatus !== 'All' ? 1 : 0);

  return (
    <div className="w-full mb-6">
      {/* Header Title and Subtitle */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bay Area Middle Schools & Rental Finder
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          School-first explorer paired with matched home listings & commute metrics
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative mb-3.5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={handleSearchChange}
          placeholder="Search school name or city (e.g. Palo Alto, Los Altos)..."
          className="w-full bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-full pl-11 pr-10 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none shadow-sm dark:shadow-md"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick District Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {DISTRICT_OPTIONS.map((opt) => {
          const isActive = filters.district === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleDistrictClick(opt.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm ${
                isActive
                  ? 'bg-blue-600 text-white shadow-blue-500/20'
                  : 'bg-white dark:bg-[#121826] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {opt.label}
            </button>
          );
        })}

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`ml-auto px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
            showAdvanced || activeFiltersCount > 0
              ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-300 dark:border-sky-600 text-sky-700 dark:text-sky-300'
              : 'bg-white dark:bg-[#121826] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters & Sort</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Results count indicator */}
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden md:inline">
          Showing {filteredCount} of {totalCount} schools
        </span>
      </div>

      {/* Expanded Advanced Filters Drawer */}
      {showAdvanced && (
        <div className="mt-4 p-4 sm:p-5 bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg dark:shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Filter by Academic Focus, Commute & Cost
              </h4>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            {/* Sort by */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 font-medium block mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" /> Sort Results
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onFilterChange({ ...filters, sortBy: e.target.value as any })
                }
                className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="familyScore">Highest Family Score</option>
                <option value="unweightedScore">Highest Unweighted Score</option>
                <option value="aidenScore">Highest Aiden Post-Visit Score</option>
                <option value="commuteMin">Shortest Commute to MP4</option>
                <option value="tuitionAsc">Lowest Tuition First</option>
                <option value="name">School Name (A-Z)</option>
              </select>
            </div>

            {/* Max Commute Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Max Commute (to MP4)
                </label>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {filters.maxCommuteMin} min
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={filters.maxCommuteMin}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxCommuteMin: parseInt(e.target.value),
                  })
                }
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>5 min (Sunnyvale)</span>
                <span>30 min (Peninsula)</span>
              </div>
            </div>

            {/* Max Tuition Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Max Annual Tuition
                </label>
                <span className="font-mono text-amber-600 dark:text-amber-300 font-bold">
                  {filters.maxTuition === 70000
                    ? 'Any ($70k+)'
                    : filters.maxTuition === 0
                    ? '$0 (Public Only)'
                    : `$${filters.maxTuition.toLocaleString()}`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="70000"
                step="5000"
                value={filters.maxTuition}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxTuition: parseInt(e.target.value),
                  })
                }
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$0 (Public)</span>
                <span>$70,000</span>
              </div>
            </div>

            {/* Tour & Status Filters */}
            <div>
              <label className="text-slate-600 dark:text-slate-400 font-medium block mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" /> Campus Tour Availability
              </label>
              <select
                value={filters.tourStatus}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    tourStatus: e.target.value as any,
                  })
                }
                className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Schools</option>
                <option value="Registration Open">Registration Open Now</option>
                <option value="Has Upcoming Tours">Has Upcoming Fall Tours</option>
              </select>
            </div>
          </div>

          {/* Academic Focus Chips */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80">
            <label className="text-slate-600 dark:text-slate-400 font-medium block mb-2 text-[11px] uppercase tracking-wider">
              Filter by Academic Programs & Pedagogical Strengths:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ACADEMIC_FOCUS_TAGS.map((tag) => {
                const isSelected = filters.academicFocus.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleAcademicFocus(tag)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
