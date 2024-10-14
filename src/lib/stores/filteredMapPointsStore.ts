import { derived } from 'svelte/store';
import type { PointWithCoordinates } from '../data/mapNews';
import { filterCharityProgram } from './charityProgramsStore';
import { pointsCoordinates } from './wardsStore';

export const filteredMapPointsCoordinates = derived(
  [pointsCoordinates, filterCharityProgram],
  ([$pointsCoordinates, $filterCharityProgram]) =>
    $pointsCoordinates.filter(
      (point: PointWithCoordinates) =>
        !$filterCharityProgram ||
        point.region.mapDescription[0].charityProgram.slug ===
          $filterCharityProgram,
    ),
);
