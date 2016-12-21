var view;
var opcAvion = false;
var opcSatelite = false;
var contador = 0;
var puntos = 0;
var tiposMapa = ["Imagen satelital", "Fotografía aérea"];
var tipoMapa, pais, lat, lon;
var keyBing = '055acde1923a4d5cb3b8e9ffb8d00115';

function zoom(){
    console.log(view.zoom);
}

function getObjetivo(){
    responsiveVoice.setDefaultVoice("Spanish Latin American Female");
    responsiveVoice.speak("Esta es la ultima lección del bloque 1.");
    responsiveVoice.speak("Descubrirás otros recursos para obtener información geográfica.");   
    responsiveVoice.speak("Podrás distinguir las características y utilidad de las fotografías aéreas e imágenes satelitales,  da click en el botón jugar cuándo estés listo.");
}

function getFotografia(){
    document.getElementById("pais").textContent = fotografia.titulo;
    document.getElementById("info").textContent = fotografia.contenido;
    document.getElementById("imagen").style.display = "inline";
    document.getElementById("imagen").src = fotografia.url;
}

function getImagen(){
    document.getElementById("pais").textContent = imagen.titulo;
    document.getElementById("info").textContent = imagen.contenido;
    document.getElementById("imagen").style.display = "inline";
    document.getElementById("imagen").src = imagen.url;
}

function getDinamica(){
    document.getElementById("imagen").style.display = "none";
    document.getElementById("tabla").style.display = "none";
    document.getElementById("tblMedios").style.display = "inline";
    if(contador === 0){
        view.ui.add(toggle, "bottom-left");
        responsiveVoice.speak("Deberás conseguir una imagen satelital o una foto aérea de los siguientes países.");
        responsiveVoice.speak("Selecciona el medio adecuado para obtener lo que se te pide.");
        responsiveVoice.speak("Encuentra el lugar y acércate o aléjate lo necesario para conseguir el objetivo.");
        responsiveVoice.speak("Asegúrate de haber seleccionado el tipo de mapa satelital.");
        responsiveVoice.speak("Empezemos");
    }
    if(contador >= 9 && puntos >= 7){
        document.getElementById("info").textContent = "Lección completada";
        document.getElementById("imagen").src = "http://wtfonline.mx/wp-content/uploads/2015/09/todo-bien.png";
    }else{
        if(contador > 0){
            responsiveVoice.speak("Continuemos.");
        }
        document.getElementById("pais").textContent = "¡Tómale foto!";
        tipoMapa = tiposMapa[Math.floor(Math.random() * 2)];
        pais = paises[Math.floor(Math.random() * paises.length)];
        document.getElementById("info").textContent = tipoMapa + " de " + pais;
        responsiveVoice.speak(tipoMapa + " de "+pais);
        document.getElementById("imagen").src = "";
        document.getElementById("btnSiguiente").textContent = "Tomar foto";
        document.getElementById("btnSiguiente").onclick = verificar;
    }
    contador++;
}

function verificar(){
    if(opcAvion || opcSatelite){
        if(view.map.basemap.resourceInfo.id == "satellite"){
            lat = view.center.latitude;
            lon = view.center.longitude;    
            if(tipoMapa === "Imagen satelital"){
                if(opcSatelite){
                    if(view.zoom >= 3 && view.zoom <= 6){
                        comprobarPais();
                    }else{
                        error();
                    }
                }else{
                    responsiveVoice.speak("Los aviones no pueden capturar imágenes satelitales.");
                    getDinamica();
                }
            }else{
                if(opcAvion){
                    if(view.zoom >= 13 && view.zoom <= 18){
                        comprobarPais();               
                    }else{
                        error();
                    }
                }else{
                    responsiveVoice.speak("Los satélites no toman fotografías aéreas.");
                    getDinamica();
                }
            }
        }else{
            responsiveVoice.speak("¡El tipo de mapa no es el correcto! Cámbialo e intentalo otra vez.");
        }
    }else{
        responsiveVoice.speak("Debes seleccionar el avión o el satélite.");
    }
}

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
            if(paisMapeado == pais || pais.includes(paisMapeado)){
               acierto();
            }else{
               error();
            }
        }
    });
}

function capturar(){
    html2canvas(document.body.children[2].children[0], {
        useCORS: true,
        onrendered: function(canvas) {
            document.body.appendChild(canvas);
            var myImage = canvas.toDataURL("image/png");
            window.open(myImage);
        }
    });
}

