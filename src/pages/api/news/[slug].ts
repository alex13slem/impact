import { fetchNews, fetchRelatedDataForNews } from '@/lib/data/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  if (!slug) {
    return new Response('No slug provided', { status: 400 });
  }
  const news = (await fetchNews())
    .filter(n => !n.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const newsWithRelated = await Promise.all(news.map(fetchRelatedDataForNews));
  const data = newsWithRelated.find(item => item.slug === slug);
  if (!data) {
    return new Response('Not found', { status: 404 });
  }

  console.log(data);

  return new Response(JSON.stringify(data), { status: 200 });
};
