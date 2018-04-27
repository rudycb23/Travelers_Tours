let nodemailer = require('nodemailer');

module.exports.enviarCorreo = (req, res) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rudy.cb23promotor@gmail.com',
      pass: 'rudyneitorcb23'
    }
  });

  let mailOptions = {
    from: 'travelerstours@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: 'Su registro ha sido exitoso, le garantizamos que sus próximos viajes serán de mayor disfrute gracias a nustras selcción de hoteles.' , text:'Rudy.',
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