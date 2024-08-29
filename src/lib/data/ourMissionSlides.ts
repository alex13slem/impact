export interface OurMissionSlide {
  id: number;
  description: string;
  image: string;
}

export const ourMissionSlides: OurMissionSlide[] = [
  {
    id: 1,
    description: `
    <b>Объединить людей</b>
    и компании для оказания
    необходимой помощи тем,
    кто в ней нуждается.
    `,
    image: '/images/our-mission-placeholder.jpg',
  },
  {
    id: 2,
    description: `
    <b>Дать силу сообществу</b>
    и организациям для
    предоставления необходимой
    поддержки тем, кто в ней нуждается.
    `,
    image: '/images/our-mission-placeholder.jpg',
  },
  {
    id: 3,
    description: `
    <b>Создать платформу</b>
    для сотрудничества между
    людьми и организациями для
    предоставления важной помощи
    тем, кто в ней нуждается.
    `,
    image: '/images/our-mission-placeholder.jpg',
  },
];
