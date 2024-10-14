import type { AstroGlobal } from 'astro';
import axios from 'axios';
import { thanksArraySchema, type Thanks } from '../schemas/data/thanksSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchThanks = withDataFetching(getWpData)(
  '/thanks',
  thanksArraySchema,
);

export const getThanks = async (astro: AstroGlobal) =>
  await axios
    .get<Thanks[]>('/api/thanks', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getThanks');
    });
