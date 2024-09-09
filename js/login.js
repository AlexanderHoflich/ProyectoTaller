const d = document;

const ingresoUsuario = (event) => {
    event.preventDefault();

    // 1er traer los valores de los inputs
    let usuario = d.getElementById("logUser").value.toLowerCase();
    console.log(usuario);
    let contraseña = d.getElementById("logPassword").value.toLowerCase();
    console.log(contraseña);

    // validacion campos en blanco
    if (usuario.trim() === "" || contraseña.trim() === "") {
        Swal.fire({
            title: "Ingrese los campos vacíos",
            text: "Todos los campos vacíos debes llenarlos",
            icon: "warning",
        });
        return;
    }

    // 2do paso verificar si hay un usuario registrado hacer el ingreso o redireccionamiento al home
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    let usuarioEncontrado = clientes.find(
        (cliente) => cliente.usuario === usuario && cliente.contraseña === contraseña
    );

    if (usuarioEncontrado) {
        localStorage.setItem("usuario", usuarioEncontrado.usuario);
        Swal.fire({
            title: "Iniciando Sesión",
            text: "Ingresando a tu Home",
            icon: "success"
        }).then(() => {
            window.location.href = "index3.html";
        });
    } else {
        Swal.fire({
            title: "Usuario o contraseña incorrectos",
            text: "¿Estás seguro de tener una cuenta?",
            icon: "error"
        });
    }

    d.getElementById("loginForm").reset();
};

d.getElementById("loginForm").addEventListener("submit", ingresoUsuario);
