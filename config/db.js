const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.log(error.message);
    throw error;
  }

  const emailstatement = `
       CREATE TABLE emails (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           firstname TEXT,
           lastname TEXT,
           mail TEXT,
           message TEXT
       )
    `;

  db.run(emailstatement, (error) => {
    if (error) {
      console.error(error.message);
    } else {
      const insert = "INSERT INTO emails (firstname, lastname, mail, message) VALUES (?, ?, ?, ?)";
      db.run(insert, ["Sebastian", "Torneus", "Sebastian.thorneus@gmail.com", "Hej hur är läget bre?"]);
    }
  });
});

module.exports = db;
