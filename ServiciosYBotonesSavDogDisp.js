 // Función para verificar la disponibilidad de los días
 async function verificarDisponibilidadDias() {
    try {
        const response = await fetch('http://localhost:3000/dias');
        if (response.ok) {
            const dias = await response.json();

            // Verificar el estado de los días
            const sabado = dias.find((dia) => dia.dia === 'Sábado');
            const domingo = dias.find((dia) => dia.dia === 'Domingo');

            // Mostrar el botón del sábado solo si está disponible
            const sabadoButton = document.getElementById('sabadoButton');
            if (sabado && sabado.ocupado === false) {
                // Verificar la disponibilidad de horarios para el sábado
                const horariosSavadoResponse = await fetch('http://localhost:3000/horariosSabado');
                if (horariosSavadoResponse.ok) {
                    const horariosSavado = await horariosSavadoResponse.json();
                    const horariosDisponibles = horariosSavado.some((horario) => horario.ocupado === false);
                    if (horariosDisponibles) {
                        sabadoButton.classList.remove('d-none');
                    } else {
                        alert('No hay horarios disponibles para el sábado.');
                    }
                } else {
                    console.error('Error al verificar la disponibilidad de horarios para el sábado.');
                }
            }

            // Mostrar el botón del domingo solo si está disponible
            const domingoButton = document.getElementById('domingoButton');
            if (domingo && domingo.ocupado === false) {
                // Verificar la disponibilidad de horarios para el domingo
                const horariosDomingoResponse = await fetch('http://localhost:3000/horariosDomingo');
                if (horariosDomingoResponse.ok) {
                    const horariosDomingo = await horariosDomingoResponse.json();
                    const horariosDisponibles = horariosDomingo.some((horario) => horario.ocupado === false);
                    if (horariosDisponibles) {
                        domingoButton.classList.remove('d-none');
                    } else {
                        alert('No hay horarios disponibles para el domingo.');
                    }
                } else {
                    console.error('Error al verificar la disponibilidad de horarios para el domingo.');
                }
            }

            // Mostrar una alerta si no hay días disponibles
            if ((!sabado || sabado.ocupado === true) && (!domingo || domingo.ocupado === true)) {
                alert('No hay días disponibles para reservar turno.');
            }
        } else {
            console.error('Error al verificar la disponibilidad de los días.');
        }
    } catch (error) {
        console.error('Error al verificar la disponibilidad de los días:', error);
    }
}

// Verificar disponibilidad de días al cargar la página
verificarDisponibilidadDias();



// ---------------------------------------------------------------------------------------------------------------------------

// Función para cargar los servicios desde la URL utilizando fetch
function cargarServicios() {
    const serviciosList = document.getElementById('servicios-list');
    serviciosList.innerHTML = '';

    // Utiliza fetch para obtener los datos de la URL de servicios
    fetch('http://localhost:3000/servicios')
        .then(response => response.json())
        .then(data => {
            data.forEach((servicio) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `
                            <strong>Nombre:</strong> ${servicio.nombre}<br>
                            <strong>Descripción:</strong> ${servicio.descripcion}<br>
                        `;
                serviciosList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de servicios:', error);
        });
}

// Inicializar la página
cargarServicios();




