var request = require('request');
var fs = require("fs");
var GITHUB_USER = "Travis-ko";
var GITHUB_TOKEN = "44d66c6708dd505da78db45e06a67d3926ca03e8";
var filePath = "avatars/";
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
getRepoContributors("jquery", "jquery", function(err, result) {
    var bodyObject = JSON.parse(result.body);
    bodyObject.forEach((item) => downloadImageByURL(item.avatar_url, filePath + item.login + ".jpg"));
});