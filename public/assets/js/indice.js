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

	$("#BotonRegistro").click(function(){
		$("#login").hide();
		var logi=document.getElementById('registrar');
		logi.style.display='block'; 
		logi.style.width="auto";
		responsiveVoice.setDefaultVoice("Spanish Latin American Female");
    	responsiveVoice.speak("Ingresa los siguientes datos amiguito");
	});

	
	$("#regresar").click(function(){
		showIndice();
		$("#registrar").hide();
	});

	$("#sesion").click(function(){
		localStorage.clear();
		window.location="http://localhost:3000/";
	});
}


function nombreValido(){
	 var user = $("#nombre").val();
	var pass = $("#pass").val();
	
        $.ajax({
        type: "POST",
        url: "//localhost:3000/userFind",
        async:false,
		data: {user: user, password: pass},
        success: function(data){
          console.log(data);
		  if(data.mensaje){
		//alert(data.mensaje);
    	responsiveVoice.speak("Usuario o contraseña incorrecta");
		  }else{
    	responsiveVoice.speak("Bienvenido");
		localStorage.usuario = document.getElementById("nombre").value;
		  }
        }
        });
}

function registroValido(){
	responsiveVoice.setDefaultVoice("Spanish Latin American Female");
    var nom = $("#nom").val();
	var user = $("#usu").val();
	var pass = $("#contra").val();

        $.ajax({
        type: "POST",
        url: "//localhost:3000/users",
        async:false,
		data: {nombre: nom,user: user, password: pass},
        success: function(data){
          console.log(data);
		  if(data.mensaje){
		//alert(data.mensaje);
    	responsiveVoice.speak("El nombre de usuario ya existe, ingresa otro usuario.");
		  }else{
    	responsiveVoice.speak("Has sido registrado con exito");
		window.location="http://localhost:3000/indice.html";
		  }
        }
        });

}