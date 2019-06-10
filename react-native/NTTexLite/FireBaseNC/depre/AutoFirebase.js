var https = require('https');
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