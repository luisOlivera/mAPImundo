var texto = "Bienvenido a la leccion 2, ahora aprenderemos nuevas formas de representar el espacio geográfico. Veamos los tipos en que se representa el espacio geográfico."+"    Da click sobre iniciar" ;
var texto2 = "Presta mucha atencion "
var continentalText = "En el planisferio y en los mapas continentales, se representa reducida la extensión territorial de los países. y se muestra un continente completo  como:  "+" América, "+"  Africa, " +" Asia, "+" Oseanía, "+ " Europa ";
var nacionalText = "En un mapa territorial o nacional, como  el de México , la porción terrestre mostrada corresponde a cada país. y los estados en los que se divide ";
var estatalText = "Un mapa estatal muestra un estado o regíon perteneciente a pais ";
var municipalText = "Un mapa municipal muestra las regiones en que se divide un estado  ";
var personajeName= "Paco";
var ayudaOli = "Ayuda a "+personajeName+" a llegar a su escuela tienes que indicarle donde esta su escuela ";
var instrucion="";
var puntuacion=0;
var intentos=0;
var puntuacionFinal=0;

var direcionEscuela = { continente: "Americano",
                         pais: "México",
                         estado: "Oaxaca",
                         municipio: "Oaxaca de juarez",
                         direcion: "Instituto Tecnologico de Oaxaca"
    
                        } 



var banderaContinental= false;
var banderaNacional = false;
var banderaEstatal= false;
var banderaMunicipal = false;
var banderaFin = false;

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
       
		    buscarPais(posi,evt);
       
     }
   });
     if(!banderaFin){
         responsive.iniciar();
         responsive.leer(texto);  
         var div = document.getElementById("texto");
         var con = document.createElement("div");
         con.innerHTML= ' <button type="submit" id="continental" onclick="continental();">Iniciar </button>';
         div.appendChild(con);
     }
     
    }
 ); 
    






  var buscarPais= function (latlng, evet) {
      
   geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': latlng}, function(results, status) {
      
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {     
          var p = results[1].address_components.length;
           pais=results[1].address_components[p-1];
        
             dinamicaDirecion(pais);
          
            view.popup.open({
           title:pais.long_name,
               content: "",
              location:  evet.mapPoint
        });
          
      } else {
       console.log('No results found');
      }
    } else {
      console.log( status);
      
    }
  });
   
    
  }






var continental = function(){
    responsive.iniciar( ); 
   
  responsive.leer(continentalText);
     dinamica();
     /* responsiveVoice.onend  = function(){
          responsive.iniciar(); 
          responsive.leer("America");
          //a qui gira
          view.center= [continente.America.lat ,continente.America.lng];
           
             responsiveVoice.speech_onend = function(){
          responsive.iniciar(); 
          responsive.leer("Europa");
                 //a qui gira
                  view.center= [continente.Europa.lat ,continente.Europa.lng];
                  responsiveVoice.speech_onend = function(){
          responsive.iniciar(); 
          responsive.leer("Asia");
                      //a qui gira
                       view.center= [continente.Asia.lat ,continente.Asia.lng];
                       responsiveVoice.speech_onend = function(){
          responsive.iniciar(); 
          responsive.leer("Oceania");
                        //a qui gira   
                           view.center= [continente.Ociania.lat ,continente.Ociania.lng];
                            responsiveVoice.speech_onend = function(){
          responsive.iniciar(); 
          responsive.leer("Africa");
                                 view.center= [continente.Africa.lat ,continente.Africa.lng];
                                     
                                      dinamica();
                                
			
		};  };	}; }; };
    
 
    */
    
    
  
  
    
}

var nacional = function(){
    responsive.iniciar(); 
  responsive.leer(nacionalText);
      // responsiveVoice.speech_onend = function(){
      
            responsive.iniciar(); 
             instrucion="Bien indicale en el siguiente mapa donde se ecuentra su estado ";
             responsive.leer(instrucion);
           puntuacion=puntuacion+1;
       //}
  
  
}

var estatal = function(){
   responsive.iniciar();
  responsive.leer(estatalText);
 
  
  
}
var municipal = function(){
   responsive.iniciar();  
  responsive.leer(municipalText);
  
  
  
}


