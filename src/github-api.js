const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const { returnRepoName, returnRepoIssue, checkResponseStatus } = require("./helper");
let apiUrl = "https://api.github.com";
let authToken = `token ${process.env.TOKEN}`


async function handleUserInput(userInput){
    let username = userInput["username"];
    let time = userInput["time"];
    let repo = userInput["repo"];
    let userStarUrl = apiUrl + "/users/" + username +"/starred";
    if (repo){
        let urlIssues = apiUrl+"/repos/"+repo+"/issues";
        let returndata = await fetchIssues(urlIssues);
        return returndata;

    }else{
        const myHeaders = new fetch.Headers({
            'Authorization': authToken
        });
        const myRequest = new fetch.Request(userStarUrl, {
            headers: myHeaders,
        });
        return fetch(myRequest)
        .then((result) =>{
            return result.json();
        }).then(async (result)=>{
            return checkResponseStatus(result)
            .then(async (resultData)=>{
                let val = await getStarredRepos(resultData);
                return val.filter(val => Object.keys(val).length !== 0);
            }).catch((error)=>{
                throw(error);
            });
        })
        .catch((error)=>{
            console.log(error);
            throw(error);
        });
    }
}


async function getStarredRepos(jsonData){
    repos = returnRepoName(jsonData);
    // console.log(repos);
    try{
        return await Promise.all(repos.flatMap(async (repoVal)=> {
            urlIssues = apiUrl+"/repos/"+repoVal+"/issues";
            let repoIssues = await fetchIssues(urlIssues);
            if (repoIssues && repoIssues.length){
                return {
                    repo: repoVal,
                    issues: repoIssues
                }
            }else{
                return {};
            }
        }));
    } catch(error){
        console.log(val);
        throw(error);
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
        return val;
    })
    .catch((error)=>{
        console.log(val);
        throw(error);
    });
}


module.exports = handleUserInput;