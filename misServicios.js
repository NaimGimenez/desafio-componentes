
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



}

main()

