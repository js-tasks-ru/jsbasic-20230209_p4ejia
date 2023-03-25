import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || typeof product !== 'object') {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (!cartItem) {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count === 0) {
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      }
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.count);
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.cartContent = document.createElement("div");

    for (let {product, count} of this.cartItems) {
      const productCard = this.renderProduct(product, count);
      this.cartContent.append(productCard);
    }

    const orderForm = this.renderOrderForm();
    this.cartContent.append(orderForm);
    this.cartContent.addEventListener('click', (event) => {
      if (event.target.closest('.cart-counter__button')) {
        const productElem = event.target.closest('[data-product-id]');
        const productId = productElem.dataset.productId;
        this.updateProductCount(
          productId, 
          event.target.closest('.cart-counter__button_plus') ? 1 : -1
        );
      }
    });

    const form = this.cartContent.querySelector('.cart-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });

    this.modal.setBody(this.cartContent);
    this.modal.elem.addEventListener('modal-close', () => {
      this.modal = null;
      cartContent = null;
    });
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    let modalBody = document.querySelector('.modal__body');
    if (this.getTotalCount() === 0) {
      this.modal.close();
      return;
    }

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target.closest('.cart-form');
    let submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.classList.add('is-loading');
    const formData = new FormData(form);
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          this.cartContent
            .querySelector('button[type="submit"]')
            .classList.remove("is-loading");
          this.cartItems = [];
          this.cartIcon.update(this);
          this.cartContent.innerHTML = `
            <div class='modal__body-inner'>
              <p>
                Order successful! Your order is being cooked :) <br>
                We'll notify you about delivery time shortly.<br>
                <img src='/assets/images/delivery.gif'>
              </p>
            </div>
          `;
          } else {
          throw new Error(`Ошибка при отправке данных на сервер: ${response.status}`);
          }
        })
      .catch(error => {
        console.error('Error:', error)
      })
      .finally(() => {
        submitBtn.classList.remove('is-loading')
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}