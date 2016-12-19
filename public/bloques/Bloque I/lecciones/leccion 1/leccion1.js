var america = false;
var europa = false;
var africa = false;
var asia = false;
var oceania = false;
var porcentaje_Conti = 10;
var porcentaje_Pregun = 11;
var termino = false;
var termino2 = false;
var termino3 = false;
var comenzo = false;
var informacion_America;
var informacion_Africa;
var informacion_Europa;
var informacion_Asia;
var informacion_Oceania;
var pregun=[];
var lat,lng;

 var _pais = function (evt){
    require(["esri/geometry/ScreenPoint"], function(ScreenPoint){
        var sp = new ScreenPoint({
            x: evt.x+14,
            y: evt.y-42
        });
        var punto = view.toMap(sp);
        if (punto) {
            if(punto.latitude && punto.longitude){
                lat = punto.latitude;
                lng = punto.longitude;   
            }
        }
    });
}


var clickMap = function (evt) {
    _pais(evt);
    nombre_corto = regresaNombreCorto(lat, lng);
    console.log(nombre_corto);
if(nombre_corto != undefined){
       var conti = regresaContinente(nombre_corto);
        view.popup.open({
          title: "Continente: "+ conti,
          location: evt.mapPoint
        });
        if(conti === "America"){
          $("#texto").text(informacion_America.cadena.split(".")[0] +". " + informacion_America.cadena.split(".")[1]+ ". " + informacion_America.cadena.split(".")[2]+ ". " + informacion_America.cadena.split(".")[3]+". " + informacion_America.cadena.split(".")[4]+ ". " + informacion_America.cadena.split(".")[5]  +". ");
          _getVideo("2_4G73UIZFo");
        }else if(conti === "Africa"){
           $("#texto").text(informacion_Africa.cadena.split(".")[0] +". " + informacion_Africa.cadena.split(".")[1]+ ". " + informacion_Africa.cadena.split(".")[2]+ ". " + informacion_Africa.cadena.split(".")[3]+". " + informacion_Africa.cadena.split(".")[4]+ ". " + informacion_Africa.cadena.split(".")[5]  +". ");
           _getVideo("ktgUMIcRp0c");
          
        }else if(conti === "Europa"){
          $("#texto").text(informacion_Europa.cadena.split(".")[0] +". " + informacion_Europa.cadena.split(".")[1]+ ". " + informacion_Europa.cadena.split(".")[2]+ ". " + informacion_Europa.cadena.split(".")[3]+". " + informacion_Europa.cadena.split(".")[4]+ ". " + informacion_Europa.cadena.split(".")[5]  +". ");
          _getVideo("-_7_exajlEs");
        }else if(conti === "Oceania"){
          $("#texto").text(informacion_Oceania.cadena.split(".")[0] +". " + informacion_Oceania.cadena.split(".")[1]+ ". " + informacion_Oceania.cadena.split(".")[2]+ ". " + informacion_Oceania.cadena.split(".")[3]+". " + informacion_Oceania.cadena.split(".")[4]+ ". " + informacion_Oceania.cadena.split(".")[6] +".");
          _getVideo("DJBd23NWa50");
        }else if(conti === "Asia"){
           $("#texto").text(informacion_Asia.cadena.split(".")[0] +". " + informacion_Asia.cadena.split(".")[1]+ ". " + informacion_Asia.cadena.split(".")[2]+ ". " + informacion_Asia.cadena.split(".")[3]+". " + informacion_Asia.cadena.split(".")[4]+ ". " + informacion_Asia.cadena.split(".")[5] +". " + informacion_Asia.cadena.split(".")[6] +". ");
          _getVideo("_4S94ucWml4");
        }      
}
}

