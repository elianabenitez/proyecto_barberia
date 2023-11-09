// Obtener los elementos del formulario
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const telefonoInput = document.getElementById('telefono');

// Cargar servicios disponibles
async function cargarServicios() {
    try {
        const response = await fetch('http://localhost:3000/servicios');
        if (response.ok) {
            const servicios = await response.json();
            const servicioSelect = document.getElementById('servicio');

            servicios.forEach((servicio) => {
                if (servicio.estado === true) {
                    const option = document.createElement('option');
                    option.value = servicio.nombre;
                    option.textContent = servicio.nombre;
                    servicioSelect.appendChild(option);
                }
            });
        } else {
            console.error('Error al cargar los servicios.');
        }
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

// Cargar horarios disponibles en "false"
async function cargarHorariosDisponibles() {
    try {
        const response = await fetch('http://localhost:3000/horariosDomingo');
        if (response.ok) {
            const horarios = await response.json();
            const horarioSelect = document.getElementById('horario');

            horarios.forEach((horario) => {
                if (horario.ocupado === false) {
                    const option = document.createElement('option');
                    option.value = horario.id;
                    option.textContent = horario.hora;
                    horarioSelect.appendChild(option);
                }
            });
        } else {
            console.error('Error al cargar los horarios.');
        }
    } catch (error) {
        console.error('Error al cargar los horarios:', error);
    }
}
cargarServicios();
cargarHorariosDisponibles();


// Función para validar el número de teléfono
function validarTelefono(telefono) {
    // Utilizamos una expresión regular para validar el número de teléfono
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono);
}

// Función para validar el nombre y el apellido
function validarTexto(texto) {
    // Utilizamos una expresión regular para validar que solo contenga letras
    const textoRegex = /^[a-zA-Z]+$/;
    return textoRegex.test(texto);
}

// Enviar reserva
document.getElementById('actualizarHorarioForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const telefono = telefonoInput.value;
    const servicio = document.getElementById('servicio').value;
    const horarioSeleccionado = document.getElementById('horario');
    const horario = horarioSeleccionado.options[horarioSeleccionado.selectedIndex].text; // Obtener la hora seleccionada

    // Validar los campos
    if (!validarTexto(nombre)) {
        alert('Por favor, ingrese un nombre válido.');
        return;
    }

    if (!validarTexto(apellido)) {
        alert('Por favor, ingrese un apellido válido.');
        return;
    }

    if (!validarTelefono(telefono)) {
        alert('Por favor, ingrese un número de teléfono válido (10 dígitos numéricos).');
        return;
    }

    try {
        // Enviar reserva
        document.getElementById('actualizarHorarioForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const telefono = document.getElementById('telefono').value;
            const servicio = document.getElementById('servicio').value;
            const horarioSeleccionado = document.getElementById('horario');
            const horario = horarioSeleccionado.options[horarioSeleccionado.selectedIndex].text; // Obtener la hora seleccionada

            try {
                // Realizar la reserva
                const responseReserva = await fetch('http://localhost:3000/pedidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombreApellido: `${nombre} ${apellido}`,
                        telefono: telefono,
                        diaSemana: 'Domingo', // Puedes ajustar esto según el día
                        servicio: servicio,
                        horario: horario, // Enviar la hora seleccionada en lugar del ID
                        ver: true
                    })
                });

                if (responseReserva.ok) {
                    alert('Reserva exitosa.');
                    // Recargar la lista de horarios disponibles
                    cargarHorariosDisponibles();
                } else {
                    console.error('Error al realizar la reserva.');
                }
            } catch (error) {
                console.error('Error al realizar la reserva:', error);
            }
        });

        // Actualizar horario a "true"
        document.getElementById('actualizarHorarioForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const horarioId = document.getElementById('horario').value;

            try {
                const response = await fetch(`http://localhost:3000/horariosDomingo/${horarioId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ocupado: true
                    })
                });

                if (response.ok) {
                    console.log('Horario actualizado exitosamente a "true".');
                    // Recargar la lista de horarios disponibles
                    cargarHorariosDisponibles();
                } else {
                    console.error('Error al actualizar el horario.');
                }
            } catch (error) {
                console.error('Error al actualizar el horario:', error);
            }
        });

    } catch (error) {
        console.error('Error al realizar la reserva:', error);
    }
});


























