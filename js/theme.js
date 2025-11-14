// Función para manejar el modo oscuro
function handleDarkMode() {
    const themeBtn = document.getElementById('themeBtn');
    const darkMode = localStorage.getItem('darkMode');
    if(!themeBtn) return;
    
    // Aplicar modo oscuro si estaba activo
    if (darkMode === 'true') {
        document.body.classList.add('dark');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Agregar evento click al botón
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        
        // Guardar preferencia en localStorage
        localStorage.setItem('darkMode', isDark);
        
        // Cambiar icono según el modo
        themeBtn.innerHTML = isDark 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// Inicializar cuando el DOM esté cargado

document.addEventListener('DOMContentLoaded', handleDarkMode);