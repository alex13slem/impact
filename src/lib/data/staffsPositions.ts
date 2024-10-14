import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  staffsPositionArraySchema,
  type StaffsPosition,
} from '../schemas/data/staffsPositions';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchStaffsPositions = withDataFetching(getWpData)(
  '/staff-positions',
  staffsPositionArraySchema,
);

export const getStaffsPositions = (astro: AstroGlobal) =>
  axios
    .get<StaffsPosition[]>('/api/staff-positions', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getStaffsPositions');
    });

// export const staffsPositions = (await fetchStaffsPositions()).sort(
//   (a, b) => a.order - b.order,
// );
