export interface Contribution {
  id: number;
  name: string;
  description: string;
  image: string;
  project: number;
  partners: number[];
  needys: number[];
}

export const contributions: Contribution[] = [
  {
    id: 1,
    name: 'Благотворительная программа «Помощь тяжелобольным детям»',
    image: 'https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    description: `
    Благотворительная программа «Помощь тяжелобольным детям» является одним из направлений деятельности Фонда по оказанию адресной помощи детям с различными тяжелыми заболеваниями, нуждающимся в дорогостоящем лечении и реабилитации.`,
    project: 1,
    partners: [1, 2, 3],
    needys: [1, 2, 3],
  },
  {
    id: 2,
    name: 'Благотворительная программа «Помощь тяжелобольным детям»',
    image: ' https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    description: `
    Благотворительная программа «Помощь тяжелобольным детям» является одним из направлений деятельности Фонда по оказанию адресной помощи детям с различными тяжелыми заболеваниями, нуждающимся в дорогостоящем лечении и реабилитации.`,
    project: 2,
    partners: [1, 2, 3],
    needys: [1, 2, 3],
  },
  {
    id: 3,
    name: 'Благотворительная программа «Помощь тяжелобольным детям»',
    image: ' https://www.gdpconsulting.net/wp-content/uploads/2017/09/team.jpg',
    description: `
    Благотворительная программа «Помощь тяжелобольным детям» является одним из направлений деятельности Фонда по оказанию адресной помощи детям с различными тяжелыми заболеваниями, нуждающимся в дорогостоящем лечении и реабилитации.`,
    project: 3,
    partners: [1, 2, 3],
    needys: [1, 2, 3],
  },
];
