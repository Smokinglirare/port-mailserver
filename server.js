const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const nodemailer = require("nodemailer");

const port = process.env.PORT || 4000;
const app = express();

const sender = "pelle";
const emailsRouter = require("./routes/emails.router");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: sender,
    to: process.env.MAIL_USERNAME,
    subject: 'Portfolio mailserver',
    text: 'Du har fått mail'
  };
  

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });

app.use(cors());
app.use(bodyParser.json());

app.use(emailsRouter);

app.listen(port, () => {
    console.log(`Servern kör på ${port}`)
});