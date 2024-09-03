import {
  regionsArraySchema,
  regionsSchema,
} from '../schemas/data/regionsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchRegions = withDataFetching(getWpData)(
  '/regions',
  regionsArraySchema,
);

export const regions = await fetchRegions();

export const fetchRegionById = (id: number) =>
  withDataFetching(getWpData)(
    `/regions/${id}`,
    regionsSchema.omit({ id: true }),
  );
