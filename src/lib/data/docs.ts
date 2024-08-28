export interface Docs {
  id: number;
  name: string;
  link: string;
  image?: string;
  showInLanding: boolean;
}

export const docs: Docs[] = [
  {
    id: 1,
    name: 'Устав',
    link: 'https://www.legal-info.ru/ustav/',
    image: '/images/ustav.png',
    showInLanding: true,
  },
  {
    id: 2,
    name: 'Свидетельство',
    link: 'https://www.legal-info.ru/svidetelstvo-o-registracii/',
    image: '/images/svidetelstvo.png',
    showInLanding: true,
  },
  {
    id: 3,
    name: 'Публичная оферта',
    link: 'https://www.legal-info.ru/registraciya/',
    image: '/images/oferta.png',
    showInLanding: true,
  },
];
