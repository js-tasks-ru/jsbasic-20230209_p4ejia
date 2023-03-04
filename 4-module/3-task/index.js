function highlight(table) {
  let arrTable = [];

  for (let elem of table.rows[0].children) {
    arrTable.push(elem.innerHTML);
  }
  
  let status = arrTable.indexOf('Status');

  for (let row of table.tBodies[0].rows) {
  
    if (row.cells[status].hasAttribute('data-available')) {
      row.cells[status].dataset.available == 'true' ?
      row.classList.add('available') :
      row.classList.add('unavailable')
    } else {
    row.setAttribute('hidden', true);
    }
  
    let age = arrTable.indexOf('Age');
    if (row.cells[age].innerHTML < 18) {
      row.style = 'text-decoration: line-through';
    }
    
    let gender = arrTable.indexOf('Gender');
    row.cells[gender].innerHTML == 'm' ?
    row.classList.add('male') :
    row.classList.add('female');

  }
}

