export interface NavLink {
  name: string;
  link: string;
}

export const navLinks: NavLink[] = [
  // {
  //   name: 'О фонде',
  //   link: '/#description',
  // },
  // {
  //   name: 'Миссия',
  //   link: '/#our-mission',
  // },
  {
    name: 'Программы',
    link: '/programs',
  },
  {
    name: 'Партнёры',
    link: '/#our-partners',
  },
  // {
  //   name: 'Цели',
  //   link: '/#our-goals',
  // },
  {
    name: 'Как помочь',
    link: '/#pay',
  },
  {
    name: 'Документы',
    link: '/#documents',
  },
  {
    name: 'Отчёты',
    link: '/reports',
  },
  {
    name: 'Благодарности',
    link: '/thanks',
  },
  {
    name: 'Контакты',
    link: '/#contacts',
  },
];
