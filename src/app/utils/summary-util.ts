export function calculatePercentage<T extends string>(
  items: T[]
): Array<{ key: T; count: number; percent: number }> {
  const total = items.length;
  const counts = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<T, number>);

  return Object.entries(counts).map(([key, count]) => ({
    key: key as T,
    count: count as number,
    percent: Math.round((count as number / total) * 100),
  }));
}
