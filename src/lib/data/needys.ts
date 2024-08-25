export type Needy = {
  id: number;
  name: string;
  age: number;
  image: string;
  city: string;
  description: string;
  detailDescription: string;
  desire?: string;
  diagnosis?: string;
  regionSlug: string;
  socialProgramSlug: string;
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
    age: 12,
    city: 'Донецк',
    description: `
      Здесь должен быть основной текст короткий о человеке
      должен быть основной текст
      короткий о человеке
    `,
    detailDescription: `
      Диана - 12-летняя девочка из Донецка. Она любит рисовать и мечтает стать художником.
      У нее есть старшая сестра, которая всегда поддерживает ее в трудных ситуациях.
      Диана очень любит свою семью и всегда старается помочь им в чем угодно.
    `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'krasnodar',
    socialProgramSlug: 'nezhnie-ruki',
  },
  {
    id: 3,
    name: 'Матрёна',
    age: 12,
    city: 'Луганск',
    description: `
      Здесь должен быть основной текст короткий о человеке
      должен быть основной текст
      короткий о человеке
    `,
    detailDescription: `
      Матрёна - 12-летняя девочка из Луганска. Она любит читать книги и мечтает стать писателем.
      У нее есть младший брат, который всегда шалит и делает ей приятные сюрпризы.
      Матрёна очень любит свою семью и всегда старается помочь им в чем угодно.
    `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'krasnodar',
    socialProgramSlug: 'nezhnie-ruki',
  },
  {
    id: 2,
    name: 'Снежана',
    age: 12,
    city: 'Астана',
    description: `
      Здесь должен быть основной текст короткий о человеке
      должен быть основной текст
      короткий о человеке
    `,
    detailDescription: `
      Снежана - 12-летняя девочка из Астаны. Она любит танцевать и мечтает стать балериной.
      У нее есть старшая сестра, которая всегда поддерживает ее в трудных ситуациях.
      Снежана очень любит свою семью и всегда старается помочь им в чем угодно.
    `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'krasnodar',
    socialProgramSlug: 'socialnye-lifty',
  },
  {
    id: 4,
    name: 'Фемида',
    age: 12,
    city: 'Грозный',
    description: `
      Здесь должен быть основной текст короткий о человеке
      должен быть основной текст
      короткий о человеке
    `,
    detailDescription: `
      Фемида - 12-летняя девочка из Грозного. Она любит рисовать и мечтает стать художником.
      У нее есть младший брат, который всегда шалит и делает ей приятные сюрпризы.
      Фемида очень любит свою семью и всегда старается помочь им в чем угодно.
    `,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    regionSlug: 'leningrad',
    socialProgramSlug: 'socialnye-lifty',
  },
  {
    id: 5,
    name: 'Зульфия',
    age: 12,
    city: 'Славянск',
    description: `
      Здесь должен быть основной текст короткий о человеке
      должен быть основной текст
      короткий о человеке
    `,
    detailDescription: `
      Зульфия - 12-летняя девочка из Славянска. Она любит читать книги и мечтает стать писателем.
      У нее есть старшая сестра, которая всегда поддерживает ее в трудных ситуациях.
      Зульфия очень любит свою семью и всегда старается помочь им в чем угодно.
    `,
    desire: `Желаем нашей Зульфие
      скорейшего выздоровления!`,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    diagnosis: 'Артрит',
    regionSlug: 'leningrad',
    socialProgramSlug: 'pomozj-detyam',
  },
  {
    id: 6,
    name: 'Борька',
    age: 12,
    city: 'Горловка',
    description: `
      Здесь должен быть основной текст короткий о человеке
      должен быть основной текст
      короткий о человеке
    `,
    detailDescription: `
      Борька - 12-летний мальчик из Горловки. Он любит играть в футбол и мечтает стать профессиональным футболистом.
      У него есть младший брат, который всегда шалит и делает ему приятные сюрпризы.
      Борька очень любит свою семью и всегда старается помочь им в чем угодно.
    `,
    desire: `Желаем нашему Борьке
      скорейшего выздоровления!`,
    image:
      'https://k1news.ru/wp-content/uploads/2023/06/placeholder-1920w.webp',
    diagnosis: 'Артрит',
    regionSlug: 'leningrad',
    socialProgramSlug: 'pomozj-detyam',
  },
];
