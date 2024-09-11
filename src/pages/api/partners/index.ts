import { fetchPartnersWithRelatedData } from '@/lib/data/partners';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) {
    return new Response('No id provided', { status: 400 });
  }

  const data = await fetchPartnersWithRelatedData();

  return new Response(JSON.stringify(data), { status: 200 });
};
