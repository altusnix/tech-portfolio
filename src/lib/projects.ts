import type { CollectionEntry } from 'astro:content';

// yearStart: 0 is a placeholder sentinel for projects whose real dates
// haven't been filled in yet — render it honestly instead of "0–present"
export function formatDateRange(yearStart: number, yearEnd?: number): string {
  if (!yearStart) return 'Dates pending';
  if (!yearEnd) return `${yearStart}–present`;
  if (yearEnd === yearStart) return `${yearStart}`;
  return `${yearStart}–${yearEnd}`;
}

export function sortProjectsNewestFirst(projects: CollectionEntry<'projects'>[]) {
  return [...projects].sort((a, b) => {
    if (b.data.yearStart !== a.data.yearStart) return b.data.yearStart - a.data.yearStart;
    return a.data.order - b.data.order;
  });
}
