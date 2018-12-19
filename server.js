var http = require('http'),
      fs = require('fs'),
    port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
     url = require('url');

var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))


http.createServer(function(request, response){
    /* Z požadavku vytáhnout path, který jsem si v klientu označil 
    (může se to jmenovat jakkoliv), abych zde poznal, odkud 
    tento požadavek je a o co se žádá*/
    var path = url.parse(request.url).pathname;
    if(path=="/getstring"){
        fs.readFile('./file.json', function(err, file) {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(file, "utf-8");
        });
    }else{
        fs.readFile('./index.html', function(err, file) {  
            if(err) {  
                // write an error response or nothing here  
                return;  
            }  
            response.writeHead(200, { 'Content-Type': 'text/html' });  
            response.end(file, "utf-8");  
        });
    }
}).listen(port);
console.log("server initialized");
