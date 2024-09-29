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
      baseURL: astro.url!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getSiteSeo');
    });
