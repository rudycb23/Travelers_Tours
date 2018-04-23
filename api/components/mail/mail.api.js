let nodemailer = require('nodemailer');

module.exports.enviarCorreo = (req, res) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'catalyst.proyecto@gmail.com',
      pass: 'Prograweb2018'
    }
  });

  let mailOptions = {
    from: 'catalyst.proyecto@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: 'Su contraseña temporal es: ' + req.body.text,
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions,(error, info)=>{
    if(error){
      res.json({success:false, msg:error});
    }
    else{
      res.json({success:true});
    }
  });
};