import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  siteSeoArraySchema,
  type SiteSeo,
} from '../schemas/data/siteSeoSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchSiteSeo = withDataFetching(getWpData)(
  '/seo',
  siteSeoArraySchema,
);

export const getSiteSeo = (astro: AstroGlobal) =>
  axios
    .get<SiteSeo[]>('/api/seo', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data);
