
function main(){
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
    
    // envio del formulario
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("#contacto");
        const submitButton = document.querySelector("#enviar-btn");
        const buttonText = submitButton.querySelector(".button-text");
        const buttonSpinner = submitButton.querySelector(".button-spinner");
    
        if (!form) return; // Evita errores si el formulario no existe
    
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Evita que la página se recargue
    
            // Mostrar spinner y ocultar texto del botón
            buttonText.style.display = "none";
            buttonSpinner.style.display = "inline-block";
            submitButton.disabled = true; // Evita múltiples envíos
    
            // Capturar los datos del formulario
            const name = form.querySelector('input[name="nombre"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const message = form.querySelector('textarea[name="mensaje"]').value.trim();
    
            // Validar que los campos no estén vacíos
            if (!name || !email || !message) {
                alert("Por favor, completa todos los campos.");
                resetButton();
                return;
            }
    
            // Validar email con una expresión regular
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor, ingresa un email válido.");
                resetButton();
                return;
            }
    
            // Construir el body del request
            const data = {
                to: "naimquintero90@gmail.com", // Reemplázalo con tu email
                message: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
            };
    
            try {
                // Enviar solicitud POST a la API
                const response = await fetch("https://apx.school/api/utils/email-to-student", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                    
                });
                
                console.log("Response completa:", response);

                const result = await response.json(); // Intentar leer la respuesta
    

                console.log("Resultado del servidor:", result);

                if (response.ok) {
                    alert("¡El mensaje fue enviado con éxito!");
                    form.reset(); // Limpia el formulario después del envío
                } else {
                    alert(`Error: ${result.error || "Hubo un problema al enviar el mensaje."}`);
                }
            } catch (error) {
                console.error("Error al enviar el mensaje:", error);
                alert("Hubo un error en la conexión. Inténtalo más tarde.");
            }
           
            // Restaurar el botón después del envío
            resetButton();
        });
    
        function resetButton() {
            buttonText.style.display = "inline-block";
            buttonSpinner.style.display = "none";
            submitButton.disabled = false; // Habilita nuevamente el botón
        }
    });
}

main()