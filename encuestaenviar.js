document.getElementById('encuestaForm').addEventListener('submit', async (event) => {
    event.preventDefault();
const nombre = document.getElementById('nombre').value;
    const pregunta1 = document.getElementById('pregunta1').value;
    const pregunta2 = document.getElementById('pregunta2').value;
    const recomendar = document.querySelector('input[name="recomendar"]:checked').value;
    // Validación de nombre 
    if (!/^[a-zA-Z]+$/.test(nombre)) {
        alert('El campo Nombre debe contener solo letras.');
        return;
    }
    try {
        const encuestaData = {
            nombre: nombre,
            pregunta1: pregunta1,
            pregunta2: pregunta2,
            recomendar: recomendar
        };

        const responseEncuesta = await fetch('http://localhost:3000/encuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(encuestaData)
        });

        console.log(responseEncuesta);

        if (responseEncuesta.ok) {
            alert('Reserva exitosa.');
            // Recargar la lista de horarios disponibles
        } else {
            console.error('Error al enviar formulario.');
        }
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
    }
});
