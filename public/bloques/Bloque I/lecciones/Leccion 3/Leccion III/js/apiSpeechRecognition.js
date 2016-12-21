//Módulo que contiene las funciones para la libreria speechReconginition (librería que convierte voz-texto)

var speech = (function(){
	var recognition;
	//Función que configura el speech
	var iniciar = function(){
		if (!('webkitSpeechRecognition' in window)) {
			alert("¡API no soportada!");
		} else {
			recognition = new webkitSpeechRecognition();
			recognition.lang = "es-MEX";
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.start();

			recognition.onend = function() {				
				//recognition.stop();
				//recognition.start();
			}
		}

	}

	//Función que regresa el texto que se obtiene al hablar o escuchar algún sonido
	var escuchar = function(){
		recognition.onresult = function(event) {
			if(event.results[event.results.length-1].isFinal){
				procesar.procesar(event.results[event.results.length-1][0].transcript);
			}
		}
	} 


	return {
		"iniciar": iniciar,
		"escuchar": escuchar
	}
})();