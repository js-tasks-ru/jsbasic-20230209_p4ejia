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
    document.body.addEventListener('ribbon-select', event => {
      productsGrid.updateFilter({
        category: event.detail
      });
    });
  }
}
