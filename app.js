const envVars = require('./config/env-vars');
const config = require('./config/appsettings').config[process.env.APP_CONFIG];

exports.handler = function (event, context, callback) {

    var responseBody = '';
    var requestedPath = event.path;
    switch (event.path.split('/')[0]) {
        case '':
            responseBody = getHomepageHTML();
            break;
        case 'animal':
            responseBody = getCountriesJsonRanked();
            break;
    }
    callback(null, {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {
            "Content-Type": "text/html"
        },
        "body": responseBody
    });
}

function getCountriesJsonRanked(userDefinedRank) {
    //Go get countries from DynamoDB
    //Apply ranking algo
    //Return json formatted list of ranked countries
    return {
    };
}

function getHomepageHTML(responseBody) {
    var fs = require('fs'),
    filename = "assets/index.html";

    var data = fs.readFileSync(filename).toString();
    
    //replace token with url
    data = data.replace('{{s3BaseUrl}}', config.spafiles_baseurl);
    return data;
}