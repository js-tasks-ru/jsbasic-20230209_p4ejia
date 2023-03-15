import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.makeCarousel();
    this.addEventListener();
  }
  makeCarousel() {
    let html = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      ${this.makeSlides(this.slides)}

    </div>
    `);
    return html;
  }

  makeSlides(slides) {
    let slidesHTML = '';
    slides.map(slide => {
      slidesHTML += `
        <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
    </div>
    `;
    });
    let carouselSlides = `<div class="carousel__inner">${slidesHTML}</div>`
    return carouselSlides;
  }
  
  addEventListener() {
    const btnPrev = this.elem.querySelector('.carousel__arrow_left');
    const btnNext = this.elem.querySelector('.carousel__arrow_right');
    let allSlides = this.slides.length;
    let change = 0;
    btnPrev.style.display = 'none';

    this.elem.addEventListener('click', ({target}) => {
      const image = this.elem.querySelector('.carousel__inner');
      let width = image.offsetWidth;
      let maxTurn = width * (allSlides - 1);

      if (target.closest('.carousel__arrow_right')) {
        image.style.transform = `translateX(${change -= width}px)`;
        btnPrev.style.display = '';
        if (change * -1 === maxTurn) {
          btnNext.style.display = 'none';
        }
      }
  
      if (target.closest('.carousel__arrow_left')) {
        image.style.transform = `translateX(${change += width}px)`;
        btnNext.style.display = '';
        if (change === 0) {
          btnPrev.style.display = 'none';
        }
      }

      let addBtn = target.closest('.carousel__button'); 
      if (addBtn) {
        let customEvt = new CustomEvent("product-add", { 
        detail: addBtn.closest('.carousel__slide').dataset.id,
        bubbles: true
        });
        this.elem.dispatchEvent(customEvt);
      }
    });
  }
}
