const handleRepo = require("./github-api-graphql");

input = {};
input["username"] = "krishnanunnir";
input["time"] = "7";

console.log(handleRepo(input));