function iniciarSpeech(){
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
	var recognition = new SpeechRecognition();
	var res = "";

	recognition.lang = "es-ES";	
	recognition.continuous = false;
	recognition.interimResults = true;
	recognition.start();
}

function escuchar(){
	

	recognition.onresult = function(event){
		
  		for (var i = event.resultIndex; i < event.results.length; i++) {
	    	if(event.results[i].isFinal){
    			res += event.results[i][0].transcript;
    		}
		}
		console.log(res);
		respuesta(res);
	}

	recognition.onstart = function(event) { console.log(event); }
	recognition.onerror = function(event) { console.log(event); }
	recognition.onend = function(event) { console.log(event); }	
}