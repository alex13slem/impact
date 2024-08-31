export interface StuffPosition {
  id: number;
  name: string;
  stuffs: number[];
}

export const stuffPositions: StuffPosition[] = [
  {
    id: 1,
    name: 'Попечительский совет',
    stuffs: [6, 7, 8],
  },
  {
    id: 2,
    name: 'Исполнительный директор',
    stuffs: [9],
  },
  {
    id: 3,
    name: 'Руководитель юридического отдела',
    stuffs: [10],
  },
  {
    id: 4,
    name: 'Управляющий совет',
    stuffs: [1, 2, 3, 4, 5],
  },
  {
    id: 5,
    name: 'Врач-эксперт',
    stuffs: [11],
  },
];
