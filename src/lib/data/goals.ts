import { goalsArraySchema } from '../schemas/data/goalsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchGoals = withDataFetching(getWpData)(
  '/goals',
  goalsArraySchema,
);

export const goals = (await fetchGoals()).sort((a, b) => a.order - b.order);
