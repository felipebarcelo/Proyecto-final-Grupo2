document.addEventListener("DOMContentLoaded", function () {
  // --- CHECK DE SESIÓN ---
  const protectedPages = ["index.html", "productos.html", "perfil.html"];
  let currentPage = window.location.pathname.split("/").pop().toLowerCase();

  // Si accede a la raíz, asumimos index.html
  if (currentPage === "" || currentPage === "/" || currentPage === undefined) {
    currentPage = "index.html";
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log("Página actual:", currentPage);
  console.log("¿Sesión iniciada?:", isLoggedIn);

  // Si está en una página protegida y no ha iniciado sesión, redirige al login
  if (protectedPages.includes(currentPage) && isLoggedIn !== "true") {
    console.log("No hay sesión, redirigiendo a login.html");
    window.location.replace("login.html");
    return;
  }

  // Si está en login y ya inició sesión, redirige a la portada
  if (currentPage === "login.html" && isLoggedIn === "true") {
    console.log("Ya hay sesión, redirigiendo a index.html");
    window.location.replace("index.html");
    return;
  }

  // --- LOGIN ---
const form = document.getElementById("login-form");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Completa usuario y contraseña");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        alert("Credenciales incorrectas");
        return;
      }

      const data = await res.json();
      
      // Guardar token en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("userEmail", username);

      window.location.replace("index.html");
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  });
}


  // --- LOGOUT ---
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userEmail"); // agregamos: limpiamos el email/usuario mostrado

      console.log("Sesión cerrada, redirigiendo a login.html");
      window.location.replace("login.html");
    });
  }

  // Mostrar nombre de usuario en la navbar
  const userDisplay = document.getElementById("user-display");
  if (userDisplay) {
    const username = localStorage.getItem("username");
    if (username) {
      userDisplay.textContent = username;
      userDisplay.style.display = "inline";
    } else {
      userDisplay.style.display = "none";
    }
  }
});
// agregamos: mostrar el email/usuario en el dropdown
document.addEventListener("DOMContentLoaded", () => {
  const userEmailMenu = document.getElementById("userEmailMenu");
  const user = localStorage.getItem("userEmail"); // clave que guardamos al hacer login

  if (userEmailMenu && user) {
    userEmailMenu.textContent = user;
  }
});

// --- Sincronizamos email mostrado y botones de menú (agregamos) ---
document.addEventListener("DOMContentLoaded", () => {
  // mostramos el correo/usuario en barra o menú
  const email = localStorage.getItem("userEmail") || localStorage.getItem("username") || "";
  const emailBar = document.getElementById("userEmail");
  const emailMenu = document.getElementById("userEmailMenu");

  if (emailBar) emailBar.textContent = email;
  if (emailMenu) emailMenu.textContent = email;

  // unificamos logout (barra y menú)
  const doLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    window.location.replace("login.html");
  };

  const logoutBtnMenu = document.getElementById("logout-btn-menu");
  if (logoutBtnMenu) logoutBtnMenu.addEventListener("click", doLogout);

  // conectamos "Mi perfil" para redirigir siempre
  const goProfile = document.getElementById("go-profile");
  if (goProfile) {
    goProfile.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "my-profile.html";
    });
  }
});

// Aplicar imagen de perfil guardada (por usuario o global) a todos los avatares
document.addEventListener('DOMContentLoaded', () => {
  const sessionUser = localStorage.getItem('userEmail') || localStorage.getItem('username') || '';
  let profileImg = null;
  if (sessionUser) profileImg = localStorage.getItem(`profileImage_${sessionUser}`);
  if (!profileImg) profileImg = localStorage.getItem('profileImage');

  if (!profileImg) return; // Si no hay imagen guardada, salimos

  const applyToAvatars = (src) => {
    const avatars = document.querySelectorAll('img[alt="Perfil"]');
    if (!avatars || avatars.length === 0) return false;
    avatars.forEach(img => {
      img.src = src;
      img.style.objectFit = 'cover';
      img.style.width = img.width ? img.width + 'px' : '40px';
      img.style.height = img.height ? img.height + 'px' : '40px';
      img.style.borderRadius = '50%';
      img.style.display = 'inline-block';
    });
  };
  applyToAvatars(profileImg);
});