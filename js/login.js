const boton = document.querySelector(".formulario")
const contraseña = document.getElementById("contraseña")
const usuario = document.getElementById("user")


boton.addEventListener("submit", (e) => {
    if (contraseña.value.trim() !== "" && usuario.value.trim() !== "") {
        e.preventDefault();
        window.location.href = "index.html";
    } else {
        alert("Debes completar Usuario y Contraseña");
    }

}

);
