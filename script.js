// Se agrega un evento "submit" para que cuando se presione el botón de envión ejecute este script
document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Obtener los valores de los campos
  const nombre = document.getElementById("nombre").value.trim(); // La funcion trim elimina los espacios en blanco al principio y al final del valor
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  // Se valida los campos
  if (nombre === "" || mensaje === "") {
    alert("Por favor, completa todos los campos requeridos."); // Se ejecuta una ventana emergente con este mensaje
    return;
  }

  // Revisa el patrón del correo electrónico para validarlo
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Se crea una patron para asegurar que el correo esté escrito correctamente
  if (!patronCorreo.test(correo)) { // Se comprueba si el correo escrito coincide con el patron asignado
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  // Se crea un objeto con los datos del formulario
  const datosForm = {
    nombre: nombre,
    correo: correo,
    mensaje: mensaje
  };

  // Se envia los datos a través de una solicitud HTTP POST
  fetch("http://localhost:8000/api/contact", { // URL de destino. Se necesita activar el servidor de Python para que funcione
    method: "POST", // Se define el método HTTP que se utiliza para la solicitud
    headers: {
      "Content-Type": "application/json" // Indica que el contenido que se está enviando es de tipo JSON
    },
    body: JSON.stringify(datosForm) // Convierte el objeto datosForm en una cadena JSON con JSON.stringify
  })
  // Se maneja la respuesta del servidor después del envío de los datos
  .then(response => { 
    if (response.ok) { // Se comprueba si la respuesta del servidor fue exitosa
      // Se muestra el mensaje de confirmación
      document.getElementById("mensajeConfirmacion").style.display = "block";
      document.getElementById("formulario").reset(); // Reiniciar el formulario
    } else {
      alert("Hubo un problema al enviar los datos. Inténtalo de nuevo más tarde.");
    }
  })
  // Manejo de errores que puedan ocurrir durante el proceso del envío
  .catch(error => {
    console.error("Error:", error); // Se registra el error en la consola
    alert("Hubo un problema al enviar los datos. Inténtalo de nuevo más tarde.");
  });
});
