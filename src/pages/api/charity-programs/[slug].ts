import { fetchCharityPrograms } from '@/lib/data/charityPrograms';
import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(null, { status: 404 });
  }

  const item = await fetchCharityPrograms().then(p =>
    p.find(p => p.slug === slug),
  );

  if (!item) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(item), { status: 200 });
};
