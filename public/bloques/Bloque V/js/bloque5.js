var keyBing = '055acde1923a4d5cb3b8e9ffb8d00115';
var pais, id_pais, view, lat, lon;
//var recognition = new webkitSpeechRecognition();
//iniciarMicrofono();

function iniciar(){
    require(["esri/Map","esri/views/SceneView","esri/layers/Layer","esri/PopupTemplate","esri/core/watchUtils"],
    function(Map, SceneView, Layer, PopupTemplate,watchUtils) { 
        var map = new Map({
            basemap: "streets" 
        });
        
        /*Layer.fromArcGISServerUrl({
            url: "http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Continents/FeatureServer/0",
            properties: {
                popupTemplate: new PopupTemplate({
                    title: "Continente {CONTINENT}",
                    content: "Ganaste o Perdiste (Mejorando la dinámica de #Bitor)"
                })
            }
        }).then(function(layer){
            map.add(layer);
        });*/
                
        view = new SceneView({
            container: "mapa",
            map: map,
            padding: {
                bottom: 50,
                top: -30
            }
        });
        
        watchUtils.watch(view, 'zoom', function(){
            //console.log(view.zoom);
            
        });
        
        view.then(function(){
            //darInstrucciones();
        }, function(error){
            console.log("No se ha podido cargar el mapa.");
        });
        
        view.on("click", function(evt) {
            //esto va en popup
            //features: [result],
            //location: result.geometry.centroid
            if (evt.mapPoint) {
                lat = Math.round(evt.mapPoint.latitude * 1000) / 1000;
                lon = Math.round(evt.mapPoint.longitude * 1000) / 1000;
                mostrarInfo();                
            }
        });
        
        var tablaIndicadores = document.createElement("table");
        tablaIndicadores.innerHTML = '<thead><tr><th style="text-align: center;">Indicador</th><th style="text-align: center;">Valor</th></tr></thead><tbody><tr><td>Inscripción escolar</td><td id="primaria"></td></tr><tr><td>Población con acceso al agua</td><td id="agua"></td></tr><tr><td>Población con acceso a la electricidad</td><td id="luz"></td></tr><tr><td>Desempleo</td><td id="desempleo"></td></tr><tr><td>Muerte por condiciones nutricionales</td><td id="muerte"></td></tr><tr><td>Esperanza de vida</td><td id="vida"></td> </tr></tbody>';
                
        var divImagenes = document.createElement("div");
        divImagenes.id = "imagenes";
        divImagenes.style = "width:300px; height=200px; display:none;";
        divImagenes.innerHTML = '<figcaption id="imgTitle"></figcaption><img name="Vivienda" class="mySlide hover-shadow cursor" src="" width="300" height="200" onclick="openModal(); currentSlide(1)"><img name="Ambiente" class="mySlide hover-shadow cursor" src="" width="300" height="200" onclick="openModal();currentSlide(2)"><img name="Educación" class="mySlide hover-shadow cursor" src="" width="300" height="200" onclick = "openModal();currentSlide(3)">';
        
        var divPais = document.createElement("div");
        divPais.style = "text-align: center;";
        var h4 = document.createElement("h4");
        h4.id = "pais";
        h4.style = "background-color: white; color: black;";
        var img = document.createElement("img");
        img.id = "bandera";
        img.width = 200;
        img.height = 100;
        divPais.appendChild(h4);
        divPais.appendChild(img);
        
        view.ui.padding = { top: 30, left: 0, right: 15, bottom: 30 };
        view.ui.empty("top-left");
        getVideo();
        view.ui.add(divPais, "top-right");
        view.ui.add(tablaIndicadores, "bottom-left");
        view.ui.add(divImagenes, "bottom-right");
    });
}

function darInstrucciones(){
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[6];
    msg.voiceURI = 'native';
    msg.text = "Dime un pais";
    speechSynthesis.speak(msg);
}