$(document).ready(function(){

  $("#aceptar1").hide();
  $("#comenzar").hide();
  $("#listo").show();
  getWikipedia();

  $("#texto").text("Hola bienvenido a esta leccion, interectua con mAPImundo y descubre nuevas cosas acerca de los continentes. Presta mucha atencion a todo ya que lo necesitaras para pasar al siguiente nivel");

  require([
    "esri/tasks/Locator",
    "esri/Map",
    "esri/views/SceneView",
    "dojo/domReady!"
  ], function(Locator, Map, SceneView) {

   locatorTask = new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
     });

    map = new Map({
      basemap: "streets",
      ground: "world-elevation"
    });

   view = new SceneView({
      container: "viewDiv",
      map: map,
      scale: 80000000,
      center: [-101.17, 21.78],
      zoom: 0
    });
    

    procesarInformacion();

    setTimeout(
  function()
  {
    hablar("Hola bienvenido esta es tu primera lección, interactúa con mApiMundo y descubre nuevas cosas acerca de los continentes. Presta mucha atención a todo ya que lo necesitaras para pasar al siguiente nivel");
  }, 7000);


    view.on("click", function(evt) {
      if(comenzo === false){
      if (evt.mapPoint) {
        var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
    		var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
         var posi = {lat: lat, lng: lon};
         var nombre_corto;
   
      nombre_corto = regresaNombreCorto(lat, lon);
	
if(nombre_corto != undefined){
       var conti = regresaContinente(nombre_corto);
        view.popup.open({
          title: "Continente: "+ conti,
          location: evt.mapPoint
        });
        if(conti === "America"){
          $("#texto").text(informacion_America.cadena.split(".")[0] +". " + informacion_America.cadena.split(".")[1]+ ". " + informacion_America.cadena.split(".")[2]+ ". " + informacion_America.cadena.split(".")[3]+". " + informacion_America.cadena.split(".")[4]+ ". " + informacion_America.cadena.split(".")[5]  +". ");
          _getVideo("2_4G73UIZFo");
        }else if(conti === "Africa"){
           $("#texto").text(informacion_Africa.cadena.split(".")[0] +". " + informacion_Africa.cadena.split(".")[1]+ ". " + informacion_Africa.cadena.split(".")[2]+ ". " + informacion_Africa.cadena.split(".")[3]+". " + informacion_Africa.cadena.split(".")[4]+ ". " + informacion_Africa.cadena.split(".")[5]  +". ");
           _getVideo("ktgUMIcRp0c");
          
        }else if(conti === "Europa"){
          $("#texto").text(informacion_Europa.cadena.split(".")[0] +". " + informacion_Europa.cadena.split(".")[1]+ ". " + informacion_Europa.cadena.split(".")[2]+ ". " + informacion_Europa.cadena.split(".")[3]+". " + informacion_Europa.cadena.split(".")[4]+ ". " + informacion_Europa.cadena.split(".")[5]  +". ");
          _getVideo("-_7_exajlEs");
        }else if(conti === "Oceania"){
          $("#texto").text(informacion_Oceania.cadena.split(".")[0] +". " + informacion_Oceania.cadena.split(".")[1]+ ". " + informacion_Oceania.cadena.split(".")[2]+ ". " + informacion_Oceania.cadena.split(".")[3]+". " + informacion_Oceania.cadena.split(".")[4]+ ". " + informacion_Oceania.cadena.split(".")[6] +".");
          _getVideo("DJBd23NWa50");
        }else if(conti === "Asia"){
           $("#texto").text(informacion_Asia.cadena.split(".")[0] +". " + informacion_Asia.cadena.split(".")[1]+ ". " + informacion_Asia.cadena.split(".")[2]+ ". " + informacion_Asia.cadena.split(".")[3]+". " + informacion_Asia.cadena.split(".")[4]+ ". " + informacion_Asia.cadena.split(".")[5] +". " + informacion_Asia.cadena.split(".")[6] +". ");
          _getVideo("_4S94ucWml4");
        }      
}

    }
    }
    });

  });


  $("#listo").click(function(){
    $("#video").remove();
    comenzo = true;
    $("#aceptar1").show();
    $("#listo").hide();
    $("#texto").text("¿Estas preparado?. ¿Puedes identificar a los continentes en lo que se divide la tierra?");
    hablar("Al parecer estas listo, Vamos a ver si logras identificar a los continentes en los que se divide la tierra");
  });



  $("#aceptar1").click(function(){
    if(termino===false){
      $("#aceptar1").hide();
      $('#imagen').append("<center><img src='radar.png' height='325' width='325' class='animated infinite flash'></center>");
      $("#texto").text("AQUI VAMOS!! Ubica y selecciona al continente Americano");
      hablar("AQUI VAMOS!! Ubica y selecciona al continente Americano");

      clickMap=function(evt){
        _pais(evt);
        var nombre_corto = regresaNombreCorto(lat, lng);
  
console.log("regreso el nombre corto" + nombre_corto);
       var conti = regresaContinente(nombre_corto);
       console.log("Regreso el continente " + conti);

        if (evt.mapPoint) {
          //var valor = regresaContinente(evt);
              evalua(conti);
        }
      }
      

      view.on("click", function(evt) {
        var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
    		var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
       var nombre_corto = regresaNombreCorto(lat, lon);
	
console.log("regreso el nombre corto" + nombre_corto);
       var conti = regresaContinente(nombre_corto);
       console.log("Regreso el continente " + conti);

        if (evt.mapPoint) {
          //var valor = regresaContinente(evt);
              evalua(conti);
        }
      });
    }else if(termino === true && termino2 === false){
        //getWikipedia();
      $("#texto").text("Ahora vamos a ver que tanto conoces y aprendiste de estos continentes. Lee (escucha) los siguientes textos y selecciona el continente del que se habla.");
      hablar("Ahora vamos a ver que tanto conoces y aprendiste de estos continentes. Lee (escucha) los siguientes textos y selecciona el continente del que se habla.");

       $("#aceptar1").hide();
       $("#comenzar").show();
    }else if(termino === true && termino2 === true && termino3 === false){
      var calificacion = (porcentaje_Conti + porcentaje_Pregun)/2
      //$("#texto").text("Tus resultados de esta leccion son los siguientes: \n Busca los continentes: " + porcentaje_Conti +
      //"\n Preguntas: " + porcentaje_Pregun);
      $("#texto").empty();
      $("#informacion").html("<h3>Tus resultados de esta leccion son los siguientes:</h3><br/>"+
      "<h3>Ubicar a los continentes: " + porcentaje_Conti+ "</h3>"+
      "<h3>Preguntas sobre continentes: " + porcentaje_Pregun+ "</h3>"+
      "<h3>Calificacion final:" + calificacion+ "</h3>");
      console.log(calificacion);
      if(calificacion==10){
        hablar("Felicidades has terminado la primer leccion con un desempeño excelente");
      }else if(calificacion>=8 && calificacion<10){
        hablar("Muy bien has terminado la primer leccion con un desempeño bueno");
      }else if(calificacion>=6 && calificacion<8){
        hablar("Muy bien has terminado la primer leccion con un desempeño aceptable");
      }else if(calificacion<6){
        hablar("Rayos! no has logrado pasar este nivel. Vulve a intentarlo con mas atencion.");
      }

      
      $("#aceptar1").html("Terminar");
      termino3= true;
    }else{
    window.location="http://localhost:3000/";
  }
});


