/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table'); 
    this.makeHTML(rows);
    this.addEventListener();
  }

  makeHTML(rows) {
    let html = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    `

  for (let row of rows) {
    html += `
    <tr>
      <th>${row.name}</th>
      <th>${row.age}</th>
      <th>${row.salary}</th>
      <th>${row.city}</th>
      <th><button>x</button></th>
    </tr>
    `
  }
  this.elem.innerHTML = html;
  }

  addEventListener() {
    this.elem.addEventListener('click', event => event.target.closest('tr').remove())
  }

}

