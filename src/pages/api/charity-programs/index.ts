import { fetchCharityPrograms } from '@/lib/data/charityPrograms';
import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await fetchCharityPrograms();
  return new Response(JSON.stringify(data), { status: 200 });
};
