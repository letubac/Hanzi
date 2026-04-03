export interface SM2Result {
  repetitions: number;
  interval: number;
  ease_factor: number;
  next_review: string;
}

export function sm2(
  quality: number,
  repetitions: number,
  interval: number,
  easeFactor: number
): SM2Result {
  let newRepetitions = repetitions;
  let newInterval = interval;
  let newEaseFactor = easeFactor;

  if (quality >= 3) {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    newRepetitions = 0;
    newInterval = 1;
  }

  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    repetitions: newRepetitions,
    interval: newInterval,
    ease_factor: Math.round(newEaseFactor * 100) / 100,
    next_review: nextReview.toISOString(),
  };
}

export const QUALITY_LABELS = {
  0: 'Again',
  1: 'Hard',
  3: 'Good',
  5: 'Easy',
} as const;
