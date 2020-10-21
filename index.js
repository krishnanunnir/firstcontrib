const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const router = require('./routes/home');
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));   // directory that serves additional scss
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.listen(process.env.PORT,() => {
    console.log(`Listening on port ${process.env.PORT}`);
});