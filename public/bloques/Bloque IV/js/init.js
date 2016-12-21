var paisesPIB = [[ 'Estados Unidos' , ''],[ 'Japón',''], [ 'China' , ''],['Alemania',''], ['Reino Unido' ,''],['Italia',''] ,['España', ''], ['Brasil',''] , ['Canadá',''] ,[ 'Rusia',''], ['India',''],[ 'México',''] ];
var a=0;
var divpais= document.createElement("div");
divpais.setAttribute("id","pais");
var paisdina;
var pos= {lat: -34.397, lng: 150.644};
 var geocoder;

var view;
var pais;
var div1= document.createElement("div");
div1.setAttribute("id","pib");


var text = document.getElementById("texto");

var div2= document.createElement("div");


div2.innerHTML = '<p align="center" id="pibtext" > EL PIB es un indicador representativo que ayuda a medir el crecimiento o decrecimiento de la producción de bienes y servicios de las empresas de cada país, únicamente dentro de su territorio. Este indicador es un reflejo de la competitividad de las empresas. </p> <p>Observa el PIB de el sigiente pais</p>';
text.appendChild(div2);
text.appendChild(divpais);

var dina= function(p){
    if(a <= paisesPIB.length){
        if(a > 0){
          var pas =  paisesPIB[a-1];
        pas[1]=p;  
            
        }
        
        
     divpais.innerHTML="";
     for(var i=0; i<a; i++){
         var d= document.createElement("p");
       var pas=  paisesPIB[i];
        
         d.innerHTML= '' + pas[0] + ' ' +pas[1] ; 
         divpais.appendChild(d);
     }
    if(a < paisesPIB.length ){
      var d= document.createElement("p");
     var pas =  paisesPIB[a];
        
     paisdina=  pas[0];
      d.innerHTML= ' ' +  paisdina ; 
         divpais.appendChild(d);
     a=a+1;
   
 }
    }
}
dina("");

 require([
   "esri/Map",
   "esri/views/SceneView",
   "dojo/domReady!"
 ], function(Map, SceneView) {
   var map = new Map({
     basemap: "satellite",
     ground: "world-elevation"
   });

   view = new SceneView({
     container: "viewDiv",
     map: map,
     scale: 80000000,
     center: [-101.17, 21.78],
     zoom: 5
   });

   view.on("click", function(evt) {
     if (evt.mapPoint) {
     		var lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
    		var lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
         var posi = {lat: lat, lng: lon};
       
		    buscarPais(posi,evt);
       
     }
   });
 });





  var buscarPais= function (latlng, evet) {
      
   geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {     
          var p = results[1].address_components.length;
           pais=results[1].address_components[p-1];
          informacionPais(pais); 
         
          //imgPais(pais);
         // hablar(pais);
       view.popup.open({
           title:pais.long_name,
               content: div1,
              location:  evet.mapPoint
        });
          
      } else {
       console.log('No results found');
      }
    } else {
      console.log( status);
      
    }
  });
   
}
  
  
  
var informacionPais = function(pais){   
    
 var urls= "http://api.worldbank.org/countries/"+ pais.short_name +"/indicators/NY.GDP.MKTP.CD?date=2015:2015";


$.ajax({
 
    url: '/banca?url='+urls,
  type: 'GET',  
 //method: "GET", 
  //dataType: 'json',

     success: function(data, status, jqXHR) {
          var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
               var v= Number(valor).toFixed(2)+" Dolares";
                document.getElementById("pib").textContent = v;
                if(pais.long_name === paisdina){
             dina(v); 
          } 
            }
          
        
  },
  error: function() {
    console.log( "Ha ocurrido un error" );
  }
});

    

}

var imgPais= function(pais){
    
    $.ajax({
 
    url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=Vivienda"+pais.long_name +"&count=1" , 

  type: 'GET',  
     headers: {
        'Op-Apim-Subscription-Key': 'd7a2a26ed7414c289c4df847930ffe52'
     },  
    
    success: function(data, status, jqXHR) {
        document.getElementsByTagName("img")[0] = data.value[0].contenUrl;
          document.getElementsByTagName("img")[1] = data.value[1].contenUrl; 
     document.getElementsByTagName("img")[2] = data.value[2].contenUrl;
        
  },
  error: function() {
    console.log( "Ha ocurrido un error" );
  }
});
    
}

var escuchar= function(){
        hablar("seleciona los paises, y observa su producto interno bruto");
    
}
var hablarPIB = function(){
    var t=  document.getElementById('pibtext');
    
    hablar(t.innerHTML);
    
}

var hablar = function(texto){
  
  responsiveVoice.speak(texto, "Spanish Latin American Female");
};







