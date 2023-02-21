function camelize(str) {
    return str
    .split('-')
    .map((word, ind) => ind == 0 ? word : word[0].toUpperCase() + word.slice(1))
    .join('');
}