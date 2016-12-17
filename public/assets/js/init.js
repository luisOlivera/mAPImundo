 var view,lat,lng;

 require([
   "esri/Map",
   "esri/views/SceneView"
 ], function(Map, SceneView) {
   var map = new Map({
     basemap: "streets",
     ground: "world-elevation"
   });

   view = new SceneView({
     container: "viewDiv",
     map: map,
     scale: 80000000,
     center: [-101.17, 21.78],
     zoom: 5
   });
 });

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

var _initCursor = function (max,delay) {
    LeapManager.init({
      interactiveSelector:"a",
      maxCursors:max
    });
    LeapManager.cursorConfig.clickDelay = delay;
    console.log("Cursor Iniciado")
}