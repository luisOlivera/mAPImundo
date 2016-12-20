//Indican el mapa en 3D, tipo de imagen para cada ejercicio, nombre del país a buscar,
//latitud y longitud de donde se colocó el avión o el satélite
var view, tipoMapa, pais, lat, lon;
//Indican que objeto 3D (avión/satélite) se seleccionó
var opcAvion = false;
var opcSatelite = false;
//Almacena número de ejercicios, obligatorios = 10
var contador = 0;
//Almacena puntuación de la lección
var puntos = 0;
//Opciones de imagen para la dinámica
var tiposMapa = ["Imagen satelital", "Fotografía aérea"];
var keyBing = '055acde1923a4d5cb3b8e9ffb8d00115';

//Objetivo de la leccion de texto a voz
function getObjetivo(){
    hablar("Esta es la ultima lección del bloque 1. Descubrirás otros recursos para obtener información geográfica. Podrás distinguir las características y utilidad de las fotografías aéreas e imágenes satelitales,  da click en el botón jugar cuándo estés listo.");
}

//Muestra una fotografía aérea
function getFotografia(){
    document.getElementById("pais").textContent = fotografia.titulo;
    document.getElementById("info").textContent = fotografia.contenido;
    document.getElementById("imagen").style.display = "inline";
    document.getElementById("imagen").src = fotografia.url;
}

//Muestra una imagen satelital
function getImagen(){
    document.getElementById("pais").textContent = imagen.titulo;
    document.getElementById("info").textContent = imagen.contenido;
    document.getElementById("imagen").style.display = "inline";
    document.getElementById("imagen").src = imagen.url;
}

//Texto a voz
function hablar(texto, f){
    responsiveVoice.speak(texto,"Spanish Latin American Female",{onend: f});
}

//Actividad a relizar
function getDinamica(){
    document.getElementById("imagen").style.display = "none";
    document.getElementById("tabla").style.display = "none";
    document.getElementById("tblMedios").style.display = "inline";
    document.getElementById("btnJugar").style.display = "none";
    document.getElementById("pais").textContent = "Instrucciones";
    //Instrucciones de la dinámica
    view.ui.add(toggle, "bottom-left");
    document.getElementById("info").textContent = "Consigue una imagen satelital o una foto aérea de los siguientes países. Selecciona el avión o el satélite según corresponda y llévalo hasta el país solicitado. Acercáte o aléjate lo necesario para conseguir el objetivo.";
    hablar("Deberás conseguir una imagen satelital o una foto aérea de los siguientes países. Selecciona el medio adecuado para obtener lo que se te pide. Encuentra el lugar y acércate o aléjate lo necesario para conseguir el objetivo. Empezemos", getEjercicio);
}

function getEjercicio(){
    //Finalizó dinámica
    if(contador >= 9 && puntos >= 7){
        document.getElementById("info").textContent = "Lección completada";
        document.getElementById("imagen").src = "http://wtfonline.mx/wp-content/uploads/2015/09/todo-bien.png";
    }    
    //Siguiente ejercicio, otro país, diferente tipo de imagen (satelital o aérea)
    else{
        if(contador > 0){
            hablar("Continuemos.");
        }
        document.getElementById("pais").textContent = "¡Tómale foto!";
        tipoMapa = tiposMapa[Math.floor(Math.random() * 2)];
        pais = paises[Math.floor(Math.random() * paises.length)];
        document.getElementById("info").textContent = tipoMapa + " de " + pais;
        hablar(tipoMapa+" de "+pais);
        document.getElementById("imagen").src = "";
        document.getElementById("btnJugar").style.display = "inline";
        document.getElementById("btnJugar").textContent = "Tomar foto";
        document.getElementById("btnJugar").onclick = verificar;
    }
    contador++;
}

//Califica cada ejercicio de la dinámica
function verificar(){
    //Debió haber seleccionado el avión o el satélite
    if(opcAvion || opcSatelite){
        //Comprueba que el la base del mapa 3D sea satelital, que no tenga nombres de países
        //para ambos casos, sea fotografía aérea o imagen satelital
        if(view.map.basemap.resourceInfo.id == "satellite"){
            //Obtiene posición del medio (avión/satélite)
            lat = view.center.latitude;
            lon = view.center.longitude;    
            //Si el ejercicio se trata de obtener una imagen satelital
            if(tipoMapa === "Imagen satelital"){
                //Debió elegir el satélite
                if(opcSatelite){
                    //Se considera imagen satelital
                    //cuando el zoom se encuentre en el siguiente rango
                    if(view.zoom >= 3 && view.zoom <= 8){
                        comprobarPais();
                    }else{
                        error();
                    }
                }
                //En caso de que haya seleccionado el avión
                else{
                    hablar("Los aviones no pueden capturar imágenes satelitales.");
                    getEjercicio();
                }
            }
            //Si el ejercicio se trata de obtener una fotografía aérea
            else{
                //Debió elegir el avión
                if(opcAvion){
                    //Se considera fotografía aérea
                    //cuando el zoom se encuentre en el siguiente rango
                    if(view.zoom >= 12 && view.zoom <= 18){
                        comprobarPais();               
                    }else{
                        error();
                    }
                }
                //En caso de que haya seleccionado el satélite
                else{
                    hablar("Los satélites no toman fotografías aéreas.");
                    getEjercicio();
                }
            }
        }
        //Cuando intenta tomar la imagen de un mapa con nombres de países
        else{
            hablar("¡El tipo de mapa no es el correcto! Cámbialo e intentalo otra vez.");
        }
    }
    //Cuando no haya seleccionado algún objeto 3D (avión/satélite)
    else{
        hablar("Debes seleccionar el avión o el satélite.");
    }
}

