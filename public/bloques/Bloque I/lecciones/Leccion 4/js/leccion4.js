//Indican el mapa en 3D, tipo de imagen para cada ejercicio, nombre del país a buscar,
//latitud y longitud de donde se colocó el avión o el satélite
var view, tipoMapa, pais, lat, lon, rnd;
//Indican que objeto 3D (avión/satélite) se seleccionó
var opcAvion = false;
var opcSatelite = false;
//Almacena número de ejercicios, obligatorios = 10
var contador = 0;
//Almacena puntuación de la lección
var puntos = 0;
//Opciones de imagen para la dinámica
var tiposMapa = ["Imagen satelital", "Fotografía aérea"];
//Indica si obtuvo ayuda para localizar el país
var ayuda = false;

//Objetivo de la leccion de texto a voz
function getObjetivo(){
    document.getElementById("user").innerHTML = "<i class='fa fa-user-circle-o' aria-hidden='true'></i> "+ (localStorage.usuario).toUpperCase();
    hablar(localStorage.usuario+" esta es la ultima lección del bloque 1. Descubrirás otros recursos para obtener información geográfica. Podrás distinguir las características y utilidad de las fotografías aéreas e imágenes satelitales,  da click en el botón jugar cuándo estés listo.");
}

//Cuando el usuario necesita ayuda para buscar el país
function buscar(){
    ayuda = true;
    lat = geocode[rnd].latitude;
    lon = geocode[rnd].longitude;
    view.goTo({target: [lon, lat]});
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
    document.getElementById("imgBoton").src = "img/camara.png";
    document.getElementById("imgBoton").width = "80";
    document.getElementById("imgBoton").height = "80";
    
    //Instrucciones de la dinámica
    view.ui.add(toggle, "bottom-left");
    toggle._imageBackgroundNode.className += " leap-interactive";
    //console.log(toggle._imageBackgroundNode.className);
    document.getElementById("info").textContent = "Consigue una imagen satelital o una foto aérea de los siguientes países. Selecciona el avión o el satélite según corresponda y llévalo hasta el país solicitado. Acercáte o aléjate lo necesario para conseguir el objetivo.";
    hablar("Deberás conseguir una imagen satelital o una foto aérea de los siguientes países. Selecciona el medio adecuado para obtener lo que se te pide. Encuentra el lugar y acércate o aléjate lo necesario para conseguir el objetivo. Te puedo ayudar a buscar el país pero si aciertas solo ganarás medio punto. Empezemos", getEjercicio);
}

