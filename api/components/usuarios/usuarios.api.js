const travelerModel = require('./usuarios.model');

module.exports.registrar = (req, res) => {
  let newTraveler = new travelerModel({
    cedula          : req.body.cedula,
    primerNombre    : req.body.primerNombre,
    segundoNombre   : req.body.segundoNombre,
    primerApellido  : req.body.primerApellido,
    segundoApellido : req.body.segundoApellido,
    edad            : req.body.edad,
    genero          : req.body.genero,
    correo          : req.body.correo,
    telefono        : req.body.telefono,
    contrasenna     : req.body.contrasenna,
    rol             : req.body.rol,
    fotoCliente     : req.body.fotoCliente
  });

  newTraveler.save((err) => {
    if (err) {
      res.json({ success: false, msg: 'Ha ocurrido un error registrando al viajero' + err });
    } else {
      res.json({ success: true, msg: 'El el viajero se ha registrado correctamente' });
    }
  });
};

module.exports.listarTodos = (req, res) => {
  travelerModel.find().then((user) => {
    console.log(user)
    res.send(user);
  });
};

module.exports.actualizar = (req, res) => {
  console.log(req);
  travelerModel.update({ correo: req.body.correo }, req.body, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};