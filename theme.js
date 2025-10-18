const body = document.body;
const themeBtn = document.getElementById('themeBtn');

const themeGuardado = localStorage.getItem('theme');
if(themeGuardado === 'dark') {
    body.classList.add('dark');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i>';
} else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon" style="color: #ffffff;"></i>';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark')
    const estaOscuro = body.classList.contains('dark');

    themeBtn.innerHTML = estaOscuro ? '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i>' : '<i class="fa-solid fa-moon" style="color: #ffffff;"></i>';

    localStorage.setItem('theme', estaOscuro ? 'dark' : 'light')
})