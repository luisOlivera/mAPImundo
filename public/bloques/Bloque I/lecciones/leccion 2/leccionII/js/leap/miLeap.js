var zoomActual, zoomAnterior, xI = 0, yI = 0, zI = 0;

var controller = Leap.loop({enableGestures: true}, function(frame){
    if(frame.valid){
        if(frame.gestures.length > 0){
            for(var i=0; i<frame.gestures.length; i++){
                var gesto = frame.gestures[i];
                if(gesto.type === "swipe"){
                    moverMapa(gesto);
                    break;
                }
            }
        }
        
        var mano1, mano2, x, y;
        
        if(frame.hands.length === 1){
            mano1 = frame.hands[0];
        }else if(frame.hands.length === 2){
            mano1 = frame.hands[0];
            mano2 = frame.hands[1];
        }
        
        if (frame.pointables.length > 0) {
            var position = frame.pointables[0].stabilizedTipPosition;
            var normalized = frame.interactionBox.normalizePoint(position);
            x = window.innerWidth * normalized[0];
            y = window.innerHeight * normalized[1];
            var extendedFingers1 = 0;
            var extendedFingers2 = 0
            for(var f = 0; f < mano1.fingers.length; f++){
                var dedo1 = mano1.fingers[f];

                if(mano2 !== undefined){
                    var dedo2 = mano2.fingers[f];
                }                               

                if(dedo1.extended){
                    extendedFingers1++;
                }

                if(dedo2 !== undefined && dedo2.extended){
                    extendedFingers2++;
                }
            }
        }
        
        //Para saber si debe aparecer el cursor
        if(mano1 !== undefined && mano2 === undefined){
            if(extendedFingers1 === 1 && mano1.indexFinger.extended){
                //Activo el cursor
                LeapManager.maxCursors = 1
            }else{
                //Desactivo el cursor
                LeapManager.maxCursors = 0;
            }
        } 
        
        //Para saber si debe hacer zoom
        if(extendedFingers1 > 2 && extendedFingers2 > 2 && mano2 !== undefined ) {
            zoomMapa([mano1.palmPosition[0], mano2.palmPosition[0]]);            
        }
        
        //Para girar hacia la derecha e izquierda
        else if (extendedFingers1 >= 3 && mano2 === undefined){
            girar(x);  
            girarY(y);

        }

       
        
    }
});

function seleccionarPais(event){
    require(["esri/geometry/ScreenPoint"], function(ScreenPoint){
        var sp = new ScreenPoint({
            x: event.x,
            y: event.y
        });
        var punto = view.toMap(sp);
        if(punto.latitude && punto.longitude){
            lat = punto.latitude;
            lon = punto.longitude;   
            //Llamo a mi función que hace algo con las coordenadas
            mostrarInfo();
        }
    });
}

function moverMapa(gesto){
    var esHorizontal = Math.abs(gesto.direction[0]) > Math.abs(gesto.direction[1]);
    if(esHorizontal){
        /*if(gesto.direction[0] > 0){
            //Derecha
            view.center = [view.center.longitude+10, view.center.latitude];
        } else {
            //Izquierda
            view.center = [view.center.longitude-10, view.center.latitude];
        }*/
    } else {
        if(gesto.direction[1] > 0){
            //Arriba
            if(view.center.latitude < 89){
                view.center = [view.center.longitude, view.center.latitude+1];
            }
        } else {
            //Abajo
            if(view.center.latitude > -89){
                view.center = [view.center.longitude, view.center.latitude-1];
            }
        }
    }
}

function zoomMapa(posiciones){
    zoomActual = Math.abs(posiciones[0] - posiciones[1]);
    if(zoomActual > 0){
        if(zoomActual > zoomAnterior ){
            
            view.scale -= 2000000;
        }else{
            
            view.scale += 2000000;
        }
    }
    zoomAnterior = zoomActual ;
}
function girarY(y){
       
        if(y > 300 ){
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
function girar(x){
    if(x < xI){
        if(Math.abs(x-xI) > 10){
            view.center = [view.center.longitude+10, view.center.latitude];
        }
    }

    if(x > xI){
        if(Math.abs(x-xI) > 10){
            view.center = [view.center.longitude-10, view.center.latitude];
        }
    }

    if(Math.abs(x-xI) >= 10 || xI === 0){
        xI = x;
    }
}

