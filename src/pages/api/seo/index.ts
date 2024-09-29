import { fetchSiteSeo } from '@/lib/data/siteSeo';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = await fetchSiteSeo();
  return new Response(JSON.stringify(data), { status: 200 });
};
