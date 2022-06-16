const express = require("express");

const emailsController = require("../controllers/emails.controller");
const emailsRouter = express.Router();

emailsRouter.get("/mails", emailsController.getMails);
emailsRouter.get("/:id", emailsController.getMail);
emailsRouter.post("/mails", emailsController.addMail);

module.exports = emailsRouter;