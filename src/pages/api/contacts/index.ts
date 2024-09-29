import { fetchContacts } from '@/lib/data/contacts';
import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await fetchContacts();
  return new Response(JSON.stringify(data), { status: 200 });
};
