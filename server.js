const express = require("express");
var app = express();

const port = 4000;

app.listen(port, () => {
    console.log(`Servern kör på port ${port}`)
});