let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    idHotel                : { type: String, require: true },
    provincia              : { type: String, require: true },
    canton                 : { type: String, require: true },
    distrito               : { type: String, require: true },
    direccion              : { type: String, require: true },
    telefonoServicio       : { type: String, require: true },
    correoServicio         : { type: String, require: true },
    telefonoReservaciones  : { type: String, require: true },
    correoReservaciones    : { type: String, require: true },
    fotoHotel              : { type: String, require: true },
    valoracion             : { type: String, require: true }
});

module.exports = mongoose.model('Hotel', UserSchema);
