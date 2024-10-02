import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  regionsArraySchema,
  regionsSchema,
  type Region,
} from '../schemas/data/regionsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';

export const fetchRegions = withDataFetching(getWpData)(
  '/regions',
  regionsArraySchema,
);

export const fetchRegionsWithRelations = async () => {
  const regions = await fetchRegions();

  return Promise.all(
    regions.map(async region => {
      const mapDescription = await Promise.all(
        region.mapDescription.map(async item => {
          // Один вызов функции для получения charityProgram
          const charityProgram = await fetchCharityProgramById(
            item.charityProgramId,
          )();
          return { ...item, charityProgram };
        }),
      );
      return { ...region, mapDescription };
    }),
  );
};

export const fetchRegionById = (id: number) =>
  withDataFetching(getWpData)(
    `/regions/${id}`,
    regionsSchema.omit({ id: true }),
  );

export const getRegions = async (astro: AstroGlobal) =>
  axios
    .get<Region[]>('/api/regions', {
      baseURL: astro.url!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getRegions');
    });

export type RegionWithRelations = Awaited<
  ReturnType<typeof fetchRegionsWithRelations>
>[number];
