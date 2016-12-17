var zoomActual = 0, zoomAnterior = 0;
var xI = 0, yI = 0;
var menu = false;

Leap.loop({enableGestures:true},function (frame) {
	if (frame.valid) {

		var mano1,mano2,x,y;

		if(frame.hands.length === 1){
            mano1 = frame.hands[0];
        }else if(frame.hands.length === 2){
            mano1 = frame.hands[0];
            mano2 = frame.hands[1];
        }

        if (mano1 != undefined && mano2 === undefined) {
        	if (extendedFingers(mano1) > 3) {
        		var position = frame.pointables[0].stabilizedTipPosition;
            	var normalized = frame.interactionBox.normalizePoint(position);
            	x = window.innerWidth * normalized[0];
            	y = window.innerHeight * normalized[1];
        		if (isPalmDown(mano1)) {
        			girarY(y);
        		}else{
        			girarX(x);
        		}
        	}else if (extendedFingers(mano1) === 1 && mano1.indexFinger.extended) {
        		LeapManager.maxCursors = 1
            }else if (extendedFingers(mano1) === 2 && mano1.indexFinger.extended && mano1.middleFinger.extended) {
            	//alert("PAUSA");
                   // openNav();
                    
            }
            else{
                LeapManager.maxCursors = 0;
            }
        }else if(mano1 != undefined && mano2 != undefined){
        	if (extendedFingers(mano1) > 2 && extendedFingers(mano2) > 2) {
        		zoomMapa([mano1.palmPosition[0], mano2.palmPosition[0]]);
        	}
        }
	}
});


var extendedFingers =  function (mano) {
	var d = 0;
	for (var i = 0; i < mano.fingers.length; i++) {
		var dedo = mano.fingers[i];
		if (dedo.extended === true) {
			d++;
		}
	}
	return d;
}

var isPalmDown = function (mano) {
	if (Math.abs(mano.palmNormal[0]) > 0.4) {
		return false;
	}
	return true;
}

function girarY(y){
       
        if(y > 400 ){
            //Arriba
            if(view.center.latitude < 89){
                view.center = [view.center.longitude, view.center.latitude+1];
            }
        } else if (y < -20) {
            //Abajo
            if(view.center.latitude > -89){
                view.center = [view.center.longitude, view.center.latitude-1];
            }
        }

}


function girarX(x){
    if(x < xI){
        if(Math.abs(x-xI) > 10){
            view.center = [view.center.longitude+5, view.center.latitude];
        }
    }

    else if(x > xI){
        if(Math.abs(x-xI) > 10){
            view.center = [view.center.longitude-5, view.center.latitude];
        }
    }

    if(Math.abs(x-xI) >= 10 || xI === 0){
        xI = x;
    }
}

function zoomMapa(posiciones){
    zoomActual = Math.abs(posiciones[0] - posiciones[1]);
    if(zoomActual > zoomAnterior ){
        view.scale -= 1000000;
    }else{
        view.scale += 1000000;
    }
    if (Math.abs(posiciones[0] - posiciones[1]) >= 100 || zoomAnterior === 0 ) {
    	zoomAnterior = zoomActual ;
    }
}