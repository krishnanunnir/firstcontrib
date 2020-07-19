const fetch = require("node-fetch");
const { returnRepoName, returnRepoIssue } = require("./helper");

let apiUrl = "https://api.github.com";
let userName = "krishnanunnir"
let authToken = "token <token>"
let starsUrl = apiUrl + "/users/" + userName +"/starred";
var lastHour = new Date( Date.now() - 3600000 ).toISOString();
const myHeaders = new fetch.Headers({
    'Authorization': authToken
});
const myRequest = new fetch.Request(starsUrl, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
});
fetch(myRequest).
then((result) =>{
    return result.json();
}).then((result)=>{
    repos =  returnRepoName(result);
    repos.forEach(element => {
        urlIssues = apiUrl+"/repos/"+element+"/issues";
        fetchIssues(urlIssues, lastHour);
    });
})
.catch((error)=>{
    console.log(error);
});


function fetchIssues(urlIssues, timeSince){
    const myHeaders = new fetch.Headers({
        'Authorization': authToken,
        'Accept': 'application/vnd.github.v3+json',
        'state': 'open',
        'sorted': 'created',
        'since': timeSince
    });
    const myRequest = new fetch.Request(urlIssues, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
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