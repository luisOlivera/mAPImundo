//Módulo que contiene las funciones para el uso de la API de Bing
var bing = (function(){   
    //Función para descargar las imagenes de los países
    var descargar_imagenes = function(texto){
        $(function() {
            var params = {
            q:"estadisticas de poblacion en " +texto+" 2016"
        };

        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","multipart/form-data");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","868f19301c294a73820863d7a730ac3e");
            },
            type: "POST",
        })
        .done(function(data) {
            
            var div_imagen = document.getElementById('imagenes');
            var center = div_imagen.parentElement;

            var div_informacion = document.getElementById('informacion');
            center.removeChild(div_imagen);
            var new_div = document.createElement('div');
            new_div.id = "imagenes";
            center.appendChild(new_div);
            var div_actual = document.getElementById('imagenes');
            if(data.value.length > 0){
                var max = 5;
                if(data.value.length < 5){
                    max = data.value.length;
                }
                for(var i = 0; i < max; i++){
                    var imagen = document.createElement('img');
                    imagen.src = data.value[i].thumbnailUrl;
                    imagen.width="250"; 
                    imagen.height="180";
                    imagen.alt = "Población";
                    imagen.className = "mySlides";
                    div_actual.appendChild(imagen);                  
                }
                carousel();
            }
        })
        .fail(function() {
        });
    });
    }

    return {
        "descargar_imagenes": descargar_imagenes
    }
})();

