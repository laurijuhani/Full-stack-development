export const isNotNumber = (value: unknown): boolean => {
  return isNaN(Number(value));
};