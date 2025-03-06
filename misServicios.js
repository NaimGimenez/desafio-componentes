
async function addMisServicios(params ={}){
    const template = document.querySelector(".content_trabajos_template")
    const container = document.querySelector(".content_trabajos")
    
    if (!template || !container) {
        console.error("❌ No se encontró el template o el contenedor.");
        return;
    }
    

    const clone = template.content.cloneNode(true);
    // modificamos el contenido
    clone.querySelector(".imagen_card_trabajos").src =params.url;
    clone.querySelector(".subtitulo_trabajo").textContent =params.subtitle;
    clone.querySelector(".description").textContent=params.description;
    

    // aqui gregamos los cambios del clone al container original

    container.appendChild(clone);
     
}
// aqui empieza la funcion getMisServicios
async function getMisServicios(){
return fetch("https://cdn.contentful.com/spaces/6x9x1cyqmoi1/environments/master/entries?access_token=1NC-doaBn2_BmbGK5hB1uikj1LzHmKMfEXYQ2t9mY3Y&content_type=portafolio"
).then(res=>{
   return res.json()   
}).then((data)=>{
    console.log(data)

     // Mapeamos los Assets para acceder fácilmente por su ID
     const assetMap = {};
     if (data.includes && data.includes.Asset) {
         data.includes.Asset.forEach(asset => {
             assetMap[asset.sys.id] = asset.fields.file.url;
         });
     }

     const fieldCollection = data.items.map((item)=>{

        return {
          description:item.fields.description,
          subtitle:item.fields.subtitle,
          url: assetMap[item.fields.imagen.sys.id] || "",  // Obtiene la URL de la imagen
     
        }
     })
     return fieldCollection; 
})

}

function main(){
    getMisServicios().then(function (_serv) {
        for (const s of _serv){
            addMisServicios(s)
       }
     });
console.log(getMisServicios())

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

}

main()

