import { paymentSchema } from '../schemas/data/paymentSchema';
import { getWpSingularData, withDataFetching } from '../utils/wp';

export const fetchPaymentData = withDataFetching(getWpSingularData)(
  'payment',
  paymentSchema,
);

export const paymentData = await fetchPaymentData();
