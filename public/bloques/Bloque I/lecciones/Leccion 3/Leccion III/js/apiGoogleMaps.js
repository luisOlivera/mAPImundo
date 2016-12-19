var map;
function initMap() {  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      var pos = {
        //lat: position.coords.latitude,
        //lng: position.coords.longitude
        lat: 17.060793,
        lng: -96.725303
      };
      //map.setCenter(pos);
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,//{lat: 17.077415, lng: -96.744437},
        zoom: 18,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
      });
      map.addListener('click', function(evt) {
        //placeMarkerAndPanTo(e.latLng, map);
        
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
  //responsive.leer("hola");
  responsive.leer("Bienvenido a la primera dinámica de la lección 4, antes de iniciar con la dińamica te recomiendo que veas las simbologías, da click en el botón iniciar cuándo estés listo");
}

