import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const container = document.querySelector('.container');
    let iconTopCoord = this.elem.getBoundingClientRect().top; 
    const iconWidth = this.elem.offsetWidth;
    const windowWidth = document.documentElement.clientWidth;
    
    // Если ширина окна браузера меньше или равна 767px, то перемещать иконку корзины не нужно
    if (windowWidth > 767) {
      // Перемещаем иконку, только если её верхний край зашёл за верхнюю границу экрана
      if (window.pageYOffset > iconTopCoord) {
        let leftIndent = Math.min(
          container.getBoundingClientRect().right + 20, 
          windowWidth - iconWidth - 10
         ) + 'px';
        this.elem.style.position = 'fixed';
        this.elem.style.top = '50px';
        this.elem.style.right = '10px';
        this.elem.style.zIndex = 1e3;
        this.elem.style.left = leftIndent;
      }
    } else {
      // Иначе возвращаем иконку в исходное состояние
      this.elem.style.position = '';
      this.elem.style.top = '';
      this.elem.style.zIndex = '';
      this.elem.style.right = '';
      this.elem.style.left = '';

    }
  }
}