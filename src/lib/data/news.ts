import {
  newsArraySchema,
  newsSchema,
  type NewsItem,
} from '../schemas/data/newsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchRegionById } from './regions';
import { fetchWardById } from './wards';

// Получение списка новостей
export const fetchNews = withDataFetching(getWpData)('/news', newsArraySchema);

// Фильтрация и сортировка новостей
export const news = (await fetchNews())
  .filter(n => !n.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Вспомогательная функция для получения связанных данных для новости
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

// Получение всех новостей с их связанными данными
export async function fetchNewsWithRelated() {
  return await Promise.all(news.map(fetchRelatedDataForNews));
}

// Получение одной новости по ID с её связанными данными
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

// Список всех новостей с их связанными данными
export const newsWithRelated = await fetchNewsWithRelated();

// Функция для получения последних новостей (по умолчанию 5)
export const getLastNews = (num = 5) => news.slice(0, num);

// Тип данных для новости с её связанными данными
export type NewsWithRelated = (typeof newsWithRelated)[number];
