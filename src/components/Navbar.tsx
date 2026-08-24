import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Calendar,
  Table2,
  BookmarkCheck,
  Plus,
  Lock,
  MoreVertical,
  Moon,
  Sun,
  Cloud,
  CloudOff,
  RefreshCw,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  compareCount: number;
  syncStatus?: 'synced' | 'syncing' | 'offline' | 'error';
  onOpenCompare: () => void;
  onOpenDatabase: () => void;
  onOpenCalendar: () => void;
  onAddNewSchool: () => void;
  onExportData?: () => void;
  onImportData?: () => void;
  onResetDefaults?: () => void;
  onLockSession?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  compareCount,
  syncStatus = 'synced',
  onOpenCompare,
  onOpenDatabase,
  onOpenCalendar,
  onAddNewSchool,
  onLockSession,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-600/20 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight block">
                Aiden's Middle School Transition
              </span>
              {/* Cloud Sync Status Badge */}
              <div
                className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight border transition-colors ${
                  syncStatus === 'synced'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60'
                    : syncStatus === 'syncing'
                    ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/60'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60'
                }`}
                title={
                  syncStatus === 'synced'
                    ? 'Cloud Database Synced (Firestore)'
                    : syncStatus === 'syncing'
                    ? 'Syncing changes to Cloud...'
                    : 'Local Cache Active (Connecting...)'
                }
              >
                {syncStatus === 'synced' && <Cloud className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                {syncStatus === 'syncing' && <RefreshCw className="w-3 h-3 text-sky-600 dark:text-sky-400 animate-spin" />}
                {syncStatus === 'offline' && <CloudOff className="w-3 h-3 text-amber-600 dark:text-amber-400" />}
                <span>
                  {syncStatus === 'synced' ? 'Cloud Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Local Cache'}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Bay Area Explorer
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shadow-sm"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-500" />
                <span className="hidden md:inline">Dark</span>
              </>
            )}
          </button>

          {/* Side by side compare trigger */}
          <button
            onClick={onOpenCompare}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border shadow-sm ${
              compareCount > 0
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Compare</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white dark:bg-slate-950 dark:text-slate-100 text-[10px] font-mono font-bold">
              {compareCount}
            </span>
          </button>

          {/* 3-Dot Overflow Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="More actions"
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border flex items-center justify-center transition-all ${
                isMenuOpen
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {/* Tour Calendar */}
                <button
                  onClick={() => {
                    onOpenCalendar();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                  <span>Tour Calendar</span>
                </button>

                {/* School Database */}
                <button
                  onClick={() => {
                    onOpenDatabase();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors"
                >
                  <Table2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>School Database</span>
                </button>

                {/* Add School */}
                <button
                  onClick={() => {
                    onAddNewSchool();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors"
                >
                  <Plus className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                  <span>Add School</span>
                </button>

                {/* Divider */}
                <div className="my-1 border-t border-slate-200 dark:border-slate-800/80" />

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => {
                    toggleDarkMode();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {isDarkMode ? (
                      <Moon className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500" />
                    )}
                    <span>Dark Mode</span>
                  </div>
                  <div
                    className={`w-8 h-4.5 rounded-full p-0.5 transition-colors flex items-center ${
                      isDarkMode ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </button>

                {/* Lock Session */}
                {onLockSession && (
                  <>
                    <div className="my-1 border-t border-slate-200 dark:border-slate-800/80" />
                    <button
                      onClick={() => {
                        onLockSession();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Lock</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
