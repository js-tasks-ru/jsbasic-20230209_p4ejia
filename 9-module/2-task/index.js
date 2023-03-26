import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // Получаем данные с сервера
  const productsResponse = await fetch('products.json');
  const products = await productsResponse.json();

  // Создаем экземпляры компонентов
  const carousel = new Carousel(slides);
  const ribbonMenu = new RibbonMenu(categories);
  const stepSlider = new StepSlider({steps: 5, value: 3});
  const cartIcon = new CartIcon();
  const cart = new Cart(cartIcon);

  const productsGrid = new ProductsGrid(products);

  // Отрисовываем компоненты на странице
  document.querySelector('[data-carousel-holder]').appendChild(carousel.elem);
  document.querySelector('[data-ribbon-holder]').appendChild(ribbonMenu.elem);
  document.querySelector('[data-slider-holder]').appendChild(stepSlider.elem);
  document.querySelector('[data-cart-icon-holder]').appendChild(cartIcon.elem);
  document.querySelector('[data-products-grid-holder]').appendChild(productsGrid.elem);

  cartIcon.update(cart);

  // Слушаем события изменения значений фильтров
  document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
    productsGrid.updateFilter({
      noNuts: event.target.checked
    });
  });

  document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
    productsGrid.updateFilter({
      vegeterianOnly: event.target.checked
    });
  });

  // Слушаем событие изменения значения слайдера
  stepSlider.elem.addEventListener('slider-change', (event) => {
    productsGrid.updateFilter({
      maxSpiciness: event.detail
    });
  });

  // Слушаем событие добавления товара в корзину
  document.body.addEventListener('product-add', (event) => {
    const productId = event.detail;

    // Находим товар с нужным id
    const productToAdd = products.find(product => product.id === productId);

    if (productToAdd) {
      // Добавляем товар в корзину
      cart.addProduct(productToAdd);
    }
  });
console.log(document.body);
console.log(ribbonMenu.elem);
  document.body.addEventListener('ribbon-select', event => {
    console.log(event.target);
    productsGrid.updateFilter({
      category: event.detail
    });
  });
  //   // Создаем экземпляры компонентов
  //   this.carousel = new Carousel(slides);
  //   this.ribbonMenu = new RibbonMenu(categories);
  //   this.stepSlider = new StepSlider({ steps: 5, value: 3 });
  //   this.cartIcon = new CartIcon();
  //   this.cart = new Cart(this.cartIcon);

  //   // Отрисовываем компоненты на странице
  //   document.querySelector('[data-carousel-holder]').innerHTML = this.carousel.elem.outerHTML;
  //   document.querySelector('[data-ribbon-holder]').innerHTML = this.ribbonMenu.elem.outerHTML;
  //   document.querySelector('[data-slider-holder]').innerHTML = this.stepSlider.elem.outerHTML;
  //   document.querySelector('[data-cart-icon-holder]').innerHTML = this.cartIcon.elem.outerHTML;

  //   // Получаем список товаров и отображаем их
  //   const productsData = await fetch('products.json').then(response => response.json());
  //   this.productsGrid = new ProductsGrid(productsData);
  //   document.querySelector('[data-products-grid-holder]').innerHTML = this.productsGrid.elem.outerHTML;

  //   // Обработчики событий
  //   const nutsCheckbox = document.getElementById('nuts-checkbox');
  //   const vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

  //   document.body.addEventListener('product-add', (event) => {
  //     const productId = event.detail; //.productId;
  //     const product = productsData.find((p) => p.id === productId);
  //     this.cart.addProduct(product);
  //   });

  //     const filterCheckboxes = document.querySelectorAll('.filters-checkbox');
  //     filterCheckboxes.forEach(checkbox => {
  //       checkbox.addEventListener('change', () => {
  //         this.productsGrid.updateFilter({
  //           noNuts: nutsCheckbox.checked,
  //           vegeterianOnly: vegeterianCheckbox.checked,
  //           maxSpiciness: this.stepSlider.value,
  //           category: this.ribbonMenu.value
  //         });
  //       });
  //     });

  //     document.body.addEventListener('slider-change', event => {
  //       this.productsGrid.updateFilter({
  //         maxSpiciness: event.detail, //.value,
  //         noNuts: nutsCheckbox.checked,
  //         vegeterianOnly: vegeterianCheckbox.checked,
  //         category: this.ribbonMenu.value
  //         });
  //       });

  //       document.body.addEventListener('ribbon-select', event => {
  //         this.productsGrid.updateFilter({
  //           category: event.detail
  //         });
  //       });   

  //   // Возвращаем промис, который будет разрешен после отрисовки всех компонентов
  //   return Promise.resolve();
  }
}
