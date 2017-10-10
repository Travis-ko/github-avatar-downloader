var request = require('request');
var fs = require("fs");
var GITHUB_USER = "Travis-ko";
var GITHUB_TOKEN = "44d66c6708dd505da78db45e06a67d3926ca03e8";
var filePath = "avatars/";
var owner = process.argv[2];
var repo = process.argv[3];


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
function downloadImageByURL(url, filePath) {
    request.get(url)
        .pipe(fs.createWriteStream(filePath));
}
getRepoContributors(owner, repo, function(err, result) {
  if (typeof repo !== 'string'){
    console.log("Error: please input valid owner and repo");
  }
  else{
    var bodyObject = JSON.parse(result.body);
    bodyObject.forEach((item) => downloadImageByURL(item.avatar_url, filePath + item.login + ".jpg"));
  }
});