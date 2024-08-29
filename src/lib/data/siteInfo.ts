export interface PageInfo {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export const siteInfo: PageInfo[] = [
  {
    slug: 'home',
    name: 'Главная',
    description: 'Главная · Благотворительный фонд «IMPACT»',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
  },
  {
    slug: 'news',
    name: 'Новости',
    description: 'Раздел новостей · Благотворительный фонд «IMPACT»',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
  },
  {
    slug: 'socialnye-lifty',
    name: 'Социальные лифты',
    description:
      'Благотворительная программа по оказанию поддержки детям-сиротам и детям, оставшимся без попечения родителей, в сфере образования, профориентации, трудоустройства и социальной адаптации.',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
  },
];
