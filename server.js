const express = require("express");
const bodyParser = require("body-parser");

const port = 4000;
const app = express();

const emailsRouter = require("./routes/emails.router");

app.use(bodyParser.json());

app.use(emailsRouter);

app.listen(port, () => {
    console.log(`Servern kör på port ${port}`)
});