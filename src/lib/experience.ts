import type { ExperienceItem } from "@/types/i18n/experience";

function compareIds(left: string, right: string): number {
  const leftNumber = Number(left);
  const rightNumber = Number(right);

  if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
    return leftNumber - rightNumber;
  }

  return left.localeCompare(right);
}

function compareEndDates(left: string | null, right: string | null): number {
  if (left === right) return 0;
  if (left === null) return -1;
  if (right === null) return 1;
  return right.localeCompare(left);
}

export function sortExperiencesByDate(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((left, right) => {
    const startDateComparison = right.startDate.localeCompare(left.startDate);
    if (startDateComparison !== 0) return startDateComparison;

    const endDateComparison = compareEndDates(left.endDate, right.endDate);
    if (endDateComparison !== 0) return endDateComparison;

    return compareIds(left.id, right.id);
  });
}
