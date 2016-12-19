var express = require('express');
var router = express.Router();
var http = require('http');
var parseString = require('xml2js').parseString;

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
