
var procesar = (function(){	

	var países = new Array("AFGANISTAN", "ALBANIA", "ARGELIA", "ANDORRA", "ANGOLA", "ANTARTIDA", "ANTIGUA Y BARBUDA",
		"ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS",
		"BELARUS", "BELGICA", "BELICE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA Y HERZEGOVINA", "BOTSWANA",
		"BRASIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURMA", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADÁ", "CAPE VERDE",
		"CENTRAL AFRICAN REPUBLIC", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "REPUBLIC DEMOCRATIC OF THE CONGO",
		"REPUBLIC OF THE CONGO", "COSTA RICA", "COTE D'IVOIRE", "CROACIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK",
		"DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGIPTO", "EL SALVADOR", "EQUATORIAL GUINEA",
		"ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCIA", "GABON", "GAMBIA", "GEORGIA", "ALEMANIA", "GHANA",
		"GRECIA", "GREENLAND", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HONDURAS", "HONG KONG",
		"HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALIA", "JAMAICA", "JAPON",
		"JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, NORTH", "KOREA, SOUTH", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA",
		"LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACEDONIA", "MADAGASCAR",
		"MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MAURITANIA", "MAURITIUS", "MÉXICO", "MICRONESIA",
		"MOLDOVA", "MONGOLIA", "MOROCCO", "MONACO", "MOZAMBIQUE", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW ZEALAND",
		"NICARAGUA", "NIGER", "NIGERIA", "NORWAY", "OMAN", "PAKISTAN", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU",
		"PHILIPPINES", "POLAND", "PORTUGAL", "QATAR", "ROMANIA", "RUSIA", "RWANDA", "SAMOA", "SAN MARINO", " SAO TOME",
		"SAUDI ARABIA", "SENEGAL", "SERBIA AND MONTENEGRO", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA",
		"SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN",
		"SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TONGA", "TRINIDAD AND TOBAGO",
		"TUNISIA", "TURKEY", "TURKMENISTAN", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "ESTADOS UNIDOS",
		"URUGUAY", "UZBEKISTAN", "VANUATU", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", "ZIMBABWE");
	

	var procesar = function(texto){
		//console.log(texto);
		texto = texto.trim();
		texto = texto.toUpperCase();
		console.log(texto);
		var indice = países.indexOf(texto);
		if(indice >= 0){
			seleccionarPais(texto);
		}else if(texto === "SI" || texto === "SÍ"){
			responsive.leer("1. ¿Información acerca de mapimundo?, 2. ¿Quieres Seleccionar algún país?, 3.Ayuda");
		}else if(texto === "1"){
			responsive.leer("Mapimundo es una aplicación que te permitirá aprender más acerca de geografía, esto con el fin de apoyarte a conocer más acerca del mundo");
		}else if(texto === "2"){
			responsive.leer("Dime el nombre de un país");
		}else if(texto === "3"){
			responsive.leer("Para empezar puedes seleccionar un país y la parte derecha del mapa puedes ver información acerca dese país");
		}

	}

	return {
		"procesar": procesar,
	}
})();
