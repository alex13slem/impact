import { derived } from 'svelte/store';
import type { NeedyWithCoordinates } from '../data/needys';
import { needysCoordinates } from './needysStore';
import { filterSocialProgram } from './socialProgramStore';

export const filteredNeedysCoordinates = derived(
  [needysCoordinates, filterSocialProgram],
  ([$needysCoordinates, $filterSocialProgram]) => {
    return $needysCoordinates.filter(
      (needy: NeedyWithCoordinates) =>
        !$filterSocialProgram ||
        needy.socialProgramSlug === $filterSocialProgram,
    );
  },
);
