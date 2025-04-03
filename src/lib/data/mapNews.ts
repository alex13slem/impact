import type { NewsItemWithRelated } from "./news";
import type { RegionWithRelations } from "./regions";
import type { WardWithRelatedData } from "./wards";

export interface NewsPoint {
  id: string;
  region: RegionWithRelations;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface PointWithCoordinates extends NewsPoint, Coordinates {}

export function getMapNews(
  news: NewsItemWithRelated[],
  wards: WardWithRelatedData[],
  regions: RegionWithRelations[]
): NewsPoint[] {
  const wardsNews: NewsPoint[] = wards
    .filter((w) => w.charityProgram.slug === "pomozj-detyam")
    .map((w, idx) => {
      const region = regions.find((r) => r.slug === w.region.slug)!;
      const regionWithProgram = {
        ...region,
        mapDescription: region.mapDescription.filter(
          (d) => d.charityProgram.slug === w.charityProgram.slug
        ),
      };
      return {
        id: `${w.id}${idx}-${w.charityProgram.slug}`,
        region: regionWithProgram,
      };
    });

  const otherNews: NewsPoint[] = news
    .filter((n) => n.charityProgram.slug !== "pomozj-detyam")
    .map((n, idx) => {
      const region = regions.find((r) => r.slug === n.region.slug)!;
      const regionWithProgram = {
        ...region,
        mapDescription: region.mapDescription.filter(
          (d) => d.charityProgram.slug === n.charityProgram.slug
        ),
      };
      return {
        id: `${n.id}${idx}-${n.charityProgram.slug}`,
        region: regionWithProgram,
      };
    });
  return [...wardsNews, ...otherNews];
}
