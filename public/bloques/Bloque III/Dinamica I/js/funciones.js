var countries = new Array("Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia",
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
"Yibuti","Zambia","Zimbabue");


var geocode = [
  {"latitude":33.93911,"longitude":67.709953},{"latitude":41.153332,"longitude":20.168331},{"latitude":51.165691,"longitude":10.451526},{"latitude":42.506285,"longitude":1.521801},{"latitude":-11.202692,"longitude":17.873887},{"latitude":17.060816,"longitude":-61.796428},{"latitude":23.885942,"longitude":45.079162},{"latitude":28.033886,"longitude":1.659626},{"latitude":-38.416097,"longitude":-63.61667199999999},{"latitude":40.069099,"longitude":45.038189},{"latitude":-25.274398,"longitude":133.775136},{"latitude":47.516231,"longitude":14.550072},{"latitude":40.143105,"longitude":47.576927},{"latitude":25.03428,"longitude":-77.39627999999999},{"latitude":23.684994,"longitude":90.356331},{"latitude":13.193887,"longitude":-59.543198},{"latitude":26.0667,"longitude":50.5577},{"latitude":50.503887,"longitude":4.469936},{"latitude":17.189877,"longitude":-88.49765},{"latitude":9.30769,"longitude":2.315834},{"latitude":53.709807,"longitude":27.953389},{"latitude":21.916221,"longitude":95.955974},{"latitude":-16.290154,"longitude":-63.58865299999999},{"latitude":43.915886,"longitude":17.679076},{"latitude":-22.328474,"longitude":24.684866},{"latitude":-14.235004,"longitude":-51.92528},{"latitude":4.535277,"longitude":114.727669},{"latitude":42.733883,"longitude":25.48583},{"latitude":12.238333,"longitude":-1.561593},{"latitude":-3.373056,"longitude":29.918886},{"latitude":27.514162,"longitude":90.433601},{"latitude":15.120142,"longitude":-23.6051868},{"latitude":12.565679,"longitude":104.990963},{"latitude":7.369721999999999,"longitude":12.354722},{"latitude":56.130366,"longitude":-106.346771},{"latitude":25.354826,"longitude":51.183884},{"latitude":15.454166,"longitude":18.732207},{"latitude":-35.675147,"longitude":-71.542969},{"latitude":35.86166,"longitude":104.195397},{"latitude":35.126413,"longitude":33.429859},{"latitude":41.902916,"longitude":12.453389},{"latitude":4.570868,"longitude":-74.297333},{"latitude":-11.6455,"longitude":43.3333},{"latitude":40.339852,"longitude":127.510093},{"latitude":35.907757,"longitude":127.766922},{"latitude":7.539988999999999,"longitude":-5.547079999999999},{"latitude":9.748916999999999,"longitude":-83.753428},{"latitude":45.1,"longitude":15.2},{"latitude":21.521757,"longitude":-77.781167},{"latitude":56.26392,"longitude":9.501785},{"latitude":15.414999,"longitude":-61.37097600000001},{"latitude":-1.831239,"longitude":-78.18340599999999},{"latitude":26.820553,"longitude":30.802498},{"latitude":13.794185,"longitude":-88.89653},{"latitude":23.424076,"longitude":53.847818},{"latitude":15.179384,"longitude":39.782334},{"latitude":48.669026,"longitude":19.699024},{"latitude":46.151241,"longitude":14.995463},{"latitude":40.46366700000001,"longitude":-3.74922},{"latitude":37.09024,"longitude":-95.712891},{"latitude":58.595272,"longitude":25.013607},{"latitude":9.145000000000001,"longitude":40.489673},{"latitude":12.879721,"longitude":121.774017},{"latitude":61.92410999999999,"longitude":25.748151},{"latitude":-17.713371,"longitude":178.065032},{"latitude":46.227638,"longitude":2.213749},{"latitude":-0.803689,"longitude":11.609444},{"latitude":13.443182,"longitude":-15.310139},{"latitude":32.1656221,"longitude":-82.9000751},{"latitude":7.946527,"longitude":-1.023194},{"latitude":37.1773363,"longitude":-3.5985571},{"latitude":39.074208,"longitude":21.824312},{"latitude":15.783471,"longitude":-90.23075899999999},{"latitude":4.860416,"longitude":-58.93018},{"latitude":9.945587,"longitude":-9.696645},{"latitude":1.650801,"longitude":10.267895},{"latitude":11.803749,"longitude":-15.180413},{"latitude":18.971187,"longitude":-72.285215},{"latitude":15.199999,"longitude":-86.241905},{"latitude":47.162494,"longitude":19.503304},{"latitude":20.593684,"longitude":78.96288},{"latitude":-0.789275,"longitude":113.921327},{"latitude":33.223191,"longitude":43.679291},{"latitude":32.427908,"longitude":53.688046},{"latitude":53.41291,"longitude":-8.24389},{"latitude":64.963051,"longitude":-19.020835},{"latitude":6.0683017,"longitude":171.9425583},{"latitude":-9.64571,"longitude":160.156194},{"latitude":31.046051,"longitude":34.851612},{"latitude":41.87194,"longitude":12.56738},{"latitude":18.109581,"longitude":-77.297508},{"latitude":36.204824,"longitude":138.252924},{"latitude":30.585164,"longitude":36.238414},{"latitude":48.019573,"longitude":66.923684},{"latitude":-0.023559,"longitude":37.906193},{"latitude":41.20438,"longitude":74.766098},{"latitude":1.8708833,"longitude":-157.3630262},{"latitude":29.31166,"longitude":47.481766},{"latitude":19.85627,"longitude":102.495496},{"latitude":-29.609988,"longitude":28.233608},{"latitude":56.879635,"longitude":24.603189},{"latitude":33.854721,"longitude":35.862285},{"latitude":6.428055,"longitude":-9.429499000000002},{"latitude":26.3351,"longitude":17.228331},{"latitude":47.166,"longitude":9.555373},{"latitude":55.169438,"longitude":23.881275},{"latitude":49.815273,"longitude":6.129582999999999},{"latitude":-18.766947,"longitude":46.869107},{"latitude":4.210484,"longitude":101.975766},{"latitude":-13.254308,"longitude":34.301525},{"latitude":1.977247,"longitude":73.5361035},{"latitude":17.570692,"longitude":-3.996166},{"latitude":35.937496,"longitude":14.375416},{"latitude":31.791702,"longitude":-7.092619999999999},{"latitude":-20.348404,"longitude":57.55215200000001},{"latitude":21.00789,"longitude":-10.940835},{"latitude":23.634501,"longitude":-102.552784},{"latitude":6.8874813,"longitude":158.2150717},{"latitude":47.411631,"longitude":28.369885},{"latitude":43.73841760000001,"longitude":7.424615799999999},{"latitude":46.862496,"longitude":103.846656},{"latitude":42.708678,"longitude":19.37439},{"latitude":-18.665695,"longitude":35.529562},{"latitude":-22.95764,"longitude":18.49041},{"latitude":-0.522778,"longitude":166.931503},{"latitude":28.394857,"longitude":84.12400799999999},{"latitude":12.865416,"longitude":-85.207229},{"latitude":17.607789,"longitude":8.081666},{"latitude":9.081999,"longitude":8.675277},{"latitude":60.47202399999999,"longitude":8.468945999999999},{"latitude":-40.900557,"longitude":174.885971},{"latitude":21.4735329,"longitude":55.975413},{"latitude":52.132633,"longitude":5.291265999999999},{"latitude":30.375321,"longitude":69.34511599999999},{"latitude":7.514979999999999,"longitude":134.58252},{"latitude":8.537981,"longitude":-80.782127},{"latitude":-6.314992999999999,"longitude":143.95555},{"latitude":-23.442503,"longitude":-58.443832},{"latitude":-9.189967,"longitude":-75.015152},{"latitude":51.919438,"longitude":19.145136},{"latitude":39.39987199999999,"longitude":-8.224454},{"latitude":55.378051,"longitude":-3.435973},{"latitude":6.611110999999999,"longitude":20.939444},{"latitude":49.81749199999999,"longitude":15.472962},{"latitude":41.608635,"longitude":21.745275},{"latitude":-0.228021,"longitude":15.827659},{"latitude":-4.038333,"longitude":21.758664},{"latitude":18.735693,"longitude":-70.162651},{"latitude":-30.559482,"longitude":22.937506},{"latitude":-1.940278,"longitude":29.873888},{"latitude":45.943161,"longitude":24.96676},{"latitude":61.52401,"longitude":105.318756},{"latitude":-13.759029,"longitude":-172.104629},{"latitude":17.357822,"longitude":-62.782998},{"latitude":43.94236,"longitude":12.457777},{"latitude":13.2528179,"longitude":-61.19716279999999},{"latitude":13.909444,"longitude":-60.978893},{"latitude":0.18636,"longitude":6.613080999999999},{"latitude":14.497401,"longitude":-14.452362},{"latitude":44.016521,"longitude":21.005859},{"latitude":-4.679574,"longitude":55.491977},{"latitude":8.460555,"longitude":-11.779889},{"latitude":1.352083,"longitude":103.819836},{"latitude":34.80207499999999,"longitude":38.996815},{"latitude":5.152149,"longitude":46.199616},{"latitude":7.873053999999999,"longitude":80.77179699999999},{"latitude":-26.522503,"longitude":31.465866},{"latitude":12.862807,"longitude":30.217636},{"latitude":6.876991899999999,"longitude":31.3069788},{"latitude":60.12816100000001,"longitude":18.643501},{"latitude":46.818188,"longitude":8.227511999999999},{"latitude":3.919305,"longitude":-56.027783},{"latitude":15.870032,"longitude":100.992541},{"latitude":-6.369028,"longitude":34.888822},{"latitude":38.861034,"longitude":71.276093},{"latitude":-8.874217,"longitude":125.727539},{"latitude":8.619543,"longitude":0.824782},{"latitude":-21.178986,"longitude":-175.198242},{"latitude":10.691803,"longitude":-61.222503},{"latitude":33.886917,"longitude":9.537499},{"latitude":38.969719,"longitude":59.556278},{"latitude":38.963745,"longitude":35.243322},{"latitude":-7.4784205,"longitude":178.679924},{"latitude":48.379433,"longitude":31.16558},{"latitude":1.373333,"longitude":32.290275},{"latitude":-32.522779,"longitude":-55.765835},{"latitude":41.377491,"longitude":64.585262},{"latitude":-15.376706,"longitude":166.959158},{"latitude":6.42375,"longitude":-66.58973},{"latitude":14.058324,"longitude":108.277199},{"latitude":15.552727,"longitude":48.516388},{"latitude":11.825138,"longitude":42.590275},{"latitude":-13.133897,"longitude":27.849332},{"latitude":-19.015438,"longitude":29.154857}
];

