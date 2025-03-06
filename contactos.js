


    document.addEventListener("DOMContentLoaded", () => {
        const menuIcono = document.querySelector(".menu-icono");
        const menu = document.querySelector(".titulos");
        const menuCerrar = document.querySelector(".menu-cerrar");
    
        menuIcono.addEventListener("click", () => {
            menu.classList.add("activo");
        });
    
        menuCerrar.addEventListener("click", () => {
            menu.classList.remove("activo");
        });
    });
    
   // aqui va el FORMULARIO
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formulario"); // Selecciona el formulario
    const submitButton = document.querySelector(".button"); // Selecciona el botón de enviar
  
    if (!form || !submitButton) return; // Evita errores si el formulario o el botón no existen
  
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita que la página se recargue al enviar el formulario
  
        // Capturar los datos del formulario
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="mensaje"]');
  
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
  
        let isValid = true;
  
        // Función para mostrar mensaje de error
        const showError = (input, message) => {
            let errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains("error-message")) {
                errorElement = document.createElement("p");
                errorElement.classList.add("error-message");
                errorElement.style.color = "red";
                errorElement.style.fontSize = "14px";
                errorElement.style.marginTop = "5px";
                input.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        };
  
        // Función para eliminar mensaje de error cuando el usuario empieza a escribir
        const removeError = (input) => {
            let errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains("error-message")) {
                errorElement.remove();
            }
        };
  
        // Validar cada campo y mostrar mensaje si está vacío
        if (!name) {
            showError(nameInput, "Por favor, ingresa tu nombre.");
            isValid = false;
        } else {
            removeError(nameInput);
        }
  
        if (!email) {
            showError(emailInput, "Por favor, ingresa tu email.");
            isValid = false;
        } else {
            removeError(emailInput);
        }
  
        if (!message) {
            showError(messageInput, "Por favor, escribe un mensaje.");
            isValid = false;
        } else {
            removeError(messageInput);
        }
  
        // Validar email con expresión regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            showError(emailInput, "Por favor, ingresa un email válido.");
            isValid = false;
        } else if (email) {
            removeError(emailInput);
        }
  
        // Si hay errores, no enviar el formulario
        if (!isValid) return;
  
        // Construir el cuerpo del request
        const data = {
            to: "naimquintero90@gmail.com", // Reemplázalo con tu email real
            message: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
        };
  
        // Deshabilitar el botón para evitar envíos múltiples
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
  
        try {
            // Enviar solicitud POST a la API
            const response = await fetch("https://apx.school/api/utils/email-to-student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
  
            if (response.ok) {
                alert("¡El mensaje fue enviado con éxito!");
                form.reset(); // Limpia el formulario después del envío
            } else {
                alert("Hubo un problema al enviar el mensaje.");
            }
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            alert("Hubo un error en la conexión. Inténtalo más tarde.");
        } finally {
            // Restaurar el botón después del envío
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
  
    // Remover errores cuando el usuario empieza a escribir en los inputs
    form.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("input", () => removeError(input));
    });
  });


