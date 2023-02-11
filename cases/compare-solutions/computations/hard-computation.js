export const HardComputation = () => {
  const a = new Array(2000000);
  a.fill().map((item) => Math.random()).sort().filter((item) => item > 0.2);

  return a;
};
