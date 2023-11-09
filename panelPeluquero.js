document.addEventListener("DOMContentLoaded", function () {
    // URL del JSON en tu servidor local
    const jsonURL = "http://localhost:3000/pedidos";

    // Función para cancelar un pedido por su ID
    async function cancelarPedido(pedidoId) {
        const confirmacion = confirm(`¿Estás seguro de cancelar el pedido con ID ${pedidoId}?`);
        if (!confirmacion) {
            return;
        }

        const deleteResponse = await fetch(`http://localhost:3000/pedidos/${pedidoId}`, {
            method: 'DELETE'
        });

        if (deleteResponse.ok) {
            console.log(`Se ha cancelado el pedido con ID ${pedidoId}.`);
        } else {
            console.error(`Hubo un problema al cancelar el pedido con ID ${pedidoId}.`);
        }
    }

    // Obtiene la lista de pedidos del servidor
    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {
            const pedidoList = document.getElementById("pedido-list");

            // Itera a través de los pedidos y muestra los que tienen "ver" en true
            data.forEach((pedido) => {
                if (pedido.ver === true) {
                    const listItem = document.createElement("li");
                    listItem.className = "list-group-item";
                    listItem.innerHTML = `
                        <h5 class="mb-1">Nombre: ${pedido.nombreApellido}</h5>
                        <p class="mb-1">Teléfono: ${pedido.telefono}</p>
                        <p class="mb-1">Día: ${pedido.diaSemana}</p>
                        <p class="mb-1">Servicio: ${pedido.servicio}</p>
                        <p class="mb-1">Horario: ${pedido.horario}</p>
                        <p class="mb-1">¿Realizado? <input class="form-check-input" type="checkbox" id="exampleCheckbox"></p>
                        <p>¿Borrar pedido Permanentemente? <button class="btn btn-danger cancelar-btn " data-id="${pedido.id}"><i class="fas fa-trash-alt"></i></button></p>
                        <br>
                    `;
                    pedidoList.appendChild(listItem);
                }
            });

               // Agregar evento de click a los botones de cancelar
               const cancelarBotones = document.querySelectorAll(".cancelar-btn");
               cancelarBotones.forEach((btn) => {
                   btn.addEventListener("click", (e) => {
                       const pedidoId = e.target.getAttribute("data-id");
                       cancelarPedido(pedidoId);
                   });
               });
           })
           .catch((error) => {
               console.error("Error al cargar los datos del servidor:", error);
           });

       // Mostrar el modal de confirmación al hacer clic en el botón "Borrar lista"
       const borrarListaBoton = document.getElementById("borrarListaBoton");
       const confirmarBorrarBoton = document.getElementById("confirmarBorrarBoton");

       borrarListaBoton.addEventListener("click", () => {
           $('#confirmacionModal').modal('show');
       });

       // Realizar la acción de borrar al confirmar en el modal
       confirmarBorrarBoton.addEventListener("click", async () => {
           // Agregar confirmación
           const confirmacion = confirm("¿Está seguro de marcar como realizado todos los pedidos?");
           if (!confirmacion) {
               $('#confirmacionModal').modal('hide'); // Ocultar el modal después de cancelar
               return; // Si el usuario cancela, no se borran los pedidos
           }

           let hayValoresTrue;

           do {
               // Realiza una solicitud GET para obtener todos los pedidos
               const response = await fetch('http://localhost:3000/pedidos');
               const pedidos = await response.json();
               hayValoresTrue = false;

               for (let i = 0; i < pedidos.length; i++) {
                   // Actualiza "ver" a "false" para cada pedido si "ver" es true
                   const pedido = pedidos[i];
                   if (pedido.ver === true) {
                       const idDelPedido = pedido.id;
                       const patchResponse = await fetch(`http://localhost:3000/pedidos/${idDelPedido}`, {
                           method: 'PATCH',
                           headers: {
                               'Content-Type': 'application/json'
                           },
                           body: JSON.stringify({
                               ver: false
                           })
                       });

                       if (patchResponse.ok) {
                           console.log(`El valor "ver" se ha actualizado a "false" para el pedido con ID ${idDelPedido}.`);
                       } else {
                           console.error(`Hubo un problema al actualizar el valor "ver" para el pedido con ID ${idDelPedido}.`);
                       }
                   }

                   // Verifica si todavía hay valores "ver" en true
                   if (pedido.ver === true) {
                       hayValoresTrue = true;
                   }
               }

       // PATCH para marcar los horarios de sábado como no ocupados
        const patchSabado = await fetch('http://localhost:3000/horariosSabado', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: false
            })
        });

        // PATCH para marcar los horarios de domingo como no ocupados
        const patchDomingo = await fetch('http://localhost:3000/horariosDomingo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: false
            })
        });




           } while (hayValoresTrue);

           $('#confirmacionModal').modal('hide'); // Ocultar el modal después de confirmar
           alert('Se han actualizado todos los valores "ver" a "false".');
       });

});







