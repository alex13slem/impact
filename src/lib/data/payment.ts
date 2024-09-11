import type { AstroGlobal } from 'astro';
import axios from 'axios';
import { paymentSchema, type Payment } from '../schemas/data/paymentSchema';
import { getWpSingularData, withDataFetching } from '../utils/wp';

export const fetchPaymentData = withDataFetching(getWpSingularData)(
  'payment',
  paymentSchema,
);

export const getPayment = async (astro: AstroGlobal) =>
  axios
    .get<Payment>('/api/payment', {
      baseURL: astro.site!.origin,
    })
    .then(res => res.data);
