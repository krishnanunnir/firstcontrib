const express = require("express");
const path = require("path");
const routes = express.Router();
const githubHandle = require("../src/github-api-graphql");

routes.get('/',(req,res,next)=>{
    res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[],error:"",userInput:{}});
});

routes.get('/instance',async(req,res,next)=>{
    userInput  = {};
    userInput["username"] = req.query.username;
    userInput["time"] = req.query.time;
    userInput["beginnerfriendly"] = req.query.beginnerfriendly;
    try{
        repoIssues = await githubHandle(userInput)
        if(repoIssues && repoIssues.length){
            res.render(path.join(__dirname,'..','views','index.ejs'),{issues:repoIssues,error:"",userInput:userInput});
        }else{
            res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[],error:"Sorry! We couldn't find any issues. Try searching longer back.",userInput:userInput});
        }
    }
    catch(error)
    {
        res.render(path.join(__dirname,'..','views','index.ejs'),{issues:[],error:"We couldn't find what you were searching for, please make sure you have starred repos."});
    }
});

module.exports = routes;