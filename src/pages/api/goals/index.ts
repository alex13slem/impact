import { fetchGoals } from '@/lib/data/goals';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = (await fetchGoals()).sort((a, b) => a.order - b.order);
  return new Response(JSON.stringify(data), { status: 200 });
};
