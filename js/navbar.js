// navbar.js - Componente de navegación responsive con menú hamburguesa

function createNavbar() {
  const navbarHTML = `
    <style>
    #cart-dropdown:hover #cart-preview {
  display: block !important;
}

#cart-preview div.item {
  padding: 8px 12px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

#cart-preview div.item:last-child {
  border-bottom: none;
}

      /* Estilos para la navbar responsive */
      .navbar-mobile-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }

      .navbar-mobile-overlay.active {
        display: block;
      }

      .navbar-mobile-menu {
        position: fixed;
        top: 0;
        left: -100%;
        width: 280px;
        height: 100%;
        background: white;
        z-index: 1000;
        transition: left 0.3s ease;
        overflow-y: auto;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      }

      .navbar-mobile-menu.active {
        left: 0;
      }

      .navbar-mobile-header {
        background: linear-gradient(90deg, #FF8C00 0%, #FFA500 100%);
        padding: 20px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .navbar-mobile-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }

      .navbar-mobile-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .navbar-mobile-user {
        padding: 20px;
        border-bottom: 1px solid #E5E7EB;
        background: #F9FAFB;
      }

      .navbar-mobile-links {
        padding: 10px 0;
      }

      .navbar-mobile-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        color: #374151;
        text-decoration: none;
        transition: background 0.2s;
        border: none;
        width: 100%;
        text-align: left;
        background: transparent;
        cursor: pointer;
        font-size: 15px;
      }

      .navbar-mobile-link:hover {
        background: #F3F4F6;
      }

      .navbar-mobile-link.logout {
        color: #DC2626;
        border-top: 1px solid #E5E7EB;
        margin-top: 10px;
      }

      .navbar-mobile-link.logout:hover {
        background: #FEF2F2;
      }

      @media (max-width: 768px) {
        .navbar-desktop-links {
          display: none !important;
        }

        .navbar-hamburger {
          display: flex !important;
        }

        .navbar-desktop-user {
          display: none !important;
        }
      }

      @media (min-width: 769px) {
        .navbar-hamburger {
          display: none !important;
        }
      }
    </style>

    <nav style="background: linear-gradient(90deg, #FF8C00 0%, #FFA500 100%); padding: 12px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
        
        <!-- Menú Hamburguesa (Solo móvil) -->
        <button id="navbar-hamburger" class="navbar-hamburger" style="display: none; background: rgba(255,255,255,0.2); border: none; color: white; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; align-items: center; justify-content: center; transition: background 0.2s;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <!-- Logo/Links de navegación (Desktop) -->
        <div class="navbar-desktop-links" style="display: flex; align-items: center; gap: 40px;">
          <a href="index.html" style="color: white; text-decoration: none; font-weight: 600; font-size: 18px; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
            Inicio
          </a>
          <a href="categories.html" style="color: white; text-decoration: none; font-weight: 600; font-size: 18px; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
            Categorías
          </a>
          <a href="sell.html" style="color: white; text-decoration: none; font-weight: 600; font-size: 18px; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
            Vender
          </a>
        </div>

        <!-- Logo en móvil (centrado) -->
        <div style="display: none; color: white; font-weight: 700; font-size: 20px; position: absolute; left: 50%; transform: translateX(-50%);">
          <span style="display: block;" class="navbar-mobile-logo">E-mercado</span>
        </div>

        <!-- Carrito y Usuario (Desktop) -->
        <div style="display: flex; align-items: center; gap: 20px;">
          
        
         <!-- Carrito con dropdown al hover -->
<div id="cart-dropdown" style="position: relative;">

  <a id="cart-icon" style="position: relative; color: white; text-decoration: none; transition: transform 0.2s; cursor:pointer;"
     onmouseover="this.style.transform='scale(1.1)'"
     onmouseout="this.style.transform='scale(1)'">

    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>

    <span id="cart-count"
          style="position: absolute; top: -8px; right: -8px; background: #DC2626; color: white;
          border-radius: 50%; width: 20px; height: 20px; display: none;
          align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">
      0
    </span>
  </a>

  <!-- DROPDOWN -->
  <div id="cart-preview"
       style="
        position: absolute;
        right: 0;
        top: 40px;
        background: white;
        width: 260px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        display: none;
        max-height: 300px;
        overflow-y: auto;
        z-index: 2000;
       ">
    <p class="text-center text-muted" style="padding: 10px;">Carrito vacío</p>
  </div>
</div>


          <!-- Usuario Dropdown (Solo Desktop) -->
          <div class="navbar-desktop-user" style="position: relative;">
            <button id="user-menu-btn" style="background: rgba(255,255,255,0.2); border: 2px solid white; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; padding: 0;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
              <img id="navbar-avatar-desktop" src="img/img_perfil.png" alt="Perfil" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            </button>

            <!-- Dropdown Menu -->
            <div id="user-dropdown" style="position: absolute; right: 0; top: 50px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 220px; display: none; z-index: 1000; overflow: hidden;">
              
              <!-- Email del usuario -->
              <div style="padding: 16px; border-bottom: 1px solid #E5E7EB; background: #F9FAFB;">
                <p style="margin: 0; font-size: 14px; color: #6B7280; font-weight: 500;">Conectado como:</p>
                <p id="userEmailMenu" style="margin: 4px 0 0 0; font-size: 14px; color: #111827; font-weight: 600; word-break: break-all;">usuario@email.com</p>
              </div>

              <!-- Mi Perfil -->
              <a id="go-profile-desktop" href="my-profile.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #374151; text-decoration: none; transition: background 0.2s; border: none; width: 100%; text-align: left; cursor: pointer; background: transparent;" onmouseover="this.style.background='#F3F4F6'" onmouseout="this.style.background='transparent'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span style="font-size: 14px; font-weight: 500;">Mi Perfil</span>
              </a>

              <!-- Cerrar Sesión -->
              <button id="logout-btn-desktop" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #DC2626; border: none; width: 100%; text-align: left; cursor: pointer; background: transparent; transition: background 0.2s; font-size: 14px; font-weight: 500;" onmouseover="this.style.background='#FEF2F2'" onmouseout="this.style.background='transparent'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          <!-- Toggle Dark Mode (opcional) -->
          <button id="themeBtn" style="background: rgba(0,0,0,0.2); border: none; border-radius: 8px; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; color: white;" onmouseover="this.style.background='rgba(0,0,0,0.3)'" onmouseout="this.style.background='rgba(0,0,0,0.2)'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Overlay para el menú móvil -->
    <div id="navbar-mobile-overlay" class="navbar-mobile-overlay"></div>

    <!-- Menú lateral móvil -->
    <div id="navbar-mobile-menu" class="navbar-mobile-menu">
      <!-- Header del menú -->
      <div class="navbar-mobile-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img id="navbar-avatar-mobile" src="img/img_perfil.png" alt="Perfil" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid white;">
          <div>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Hola,</p>
            <p id="userEmailMenuMobile" style="margin: 0; font-size: 16px; font-weight: 600;">Usuario</p>
          </div>
        </div>
        <button id="navbar-mobile-close" class="navbar-mobile-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Links del menú -->
      <div class="navbar-mobile-links">
        <a href="index.html" class="navbar-mobile-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span style="font-weight: 500;">Inicio</span>
        </a>

        <a href="categories.html" class="navbar-mobile-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span style="font-weight: 500;">Categorías</span>
        </a>

        <a href="sell.html" class="navbar-mobile-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span style="font-weight: 500;">Vender</span>
        </a>

        <a id="go-profile-mobile" href="my-profile.html" class="navbar-mobile-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span style="font-weight: 500;">Mi Perfil</span>
        </a>

        <button id="logout-btn-mobile" class="navbar-mobile-link logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span style="font-weight: 600;">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  `;

  return navbarHTML;
}

