import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Save,
  Building,
  DollarSign,
  Star,
  MapPin,
  Calendar,
  Home,
  CheckCircle2
} from 'lucide-react';
import { School, TourDate, RentalCandidate } from '../types';

interface EditSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: School | null;
  onSave: (savedSchool: School) => void;
}

export const EditSchoolModal: React.FC<EditSchoolModalProps> = ({
  isOpen,
  onClose,
  school,
  onSave,
}) => {
  if (!isOpen) return null;

  const isCreating = !school;

  const [formData, setFormData] = useState<School>(
    school || {
      id: `school-${Date.now()}`,
      name: '',
      shortName: '',
      type: 'Public',
      district: 'PAUSD',
      city: 'Palo Alto',
      locationDetails: 'Palo Alto / ~12 min to MP4',
      address: '',
      lat: 37.42,
      lng: -122.13,
      commuteToMP4Min: 12,
      commuteSummary: '12 min drive to MP4 Sunnyvale workplace',
      gradeSpan: '6-8',
      tuition: 0,
      tuitionDisplay: '$0',
      unweightedScore: 9.0,
      familyScore: 9.0,
      aidenScore: 0,
      aidenNotes: '',
      studentCount: 700,
      studentTeacherRatio: '18:1',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      categoryScores: {
        academics: 9.2,
        athletics: 9.0,
        community: 9.0,
        facilities: 9.0,
        logistics: 9.0,
        extracurriculars: 9.0,
      },
      academicFocus: ['STEM / Robotics', 'Advanced Math'],
      extracurriculars: ['Robotics Club', 'Track & Field', 'Orchestra'],
      topStrengths: '',
      considerations: '',
      status: 'To Research',
      tourDates: [],
      admissionDeadline: 'Feb 15, 2027',
      targetResidentialZone: '',
      housingCandidates: [],
      customNotes: '',
      isFavorite: false,
    }
  );

  // New rental draft state
  const [newRentalAddress, setNewRentalAddress] = useState('');
  const [newRentalPrice, setNewRentalPrice] = useState(5200);
  const [newRentalBeds, setNewRentalBeds] = useState(3);
  const [newRentalBaths, setNewRentalBaths] = useState(2);
  const [newRentalSqft, setNewRentalSqft] = useState(1600);
  const [newRentalCommute, setNewRentalCommute] = useState(12);
  const [newRentalYard, setNewRentalYard] = useState<'A+ Yard' | 'A Yard' | 'B+ Yard' | 'B Yard'>('A Yard');

  // New tour draft state
  const [newTourDate, setNewTourDate] = useState('2026-11-15');
  const [newTourType, setNewTourType] = useState<'Campus Tour' | 'Open House' | 'Student Shadow'>('Campus Tour');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a School Name');
      return;
    }
    onSave({
      ...formData,
      baseCategoryScores: formData.baseCategoryScores ?? { ...formData.categoryScores },
    });
    onClose();
  };

  const handleAddRental = () => {
    if (!newRentalAddress.trim()) return;
    const newRental: RentalCandidate = {
      id: `h-${Date.now()}`,
      address: newRentalAddress,
      city: formData.city || 'Bay Area',
      price: newRentalPrice,
      priceDisplay: `$${newRentalPrice.toLocaleString()}/mo`,
      beds: newRentalBeds,
      baths: newRentalBaths,
      sqft: newRentalSqft,
      commuteMin: newRentalCommute,
      yardRating: newRentalYard,
      zillowUrl: `https://www.zillow.com/homes/${encodeURIComponent(newRentalAddress)}/`,
    };
    setFormData({
      ...formData,
      housingCandidates: [...formData.housingCandidates, newRental],
    });
    setNewRentalAddress('');
  };

  const handleRemoveRental = (rentalId: string) => {
    setFormData({
      ...formData,
      housingCandidates: formData.housingCandidates.filter((h) => h.id !== rentalId),
    });
  };

  const handleAddTourDate = () => {
    if (!newTourDate.trim()) return;
    const newTour: TourDate = {
      id: `t-${Date.now()}`,
      date: newTourDate,
      type: newTourType,
      status: 'Registration Open',
    };
    setFormData({
      ...formData,
      tourDates: [...formData.tourDates, newTour],
    });
  };

  const handleRemoveTourDate = (tourId: string) => {
    setFormData({
      ...formData,
      tourDates: formData.tourDates.filter((t) => t.id !== tourId),
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#101624] border border-slate-200 dark:border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80 shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span>{isCreating ? 'Add New School Profile' : `Edit: ${formData.name}`}</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Update scores, academic programs, tour dates, and matched housing candidates
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">School Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Jane Lathrop Stanford (JLS) Middle School"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">District / Network</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="e.g. PAUSD, LASD, SSD, MPCSD, Private"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Public' | 'Private' })}
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
              >
                <option value="Public">Public School</option>
                <option value="Private">Private Independent</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">City / Region</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. South Palo Alto, Los Altos"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Grade Span</label>
              <input
                type="text"
                value={formData.gradeSpan}
                onChange={(e) => setFormData({ ...formData, gradeSpan: e.target.value })}
                placeholder="e.g. 6-8, 7-8, K-12"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>
          </div>

          {/* Metrics & Scores */}
          <div className="p-4 bg-slate-50 dark:bg-[#0d131f] border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Scores, Commute & Tuition</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Family Weighted Score</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.familyScore}
                  onChange={(e) => setFormData({ ...formData, familyScore: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-emerald-600 dark:text-emerald-400 font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Aiden's Score (1-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.aidenScore}
                  onChange={(e) => setFormData({ ...formData, aidenScore: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-sky-600 dark:text-sky-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Commute to MP4 (min)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={formData.commuteToMP4Min}
                  onChange={(e) => setFormData({ ...formData, commuteToMP4Min: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Tuition Display</label>
                <input
                  type="text"
                  value={formData.tuitionDisplay}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({
                      ...formData,
                      tuitionDisplay: e.target.value,
                      tuition: parseInt(clean) || 0,
                    });
                  }}
                  placeholder="e.g. $0 or $67,792"
                  className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-amber-600 dark:text-amber-300 font-mono"
                />
              </div>
            </div>

            {/* Category breakdown inputs */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-slate-700 dark:text-slate-400 font-semibold block mb-2">Category Score Breakdown (1.0 - 10.0 scale):</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                <div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block uppercase" title="Academic Fit & Scaffolding">Academics</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.categoryScores?.academics ?? 9.0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryScores: { ...formData.categoryScores, academics: parseFloat(e.target.value) || 1 },
                      })
                    }
                    className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-sky-700 dark:text-sky-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block uppercase" title="Athletics & Physical Balance">Athletics</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.categoryScores?.athletics ?? 9.0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryScores: { ...formData.categoryScores, athletics: parseFloat(e.target.value) || 1 },
                      })
                    }
                    className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-sky-700 dark:text-sky-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block uppercase" title="School Culture & Community">Community</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.categoryScores?.community ?? 9.0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryScores: { ...formData.categoryScores, community: parseFloat(e.target.value) || 1 },
                      })
                    }
                    className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-sky-700 dark:text-sky-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block uppercase" title="Middle School Environment & Facilities">Facilities</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.categoryScores?.facilities ?? 9.0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryScores: { ...formData.categoryScores, facilities: parseFloat(e.target.value) || 1 },
                      })
                    }
                    className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-sky-700 dark:text-sky-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block uppercase" title="Logistics, Commute & Support">Logistics</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.categoryScores?.logistics ?? 9.0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryScores: { ...formData.categoryScores, logistics: parseFloat(e.target.value) || 1 },
                      })
                    }
                    className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-sky-700 dark:text-sky-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block uppercase" title="Extracurriculars & Outdoor Ed">Extracurricular</span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.categoryScores?.extracurriculars ?? 9.0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryScores: { ...formData.categoryScores, extracurriculars: parseFloat(e.target.value) || 1 },
                      })
                    }
                    className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-sky-700 dark:text-sky-300 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aiden's Notes & Impressions */}
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Aiden's Campus Impressions & Tour Notes</label>
            <textarea
              rows={2}
              value={formData.aidenNotes}
              onChange={(e) => setFormData({ ...formData, aidenNotes: e.target.value })}
              placeholder="e.g. Liked the makerspace, robotics arena, and large turf sports field. Wants to shadow in November."
              className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Strengths & Trade-offs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1 text-emerald-700 dark:text-emerald-400">
                Top Family Fit Strengths
              </label>
              <textarea
                rows={2}
                value={formData.topStrengths}
                onChange={(e) => setFormData({ ...formData, topStrengths: e.target.value })}
                placeholder="e.g. Top bikeable neighborhood, homework limits, 21-acre sports complex"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-amber-700 dark:text-amber-400">
                Key Considerations & Trade-Offs
              </label>
              <textarea
                rows={2}
                value={formData.considerations}
                onChange={(e) => setFormData({ ...formData, considerations: e.target.value })}
                placeholder="e.g. Public school class sizes, no direct high school matriculation"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Tour Dates & Deadlines */}
          <div className="p-4 bg-slate-50 dark:bg-[#0d131f] border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Tour Dates & Admission Deadlines</span>
              </h3>
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-400 block mb-1">Admission Deadline</label>
              <input
                type="text"
                value={formData.admissionDeadline}
                onChange={(e) => setFormData({ ...formData, admissionDeadline: e.target.value })}
                placeholder="e.g. PAUSD Open Enrollment: Feb 15, 2027"
                className="w-full bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* List of current tours */}
            <div className="space-y-2">
              {formData.tourDates.map((tour) => (
                <div
                  key={tour.id}
                  className="flex items-center justify-between bg-white dark:bg-[#0b0f17] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {tour.date} ({tour.type}) - <span className="text-emerald-600 dark:text-emerald-400">{tour.status}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTourDate(tour.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add tour date row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <input
                type="date"
                value={newTourDate}
                onChange={(e) => setNewTourDate(e.target.value)}
                className="bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              />
              <select
                value={newTourType}
                onChange={(e) => setNewTourType(e.target.value as any)}
                className="bg-white dark:bg-[#0b0f17] border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              >
                <option value="Campus Tour">Campus Tour</option>
                <option value="Open House">Open House</option>
                <option value="Student Shadow">Student Shadow</option>
                <option value="Parent Info Night">Parent Info Night</option>
                <option value="District Event">District Event</option>
                <option value="District Deadline">District Deadline</option>
                <option value="Orientation">Orientation</option>
              </select>
              <button
                type="button"
                onClick={handleAddTourDate}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tour
              </button>
            </div>
          </div>

          {/* Matched Rental Listings */}
          <div className="p-4 bg-slate-50 dark:bg-[#0d131f] border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Matched Rental Listings ({formData.housingCandidates.length})</span>
            </h3>

            {/* Existing rental items */}
            <div className="space-y-2">
              {formData.housingCandidates.map((rental) => (
                <div
                  key={rental.id}
                  className="flex items-center justify-between bg-white dark:bg-[#0b0f17] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{rental.address}</span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {rental.beds}bd/{rental.baths}ba | {rental.priceDisplay} | Commute: {rental.commuteMin}m MP4 | Yard: {rental.yardRating}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRental(rental.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new rental form */}
            <div className="p-3 bg-white dark:bg-[#0b0f17] rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="font-semibold text-slate-800 dark:text-slate-300">Add Housing Candidate:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Address (e.g. 4180 Byron St, Palo Alto)"
                  value={newRentalAddress}
                  onChange={(e) => setNewRentalAddress(e.target.value)}
                  className="sm:col-span-2 bg-slate-50 dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded p-2 text-slate-800 dark:text-slate-200"
                />
                <input
                  type="number"
                  placeholder="Monthly Rent ($)"
                  value={newRentalPrice}
                  onChange={(e) => setNewRentalPrice(parseInt(e.target.value) || 0)}
                  className="bg-slate-50 dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded p-2 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Beds</span>
                  <input
                    type="number"
                    value={newRentalBeds}
                    onChange={(e) => setNewRentalBeds(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Baths</span>
                  <input
                    type="number"
                    step="0.5"
                    value={newRentalBaths}
                    onChange={(e) => setNewRentalBaths(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-50 dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Commute MP4 (min)</span>
                  <input
                    type="number"
                    value={newRentalCommute}
                    onChange={(e) => setNewRentalCommute(parseInt(e.target.value) || 10)}
                    className="w-full bg-slate-50 dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Yard Rating</span>
                  <select
                    value={newRentalYard}
                    onChange={(e) => setNewRentalYard(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-[#121826] border border-slate-300 dark:border-slate-700 rounded p-1.5 text-slate-800 dark:text-slate-200"
                  >
                    <option value="A+ Yard">A+ Yard</option>
                    <option value="A Yard">A Yard</option>
                    <option value="B+ Yard">B+ Yard</option>
                    <option value="B Yard">B Yard</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddRental}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold flex items-center gap-1 shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Save Candidate to School
              </button>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isCreating ? 'Create School Profile' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
