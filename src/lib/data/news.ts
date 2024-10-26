import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  newsArraySchema,
  newsSchema,
  type NewsItem,
} from '../schemas/data/newsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchRegionById } from './regions';
import { fetchWardById } from './wards';

export const fetchNews = withDataFetching(getWpData)('/news', newsArraySchema);

// export const fetchRelatedDataForNews = async (news: NewsItem) => {
//   const [charityProgram, region, ward] = await Promise.all([
//     fetchCharityProgramById(news.charityProgramId)(),
//     fetchRegionById(news.regionId)(),
//     typeof news.wardId === 'number' && news.wardId !== 0
//       ? fetchWardById(news.wardId)()
//       : undefined,
//   ]);

//   return {
//     ...news,
//     charityProgram,
//     region,
//     ward,
//   };
// };

export const fetchRelatedDataForNews = async (news: NewsItem) => {
  const charityProgram = await fetchCharityProgramById(news.charityProgramId)();
  const region = await fetchRegionById(news.regionId)();
  const ward =
    typeof news.wardId === 'number' && news.wardId !== 0
      ? await fetchWardById(news.wardId)()
      : undefined;

  return {
    ...news,
    charityProgram,
    region,
    ward,
  };
};

export const fetchPublishedNews = async () => {
  const newsItems = await fetchNews();
  return newsItems.filter(newsItem => !newsItem.draft);
};

// export const fetchNewsWithRelatedData = async () => {
//   const newsItems = await fetchPublishedNews();
//   return Promise.all(newsItems.map(fetchRelatedDataForNews));
// };

export const fetchNewsWithRelatedData = async () => {
  const newsItems = await fetchPublishedNews();
  const results = [];
  for (const newsItem of newsItems) {
    results.push(await fetchRelatedDataForNews(newsItem));
  }
  return results;
};

export const fetchNewsWithRelatedById = async (id: number) => {
  const news = await withDataFetching(getWpData)(
    `/news/${id}`,
    newsSchema.omit({ id: true }),
  )();
  return fetchRelatedDataForNews({ ...news, id });
};
// export const fetchNewsByIds = async (ids: number[]) => {
//   return await Promise.all(ids.map(fetchNewsWithRelatedById));
// };

export const fetchNewsByIds = async (ids: number[]) => {
  const results = [];
  for (const id of ids) {
    results.push(await fetchNewsWithRelatedById(id));
  }
  return results;
};

export const getLastNews = (news: NewsItem[], num = 5) => news.slice(0, num);

export const getNews = async (astro: AstroGlobal, showDraft = false) =>
  axios
    .get<NewsItemWithRelated[]>('/api/news', {
      baseURL: astro.url!.origin,
      params: {
        'show-draft': showDraft ? 'true' : undefined,
      },
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getNews');
    });

export const getNewsItemBySlug = async (astro: AstroGlobal, slug: string) =>
  axios
    .get<NewsItemWithRelated>(`/api/news/${slug}`, {
      baseURL: astro.url!.origin,
      headers: {
        Accept: 'application/json',
      },
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getNewsItemBySlug');
    });

export type NewsItemWithRelated = Awaited<
  ReturnType<typeof fetchNewsWithRelatedById>
>;
