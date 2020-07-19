const fetch = require("node-fetch");
const { returnRepoName, returnRepoIssue } = require("./helper");

let apiUrl = "https://api.github.com";
let userName = "krishnanunnir"
let authToken = "token <token>"
let starredRepoUrl = apiUrl + "/users/" + userName +"/starred";

function getStarredRepo(starsUrl){
    const myHeaders = new fetch.Headers({
        'Authorization': authToken
    });
    const myRequest = new fetch.Request(starsUrl, {
        headers: myHeaders,
    });
    fetch(myRequest).
    then((result) =>{
        return result.json();
    }).then((result)=>{
        repos =  returnRepoName(result);
        repos.forEach(element => {
            urlIssues = apiUrl+"/repos/"+element+"/issues";
            fetchIssues(urlIssues);
        });
    })
    .catch((error)=>{
        console.log(error);
    });
}



function fetchIssues(urlIssues){
    const myHeaders = new fetch.Headers({
        'Authorization': authToken,
        'Accept': 'application/vnd.github.v3+json',
        'state': 'open',
        'sorted': 'created',
    });
    const myRequest = new fetch.Request(urlIssues, {
        headers: myHeaders
    });
    fetch(myRequest)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        issues = returnRepoIssue(data);
        issues.forEach(element => {
            if(element){
                console.log(element["title"]);
                console.log(element["url"]);
            }

        });

    })
    .catch((error)=>{
        console.log(error);
    });
}

getStarredRepo(starredRepoUrl);