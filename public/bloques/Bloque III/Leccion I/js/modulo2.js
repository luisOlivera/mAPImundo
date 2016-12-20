require([
  "esri/Map",
  "esri/views/SceneView",
  "dojo/domReady!"
  ], inicio());

function inicio(){

  var map = new Map({
    basemap: "streets",
    ground: "world-elevation"
  });


  var view = new SceneView({
    container: "viewDiv",
    map: map,
    scale: 76809362.13801849,
    center: [-101.17, 21.78]
  });

  view.on("click", function(evt){
    var divView = document.getElementById("viewDiv");
    divView.removeChild(divView.childNodes[0]);
    initialize(evt.mapPoint.latitude, evt.mapPoint.longitude);
  });
};

function initialize(lat, lng) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("viewDiv"),
    mapOptions);

  google.maps.event.addListener(map, 'zoom_changed', function() {
    var z = map.getZoom();
    verificarZoom(map.zoom);
  });

  /*google.maps.event.addListener(map, 'click', function(){
    //openInfoWindow(marker);
    //console.log(map);
    verificarZoom(map.zoom);
  });*/
}
  
  function verificarZoom(zoom){
    if(zoom <= 3){
      var divView = document.getElementById("viewDiv");
      divView.removeChild(divView.childNodes[0]);
      /*var view = new SceneView({
        container: "viewDiv",
        map: map,
        scale: 76809362.13801849,
        center: [-101.17, 21.78]
      });*/
      inicio();
    }
  }





