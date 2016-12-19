
var evaluar = (function(){
	
	var evaluar = function(texto){
		//console.log(texto);
		texto = texto.trim();
		texto = texto.toUpperCase();
		console.log(texto);
		if(texto === "INICIAR"){
			var simbolo = simbologias[Math.floor((Math.random() * simbologias.length))];
			var numSimbolo = Math.floor((Math.random() * 5) + 1);
			responsive.leer("Selecciona "+numSimbolo + " "+simbolo + " "+"que puedes ver en el mapa");
		}
	}

	return {
		"procesar": procesar,
	}
})();
