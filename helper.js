function returnRepoName(json){
    //Method to return the repo full name from the json
    const repoArray = json.map((repo)=>{
        return repo["full_name"];
    });
    return repoArray;
}

function returnRepoIssue(json){
    //Method to return the repo full name from the json

    const repoArray = json.map((issue)=>{
        createdDate = new Date(issue['created_at']);
        var lastHour = new Date( Date.now() - 86400000 )
        if(createdDate > lastHour ){
            return {
                'title':issue["title"],
                'description':issue["body"],
                'url': issue["html_url"]
            };
        }else{
            return null;
        }
    });
    return repoArray;
}

module.exports={
    returnRepoName: returnRepoName,
    returnRepoIssue: returnRepoIssue
}