var https = require('https');
var http = require('http');
var querystring = require('querystring');

var CronJob = require('./lib/cron').CronJob;
var job = new CronJob('20 20 20 * * 1-6', function() {
// var job = new CronJob('20 * * * * *', function() {
 //  console.log('You will see this message every minute');
	const date = new Date();
	console.log(date);
	var firebaselg = require("firebase");
	var firebconfig = require('./FirebaseConfig').config;
	if (!firebaselg.apps.length) firebaselg.initializeApp(firebconfig);
	firebaselg.database().ref("users/").once('value')
	.then(function(snapshot) {
	  const users = snapshot.val();
	  for ( key in users ) {
	    if ( users[key].eToken && !users[key].emailVerified ) {
	      var qs = {token:users[key].eToken,title:'EMAIL NOT VERIFY',body:'Please verify your email!'}
	      pushNotify(qs, function(rs,id){console.log({rs,id});} );
	    }
	  }
	});

}, null, true, 'Asia/Ho_Chi_Minh');

// token=ExponentPushToken[_vwrLCKMk5gKmaAUuVN3el]&title=Welcome&body=HelloT
http.createServer(function (req, res) {
	const aDay = 1000*(24*3600);
	const date = new Date();
	const now = 1552289074712;
	if (now === date.getTime()) {console.log("Now");}

	if (req.url.search("/push2expo") == 0 ) {
		body='';
    req.on('data', function(chunk) {body += chunk.toString();});
    req.on('end', function() {
			if (req.method === "POST" && body!="") {
				const qs = querystring.parse(body);
				if (qs.token && qs.title && qs.body) {
					console.log('pushNotify');
					pushNotify(qs, function(rs,id){info(rs,id);} );
				} else if(qs.time) {
					const date = new Date();
					console.log(date.getTime());info('Date','D');
				} else info("Error","qs.to && qs.title && qs.body");
	  	} else info("Error","Not POST || Body empty || Wrong Content-Type!");  	
    });
		return;
	} else { info("Error","GET"); }

	function info(stat, txt) {
		res.writeHead(200,{'Content-Type':'text/json; charset=utf-8'});
		res.write(JSON.stringify({status:stat, txt:txt}));
		res.end();
	}
}).listen(process.env.PORT || 5000);

function pushNotify(rdata, finalCall){
	const data = [{"to":rdata.token,"title":rdata.title, "body":rdata.body,"sound":"default"}];
	const options = {
	  host: 'expo.io',
	  port: 443,
	  path: '/--/api/v2/push/send',
	  method: 'POST',
	  headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
	  }
	};

	const req = https.request(options, (res) => {
	  // console.log(res.statusCode);
		var body = '';
	  res.on('data', function(chunk) {body += chunk.toString();});
	  res.on('end', function() {
			const jsonb = JSON.parse(body);
	  	finalCall(jsonb.data[0].status,jsonb.data[0].id);
	  });
	});

	req.on('error', function(error){console.error(error);})
	req.write( JSON.stringify(data) );
	req.end();
}
	// const data = [{
	// 	"to":"ExponentPushToken[_vwrLCKMk5gKmaAUuVN3el]",
	// 	"title":"Halio",
	// 	"body":"Lohia",
	// 	"sound":"default"
	// }];