function mostrarInfo(){ 
    var espais = false;
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+ '&key=AIzaSyA206wa_9HvHofUAhSDXZ_-XVZbERaNR64',
        //url: "/paiss?lat="+lat+"&lon="+lon,
        type: 'GET',
        success: function(data, status, jqXHR) {
            //data = JSON.parse(data);
            if(data.results.length > 0){
                for (var i = 0; i < data.results[0].address_components.length; i++) {
                    if (data.results[0].address_components[i].types[0] === "country") {
                        pais = data.results[0].address_components[i].long_name;
                        idPais = data.results[0].address_components[i].short_name;
                        espais = true;
                        break;
                    }                         
                }
            }
            
            if(espais){
                limpiarTabla();           
                getBandera();
                getPrimaria();
                getAgua();
                getLuz();
                getDesempleo();
                getMuerte();
                getVida();
                getEducacion();
                getVivienda();
                getAmbiente();
            }
        }
    });
}

function limpiarTabla(){
    document.getElementById("pais").textContent = pais;   
    document.getElementById("bandera").src = "";   
    document.getElementById("primaria").textContent = "";
    document.getElementById("agua").textContent = "";
    document.getElementById("luz").textContent = "";
    document.getElementById("desempleo").textContent = "";
    document.getElementById("muerte").textContent = "";
}

function getPrimaria(){
    var url = "http://api.worldbank.org/countries/"+idPais+"/indicators/SE.PRM.NENR?date=2009";
    $.ajax({
        url: '/calidad_vida?url='+url,
        type: 'GET',
        success: function(data, status, jqXHR) {
            var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
                document.getElementById("primaria").textContent = Number(valor).toFixed(2)+"%";
            }
        }
    });
}

function getAgua(){
    var url = "http://api.worldbank.org/countries/"+idPais+"/indicators/SH.H2O.SAFE.ZS?date=2015";
    $.ajax({
        url: '/calidad_vida?url='+url,
        type: 'GET',
        success: function(data, status, jqXHR) {
            var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
                document.getElementById("agua").textContent = Number(valor).toFixed(2)+"%";
            }
        }
    });
}

function getLuz(){
    var url = "http://api.worldbank.org/countries/"+idPais+"/indicators/EG.ELC.ACCS.ZS?date=2000";
    $.ajax({
        url: '/calidad_vida?url='+url,
        type: 'GET',
        success: function(data, status, jqXHR) {
            var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
                document.getElementById("luz").textContent = Number(valor).toFixed(2)+"%";
            }
        }
    });
}

function getDesempleo(){
    var url = "http://api.worldbank.org/countries/"+idPais+"/indicators/SL.UEM.TOTL.ZS?date=2014";
    $.ajax({
        url: '/calidad_vida?url='+url,
        type: 'GET',
        success: function(data, status, jqXHR) {
            var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
                document.getElementById("desempleo").textContent = Number(valor).toFixed(2)+"%";
            }
        }
    });
}

function getMuerte(){
    var url = "http://api.worldbank.org/countries/"+idPais+"/indicators/SH.DTH.COMM.ZS?date=2000";
    $.ajax({
        url: '/calidad_vida?url='+url,
        type: 'GET',
        success: function(data, status, jqXHR) {
            var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
                document.getElementById("muerte").textContent = Number(valor).toFixed(2)+"%";
            }
        }
    });
}

function getVida(){
    var url = "http://api.worldbank.org/countries/"+idPais+"/indicators/SP.DYN.LE00.IN?date=2014";
    $.ajax({
        url: '/calidad_vida?url='+url,
        type: 'GET',
        success: function(data, status, jqXHR) {
            var valor = data["wb:data"]["wb:data"][0]["wb:value"];
            if(valor != ""){
                document.getElementById("vida").textContent = Number(valor).toFixed()+" años";
            }
            //recognition.start();
        }
    });
}

