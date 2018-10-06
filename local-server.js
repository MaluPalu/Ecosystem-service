const http = require('http')
const port = 3000

// Our Lambda function fle is required
var app = require('./app.js');

const requestHandler = (request, response) => {
  
  var chunks = [];
  var body = '';
  request.on('data', function(data) {body += data;});
  request.on('end', function(){
    
    var context = {};
    var event = 
      {
        "resource": request.url,
        "path": request.url,
        "httpMethod": request.method,
        "headers": request.headers,
        "queryStringParameters": request.query,
        "pathParameters": {},
        "stageVariables": null,
        "requestContext": {},
        "body": body,
        "isBase64Encoded": false
      };
    // Call the Lambda function
    app.handler(event, context, function (err, result) {
      response.statusCode = result.statusCode;
      response.headers = result.headers;
      response.end(result.body);
    });  
  });
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
  console.log(`this is youre environment: ${process.env}`)
});

