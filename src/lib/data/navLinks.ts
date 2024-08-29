export interface NavLink {
  name: string;
  link: string;
}

export const navLinks: NavLink[] = [
  {
    name: 'О фонде',
    link: '/#about',
  },
  {
    name: 'Миссия',
    link: '/#mission',
  },
  {
    name: 'Программы',
    link: '/#programs',
  },
  {
    name: 'Партнёры',
    link: '/#partners',
  },
  {
    name: 'Цели',
    link: '/#goals',
  },
  {
    name: 'Как помочь',
    link: '/#how-to-help',
  },
  {
    name: 'Документы',
    link: '/documents',
  },
];
