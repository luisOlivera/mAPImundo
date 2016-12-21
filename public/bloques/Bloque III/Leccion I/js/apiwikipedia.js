
var descargar = function(pais) {

  var url = "http://es.wikipedia.org/w/api.php?action=opensearch&search="+pais;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(this.responseText);
      } else {
          mensaje = "Error " + this.status + " " + this.statusText + " - " + this.responseURL;
          console.log(mensaje);
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};
