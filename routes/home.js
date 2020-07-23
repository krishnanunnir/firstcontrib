const express = require("express");
const path = require("path");
const routes = express.Router();
const githubHandle = require("../src/github-api");

routes.get('/',(req,res,next)=>{
    res.render(path.join(__dirname,'..','views','index.ejs'),{repoIssues:[],error:""});
});

routes.post('/',async(req,res,next)=>{
    let issues = [];
    try{
        repoIssues = await githubHandle(req.body)
        res.render(path.join(__dirname,'..','views','index.ejs'),{repoIssues:repoIssues,error:""});
    }
    catch(error)
    {
        console.log(error.message);
        res.render(path.join(__dirname,'..','views','index.ejs'),{repoIssues:[],error:error.message});
    }
});

module.exports = routes;