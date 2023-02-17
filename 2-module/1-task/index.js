function sumSalary(salaries) {
  let sum = 0;

  for (let num in salaries) {
      if (Number.isFinite(salaries[num])) {
      sum += salaries[num];
      }
    }
    return sum;
}