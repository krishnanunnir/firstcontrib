function returnRepoName(json){
    //Method to return the repo full name from the json
    const repoArray = json.map((repo)=>{
        return repo["full_name"];
    });
    return repoArray;
}

module.exports={
    returnRepoName: returnRepoName
}