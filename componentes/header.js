function main() { 
    const menuIcono = document.querySelector(".menu-icono");
    const menuDesplegable = document.querySelector(".titulos");
    const cerrarMenu = document.querySelector(".menu-cerrar");
    const body = document.body; // Usaremos el body para controlar la imagen del cohete

    menuIcono.addEventListener("click", () => {
        menuDesplegable.classList.toggle("menu-despegable");
        body.classList.add("menu-abierto"); // Agrega la clase para ocultar la imagen del cohete
    });

    cerrarMenu.addEventListener("click", () => {
        menuDesplegable.classList.toggle("menu-despegable");
        body.classList.remove("menu-abierto"); // Quita la clase para mostrar la imagen nuevamente
    });
};

main();
