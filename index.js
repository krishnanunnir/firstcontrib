const helper = require("./helper");
const fetch = require("node-fetch");

const { returnRepoName } = require("./helper");
let apiUrl = "https://api.github.com";
let userName = "krishnanunnir"
let starsUrl = apiUrl + "/users/" + userName +"/starred";

repos = []
fetch(starsUrl).then((result) =>{
    return result.json();
}).then((result)=>{
    repos =  returnRepoName(result);
    console.log(repos);
});