$("#comenzar").click(function(){
  $("#comenzar").hide();
var arreglo = pedirInformacion();
  $("#comenzar").hide();
  //$("#siguiente").show();
  preguntas(arreglo);
  var contador = 0;
/*
  clickMap=function(evt){
        _pais(evt);
        var nombre_corto = regresaNombreCorto(lat, lng);

       var conti = regresaContinente(nombre_corto);
 
    //var valor = regresaContinente(evt);
    if(conti !== "nada"){
    evaluarRespuesta(conti,arreglo, contador);
    contador++;
    }
      }
*/
  view.on("click", function(evt) {
    if (evt.mapPoint) {
      var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
    		var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
       var nombre_corto = regresaNombreCorto(lat, lon);

       var conti = regresaContinente(nombre_corto);
 
    //var valor = regresaContinente(evt);
    if(conti !== "nada"){
    evaluarRespuesta(conti,arreglo, contador);
    contador++;
    }
  }
  });

});


});


var hablar = function(texto){
  console.log("aqui se esta hablando");
  responsiveVoice.speak(texto, "Spanish Latin American Female");
};


//////////////// EVALUA RESPUESTA DE LA PREGUNTA //////////////////////////////////77
var evaluarRespuesta = function(valor,arreglo, contador){
   var c = $("#texto").attr("continente");
  if(valor === c){
    //alert("Correcto");
    $('#imagen').empty();
    $('#imagen').append("<center><img src='Palomita.png' class='animated infinite rubberBand'></center>");
    hablar("Correcto, perfecto, lo entiendo");
 
  }else{
    $('#imagen').empty();
    $('#imagen').append("<center><img src='tache.png' class='animated infinite rubberBand'></center>");
    console.log(porcentaje_Pregun);
    porcentaje_Pregun = porcentaje_Pregun -1;
    hablar("fallaste");
 
  }
  setTimeout(
  function()
  {
    $('#imagen').empty();
   if(contador<10){
    preguntas(arreglo);
    }else{
    termino2=true;
    //alert("Terminaste");
    hablar("Muy bien has terminado la leccion 1. Presiona siguiente para ver tus resultados");
    $("#texto").text("Muy bien has terminado la leccion 1. Presiona siguiente para ver tus resultados");
    $("#aceptar1").html("Siguiente");
    $("#aceptar1").show();
    
  }    
  }, 3000);

};

