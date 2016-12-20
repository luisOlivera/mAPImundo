var mapa = (function(){

	var initialize = function(lat, lng) {
		var divView = document.getElementById("viewDiv");
        divView.removeChild(divView.childNodes[0]);
      
      var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("viewDiv"),
        mapOptions);

      google.maps.event.addListener(map, 'zoom_changed', function() {
        var z = map.getZoom();
        //verificarZoom(map.zoom);
      });
  }

	return {
		"initialize": initialize
	}
})();