import { derived } from 'svelte/store';
import type { WardWithCoordinates } from '../schemas/data/wardsSchema';
import { filterCharityProgram } from './charityProgramsStore';
import { wardsCoordinates } from './wardsStore';

export const filteredWardsCoordinates = derived(
  [wardsCoordinates, filterCharityProgram],
  ([$wardsCoordinates, $filterCharityProgram]) => {
    return $wardsCoordinates.filter(
      (ward: WardWithCoordinates) =>
        !$filterCharityProgram ||
        ward.charityProgram.slug === $filterCharityProgram,
    );
  },
);
