import { fetchRegions } from '@/lib/data/regions';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = await fetchRegions();
  return new Response(JSON.stringify(data), { status: 200 });
};
