// 
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) return `${hours}h`;
  
  if (hours === 0) return `${mins}m`;

  return `${hours}h ${mins}m`;
};

export const formatHours = (minutes: number): number => {
  const hours = minutes / 60;
  return parseFloat(hours.toFixed(1));
};

export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};