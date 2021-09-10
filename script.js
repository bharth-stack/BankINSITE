'use strict';

///////////////////////////////////////
// Modal window
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const imgTargets = document.querySelectorAll('img[data-src]');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(data => {
  data.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we use cookies to generate <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
btnScrollTo.addEventListener('click', e => {
  // const s1Cords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1Cords.left + window.pageXOffset,
  //   top: s1Cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
// document.querySelectorAll('.nav__link').forEach(data => {
//   data.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab ');
  console.log(clicked);
  if (clicked) {
    tabs.forEach(data => {
      data.classList.remove('operations__tab--active');
    });
    clicked.classList.add('operations__tab--active');

    tabsContent.forEach(data => {
      data.classList.remove('operations__content--active');
    });
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

nav.addEventListener('mouseover', function (e) {
  hoverEffect(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  hoverEffect(e, 1);
});

function hoverEffect(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibilings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('.nav__logo');
    sibilings.forEach(data => {
      if (data != link) {
        data.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
}
const initialChord = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialChord.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
function callBack(enteries) {
  const [entry] = enteries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
  const headerObserver = new IntersectionObserver(callBack, {
    root: null,
    threshold: 0.15,
    rootMargin: `-${navHeight}px`,
  });
  headerObserver.observe(header);
}
const sections = document.querySelectorAll('.section');

function slowerBack(a, b) {
  const [sec] = a;
  if (sec.isIntersecting) {
    sec.target.classList.remove('section--hidden');
    b.unobserve(sec.target);
  }
}
const slower = new IntersectionObserver(slowerBack, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (data) {
  slower.observe(data);
  data.classList.add('section--hidden');
});
function loadBack(a, b) {
  const [entry] = a;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
  b.unobserve(entry.target);
}
const loader = new IntersectionObserver(loadBack, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(data => {
  loader.observe(data);
});

const slides = document.querySelectorAll('.slide');
const leftButton = document.querySelector('.slider__btn--left');
const rightButton = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let change = 0;
const maxSlide = slides.length;
function slider(data) {
  slides.forEach((i, j) => {
    i.style.transform = `translateX(${100 * (j - data)}%)`;
  });
}
slider(change);
function nextSlide() {
  if (change == maxSlide - 1) change = 0;
  else change++;
  slider(change);
}
function prevSlide() {
  if (change == 0) change = maxSlide - 1;
  else change--;
  slider(change);
}
leftButton.addEventListener('click', () => {
  prevSlide();
  activeDot(change);
});
rightButton.addEventListener('click', () => {
  nextSlide();
  activeDot(change);
});
document.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowLeft') {
    prevSlide();
    activeDot(change);
  } else if (e.key == 'ArrowRight') {
    nextSlide();
    activeDot(change);
  }
});
const dotSlider = function () {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide=${index}></button>`
    );
  });
};
dotSlider();
const activeDot = function (data) {
  document.querySelectorAll('.dots__dot').forEach(d => {
    d.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${data}"]`)
    .classList.add('dots__dot--active');
};
activeDot(0);

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const chngSlide = e.target.dataset.slide;
    change = chngSlide;
    slider(chngSlide);
    activeDot(chngSlide);
  }
});
//////////////////////////////////////////////
// const random = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + min) + 1;
// };
// const randomColor = () => {
//   return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// h1.firstElementChild.style.color = 'orangered';

// h1.closest('.header').style.background = 'lemonyellow';
console.log(1, ' \n 2', 34, 6);
console.log('hola\ndfsdf');
const a = 1233456789;
console.log(+a);
