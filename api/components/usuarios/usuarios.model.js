let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({

  cedula:           { type: Number, require: true },
  primerNombre:     { type: String, require: true},
  segundoNombre:    { type: String},
  primerApellido:   { type: String, require: true },
  segundoApellido:  { type: String},
  edad:             { type: String, require: true },
  genero:           { type: String, require: true },
  correo:           { type: String, require: true },
  telefono:         { type: String, require: true },
  contrasenna:      { type: String, require: true },
  rol:              { type: String, require: true },
  fotoCliente:      { type: String, require:true  },

});




module.exports = mongoose.model('User', UserSchema);
