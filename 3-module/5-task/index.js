function getMinMax(str) {
  let minMax = str.split(' ')
  .filter(item => isFinite(item))
  .sort((a, b) => a - b);

  return Object.assign({}, {min: +`${minMax[0]}`}, {max: +`${minMax.slice(-1)}`});
}