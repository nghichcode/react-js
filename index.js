var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	console.log('./public'+req.url);
	if (req.url === '/' ) { warn('Hello'); }
	else if (req.url.search('.') >= 0 ) {
		fs.readFile('./public'+req.url, function (err, data) {
			if (err) {warn("Not Found 1!");return;}
	    	res.writeHead(200);res.write(data);res.end();
		});
	}

	function warn(txt) { res.writeHead(200,{'Content-Type':'text/json; charset=utf-8'});res.write(JSON.stringify({txt:txt}));res.end(); }
}).listen(process.env.PORT || 5000);