var poblaciones = [];
var view;
require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "dojo/domReady!"
  ], function(Map, SceneView, Graphic, Point, SimpleMarkerSymbol) {

    var map = new Map({
      basemap: "streets",
      ground: "world-elevation"
    });

    view = new SceneView({
      container: "viewDiv",
      map: map,
      scale: 50000000,
      center: [8.017605, 21.563851]
    });

    view.on("click", function(evt){
      if(evt.mapPoint != undefined){
        var dato = descargar(evt.mapPoint.latitude, evt.mapPoint.longitude);
        dato = JSON.parse(dato);
        //console.log(dato.results.length);
        if(dato.results.length > 0){
          var pais = dato.results[0].formatted_address;
          //console.log(pais);
          procesar.evaluar(pais);
        }
      }
      
      
      //console.log(pais);
      //console.log(evt.target.graphics);
    });


    leerTexto();
    var max = countries.length;
    var bandera = false;
    for(var i = 0; i < max; i++){
      descargarPoblacion(countries[i], i);
    }

    function descargarPoblacion(pais, indice) {
      var poblacion = "";
      var url = 'https://es.wikipedia.org/w/api.php?format=json&action=query&titles='+pais+'&prop=revisions&rvprop=content&callback=?';
    $.ajax({
      url: url,
      type: 'GET',
      async:false,
      cache:false,
      contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data, status, jqXHR) {
            //console.log(data);
            var xml = objectToXml(data);
            //console.log(xml);
            var xml = ""+xml;

            if(xml.search("\\|" +" población_estimación ") > 0){
              var n2 = xml.search("\\|"+" población_estimación ");
              var res = xml.substring(n2+23, n2+50);
              for(var i = 0; i < res.length; i++){
                if(!isNaN(res[i])){
                  poblacion += res[i]; 
                }
              }              
            }else if(xml.search("\\|"+" población ") > 0){
              var count_signo = 0;
              var n2 = xml.search("\\|"+" población ");              
                //if(n2 > 0){
                  var res = xml.substring(n2+12, n2+70);
                  for(var i = 0; i < res.length; i++){
                    if(res[i] === '='){
                      count_signo++;
                    }
                    if(res[i] === '(' || (res[i] === '|' && poblacion != "") || count_signo === 2 || (res[i] === '<')){
                      break;
                    }
                    if(!isNaN(res[i]) && res[i] != ' '){
                      poblacion += res[i];
                    }
                  }
              //}
            }else if(xml.search("\\|"+"población") > 0){
              var n2 = xml.search("\\|"+"población");              
                //if(n2 > 0){
                  var count_signo = 0;
                  var res = xml.substring(n2+10, n2+60);
                  for(var i = 0; i < res.length; i++){
                    if(res[i] === '='){
                      count_signo++;
                    }
                    if(res[i] === '(' || (res[i] === '|' && poblacion != "") || count_signo === 2 || (res[i] === '<')){
                      break;
                    }
                    if(!isNaN(res[i])){
                      poblacion += res[i];
                    }
                  }
            }else if(xml.search("\\|"+"Población") > 0){
              var n2 = xml.search("\\|"+"Población");              
                //if(n2 > 0){
                  var count_signo = 0;
                  var res = xml.substring(n2+12, n2+60);
                  for(var i = 0; i < res.length; i++){
                    if(res[i] === '='){
                      count_signo++;
                    }
                    if(res[i] === '(' || res[i] === '|' || count_signo === 2 || (res[i] === '<')){
                      break;
                    }
                    if(res[i] === "-"){
                      poblacion="";
                    }

                    if(!isNaN(res[i])){
                      poblacion += res[i];
                    }
                  }
                  //poblaciones.push(poblacion);
            }else if(xml.search("capital_población") > 0){
                var n3 = xml.search("capital_población"); 
                var res = xml.substring(n3+18, n3+30);
                for(var i = 0; i < res.length; i++){
                    if(!isNaN(res[i])){
                      poblacion += res[i];
                    }
                  }
            }
            //console.log(poblacion.trim());
            //console.log(countries[indice] + "  " + poblacion.trim());
            var auxP = "";
            for(var i = 0; i < poblacion.length; i++){
              if(poblacion[i] != ' '){
                auxP+=poblacion[i];
              }
            }
            //console.log(countries[indice]);
            //console.log(auxP);
            poblaciones[indice] = auxP;
            var seguir = true;
            for(var j = 0; j < poblaciones.length; j++){
              if(poblaciones[j] === undefined){
                seguir = false;
              }
            }
            if(seguir === true && poblaciones.length === max){
              agregarMarker();
            }
          },
        
    })
  
}

