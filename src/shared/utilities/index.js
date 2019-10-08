export const getOpacity = value => {
  if (value > 4) return 1;
  else if (value > 2) return 0.65;
  else return 0.45;
};