//Comprueba que el objeto 3D esté sobre un país
function comprobarPais(){
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+ '&key=AIzaSyA206wa_9HvHofUAhSDXZ_-XVZbERaNR64',
        type: 'GET',
        success: function(data, status, jqXHR) {
            var paisMapeado;
            if(data.results.length > 0){
                for (var i = 0; i < data.results[0].address_components.length; i++) {
                    if (data.results[0].address_components[i].types[0] === "country") {
                        paisMapeado = data.results[0].address_components[i].long_name;            break;
                    }                         
                }
            }
            //El obejto 3D está sobre el país solocitado
            if(paisMapeado == pais || pais.includes(paisMapeado)){
               acierto();
            }else{
               error();
            }
        }
    });
}

//Función inicial a la API de ArcGIS 
//Solicita un mapa, una escena 3D y un switch para cambiar la base del mapa
require(["esri/Map", "esri/views/SceneView","esri/widgets/BasemapToggle"],
function(Map, SceneView, BasemapToggle) {
    //Crea el mapa con la base satelital
    var map = new Map({
        basemap: "satellite"
    });
    
    //Crear la escena 3D indicándole el elemento HTML, escala, posición inicial y zoom
    view = new SceneView({
        container: "viewDiv",
        map: map,
        scale: 80000000,
        center: [-101.17, 21.78],
        zoom: 0
    });
    
    //Switch para cambiar la base del mapa
    //De satelital a streets (con nombres de países)
    toggle = new BasemapToggle({
        view: view,
        nextBasemap: "streets" 
    });
    toggle.startup();

 });

//Solicita el objeto 3D de un avión
function getAvion(){
    opcAvion = true;
    opcSatelite = false;
    require(["esri/views/3d/externalRenderers"], function(externalRenderers) {
        //Elimina el objeto 3D del satélite y agrega el avión a la escena
        try{
            externalRenderers.add(view, avion);
            externalRenderers.remove(view, satelite);
        }catch(err){
            
        }
    });
}

//Solicita el objeto 3D de un satélite
function getSatelite(){
    opcAvion = false;
    opcSatelite = true;
    require(["esri/views/3d/externalRenderers"], function(externalRenderers) {
        //Elimina el objeto 3D del avión y agrega el satélite a la escena
        try{
            externalRenderers.add(view, satelite);
            externalRenderers.remove(view, avion);
        }catch(err){
            
        }
    });
}

//Incremento en la puntuación
function acierto(){
    puntos++;
    document.getElementById("puntos").textContent = puntos;
    document.getElementById("info").textContent = "¡Correcto!";
    hablar("¡Correcto!");
    getEjercicio();
}

//Indica cuando se genere un error
function error(){
    var causa = errores[Math.floor(Math.random() * errores.length-1)];
    while(causa === undefined){
        causa = errores[Math.floor(Math.random() * errores.length-1)];
    }
    document.getElementById("info").textContent = causa;
    hablar(causa);
    getEjercicio();
}

//Tipos de errores
var errores = ["¡Fallaste!",
               "¡Auch, Parece que el mapa no está centrado!", 
               "¡Te equivocaste de país!",
               "¡El zoom no es el correcto!",
               "¡Por poco lo logras!",
               "¡Incorrecto!",
               "¡El tipo de mapa no es el correcto!"];

//Información de "fotografía aérea"
var fotografia = {titulo: "Fotografía aérea", contenido: "La fotografía aérea supone un análisis de la superficie terrestre mediante el empleo de máquinas fotográficas instaladas a bordo de diversos medios aéreos. Encuentra aplicaciones en el campo de la investigación arqueológica o geológica, así como en agricultura para recabar información sobre la naturaleza de los terrenos y la extensión de los cultivos, o en el campo militar para obtener información sobre objetivos estratégicos. En arqueología se utiliza como método de prospección del subsuelo para descubrir estructuras en el subsuelo sin necesidad de excavar.", url:"http://www.notiultimas.com/digital/images/stories/mundiales/DIVERSAS/AVIONES/avion.sobre-ciudad.jpg"};

//Información de "imagen satelital"
var imagen = {titulo: "Imagen satelital", contenido: "Una imagen satelital es una representación visual de los datos reflejados por la superficie de la tierra que captura un sensor montado en un satélite artificial. Los datos son enviados a una estación terrena en donde se procesan y se convierten en imágenes, enriqueciendo nuestro conocimiento de las características de la Tierra en diferentes escalas espaciales. Los satélites de observación de la Tierra obtienen datos en el menor tiempo posible para dar seguimiento a la evolución de un fenómeno.", url:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTzIRRwWkesZDpNjVYnj34oQ97EbEq5FCY4HQIdNFyazbgwTmRJEw"};

//Lista de países para los ejercicios de la dinámica
var paises = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia",
"Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina",
"Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","República Popular China","Chipre",
"Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador",
"Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi",
"Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea Ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría",
"India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia",
"Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui",
"Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru",
"Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia",
"Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana",
"República Sudafricana","Ruanda","Rumania","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal",
"Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán",
"Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen",
"Yibuti","Zambia","Zimbabue"];