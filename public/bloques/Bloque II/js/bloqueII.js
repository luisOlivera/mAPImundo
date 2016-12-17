var app = function () {
    responsiveVoice.setDefaultVoice("Spanish Latin American Female");
    responsiveVoice.speak("Bienvenido al Bloque 2");
    responsiveVoice.speak("Leccion 1");
    responsiveVoice.speak("Componentes Naturales de la tierra");
    setTimeout(initCursor, 10000)
}

var latlng = function (evt) {
    var obj = {};
    if(evt.mapPoint){
        obj = {
            lat : Math.round(evt.mapPoint.latitude * 1000) / 1000,
            lng : Math.round(evt.mapPoint.longitude * 1000) / 1000
        }
    }
    return obj;
}

var pais = function (evt) {
    _pais(evt);
	var url='https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&result_type=country&key=AIzaSyD-EI11dYryAArSWeTEGigQukmcM3TZDSA';
	$.ajax({
		url : url,
		type : "GET",
		dataType: "json" ,
		success: function(data){
            if (data.status==="OK") {
                var nombre = data.results[0].formatted_address;
                responsiveVoice.speak(nombre);
                $("#pais").html(nombre);
                geografia(nombre);
            }
        }
	});
}

function geografia(pais){
	var url = 'https://es.wikipedia.org/w/api.php?format=json&action=query&titles='+pais+'&prop=revisions&rvprop=content&callback=?';
	$.ajax({
		url: url,
		type: 'GET',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            var j = data.query.pages;
            var arr = Object.keys(j).map(function(_) { return j[_]; });
            var arrInfo = arr[0].revisions["0"]["*"].split("\n");
            var str="";
            for (var i = 0; i < arrInfo.length; i++) {
                if (arrInfo[i].search("== Geog")!=-1) {
                    var b = true;
                    var s = i;
                    while(b){
                        if (arrInfo[s].charAt(0)!="{" && arrInfo[s].charAt(0)!="}" &&
                            arrInfo[s].charAt(0)!="[" && arrInfo[s].charAt(0)!="<" &&
                            arrInfo[s].charAt(1)!="|" && arrInfo[s].charAt(0)!="|" &&
                            arrInfo[s].charAt(0)!="!" && arrInfo[s].search("Archivo:")===-1){
                            if (arrInfo[s].charAt(0)===";") {
                                arrInfo[s]=arrInfo[s].split(";")[1];
                                arrInfo[s]="===="+arrInfo[s]+"====";
                            }
                            str += arrInfo[s] + "\n";
                        }
                        s++;   
                        if(arrInfo[s].charAt(0)==="="&&arrInfo[s].charAt(2)!="="){
                            b = false;
                            i = arrInfo.length;
                        }
                    }
                }
            }
            $("#texto").html(wiky.process(txtwiki.parseWikitext(str)));
        }
	});
}

function mostrarInfo(evt){
    _pais(evt);
    require(["esri/geometry/Point"], function(Point) {
        var point = new Point({
            latitude: lat,
            longitude: lng
        });
        
        view.popup.open({
            title: "Coordenadas: [" + lng + ", " + lat + "]",
            location: point
        });
    });
}

function initCursor(){
    LeapManager.init({
      interactiveSelector:"a",
      maxCursors:0});
    LeapManager.cursorConfig.clickDelay = 3000;
    console.log("Cursor Iniciado")
}