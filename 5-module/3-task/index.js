function initCarousel() {
  let position = 0;
  const carouselInner = document.querySelector('.carousel__inner');

  const btnPrev = document.querySelector('.carousel__arrow_left');
  const btnNext = document.querySelector('.carousel__arrow_right');
  
btnPrev.onclick = function() {
    position -= 1;
    carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * position}px)`;
    btns();
  };

  btnNext.onclick = function() {
    position += 1;
    carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * position}px)`;
    btns();
  };

  const btns = () => {
    if (position == 0) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = '';
    }
    if (position == 3) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = '';
    }
  };
  btns();
}
