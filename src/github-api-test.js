const handleRepo = require("./github-api-graphql");

input = {};
input["username"] = "krishnanunnir";
input["time"] = "1";
async function test(){
    let val = await handleRepo(input);
    console.log(val);
}

test();