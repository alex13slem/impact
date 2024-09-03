import {
  charityProgramsArraySchema,
  charityProgramsSchema,
} from '../schemas/data/charityProgramsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchCharityPrograms = withDataFetching(getWpData)(
  '/charity-programs',
  charityProgramsArraySchema,
);

export const fetchCharityProgramById = (id: number) =>
  withDataFetching(getWpData)(
    `/charity-programs/${id}`,
    charityProgramsSchema.omit({ id: true }),
  );

export const charityPrograms = (await fetchCharityPrograms()).sort(
  (a, b) => a.order - b.order,
);
