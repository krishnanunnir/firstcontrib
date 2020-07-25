const express = require("express");
const path = require("path");
const routes = express.Router();
const githubHandle = require("../src/github-api-graphql");

routes.get('/',(req,res,next)=>{
    res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[],error:""});
});

routes.post('/',async(req,res,next)=>{
    let issues = [];
    try{
        repoIssues = await githubHandle(req.body)
        if(repoIssues && repoIssues.length){
            res.render(path.join(__dirname,'..','views','index.ejs'),{issues:repoIssues,error:""});
        }else{
            res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[],error:"Sorry! We couldn't find any issues. Try searching longer back."});
        }
    }
    catch(error)
    {
        res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[],error:"We couldn't find what you were searching for"});
    }
});

module.exports = routes;