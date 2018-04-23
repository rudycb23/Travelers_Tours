let express = require('express'),
  router = express.Router(),
  mailApi = require('./mail.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

/**
 * Función que se encarga de registrar los usuarios dentro del local storage
 */
router.route('/mail')
  .post((req, res) => {
    mailApi.enviarCorreo(req,res);
});

module.exports = router;