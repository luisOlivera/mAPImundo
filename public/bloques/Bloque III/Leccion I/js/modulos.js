var view;
  var inicio = require([
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
        scale: 76809362.13801849,
        center: [-101.17, 21.78]
      });

      view.on("click", function(evt){
        if(evt.mapPoint != undefined){
          var divView = document.getElementById("viewDiv");
          divView.removeChild(divView.childNodes[0]);
          initialize(evt.mapPoint.latitude, evt.mapPoint.longitude);
          descargar(evt.mapPoint.latitude, evt.mapPoint.longitude);
        }

      });


      responsive.iniciar();
      responsive.saludo();
    //iniciarLeap();

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

    //descargar("Argentina");
  }

  function verificarZoom(zoom){
    if(zoom <= 3){
      var divView = document.getElementById("viewDiv");
      divView.removeChild(divView.childNodes[0]);
        var view = new SceneView({
          container: "viewDiv",
          map: map,
          scale: 76809362.13801849,
          center: [-101.17, 21.78]
        });

        view.on("click", function(evt){
          if(evt.mapPoint != undefined){
            var divView = document.getElementById("viewDiv");
            divView.removeChild(divView.childNodes[0]);
            initialize(evt.mapPoint.latitude, evt.mapPoint.longitude);
            descargar(evt.mapPoint.latitude, evt.mapPoint.longitude);
          }
        });
      }
    }

    function agregarPoblacion(datos){
      var dato = JSON.parse(datos);
      var pais = dato.results[0].formatted_address
      var info = descargarPoblacion(pais);
      descargarInfo(pais);
      bing.descargar_imagenes(pais);
    }

    var descargar = function(lat, lng) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&result_type=country&key=AIzaSyBpdj7XOphKt90W55zO6UFdqNtpxmFjxWc";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          agregarPoblacion(this.responseText);
        } else {
          mensaje = "Error " + this.status + " " + this.statusText + " - " + this.responseURL;
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    };
  });

      function buscarPais(pais){
        var res = "";
      var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+pais+"&key=AIzaSyBpdj7XOphKt90W55zO6UFdqNtpxmFjxWc";
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            //console.log(this.responseText);
            res =  this.responseText;
          } else {
            res = mensaje = "Error " + this.status + " " + this.statusText + " - " + this.responseURL;
          }
        }
      };
      xhr.open('GET', url, false);
      xhr.send();

      return res;
    }

    function seleccionarPais(pais){
      var dato = buscarPais(pais);
      //console.log(dato);
      dato = JSON.parse(dato);
      var nombres = pais.split(" ");
      var nombrePais = "";
      for(var i = 0; i < nombres.length; i++){
        nombrePais += nombres[i][0] + nombres[i].substring(1,pais.length).toLowerCase() + " ";
      }
      if(dato.results.length > 0){
        mapa.initialize(dato.results[0].geometry.location.lat, dato.results[0].geometry.location.lng);
        descargarPoblacion(nombrePais.trim());
        descargarInfo(nombrePais.trim());
        bing.descargar_imagenes(nombrePais.trim());
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
    








