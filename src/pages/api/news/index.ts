import { fetchNews, fetchRelatedDataForNews } from '@/lib/data/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const news = (await fetchNews())
    .filter(n => !n.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const data = await Promise.all(news.map(fetchRelatedDataForNews));
  return new Response(JSON.stringify(data), { status: 200 });
};
