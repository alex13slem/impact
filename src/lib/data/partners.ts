// import { contributions } from './contributions';

import {
  partnersArraySchema,
  partnersSchema,
  type Partner,
} from '../schemas/data/partnersSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchCharityProgramById } from './charityPrograms';
import { fetchNewsByIds } from './news';

const getEventsByIds = async (ids: number[] | string) => {
  return Array.isArray(ids) ? await fetchNewsByIds(ids) : [];
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
  };
}

// Функция для получения всех партнёров с их связанными событиями
export const fetchPartnersWithRelatedData = async () => {
  const partners = await fetchPartners();
  return Promise.all(partners.map(getPartnerWithRelatedData));
};

// Функция для получения партнёра по ID с его связанными событиями
export const fetchPartnerWithRelatedById = async (id: number) => {
  const partner = await fetchPartnerById(id)();
  return getPartnerWithRelatedData({ ...partner, id });
};

// Пример вызова получения всех партнёров с их событиями
export const partnersWithRelatedData = await fetchPartnersWithRelatedData();

// Тип данных партнёра с событиями
export type PartnerWithRelatedData = (typeof partnersWithRelatedData)[number];
