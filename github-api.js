const fetch = require("node-fetch");
const { returnRepoName, returnRepoIssue, returnCleanIssue } = require("./helper");

let apiUrl = "https://api.github.com";
let authToken = "token <token>"


async function handleStarUrl(userInput){
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
            let val = await getStarredRepos(result);
            return returnCleanIssue(val);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
}


async function getStarredRepos(jsonData){
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
        console.log(error);
    });
}


module.exports = handleStarUrl;