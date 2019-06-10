const path = require('path');
const express = require('express');

const app = express();
const port = 5000;

app.use('/',express.static( path.join(__dirname,'public') ))

app.get('/',function(req,res) {
	res.send("Hihihi");
});

app.listen(port, function() {console.log("Running... Port: "+port);});