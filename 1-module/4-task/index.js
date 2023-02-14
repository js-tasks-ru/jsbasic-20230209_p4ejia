function checkSpam(str) {
  let strLow = str.toLowerCase();
  if (strLow.includes('1xbet') || str.includes('xxx')) {
    return true;
  }
  return false;
}
