import { fetchStaffsPositions } from '@/lib/data/staffsPositions';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = (await fetchStaffsPositions()).sort((a, b) => a.order - b.order);
  return new Response(JSON.stringify(data), { status: 200 });
};
