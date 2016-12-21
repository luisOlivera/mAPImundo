var funciones = (function(){
	
  var arrayImg = new Array(9);

  //Función que descarga datos del lugar que el usuario seleccionó (restaurante, hospital. etc)
  var descargarDatos = function(id){
    var resultado = "";
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        procesar.evaluar(place);
      }
    });
  }

  var openModal = function openModal() {
    document.getElementById('myModal').style.display = "block";
  }

  var closeModal = function closeModal() {
    document.getElementById('myModal').style.display = "none";
  }

  var currentSlide = function currentSlide(n) {
    showSlides(n);
  }

  var showSlides = function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    slides[0].style.display = "block";
  }

  return {
    "arrayImg": arrayImg,
    "cargarImagenes": cargarImagenes,
    "descargarDatos": descargarDatos,
    "openModal": openModal,
    "closeModal": closeModal,
    "currentSlide": currentSlide,
    "showSlides": showSlides
  }


})();