export const prerender = false;

import { fetchCharityPrograms } from '@/lib/data/charityPrograms';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(null, { status: 404 });
  }

  const item = (
    await fetchCharityPrograms().then(charityPrograms => {
      return charityPrograms.filter(
        charityProgram => charityProgram.slug === slug,
      );
    })
  ).at(0);

  if (!item) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(item), { status: 200 });
};