var preguntas = function(arreglo){
  var repetido = false;
  var numero = Math.floor((Math.random() * 29) + 1);
  for(var i=0;i<pregun.length;i++){
    if(pregun[i] === numero){
      repetido = true;
      break;
    }
  }
  if(repetido === false){
    console.log("Se agrego el num " + numero);
    pregun.push(numero);
  $("#texto").text(arreglo[numero].descripcion);
  hablar(arreglo[numero].descripcion);
  $("#texto").attr("continente", arreglo[numero].continente);
  }else{
    console.log("Se repitio el numero: "+ numero + " Se va a crear otra pregunta");
    preguntas(arreglo);
  }
};


var getWikipedia = function(){
var url = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=5000&explaintext&titles=América&format=json&callback=?";
_hacerConsulta(url, "america");
var url2 = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=5000&explaintext&titles=África&format=json&callback=?";
_hacerConsulta(url2, "africa");
var url3 = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=5000&explaintext&titles=Europa&format=json&callback=?";
_hacerConsulta(url3, "europa");
var url4 = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=5000&explaintext&titles=Asia&format=json&callback=?";
_hacerConsulta(url4, "asia");
var url5 = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=5000&explaintext&titles=Oceanía&format=json&callback=?";
_hacerConsulta(url5, "oceania");
};

var procesarInformacion = function(){
  for (var i in informacion_America) {
  informacion_America = {"continente": informacion_America[i].title.replace("é","e"), "cadena": informacion_America[i].extract};
}for (var j in informacion_Africa) {
  informacion_Africa = {"continente": informacion_Africa[j].title.replace("Á","A"), "cadena": informacion_Africa[j].extract};
}for (var k in informacion_Europa) {
  informacion_Europa = {"continente": informacion_Europa[k].title, "cadena": informacion_Europa[k].extract};
}for (var l in informacion_Asia) {
  informacion_Asia = {"continente": informacion_Asia[l].title, "cadena": informacion_Asia[l].extract};
}for (var m in informacion_Oceania) {
  informacion_Oceania = {"continente": informacion_Oceania[m].title.replace("í","i"), "cadena": informacion_Oceania[m].extract};
  }
};

var pedirInformacion = function(){
 //procesarInformacion();
var arreglo = [];
for(var x =0 ; x<6;x++){
arreglo.push({continente: informacion_Africa.continente, descripcion:informacion_Africa.cadena.split(".")[x].replace("África", "Este continente").replace(/[\n=]/gi,"")});
arreglo.push({continente: informacion_America.continente, descripcion:informacion_America.cadena.split(".")[x].replace("América", "Este continente").replace(/[\n=]/gi,"")});
arreglo.push({continente: informacion_Asia.continente, descripcion:informacion_Asia.cadena.split(".")[x].replace("Asia", "Este continente").replace(/[\n=]/gi,"")});
arreglo.push({continente: informacion_Oceania.continente, descripcion:informacion_Oceania.cadena.split(".")[x].replace("Oceanía", "Este continente").replace(/[\n=]/gi,"").replace("[cita requerida]", "")});
arreglo.push({continente: informacion_Europa.continente, descripcion:informacion_Europa.cadena.split(".")[x].replace("Europa", "Este continente").replace(/[\n=]/gi,"")});
}

return arreglo;
};


var evalua = function(valor){
  if(valor === "nada"){
    hablar("Vamos! Intenta seleccionar un continente."); 
  }else if(valor === "fallaste"){
    hablar("Fallaste, intentalo una vez mas"); 
  }
  else if(america === false){
    if(valor !==""){
          identificaContinentes(valor,"America");
    }
  }else if(europa === false){
    if(valor === ""){
     $("#texto").text("BIEN!! ¿Ahora puedes ubicar y seleccionar al continente Europeo?");
    hablar("BIEN!! ¿Ahora puedes ubicar y seleccionar al continente Europeo?");
    }
    if(valor !==""){
     identificaContinentes(valor,"Europa");
   }
  }else if(africa === false){
  	if(valor === ""){
      $("#texto").text("MUY BIEN, SIGAMOS!! Ubica y selecciona al continente Africano");
    hablar("MUY BIEN, SIGAMOS!! Ubica y selecciona al continente Africano");
    }
   
    if(valor !==""){
     identificaContinentes(valor,"Africa");
   }
  }else if(asia === false){
  	if(valor === ""){
     $("#texto").text("EXCELENTE!! Ahora intenta ubicar y seleccionar al continente Asiatico");
    hablar("EXCELENTE!! Ahora intenta ubicar y seleccionar al continente Asiatico");
    }
    
    if(valor !==""){
     identificaContinentes(valor,"Asia");
   }
  }else if(oceania === false){
  	if(valor === ""){
     $("#texto").text("PERFECTO!! ¿Puedes hacer una más? Ubica y selecciona a Oceania");
    hablar("PERFECTO!! ¿Puedes hacer una más? Ubica y selecciona a Oceania");
    }
    
    if(valor !==""){
     identificaContinentes(valor,"Oceania");
   }
 }else if(termino === false){
   $("#imagen").empty();
   $("#texto").text("Muy bien has terminado la primer parte. Ahora vamos a ver que tanto conoces y aprendiste de estos continentes. Lee (escucha) los siguientes textos y selecciona el continente del que se habla.");
   hablar("Ahora vamos a ver que tanto conoces y aprendiste de estos continentes. Lee (escucha) los siguientes textos y selecciona el continente del que se habla.");
    $("#comenzar").show();
    termino = true;
  }
};

