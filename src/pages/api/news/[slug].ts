import { fetchNews } from '@/lib/data/news';
import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(null, { status: 404 });
  }

  const item = (
    await fetchNews().then(news => news.filter(n => n.slug === slug))
  ).at(0);
  if (!item) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(item), { status: 200 });
};
