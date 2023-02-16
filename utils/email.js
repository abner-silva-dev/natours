const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.fistName = user.name.split(' ')[0];
    this.url = url;
    this._from = `Abner Silva <${process.env.EMAIL_FROM}>`;
  }

  _newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST_GMAIL,
        port: process.env.EMAIL_PORT_GMAIL,
        auth: {
          user: process.env.EMAIL_USERNAME_GMAIL,
          pass: process.env.EMAIL_PASSWORD_GMAIL
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) rende HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });
    // 2) Define the email option
    const mailOptions = {
      from: this._from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html, {
        wordwrap: 130
      })
    };

    //3) Create a transport and send email
    await this._newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 min)'
    );
  }
};

const sendEmail = async options => {
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

// const sendEmail = async options => {
//   // 1) Create a transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

//   // 2) Define the email option
//   const mailOptions = {
//     from: 'Abner Silva <dylansilar5@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

/////////////////////////////////////////////////////////////////////////

// SEND EMAIL WITH GMAIL

// const sendEmail = async () => {
// const confi = {
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD
//   }
// };

//   const transporter = nodemailer.createTransport(confi);

//   const message = {
//     from: process.env.EMAIL_USERNAME,
//     to: 'dylanabner14@gmail.com',
//     subject: 'Correo flipante de pruebas',
//     text: '<h1>Hola soy abner enviando un correo a abner jaja que emocion</h2>'
//   };

//   for (let i = 0; i < 10; i++) {
//     await transporter.sendMail(message);
//   }

//   // 2) Define the email option
//   // 3) Actually send the email
// };
