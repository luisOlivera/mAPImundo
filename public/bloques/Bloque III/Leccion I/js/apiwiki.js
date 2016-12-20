var descargarPoblacion= function(pais) {
    	//var searchTerm = $("#searchTerm").val();
      //var pais = "Mexico";
      var poblacion = "";
      //console.log(pais);
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
            //console.log(xml);
            var n = xml.search("población_estimación");
            if(n > 0){
              var res = xml.substring(n+23, n+50);
              //var poblacion = "";//res.split('|')[0];
              for(var i = 0; i < res.length; i++){
                if(!isNaN(res[i])){
                  poblacion += res[i];
                  
                }
              }
              var p = document.getElementById('poblacion');
              //var p = document.createElement('p');
              p.innerHTML = "Población estimado: " + poblacion.trim();
              //info.appendChild(p); 
              //console.log(poblacion.trim());
              //return poblacion.trim();
              
            }else{
              var n2 = xml.search(" población  ");              
                if(n2 > 0){
                  var res = xml.substring(n2+12, n2+50);
                  //var poblacion = "";
                  for(var i = 0; i < res.length; i++){
                    if(!isNaN(res[i])){
                      poblacion += res[i];
                    }
                  }
                  var p = document.getElementById('poblacion');
                  //var p = document.createElement('p');
                  p.innerHTML = "Población estimado: " + poblacion.trim();
                  //info.appendChild(p); 
                  //console.log(poblacion.trim());
                  //return poblacion.trim();
                  
              }
            }
        	}

		});
    
}

var descargarInfo = function(pais) {
      //var searchTerm = $("#searchTerm").val();
      //var pais = "Mexico";
      var poblacion = "";
      //console.log(pais);
      //var url = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1500&explaintext&titles="+pais+"&format=json&callback=?";
      //var url = 'https://es.wikipedia.org/w/api.php?format=json&action=query&titles='+pais+'&prop=revisions&rvprop=content&callback=?';
      var url = "https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&explaintext&titles=Demografía de "+pais+"&format=json&callback=?";
      if(pais === "Estados Unidos" || pais === "ESTADOS UNIDOS"){
        console.log(pais);        
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
            //var xml = objectToXml(data);
            //console.log(xml);
            //var json = JSON.parse(data);
            var datos = data.query.pages;
            var page = Object.keys(datos)[0];
            //console.log(page);
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
                //break;
              }
            }
            //var aux = extract.split('\\.');
            //console.log(extract);

            /*var n = xml.search("población_estimación");
            if(n > 0){
              var res = xml.substring(n+23, n+50);
              //var poblacion = "";//res.split('|')[0];
              for(var i = 0; i < res.length; i++){
                if(!isNaN(res[i])){
                  poblacion += res[i];
                  
                }
              }*/
              var p = document.getElementById('texto');
              //var p = document.createElement('p');
              p.innerHTML = texto;
              //info.appendChild(p); 
              //console.log(poblacion.trim());
              //return poblacion.trim();
              
            }          
    });
    
}

var descargarPoblacionMundial = function() {
      var poblacion = "";
      var url = "https://es.wikipedia.org/w/api.php?format=json&action=query&titles=Población mundial&prop=revisions&rvprop=content&callback=?";
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
            var revisions = data.query.pages[page].revisions[0]["*"];
            var texto = "";

            

              var p = document.getElementById('texto');
              p.innerHTML = texto;
            }          
    });
    
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
