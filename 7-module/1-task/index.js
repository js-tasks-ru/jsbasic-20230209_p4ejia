import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.makeRibbon();
    this.addEventListener();
  }
  makeRibbon() {
    let html = createElement(
      `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ${this.makeNav(this.categories)}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
    );
    return html;
  }

  makeNav(categories) {
    let navHTML = '';
    categories.map(cat => {
      navHTML += `
        <a href="#" class="ribbon__item" data-id="${cat.id}">${cat.name}</a>
        `;
    });
    let ribbonNav = `<nav class="ribbon__inner">${navHTML}</nav>`
    return ribbonNav;
  }

  addEventListener() {
    const btnPrev = this.elem.querySelector('.ribbon__arrow_left');
    const btnNext = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    let sWidth = ribbonInner.scrollWidth;
    let sLeft = ribbonInner.scrollLeft;
    let cWidth = ribbonInner.clientWidth;
    let sRight = sWidth - sLeft - cWidth
    btnNext.classList.add('ribbon__arrow_visible');
    
    this.elem.addEventListener('click', (evt) => {
    
      if (evt.target.closest('.ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
        btnPrev.classList.add('ribbon__arrow_visible');
      }

      if (evt.target.closest('.ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
        btnNext.classList.add('ribbon__arrow_visible');
      }
      
      let selectLink;

      let ribbonSlct = evt.target.closest('.ribbon__item');

      if (ribbonSlct) {
        evt.preventDefault();
        if (selectLink) {
          this.selectLink.classList.remove('ribbon__item_active');
        }
        this.selectLink = ribbonSlct;
        this.selectLink.classList.add('ribbon__item_active');

        let id = ribbonSlct.closest(`[data-id]`).dataset.id;
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: id,
          bubbles: true
        }));
      }
    }); 
   
    this.elem.addEventListener('scroll', () => {
      if (sLeft === 0) {
          btnPrev.classList.remove('ribbon__arrow_visible');
      }

      if (sRight < 1) {
          btnNext.classList.remove('ribbon__arrow_visible');
      }
    });
  }
}