function agregarMarker(){
  //console.log(poblaciones.length);
    for(var i = 0; i < poblaciones.length; i++){     
      //console.log(countries[i] + "  " + poblaciones[i]);
      var lat = geocode[i].latitude;
      var lng = geocode[i].longitude;
      var tam = 0;
      var p = 0;
      var c = "#FF4000";
      if(poblaciones[i] != ""){        
        p = parseInt(poblaciones[i].trim());
        //console.log(p);
        if(p < 1000000){
          tam = 8;
        }else if(p > 1000000 && p < 10000000){
          tam = 14;
          c = "#00FF00";
        }else if(p > 10000000 && p < 50000000){
          tam = 18;
          c = "#0000FF";
        }else if(p > 50000000 && p < 100000000){
          tam = 23;
          c = "#FFA07A";
        }else if(p > 100000000){
          tam = 28;
          c = "#F0E68C";
        }
      }

      var point = new Point({
        longitude: lng,
        latitude: lat
      });     

      var markerSymbol = new SimpleMarkerSymbol({
        size: tam,
        color: c,
            outline: { // autocasts as new SimpleLineSymbol()
              color: [255, 64, 0, 0.4], // autocasts as new Color()
              width: 5
            }
          });

      

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        popupTemplate: {
          title: countries[i],
          content: "Población actual: " + poblaciones[i]
        }
      });
      
      
      //console.log(pointGraphic);
      //view.graphics.add(markerSymbol);
      view.graphics.addMany([pointGraphic]);
    }

}

function objectToXml(obj) {
        var xml = '';

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }

            if (obj[prop] == undefined)
                continue;

            xml += "<" + prop + ">";
            if (typeof obj[prop] == "object")
                xml += objectToXml(new Object(obj[prop]));
            else
                xml += obj[prop];

            xml += "<!--" + prop + "-->";
        }

        return xml;
    }
    
  });

var descargar = function(lat, lng) {
  var resultado = "";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&result_type=country&key=AIzaSyBpdj7XOphKt90W55zO6UFdqNtpxmFjxWc";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resultado = this.responseText;
        } else {
          resultado =  mensaje = "Error " + this.status + " " + this.statusText + " - " + this.responseURL;
          //console.log(mensaje);
        }
      }
    };
    xhr.open('GET', url, false);
    xhr.send();

    return resultado;
}

function leerTexto(){
  responsive.iniciar();
  responsive.leer("Bienvenido a la primera dinámica de la lección 1 del bloque 3, antes de iniciar con la dińamica te recomiendo que veas las simbologías, da click en el botón iniciar cuándo estés listo");
}