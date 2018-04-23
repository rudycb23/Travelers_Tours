const hotelModel = require('./hotel.model');

module.exports.registrar = (req, res) => {
  let newHotel = new hotelModel({
    idHotel                : req.body.idHotel,
    provincia              : req.body.provincia,
    canton                 : req.body.canton,
    distrito               : req.body.distrito,
    direccion              : req.body.direccion,
    telefonoServicio       : req.body.telefonoServicio,
    correoServicio         : req.body.correoServicio,
    telefonoReservaciones  : req.body.telefonoReservaciones,
    correoReservaciones    : req.body.correoReservaciones,
    fotoHotel              : req.body.fotoHotel,
    valoracion             : req.body.valoracion
  });

  newHotel.save((err) => {
    if (err) {
      res.json({ success: false, msg: 'Ha ocurrido un error registrando al viajero' + err });
    } else {
      res.json({ success: true, msg: 'El el viajero se ha registrado correctamente' });
    }
  });
};

module.exports.listarTodos = (req, res) => {
  hotelModel.find().then((hotel) => {
    res.send(hotel);
  });
};

module.exports.actualizar = (req, res) => {
  console.log(req);
  hotelModel.update({ idHotel: req.body.idHotel }, req.body, (err, hotel) => {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};