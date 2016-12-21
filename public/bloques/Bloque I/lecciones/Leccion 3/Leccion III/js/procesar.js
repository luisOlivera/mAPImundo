
var procesar = (function(){		
	var simbolo = [];
	var numSimbolo = [];
	var intentos = 3;
	var totalIntentos = 0;
	var totalAtinados = [];
	var arrayLocation = [];
	var totalJuegos = 0;
	var puntos = 0;
	var elementoActual = "";

	var simbologias = ["restaurantes", "hoteles", "hospitales", "farmacias", "tiendas", "bancos", "iglesias"];

	var simbologiasEnIngles = ["restaurant", "lodging", "hospital", "pharmacy", "store", "bank", "church"];
	
	var terminado = false;
	var procesar = function(texto){
		totalIntentos = 0;
		intentos = 3;
		var pIntentos = document.getElementById('intentos');
		var pAtinados = document.getElementById('atinados');
		//console.log(texto);
		texto = texto.trim();
		texto = texto.toUpperCase();
		//console.log(texto);
		if(texto === "INICIAR"){
			totalJuegos++;
			if(totalJuegos <= 3){
				simbolo[0] = simbologias[Math.floor((Math.random() * simbologias.length))];
				while(elementoActual === simbolo[0]){
					simbolo[0] = simbologias[Math.floor((Math.random() * simbologias.length))];
				}
				elementoActual = simbolo[0];
				//numSimbolo[0] = Math.floor((Math.random() * 3) + 2);
				numSimbolo[0] = Math.round(Math.random()*(3-2)+parseInt(2));
				//console.log(numSimbolo[0]);
				intentos += numSimbolo[0];
				totalAtinados[0] = 0;
				pIntentos.innerHTML = "intentos: " + intentos;
				pAtinados.innerHTML = simbolo[0] + ": " +totalAtinados[0] + "/" + numSimbolo[0];
				var instrucciones = document.getElementById('instrucciones');
				var textoIns = "Selecciona "+numSimbolo[0] + " "+simbolo[0] + " que puedes ver en el mapa";
				instrucciones.innerHTML = textoIns;
				responsive.leer(textoIns);
			}else if(totalJuegos <= 5){
				simbolo[0] = simbologias[Math.floor((Math.random() * simbologias.length))];
				simbolo[1] = simbologias[Math.floor((Math.random() * simbologias.length))];
				while( simbolo[0] === simbolo[1]){
					simbolo[1] = simbologias[Math.floor((Math.random() * simbologias.length))];
				}
				simbolo[2] = simbologias[Math.floor((Math.random() * simbologias.length))];
				while(simbolo[0] === simbolo[2] || simbolo[1] === simbolo[2]){
					simbolo[2] = simbologias[Math.floor((Math.random() * simbologias.length))];
				}
				
				numSimbolo[0] = Math.round(Math.random()*(3-2)+parseInt(2));
				numSimbolo[1] = Math.round(Math.random()*(3-2)+parseInt(2));
				numSimbolo[2] = Math.round(Math.random()*(3-2)+parseInt(2));
				totalAtinados[0] = 0;
				totalAtinados[1] = 0;
				totalAtinados[2] = 0;
				intentos = 5 + numSimbolo[0] + numSimbolo[1] + numSimbolo[2];
				pIntentos.innerHTML = "intentos: " + intentos;
				pAtinados.innerHTML = simbolo[0] + ": " +totalAtinados[0] + "/" + numSimbolo[0] + "   "+
				simbolo[1] + ": " +totalAtinados[1] + "/" + numSimbolo[1] + "   "+
				simbolo[2] + ": " +totalAtinados[2] + "/" + numSimbolo[2];
				var instrucciones = document.getElementById('instrucciones');
				var textoIns = "Selecciona "+numSimbolo[0] + " " + simbolo[0] + ", " + numSimbolo[1] + " " +simbolo[1] + ", " + numSimbolo[2] + " " + simbolo[2] + " que puedes ver en el mapa";
				instrucciones.innerHTML = textoIns;
				responsive.leer(textoIns);
			}
		}
	}

	var evaluar = function(res){
		var pIntentos = document.getElementById('intentos');
		var pAtinados = document.getElementById('atinados');
		var pPuntos = document.getElementById('puntos');
		if(totalIntentos <= intentos){
			totalIntentos++;
		}
		for(var i = 0; i < arrayLocation.length; i++){
			//console.log(arrayLocation[i].lat + "   " + res.geometry.location.lat() + arrayLocation[i].lng + "   " + res.geometry.location.lng());
			if(arrayLocation[i].lat === res.geometry.location.lat() && arrayLocation[i].lng === res.geometry.location.lng()){
				break;
			}
		}

		if(i === arrayLocation.length && terminado === false){
			arrayLocation.push({"lat": res.geometry.location.lat(), "lng": res.geometry.location.lng()});
			//console.log(res);
			if(totalJuegos <= 3){
				if(res.types.length > 0){
					var id = -1;
					for(var i = 0; i < res.types.length; i++){
						id = simbologiasEnIngles.indexOf(res.types[i]);	
						if(id >= 0){
							break;
						}
					}
				//console.log(id);
				if(id >= 0){
					if(simbologias[id] === simbolo[0]){	
						totalAtinados[0] = totalAtinados[0]+1;		
						//console.log("atinaste");
					}
				}
			}
			pIntentos.innerHTML = "intentos: " + (intentos-totalIntentos);
			pAtinados.innerHTML = simbolo[0] + ": " +totalAtinados[0] + "/" + numSimbolo[0];
			//console.log(totalAtinados[0] +" "+numSimbolo[0]);
			if(totalIntentos > intentos){
				responsive.leer("Lo siento ya superaste el total de intentos");
				reiniciarValores();
				procesar("INICIAR");
			}else if(totalAtinados[0] >= numSimbolo[0]){
				responsive.leer("Excelente, continuemos");
				//puntos = puntos + ((totalIntentos - numSimbolo[0]) * 2)/numSimbolo[0];
				puntos = puntos + (2/(totalIntentos/numSimbolo[0]));
				//console.log(puntos);
				pPuntos.innerHTML = "Puntos: " + puntos.toFixed(1);
				reiniciarValores();
				procesar("INICIAR");
			}
		}else if(totalJuegos <= 5){
			if(res.types.length > 0){
				var id = simbologiasEnIngles.indexOf(res.types[0]);
				//console.log(id);
				if(id >= 0){
					if(simbologias[id] === simbolo[0] && totalAtinados[0] < numSimbolo[0]){	
						totalAtinados[0] = totalAtinados[0]+1;		
						//console.log("atinaste 1");
					}
					if(simbologias[id] === simbolo[1] && totalAtinados[1] < numSimbolo[1]){
						totalAtinados[1] = totalAtinados[1]+1;		
						//console.log("atinaste 2");
					}
					if(simbologias[id] === simbolo[2] && totalAtinados[2] < numSimbolo[2]){
						totalAtinados[2] = totalAtinados[2]+1;		
						//console.log("atinaste 3");
					}
				}
			}
			pIntentos.innerHTML = "intentos: " + (intentos-totalIntentos);
			pAtinados.innerHTML = simbolo[0] + ": " +totalAtinados[0] + "/" + numSimbolo[0] + "   "+
			simbolo[1] + ": " +totalAtinados[1] + "/" + numSimbolo[1] + "   "+
			simbolo[2] + ": " +totalAtinados[2] + "/" + numSimbolo[2];
			if(totalIntentos > intentos){
				if(totalJuegos === 5){
					terminado = true;
					responsive.leer("Lo siento ya superaste el total de intentos");
					responsive.leer("Felicidades, terminaste la lección con un puntaje de " + puntos.toFixed(1));
				}else{
					reiniciarValores();
					responsive.leer("Lo siento ya superaste el total de intentos");
					procesar("INICIAR");
				}
			}else if((totalAtinados[0] >= numSimbolo[0]) &&
				(totalAtinados[1] >= numSimbolo[1]) && 
				(totalAtinados[2] >= numSimbolo[2])){
				puntos = puntos + (2/(totalIntentos/(numSimbolo[0] + numSimbolo[1] + numSimbolo[2])));
				pPuntos.innerHTML = "Puntos: " + puntos.toFixed(1);
				if(totalJuegos === 5){
					terminado = true;
					responsive.leer("Felicidades, terminaste la lección con un puntaje de " + puntos.toFixed(1));
				}else{
					reiniciarValores();
					responsive.leer("Excelente, continuemos");
					procesar("INICIAR");
				}
			}
			
		}
	}
		//console.log(totalAtinados);
	}

	function reiniciarValores(){
		arrayLocation = [];
		totalIntentos = 0;
		totalAtinados = [];
		intentos = 3;
	}

	return {
		"procesar": procesar,
		"evaluar": evaluar
	}
})();
