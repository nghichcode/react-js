var ws=new WebSocket('ws://dev.intra.nttdata.com.vn:3000/sockjs/888/hw1pk7zo/websocket');
ws.addEventListener('open',function(event) {console.log('Open',event.data);});
ws.addEventListener('message',function(event){console.log('Message', event.data);});
ws.send('["{"msg":"pong"}"]');
ws.send('["{"msg":"ping"}"]');
ws.send('[{"msg":"method","method":"UserPresence:online","params":[null],"id":"13"}]');
ws.send('["{"msg":"connect","version":"1","support":["1","pre2","pre1"]}"]');

var cfs=function(dtz) {
	var rdata='';try {rdata=JSON.parse(JSON.parse(dtz.slice(1))[0]);} catch(e){}
	if (rdata!="" && rdata.msg=="changed" && rdata.fields.eventName) {
		if (rdata.fields.eventName.search("notification")>=0) {
			var txt=rdata.fields.args[0].text;var title=rdata.fields.args[0].payload.sender.name;
			console.error(txt,title);
			if(Notification.permission!=='granted'){
				Notification.requestPermission(function(permission) {
				  if (permission==='granted') {var notify=new Notification("Thanks",{'body':"Granted",'icon':'assets/touchicon_180.png','tag':'rocket'});}
				  else {console.log(":::::");}// Forbird grant
				});
			} else {// Notification grant
			  var notify=new Notification("Notification Grant : "+title,{'body':txt,'icon':'assets/touchicon_180.png','tag':'rocket'});
			  var fc=function(e) {console.log(e,'z');}
			  notify.onclick=fc;
			  notify.onshow=fc;
			}
		} else {console.log(1,rdata.fields);}
	} else if (rdata.msg) {console.log(2,rdata);}
}
var oms=Meteor.connection._stream.socket._transport.ws.onmessage;
Meteor.connection._stream.socket._transport.ws.onmessage=(function(e){oms.bind(this);oms(e);cfs(e.data);});



JSON.parse(amz.slice(3,amz.length-2))
JSON.parse(amz.slice(3,amz.length-2)).fields.args[0].text

a["{\"msg\":\"changed\",\"collection\":\"stream-notify-user\",\"id\":\"id\",\"fields\":{\"eventName\":\"79nTjYmdHCfJoiynb/audioNotification\",\"args\":[{\"payload\":{\"_id\":\"cd7mHF8XAnQEJdqk7\",\"rid\":\"79nTjYmdHCfJoiynbZnJ6LmsBA8TaB26Zh\",\"sender\":{\"_id\":\"ZnJ6LmsBA8TaB26Zh\",\"username\":\"tincya98tc123456789\",\"name\":\"Tin Cya\"},\"type\":\"d\"}}]}}"]
a["{\"msg\":\"changed\",\"collection\":\"stream-notify-user\",\"id\":\"id\",\"fields\":{\"eventName\":\"79nTjYmdHCfJoiynb/notification\",\"args\":[{\"title\":\"@tincya98tc123456789\",\"text\":\"limk\",\"payload\":{\"_id\":\"cd7mHF8XAnQEJdqk7\",\"rid\":\"79nTjYmdHCfJoiynbZnJ6LmsBA8TaB26Zh\",\"sender\":{\"_id\":\"ZnJ6LmsBA8TaB26Zh\",\"username\":\"tincya98tc123456789\",\"name\":\"Tin Cya\"},\"type\":\"d\",\"message\":{\"msg\":\"limk\"}}}]}}"]
a["{\"msg\":\"changed\",\"collection\":\"stream-notify-user\",\"id\":\"id\",\"fields\":{\"eventName\":\"79nTjYmdHCfJoiynb/rooms-changed\",\"args\":[\"updated\",{\"_id\":\"79nTjYmdHCfJoiynbZnJ6LmsBA8TaB26Zh\",\"_updatedAt\":{\"$date\":1560823440701},\"t\":\"d\",\"lastMessage\":{\"_id\":\"cd7mHF8XAnQEJdqk7\",\"rid\":\"79nTjYmdHCfJoiynbZnJ6LmsBA8TaB26Zh\",\"msg\":\"limk\",\"ts\":{\"$date\":1560823440617},\"u\":{\"_id\":\"ZnJ6LmsBA8TaB26Zh\",\"username\":\"tincya98tc123456789\",\"name\":\"Tin Cya\"},\"_updatedAt\":{\"$date\":1560823440669},\"mentions\":[],\"channels\":[]}}]}}"]
a["{\"msg\":\"changed\",\"collection\":\"stream-notify-user\",\"id\":\"id\",\"fields\":{\"eventName\":\"79nTjYmdHCfJoiynb/subscriptions-changed\",\"args\":[\"updated\",{\"_id\":\"3PrHr9BveN9Cve2gw\",\"rid\":\"79nTjYmdHCfJoiynbZnJ6LmsBA8TaB26Zh\",\"u\":{\"_id\":\"79nTjYmdHCfJoiynb\",\"username\":\"diennv\"},\"fname\":\"Tin Cya\",\"name\":\"tin.cya\",\"t\":\"d\",\"open\":true,\"alert\":true,\"unread\":6,\"userMentions\":0,\"groupMentions\":0,\"ts\":{\"$date\":1560759264145},\"_updatedAt\":{\"$date\":1560823440716},\"ls\":{\"$date\":1560822436665}}]}}"]

var ad={fd:function(e){console.log('f',e);}, cd:5}
var ms=ad.fd;
ad.fd=function(e){ms(e); console.log(55);}
