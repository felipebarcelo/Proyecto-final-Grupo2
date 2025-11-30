const loginForm = document.getElementById("login-form");

// Mostrar mensaje de error
function showError(message) {
    // Buscar si ya existe un mensaje de error
    let errorDiv = document.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.textAlign = 'center';
        loginForm.appendChild(errorDiv);
    }

    errorDiv.textContent = message;

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        errorDiv.textContent = '';
    }, 5000);
}

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar que los campos no estén vacíos
    if (!username || !password) {
        showError("Debes completar Usuario y Contraseña");
        return;
    }

    try {
        // Hacer petición al endpoint de login
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Guardar el token en localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userEmail', username);
            localStorage.setItem('isLoggedIn', 'true');

            // Redirigir a la página principal
            window.location.href = "index.html";
        } else {
            // Mostrar error de credenciales incorrectas
            showError(data.error || "Credenciales incorrectas");
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        showError("Error al conectar con el servidor. Por favor intenta nuevamente.");
    }
});
