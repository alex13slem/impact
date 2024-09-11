import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  regionsArraySchema,
  regionsSchema,
  type Region,
} from '../schemas/data/regionsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchRegions = withDataFetching(getWpData)(
  '/regions',
  regionsArraySchema,
);

export const fetchRegionById = (id: number) =>
  withDataFetching(getWpData)(
    `/regions/${id}`,
    regionsSchema.omit({ id: true }),
  );

export const getRegions = async (astro: AstroGlobal) =>
  axios
    .get<Region[]>('/api/regions', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data);
