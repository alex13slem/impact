import type { AstroGlobal } from 'astro';
import axios from 'axios';
import {
  partnersArraySchema,
  partnersSchema,
  type Partner,
} from '../schemas/data/partnersSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchNewsByIds } from './news';
import { fetchRegionById } from './regions';
import { fetchWardsByIds } from './wards';

const getEventsByIds = async (ids: number[] | string) => {
  return Array.isArray(ids) ? await fetchNewsByIds(ids) : [];
};

const getWardsByIds = async (ids: number[] | string) => {
  return Array.isArray(ids) ? await fetchWardsByIds(ids) : [];
};

export const fetchPartners = withDataFetching(getWpData)(
  '/partners',
  partnersArraySchema,
);

// Функция для получения партнёра по ID
export const fetchPartnerById = (id: number) =>
  withDataFetching(getWpData)(
    `/partners/${id}`,
    partnersSchema.omit({ id: true }),
  );

async function getPartnerWithRelatedData(partner: Partner) {
  return {
    ...partner,
    events: await getEventsByIds(partner.eventsIds),
    charityProgram: await fetchCharityProgramById(partner.charityProgramId)(),
    wards: await getWardsByIds(partner.wardsIds),
    region: await fetchRegionById(partner.regionId)(),
  };
}

// Функция для получения всех партнёров с их связанными событиями
// export const fetchPartnersWithRelatedData = async () => {
//   const partners = await fetchPartners();
//   return Promise.all(partners.map(getPartnerWithRelatedData));
// };

export const fetchPartnersWithRelatedData = async () => {
  const partners = await fetchPartners();
  const results = [];
  for (const partner of partners) {
    results.push(await getPartnerWithRelatedData(partner));
  }
  return results;
};

// Функция для получения партнёра по ID с его связанными событиями
export const fetchPartnerWithRelatedById = async (id: number) => {
  const partner = await fetchPartnerById(id)();
  return getPartnerWithRelatedData({ ...partner, id });
};

export const getPartners = async (astro: AstroGlobal) =>
  axios
    .get<PartnerWithRelatedData[]>('/api/partners', {
      baseURL: astro.url!.origin,
    })
    .then(res => res.data)
    .catch(e => {
      console.error(e.message);
      throw new Error('Failed to fetch data in getPartners');
    });

export type PartnerWithRelatedData = Awaited<
  ReturnType<typeof fetchPartnersWithRelatedData>
>[number];
