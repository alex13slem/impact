import { fetchOurMissionSlides } from '@/lib/data/ourMissionSlides';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = (await fetchOurMissionSlides()).sort(
    (a, b) => a.order - b.order,
  );

  return new Response(JSON.stringify(data), { status: 200 });
};
