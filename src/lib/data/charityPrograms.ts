import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  charityProgramsArraySchema,
  charityProgramsSchema,
  type CharityProgram,
} from '../schemas/data/charityProgramsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchCharityPrograms = withDataFetching(getWpData)(
  '/charity-programs',
  charityProgramsArraySchema,
);

export const fetchCharityProgramById = (id: number) =>
  withDataFetching(getWpData)(
    `/charity-programs/${id}`,
    charityProgramsSchema.omit({ id: true }),
  );

export const getCharityPrograms = async (astro: AstroGlobal) =>
  await axios
    .get<CharityProgram[]>('/api/charity-programs', {
      baseURL: astro.url!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getCharityPrograms');
    });

export const getCharityProgramBySlug = async (
  astro: AstroGlobal,
  slug: string,
) =>
  await axios
    .get<CharityProgram>(`/api/charity-programs/${slug}`, {
      baseURL: astro.url!.origin,
      headers: {
        Accept: 'application/json',
      },
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error(e);
    });
