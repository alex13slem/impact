import { derived } from 'svelte/store';
import type { PointWithCoordinates } from '../data/mapNews';
import { filterCharityProgram } from './charityProgramsStore';
import { pointsCoordinates } from './wardsStore';

export const filteredWardsCoordinates = derived(
  [pointsCoordinates, filterCharityProgram],
  ([$pointsCoordinates, $filterCharityProgram]) => {
    return $pointsCoordinates.filter(
      (point: PointWithCoordinates) =>
        !$filterCharityProgram ||
        point.charityProgramSlug === $filterCharityProgram,
    );
  },
);
