function tipoPoblacion(){
	console.log("click");
	var selected = document.getElementById("mySelect").selectedIndex;
    var select = document.getElementById("mySelect").options;
    if(selected === 0){
    	document.getElementById('tablaPaíses').style.display = 'none';
    	document.getElementById('tablaContinentes').style.display = 'block';
    }
    if(selected === 1){
    	document.getElementById('tablaContinentes').style.display = 'none';
    	document.getElementById('tablaPaíses').style.display = 'block';
    }
}

function agregarTabla(){
	var table = document.createElement('table');
	var tr = table.appendChild('tr');
	var td = document.createElement('td');
    var textoCelda = document.createTextNode("Continente");
    td.appendChild(textoCelda);
    tr.appendChild(td);

}