import { fetchWardsWithRelatedData } from '@/lib/data/wards';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const charityProgram = searchParams.get('charity-program');
  const data = await fetchWardsWithRelatedData().then(wards => {
    if (charityProgram) {
      return wards.filter(ward => ward.charityProgram.slug === charityProgram);
    }
    return wards;
  });
  return new Response(JSON.stringify(data), { status: 200 });
};
