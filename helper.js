function returnRepoName(json){
    //Method to return the repo full name from the json
    const repoArray = json.map((repo)=>{
        return repo["full_name"];
    });
    return repoArray;
}

function returnRepoIssue(json, timeBack = 7*86400000){
    //Method to return the repo full name from the json
    const repoArray = json.reduce((filtered, issue)=>{
        createdDate = new Date(issue['created_at']);
        var lastHour = new Date( Date.now() - timeBack )
        if(createdDate > lastHour ){
            filtered.push({
                'title':issue["title"],
                'description':issue["body"],
                'url': issue["html_url"]
            });
        }
        return filtered;
    },[]);
    return repoArray;
}

function returnCleanIssue(json){
    const repoArray = json.reduce((filtered, issue)=>{
        if(issue && issue.length ){
            filtered.push(issue);
        }
        return filtered;
    });
    return repoArray.flat(); 
}
module.exports={
    returnRepoName: returnRepoName,
    returnRepoIssue: returnRepoIssue,
    returnCleanIssue: returnCleanIssue,
}