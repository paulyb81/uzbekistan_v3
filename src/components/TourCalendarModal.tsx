import React, { useState } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  MapPin,
  CheckCircle,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { School, TourDate } from '../types';

interface TourCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  onSelectSchool: (schoolId: string) => void;
}

export const TourCalendarModal: React.FC<TourCalendarModalProps> = ({
  isOpen,
  onClose,
  schools,
  onSelectSchool,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');

  if (!isOpen) return null;

  // Flatten all tour dates with school info
  const allTours: { school: School; tour: TourDate }[] = [];
  schools.forEach((school) => {
    school.tourDates.forEach((tour) => {
      allTours.push({ school, tour });
    });
  });

  // Sort by date ascending
  allTours.sort((a, b) => new Date(a.tour.date).getTime() - new Date(b.tour.date).getTime());

  const filteredTours = allTours.filter(({ school, tour }) => {
    if (selectedDistrict !== 'All' && school.district !== selectedDistrict) return false;
    if (selectedMonth !== 'All') {
      const tourDate = new Date(tour.date);
      const monthName = tourDate.toLocaleString('default', { month: 'short' });
      if (monthName !== selectedMonth) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#101624] border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Campus Tour Dates & Admissions Timeline
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Track open houses, classroom walk-throughs, and registration deadlines for 2026–2027 admissions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-3 bg-slate-100/70 dark:bg-[#0d131f] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Filter Month:</span>
            {['All', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Aug'].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMonth === m
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400 font-medium">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="All">All Districts</option>
              <option value="PAUSD">PAUSD (Palo Alto)</option>
              <option value="LASD">LASD (Los Altos)</option>
              <option value="SSD">SSD (Sunnyvale)</option>
              <option value="MPCSD">MPCSD (Menlo Park)</option>
              <option value="Private">Private Schools</option>
            </select>
          </div>
        </div>

        {/* Tours List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredTours.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-300">No scheduled tours found matching your filter criteria.</p>
              <p className="text-xs mt-1">Select "All" to view all upcoming tour opportunities across the Bay Area.</p>
            </div>
          ) : (
            filteredTours.map(({ school, tour }) => {
              const isOpen = tour.status === 'Registration Open' || tour.status === 'Upcoming';
              return (
                <div
                  key={tour.id}
                  className="bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm group"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Date Block */}
                    <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex flex-col items-center justify-center text-center shrink-0 shadow-sm">
                      <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">
                        {new Date(tour.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold font-mono text-slate-900 dark:text-white leading-none mt-0.5">
                        {new Date(tour.date).getDate()}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 font-mono">
                          {school.district}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">• {school.city}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          {tour.type}
                        </span>
                      </div>

                      <h3
                        onClick={() => {
                          onSelectSchool(school.id);
                          onClose();
                        }}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer mt-0.5 transition-colors"
                      >
                        {school.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> {tour.time}
                        </span>
                        <span>•</span>
                        <span>Deadline: <strong className="text-amber-700 dark:text-amber-400">{school.admissionDeadline}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                        isOpen
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
                      }`}
                    >
                      {tour.status}
                    </span>

                    {tour.registrationLink && (
                      <a
                        href={tour.registrationLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <span>Register</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
