import { newsWithRelated } from '@/lib/data/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(newsWithRelated), { status: 200 });
};
