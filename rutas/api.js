var express = require('express');
var router = express.Router();
var http = require('http');
var parseString = require('xml2js').parseString;

var mongoose = require('mongoose');  
var Usuario  = mongoose.model('Usuario');



/*
router.get('/banca', function(req, res, next) {
 
    http.get(req.query.url, function(response) {        
        var arreglo = [];
        response.on('data', function(dato) {
            arreglo.push(dato);
        }).on('end', function() {
            var xml = Buffer.concat(arreglo);
           
            
            parseString(xml, function (err, result) {
                res.send(result);
            });
        });
    }).on('error', function(e) {
        console.log(e.message);
    });
});
    
    
module.exports = router;
*/

exports.banca =  function(req, res, next) {
 
    http.get(req.query.url, function(response) {        
        var arreglo = [];
        response.on('data', function(dato) {
            arreglo.push(dato);
        }).on('end', function() {
            var xml = Buffer.concat(arreglo);
           
            
            parseString(xml, function (err, result) {
                res.send(result);
            });
        });
    }).on('error', function(e) {
        console.log(e.message);
    });
};


exports.createUsuario  = function(req, res) {  
    console.log('POST');
    console.log(req.body);
Usuario.find({user: req.body.user},function(err, usuario) {
    if(err){
        res.send(500, err.message);
    }else if(usuario.length == 1){
        res.status(200).jsonp({mensaje:"Ya existe ese nombre de usuario"});
    }else{
            var usuario = new Usuario({
        nombre: req.body.nombre,
        user: req.body.user,
        password: req.body.password,
        lecciones: {
        bloque1:{leccion1: 0,
            leccion2: 0,
            leccion3: 0,
            leccion4: 0},
        bloque2:{leccion1: 0,
            leccion2: 0,
            leccion3: 0,
            leccion4: 0},
        bloque3:{leccion1: 0,
            leccion2: 0,
            leccion3: 0,
            leccion4: 0},
        bloque4:{leccion1: 0,
            leccion2: 0,
            leccion3: 0,
            leccion4: 0},
        bloque5:{leccion1: 0,
            leccion2: 0,
            leccion3: 0,
            leccion4: 0}
        } 
    });

    usuario.save(function(err, usuario) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(usuario);
    });
    }
        
});

};

exports.findUser = function(req, res) {
if (req.body.user) {
    Usuario.find({user: req.body.user},function(err, usuario) {
        if(err) {
            res.send(500, err.message);
        }
        else if(req.body.password === usuario[0].password){
            console.log(usuario[0].lecciones.bloque1);
            res.status(200).jsonp(usuario);
        }else{
            res.status(200).jsonp({mensaje:"Usuario o contraseña incorrecta"});
        }
    });
}  
};



exports.updateUsuario = function(req, res) {  
    Usuario.find({user: req.body.user}, function(err, usuario) {

        if(err) return res.status(500).send(err.message);

        var l = usuario[0].lecciones;

        if(req.body.bloque === "bloque1" && req.body.leccion === "leccion1"){
            l.bloque1.leccion1 = req.body.puntaje;
        }else if(req.body.bloque === "bloque1" && req.body.leccion === "leccion2"){
            l.bloque1.leccion2 = req.body.puntaje;
        }else if(req.body.bloque === "bloque1" && req.body.leccion === "leccion3"){
            l.bloque1.leccion3 = req.body.puntaje;
        }else if(req.body.bloque === "bloque1" && req.body.leccion === "leccion4"){
            l.bloque1.leccion4 = req.body.puntaje;
        }else if(req.body.bloque === "bloque2" && req.body.leccion === "leccion1"){
            l.bloque2.leccion1 = req.body.puntaje;
        }else if(req.body.bloque === "bloque2" && req.body.leccion === "leccion2"){
            l.bloque2.leccion2 = req.body.puntaje;
        }else if(req.body.bloque === "bloque2" && req.body.leccion === "leccion3"){
            l.bloque2.leccion3 = req.body.puntaje;
        }else if(req.body.bloque === "bloque2" && req.body.leccion === "leccion4"){
            l.bloque2.leccion4 = req.body.puntaje;
        }

    Usuario.update({user: req.body.user}, {lecciones: l}, function (err, place) {
  res.send(usuario);
});
   });
   
};
