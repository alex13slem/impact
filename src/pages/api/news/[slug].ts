import { newsWithRelated } from '@/lib/data/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  if (!slug) {
    return new Response('No slug provided', { status: 400 });
  }
  const data = newsWithRelated.find(item => item.slug === slug);
  if (!data) {
    return new Response('Not found', { status: 404 });
  }

  console.log(data);

  return new Response(JSON.stringify(data), { status: 200 });
};
