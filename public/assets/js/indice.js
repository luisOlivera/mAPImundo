$.getScript("assets/js/librerias/leap-0.6.4.js",function () {
	$.getScript("assets/js/librerias/leapstrap.js",function(){
		LeapManager.init({
      		interactiveSelector:"a",
      		maxCursors:1
   	 	});
   	 	LeapManager.cursorConfig.clickDelay = 3000;
	});
});

function loader() {
	setTimeout(showIndice, 4000);
}

function showIndice() {
	document.getElementById("loader").style.display = "none";
	if (localStorage.usuario) {
		document.getElementById("usuario").innerHTML="Bienvenido  "+localStorage.usuario;
		document.getElementById("indice").style.display = "block";
	}else {
		var logi=document.getElementById('login');
		logi.style.display='block'; 
		logi.style.width="auto";
		responsiveVoice.setDefaultVoice("Spanish Latin American Female");
    	responsiveVoice.speak("¿Cuál es tu nombre?");
    	recognition = new webkitSpeechRecognition();
		recognition.lang = "es-MEX";
		recognition.continuous = true;
		recognition.interimResults = true;
		if (responsiveVoice.speech_onend) {
			recognition.start();
			recognition.onresult = function(event) {
				if(event.results[event.results.length-1].isFinal){
					console.log(event.results[event.results.length-1][0].transcript);
					document.getElementById("nombre").value=event.results[event.results.length-1][0].transcript;
				}
		    }
		}
	}
}

function nombreValido(){
	localStorage.usuario = document.getElementById("nombre").value;
}