import { fetchDocs } from '@/lib/data/docs';
import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await fetchDocs();
  return new Response(JSON.stringify(data), { status: 200 });
};
