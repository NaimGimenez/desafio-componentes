
async function addHome(params={} ){
    const template= document.querySelector("#content_home_template")
    const container = document.querySelector(".content_home");
    
       template.content.querySelector(".titulo_hola").textContent = params.title;

       template.content.querySelector(".titulo_naim").textContent = params.title2

       template.content.querySelector(".cohete").src = params.image

    const clone = document.importNode(template.content , true);

    container.appendChild(clone);
}

//aqui empieza la PRESENTACION

async function addPresentacion(params = {}){
    const template = document.querySelector("#content_presentacion_template")
    // console.log(template,"este es el template presentacion")
    const container = document.querySelector(".content_presentacion")
    
    template.content.querySelector(".titulo_presentacion").textContent = params.title

    template.content.querySelector(".presentacion_descripcion").textContent = params.descripcion

    template.content.querySelector(".presentacion_image").src = params.image

    const clone = document.importNode(template.content , true)

  container.appendChild(clone);
}

//aqui empieza MIS SERVIVIOS
async function addMisServicios(params = {}) {
  const template = document.querySelector("#content_mis_servios_template");
  const container = document.querySelector(".content_mis_servicios");

  if (!template || !container) {
      console.error("❌ No se encontró el template o el contenedor.");
      return;
  }

  // Acceder correctamente a los elementos dentro del template
  const clone = template.content.cloneNode(true);
  
  clone.querySelector(".imagen_servicios").src = params.image;
  clone.querySelector(".subtitulo_servicios").textContent = params.subtitle;
  clone.querySelector(".descripcion_servicios").textContent = params.description;
  
  // Agregar el clon al contenedor
  container.appendChild(clone);

  // Mostrar en consola para verificar
  // console.log("✅ Elemento agregado:", container.lastElementChild);
}

        // AQUI EMPIEZA LAS FUNCIONES getHome// 


async function getHome( ){
    return fetch("https://cdn.contentful.com/spaces/6x9x1cyqmoi1/environments/master/entries?access_token=1NC-doaBn2_BmbGK5hB1uikj1LzHmKMfEXYQ2t9mY3Y&content_type=home"
    ).then(res=>{
        return res.json()
    }).then((data)=>{
        console.log(data);

         // Mapeamos los Assets para acceder fácilmente por su ID
         const assetMap = {};
         if (data.includes && data.includes.Asset) {
             data.includes.Asset.forEach(asset => {
                 assetMap[asset.sys.id] = asset.fields.file.url;
             });
         }

       const fieldCollection = data.items.map((item)=>{

          return {
            title:item.fields.tituloHome,
            image: assetMap[item.fields.coheteImagen.sys.id] || "",  // Obtiene la URL de la imagen
          }
       })
       return fieldCollection;          
    })
}


         // AQUIE EMPPIEZA LA FUNCION getPresentacion


async function getPresentacion( ){
    return fetch("https://cdn.contentful.com/spaces/6x9x1cyqmoi1/environments/master/entries?access_token=1NC-doaBn2_BmbGK5hB1uikj1LzHmKMfEXYQ2t9mY3Y&content_type=presentacion"
    ).then(res=>{
        return res.json()
    }).then((data)=>{
        console.log(data);

         // Mapeamos los Assets para acceder fácilmente por su ID
         const assetMap = {};
         if (data.includes && data.includes.Asset) {
             data.includes.Asset.forEach(asset => {
                 assetMap[asset.sys.id] = asset.fields.file.url;
             });
         }

       const fieldCollection = data.items.map((item)=>{

          return {
            descripcion:item.fields.descripcion,
            title:item.fields.titulo,
            image: assetMap[item.fields.imagen.sys.id] || "",  // Obtiene la URL de la imagen
       
          }
       })
       return fieldCollection;          
    })
}

// funcion para conseguir los sevicios

async function getaddMisServicios() {
  try {
      const res = await fetch("https://cdn.contentful.com/spaces/6x9x1cyqmoi1/environments/master/entries?access_token=1NC-doaBn2_BmbGK5hB1uikj1LzHmKMfEXYQ2t9mY3Y&content_type=misServicios");
      const data = await res.json();
      
      console.log("📌 Datos obtenidos de Contentful:", data);

      // Mapeamos los Assets para acceder fácilmente por su ID
      const assetMap = {};
      if (data.includes && data.includes.Asset) {
          data.includes.Asset.forEach(asset => {
              assetMap[asset.sys.id] = `https:${asset.fields.file.url}`; // Asegurar que la URL sea absoluta
          });
      }

      // Mapeamos los items obtenidos
      const fieldCollection = data.items.map((item) => ({
          description: item.fields.descripcion || "Sin descripción",
          subtitle: item.fields.subtitulo || "Sin título",
          image: assetMap[item.fields.imagen?.sys?.id] || "https://via.placeholder.com/150" // Imagen por defecto si no hay
      }));

      return fieldCollection;
  } catch (error) {
      console.error("❌ Error al obtener datos de Contentful:", error);
      return [];
  }
}

async function loadMisServicios() {
  const servicios = await getaddMisServicios();

  servicios.forEach((servicio) => {
      addMisServicios(servicio); // Llamar a la función de renderizado
  });
}

          // section Main

function main(){
getHome().then(function (_home) {
   for (const h of _home){
    addHome(h)
  }
});

getPresentacion().then(function (_presentacion) {
    for (const p of _presentacion){
     addPresentacion(p)
   }
 })


loadMisServicios();
 
};

main();