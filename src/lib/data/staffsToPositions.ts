interface StuffsToPositions {
  id: number;
  stuffId: number;
  positionId: number;
}

const staffToPositions: StuffsToPositions[] = [
  {
    id: 1,
    stuffId: 1,
    positionId: 4,
  },
  {
    id: 2,
    stuffId: 2,
    positionId: 4,
  },
  {
    id: 3,
    stuffId: 3,
    positionId: 4,
  },
  {
    id: 4,
    stuffId: 4,
    positionId: 4,
  },
  {
    id: 5,
    stuffId: 5,
    positionId: 4,
  },
  {
    id: 5,
    stuffId: 6,
    positionId: 1,
  },
  {
    id: 6,
    stuffId: 7,
    positionId: 1,
  },
  {
    id: 7,
    stuffId: 8,
    positionId: 1,
  },
  {
    id: 8,
    stuffId: 9,
    positionId: 2,
  },
  {
    id: 9,
    stuffId: 10,
    positionId: 3,
  },
  {
    id: 10,
    stuffId: 11,
    positionId: 5,
  },
];

export { staffToPositions, type StuffsToPositions };
