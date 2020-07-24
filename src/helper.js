var md = require('markdown-it')({
    html:         true,      
    xhtmlOut:     false,      
    breaks:       false,      
    langPrefix:   'language-',
    linkify:      false,      
    typographer:  false,
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; }
  });

async function checkResponseStatus(response){
    if(response.message ){
        console.log(response);
        throw new Error("We couldn't locate the specified resource.");
    }else{
        return response;
    }
}

function returnRepoName(json){
    //Method to return the repo full name from the json
        try{
        const repoArray = json.map((repo)=>{
            return repo["full_name"];
        });
        return repoArray;
    }catch(error){
        console.log(json);
        throw new Error(error);
    }
}

function returnRepoIssue(json, timeBack){
    //Method to return the repo full name from the json
    // console.log(Number(timeBack)*86400000);
    try{
        const repoArray = json.reduce((filtered, issue)=>{
            createdDate = new Date(issue['created_at']);
            var lastHour = new Date( Date.now() - Number(timeBack)*86400000 )
            if(createdDate > lastHour ){
                filtered.push({
                    'title':issue["title"],
                    'description':md.render(issue["body"]),
                    'url': issue["html_url"]
                });
            }
            return filtered;
        },[]);
        return repoArray;
    }catch(error){
        throw new Error(error);
    }
}

module.exports={
    returnRepoName: returnRepoName,
    returnRepoIssue: returnRepoIssue,
    checkResponseStatus: checkResponseStatus
}