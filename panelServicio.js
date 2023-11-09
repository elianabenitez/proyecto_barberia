// Función para cargar y mostrar los horarios del sábado
async function cargarHorariosSavado() {
    try {
        const response = await fetch('http://localhost:3000/horariosSabado');
        if (response.ok) {
            const horarios = await response.json();
            const horariosList = document.getElementById('horarios-list');
            horariosList.innerHTML = '';

            horarios.forEach((horario) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${horario.hora} (Ocupado: ${horario.ocupado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoHorario(${horario.id}, ${horario.ocupado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                horariosList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los horarios del sábado.');
        }
    } catch (error) {
        console.error('Error al cargar los horarios del sábado:', error);
    }
}

// Función para cambiar el estado "ocupado" de un horario del sábado
async function cambiarEstadoHorario(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/horariosSabado/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarHorariosSavado();
        } else {
            console.error('Error al cambiar el estado del horario del sábado.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del horario del sábado:', error);
    }
}

// Función para cargar y mostrar los horarios del domingo
async function cargarHorariosDomingo() {
    try {
        const response = await fetch('http://localhost:3000/horariosDomingo');
        if (response.ok) {
            const horarios = await response.json();
            const horariosList = document.getElementById('horarios-listt');
            horariosList.innerHTML = '';

            horarios.forEach((horario) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${horario.hora} (Ocupado: ${horario.ocupado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoHorarioDomingo(${horario.id}, ${horario.ocupado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                horariosList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los horarios del domingo.');
        }
    } catch (error) {
        console.error('Error al cargar los horarios del domingo:', error);
    }
}

// Función para cambiar el estado "ocupado" de un horario del domingo
async function cambiarEstadoHorarioDomingo(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/horariosDomingo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarHorariosDomingo();
        } else {
            console.error('Error al cambiar el estado del horario del domingo.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del horario del domingo:', error);
    }
}

// Función para cargar y mostrar los servicios
async function cargarServicios() {
    try {
        const response = await fetch('http://localhost:3000/servicios');
        if (response.ok) {
            const servicios = await response.json();
            const serviciosList = document.getElementById('servicios-list');
            serviciosList.innerHTML = '';

            servicios.forEach((servicio) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${servicio.nombre} (Activo: ${servicio.estado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoServicio(${servicio.id}, ${servicio.estado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                serviciosList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los servicios.');
        }
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

// Función para cambiar el estado "activo" de un servicio
async function cambiarEstadoServicio(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/servicios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarServicios();
        } else {
            console.error('Error al cambiar el estado del servicio.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del servicio:', error);
    }
}

// Función para agregar un nuevo servicio
async function agregarServicio(nombre, descripcion) {
    try {
        const response = await fetch('http://localhost:3000/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                estado: true
            })
        });

        if (response.ok) {
            document.getElementById('nombreServicio').value = '';
            document.getElementById('descripcionServicio').value = '';
            cargarServicios();
        } else {
            console.error('Error al agregar el servicio.');
        }
    } catch (error) {
        console.error('Error al agregar el servicio:', error);
    }
}

// Función para cargar y mostrar los días
async function cargarDias() {
    try {
        const response = await fetch('http://localhost:3000/dias');
        if (response.ok) {
            const dias = await response.json();
            const diasList = document.getElementById('dias-list');
            diasList.innerHTML = '';

            dias.forEach((dia) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${dia.dia} (Ocupado: ${dia.ocupado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoDia(${dia.id}, ${dia.ocupado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                diasList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los días.');
        }
    } catch (error) {
        console.error('Error al cargar los días:', error);
    }
}

// Función para cambiar el estado "ocupado" de un día
async function cambiarEstadoDia(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/dias/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarDias();
        } else {
            console.error('Error al cambiar el estado del día.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del día:', error);
    }
}

// Capturar el envío del formulario y agregar el nuevo servicio
const nuevoServicioForm = document.getElementById('nuevo-servicio-form');
nuevoServicioForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreServicio').value;
    const descripcion = document.getElementById('descripcionServicio').value;
    agregarServicio(nombre, descripcion);
});

// Cargar los datos al cargar la página
cargarDias();
cargarHorariosSavado();
cargarHorariosDomingo();
cargarServicios();
