const nodemailer = require('nodemailer');
const { generateEmail } = require('./mailtemplate');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const sendMail = (emailToSend, options) => {
  const { subject, html } = options;
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: emailToSend,
    //subject: `${id}: Other user wants to rent one of your games from Alquigame`,
    subject,
    //html: generateEmail(id)
    html
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    
    }
  });
}

module.exports = sendMail;