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
      console.log("Sesión cerrada, redirigiendo a login.html");
      window.location.replace("login.html");
    });
  }
});