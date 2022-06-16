const db = require("../config/db");

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
    const sql = "INSERT INTO emails (firstname, lastname, mail, message) VALUES (?, ?, ?, ?)";
  
    return new Promise((resolve, reject) => {
      db.run(sql, [email.firstname, email.lastname, email.mail, email.message], (error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve();
      });
    });
  }

  module.exports = {
    findAll,
    findOne,
    addOne,
    
  };
  