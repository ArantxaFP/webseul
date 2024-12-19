document.addEventListener('DOMContentLoaded', () => {
  // Obtener la ruta actual (sin el dominio ni el query string)
  var currentPath = window.location.pathname;

  // Función para marcar el enlace actual en el menú
  function markCurrentLink(menu) {
    if (!menu) {
      return; // Si el menú no existe, salir de la función
    }

    var links = menu.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
      var linkPath = new URL(links[i].href).pathname; // Obtener solo la ruta

      // Normalizar y comparar las rutas
      if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
        links[i].classList.add('current');
      }
    }
  }

  // Seleccionar el menú que esté disponible en la página actual
  var mainMenuHome = document.getElementById('main-menu-home');
  var mainMenu = document.getElementById('main-menu');

  // Marcar enlaces actuales en el menú que exista
  if (mainMenuHome) {
    markCurrentLink(mainMenuHome);
  } else if (mainMenu) {
    markCurrentLink(mainMenu);
  }

  // Marcar enlaces actuales en el footer (si aplica)
  var footerMenu = document.getElementById('footer-menu');
  if (footerMenu) {
    markCurrentLink(footerMenu);
  }

  // Manejo del submenú desplegable de miembros
  document.querySelectorAll('.toggle-submenu').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      let submenu = this.nextElementSibling;

      // Cerrar otros submenús si ya están abiertos
      document.querySelectorAll('.submenu.visible').forEach(function (openSubmenu) {
        if (openSubmenu !== submenu) {
          openSubmenu.classList.remove('visible');
        }
      });

      // Alternar visibilidad del submenú actual
      submenu.classList.toggle('visible');
    });
  });

  // Manejo del menú en móvil (para header y componente)
  const menuToggle = document.querySelector('.menu-toggle');
  const closeButton = document.querySelector('.close-btn');
  const navUl = document.querySelector(`#${mainMenuHome ? 'main-menu-home' : 'main-menu'} ul`);

  if (menuToggle && closeButton && navUl) {
    menuToggle.addEventListener('click', () => {
      navUl.classList.toggle('is-visible');
      closeButton.style.display = navUl.classList.contains('is-visible') ? 'block' : 'none'; // Mostrar/ocultar botón de cierre
    });

    closeButton.addEventListener('click', () => {
      navUl.classList.remove('is-visible');
      closeButton.style.display = 'none'; // Oculta el botón de cierre
    });
  }

  // Manejo del botón "scroll to top"
  const btnScrollTop = document.getElementById("btn-scroll-top");
  if (btnScrollTop) {
    btnScrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        btnScrollTop.classList.remove("hidden");
      } else {
        btnScrollTop.classList.add("hidden");
      }
    });
  }

  // Manejo del botón "scroll to intro home"
  const scrollDownArrow = document.querySelector('.scroll-down-arrow');

  // Verificar si el botón existe antes de agregar el event listener
  if (scrollDownArrow) {
    scrollDownArrow.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(scrollDownArrow.getAttribute('href'));

      // Verificar si el destino existe antes de hacer scroll
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Funciones del carrusel
  let slideIndex = 0;

  function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    
    // Aseguramos que el índice esté dentro de los límites
    if (index >= slides.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    }

    // Ocultar todas las imágenes
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Mostrar la imagen seleccionada
    slides[slideIndex].classList.add('active');
  }

  function moveSlide(direction) {
    slideIndex += direction;
    showSlide(slideIndex);
  }

  // Inicializar el carrusel
  showSlide(slideIndex);

  // Cambio automático cada 3 segundos
  setInterval(() => {
    moveSlide(1);
  }, 3000);

  // Obtener los botones
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  
  // Verificar que los botones estén disponibles
  if (prevButton && nextButton) {
    // Asignar los eventos a los botones prev/next usando addEventListener
    prevButton.addEventListener('click', function () {
      moveSlide(-1); // Mueve el carrusel hacia atrás
    });

    nextButton.addEventListener('click', function () {
      moveSlide(1); // Mueve el carrusel hacia adelante
    });
  } else {
    console.log('No se encontraron los botones prev o next');
  }

  // Iniciar AOS (si está presente)
  AOS.init();

});
