import { fetchPaymentData } from '@/lib/data/payment';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await fetchPaymentData();
  return new Response(JSON.stringify(data), { status: 200 });
};
