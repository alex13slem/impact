import { staffsPositionArraySchema } from '../schemas/data/staffsPositions';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchStaffsPositions = withDataFetching(getWpData)(
  '/staff-positions',
  staffsPositionArraySchema,
);

export const staffsPositions = (await fetchStaffsPositions()).sort(
  (a, b) => a.order - b.order,
);
