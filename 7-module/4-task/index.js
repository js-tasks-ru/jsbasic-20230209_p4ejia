import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.makeHTML();
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.stepsElems = this.sliderSteps.querySelectorAll('span');
    this.valueElem = this.elem.querySelector('.slider__value');
    // this.dragging = false;
    this.addListeners();
    this.changeSlider(value);
  }
  
  makeHTML() {
    this.elem = createElement(`
    <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
  }

  addListeners() {
    this.thumb.ondragstart = () => false;
    this.elem.onclick = this.onSliderClick;
    // this.elem.addEventListener('click', this.onSliderClick.bind(this));
    this.thumb.onpointerdown = this.onThumbPointerDown;
    // this.thumb.addEventListener('pointerdown', this.onThumbPointerDown.bind(this));
  }

  onSliderClick = event => {
    // onSliderClick(event) {
    if ( event.target.closest('.slider__thumb')) {
      return;
    }
    let xRelative = this.calcNewRelative(event);
    const segment = this.steps - 1;
    const clickX = xRelative * segment;
    let value = Math.round(clickX)
    this.changeSlider(value);
    this.changeEvent();
  }

  onThumbPointerDown = event => {
    // onThumbPointerDown(event) {
    // event.preventDefault();
    // this.dragging = true;
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onThumbPointerMove);
    document.addEventListener('pointerup', this.onThumbPointerUp);
  }

  onThumbPointerMove = event => {
    // onThumbPointerMove(event) {
    // event.preventDefault();
    // if (!this.dragging) {
    //   return;
    // }
    let xRelative = this.calcNewRelative(event);
    let xPerc = xRelative * 100;
    let value = Math.round(xRelative * (this.steps - 1));
    this.changeSlider(value, xPerc);
  }

  onThumbPointerUp = () => {
    // onThumbPointerUp() {
    // if (!this.dragging) {
    //   return;
    // }
    // this.dragging = false;
    document.removeEventListener('pointermove', this.onThumbPointerMove);
    document.removeEventListener('pointerup', this.onThumbPointerUp);
    this.elem.classList.remove('slider_dragging');
    this.setStyles();
    this.changeEvent();
  }

  changeEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    }));
  }
  
  changeSlider(value, xPerc=false) {
    this.makeValue(value);
    this.activeStep();
    this.setStyles(xPerc);
  }

  makeValue(value) {
    this.value = value;
    this.valueElem.innerHTML = this.value;
  }

  activeStep() {
    this.stepsElems.forEach((step, i) => {
      if (i === this.value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
  }

  setStyles(xPerc=false) {
    xPerc = xPerc || this.calcProgressLeft();
    this.thumb.style.left = `${xPerc}%`;
    this.progress.style.width = `${xPerc}%`;
  }
  
  calcProgressLeft() {
    return Math.round(100 / (this.steps - 1) * this.value)
  }
  
  calcNewRelative(event) {
    let sliderRect = this.elem.getBoundingClientRect();
    let pointerX = event.clientX - sliderRect.left;
    let xRelative = pointerX / this.elem.offsetWidth;
    if (xRelative < 0) {
      xRelative = 0;
    } else if (xRelative > 1) {
      xRelative = 1;
    }
    return xRelative;
  }

}
