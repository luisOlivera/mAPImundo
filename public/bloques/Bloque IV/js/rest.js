
var _get = function(_url,_en_exito,_en_error) {
     var _detectar_cambios_de_estado = 
         function(_xhr,_en_exito,_en_error) {
         return function() {
             if (_xhr.readyState === 4) {
                 if (_xhr.status >= 200 && _xhr.status <= 299) {
                     _en_exito(_xhr);
                 } else {
                    _en_error(_xhr);
                 }
             }
         };
     };
     var xhr = new XMLHttpRequest();
     xhr.open("GET", _url , true);
     xhr.onreadystatechange = _detectar_cambios_de_estado(xhr,_en_exito,_en_error);
     //
    xhr.setRequestHeader("Accept", "application/json");
     //

     xhr.send();
};



