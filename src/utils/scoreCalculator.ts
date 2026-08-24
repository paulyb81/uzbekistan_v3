import { CategoryScores, EvaluatorScoreBreakdown, RUBRIC_DIMENSIONS, School } from '../types';

export const DEFAULT_SCHOOL_BASELINES: Record<string, CategoryScores> = {
  'jls-middle': { academics: 9.0, athletics: 9.0, community: 9.5, facilities: 9.0, logistics: 9.5, extracurriculars: 9.0 },
  'blach-intermediate': { academics: 9.2, athletics: 8.5, community: 9.5, facilities: 9.0, logistics: 9.5, extracurriculars: 9.0 },
  'sunnyvale-middle': { academics: 8.5, athletics: 9.0, community: 9.5, facilities: 9.0, logistics: 10.0, extracurriculars: 8.5 },
  'graham-middle': { academics: 8.8, athletics: 8.5, community: 9.0, facilities: 9.0, logistics: 9.5, extracurriculars: 8.5 },
  'egan-junior': { academics: 9.0, athletics: 8.5, community: 9.5, facilities: 8.5, logistics: 9.0, extracurriculars: 8.5 },
  'fletcher-middle': { academics: 9.0, athletics: 8.5, community: 9.5, facilities: 9.0, logistics: 9.5, extracurriculars: 9.0 },
  'menlo-school': { academics: 9.0, athletics: 9.5, community: 8.0, facilities: 9.5, logistics: 9.0, extracurriculars: 9.5 },
  'pinewood-school': { academics: 9.0, athletics: 8.5, community: 9.5, facilities: 8.5, logistics: 9.0, extracurriculars: 9.0 },
  'sacred-heart-schools': { academics: 8.5, athletics: 9.5, community: 9.0, facilities: 9.5, logistics: 8.5, extracurriculars: 9.5 },
  'castilleja-school': { academics: 9.8, athletics: 8.0, community: 9.0, facilities: 9.0, logistics: 9.0, extracurriculars: 9.5 },
  'woodside-priory': { academics: 9.0, athletics: 9.0, community: 9.5, facilities: 9.0, logistics: 7.5, extracurriculars: 9.5 },
  'harker-middle': { academics: 9.8, athletics: 8.0, community: 8.5, facilities: 9.5, logistics: 8.5, extracurriculars: 9.5 },
  'hillview-middle': { academics: 9.0, athletics: 8.5, community: 9.5, facilities: 9.0, logistics: 9.5, extracurriculars: 9.0 },
};

/**
 * Gets the pristine, immutable baseline category scores for a school.
 */
export function getBaseCategoryScores(school: School): CategoryScores {
  if (school.baseCategoryScores) {
    return { ...school.baseCategoryScores };
  }
  if (DEFAULT_SCHOOL_BASELINES[school.id]) {
    return { ...DEFAULT_SCHOOL_BASELINES[school.id] };
  }
  if (school.categoryScores) {
    return { ...school.categoryScores };
  }
  return {
    academics: 9.0,
    athletics: 9.0,
    community: 9.5,
    facilities: 9.0,
    logistics: 9.5,
    extracurriculars: 9.0,
  };
}

/**
 * Calculates weighted score for a single evaluator breakdown given their 6 category ratings.
 * Scale: 0.0 - 10.0
 */
export function calculateWeightedEvaluatorScore(scores: CategoryScores): number {
  let weightedSum = 0;
  let totalWeight = 0;

  RUBRIC_DIMENSIONS.forEach((dim) => {
    const scoreVal = scores[dim.key] ?? 0;
    weightedSum += scoreVal * dim.weight;
    totalWeight += dim.weight;
  });

  if (totalWeight === 0) return 0;
  const finalScore = weightedSum / totalWeight;
  return Math.round(finalScore * 100) / 100;
}

/**
 * Computes averaged category scores between Aiden and Dad.
 * Uses baseCategoryScores for an evaluator if they haven't submitted a rubric evaluation yet.
 */
