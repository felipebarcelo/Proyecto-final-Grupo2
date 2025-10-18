// js/my-profile.js
(() => {
    const PROFILE_KEY = 'emercado_profile';

    // Obtiene un email desde lo que dejó el login en localStorage (ajusta si usás otra clave)
    const getSessionEmail = () =>
        localStorage.getItem('userEmail') ||
        localStorage.getItem('username') ||
        localStorage.getItem('user') ||
        '';

    // Elementos del DOM
    const form = document.getElementById('profileForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');

    // 1) Cargar datos guardados; si no hay, precargar email de sesión (primera vez)
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            firstName.value = data.firstName || '';
            lastName.value = data.lastName || '';
            email.value = data.email || '';
            phone.value = data.phone || '';
        } catch { }
    } else {
        email.value = getSessionEmail();
    }

    // 2) Solo vista previa de imagen (NO se persiste)
    avatarInput?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { avatarPreview.src = reader.result; };
        reader.readAsDataURL(file);
    });

    // 3) Guardar perfil en localStorage (sin imagen)
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim()
        };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data));

        // feedback rápido en el botón
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerText;
        btn.disabled = true; btn.innerText = 'Guardado ✓';
        setTimeout(() => { btn.disabled = false; btn.innerText = original; }, 1200);
    });

    // 4) Hacer clic en el texto para abrir el selector de archivos
    document.querySelector('label[for="avatarInput"]')?.addEventListener('click', () => {
        avatarInput.click();
    });
})();
