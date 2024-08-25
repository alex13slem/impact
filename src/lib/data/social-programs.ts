export interface SocialProgram {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export const socialPrograms: SocialProgram[] = [
  {
    id: 1,
    slug: 'nezhnie-ruki',
    name: 'Нежные руки',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    description: `Благотворительная программа «Нежные руки» является одним из направлений деятельности
Фонда по организации работы «больничных» нянь для детей-сирот, детей, оставшихся без попечения родителей, а также детей-отказников и детей, находящихся в трудной жизненной ситуации...`,
  },
  {
    id: 2,
    slug: 'socialnye-lifty',
    name: 'Социальные лифты',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    description: `Благотворительная программа по оказанию поддержки детям-сиротам и детям, оставшимся без попечения родителей, в сфере образования, профориентации, трудоустройства и социальной адаптации.`,
  },
  {
    id: 3,
    slug: 'pomozj-detyam',
    name: 'Поможь тяжелобольным детям',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    description: `Благотворительная программа
«Помощь тяжелобольным детям» является одним из направлений деятельности Фонда по оказанию адресной помощи детям с различными тяжелыми заболеваниями, нуждающимся в дорогостоящем лечении и реабилитации.`,
  },
];
