const fetch = require("node-fetch");
const { returnRepoName, returnRepoIssue, returnCleanIssue } = require("./helper");

let apiUrl = "https://api.github.com";
let userName = "krishnanunnir"
let authToken = "token <token>"
let starredRepoUrl = apiUrl + "/users/" + userName +"/starred";

async function handle(starsUrl){
    const myHeaders = new fetch.Headers({
        'Authorization': authToken
    });
    const myRequest = new fetch.Request(starsUrl, {
        headers: myHeaders,
    });
    fetch(myRequest)
    .then((result) =>{
        return result.json();
    }).then(async (result)=>{
        let val = await getStarredRepo(result);
        console.log(returnCleanIssue(val));
    })
    .catch((error)=>{
        console.log(error);
    });
}


async function getStarredRepo(jsonData){
    repos = returnRepoName(jsonData);
    // console.log(repos);
    try{
        return await Promise.all(repos.map((repoVal)=> {
            urlIssues = apiUrl+"/repos/"+repoVal+"/issues";
            return fetchIssues(urlIssues)
            .then((data)=>{
                return (data);
            });
        }));
    } catch(err){
        throw new Error(err);
    }
}

async function fetchIssues(urlIssues){
    const myHeaders = new fetch.Headers({
        'Authorization': authToken,
        'Accept': 'application/vnd.github.v3+json',
        'assigned':'none',
        'state': 'open',
        'sorted': 'created',
    });
    const myRequest = new fetch.Request(urlIssues, {
        headers: myHeaders
    });
    return fetch(myRequest)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        let val = returnRepoIssue(data);
        // console.log(val);
        return val;
    })
    .catch((error)=>{
        throw new Error(error);
    });
}


handle(starredRepoUrl);
