export type Needy = {
  id: number;
  name: string;
  image: string;
  city: string;
  description: string;
  regionSlug: string;
  categorySlug: string;
};

export interface Coordinates {
  x: number;
  y: number;
}

export interface NeedyWithCoordinates extends Needy, Coordinates {}

export const needys: Needy[] = [
  {
    id: 1,
    name: 'Диана',
    city: 'Донецк',
    description: `
      Здесь должен быть основной текст короткий о человеке
должен быть основной текст
короткий о человеке
      `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'krasnodar',
    categorySlug: 'category1',
  },
  {
    id: 3,
    name: 'Матрёна',
    city: 'Луганск',
    description: `
      Здесь должен быть основной текст короткий о человеке
должен быть основной текст
короткий о человеке
      `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'krasnodar',
    categorySlug: 'category1',
  },
  {
    id: 2,
    name: 'Снежана',
    city: 'Астана',
    description: `
      Здесь должен быть основной текст короткий о человеке
должен быть основной текст
короткий о человеке
      `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'krasnodar',
    categorySlug: 'category1',
  },
  {
    id: 4,
    name: 'Фемида',
    city: 'Грозный',
    description: `
      Здесь должен быть основной текст короткий о человеке
должен быть основной текст
короткий о человеке
      `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'leningrad',
    categorySlug: 'category2',
  },
  {
    id: 5,
    name: 'Зульфия',
    city: 'Славянск',
    description: `
      Здесь должен быть основной текст короткий о человеке
должен быть основной текст
короткий о человеке
      `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'leningrad',
    categorySlug: 'category2',
  },
  {
    id: 6,
    name: 'Борька',
    city: 'Горловка',
    description: `
      Здесь должен быть основной текст короткий о человеке
должен быть основной текст
короткий о человеке
      `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'leningrad',
    categorySlug: 'category3',
  },
];
