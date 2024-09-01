import { staffsArraySchema } from '../schemas/data/staffsSchema';
import { getWpData, withDataFetching } from '../utils/wp';

export const fetchStaffs = withDataFetching(getWpData)(
  '/staff',
  staffsArraySchema,
);

export const staffs = await fetchStaffs();
