//Módulo que contiene las funciones de la librería responsive voice (librería para convertir texto a voz)
var responsive = (function(){	
	var resultado = "";

	//función para configurar responsive 
	var iniciar = function(){
		responsiveVoice.speech_onend = function(){
			//speech.iniciar();
			//speech.escuchar();
		};

		responsiveVoice.setDefaultVoice("Spanish Latin American Female");
	}


	var saludo = function(){
		if(responsiveVoice.voiceSupport()) {
			responsiveVoice.speak("¿Bienvenido a mapimundo, quieres que te ayude en algo?");
		}
	} 

	//función que lee el texto recibio como parámetro
	var leer = function(texto){
		if(responsiveVoice.voiceSupport()) {
			//console.log(texto);
			responsiveVoice.speak(texto);
		}
	}

	return {
		"iniciar": iniciar,
		"saludo": saludo,
		"leer": leer,
		"resultado": resultado
	}
})();