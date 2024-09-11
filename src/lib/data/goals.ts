import type { AstroGlobal } from 'astro';
import axios from 'axios';
import { goalsArraySchema, type Goal } from '../schemas/data/goalsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchGoals = withDataFetching(getWpData)(
  '/goals',
  goalsArraySchema,
);

export const getGoals = async (astro: AstroGlobal) =>
  axios
    .get<Goal[]>('/api/goals', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data);

// export const goals = (await fetchGoals()).sort((a, b) => a.order - b.order);
