function getMinMax(str) {
  let num = str.split(' ')
  .filter(item => isFinite(item));
  
  return Object.assign({}, {min: +`${Math.min(...num)}`}, {max: +`${Math.max(...num)}`});
}