var view, lat, lon;

function iniciar(){
    require(["esri/Map","esri/views/SceneView"], function(Map, SceneView) { 
        
        var map = new Map({
            basemap: "streets"
        });
        
        view = new SceneView({
            container: "mapa",
            map: map
        });
        
        view.on("click", function(evt) {
            if (evt.mapPoint) {
                lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
                lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
                mostrarInfo(evt);               
            }
        });
    });
}

function mostrarInfo(evt){
    require(["esri/geometry/Point"], function(Point) {
        var point = new Point({
            latitude: lat,
            longitude: lon
        });
        
        view.popup.open({
            title: "Coordenadas: [" + lon + ", " + lat + "]",
            location: point
        });
    });
}