function getEjercicio(){
    //Finalizó dinámica
    if(contador >= 9 && puntos >= 7){
        terminar();
    }    
    //Siguiente ejercicio, otro país, diferente tipo de imagen (satelital o aérea)
    else{
        if(contador > 0){
            hablar("Continuemos.");
        }
        ayuda = false;
        document.getElementById("pais").textContent = "¡Tómale foto!";
        tipoMapa = tiposMapa[Math.floor(Math.random() * 2)];
        rnd = Math.floor(Math.random() * paises.length);
        pais = paises[rnd];
        document.getElementById("info").textContent = tipoMapa + " de " + pais;
        hablar(tipoMapa+" de "+pais);
        document.getElementById("imagen").src = "";
        document.getElementById("btnJugar").style.display = "inline";
        document.getElementById("btnBuscar").style.display = "inline";
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
    if(ayuda){
        puntos = puntos - 0.5;
    }
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

//Finaliza lección y guarda en la base de datos
function terminar(){
    hablar("Felicidades has terminado la lección con "+puntos+" puntos.");
    document.getElementById("tblMedios").style.display = "none";
    document.getElementById("btnJugar").style.display = "none";
    document.getElementById("btnBuscar").style.display = "none";
    document.getElementById("info").textContent = "";
    document.getElementById("pais").textContent = "Lección completada";
    document.getElementById("imagen").src = "img/bien.png";
    document.getElementById("imagen").width = "300";
    document.getElementById("imagen").height = "300";
    document.getElementById("imagen").style.display = 'inline';
    var user = localStorage.usuario;
    $.ajax({
        type: "PUT",
        url: "/userUpdate",
        async: false,
        data: {user: user, puntaje: puntos, bloque: "bloque1", leccion: leccion4},
        success: function(data){
            window.location = "http://localhost:3000/indice.html"
        }
    });
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

var geocode = [
  {"latitude":33.93911,"longitude":67.709953},{"latitude":41.153332,"longitude":20.168331},{"latitude":51.165691,"longitude":10.451526},{"latitude":42.506285,"longitude":1.521801},{"latitude":-11.202692,"longitude":17.873887},{"latitude":17.060816,"longitude":-61.796428},{"latitude":23.885942,"longitude":45.079162},{"latitude":28.033886,"longitude":1.659626},{"latitude":-38.416097,"longitude":-63.61667199999999},{"latitude":40.069099,"longitude":45.038189},{"latitude":-25.274398,"longitude":133.775136},{"latitude":47.516231,"longitude":14.550072},{"latitude":40.143105,"longitude":47.576927},{"latitude":25.03428,"longitude":-77.39627999999999},{"latitude":23.684994,"longitude":90.356331},{"latitude":13.193887,"longitude":-59.543198},{"latitude":26.0667,"longitude":50.5577},{"latitude":50.503887,"longitude":4.469936},{"latitude":17.189877,"longitude":-88.49765},{"latitude":9.30769,"longitude":2.315834},{"latitude":53.709807,"longitude":27.953389},{"latitude":21.916221,"longitude":95.955974},{"latitude":-16.290154,"longitude":-63.58865299999999},{"latitude":43.915886,"longitude":17.679076},{"latitude":-22.328474,"longitude":24.684866},{"latitude":-14.235004,"longitude":-51.92528},{"latitude":4.535277,"longitude":114.727669},{"latitude":42.733883,"longitude":25.48583},{"latitude":12.238333,"longitude":-1.561593},{"latitude":-3.373056,"longitude":29.918886},{"latitude":27.514162,"longitude":90.433601},{"latitude":15.120142,"longitude":-23.6051868},{"latitude":12.565679,"longitude":104.990963},{"latitude":7.369721999999999,"longitude":12.354722},{"latitude":56.130366,"longitude":-106.346771},{"latitude":25.354826,"longitude":51.183884},{"latitude":15.454166,"longitude":18.732207},{"latitude":-35.675147,"longitude":-71.542969},{"latitude":35.86166,"longitude":104.195397},{"latitude":35.126413,"longitude":33.429859},{"latitude":41.902916,"longitude":12.453389},{"latitude":4.570868,"longitude":-74.297333},{"latitude":-11.6455,"longitude":43.3333},{"latitude":40.339852,"longitude":127.510093},{"latitude":35.907757,"longitude":127.766922},{"latitude":7.539988999999999,"longitude":-5.547079999999999},{"latitude":9.748916999999999,"longitude":-83.753428},{"latitude":45.1,"longitude":15.2},{"latitude":21.521757,"longitude":-77.781167},{"latitude":56.26392,"longitude":9.501785},{"latitude":15.414999,"longitude":-61.37097600000001},{"latitude":-1.831239,"longitude":-78.18340599999999},{"latitude":26.820553,"longitude":30.802498},{"latitude":13.794185,"longitude":-88.89653},{"latitude":23.424076,"longitude":53.847818},{"latitude":15.179384,"longitude":39.782334},{"latitude":48.669026,"longitude":19.699024},{"latitude":46.151241,"longitude":14.995463},{"latitude":40.46366700000001,"longitude":-3.74922},{"latitude":37.09024,"longitude":-95.712891},{"latitude":58.595272,"longitude":25.013607},{"latitude":9.145000000000001,"longitude":40.489673},{"latitude":12.879721,"longitude":121.774017},{"latitude":61.92410999999999,"longitude":25.748151},{"latitude":-17.713371,"longitude":178.065032},{"latitude":46.227638,"longitude":2.213749},{"latitude":-0.803689,"longitude":11.609444},{"latitude":13.443182,"longitude":-15.310139},{"latitude":32.1656221,"longitude":-82.9000751},{"latitude":7.946527,"longitude":-1.023194},{"latitude":37.1773363,"longitude":-3.5985571},{"latitude":39.074208,"longitude":21.824312},{"latitude":15.783471,"longitude":-90.23075899999999},{"latitude":4.860416,"longitude":-58.93018},{"latitude":9.945587,"longitude":-9.696645},{"latitude":1.650801,"longitude":10.267895},{"latitude":11.803749,"longitude":-15.180413},{"latitude":18.971187,"longitude":-72.285215},{"latitude":15.199999,"longitude":-86.241905},{"latitude":47.162494,"longitude":19.503304},{"latitude":20.593684,"longitude":78.96288},{"latitude":-0.789275,"longitude":113.921327},{"latitude":33.223191,"longitude":43.679291},{"latitude":32.427908,"longitude":53.688046},{"latitude":53.41291,"longitude":-8.24389},{"latitude":64.963051,"longitude":-19.020835},{"latitude":6.0683017,"longitude":171.9425583},{"latitude":-9.64571,"longitude":160.156194},{"latitude":31.046051,"longitude":34.851612},{"latitude":41.87194,"longitude":12.56738},{"latitude":18.109581,"longitude":-77.297508},{"latitude":36.204824,"longitude":138.252924},{"latitude":30.585164,"longitude":36.238414},{"latitude":48.019573,"longitude":66.923684},{"latitude":-0.023559,"longitude":37.906193},{"latitude":41.20438,"longitude":74.766098},{"latitude":1.8708833,"longitude":-157.3630262},{"latitude":29.31166,"longitude":47.481766},{"latitude":19.85627,"longitude":102.495496},{"latitude":-29.609988,"longitude":28.233608},{"latitude":56.879635,"longitude":24.603189},{"latitude":33.854721,"longitude":35.862285},{"latitude":6.428055,"longitude":-9.429499000000002},{"latitude":26.3351,"longitude":17.228331},{"latitude":47.166,"longitude":9.555373},{"latitude":55.169438,"longitude":23.881275},{"latitude":49.815273,"longitude":6.129582999999999},{"latitude":-18.766947,"longitude":46.869107},{"latitude":4.210484,"longitude":101.975766},{"latitude":-13.254308,"longitude":34.301525},{"latitude":1.977247,"longitude":73.5361035},{"latitude":17.570692,"longitude":-3.996166},{"latitude":35.937496,"longitude":14.375416},{"latitude":31.791702,"longitude":-7.092619999999999},{"latitude":-20.348404,"longitude":57.55215200000001},{"latitude":21.00789,"longitude":-10.940835},{"latitude":23.634501,"longitude":-102.552784},{"latitude":6.8874813,"longitude":158.2150717},{"latitude":47.411631,"longitude":28.369885},{"latitude":43.73841760000001,"longitude":7.424615799999999},{"latitude":46.862496,"longitude":103.846656},{"latitude":42.708678,"longitude":19.37439},{"latitude":-18.665695,"longitude":35.529562},{"latitude":-22.95764,"longitude":18.49041},{"latitude":-0.522778,"longitude":166.931503},{"latitude":28.394857,"longitude":84.12400799999999},{"latitude":12.865416,"longitude":-85.207229},{"latitude":17.607789,"longitude":8.081666},{"latitude":9.081999,"longitude":8.675277},{"latitude":60.47202399999999,"longitude":8.468945999999999},{"latitude":-40.900557,"longitude":174.885971},{"latitude":21.4735329,"longitude":55.975413},{"latitude":52.132633,"longitude":5.291265999999999},{"latitude":30.375321,"longitude":69.34511599999999},{"latitude":7.514979999999999,"longitude":134.58252},{"latitude":8.537981,"longitude":-80.782127},{"latitude":-6.314992999999999,"longitude":143.95555},{"latitude":-23.442503,"longitude":-58.443832},{"latitude":-9.189967,"longitude":-75.015152},{"latitude":51.919438,"longitude":19.145136},{"latitude":39.39987199999999,"longitude":-8.224454},{"latitude":55.378051,"longitude":-3.435973},{"latitude":6.611110999999999,"longitude":20.939444},{"latitude":49.81749199999999,"longitude":15.472962},{"latitude":41.608635,"longitude":21.745275},{"latitude":-0.228021,"longitude":15.827659},{"latitude":-4.038333,"longitude":21.758664},{"latitude":18.735693,"longitude":-70.162651},{"latitude":-30.559482,"longitude":22.937506},{"latitude":-1.940278,"longitude":29.873888},{"latitude":45.943161,"longitude":24.96676},{"latitude":61.52401,"longitude":105.318756},{"latitude":-13.759029,"longitude":-172.104629},{"latitude":17.357822,"longitude":-62.782998},{"latitude":43.94236,"longitude":12.457777},{"latitude":13.2528179,"longitude":-61.19716279999999},{"latitude":13.909444,"longitude":-60.978893},{"latitude":0.18636,"longitude":6.613080999999999},{"latitude":14.497401,"longitude":-14.452362},{"latitude":44.016521,"longitude":21.005859},{"latitude":-4.679574,"longitude":55.491977},{"latitude":8.460555,"longitude":-11.779889},{"latitude":1.352083,"longitude":103.819836},{"latitude":34.80207499999999,"longitude":38.996815},{"latitude":5.152149,"longitude":46.199616},{"latitude":7.873053999999999,"longitude":80.77179699999999},{"latitude":-26.522503,"longitude":31.465866},{"latitude":12.862807,"longitude":30.217636},{"latitude":6.876991899999999,"longitude":31.3069788},{"latitude":60.12816100000001,"longitude":18.643501},{"latitude":46.818188,"longitude":8.227511999999999},{"latitude":3.919305,"longitude":-56.027783},{"latitude":15.870032,"longitude":100.992541},{"latitude":-6.369028,"longitude":34.888822},{"latitude":38.861034,"longitude":71.276093},{"latitude":-8.874217,"longitude":125.727539},{"latitude":8.619543,"longitude":0.824782},{"latitude":-21.178986,"longitude":-175.198242},{"latitude":10.691803,"longitude":-61.222503},{"latitude":33.886917,"longitude":9.537499},{"latitude":38.969719,"longitude":59.556278},{"latitude":38.963745,"longitude":35.243322},{"latitude":-7.4784205,"longitude":178.679924},{"latitude":48.379433,"longitude":31.16558},{"latitude":1.373333,"longitude":32.290275},{"latitude":-32.522779,"longitude":-55.765835},{"latitude":41.377491,"longitude":64.585262},{"latitude":-15.376706,"longitude":166.959158},{"latitude":6.42375,"longitude":-66.58973},{"latitude":14.058324,"longitude":108.277199},{"latitude":15.552727,"longitude":48.516388},{"latitude":11.825138,"longitude":42.590275},{"latitude":-13.133897,"longitude":27.849332},{"latitude":-19.015438,"longitude":29.154857}
];