export interface Docs {
  id: number;
  name: string;
  link: string;
  image?: string;
  showIn: string;
}

export const docs: Docs[] = [
  {
    id: 1,
    name: 'Устав',
    link: '/docs/articles-of-association.pdf',
    image: '/images/ustav.png',
    showIn: 'landing',
  },
  {
    id: 2,
    name: 'Свидетельство',
    link: '/docs/certificate.pdf',
    image: '/images/svidetelstvo.png',
    showIn: 'landing',
  },
  {
    id: 3,
    name: 'Публичная оферта',
    link: '/docs/Organization-card-FOUNDATION.docx',
    image: '/images/oferta.png',
    showIn: 'landing',
  },
  {
    id: 4,
    name: 'Соглашение на обработку персональных данных (Родитель)',
    link: '/docs/ill-childs/Consent-to-the-processing-of-personal-data-parent.pdf',
    image: '',
    showIn: 'pomozj-detyam',
  },
  {
    id: 5,
    name: 'Соглашение на обработку персональных данных (Ребенок)',
    link: '/docs/ill-childs/Consent-to-the-processing-of-personal-data-child.pdf',
    image: '',
    showIn: 'pomozj-detyam',
  },
  {
    id: 6,
    name: 'Заявление на получение благотворительной помощи',
    link: '/docs/ill-childs/ЗАЯВЛЕНИЕ НА ПОЛУЧЕНИЕ БЛАГОТВОРИТЕЛЬНОЙ ПОМОЩИ.pdf',
    image: '',
    showIn: 'pomozj-detyam',
  },
  {
    id: 6,
    name: 'Положение о программе благотворительной помощи',
    link: '/docs/ill-childs/about-the-charity-program-help-for-seriously-ill-children.docx',
    image: '',
    showIn: 'pomozj-detyam',
  },
];
