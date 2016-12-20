var countries = new Array("Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia",
"Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina",
"Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","República Popular China","Chipre",
"Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador",
"Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi",
"Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea Ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría",
"India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia",
"Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui",
"Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru",
"Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia",
"Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana",
"República Sudafricana","Ruanda","Rumania","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal",
"Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán",
"Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen",
"Yibuti","Zambia","Zimbabue");

var procesar = (function(){		
	var colores = ["rojo", "verde", "azul", "rosa", "amarillo"];
	var color = "";
	var numPaises = 0;
	var poblacionMin = 0;
	var poblacionMax = 0;
	var atinados = 0;
	var intentosAcumulados = 0;
	var totalIntentos1 = 3;
	var coloresUsados = [];
	//var textoIns = "";
	var procesar = function(texto){
		texto = texto.trim();
		texto = texto.toUpperCase();
		intentosAcumulados = 0;
		totalIntentos1 = 3;
		var pIntentos = document.getElementById('intentos');
		var pAtinados = document.getElementById('atinados');
		var instrucciones = document.getElementById('instrucciones');
		if(texto === "INICIAR"){
			reiniciarValores();
			if(coloresUsados.length === colores.length){
				responsive.leer("Felicidades, terminaste la lección 1");
				pIntentos.innerHTML = " ";
				pAtinados.innerHTML = " ";
				instrucciones.innerHTML = "Felicidades, terminaste la lección 1";
				coloresUsados = [];
			}else{
			color = colores[Math.floor((Math.random() * colores.length))];
			var index = coloresUsados.indexOf(color);
			while(index >= 0){
				color = colores[Math.floor((Math.random() * colores.length))];
				var index = coloresUsados.indexOf(color);
			}
			coloresUsados.push(color);
			switch(color) {
    			case "rojo":
        			poblacionMin = 0;
        			poblacionMax = 1000000;
        			break;
    			case "verde":
        			poblacionMin = 1000000;
        			poblacionMax = 10000000;
        			break;
        		case "azul":
        			poblacionMin = 10000000;
        			poblacionMax = 50000000;
        			break;
        		case "rosa":
        			poblacionMin = 50000000;
        			poblacionMax = 100000000;
        			break;
        		case "amarillo":
        			poblacionMin = 100000000;
        			poblacionMax = 1000000000;
        			break;
        	}
			numPaises = Math.round(Math.random()*(4-2)+parseInt(2));
			totalIntentos1 = totalIntentos1 + numPaises;

			pIntentos.innerHTML = "intentos: " + totalIntentos1;
			pAtinados.innerHTML = color + ": " + atinados+ "/" + numPaises;
			var textoIns = "Selecciona "+ numPaises +"  países que tienen el símbolo de color " + color + ", la población de los países con ese símbolo está entre " + poblacionMin + " y " + poblacionMax + " de habitantes";
			instrucciones.innerHTML = textoIns;
			responsive.leer(textoIns);
		}
		}
	}

	var evaluar = function(res){
		var pIntentos = document.getElementById('intentos');
		var pAtinados = document.getElementById('atinados');
		var indice = countries.indexOf(res);
		intentosAcumulados++;
		if(intentosAcumulados > totalIntentos1){
			responsive.leer("Lo siento ya superaste el total de intentos");
			reiniciarValores();
			procesar("INICIAR");
		}else if(indice >= 0){
			var poblacionActual = poblaciones[indice];
			responsive.leer(countries[indice]);
			responsive.leer(poblacionActual)
			//console.log(poblacionActual);
			if(poblacionActual > poblacionMin && poblacionActual < poblacionMax){
				console.log("Atinaste");
				atinados++;
			}
			if(atinados === numPaises){
				responsive.leer("Excelente, continuemos");
				reiniciarValores();
				procesar("INICIAR");
			}
		}
		pIntentos.innerHTML = "intentos: " + (totalIntentos1-intentosAcumulados);
		pAtinados.innerHTML = color + ": " +atinados + "/" + numPaises;
	}
		

	function reiniciarValores(){
		totalIntentos1 = 3;
		atinados = 0;
		intentosAcumulados = 0;
	}

	return {
		"procesar": procesar,
		"evaluar": evaluar
	}
})();
