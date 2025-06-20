export const getDeveloperList = (developerStr: string): string[] => {
  return developerStr.split(',').map((d) => d.trim());
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return (parts[0][0] + parts[1][0])?.toUpperCase() ?? '';
};
