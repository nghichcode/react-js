var firebaselg = require("firebase");
var firebconfig = require('./FirebaseConfig').config;

if (!firebaselg.apps.length) firebaselg.initializeApp(firebconfig);

var state={email:'nvc@gmail.com',password:'zzzzzzzz'};
var c=0;
firebaselg.auth().onAuthStateChanged(function(user) {
  console.log('==='+(c++)+'===');
});


firebaselg.auth().signInWithEmailAndPassword(state.email,state.password).then(function(u){
  console.log("Login successful!!!");
  var usUID=u.user.uid;
  firebaselg.database().ref("users/"+usUID+'/').update({time_node:new Date().getTime() });
  // Check first sign-up
  var dbp = firebaselg.database().ref('/users/'+usUID);
  dbp.on('value',function(snapshot) {
    if (snapshot.val()==null || snapshot.val().notifications==null) {
      var updates = {};updates['/users/'+usUID+'/notifications'] = {title:'FirstTime Login',body:'Thanks For SignUp',tag:'tgnew',seen:false};
      updates['/users/'+usUID+'/clien_time'] = new Date().getTime();
      firebaselg.database().ref().update(updates);
      return;
    }
    var notifyData = snapshot.val().notifications;
    if (notifyData.seen === true) {console.log("Seen");}
    else {
          setTimeout(function() {
            notifyData.seen=true;
            firebaselg.database().ref('/users/'+usUID+'/notifications').set(notifyData);
            console.log({"title":"Notification new: "+notifyData.title,"body":notifyData.body});
          },5000);
    }
  });

}).catch(function(error) {console.log(error.message);});