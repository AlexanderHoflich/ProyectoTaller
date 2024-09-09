
(function () {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    });
})();


document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim().toLowerCase();
    const apellido = document.getElementById("apellido").value.trim().toLowerCase();
    const documento = document.getElementById("documento").value.trim().toLowerCase();
    const tipo = document.getElementById("tipo").value.trim().toLowerCase();
    const telefono = document.getElementById("telefono").value.trim().toLowerCase();
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const usuario = document.getElementById("regUser").value.trim().toLowerCase();
    const contraseña = document.getElementById("regPassword").value.trim().toLowerCase();

    if (nombre == '' || apellido == '' || documento == '' || tipo == '' || telefono == '' || correo == '') {
        Swal.fire({
            title: "Llena todos los campos",
            text: "Debes completar el formulario",
            icon: "error"
        });
        return;
    }

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    if (clientes.some((usuario) => usuario.usuario === usuario)) {
        Swal.fire({
            title: "Usuario existente",
            text: "Parece que ese nombre de usuario ya está en uso, intenta con otro",
            icon: "error"
        });
    } else {
        clientes.push({ nombre,  apellido, documento, tipo, telefono, correo, usuario, contraseña });

        localStorage.setItem("clientes", JSON.stringify(clientes));

        Swal.fire({
            title: "Registro exitoso",
            text: "Felicidades, ahora eres parte de nuestra plataforma",
            icon: "success"
        }).then(() => {
            window.location.href = "index1.html";
        });
    }

    document.getElementById("registerForm").reset();
});
