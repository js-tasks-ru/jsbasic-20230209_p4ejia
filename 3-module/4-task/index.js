function showSalary(users, age) {
  return users
  .filter(arr => arr.age <= age)
  .map(arr => `${arr.name}, ${arr.balance}`)
  .join('\n');
}