function getBandera(){
    require(["esri/geometry/Point"], function(Point) {
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=Bandera "+" "+pais+"&count=1",
            headers: {'Ocp-Apim-Subscription-Key':keyBing},
            type: 'GET',
            success: function(data, status, jqXHR) {
                /*var point = new Point({
                    latitude: lat,
                    longitude: lon
                });
                view.popup._closeNode.className = "esri-popup__button leap-interactive";
                view.popup._actionsNode.children[0].className = "esri-popup__button esri-popup__action leap-interactive";
                view.popup.open({
                    title: pais,
                    content: '<img src="'+data.value[0].contentUrl+'" width="200" height="100">',
                    location: point
                });*/
                document.getElementById("bandera").src = data.value[0].contentUrl;
            }
        });
    }
)}

function getEducacion(){
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=Educación" +" "+pais+"&count=1",
        type: 'GET',
        headers: {'Ocp-Apim-Subscription-Key':keyBing},
        success: function(data, status, jqXHR) {
            document.getElementsByTagName("img")[0].src = data.value[0].contentUrl;
            document.getElementsByTagName("img")[3].src = data.value[0].contentUrl;
            document.getElementsByTagName("img")[9].src = data.value[0].contentUrl;
        }
    });
}

function getVivienda(){
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=Vivienda" +" "+pais+"&count=1",
        type: 'GET',
        headers: {'Ocp-Apim-Subscription-Key':keyBing},
        success: function(data, status, jqXHR) {
            document.getElementsByTagName("img")[1].src = data.value[0].contentUrl;
            document.getElementsByTagName("img")[4].src = data.value[0].contentUrl;
            document.getElementsByTagName("img")[7].src = data.value[0].contentUrl;
        }
    });
}

function getAmbiente(){
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=Contaminación" +" "+pais+"&count=1",
        type: 'GET',
        headers: {'Ocp-Apim-Subscription-Key':keyBing},
        success: function(data, status, jqXHR) {
            document.getElementsByTagName("img")[2].src = data.value[0].contentUrl;
            document.getElementsByTagName("img")[5].src = data.value[0].contentUrl;
            document.getElementsByTagName("img")[8].src = data.value[0].contentUrl;
            carousel();
            showSlides(slideIndex);
            document.getElementById("imagenes").style.display = "inline";
        }
    });
}

function iniciarMicrofono() {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "es-Es";
    recognition.onresult = function(event){
        for (var i = event.resultIndex; i < event.results.length; i++) {
            if(event.results[i].isFinal){
                var entrada = event.results[i][0].transcript;
                //console.log(entrada);
                if(entrada.includes("ayuda") || entrada.includes("Ayuda")){
                    darInstrucciones();
                }else if(entrada.includes("aceptar")){
                    view.click;
                }else{
                    pais = entrada;
                    buscarPais();
                }
            }
        }
    }
    recognition.onerror = function(event) {
        console.log(event.error);
        console.log(event.message);
    }
    recognition.start();
}

function buscarPais(){
    $.ajax({
        url: '/pais?nombre='+pais,
        type: 'GET',
        success: function(data, status, jqXHR) {
            data = JSON.parse(data);
            if(data.results.length > 0){  
                //recognition.stop();
                lat = data.results[0].geometry.location.lat;
                lon = data.results[0].geometry.location.lng;
                view.goTo({
                    target: [lon,lat],
                    zoom: 0
                }, {duration: 5000});
                mostrarInfo();
            }
        }
    });
}

function getVideo(){
    $.ajax({
       url: "https://www.googleapis.com/youtube/v3/videos?id=S1vPxf0zSXY&key=AIzaSyA206wa_9HvHofUAhSDXZ_-XVZbERaNR64&part=player",
        type: 'GET',
        success: function(data, status, jqXHR) {
            var divVideo = document.createElement("div");
            divVideo.innerHTML = data.items[0].player.embedHtml.replace("480","350");
            view.ui.add(divVideo, "top-left");            
        }
    });
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
