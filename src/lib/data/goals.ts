export interface Goal {
  id: number;
  counter: number;
  description: string;
  image: string;
}

export const goals: Omit<Goal, 'image'>[] = [
  {
    id: 1,
    description: `
    <p>
      Привлечь в качестве партнеров
      Фонда не менее тридцати ключевых
      предприятий.
    </p>
    `,
    counter: 30,
  },
  {
    id: 3,
    description: `
    <p>
      Заключить соглашение о сотрудничестве
      с четырьмя крупнейшими медицинскими
      учреждениям России в области лечения
      тяжелобольных детей.
    </p>
    `,
    counter: 11,
  },
  {
    id: 4,
    description: `
    <p>
      Оказать помощь
      в профессиональной
      ориентации и социальной адаптации минимум ста детям, оказавшимся в трудной жизненной ситуации.
    </p>
    `,
    counter: 100,
  },
];
