// textos para reproducir  en a leccion 2
var texto = "Bienvenido a la leccion 2, ahora aprenderemos nuevas formas de representar el espacio geográfico. Veamos los tipos en que se representa el espacio geográfico."+"    Da click sobre iniciar" ;
var texto2 = "Presta mucha atencion "
var continentalText = "En el planisferio y en los mapas continentales, se representa reducida la extensión territorial de los países. y se muestra un continente completo  como:  "+" América, "+"  Africa, " +" Asia, "+" Oseanía, "+ " Europa ";
var nacionalText = "En un mapa territorial o nacional, como  el de México , la porción terrestre mostrada corresponde a cada país. y los estados en los que se divide ";
var estatalText = "Un mapa estatal muestra un estado o regíon perteneciente a pais ";
var municipalText = "Un mapa municipal muestra las regiones en que se divide un estado  ";
// nombre  del personaje
var personajeName= "Paco";
var ayudaOli = "Ayuda a "+personajeName+" a llegar a su escuela tienes que indicarle donde esta su escuela ";
//variable para dar instruciones en cada  paso de la dinamica
var instrucion="";
//puntacion a lo largo de la instrucion
var puntuacion=0;
//intentos 
var intentos=0;

// puntuacion final
var puntuacionFinal=0;
// direcion  de la escuela del personaje
var direcionEscuela = { continente: "Americano",
                         pais: "México",
                         estado: "Oaxaca",
                         municipio: "Oaxaca de juarez",
                         direcion: "Instituto Tecnologico de Oaxaca"
    
                        } 

// banderas auxiliares

var banderaContinental= false;
var banderaNacional = false;
var banderaEstatal= false;
var banderaMunicipal = false;
var banderaFin = false;
// posiscion  de continentes
var continente = { America:  {lat: 	32.05747949841406, lng: -89.67295446239592}, 
                   Europa: {lat: 48.46170337680241, lng: 	14.88124382393645} , 
                  Asia: {lat: 51.619583120617165,lng: 76.0741449972935},
                   Africa:  {lat: 10.046259269882993, lng: 22.37702071986987},
                  Ociania: {lat: -27.989022770151408, lng: 141.2132713845386}
                 };


var pos= {lat: 22.1078927, lng: -1.6537901};
 var geocoder;

var view;
var pais;
var map;

// solicitud del mapa en 3D
// inicio
    require([
   "esri/Map",
   "esri/views/SceneView",
   "dojo/domReady!"
 ], function(Map, SceneView) {
   var map = new Map({
     basemap: "satellite",
     ground: "world-elevation"
   });

   view = new SceneView({
     container: "viewDiv",
     map: map,
     scale: 80000000,
     center: [22.1078927, -1.6537901],
     zoom: 5
   });


   view.on("click", function(evt) {
     if (evt.mapPoint) {
     		var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
    		var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
         var posi = {lat: lat, lng: lon};
            // se obtiene la  latitud y longitud del mapa en 3d
         // se manda  la posicion  a la funcion buscar pais
         
		    buscarPais(posi,evt);
       
     }
   });
     if(!banderaFin){
         // en caso de que no ha  terminado la dinamica se inicia  a dar indicaciones
         responsive.iniciar();
         responsive.leer(texto);  
         var div = document.getElementById("texto");
         var con = document.createElement("div");
         con.innerHTML= ' <button type="submit" id="continental" onclick="continental();">Iniciar </button>';
         div.appendChild(con);
     }
     
    }
 ); 
    


// final ----


// funcion pais  recibe una altitud y latitud
// utilizando google maps  regresa el nombre el pais
// importante !!!  se busca el pais  al final de un arreglo
  var buscarPais= function (latlng, evet) {
      
   geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': latlng}, function(results, status) {
      
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {     
          var p = results[1].address_components.length;
           pais=results[1].address_components[p-1];
        
             dinamicaDirecion(pais);
          
          //se muestra un setModal en el mapa 3d
            view.popup.open({
           title:pais.long_name,
               content: "", // aqui puede mostrar mas informacion
              location:  evet.mapPoint
        });
          //fin
          
          
      } else {
       console.log('No results found');
      }
    } else {
      console.log( status);
      
    }
  });
   
    
  }





// redacta el texto de que trata  un mapa continental
var continental = function(){
    responsive.iniciar( ); 
   
  responsive.leer(continentalText);
    
    // inicia la dinamica 
     dinamica();
   
}
// funcion que describe que es "un mapa  estatal"
var estatal = function(){
   responsive.iniciar();
  responsive.leer(estatalText);
 
  
  
}
// funcion que describe que es "un mapa municipal"
var municipal = function(){
   responsive.iniciar();  
  responsive.leer(municipalText);
  
  
  
}

// funcion de inicio de  la dinamica
var dinamica = function(){
    
                pasouno();
            responsive.iniciar();  
             responsive.leer("ahora puedes ayudar a "+personajeName+" a llegar a su escuela");
           
            responsive.iniciar();  
                  instrucion="Indicale en el mapa continental en donde se encuentra el pais de " + personajeName;
             responsive.leer(instrucion);
              
               banderaContinental = true;
       
  
}


