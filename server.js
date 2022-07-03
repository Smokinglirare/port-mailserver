const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

//const port = 4000;
const app = express();

const emailsRouter = require("./routes/emails.router");

app.use(cors());
app.use(bodyParser.json());

app.use(emailsRouter);

app.listen(`PORT`, () => {
    console.log(`Servern kör på PORT`)
});