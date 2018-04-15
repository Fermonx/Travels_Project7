const NodeMailer = require('nodemailer');
let email = {};

email.transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'geekhtravels@gmail.com',
        pass: 'geektravel1'
    }
  },

    {
        from: 'geekhtravels@gmail.com',
        headers: {}

});

module.exports = email;
