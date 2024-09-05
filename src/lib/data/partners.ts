// import { contributions } from './contributions';

import {
  partnersArraySchema,
  partnersSchema,
} from '../schemas/data/partnersSchema';
import { getWpData, withDataFetching } from '../utils/wp';
import { fetchNewsByIds } from './news';

// export interface Partner {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   contributions: number[];
// }

// export const partners: Partner[] = [
//   {
//     id: 1,
//     name: 'Партнер 1',
//     description: 'Это первый партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [1, 2, 3],
//   },
//   {
//     id: 2,
//     name: 'Партнер 2',
//     description: 'Это второй партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [1, 2, 3],
//   },
//   {
//     id: 3,
//     name: 'Партнер 3',
//     description: 'Это третий партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [1, 2, 3],
//   },
//   {
//     id: 4,
//     name: 'Партнер 4',
//     description: 'Это четвертый партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [],
//   },
//   {
//     id: 5,
//     name: 'Партнер 5',
//     description: 'Это пятый партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [],
//   },
//   {
//     id: 6,
//     name: 'Партнер 6',
//     description: 'Это пятый партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [],
//   },
//   {
//     id: 7,
//     name: 'Партнер 7',
//     description: 'Это пятый партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [],
//   },
//   {
//     id: 8,
//     name: 'Партнер 8',
//     description: 'Это пятый партнер',
//     image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
//     contributions: [],
//   },
// ];

// export const partnersWithContribution = partners.map(partner => {
//   const partnerContributions = contributions.filter(({ partners }) =>
//     partners.some(id => id === partner.id),
//   );
//   return { ...partner, contributions: partnerContributions };
// });

// export type PartnerWithContribution = (typeof partnersWithContribution)[number];

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

// Вспомогательная функция для получения событий по ID

// Функция для получения всех партнёров с их связанными событиями
export const fetchPartnersWithRelatedData = async () => {
  const partners = await fetchPartners();
  return Promise.all(
    partners.map(async partner => ({
      ...partner,
      events: await fetchNewsByIds(partner.eventsIds),
    })),
  );
};

// Функция для получения партнёра по ID с его связанными событиями
export const fetchPartnerWithRelatedById = async (id: number) => {
  const partner = await fetchPartnerById(id)();
  return {
    ...partner,
    events: await fetchNewsByIds(partner.eventsIds),
  };
};

// Пример вызова получения всех партнёров с их событиями
export const partnersWithRelatedData = await fetchPartnersWithRelatedData();

// Тип данных партнёра с событиями
export type PartnerWithRelatedData = (typeof partnersWithRelatedData)[number];
