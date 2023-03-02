function makeDiagonalRed(table) {
  
  for (let x = 0; x < table.rows.length; x++) {
    let row = table.rows[x];
    /* row.cells[x].style.backgroundColor = '#ff0000'; так тоже работает, 
    но тест сваливается в ошибку, ожидает имеено 'red' */
    row.cells[x].style.backgroundColor = 'red';
  }
}
