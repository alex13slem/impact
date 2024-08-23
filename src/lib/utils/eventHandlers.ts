import { filterCategory } from '../stores/categoryStore';

export function handleFilterCategory(e: MouseEvent) {
  const el = (e.target as HTMLElement).closest('button') as HTMLButtonElement;
  filterCategory.update(currentCategory => {
    const newCategory = el.getAttribute('data-category');
    return currentCategory === newCategory ? null : newCategory;
  });
}
