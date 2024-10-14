import type { Region } from '../schemas/data/regionsSchema';
import type { NewsItemWithRelated } from './news';
import type { WardWithRelatedData } from './wards';

export interface NewsPoint {
  id: string;
  region: Omit<Region, 'id'>;
  charityProgramSlug: string;
  title: string;
  image: string | boolean;
  description: string;
  link: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface PointWithCoordinates extends NewsPoint, Coordinates {}

export function getMapNews(
  news: NewsItemWithRelated[],
  wards: WardWithRelatedData[],
): NewsPoint[] {
  const wardsNews: NewsPoint[] = wards
    .filter(w => w.charityProgram.slug === 'pomozj-detyam')
    .map((w, idx) => ({
      id: `${w.id}${idx}-${w.charityProgram.slug}`,
      charityProgramSlug: w.charityProgram.slug,
      region: w.region,
      title: w.name,
      image: w.image,
      description: w.description,
      link: '/programs/' + w.charityProgram.slug + '/ward/' + w.id,
    }));

  const otherNews: NewsPoint[] = news
    .filter(n => n.charityProgram.slug !== 'pomozj-detyam')
    .map((n, idx) => ({
      id: `${n.id}${idx}-${n.charityProgram.slug}`,
      charityProgramSlug: n.charityProgram.slug,
      region: n.region,
      title: n.title,
      image: n.image,
      description: n.description,
      link: '/news/' + n.slug,
    }));
  return [...wardsNews, ...otherNews];
}
