const path = require('path');
const express = require('express');

const app = express();
const port = 5555;
// CODE
const fs = require('fs');
// CODE

app.use('/',express.static( path.join(__dirname,'public') ))

app.get('/',function(req,res) {
	res.send("Hihihi");
});

app.get('/ofolds',function(req,res) {
	var new_files = fs.readdirSync('./public/compare-image/F_OLD/');
	res.type('application/json');
	res.send(JSON.stringify(new_files) );
});
app.get('/nfolds',function(req,res) {
	var new_files = fs.readdirSync('./public/compare-image/F_NEW/');
	res.type('application/json');
	res.send(JSON.stringify(new_files) );
});
app.get('/oimgs/:path',function(req,res) {
	var old_files = fs.readdirSync('./public/compare-image/F_OLD/'+req.params['path']);
	res.type('application/json');
	res.send(JSON.stringify(old_files) );
});
app.get('/nimgs/:path',function(req,res) {
	var new_files = fs.readdirSync('./public/compare-image/F_NEW/'+req.params['path']);
	res.type('application/json');
	res.send(JSON.stringify(new_files) );
});

app.listen(port, function() {console.log("Running... Port: "+port);});