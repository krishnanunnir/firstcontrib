const express = require("express");
const path = require("path");
const routes = express.Router();
const githubHandle = require("../github-api");

routes.get('/',(req,res,next)=>{
    res.render(path.join(__dirname,'..','views','index.ejs'));
});

routes.post('/',async(req,res,next)=>{
    let val = await githubHandle(req.body)
    res.send(val);
});

module.exports = routes;