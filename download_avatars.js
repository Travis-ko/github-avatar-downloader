var request = require('request');
var GITHUB_USER = "Travis-ko";
var GITHUB_TOKEN = "44d66c6708dd505da78db45e06a67d3926ca03e8";
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var requestOptions = {
        url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: {
            "User-Agent": "GitHub Avatar Downloader - Student Project"
        }
    };
    // Request for information from github
    request.get(requestOptions, cb);
}

getRepoContributors("jquery", "jquery", function(err, result) {
console.log("Errors:", err);
var resultObj = JSON.parse(result.body);
resultObj.forEach((item) => console.log(item.avatar_url))
});
// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });