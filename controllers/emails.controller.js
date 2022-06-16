const model = require("../models/emails.models");

async function getMails(req, res) {
    const result = await model.findAll();
  
    if (result.length === 0) {
      return res.status(404).json({ error: "Hittar inga mail." });
    }
  
    res.json({ Success: result });
  }
  
  async function getMail(req, res) {
    const result = await model.findOne(req.params.id);
  
    if (!result) {
      return res.status(404).json({ error: "Mailet finns inte." });
    }
  
    res.json({ Success: result });
  }

  async function addMail(req, res) {
    const { firstname, lastname, mail, message } = req.body;
  
    const newMail = {
      firstname,
      lastname,
      mail,
      message
    };
  
    if (!firstname || !lastname || !mail || !message) {
      return res
        .status(400)
        .json({ error: "Du måste fylla alla fält." });
    }
  
    await model.addOne(newMail);
    res.json({ Success: "Skickade mail." });
  }
  
  module.exports = {
    getMails,
    getMail,
    addMail,
    
  };
  