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

  AOS.init();

});
