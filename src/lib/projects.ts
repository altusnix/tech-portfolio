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

export function slugifyTech(tech: string): string {
  return tech
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllTechStacks(projects: CollectionEntry<'projects'>[]): { name: string; slug: string }[] {
  const bySlug = new Map<string, string>();
  for (const project of projects) {
    for (const tech of project.data.stack) {
      const slug = slugifyTech(tech);
      if (!bySlug.has(slug)) bySlug.set(slug, tech);
    }
  }
  return [...bySlug.entries()].map(([slug, name]) => ({ slug, name }));
}