require(["esri/Map", "esri/views/SceneView","esri/widgets/BasemapToggle"],
function(Map, SceneView, BasemapToggle) {
    var map = new Map({
        basemap: "satellite"
    });

    view = new SceneView({
        container: "viewDiv",
        map: map,
        scale: 80000000,
        center: [-101.17, 21.78],
        zoom: 0
    });
    
    view.on("click", function(evt) {
        if (evt.mapPoint) {
            lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
            lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
            buscarPais();                
        }
    });
    
    toggle = new BasemapToggle({
        view: view,
        nextBasemap: "streets" 
    });
    toggle.startup();

 });

function getAvion(){
    opcAvion = true;
    opcSatelite = false;
    require(["esri/views/3d/externalRenderers"], function(externalRenderers) {
        try{
            externalRenderers.add(view, avion);
            externalRenderers.remove(view, satelite);
        }catch(err){
            
        }
    });
}

function getSatelite(){
    opcAvion = false;
    opcSatelite = true;
    require(["esri/views/3d/externalRenderers"], function(externalRenderers) {
        try{
            externalRenderers.add(view, satelite);
            externalRenderers.remove(view, avion);
        }catch(err){
            
        }
    });
}

function buscarPais(){
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+ '&key=AIzaSyA206wa_9HvHofUAhSDXZ_-XVZbERaNR64',
        type: 'GET',
        success: function(data, status, jqXHR) {
            if(data.results.length > 0){
                for (var i = 0; i < data.results[0].address_components.length; i++) {
                    if (data.results[0].address_components[i].types[0] === "country") {
                        pais = data.results[0].address_components[i].long_name;
                        buscarImagen();
                        break;
                    }                         
                }
            }
        }
    });
}

function buscarImagen(){
    require(["esri/geometry/Point"], function(Point) {
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=Fotografia aerea "+" "+pais+"&count=1",
            type: 'GET',
            headers: {'Ocp-Apim-Subscription-Key':keyBing},
            success: function(data, status, jqXHR) {
                var point = new Point({
                    latitude: lat,
                    longitude: lon
                });
                view.popup.open({
                    title: pais,
                    content: '<img src="'+data.value[0].contentUrl+'" width="200" height="100">',
                    location: point
                });
            }
        });
    });
}

function acierto(){
    puntos++;
    document.getElementById("puntos").textContent = puntos;
    document.getElementById("info").textContent = "¡Correcto!";
    responsiveVoice.speak("¡Correcto!");
    getDinamica();
}

function error(){
    var causa = errores[Math.floor(Math.random() * errores.length-1)];
    while(causa === undefined){
        causa = errores[Math.floor(Math.random() * errores.length-1)];
    }
    document.getElementById("info").textContent = causa;
    responsiveVoice.speak(causa);
    getDinamica();
}

var errores = ["¡Fallaste!",
               "¡Auch, Parece que el mapa no está centrado!", 
               "¡Te equivocaste de país!",
               "¡El zoom no es el correcto!",
               "¡Por poco lo logras!",
               "¡Incorrecto!",
               "¡El tipo de mapa no es el correcto!"];

var fotografia = {titulo: "Fotografía aérea", contenido: "La fotografía aérea supone un análisis de la superficie terrestre mediante el empleo de máquinas fotográficas instaladas a bordo de diversos medios aéreos. Encuentra aplicaciones en el campo de la investigación arqueológica o geológica, así como en agricultura para recabar información sobre la naturaleza de los terrenos y la extensión de los cultivos, o en el campo militar para obtener información sobre objetivos estratégicos. En arqueología se utiliza como método de prospección del subsuelo para descubrir estructuras en el subsuelo sin necesidad de excavar.", url:"http://www.notiultimas.com/digital/images/stories/mundiales/DIVERSAS/AVIONES/avion.sobre-ciudad.jpg"};

var imagen = {titulo: "Imagen satelital", contenido: "Una imagen satelital es una representación visual de los datos reflejados por la superficie de la tierra que captura un sensor montado en un satélite artificial. Los datos son enviados a una estación terrena en donde se procesan y se convierten en imágenes, enriqueciendo nuestro conocimiento de las características de la Tierra en diferentes escalas espaciales. Los satélites de observación de la Tierra obtienen datos en el menor tiempo posible para dar seguimiento a la evolución de un fenómeno.", url:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTzIRRwWkesZDpNjVYnj34oQ97EbEq5FCY4HQIdNFyazbgwTmRJEw"};

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