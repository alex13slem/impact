import { newsArraySchema } from '../schemas/data/newsSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';

export const fetchNews = withDataFetching(getWpData)('/news', newsArraySchema);
export const news = await fetchNews();

export async function fetchNewsWithRelated() {
  return await Promise.all(
    news.map(async news => ({
      ...news,
      charityProgram: await fetchCharityProgramById(news.charityProgramId)(),
    })),
  );
}
export const newsWithRelated = await fetchNewsWithRelated();

export const getLastNews = (num = 5) =>
  [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, num);

export type NewsWithRelated = (typeof newsWithRelated)[number];
