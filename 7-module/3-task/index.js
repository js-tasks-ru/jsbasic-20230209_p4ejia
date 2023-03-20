import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.makeHTML();
    this.addEventListener();
  }

  makeHTML() {
    let html = createElement(
      `
      <div class="slider">
        <div class="slider__thumb" style="left: ${(100 / (this.steps - 1)) * this.value};">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: ${(100 / (this.steps - 1)) * this.value};"></div>
        ${this.makeSpan(this.steps)}
      </div>  
      `
    );
    return html;
  }

  makeSpan(steps) {
  let spanHTML = '';
    for (let i = 0; i < steps; i++) {
      spanHTML += '<span></span>';
    }
    let sliderSpan = `<div class="slider__steps">${spanHTML}</div>`;
    return sliderSpan;
  }

  addEventListener() {
    let activeStep = this.elem.querySelector('.slider__steps');
    let activeStepSpan = activeStep.querySelectorAll('span');
    activeStepSpan[0].classList.add('slider__step-active');
    this.elem.addEventListener('click', (evt) => {
      let left = evt.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let value = Math.round(leftRelative * segments);
      let valuePercents = value / segments * 100;
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      activeStepSpan.forEach(elm => {elm.classList.remove('slider__step-active')});
      activeStepSpan[value].classList.add('slider__step-active');
      this.elem.querySelector('.slider__value').innerHTML = value;
      thumb.style.left = (value == 0 ? 0 : `${valuePercents}%`);
      progress.style.width = (value == 0 ? 0 : `${valuePercents}%`);
      this.elem.dispatchEvent(new CustomEvent('slider-change', { 
        detail: value,
        bubbles: true
      }));
    });
    
    
  }
}
