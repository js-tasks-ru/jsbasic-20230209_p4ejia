import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.makeHTML();
  }
  
  makeHTML() {
    let html = createElement(
      `
      <div class="modal">
        <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
    
              <h3 class="modal__title">
              </h3>
            </div>
    
            <div class="modal__body">
            </div>
          </div>  
      </div>
      `
    );
    return html;
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.body.addEventListener('click', this.closeModal.bind(this));
    document.body.addEventListener('keydown', this.closeModal.bind(this));
  }
  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').append(node);
  }

  closeModal(evt) {
    if (evt.target.closest('.modal__close') || evt.code === 'Escape') {
      this.close();
    }
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open')
  }
}
