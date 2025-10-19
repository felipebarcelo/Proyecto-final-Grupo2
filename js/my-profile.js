// js/my-profile.js
(() => {
    const PROFILE_KEY = 'emercado_profile';

    // Obtiene un email desde lo que dejó el login en localStorage
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

    // 2) Vista previa de imagen y preparación para persistirla
    let selectedDataUrl = null;

    // Cargar imagen guardada para el usuario (si existe)
    (function loadSavedAvatar() {
        const sessionUser = getSessionEmail();
        let img = null;
        if (sessionUser) img = localStorage.getItem(`profileImage_${sessionUser}`);
        if (!img) img = localStorage.getItem('profileImage');
        if (img && avatarPreview) avatarPreview.src = img;
    })();

    avatarInput?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            selectedDataUrl = reader.result;
            if (avatarPreview) avatarPreview.src = selectedDataUrl;
        };
        reader.readAsDataURL(file);
    });

    // 3) Guardar perfil en localStorage (con imagen por usuario si fue seleccionada)
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim()
        };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data));

        // si hay imagen seleccionada, guardarla por usuario
        const sessionUser = getSessionEmail();
        if (selectedDataUrl) {
            try {
                if (sessionUser) {
                    localStorage.setItem(`profileImage_${sessionUser}`, selectedDataUrl);
                } else {
                    localStorage.setItem('profileImage', selectedDataUrl);
                }
                // actualizar todos los avatares en la página 
                document.querySelectorAll('img[alt="Perfil"]').forEach(i => {
                    i.src = selectedDataUrl;
                    i.style.objectFit = 'cover';
                    i.style.width = i.width ? i.width + 'px' : '40px';
                    i.style.height = i.height ? i.height + 'px' : '40px';
                    i.style.borderRadius = '50%';
                    i.style.display = 'inline-block';
                });
            } catch (err) {
                console.error('No se pudo guardar la imagen en localStorage:', err);
                alert('La imagen es demasiado grande para guardarse localmente. Intenta con una imagen más chica.');
            }
        }

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
