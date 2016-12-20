var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var usuario = new Schema({  
  usuario:    { type: String },
  password:     { type: String },
  leccion1:  { type: String },
  leccion2:   { type: String },
  leccion3:  { type: Number },
  leccion4:    { type: String, enum:
  ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
        },
  summary:  { type: String }
});

module.exports = mongoose.model('Usuario', usuario);  