/////////////////Comparar el continente seleccionado con el que le pide el juego///////////////////////////////////
var identificaContinentes = function(valor,continente){
    
      if(continente !== valor){
        porcentaje_Conti = porcentaje_Conti-2;
        evalua("fallaste");
      }
      else if(valor === continente && continente === "America"){
      america = true;
      evalua("");
    }else if(valor === continente && continente === "Europa"){
      europa = true;
      evalua("");
    }else if(valor === continente && continente === "Africa"){
      africa = true;
      evalua("");
    }else if(valor === continente && continente === "Asia"){
      asia = true;
      evalua("");
    }else if(valor === continente && continente === "Oceania"){
      oceania = true;
      evalua("");
    }
};


//////////////////////////////////////REGRESA CONTINENTE/////////////////////////////////////////

var regresaContinente = function(pais){
  
  if(pais === undefined){
    return "nada";
  }else if(pais === "AU"){
    return "Oceania";
  }
  else if(pais === "RU"){
    return "Asia";
  }else if(pais === "AT"){
    return "Europa";
  }else if(pais==="MX"){
    return "America";
  }else{
    var contin =  informacionPais(pais);
    if(contin === "Europe & Central Asia" ){
      contin = "Europa";
    }else if(contin === "East Asia & Pacific" || contin === "South Asia"){
      contin = "Asia";
    }else if(contin.indexOf('Africa')!=-1) {
    contin = "Africa";
    }else if(contin.indexOf('America')!=-1) {
    contin = "America";
    }
  }

  return contin;
   
};


  
var _hacerConsulta = function(url, variable){
  $.ajaxSetup({
  async: false
  });
    $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    async: false,
        success: function(data) {
          if(variable === "america"){
          informacion_America = data.query.pages;
        }else if(variable === "africa"){
          informacion_Africa = data.query.pages;
        }else if(variable === "europa"){
          informacion_Europa = data.query.pages;
        }else if(variable === "asia"){
          informacion_Asia = data.query.pages;
        }else if(variable === "oceania"){
          informacion_Oceania = data.query.pages;
        }
          //console.log(data);
        }
    });
  };

  var _getVideo = function(id){

    $("#video").html("<iframe width='250' height='100' src='https://www.youtube.com/embed/"+id+"' allowfullscreen></iframe>");
         
  };


var hablar = function(texto){
  console.log("aqui se esta hablando");
  responsiveVoice.speak(texto, "Spanish Latin American Female");
};

  
var informacionPais = function(pais){   
    var valor;
var urls= "http://api.worldbank.org/countries/"+pais;

$.ajax({
 url: '/banca?url='+urls,
  type: 'GET',
  async: false,  
     success: function(data, status, jqXHR) {
      console.log(data);
       valor = data["wb:countries"]["wb:country"][0]["wb:region"][0]["_"];

          
  },
  error: function() {
    console.log( "Ha ocurrido un error" );
  }
});

return valor;
}


var regresaNombreCorto = function(lat, lon){
var valor;
var url='https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&result_type=country&key=AIzaSyD-EI11dYryAArSWeTEGigQukmcM3TZDSA';
	$.ajax({
		url : url,
		type : "GET",
		dataType: "json" ,
		success: function(data){
      console.log(data.results);
      if (data.results.length ==1) { 
            if (data.status==="OK") {
              console.log(data);
                valor = data.results[0].address_components[0].short_name;
            }

        }else{
          console.log('No results found');
        }
    }
	});
return valor;
}
