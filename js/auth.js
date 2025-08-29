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
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      // Validación: solo verifica que los campos no estén vacíos
      if (user.trim() !== "" && pass.trim() !== "") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", user.trim());
        console.log("Sesión guardada, redirigiendo a index.html");
        window.location.replace("index.html");
      } else {
        alert("Completa usuario y contraseña");
      }
    });
  }

  // --- LOGOUT ---
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
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
// --- Sincronizamos email y control de sesión ---
document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("userEmail") || "";

  // mostramos el correo en la barra o en el menú, según corresponda
  const emailBar = document.getElementById("userEmail");
  const emailMenu = document.getElementById("userEmailMenu");
  if (emailBar) emailBar.textContent = email;
  if (emailMenu) emailMenu.textContent = email;

  // unificamos la acción de cerrar sesión
  const doLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.replace("login.html");
  };

  // conectamos botones de logout (barra y menú)
  const logoutBtn = document.getElementById("logout-btn");
  const logoutBtnMenu = document.getElementById("logout-btn-menu");
  if (logoutBtn) logoutBtn.addEventListener("click", doLogout);
  if (logoutBtnMenu) logoutBtnMenu.addEventListener("click", doLogout);

  // conectamos la opción "Mi perfil" para redirigir siempre
  const goProfile = document.getElementById("go-profile");
  if (goProfile) {
    goProfile.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "my-profile.html";
    });
  }
});
// conectamos "Mi perfil" para navegar siempre (agregamos)
document.addEventListener("DOMContentLoaded", () => {
  const goProfile = document.getElementById("go-profile");
  if (goProfile) {
    goProfile.addEventListener("click", (e) => {
      e.preventDefault();                  // evitamos interferencias
      window.location.href = "my-profile.html"; // redirigimos al perfil
    });
  }
});
