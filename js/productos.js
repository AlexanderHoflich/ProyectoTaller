var productos = JSON.parse(localStorage.getItem('productos')) || [];
var seleccionado = null;

function  registrarProducto(){
    var prodServ = document.getElementById('prodServ').value;
    var cantidad = document.getElementById('cantidad').value;
    var precio = document.getElementById('precio').value;
    var categoria = document.getElementById('categoria').value;
    var descripcion = document.getElementById('descripcion').value;
    var stock = document.getElementById('stock').value;
    var notas = document.getElementById('notas').value;

    if(prodServ == '' || cantidad == '' || precio == '' || categoria == '' || descripcion == '' || stock == ''){
        Swal.fire({
            title: "Faltan datos!",
            text: "Por favor llene todos los campos del formulario!!!!",
            icon: "warning"
        });
        return;
    }

    var producto = {
        prodServ,
        cantidad,
        precio,
        categoria,
        descripcion,
        stock,
        notas
    }

    if(seleccionado != null){
        productos[seleccionado] = producto;
    } else {
        productos.push(producto);
    }

    localStorage.setItem('productos', JSON.stringify(productos));

    window.location.href = 'index33.html';
}

function cargarDatos(){
    

    var cadena = '';
    for(let i = 0; i < productos.length; i++){
        cadena += `<tr>
                        <td>${i+1}</td>
                        <td>${productos[i].prodServ}</td>
                        <td>${productos[i].cantidad}</td>
                        <td>${productos[i].precio}</td>
                        <td>${productos[i].descripcion}</td>
                        <td>${productos[i].categoria}</td>
                        <td>${productos[i].stock}</td>
                        <td>${productos[i].notas}</td>
                        <td>
                            <div class="acciones">
                                <button onclick="editarProducto(${i})" class="btn btn-edit m5">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button onclick="eliminarProducto(${i})" class="btn btn-delete m5">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
    }

    if(productos.length == 0){
        cadena += `<tr>
                        <td colspan="12" align="center">
                            <br>
                            <br>
                                No hay productos registrados!
                                <br>
                                <br>
                                <br>
                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalProd">
                                    <i class="fa fa-plus"></i>
                                    Nuevo
                                </button>
                            <br>
                            <br
                            <br>
                            <br>
                        </td>
                    </tr>
                    `;
    }

    document.getElementById('listaProductos').innerHTML = cadena;
}

function eliminarProducto(posicion){
    Swal.fire({
        title: "Esta seguro?",
        text: "El item se eliminará!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminar!",
    }).then((result) => {
        if (result.isConfirmed) {          

            productos.splice(posicion, 1);

            localStorage.setItem('productos', JSON.stringify(productos));
            cargarDatos();

            Swal.fire({
                title: "Eliminado!",
                text: "El item ha sido eliminado.",
                icon: "success",
            });
        }
    });
}

function editarProducto(posicion) {
    localStorage.setItem('producto_seleccionado', posicion);

    setearDatos();

    // Obtener el modal usando su ID
    var myModal = new bootstrap.Modal(document.getElementById('modalProd'), {
        keyboard: false
    });
    myModal.show();
}

function setearDatos(){
    seleccionado = localStorage.getItem('producto_seleccionado');
    if(seleccionado != null && seleccionado >= 0 && seleccionado != undefined){
        var elProd = productos[seleccionado];

        document.getElementById('prodServ').value = elProd.prodServ;
        document.getElementById('cantidad').value = elProd.cantidad;
        document.getElementById('precio').value = elProd.precio;
        document.getElementById('categoria').value = elProd.categoria;
        document.getElementById('descripcion').value = elProd.descripcion;
        document.getElementById('stock').value = elProd.stock;
        document.getElementById('notas').value = elProd.notas;
        
    }
}

function buscarProducto(){
    var buscador = document.getElementById('buscar').value;

    var nuevoArray = [];
    
    if(buscador.trim() == '' || buscador.trim() == null){
        nuevoArray = JSON.parse(localStorage.getItem('productos')) || [];
    } else {
        
        for(let i = 0; i < productos.length; i++){
            var texto = productos[i].prodServ.toLowerCase();
            if(texto.search(buscador.toLowerCase()) >= 0){
                nuevoArray.push(productos[i]);
            }
        }
    }

    productos = nuevoArray;
    cargarDatos();
}