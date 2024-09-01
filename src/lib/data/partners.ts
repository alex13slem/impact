import { contributions } from './contributions';

export interface Partner {
  id: number;
  name: string;
  description: string;
  image: string;
  contributions: number[];
}

export const partners: Partner[] = [
  {
    id: 1,
    name: 'Партнер 1',
    description: 'Это первый партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [1, 2, 3],
  },
  {
    id: 2,
    name: 'Партнер 2',
    description: 'Это второй партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [1, 2, 3],
  },
  {
    id: 3,
    name: 'Партнер 3',
    description: 'Это третий партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [1, 2, 3],
  },
  {
    id: 4,
    name: 'Партнер 4',
    description: 'Это четвертый партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [],
  },
  {
    id: 5,
    name: 'Партнер 5',
    description: 'Это пятый партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [],
  },
  {
    id: 6,
    name: 'Партнер 6',
    description: 'Это пятый партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [],
  },
  {
    id: 7,
    name: 'Партнер 7',
    description: 'Это пятый партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [],
  },
  {
    id: 8,
    name: 'Партнер 8',
    description: 'Это пятый партнер',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    contributions: [],
  },
];

export const partnersWithContribution = partners.map(partner => {
  const partnerContributions = contributions.filter(({ partners }) =>
    partners.some(id => id === partner.id),
  );
  return { ...partner, contributions: partnerContributions };
});

export type PartnerWithContribution = (typeof partnersWithContribution)[number];
