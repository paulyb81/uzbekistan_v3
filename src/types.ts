export interface CategoryScores {
  academics: number; // Academic Fit & Scaffolding (Weight: 22.5%)
  athletics: number; // Athletics & Physical Balance (Weight: 20.0%)
  community: number; // School Culture & Community (Weight: 20.0%)
  facilities: number; // Middle School Environment & Facilities (Weight: 15.0%)
  logistics: number; // Logistics, Commute & Support (Weight: 12.5%)
  extracurriculars: number; // Extracurriculars & Outdoor Ed (Weight: 10.0%)
}

export type CategoryKey = keyof CategoryScores;

export interface RubricDimensionConfig {
  key: CategoryKey;
  label: string;
  weight: number;
  weightPercent: string;
  defaultLookFors: string;
}

export const RUBRIC_DIMENSIONS: RubricDimensionConfig[] = [
  {
    key: 'academics',
    label: 'Academic Fit & Scaffolding',
    weight: 0.225,
    weightPercent: '22.5%',
    defaultLookFors: 'Check math compaction (Algebra/Geometry), writing specialists, and homework load limits.',
  },
  {
    key: 'athletics',
    label: 'Athletics & Physical Balance',
    weight: 0.200,
    weightPercent: '20.0%',
    defaultLookFors: 'Check competitive soccer/track leagues, on-campus fields/gym, and daily movement time.',
  },
  {
    key: 'community',
    label: 'School Culture & Community',
    weight: 0.200,
    weightPercent: '20.0%',
    defaultLookFors: 'Observe phone ban policy enforcement, student wellbeing support, and neighborhood peer density.',
  },
  {
    key: 'facilities',
    label: 'Middle School Environment & Facilities',
    weight: 0.150,
    weightPercent: '15.0%',
    defaultLookFors: 'Tour dedicated middle school wings/quads, science/CSTEM labs, library, and dining commons.',
  },
  {
    key: 'logistics',
    label: 'Logistics, Commute & Support',
    weight: 0.125,
    weightPercent: '12.5%',
    defaultLookFors: 'Test drive time to Sunnyvale MP4, resident enrollment guarantee / tuition cost, and after-care.',
  },
  {
    key: 'extracurriculars',
    label: 'Extracurriculars & Outdoor Ed',
    weight: 0.100,
    weightPercent: '10.0%',
    defaultLookFors: 'Inquire about 6th-grade outdoor science camp, robotics/STEAM clubs, music, and electives.',
  },
];

export interface EvaluatorScoreBreakdown {
  evaluator: 'Aiden' | 'Dad';
  scores: CategoryScores;
  notes: {
    academics?: string;
    athletics?: string;
    community?: string;
    facilities?: string;
    logistics?: string;
    extracurriculars?: string;
  };
  overallNotes?: string;
  overallScore: number;
  lastUpdated?: string;
}

export interface TourDate {
  id: string;
  date: string; // e.g. "2026-10-14" or "Oct 14, 2026"
  time?: string; // e.g. "9:00 AM - 11:30 AM"
  type:
    | 'Campus Tour'
    | 'Open House'
    | 'Student Shadow'
    | 'Virtual Info Session'
    | 'Principal Q&A'
    | 'Parent Info Night'
    | 'District Event'
    | 'District Deadline'
    | 'Orientation';
  status: 'Upcoming' | 'Completed' | 'Registration Open' | 'Waitlist';
  notes?: string;
  registrationLink?: string;
}

export interface RentalCandidate {
  id: string;
  address: string;
  city: string;
  neighborhood?: string;
  price: number;
  priceDisplay: string;
  beds: number;
  baths: number;
  sqft: number;
  commuteMin: number;
  yardRating: 'A+ Yard' | 'A Yard' | 'B+ Yard' | 'B Yard' | 'C Yard';
  zillowUrl: string;
  notes?: string;
}

export interface GreatSchoolsData {
  summaryRating: number; // 1-10 rating
  testScoresRating: number; // 1-10
  studentProgressRating: number; // 1-10
  equityRating?: number; // 1-10
  mathProficiency: number; // e.g. 88 (88% proficient)
  englishProficiency: number; // e.g. 89 (89% proficient)
  scienceProficiency: number; // e.g. 78 (78% proficient)
  stateMathAvg: number; // e.g. 35
  stateEnglishAvg: number; // e.g. 47
  stateScienceAvg: number; // e.g. 30
  teachersWith3PlusYears: number; // e.g. 96 (%)
  teacherRatioStateAvg?: string;
  sourceUrl: string;
  lastUpdated?: string;
}

export interface SchoolPhoto {
  url: string;
  title: string;
  caption?: string;
  category?: 'Campus' | 'Athletics' | 'STEM & Labs' | 'Classrooms' | 'Facilities';
}

export interface DimensionPriorityAnalysis {
  dimensionKey: CategoryKey;
  dimensionName: string;
  schoolReality: string;
  dadPerspective: {
    priority: string;
    verdict: 'Strong Fit' | 'Good Fit' | 'Moderate Fit' | 'Needs Attention';
    analysis: string;
  };
  aidenPerspective: {
    interest: string;
    verdict: 'Loves It' | 'Excited' | 'Neutral' | 'Needs Support';
    analysis: string;
  };
  tourQuestions: string[];
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  type: 'Public' | 'Private';
  district: string; // e.g., 'PAUSD', 'LASD', 'SSD', 'MPCSD', 'MVWSD', 'LLESD', 'CUSD', 'Private'
  city: string;
  locationDetails: string;
  address: string;
  lat: number;
  lng: number;
  commuteToMP4Min: number;
  commuteSummary: string;
  gradeSpan: string;
  tuition: number;
  tuitionDisplay: string;
  unweightedScore: number;
  familyScore: number;
  // Aiden Evaluation
  aidenScore: number; // 0 if not visited yet, or calculated 0-10
  aidenNotes: string;
  aidenEvaluation?: EvaluatorScoreBreakdown;
  // Dad Evaluation
  dadScore?: number;
  dadNotes?: string;
  dadEvaluation?: EvaluatorScoreBreakdown;
  studentCount: number;
  studentTeacherRatio: string;
  imageUrl: string;
  photoGallery?: SchoolPhoto[];
  greatSchools?: GreatSchoolsData;
  categoryScores: CategoryScores;
  baseCategoryScores?: CategoryScores;
  academicFocus: string[];
  extracurriculars: string[];
  topStrengths: string;
  considerations: string;
  status: 'To Research' | 'Tour Booked' | 'Visited' | 'Application in Progress' | 'Applied' | 'Accepted';
  tourDates: TourDate[];
  admissionDeadline: string;
  financialAidDeadline?: string;
  targetResidentialZone: string;
  housingCandidates: RentalCandidate[];
  customNotes?: string;
  isFavorite?: boolean;
  websiteUrl?: string;
  greatSchoolsUrl?: string;
}

export type FilterDistrict = 'All' | 'PAUSD' | 'LASD' | 'SSD' | 'MPCSD' | 'MVWSD' | 'LLESD' | 'Private';

export interface FilterState {
  searchQuery: string;
  district: FilterDistrict;
  schoolType: 'All' | 'Public' | 'Private';
  academicFocus: string[];
  maxCommuteMin: number;
  maxTuition: number;
  minScore: number;
  tourStatus: 'All' | 'Has Upcoming Tours' | 'Registration Open';
  status: 'All' | 'To Research' | 'Tour Booked' | 'Visited' | 'Applied';
  sortBy: 'familyScore' | 'unweightedScore' | 'aidenScore' | 'commuteMin' | 'tuitionAsc' | 'name';
}
