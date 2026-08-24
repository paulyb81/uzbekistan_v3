/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroFilters } from './components/HeroFilters';
import { SchoolsMap } from './components/SchoolsMap';
import { SchoolCard } from './components/SchoolCard';
import { SchoolDetailPage } from './components/SchoolDetailPage';
import { CompareModal } from './components/CompareModal';
import { SchoolDatabaseModal } from './components/SchoolDatabaseModal';
import { EditSchoolModal } from './components/EditSchoolModal';
import { TourCalendarModal } from './components/TourCalendarModal';
import { RubricEvaluationModal } from './components/RubricEvaluationModal';
import { AccessGate } from './components/AccessGate';
import { INITIAL_SCHOOLS } from './data/schoolsData';
import { School, FilterState, RentalCandidate, EvaluatorScoreBreakdown } from './types';
import { calculateCompositeScores, getBaseCategoryScores } from './utils/scoreCalculator';
import {
  subscribeToSchools,
  saveSchoolToFirestore,
  deleteSchoolFromFirestore,
  resetSchoolsToDefaultsInFirestore,
} from './services/firebaseSchools';
import { BookmarkCheck, X, Sparkles, Plus, Download, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'bay_area_middle_schools_data_v6';

export default function App() {
  // Cloud Database synchronization status
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline' | 'error'>('syncing');

  // Session Access Gate: defaults to locked unless valid token exists
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const sessionAuth = sessionStorage.getItem('portal_auth_token_v1');
      if (sessionAuth === 'authorized') return true;
      const localAuth = localStorage.getItem('portal_auth_token_v1');
      if (localAuth === 'authorized') return true;
    } catch {
      // fallback
    }
    return false;
  });

  const handleLockSession = () => {
    try {
      sessionStorage.removeItem('portal_auth_token_v1');
      localStorage.removeItem('portal_auth_token_v1');
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  // Update browser tab title based on authentication state
  useEffect(() => {
    if (isAuthenticated) {
      document.title = 'Middle School Finder';
    } else {
      document.title = 'Uzbekistan';
    }
  }, [isAuthenticated]);

  // Load persistent school data from localStorage as initial instant cache
  const [schools, setSchools] = useState<School[]>(() => {
    try {
      // Clean up older cache keys
      ['bay_area_middle_schools_data_v1', 'bay_area_middle_schools_data_v2', 'bay_area_middle_schools_data_v3', 'bay_area_middle_schools_data_v4', 'bay_area_middle_schools_data_v5'].forEach((k) => {
        try { localStorage.removeItem(k); } catch {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter((s: School) => s.id !== 'castilleja-school' && !s.name?.toLowerCase().includes('castilleja'))
            .map((item) => ({
              ...item,
              baseCategoryScores: item.baseCategoryScores ?? getBaseCategoryScores(item),
            }));
        }
      }
    } catch (e) {
      console.warn('Failed to load cached school data:', e);
    }
    return INITIAL_SCHOOLS
      .filter((s) => s.id !== 'castilleja-school' && !s.name?.toLowerCase().includes('castilleja'))
      .map((item) => ({
        ...item,
        baseCategoryScores: getBaseCategoryScores(item),
      }));
  });

  // Track if we have performed initial sync
  const isInitialCloudSyncRef = useRef(false);

  // Subscribe to real-time Cloud Firestore updates across all devices/incognito tabs
  useEffect(() => {
    setSyncStatus('syncing');
    const unsubscribe = subscribeToSchools(
      (remoteSchools) => {
        if (remoteSchools && remoteSchools.length > 0) {
          // Normalize baseCategoryScores if missing in remote records and filter out Castilleja
          const normalized = remoteSchools
            .filter((s) => s.id !== 'castilleja-school' && !s.name?.toLowerCase().includes('castilleja'))
            .map((item) => ({
              ...item,
              baseCategoryScores: item.baseCategoryScores ?? getBaseCategoryScores(item),
            }));
          setSchools(normalized);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          } catch (e) {
            // ignore
          }
        }
        setSyncStatus('synced');
        isInitialCloudSyncRef.current = true;
      },
      (error) => {
        console.error('Firestore synchronization error:', error);
        setSyncStatus('offline');
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Save to local cache on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schools));
    } catch (e) {
      console.error('Failed to cache schools:', e);
    }
  }, [schools]);

  // Selected school on map
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);

  // Dedicated School Page view ID (null = homepage explorer)
  const [activeSchoolPageId, setActiveSchoolPageId] = useState<string | null>(() => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#/school/')) {
        const id = hash.replace('#/school/', '').trim();
        return id || null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/school/')) {
        const id = hash.replace('#/school/', '').trim();
        setActiveSchoolPageId(id || null);
      } else {
        setActiveSchoolPageId(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Open standalone school page
  const handleOpenSchoolPage = (schoolOrId: School | string) => {
    const id = typeof schoolOrId === 'string' ? schoolOrId : schoolOrId.id;
    setActiveSchoolPageId(id);
    window.location.hash = `/school/${id}`;
  };

  // Close standalone school page and return to search/explorer
  const handleCloseSchoolPage = () => {
    setActiveSchoolPageId(null);
    window.location.hash = '';
  };

  // Compared schools array of IDs
  const [comparedSchoolIds, setComparedSchoolIds] = useState<string[]>([
    'jls-middle',
    'blach-intermediate',
    'sunnyvale-middle',
  ]);

  // Modal open states
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);

  // Rubric Evaluation Modal state for Aiden and Dad
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [evaluatingSchool, setEvaluatingSchool] = useState<School | null>(null);
  const [evaluatorType, setEvaluatorType] = useState<'Aiden' | 'Dad'>('Aiden');

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
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

  // Filter and sort schools
  const filteredSchools = useMemo(() => {
    return schools
      .filter((school) => {
        // District filter
        if (filters.district !== 'All') {
          if (filters.district === 'Private') {
            if (school.type !== 'Private') return false;
          } else {
            if (school.district !== filters.district) return false;
          }
        }

        // Search query
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = school.name.toLowerCase().includes(query);
          const matchCity = school.city.toLowerCase().includes(query);
          const matchDistrict = school.district.toLowerCase().includes(query);
          const matchStrengths = school.topStrengths.toLowerCase().includes(query);
          const matchZone = school.targetResidentialZone.toLowerCase().includes(query);
          if (!matchName && !matchCity && !matchDistrict && !matchStrengths && !matchZone) {
            return false;
          }
        }

        // Academic focus
        if (filters.academicFocus.length > 0) {
          const hasAnyFocus = filters.academicFocus.some((focus) =>
            school.academicFocus.some((af) =>
              af.toLowerCase().includes(focus.toLowerCase())
            )
          );
          if (!hasAnyFocus) return false;
        }

        // Max Commute
        if (school.commuteToMP4Min > filters.maxCommuteMin) {
          return false;
        }

        // Max Tuition
        if (school.tuition > filters.maxTuition) {
          return false;
        }

        // Min Score
        if (school.familyScore < filters.minScore) {
          return false;
        }

        // Tour status
        if (filters.tourStatus === 'Registration Open') {
          const hasOpen = school.tourDates.some((t) => t.status === 'Registration Open');
          if (!hasOpen) return false;
        } else if (filters.tourStatus === 'Has Upcoming Tours') {
          if (!school.tourDates || school.tourDates.length === 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'familyScore') {
          return b.familyScore - a.familyScore;
        }
        if (filters.sortBy === 'unweightedScore') {
          return b.unweightedScore - a.unweightedScore;
        }
        if (filters.sortBy === 'aidenScore') {
          return b.aidenScore - a.aidenScore;
        }
        if (filters.sortBy === 'commuteMin') {
          return a.commuteToMP4Min - b.commuteToMP4Min;
        }
        if (filters.sortBy === 'tuitionAsc') {
          return a.tuition - b.tuition;
        }
        if (filters.sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [schools, filters]);

  // Handler for selecting school from map or card
  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    const element = document.getElementById(`school-card-${schoolId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Toggle compare item
  const handleToggleCompare = (school: School) => {
    if (comparedSchoolIds.includes(school.id)) {
      setComparedSchoolIds(comparedSchoolIds.filter((id) => id !== school.id));
    } else {
      if (comparedSchoolIds.length >= 4) {
        alert('You can compare up to 4 schools side-by-side simultaneously.');
        return;
      }
      setComparedSchoolIds([...comparedSchoolIds, school.id]);
    }
  };

  // Open detailed rubric evaluation modal for Aiden or Dad
  const handleOpenEvaluation = (school: School, evaluator: 'Aiden' | 'Dad') => {
    setEvaluatingSchool(school);
    setEvaluatorType(evaluator);
    setIsEvaluationModalOpen(true);
  };

  // Save detailed rubric evaluation for Aiden or Dad & recalculate category & composite scores
  const handleSaveRubricEvaluation = async (
    schoolId: string,
    evaluator: 'Aiden' | 'Dad',
    evaluation: EvaluatorScoreBreakdown
  ) => {
    let updatedSchoolToSync: School | null = null;

    setSchools((prev) =>
      prev.map((s) => {
        if (s.id !== schoolId) return s;

        const baseScores = s.baseCategoryScores ?? getBaseCategoryScores(s);
        const newAidenEval = evaluator === 'Aiden' ? evaluation : s.aidenEvaluation;
        const newDadEval = evaluator === 'Dad' ? evaluation : s.dadEvaluation;

        // Compute updated composite and category scores against the pristine baseline
        const computed = calculateCompositeScores(newAidenEval, newDadEval, baseScores);

        const updated: School = {
          ...s,
          baseCategoryScores: baseScores,
          aidenEvaluation: newAidenEval,
          dadEvaluation: newDadEval,
          aidenScore: computed.aidenScore,
          aidenNotes: newAidenEval?.overallNotes || s.aidenNotes,
          dadScore: computed.dadScore,
          dadNotes: newDadEval?.overallNotes || s.dadNotes,
          categoryScores: computed.categoryScores,
          familyScore: computed.familyScore,
          unweightedScore: computed.unweightedScore,
        };

        updatedSchoolToSync = updated;
        return updated;
      })
    );

    if (updatedSchoolToSync) {
      try {
        setSyncStatus('syncing');
        await saveSchoolToFirestore(updatedSchoolToSync);
        setSyncStatus('synced');
      } catch (err) {
        console.error('Failed to sync rubric evaluation to Firestore:', err);
      }
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (schoolId: string) => {
    let updatedSchoolToSync: School | null = null;

    setSchools((prev) =>
      prev.map((s) => {
        if (s.id === schoolId) {
          const updated = { ...s, isFavorite: !s.isFavorite };
          updatedSchoolToSync = updated;
          return updated;
        }
        return s;
      })
    );

    if (updatedSchoolToSync) {
      try {
        await saveSchoolToFirestore(updatedSchoolToSync);
      } catch (err) {
        console.error('Failed to sync favorite status to Firestore:', err);
      }
    }
  };

  // Add rental candidate to school
  const handleAddRental = (schoolId: string) => {
    const school = schools.find((s) => s.id === schoolId);
    if (!school) return;
    setEditingSchool(school);
    setIsEditModalOpen(true);
  };

  // Edit school
  const handleOpenEditModal = (school: School) => {
    setEditingSchool(school);
    setIsEditModalOpen(true);
  };

  // Add new school profile
  const handleAddNewSchool = () => {
    setEditingSchool(null);
    setIsEditModalOpen(true);
  };

  // Save school (create or update)
  const handleSaveSchool = async (savedSchool: School) => {
    setSchools((prev) => {
      const exists = prev.some((s) => s.id === savedSchool.id);
      if (exists) {
        return prev.map((s) => (s.id === savedSchool.id ? savedSchool : s));
      } else {
        return [savedSchool, ...prev];
      }
    });

    try {
      setSyncStatus('syncing');
      await saveSchoolToFirestore(savedSchool);
      setSyncStatus('synced');
    } catch (err) {
      console.error('Failed to save school to Firestore:', err);
    }
  };

  // Delete school
  const handleDeleteSchool = async (schoolId: string) => {
    setSchools((prev) => prev.filter((s) => s.id !== schoolId));
    setComparedSchoolIds((prev) => prev.filter((id) => id !== schoolId));

    try {
      setSyncStatus('syncing');
      await deleteSchoolFromFirestore(schoolId);
      setSyncStatus('synced');
    } catch (err) {
      console.error('Failed to delete school in Firestore:', err);
    }
  };

  // Reset to default dataset
  const handleResetDefaults = async () => {
    if (
      window.confirm(
        'Reset all schools, visit scores, and rental candidates back to default dataset across all devices?'
      )
    ) {
      setSchools(INITIAL_SCHOOLS);
      try {
        setSyncStatus('syncing');
        await resetSchoolsToDefaultsInFirestore();
        setSyncStatus('synced');
      } catch (err) {
        console.error('Failed to reset Firestore schools:', err);
      }
    }
  };

  // Export to CSV formatted for Google Sheets
  const handleExportCSV = () => {
    const headers = [
      'School Name',
      'Type',
      'Location / Commute to MP4',
      'Grade Span',
      'Tuition / Cost',
      'Preliminary Unweighted Score',
      'Preliminary Family Weighted Score',
      "Aiden's Post-Visit Weighted Score",
      'Top Family Fit Strengths',
      'Key Considerations & Trade-Offs',
      'Status',
      'Target Residential Zone & Housing Candidates',
    ];

    const rows = schools.map((s) => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.type} (${s.district})"`,
      `"${s.locationDetails}"`,
      `"${s.gradeSpan}"`,
      `"${s.tuitionDisplay}"`,
      s.unweightedScore.toFixed(2),
      s.familyScore.toFixed(2),
      s.aidenScore > 0 ? s.aidenScore.toFixed(2) : '0.00',
      `"${s.topStrengths.replace(/"/g, '""')}"`,
      `"${s.considerations.replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.targetResidentialZone.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bay_Area_Middle_Schools_Aiden_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(schools, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `bay_area_middle_schools_data_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImportJSON = (importedSchools: School[]) => {
    setSchools(importedSchools);
  };

  // Compared schools objects
  const comparedSchools = useMemo(() => {
    return comparedSchoolIds
      .map((id) => schools.find((s) => s.id === id))
      .filter(Boolean) as School[];
  }, [schools, comparedSchoolIds]);

  // Active school object for dedicated page
  const activeSchool = useMemo(() => {
    if (!activeSchoolPageId) return null;
    return schools.find((s) => s.id === activeSchoolPageId) || null;
  }, [schools, activeSchoolPageId]);

  if (!isAuthenticated) {
    return <AccessGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  // If a dedicated school page is open, render the deep-dive school page
  if (activeSchool) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
        <SchoolDetailPage
          school={activeSchool}
          allSchools={schools}
          isCompared={comparedSchoolIds.includes(activeSchool.id)}
          onBack={handleCloseSchoolPage}
          onSelectSchool={handleOpenSchoolPage}
          onToggleCompare={handleToggleCompare}
          onOpenEvaluation={handleOpenEvaluation}
          onEditSchool={handleOpenEditModal}
          onAddRental={handleAddRental}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Modals available from within SchoolDetailPage */}
        <CompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          comparedSchools={comparedSchools}
          allSchools={schools}
          onRemoveFromCompare={(id) =>
            setComparedSchoolIds(comparedSchoolIds.filter((cid) => cid !== id))
          }
          onAddToCompare={(id) => {
            if (!comparedSchoolIds.includes(id)) {
              setComparedSchoolIds([...comparedSchoolIds, id]);
            }
          }}
          onSelectSchool={(id) => {
            setIsCompareOpen(false);
            handleOpenSchoolPage(id);
          }}
        />

        <SchoolDatabaseModal
          isOpen={isDatabaseOpen}
          onClose={() => setIsDatabaseOpen(false)}
          schools={schools}
          onUpdateSchool={handleSaveSchool}
          onAddNewSchool={handleAddNewSchool}
          onDeleteSchool={handleDeleteSchool}
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
          onResetDefaults={handleResetDefaults}
        />

        <EditSchoolModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingSchool(null);
          }}
          school={editingSchool}
          onSave={handleSaveSchool}
        />

        <TourCalendarModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          schools={schools}
          onSelectSchool={(id) => {
            setIsCalendarOpen(false);
            handleOpenSchoolPage(id);
          }}
        />

        {/* Rubric Evaluation Modal for Aiden or Dad */}
        {evaluatingSchool && (
          <RubricEvaluationModal
            isOpen={isEvaluationModalOpen}
            onClose={() => {
              setIsEvaluationModalOpen(false);
              setEvaluatingSchool(null);
            }}
            school={evaluatingSchool}
            evaluator={evaluatorType}
            onSave={handleSaveRubricEvaluation}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
      {/* Top sticky Navigation */}
      <Navbar
        compareCount={comparedSchoolIds.length}
        syncStatus={syncStatus}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenDatabase={() => setIsDatabaseOpen(true)}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onAddNewSchool={handleAddNewSchool}
        onExportData={handleExportCSV}
        onImportData={() => setIsDatabaseOpen(true)}
        onResetDefaults={handleResetDefaults}
        onLockSession={handleLockSession}
      />

      {/* Main Content Explorer */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 pb-28">
        {/* Header Search & District Filter bar (matching screenshot) */}
        <HeroFilters
          filters={filters}
          onFilterChange={setFilters}
          totalCount={schools.length}
          filteredCount={filteredSchools.length}
        />

        {/* Interactive Map card (matching screenshot top map block) */}
        <div className="mb-6">
          <SchoolsMap
            schools={filteredSchools}
            selectedSchoolId={selectedSchoolId}
            onSelectSchool={handleSelectSchool}
          />
        </div>

        {/* School Cards Stream */}
        <div className="space-y-4">
          {filteredSchools.length === 0 ? (
            <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center my-6 shadow-sm">
              <AlertCircle className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                No schools match your active filters
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Try widening your commute distance, adjusting tuition limits, or clearing district selections.
              </p>
              <button
                onClick={() =>
                  setFilters({
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
                  })
                }
                className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredSchools.map((school) => (
              <SchoolCard
                key={school.id}
                school={school}
                isSelected={school.id === selectedSchoolId}
                isCompared={comparedSchoolIds.includes(school.id)}
                onToggleCompare={handleToggleCompare}
                onSelect={(s) => setSelectedSchoolId(s.id)}
                onOpenSchoolPage={handleOpenSchoolPage}
                onEditSchool={handleOpenEditModal}
                onOpenEvaluation={handleOpenEvaluation}
                onAddRental={handleAddRental}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedSchools={comparedSchools}
        allSchools={schools}
        onRemoveFromCompare={(id) =>
          setComparedSchoolIds(comparedSchoolIds.filter((cid) => cid !== id))
        }
        onAddToCompare={(id) => {
          if (!comparedSchoolIds.includes(id)) {
            setComparedSchoolIds([...comparedSchoolIds, id]);
          }
        }}
        onSelectSchool={(id) => {
          setIsCompareOpen(false);
          handleOpenSchoolPage(id);
        }}
      />

      <SchoolDatabaseModal
        isOpen={isDatabaseOpen}
        onClose={() => setIsDatabaseOpen(false)}
        schools={schools}
        onUpdateSchool={handleSaveSchool}
        onAddNewSchool={handleAddNewSchool}
        onDeleteSchool={handleDeleteSchool}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onResetDefaults={handleResetDefaults}
      />

      <EditSchoolModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSchool(null);
        }}
        school={editingSchool}
        onSave={handleSaveSchool}
      />

      <TourCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        schools={schools}
        onSelectSchool={(id) => {
          setIsCalendarOpen(false);
          handleOpenSchoolPage(id);
        }}
      />

      {/* Rubric Evaluation Modal for Aiden or Dad */}
      {evaluatingSchool && (
        <RubricEvaluationModal
          isOpen={isEvaluationModalOpen}
          onClose={() => {
            setIsEvaluationModalOpen(false);
            setEvaluatingSchool(null);
          }}
          school={evaluatingSchool}
          evaluator={evaluatorType}
          onSave={handleSaveRubricEvaluation}
        />
      )}
    </div>
  );
}
