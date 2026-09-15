import { calculatorDefaults, calculatorLimits } from './content/site-content.js';

export function clampNumber(value, [min, max], fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

export function formatNumber(value) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(value);
}

export function formatDuration(minutes) {
  const rounded = Math.max(0, Math.round(minutes));
  const hours = Math.floor(rounded / 60);
  const mins = rounded % 60;
  if (!hours) return `${mins} мин`;
  if (!mins) return `${hours} ч`;
  return `${hours} ч ${mins} мин`;
}

export function calculateWork(values) {
  const communities = clampNumber(values.communities, calculatorLimits.communities, calculatorDefaults.communities);
  const posts = clampNumber(values.posts, calculatorLimits.posts, calculatorDefaults.posts);
  const screenshotsPerPost = clampNumber(values.screenshotsPerPost, calculatorLimits.screenshotsPerPost, calculatorDefaults.screenshotsPerPost);
  const manualMinutesPerScreenshot = clampNumber(values.manualMinutesPerScreenshot, calculatorLimits.manualMinutesPerScreenshot, calculatorDefaults.manualMinutesPerScreenshot);
  const setupMinutes = clampNumber(values.setupMinutes, calculatorLimits.setupMinutes, calculatorDefaults.setupMinutes);
  const placements = communities * posts;
  const screenshots = placements * screenshotsPerPost;
  const manualMinutes = screenshots * manualMinutesPerScreenshot;
  return { placements, screenshots, manualMinutes, setupMinutes, difference: Math.max(0, manualMinutes - setupMinutes) };
}
