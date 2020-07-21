const express = require("express");
const path = require("path");
const routes = express.Router();
const githubHandle = require("../github-api");

routes.get('/',(req,res,next)=>{
    res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[]});
});

routes.post('/',async(req,res,next)=>{
    let issues = await githubHandle(req.body)
    res.render(path.join(__dirname,'..','views','index.ejs'),{issues:issues});
});

module.exports = routes;