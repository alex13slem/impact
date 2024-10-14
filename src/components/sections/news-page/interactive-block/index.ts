import type { NewsItemWithRelated } from '@/lib/data/news';
import type { PartnerWithRelatedData } from '@/lib/data/partners';
import type { WardWithRelatedData } from '@/lib/data/wards';
import { urlQuery } from '@sveu/browser';

export const query = urlQuery();

export function newsMatchesFilters(
  item: NewsItemWithRelated,
  query: Record<string, string>,
) {
  const {
    charityProgram: { slug: program },
    region: { slug: region },
  } = item;

  const matchProgram = query.program ? program === query.program : true;
  const matchRegion = query.region ? region === query.region : true;
  const matchHasPartner = query.hasPartner ? !!item.partnerId : true;
  const matchHasWard = query.hasWard ? !!item.wardId : true;

  return matchProgram && matchRegion && matchHasPartner && matchHasWard;
}

export function partnersMatchesFilters(
  partner: PartnerWithRelatedData,
  query: Record<string, string>,
) {
  const {
    charityProgram: { slug: program },
  } = partner;
  const matchProgram = query.program ? program === query.program : true;

  return matchProgram;
}

export function wardsMatchesFilters(
  ward: WardWithRelatedData,
  // news: NewsItemWithRelated[],
  query: Record<string, string>,
) {
  const matchProgram = query.program
    ? ward.charityProgram?.slug === query.program
    : true;
  const matchRegion = query.region ? ward.region?.slug === query.region : true;
  // const hasInNews = news.some(n => n.wardId === ward.id);
  return matchProgram && matchRegion;
}
