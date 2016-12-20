var express  = require("express"),  
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
  bodyParser  = require("body-parser"),
  methodOverride = require("method-override");
  var config = require("./config.js");
mongoose = require('mongoose');
require("./models/usuario");
  var UsuariosCtrl = require('./rutas/api');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

router.post('/users',UsuariosCtrl.createUsuario);
router.post('/userFind',UsuariosCtrl.findUser);
router.put('/userUpdate',UsuariosCtrl.updateUsuario);
router.get('/banca',UsuariosCtrl.banca);


app.use(router);

app.use(express.static('public'));
mongoose.connect('mongodb://localhost/mapimundo', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(config.express.port, function() {
    console.log("Node server running on http://localhost:3000", 
		config.express.name,
		config.express.port);
  });
});