// muestra  el personaje  y  su direcion en la pantalla  de informacion
var pasouno = function(){   

    
    var div = document.getElementById("texto");
    div.setAttribute("align" , "center");
    var div2 = document.createElement("div");
    
    var p1= document.createElement("p");
    p1.innerHTML= "Continente : "+direcionEscuela.continente ;
  
    
      var p2= document.createElement("p");
    p2.innerHTML= "Pais : "+ direcionEscuela.pais ;
    
    
      var p3= document.createElement("p");
    p3.innerHTML= "Estado : "+direcionEscuela.estado ;
    
     var p4= document.createElement("p");
    p4.innerHTML= "Municipio : "+direcionEscuela.municipio ;
    
     var p5= document.createElement("p");
    p5.innerHTML= "Escuela : "+direcionEscuela.direcion ;
    
    
    
    
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);
     div2.appendChild(p4);
     div2.appendChild(p5);
    
    div.innerHTML="";
    var img = document.createElement("img");
    img.src = "img/avatar.png"
    div.appendChild(img);
    div.appendChild(div2);
    

   
}


// comprieba si el pais donde se dio clic  es igual  al pais  de  direcin del personaje
var dinamicaDirecion =function(pais){
   
    if(banderaContinental ){
       
       if(pais.long_name ===  direcionEscuela.pais){
           nacional();
           
           var div= document.getElementById("viewDiv");
           div.innerHTML= "";
           var divmap= document.createElement("div");
           divmap.setAttribute("id", "mapa");
           div.appendChild(divmap);
           googlemap();
           // en caso de ser  cierto se quita el mapa 3d  y se muestra el mapa 2d de google map
           banderaContinental=false;
            banderaNacional= true;
            puntuacion=puntuacion+1;
           intentos= intentos+1;
       }
       
        
        else {
            // en caso contrario de no ser el pais  se indica que vuelva e intentar
            responsive.iniciar();  
             responsive.leer("Mal este pais no es "+direcionEscuela.pais+", Vuelve a intentar");
           intentos=intentos+1;
           
        }
          
    }
} 


// Modulo de responsiveVoice 
// para reproducir un texto 
// inicio

var responsive = (function(){	
	var texto = "";

	var iniciar = function(f){
		

		responsiveVoice.setDefaultVoice("Spanish Latin American Female");
	}

	var leer = function(texto){
		if(responsiveVoice.voiceSupport()) {
			responsiveVoice.speak(texto);
		}
	}

	return {
		"iniciar": iniciar,
		
		"leer": leer,
		"texto": texto
	}
})();

// fin del modulo

//funcion para cargar en la pantalla un mapa  de google-map
var googlemap = function(divdemapa){
    nacional();
    map = new google.maps.Map(document.getElementById("mapa"), {
    center: {lat: 21.7515945, lng: -99.4659332},
    zoom: 5
  });
    // se indica que no pueda llegar a ser un zoom menor a 4  entonces  se carga  el mapa a zoom 8
    map.addListener('zoom_changed', function() {
  if(map.getZoom() < 4){
      map.setZoom(8);
      
  }
  });
    
    
    // funcion para dar click al mapa
    map.addListener('click', function(event) {
     
        
        geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': event.latLng }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        
        // bandera para saber si  da click sobre un estado  una escula
       if(!banderaEstatal){
          estado(results);  
       }else if(banderaEstatal) {
           
          escuela(results);
       }
       
        
    }});

  });
  
    
}

// funcion para comparar el estado  que sea igual al estado del personaje
var estado = function(results){
    var esta = results[1].address_components.length;
          var es=results[1].address_components[esta-2];
    
  if(es.long_name === direcionEscuela.estado){
      banderaEstatal= true;
            responsive.iniciar();  
             responsive.leer("Muy bien ");
            puntuacion=puntuacion+1;
            intentos= intentos+1;
      
         responsive.iniciar();
         responsive.leer(estatalText);
          
      // en caso de que el estado sea  igual  al estado del  personaje  se cambia el zoom  y  se describe  que es un mapa 
      // municipal
           responsive.iniciar();
           responsive.leer(municipalText);
               map.setZoom(14);
                 var pos = {lat: 17.0599739, lng: -96.7065003};
             
          // despues se pide que de cick en la escuela del personaje
                      responsive.iniciar();
             instrucion=" Indicale en el mapa en donde se encuentra la escuela de " + personajeName;
             responsive.leer(instrucion);
              
            
          map.setZoom(8);
        var pos = {lat: 17.0784045, lng: -96.7370172};
        map.setCenter(pos);
           
        }   else {
            // en caso  de no ser  el estado del personaje se le pide  que vuelva  a intentar
            intentos= intentos+1;
            banderaEstatal= false;
            responsive.iniciar();  
             responsive.leer("Mal este estado no es "+direcionEscuela.estado+", Vuelve a intentar");
           } 
    
}


// funcion que  comprueba  si la escuela  a la que  se dio clic es la misma del personaje

var escuela = function(result){
    var esc=result[0].address_components[2];
    
if(esc.long_name === direcionEscuela.direcion)
{
     responsive.iniciar();  
             responsive.leer("Felicidades as ayudado a "+ personajeName);
     banderaFin= true;
     puntuacion=puntuacion+1;
    intentos= intentos+1;
    
   
    puntuacionFinal= 10/(puntuacion/ intentos);
    
    
    // fin de la dinamica se reinicia los intentos y puntacion
    puntuacion=0;
    intentos=0;
    // se muestra  la puntuacion  final obtenida en la dinamica
    var p= document.getElementById("puntuacion");
    p.innerHTML= "" +puntuacionFinal;
    
    /*  FIN de la  Dinamica */
}else {
    
    responsive.iniciar();  
             responsive.leer("Mal vuelve a intentarlo ");
    intentos= intentos+1;
}

}









