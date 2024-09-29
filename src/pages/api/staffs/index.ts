import { fetchStaffs } from '@/lib/data/staffs';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const data = await fetchStaffs();
  return new Response(JSON.stringify(data), { status: 200 });
};
