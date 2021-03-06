function showBlock(id){
  var ids = ['sign-in','info','sign-up','update-form'];
  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).style.display= (ids[i]!=id?"none":"block");
  }
}

(function(){
  var config = {
    apiKey:"AIzaSyCq0wEv3GcmSnP4xcX5bid0Hfj1NaoJ6c0",
    authDomain:"demonew-5d12e.firebaseapp.com",
    databaseURL:"https://demonew-5d12e.firebaseio.com",
    projectId:"demonew-5d12e",
    storageBucket:"demonew-5d12e.appspot.com",
    messagingSenderId:"103020261494"
  };
  firebase.initializeApp(config);
 
  firebase.auth().onAuthStateChanged(function(user) { console.log('call-me');
    if (user) {
      var user = firebase.auth().currentUser;
      if (user.emailVerified) {var btnSend=document.getElementById('btnSend');btnSend.setAttribute('disabled','');btnSend.innerHTML="emailVerified";}
      showBlock('info'); // User is signed in.

      var time = new Date().getTime();
      if(user!=null && user.displayName!=null && user.photoURL!=null){
        document.getElementById('user-para').innerHTML ="Email:"+user.email
         +"<br>ID:"+user.uid+"<br>Name:"+user.displayName+"<br>PhotoUrl:"+user.photoURL+"<br>Time:"+time+"ms";
      } else if(user.displayName==null && user.photoURL==null) {
        document.getElementById('user-para').innerHTML ="Email:"+user.email
         +"<br>ID:"+user.uid+"<br>Name:"+document.getElementById('txtUser').value+"<br>Time:"+time+"ms";
      }

      var dbp = firebase.database().ref(user.uid+'/notifications');
      dbp.on('value', function(snapshot) {
        if (snapshot.val()==null) {
          var updates = {};updates['/'+user.uid+'/notifications'] = {title:'Hello', body:'Thanks For SignUp', tag:'tgnew', seen:false,time:new Date().getTime()};
          var ref = firebase.database().ref().update(updates);
          return;
        }
        var tmpsnap = snapshot.val();
        if (snapshot.val().seen === true) {console.log("Seen");} else {

          if(Notification.permission!=='granted'){
            Notification.requestPermission(function(permission) {
              if (permission==='granted') {var notify=new Notification("Thanks",{'body':"Granted",'icon':'nin.png','tag':"helio"});}
              else {console.log(":::::");}
            })
          } else {
              setTimeout(function() {
                var notify=new Notification("Helio : "+tmpsnap.title,{'body':tmpsnap.body,'icon':'nin.png','tag':tmpsnap.tag});
                notify.onclick=function(){alert(this.tag);};
                notify.onshow=function(){
                  tmpsnap.seen=true;tmpsnap.time=new Date().getTime();console.log(tmpsnap);
                  firebase.database().ref('/'+user.uid+'/notifications').set(tmpsnap);
                };
              },5000);
          }

        }
      });
    } else { showBlock('sign-in'); } // No user is signed in.
  });
  //Get element
  var btnSignUp = document.getElementById('btnSignUp');
  var btnLogin = document.getElementById('btnLogin');
  var btnLogout = document.getElementById('btnLogout');
  var btnUpdate = document.getElementById('btnUpdate');
  var btnSend = document.getElementById('btnSend');
  var btnRemove = document.getElementById('btnRemove');
  var btnPush = document.getElementById('btnPush');

  btnSignUp.addEventListener('click', e=>{
    var email = document.getElementById('txtEmail2').value;
    var password = document.getElementById('txtPass2').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(u){
      var user_data = firebase.database().ref('users/').update({ u.user.uid:{clien_time:new Date().getTime()} });
      console.log("SignUp successful!!!");
    }).catch(function(error) {console.log(error.message);});
  });
  btnLogin.addEventListener('click', e=>{
    var email = document.getElementById('txtEmail1').value;
    var password = document.getElementById('txtPass1').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(u){
      var user_data = firebase.database().ref(u.user.uid+'/').update({clien_time:new Date().getTime()});
      console.log("Login successful!!!");
    }).catch(function(error) {console.log(error.message);});
  });
  btnSend.addEventListener('click', e=>{
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function(){
      console.log("Send successful!!!");
    }).catch(function(error){console.log(error.message);});
  });
  btnUpdate.addEventListener('click', e=>{
    var user = firebase.auth().currentUser;
    console.log({displayName:document.getElementById('txtName').value,photoURL:document.getElementById('txtPhoto').value});
    user.updateProfile({
      displayName:document.getElementById('txtName').value,
      photoURL:document.getElementById('txtPhoto').value
    }).then(function() {
      showBlock('info');
    }).catch(function(error) {console.log('ErrrUp');});
  });
  btnRemove.addEventListener('click', e=>{
    console.log('Do you want remove account?');
    var user = firebase.auth().currentUser;
    user.delete().then(function() { console.log("Delete successful!!!"); }).catch(function(error) {console.log('ErrrDel');});
  });
  btnLogout.addEventListener('click', e=>{
    firebase.auth().signOut().then(function(){window.location.reload();});
  });
  btnPush.addEventListener('click', function(e){
    console.log("PP");
    var ntf = new Notification("Thanks",{'body':'Granted','icon':'nin.png','tag':'helio'});
    ntf.onclick = function(){console.log("btnPush "+this.tag);};
  });
}());