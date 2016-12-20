var xI, yI, zI;
var iniciarLeap = function(){
	Leap.loop(function(frame) {
		var x;
		var y;
		var z;

  if (frame.pointables.length > 0) {
    var position = frame.pointables[0].stabilizedTipPosition;
    var normalized = frame.interactionBox.normalizePoint(position);
    
    x = window.innerWidth * normalized[0];
    y = window.innerHeight * (1 - normalized[1]);
    z = window.innerHeight * (1 - normalized[2]);

    //console.log("X: " + x + " Y: " + y + "Z:" + z);
  }

  if(frame.pointables.length >= 3){
  	girar(x,y,z);
  }

});
}

function movimiento(x,y,z){
	if(x < xI){
		console.log("Girar Izquierda");
	}

	if(x > xI){
		console.log("Girar Derecha");
	}

	if(y < yI){
		console.log("Girar Arriba");
	}

	if(y > yI){
		console.log("Girar Abajo");
	}



	xI = x;
	yI = y;
	zI = z;
}

function girar(x,y,z){
	if(x < xI){
		console.log("Girar Izquierda");
	}

	if(x > xI){
		console.log("Girar Derecha");
	}

	if(y < yI){
		console.log("Girar Arriba");
	}

	if(y > yI){
		console.log("Girar Abajo");
	}



	xI = x;
	yI = y;
	zI = z;
}

function seleccionar(){

}

function navegar(){

}

}


