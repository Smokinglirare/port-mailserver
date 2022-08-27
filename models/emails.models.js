const db = require("../config/db");
const nodemailer = require("nodemailer");

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
  to: process.env.MAIL_USERNAME,
  subject: 'Portfolio mailserver',
  text: findAll.rows
};

function findAll() {
    const sql = "SELECT * FROM emails";
    return new Promise((resolve, reject) => {
      db.all(sql, (error, rows) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(rows);
  
        console.log(rows);
      });
    });
  }

  function findOne(id) {
    const sql = "SELECT * FROM emails WHERE id = ?";
  
    return new Promise((resolve, reject) => {
      db.get(sql, id, (error, rows) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(rows);
        console.log(rows);
      });
    });
  }
  
  function addOne(email) {
    const sql = "INSERT INTO emails (firstname, lastname, mail, message, skapad ) VALUES (?, ?, ?, ?, datetime('now', 'localtime'))";
  
    return new Promise((resolve, reject) => {
      db.run(sql, [email.firstname, email.lastname, email.mail, email.message, email.skapad], (error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        transporter.sendMail(mailOptions, function(err, data) {
          if (err) {
            console.log("Error " + err);
          } else {
            console.log("Someone sent an email to you from your contact form.");
          }
        });
        resolve();
      });
    });
  }

  function deleteOne(id){
    const sql = "DELETE FROM emails WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.get(sql, id, (error) => {
            if (error){
                console.error(error.message);
                reject(error);
            }
            resolve();
        })
    })
}

  module.exports = {
    findAll,
    findOne,
    addOne,
    deleteOne
    
  };
  