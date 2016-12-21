
//Función para descargar la población de los países con la API de wikipedia
var descargarPoblacion= function(pais) {
  var poblacion = "";
  var url = 'https://es.wikipedia.org/w/api.php?format=json&action=query&titles='+pais+'&prop=revisions&rvprop=content&callback=?';
  $.ajax({
   url: url,
   type: 'GET',
   contentType: "application/json; charset=utf-8",
   async: false,
   cache:false,
   dataType: "json",
   success: function(data, status, jqXHR) {
    var xml = objectToXml(data);
    var n = xml.search("población_estimación");
    if(n > 0){
      var res = xml.substring(n+23, n+50);
      for(var i = 0; i < res.length; i++){
        if(!isNaN(res[i])){
          poblacion += res[i];
          
        }
      }
      var p = document.getElementById('poblacion');
      p.innerHTML = "Población estimado: " + poblacion.trim();

    }else{
      var n2 = xml.search(" población  ");              
      if(n2 > 0){
        var res = xml.substring(n2+12, n2+50);
        for(var i = 0; i < res.length; i++){
          if(!isNaN(res[i])){
            poblacion += res[i];
          }
        }
        var p = document.getElementById('poblacion');
        p.innerHTML = "Población estimado: " + poblacion.trim();
      }
    }
  }

});
  
}

//Función para descargar los datos de los países con la API de wikipedia
var descargarInfo = function(pais) {
  var poblacion = "";
  var url = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&explaintext&titles=Demografía de "+pais+"&format=json&callback=?";
  if(pais === "Estados Unidos" || pais === "ESTADOS UNIDOS"){
    url = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&explaintext&titles=Demografía_de_los "+pais+"&format=json&callback=?";      
  }

  $.ajax({
    url: url,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    async: false,
    cache:false,
    dataType: "json",
    success: function(data, status, jqXHR) {
      var datos = data.query.pages;
      var page = Object.keys(datos)[0];
      var extract = ""+data.query.pages[page].extract;
      var texto = "";
      var numP = 0;
      var numMax = 2;
      for(var i = 0; i < extract.length; i++){
        if(extract[i] === '.'){
          numP++;
        }
        if(numP <= numMax){
          texto += extract[i];
        }else{
          if(texto.length > 150){
            break;
          }else{
            numMax = 4;
          }
        }
      }
      var p = document.getElementById('texto');
      p.innerHTML = texto;              
    }          
  });
  
}

//Función para convertir JSON-XML
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
