const NodeMailer = require('nodemailer');
let email = {};

email.transporter = NodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'xxfermonxx@gmail.com',
        pass: 'F3rn4nG00.'
    }
  },

    {
        from: 'xxfermonxx@gmail.com',
        headers: {}

});

module.exports = email;
