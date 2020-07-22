var md = require('markdown-it')({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    linkify:      false,        // Autoconvert URL-like text to links
   
    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,
   
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
   
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (/*str, lang*/) { return ''; }
  });
function returnRepoName(json){
    //Method to return the repo full name from the json
    const repoArray = json.map((repo)=>{
        return repo["full_name"];
    });
    return repoArray;
}

function returnRepoIssue(json, timeBack = 86400000){
    //Method to return the repo full name from the json
    const repoArray = json.reduce((filtered, issue)=>{
        createdDate = new Date(issue['created_at']);
        var lastHour = new Date( Date.now() - timeBack )
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