export function calculateAveragedCategoryScores(
  aidenEvaluation?: EvaluatorScoreBreakdown,
  dadEvaluation?: EvaluatorScoreBreakdown,
  fallbackBaseline?: CategoryScores
): CategoryScores {
  const defaultBaseline: CategoryScores = fallbackBaseline ?? {
    academics: 9.0,
    athletics: 9.0,
    community: 9.5,
    facilities: 9.0,
    logistics: 9.5,
    extracurriculars: 9.0,
  };

  const aidenScores = aidenEvaluation?.scores ?? defaultBaseline;
  const dadScores = dadEvaluation?.scores ?? defaultBaseline;

  const result: CategoryScores = {
    academics: 9.0,
    athletics: 9.0,
    community: 9.5,
    facilities: 9.0,
    logistics: 9.5,
    extracurriculars: 9.0,
  };

  RUBRIC_DIMENSIONS.forEach((dim) => {
    const aVal = aidenScores[dim.key] ?? defaultBaseline[dim.key] ?? 9.0;
    const dVal = dadScores[dim.key] ?? defaultBaseline[dim.key] ?? 9.0;
    result[dim.key] = Math.round(((aVal + dVal) / 2) * 10) / 10;
  });

  return result;
}

/**
 * Computes the overall composite family score, category breakdown, and evaluator scores.
 * Composite score = average of Aiden's composite score and Dad's composite score.
 */
export function calculateCompositeScores(
  aidenEvaluation?: EvaluatorScoreBreakdown,
  dadEvaluation?: EvaluatorScoreBreakdown,
  fallbackBaseline?: CategoryScores
): {
  familyScore: number;
  unweightedScore: number;
  categoryScores: CategoryScores;
  aidenScore: number;
  dadScore: number;
} {
  const defaultBaseline: CategoryScores = fallbackBaseline ?? {
    academics: 9.0,
    athletics: 9.0,
    community: 9.5,
    facilities: 9.0,
    logistics: 9.5,
    extracurriculars: 9.0,
  };

  const categoryScores = calculateAveragedCategoryScores(aidenEvaluation, dadEvaluation, defaultBaseline);

  // Compute Aiden's weighted score
  const aidenScores = aidenEvaluation?.scores ?? defaultBaseline;
  const aidenScore = aidenEvaluation?.overallScore ?? calculateWeightedEvaluatorScore(aidenScores);

  // Compute Dad's weighted score
  const dadScores = dadEvaluation?.scores ?? defaultBaseline;
  const dadScore = dadEvaluation?.overallScore ?? calculateWeightedEvaluatorScore(dadScores);

  // Composite is average of Aiden and Dad
  const familyScore = Math.round(((aidenScore + dadScore) / 2) * 100) / 100;

  // Unweighted average is simple mean of the 6 averaged category scores
  const allCategoryVals = Object.values(categoryScores);
  const unweightedSum = allCategoryVals.reduce((acc, val) => acc + val, 0);
  const unweightedScore = Math.round((unweightedSum / allCategoryVals.length) * 100) / 100;

  return {
    familyScore,
    unweightedScore,
    categoryScores,
    aidenScore,
    dadScore,
  };
}

/**
 * Helper to ensure a school has both Aiden & Dad evaluations initialized with default CSV scores
 */
export function getOrCreateEvaluatorData(
  school: School,
  evaluator: 'Aiden' | 'Dad'
): EvaluatorScoreBreakdown {
  if (evaluator === 'Aiden' && school.aidenEvaluation) {
    return {
      ...school.aidenEvaluation,
      scores: { ...school.aidenEvaluation.scores },
      notes: { ...school.aidenEvaluation.notes },
    };
  }
  if (evaluator === 'Dad' && school.dadEvaluation) {
    return {
      ...school.dadEvaluation,
      scores: { ...school.dadEvaluation.scores },
      notes: { ...school.dadEvaluation.notes },
    };
  }

  // Default seed using the school's immutable baseline category scores
  const baseline = getBaseCategoryScores(school);
  const initialScores: CategoryScores = {
    academics: baseline.academics ?? 9.0,
    athletics: baseline.athletics ?? 9.0,
    community: baseline.community ?? 9.5,
    facilities: baseline.facilities ?? 9.0,
    logistics: baseline.logistics ?? 9.5,
    extracurriculars: baseline.extracurriculars ?? 9.0,
  };

  const calculatedOverall = calculateWeightedEvaluatorScore(initialScores);

  return {
    evaluator,
    scores: initialScores,
    notes: {},
    overallNotes: evaluator === 'Aiden' ? (school.aidenNotes || '') : (school.dadNotes || ''),
    overallScore: calculatedOverall,
  };
}
