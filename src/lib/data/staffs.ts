import type { AstroGlobal } from 'astro';
import axios from 'axios';
import { staffsArraySchema, type Staff } from '../schemas/data/staffsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchStaffs = withDataFetching(getWpData)(
  '/staff',
  staffsArraySchema,
);

export const getStaffs = (astro: AstroGlobal) =>
  axios
    .get<Staff[]>('/api/staffs', {
      baseURL: astro.url.origin,
    })
    .then(res => res.data);
