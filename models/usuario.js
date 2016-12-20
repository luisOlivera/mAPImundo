var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var user = new Schema({  
  nombre: {type: String},  
  user: { type: String },
  password: { type: String },
  lecciones: Schema.Types.Mixed
});

module.exports = mongoose.model('Usuario', user);