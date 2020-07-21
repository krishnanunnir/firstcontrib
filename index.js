const express = require("express");
const app = express();
const router = require('./routes/home');
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.listen(3000);