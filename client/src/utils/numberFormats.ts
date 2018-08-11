export const colSeparated = (num: number) => {
  return Math.abs(num)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
