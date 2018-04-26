let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    idHotel                : { type: String, require: true },
    nombreHotel            : { type: String, require: true },
    provincia              : { type: String, require: true },
    canton                 : { type: String, require: true },
    distrito               : { type: String, require: true },
    direccion              : { type: String, require: true },
    telefonoServicio       : { type: String, require: true },
    correoServicio         : { type: String, require: true },
    telefonoReservaciones  : { type: String, require: true },
    correoReservaciones    : { type: String, require: true },
    fotoHotel              : { type: String, require: true },
    valoracion             : { type: Number, require: true },
    estadohotel            : { type: Boolean, require: true},
    latitud                : { type: Number, require: true },
    longitud               : { type: Number, require: true },
    mapa                   : { type: Array, require: true },
    cantRates              : { type: Number},
    totalValor             : { type: Number}
});

module.exports = mongoose.model('Hotel', UserSchema);
