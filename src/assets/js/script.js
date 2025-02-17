document.addEventListener('DOMContentLoaded', () => {
  // Obtener la ruta actual (sin el dominio ni el query string)
  var currentPath = window.location.pathname;

  // Función para marcar el enlace actual en el menú
  function markCurrentLink(menu) {
    if (!menu) return;

    var links = menu.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      var linkPath = new URL(links[i].href).pathname;
      if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
        links[i].classList.add('current');
      }
    }
  }

  var mainMenuHome = document.getElementById('main-menu-home');
  var mainMenu = document.getElementById('main-menu');
  if (mainMenuHome) markCurrentLink(mainMenuHome);
  else if (mainMenu) markCurrentLink(mainMenu);

  var footerMenu = document.getElementById('footer-menu');
  if (footerMenu) markCurrentLink(footerMenu);

  // Manejo del submenú desplegable de página categorías
  document.querySelectorAll('.toggle-submenu').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      let submenu = this.nextElementSibling;
      document.querySelectorAll('.submenu.visible').forEach(openSubmenu => {
        if (openSubmenu !== submenu) openSubmenu.classList.remove('visible');
      });
      submenu.classList.toggle('visible');
    });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const closeButton = document.querySelector('.close-btn');
  const navUl = document.querySelector(`#${mainMenuHome ? 'main-menu-home' : 'main-menu'} ul`);

  if (menuToggle && closeButton && navUl) {
    menuToggle.addEventListener('click', () => {
      navUl.classList.toggle('is-visible');
      closeButton.style.display = navUl.classList.contains('is-visible') ? 'block' : 'none';
    });
    closeButton.addEventListener('click', () => {
      navUl.classList.remove('is-visible');
      closeButton.style.display = 'none';
    });
  }

  // Manejo del botón "scroll to top"
  const btnScrollTop = document.getElementById("btn-scroll-top");
  if (btnScrollTop) {
    btnScrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", () => {
      btnScrollTop.classList.toggle("hidden", window.pageYOffset <= 500);
    });
  }

  // Verificar si el botón "scroll-down-arrow" existe antes de añadir el event listener
  const scrollDownArrow = document.querySelector('.scroll-down-arrow');
  if (scrollDownArrow) {
    scrollDownArrow.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(scrollDownArrow.getAttribute('href'));

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  } else {
    console.log('No se encontró el botón scroll-down-arrow');
  }



  // Verificar si el carrusel está presente antes de inicializar
  const slides = document.querySelectorAll('.carousel-item');

  if (slides.length > 0) {
    let slideIndex = 0;

    function showSlide(index) {
      if (index >= slides.length) slideIndex = 0;
      else if (index < 0) slideIndex = slides.length - 1;

      slides.forEach(slide => slide.classList.remove('active'));
      slides[slideIndex].classList.add('active');
    }

    function moveSlide(direction) {
      slideIndex += direction;
      showSlide(slideIndex);
    }

    showSlide(slideIndex);

    setInterval(() => {
      moveSlide(1);
    }, 3000);

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => moveSlide(-1));
      nextButton.addEventListener('click', () => moveSlide(1));
    }
  } else {
  }

  // Inicialización de AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  }

});
