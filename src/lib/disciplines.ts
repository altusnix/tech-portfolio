export type Discipline = 'front-end' | 'back-end' | 'design' | 'qa' | 'product' | 'content';

export const disciplineLabels: Record<Discipline, { singular: string; plural: string }> = {
  'front-end': { singular: 'front-end developer', plural: 'front-end developers' },
  'back-end': { singular: 'back-end developer', plural: 'back-end developers' },
  design: { singular: 'designer', plural: 'designers' },
  qa: { singular: 'QA engineer', plural: 'QA engineers' },
  product: { singular: 'product manager', plural: 'product managers' },
  content: { singular: 'content strategist', plural: 'content strategists' },
};

export interface CrewMember {
  discipline: Discipline;
  count: number;
}

export function crewSentence(myRole: string, crew: CrewMember[]): string {
  const present = crew.filter((c) => c.count > 0);
  const crewCount = present.reduce((sum, c) => sum + c.count, 0);
  const teamSize = crewCount + 1;

  if (present.length === 0) {
    return `Solo project: Robyn as ${myRole}.`;
  }

  const parts = present.map(
    (c) => `${c.count} ${c.count === 1 ? disciplineLabels[c.discipline].singular : disciplineLabels[c.discipline].plural}`
  );
  const partsSentence = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;

  return `Team of ${teamSize}: Robyn as ${myRole}, ${partsSentence}.`;
}
