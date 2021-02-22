const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

let apiUrl = "https://api.github.com/graphql";
let authToken = `Bearer ${process.env.TOKEN}`
issuePagination = {
    "1": 50,
    "7" : 30,
    "30": 20,
    "365": 10
}

beginner_issues = ["good first issue","beginner friendly","first-timers-only","good-first-issue","first timers only"];

query = `
query IssueDetails($timeBack: String!,$username: String!,$paginate: Int) {
    user(login: $username) {
      login
      starredRepositories {
        edges {
          node {
            issues(last: $paginate, filterBy: {states: [OPEN], since: $timeBack},orderBy:{direction:DESC, field:CREATED_AT}) {
              edges {
                node {
                  title
                  createdAt
                  bodyHTML
                  url
                  repository {
                    nameWithOwner
                  }
                  labels(last: 10) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }  
`;

function handleRepo(userInput){
    let username = userInput["username"];
    let time = userInput["time"];
    let beginnerfriendly = (userInput["beginnerfriendly"]==1)?true:false;
    var timeBack = new Date(Date.now() - 86400000*Number(time));
    const variables = {
        "timeBack": `${timeBack.toISOString()}`,
        "username": `${username}`,
        "paginate": issuePagination[time]
    }
    return fetch(apiUrl,{
        'method': "POST",
        'body': JSON.stringify({query, variables}),
        headers:{
            'Authorization': authToken
        }
    })
    .then((result) =>{
        return result.json();
    }).then((jsonData)=>{
        let repos = jsonData["data"]["user"]["starredRepositories"]["edges"];
        issuesList = []
        for(const repoNode of repos){
            let issues = repoNode["node"]["issues"]["edges"];
            for(const issueNode of issues)
            {
                let issue = issueNode["node"];
                let labels = issue["labels"]["edges"];
                let labelStatus = false;
                for(const label of labels){
                    if(beginner_issues.includes(label["node"]["name"])){
                        labelStatus = true;
                        break;
                    }
                }
                let createdAt = new Date(issue["createdAt"]);
                if(createdAt>timeBack){
                    let val = {
                        "title": issue["title"],
                        "description": issue["bodyHTML"],
                        "url": issue["url"],
                        "repository": issue["repository"]["nameWithOwner"],
                        "beginnerfriendly": labelStatus,
                        "createdAt": issue["createdAt"]
                    };
                    if(labelStatus && beginnerfriendly){
                      issuesList.push(val);
                    }
                    if(!beginnerfriendly){
                      issuesList.push(val);
                    }
                }
            }
        }
        return issuesList;
    })
    .catch((error)=>{
        throw(error);
    });
}

module.exports = handleRepo;