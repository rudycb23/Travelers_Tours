const express = require('express'),
      router = express.Router(),
      hotel = require('./hotel.api');


router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

router.route('/save_hotel')
  .post((req, res) => {
    hotel.registrar(req,res);
});

router.route('/get_all_hotels')
  .get((req, res) => {
    hotel.listarTodos(req,res);
});

router.route('/update_hotel')
  .put((req, res) => {
    hotel.actualizar(req,res);
});
module.exports = router;