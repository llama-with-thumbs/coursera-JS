var http = require('http');

// var server = new http.Server();

// server.on('request', function(req, res){
//     console.info(req.method);
//     console.log(req.url);
//     res.write('hello!');
//     res.end();
// });

// server.listen(8080);

// var req = http.request({
//     hostname: 'localhost',
//     port: 8080
// });

// req.on('response', function(response) {
//     var body = '***';

//     response.on('data', function (chunk) {
//         body += chunk;
//     });
//     response.on('end', function () {
//         console.info(body, );
//     });
// });

// req.end();
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('log', console.info);
emitter.emit('log', 'Hello!');

emitter.emit('unknown event');
emitter.emit('error'); 

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB44xgQx41KunwVpWno-WCaRzqJi7HvevA&callback=initMap"
type="text/javascript"></script> 