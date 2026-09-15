import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateWork, formatDuration } from '../src/calculator.js';

test('calculates the documented default scenario', () => {
  assert.deepEqual(calculateWork({
    communities: 30,
    posts: 20,
    screenshotsPerPost: 1,
    manualMinutesPerScreenshot: 2,
    setupMinutes: 10,
  }), {
    placements: 600,
    screenshots: 600,
    manualMinutes: 1200,
    setupMinutes: 10,
    difference: 1190,
  });
});

test('uses safe defaults for empty values and clamps large values', () => {
  const result = calculateWork({
    communities: '',
    posts: 5000,
    screenshotsPerPost: 0,
    manualMinutesPerScreenshot: 'not-a-number',
    setupMinutes: 500,
  });
  assert.equal(result.placements, 1000);
  assert.equal(result.screenshots, 1000);
  assert.equal(result.manualMinutes, 2000);
  assert.equal(result.setupMinutes, 240);
  assert.equal(result.difference, 1760);
});

test('formats durations in clear Russian units', () => {
  assert.equal(formatDuration(50), '50 мин');
  assert.equal(formatDuration(60), '1 ч');
  assert.equal(formatDuration(1190), '19 ч 50 мин');
});
