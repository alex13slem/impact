import { fetchPartnersWithRelatedData } from '@/lib/data/partners';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await fetchPartnersWithRelatedData();
  return new Response(JSON.stringify(data), { status: 200 });
};
