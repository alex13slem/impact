import { filterCharityProgram } from '../stores/charityProgramsStore';

export function handleFilterCharityProgram(e: MouseEvent) {
  const el = (e.target as HTMLElement).closest('button') as HTMLButtonElement;
  filterCharityProgram.update(currentProgram => {
    const newProgram = el.getAttribute('data-charity-program');
    return currentProgram === newProgram ? null : newProgram;
  });
}
