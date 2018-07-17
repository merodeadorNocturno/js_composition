const suma = (...o) => {
  const firstStep = o.reduce((i, j) => i + j, 0);
  const v = (...y) => {
    const secondStep = y.reduce((i, j) => i + j, 0);
    return suma(firstStep + secondStep);
  };

  v.valueOf = v.toString = () => firstStep;
  return v;
};
