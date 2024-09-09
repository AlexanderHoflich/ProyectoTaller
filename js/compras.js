// para el registro de usuarios-----------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const addMotoButton = document.getElementById('add-moto-button');
    const motosContainer = document.getElementById('motos-container');
    let motoCount = 1;

    addMotoButton.addEventListener('click', function() {
        motoCount++;
        
        // Crear un nuevo contenedor para la moto
        const newMotoDiv = document.createElement('div');
        newMotoDiv.className = 'moto';

        // Añadir campos para la nueva moto
        newMotoDiv.innerHTML = `
            <label for="marca-${motoCount}">Marca:</label>
            <input type="text" id="marca-${motoCount}" name="marca[]" required>
            <label for="modelo-${motoCount}">Modelo:</label>
            <input type="text" id="modelo-${motoCount}" name="modelo[]" required>
            <label for="cilindrada-${motoCount}">Cilindrada:</label>
            <input type="text" id="cilindrada-${motoCount}" name="cilindrada[]" required>
            <label for="nombre-moto-${motoCount}">Nombre (opcional):</label>
            <input type="text" id="nombre-moto-${motoCount}" name="nombre-moto[]">
            <label for="numero-placa-${motoCount}">Número de placa:</label>
            <input type="text" id="numero-placa-${motoCount}" name="numero-placa[]" required>
            <label for="ano-fabricacion-${motoCount}">Año de fabricación:</label>
            <input type="text" id="ano-fabricacion-${motoCount}" name="ano-fabricacion[]" required>
            <label for="estado-${motoCount}">Estado actual de la moto:</label>
            <select id="estado-${motoCount}" name="estado[]" required>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="malo">Malo</option>
            </select>
            <label for="kilometraje-${motoCount}">Kilometraje actual:</label>
            <input type="text" id="kilometraje-${motoCount}" name="kilometraje[]" required>
        `;

        // Añadir el nuevo contenedor al formulario
        motosContainer.appendChild(newMotoDiv);
    });
});


// para el registro de usuarios-----------------------------------------------------------------------------------