// Inicializar la navbar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Insertar la navbar en el contenedor
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    navbarContainer.innerHTML = createNavbar();
  }

  // Esperar un momento para que el DOM se actualice
  setTimeout(() => {
    initNavbarFunctionality();
  }, 100);
});

function initNavbarFunctionality() {
  // === MENÚ MÓVIL ===
  const hamburger = document.getElementById('navbar-hamburger');
  const mobileMenu = document.getElementById('navbar-mobile-menu');
  const mobileOverlay = document.getElementById('navbar-mobile-overlay');
  const mobileClose = document.getElementById('navbar-mobile-close');

  const openMobileMenu = () => {
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  };

  if (hamburger) {
    hamburger.addEventListener('click', openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Cerrar menú móvil al hacer click en un link
  const mobileLinks = document.querySelectorAll('.navbar-mobile-link');
  mobileLinks.forEach(link => {
    if (!link.id.includes('logout')) {
      link.addEventListener('click', () => {
        setTimeout(closeMobileMenu, 200);
      });
    }
  });

  // === DROPDOWN DESKTOP ===
  const userMenuBtn = document.getElementById('user-menu-btn');
  const userDropdown = document.getElementById('user-dropdown');

  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = userDropdown.style.display === 'block';
      userDropdown.style.display = isVisible ? 'none' : 'block';
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = 'none';
      }
    });
  }

  // === MOSTRAR EMAIL DEL USUARIO ===
  const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('username') || 'Usuario';

  const userEmailMenu = document.getElementById('userEmailMenu');
  const userEmailMenuMobile = document.getElementById('userEmailMenuMobile');

  if (userEmailMenu) userEmailMenu.textContent = userEmail;
  if (userEmailMenuMobile) userEmailMenuMobile.textContent = userEmail;

  // === APLICAR IMAGEN DE PERFIL ===
  const sessionUser = localStorage.getItem('userEmail') || localStorage.getItem('username') || '';
  let profileImg = null;
  if (sessionUser) {
    profileImg = localStorage.getItem(`profileImage_${sessionUser}`);
  }
  if (!profileImg) {
    profileImg = localStorage.getItem('profileImage');
  }

  if (profileImg) {
    const navbarAvatarDesktop = document.getElementById('navbar-avatar-desktop');
    const navbarAvatarMobile = document.getElementById('navbar-avatar-mobile');

    if (navbarAvatarDesktop) navbarAvatarDesktop.src = profileImg;
    if (navbarAvatarMobile) navbarAvatarMobile.src = profileImg;
  }

  // === BOTONES DE MI PERFIL ===
  const goProfileDesktop = document.getElementById('go-profile-desktop');
  const goProfileMobile = document.getElementById('go-profile-mobile');

  if (goProfileDesktop) {
    goProfileDesktop.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'my-profile.html';
    });
  }

  if (goProfileMobile) {
    goProfileMobile.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      setTimeout(() => {
        window.location.href = 'my-profile.html';
      }, 300);
    });
  }

  // === CERRAR SESIÓN ===
  const doLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    window.location.replace('login.html');
  };

  const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
  const logoutBtnMobile = document.getElementById('logout-btn-mobile');

  if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', doLogout);
  if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', doLogout);

  // === ACTUALIZAR CONTADOR DEL CARRITO ===
  updateCartCount();

  // === DARK MODE (OPCIONAL) ===
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    // Verificar el tema guardado
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', savedTheme);

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('darkMode', document.body.classList.contains('dark'));

      // Actualizar el ícono
      const isDark = document.body.classList.contains('dark');
      themeBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });

    // Establecer el ícono inicial
    themeBtn.innerHTML = savedTheme
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // === MOSTRAR LOGO EN MÓVIL ===
  const mobileLogo = document.querySelector('.navbar-mobile-logo');
  if (mobileLogo) {
    const updateLogoVisibility = () => {
      if (window.innerWidth <= 768) {
        mobileLogo.parentElement.style.display = 'block';
      } else {
        mobileLogo.parentElement.style.display = 'none';
      }
    };

    updateLogoVisibility();
    window.addEventListener('resize', updateLogoVisibility);
  }
  // === DROPDOWN DEL CARRITO ===
  function loadCartPreview() {
    const preview = document.getElementById("cart-preview");
    const cart = JSON.parse(localStorage.getItem("cart-products") || "[]");

    if (!preview) return;

    if (cart.length === 0) {
      preview.innerHTML = `<p class="text-center text-muted" style="padding: 10px;">Carrito vacío</p>`;
      return;
    }

    preview.innerHTML = cart
      .map(item => `
      <div class="item">
        <span>${item.name}</span>
        <span>${item.quantity} × ${item.cost}</span>
      </div>
    `)
      .join("") +
      `
    <div style="padding: 10px; text-align:center;">
      <a href="cart.html" style="padding: 6px 12px; background:#FF8C00; color:white; border-radius:6px; display:inline-block;">
        Ver carrito
      </a>
    </div>
    `;
  }

  // Cargar al iniciar
  loadCartPreview();

}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cartCountMobile = document.getElementById('cart-count-mobile');

  // Obtener items del carrito desde localStorage
  const cartItems = JSON.parse(localStorage.getItem('cart-products') || '[]');

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (totalItems > 0) {
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.style.display = 'flex';
    }
    if (cartCountMobile) {
      cartCountMobile.textContent = totalItems;
      cartCountMobile.style.display = 'inline-block';
    }
  } else {
    if (cartCount) cartCount.style.display = 'none';
    if (cartCountMobile) cartCountMobile.style.display = 'none';
  }
}

// Exportar función para actualizar el carrito desde otras páginas
window.updateNavbarCartCount = updateCartCount;
