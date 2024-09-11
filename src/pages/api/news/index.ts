import { fetchNews, fetchRelatedDataForNews } from '@/lib/data/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const showDraft = searchParams.get('show-draft');

  const news = await fetchNews().then(news => {
    if (showDraft === 'true') return news;
    return news.filter(n => !n.draft);
  });

  const data = await Promise.all(news.map(fetchRelatedDataForNews));
  return new Response(JSON.stringify(data), { status: 200 });
};
