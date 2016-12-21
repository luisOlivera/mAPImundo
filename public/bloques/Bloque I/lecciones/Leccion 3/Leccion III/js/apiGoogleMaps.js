//Este módulo contiene las funciones de google maps necesarios para usar el mapa en la aplicación.

var map; 
//Funicón que carga el mapa y lo agrega a la aplicación
function initMap() {  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      var pos = {
        lat: 17.060793,
        lng: -96.725303
      };
      //En esta parte se crea el mapa
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 18,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
      });
      //Aquí se agrega el evento del click al mapa
      map.addListener('click', function(evt) {        
        if(evt.placeId){
          funciones.descargarDatos(evt.placeId);
        }
      });
      leerTexto();
    });
  }
}

function leerTexto(){
  responsive.iniciar();
  responsive.leer("Bienvenido a la primera dinámica de la lección 3, antes de iniciar con la dińamica te recomiendo que veas las simbologías, da click en el botón iniciar cuándo estés listo");
}