var dinamica = function(){
    
      
        //responsiveVoice.speech_onend = function(){
                pasouno();
            responsive.iniciar();  
             responsive.leer("ahora puedes ayudar a "+personajeName+" a llegar a su escuela");
            //  responsiveVoice.speech_onend = function(){
            responsive.iniciar();  
                  instrucion="Indicale en el mapa continental en donde se encuentra el pais de " + personajeName;
             responsive.leer(instrucion);
              
               banderaContinental = true;
       
          
              //}
        //}
        
        
         
        // var divboton = document.getElementById("boton");
        //divboton.innerHTML= '<button type="submit" id="boton" onclick="pasouno();">Ayuda a Oli</button>';
        
   
  
}

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

var dinamicaDirecion =function(pais){
   
    if(banderaContinental ){
       
       if(pais.long_name ===  "México"){
           nacional();
           
           var div= document.getElementById("viewDiv");
           div.innerHTML= "";
           var divmap= document.createElement("div");
           divmap.setAttribute("id", "mapa");
           div.appendChild(divmap);
           googlemap();
           banderaContinental=false;
            banderaNacional= true;
            puntuacion=puntuacion+1;
           intentos= intentos+1;
       }
       
        
        else {
            responsive.iniciar();  
             responsive.leer("Mal este pais no es "+direcionEscuela.pais+", Vuelve a intentar");
           intentos=intentos+1;
           
        }
          
    }
} 




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



var googlemap = function(divdemapa){
    nacional();
    map = new google.maps.Map(document.getElementById("mapa"), {
    center: {lat: 21.7515945, lng: -99.4659332},
    zoom: 5
  });
    map.addListener('zoom_changed', function() {
  if(map.getZoom() < 4){
      map.setZoom(8);
      
  }
  });
    
    map.addListener('click', function(event) {
     
        
        geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': event.latLng }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        
        
       if(!banderaEstatal){
          estado(results);  
       }else if(banderaEstatal) {
           
          escuela(results);
       }
       
        
    }});

  });
  
    
}


var estado = function(results){
    var esta = results[1].address_components.length;
          var es=results[1].address_components[esta-2];
    
  if(es.long_name === "Oaxaca"){
      banderaEstatal= true;
            responsive.iniciar();  
             responsive.leer("Muy bien ");
            puntuacion=puntuacion+1;
            intentos= intentos+1;
      
      //responsiveVoice.speech_onend = function(){
         responsive.iniciar();
         responsive.leer(estatalText);
          
        // responsiveVoice.speech_onend = function(){
           responsive.iniciar();
           responsive.leer(municipalText);
               map.setZoom(14);
                 var pos = {lat: 17.0599739, lng: -96.7065003};
             
          //  responsiveVoice.speech_onend = function(){
                
                      responsive.iniciar();
             instrucion=" Indicale en el mapa en donde se encuentra la escuela de " + personajeName;
             responsive.leer(instrucion);
              
                    
            //    }
          //}
         
      //}
          map.setZoom(8);
        var pos = {lat: 17.0784045, lng: -96.7370172};
        map.setCenter(pos);
           
        }   else {
            intentos= intentos+1;
            banderaEstatal= false;
            responsive.iniciar();  
             responsive.leer("Mal este estado no es "+direcionEscuela.estado+", Vuelve a intentar");
           } 
    
}



var escuela = function(result){
    var esc=result[0].address_components[2];
    
if(esc.long_name === "Instituto Tecnologico de Oaxaca")
{
     responsive.iniciar();  
             responsive.leer("Felicidades as ayudado a "+ personajeName);
     banderaFin= true;
     puntuacion=puntuacion+1;
    intentos= intentos+1;
   
    puntuacionFinal= 10/(puntuacion/ intentos);
    
    var p= document.getElementById("puntuacion");
    p.innerHTML= "" +puntuacionFinal;
    
    
}else {
    responsive.iniciar();  
             responsive.leer("Mal vuelve a intentarlo ");
    intentos= intentos+1;
}

}





