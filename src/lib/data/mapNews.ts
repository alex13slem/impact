import { newsWithRelated } from '@/lib/data/news';
import { wardsWithRelatedData } from '@/lib/data/wards';
import type { Region } from '../schemas/data/regionsSchema';

export interface NewsPoint {
  region: Omit<Region, 'id'>;
  slug: string;
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

const wardsNews: NewsPoint[] = wardsWithRelatedData
  .filter(w => w.charityProgram.slug === 'pomozj-detyam')
  .map(w => ({
    slug: w.charityProgram.slug,
    region: w.region,
    title: w.name,
    image: w.image,
    description: w.description,
    link: '/programs/' + w.charityProgram.slug + '/ward/' + w.id,
  }));

const otherNews: NewsPoint[] = newsWithRelated
  .filter(n => n.charityProgram.slug !== 'pomozj-detyam')
  .map(n => ({
    slug: n.charityProgram.slug,
    region: n.region,
    title: n.title,
    image: n.image,
    description: n.description,
    link: '/news/' + n.slug,
  }));
export const mapNews: NewsPoint[] = [...wardsNews, ...otherNews];

// console.log(mapNews);
