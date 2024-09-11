import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  newsArraySchema,
  newsSchema,
  type NewsItem,
  type NewsItemWithRelated,
} from '../schemas/data/newsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchRegionById } from './regions';
import { fetchWardById } from './wards';

export const fetchNews = withDataFetching(getWpData)('/news', newsArraySchema);

export const fetchRelatedDataForNews = async (news: NewsItem) => {
  const [charityProgram, region, ward] = await Promise.all([
    fetchCharityProgramById(news.charityProgramId)(),
    fetchRegionById(news.regionId)(),
    typeof news.wardId === 'number' && news.wardId !== 0
      ? fetchWardById(news.wardId)()
      : undefined,
  ]);

  return {
    ...news,
    charityProgram,
    region,
    ward,
  };
};

export const fetchNewsWithRelatedById = async (id: number) => {
  const news = await withDataFetching(getWpData)(
    `/news/${id}`,
    newsSchema.omit({ id: true }),
  )();
  return fetchRelatedDataForNews({ ...news, id });
};
export const fetchNewsByIds = async (ids: number[]) => {
  return await Promise.all(ids.map(fetchNewsWithRelatedById));
};

export const getLastNews = (news: NewsItem[], num = 5) => news.slice(0, num);

export const getNews = async (astro: AstroGlobal) =>
  axios
    .get<NewsItemWithRelated[]>('/api/news', {
      baseURL: astro.url.origin,
      headers: {
        Accept: 'application/json',
      },
    })
    .then(res => res.data);
