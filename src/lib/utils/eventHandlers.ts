import { filterSocialProgram } from '../stores/socialProgramStore';

export function handleFilterSocialProgram(e: MouseEvent) {
  const el = (e.target as HTMLElement).closest('button') as HTMLButtonElement;
  filterSocialProgram.update(currentSocialProgram => {
    const newSocialProgram = el.getAttribute('data-social-program');
    return currentSocialProgram === newSocialProgram ? null : newSocialProgram;
  });
}
