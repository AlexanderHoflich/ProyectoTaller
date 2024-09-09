var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
var seleccionado = null;

function  registrarcliente(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var documento = document.getElementById('documento').value;
    var tipo = document.getElementById('tipo').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;

    if(nombre == '' || apellido == '' || documento == '' || tipo == '' || telefono == '' || correo == ''){
        Swal.fire({
            title: "Faltan datos!",
            text: "Por favor llene todos los campos del formulario!!!!",
            icon: "warning"
        });
        return;
    }

    var cliente = {
        nombre,
        apellido,
        documento,
        tipo,
        telefono,
        correo
    }

    if(seleccionado != null){
        clientes[seleccionado] = cliente;
    } else {
        clientes.push(cliente);
    }cliente

    localStorage.setItem('clientes', JSON.stringify(clientes));

    window.location.href = 'clientes.html';
}

function cargarDatos(){

    var cadena = '';
    for(let i = 0; i < clientes.length; i++){
        cadena += `<tr>
                        <td>${i+1}</td>
                        <td>${clientes[i].nombre}</td>
                        <td>${clientes[i].apellido}</td>
                        <td>${clientes[i].documento}</td>
                        <td>${clientes[i].tipo}</td>
                        <td>${clientes[i].telefono}</td>
                        <td>${clientes[i].correo}</td>
                        <td>
                            <div class="acciones">
                                <button onclick="editarCliente(${i})" class="btn btn-edit m5">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button onclick="eliminarCliente(${i})" class="btn btn-delete m5">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
    }

    if(clientes.length == 0){
        cadena += `<tr>
                        <td colspan="12" align="center">
                            <br>
                            <br>
                                No hay clientes registrados!
                                <br>
                                <br>
                                <br>
                                <a href="registro.html" class="btn btn-info btn-nuevo">
                                    <i class="fa fa-plus"></i>
                                    Nuevo
                                </a>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                    </tr>
                    `;
    }

    document.getElementById('listaDeClientes').innerHTML = cadena;
}

function eliminarCliente(posicion){
    Swal.fire({
        title: "Esta seguro?",
        text: "El cliente se eliminará!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminar!",
    }).then((result) => {
        if (result.isConfirmed) {          

            clientes.splice(posicion, 1);

            localStorage.setItem('clientes', JSON.stringify(clientes));
            cargarDatos();

            Swal.fire({
                title: "Eliminado!",
                text: "El cliente ha sido eliminado.",
                icon: "success",
            });
        }
    });
}

function editarCliente(posicion){
    localStorage.setItem('cliente_seleccionado', posicion);

    window.location.href = 'registro.html';
}

function setearDatos() {
    seleccionado = localStorage.getItem('cliente_seleccionado');
    if (seleccionado != null && seleccionado >= 0 && seleccionado != undefined) {
        var elClie = clientes[seleccionado];

        document.getElementById('nombre').value = elClie.nombre;
        document.getElementById('apellido').value = elClie.apellido;
        document.getElementById('documento').value = elClie.documento;
        document.getElementById('tipo').value = elClie.tipo;
        document.getElementById('telefono').value = elClie.telefono;
        document.getElementById('correo').value = elClie.correo;
    }
}


function buscarCliente(){
    var buscador = document.getElementById('buscar').value;

    var nuevoArray = [];
    
    if(buscador.trim() == '' || buscador.trim() == null){
        nuevoArray = JSON.parse(localStorage.getItem('clientes')) || [];
    } else {
        
        for(let i = 0; i < clientes.length; i++){
            var texto = clientes[i].nombre.toLowerCase();
            if(texto.search(buscador.toLowerCase()) >= 0){
                nuevoArray.push(clientes[i]);
            }
        }
    }

    clientes = nuevoArray;
    cargarDatos();
}