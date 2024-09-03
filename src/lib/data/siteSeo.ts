import { siteSeoArraySchema } from '../schemas/data/siteSeoSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchSiteSeo = withDataFetching(getWpData)(
  '/seo',
  siteSeoArraySchema,
);

export const siteSeo = await fetchSiteSeo();
