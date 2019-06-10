import React, { Component } from 'react';
import firebconfig from './FirebaseConfig';
import * as firebaselg from 'firebase';
import {StyleSheet, TextInput, View, Text, Button, Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    if (!firebaselg.apps.length) firebaselg.initializeApp(firebconfig);
    this.state={email:'nvc@gmail.com',password:'',c:0};
    var that = this;
    firebaselg.auth().onAuthStateChanged(function(user) {
      console.log('call-meS');console.log("--"+that.state.c+"--");console.log('call-meE');that.setState({c:that.state.c+1});
    });
  }

  LoginNow() {
    firebaselg.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(u){
      console.log("Login successful!!!");
      var regForPush = async (udata)=>{
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;console.log("C1");
        if (existingStatus !== 'granted') {console.log("C2");
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);finalStatus = status;
        }
        if (finalStatus!=='granted' && finalStatus!=='undetermined') {console.log("C2s"+finalStatus);return;}
        let token = await Notifications.getExpoPushTokenAsync();console.log(token);

        var dbp = await firebaselg.database().ref("users/"+udata.user.uid+'/').update({eToken:token,time_native:new Date().getTime() });
      }
      regForPush(u);
      // Check first sign-up
      var usUID=u.user.uid;
      var dbp = firebaselg.database().ref('/users/'+usUID);
      dbp.on('value', function(snapshot) {
        if (snapshot.val()==null || snapshot.val().notifications==null) {
          var updates = {};updates['/users/'+usUID+'/notifications'] = {title:'FirstTime Login', body:'Thanks For SignUp', tag:'tgnew', seen:false};
          updates['/users/'+usUID+'/clien_time'] = new Date().getTime();
          firebaselg.database().ref().update(updates);
          return;
        }
        var notifyData = snapshot.val().notifications;console.log(notifyData);
        if (notifyData.seen === true) {console.log("Seen");}
        else {
              setTimeout(function() {
                notifyData.seen=true;
                firebaselg.database().ref('/users/'+usUID+'/notifications').set(notifyData);
                Notifications.scheduleLocalNotificationAsync({"title":"Notification new: "+notifyData.title,"body":notifyData.body});
              },5000);
        }
      });

    }).catch(function(error) {console.log(error.message);});
  }

  render() {
    return (
    <View style={{flex:1}} >
      <View style={{flex: 1,justifyContent: 'center',flexDirection:'column'}}>
        <Text style={{paddingLeft:110,fontSize:20,paddingBottom:50, color:'red'}}>BBC warehouse</Text>
        <View>
          <View style={{display:'flex', flexDirection:'row'}}>
            <Text style={styles.view1}>Email</Text>
            <TextInput style={styles.view2} placeholder='Enter a email'
              placeholderTextColor='mediumseagreen' defaultValue='nvc@gmail.com'
              onChangeText={(email) => this.setState({email})}/>
          </View>
          <View style={{display:'flex', flexDirection:'row'}}>
            <Text style={styles.view1}>Password </Text>
            <TextInput style={styles.view2} placeholder='Enter a password'
              placeholderTextColor='mediumseagreen' secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}/>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:170,marginTop:20}}>
          <View style={{marginRight:20}}><Button title="Login" onPress={() => {this.LoginNow()}}/></View>
          <View><Button title="Cancel" onPress={() => {} }/></View>
        </View>
      </View>
      <View style={{bottom: 10,alignItems:'center'}}><Text style={{color:'#BF00BF'}}>Coppyright 2019</Text></View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  view1:{paddingLeft:20,width:'30%',height:25,marginRight:10,marginTop:5},
  view2:{borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'55%',marginBottom:30,paddingLeft:10}
});