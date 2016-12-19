var express = require('express');
var config = require("./config.js");

var ruta = require('./rutas/api.js');


var mAPIServer = express();

mAPIServer.use(express.static('public'));
mAPIServer.use('/',ruta);
function startmAPIserver(){
	mAPIServer.listen(config.express.port);
	console.log('%s escuchando en el puerto: %s',
		config.express.name,
		config.express.port);
}

startmAPIserver();