export const generateNumberId = (): number => {
  const now = new Date();
  const timestamp = now.getTime();
  const numberId = timestamp % 1000000000;

  return numberId;
};
