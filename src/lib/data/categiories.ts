export interface Category {
  id: number;
  slug: string;
  name: string;
}

export const categories: Category[] = [
  { id: 1, slug: 'category1', name: 'Категория 1' },
  { id: 2, slug: 'category2', name: 'Категория 2' },
];
