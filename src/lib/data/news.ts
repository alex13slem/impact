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

export const getNews = async (astro: AstroGlobal, showDraft = false) =>
  axios
    .get<NewsItemWithRelated[]>('/api/news', {
      baseURL: astro.site!.origin,
      headers: {
        Accept: 'application/json',
      },
      params: {
        'show-draft': showDraft ? 'true' : undefined,
      },
    })
    .then(res => res.data);

export const getNewsItemBySlug = async (astro: AstroGlobal, slug: string) =>
  axios
    .get<NewsItemWithRelated>(`/api/news/${slug}`, {
      baseURL: astro.site!.origin,
      headers: {
        Accept: 'application/json',
      },
    })
    .then(res => res.data);

export type NewsItemWithRelated = Awaited<
  ReturnType<typeof fetchNewsWithRelatedById>
>;
