import React,{ Component } from 'react';
import firebconfig from './FirebaseConfig';
import * as firebaselg from 'firebase';
import {StyleSheet,TextInput,View,Text,Alert,Modal,TouchableOpacity } from 'react-native';
import ForgotPassword from './ForgotPassword';
import { Permissions,Notifications } from 'expo';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    if (!firebaselg.apps.length) firebaselg.initializeApp(firebconfig);
    this.state={email:'nvc@gmail.com',password:'',load:"Login",showForgotPass: false,c:0};
    var that = this;
    firebaselg.auth().onAuthStateChanged(function(user) {
      console.log('call-meS');console.log("--"+that.state.c+"--");console.log('call-meE');that.setState({c:that.state.c+1});
    });
  }

  LoginNow() {
    var self = this;
    // const userData= {
    //   uid:'u.user.uid',
    //   email:'u.user.email',emailVerified:false,
    //   displayName:'u.user.displayName',photoURL:'u.user.photoURL',
    //   lastLogin:'u.user.metadata.lastSignInTime',
    //   creationTime:'u.user.metadata.creationTime',
    //   auth:firebaselg.auth()
    // }
    // self.props.navigation.navigate('Profile',{userData});return;
    firebaselg.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(function(u){
      // uid,creationTime,email,emailVerified,displayName,photoURL,lastLogin
      const userData= {
        uid:u.user.uid,
        email:u.user.email,emailVerified:u.user.emailVerified,
        displayName:u.user.displayName,photoURL:u.user.photoURL,
        lastLogin:u.user.metadata.lastSignInTime,
        creationTime:u.user.metadata.creationTime,
        auth:firebaselg.auth()
      }

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
      var usUID=u.user.uid;
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
                Notifications.scheduleLocalNotificationAsync({"title":"Notification new: "+notifyData.title,"body":notifyData.body});
              },5000);
        }
      });
      self.props.navigation.navigate('Profile',{userData});
    }).catch(function(error) {console.log(error.message);Alert.alert('Error!');});
  }

  HandleForgotPass(success) {
      this.setState({showForgotPass: false});
      console.log("success >> "+success);
  }

  static navigationOptions = {title:'Login',header:null};
  render() {
    const {navigate} = this.props.navigation;
    return (
    <View style={{flex:1}} >
      <View style={{flex:3, backgroundColor:'#0099FF'}}>
        <Text style={styles.login}>Login</Text>
      </View>
      <View style={{flex: 9,flexDirection:'column'}}>
        <Text style={{paddingLeft:110,fontSize:20,paddingBottom:30,paddingTop:30, color:'red'}}>BBC warehouse</Text>
        <View style={{marginHorizontal:'10%'}}>
          <Text style={styles.ftitle}>Email</Text>
          <TextInput style={styles.fbody} placeholder='Your email address' placeholderTextColor='#6f6f6f'
            defaultValue={this.state.email}
            onChangeText={(email) => this.setState({email})}/>
          <Text style={styles.ftitle}>Password</Text>
          <TextInput style={styles.fbody} placeholder='Password' placeholderTextColor='#6f6f6f' secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}/>
          <TouchableOpacity onPress={()=>{this.setState({showForgotPass: true});}}>
            <Text style={styles.forgot}>FORGOT PASSWORD</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={this.state.showForgotPass}
            onRequestClose={() => {this.setState({showForgotPass: false});}}>
            <ForgotPassword HandleForgotPass={this.HandleForgotPass.bind(this)} />
          </Modal>
        </View>
        <TouchableOpacity
          style={{marginLeft:50,marginTop:20, backgroundColor:"#33FF66",marginRight:50, borderRadius:20}}
          onPress={()=>this.LoginNow()}>
          <Text style={styles.load}>{this.state.load}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Register')} style={{paddingTop: 20}}>
          <Text style={{marginHorizontal:'20%',color:'#0099FF',fontWeight:'bold'}}>Have account? Go to Register</Text>
        </TouchableOpacity>
      </View>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  ftitle: {width:'30%',height:25,marginRight:10,color:'#555555',fontWeight:'bold'},
  fbody: {paddingVertical: 5,borderBottomWidth:1,borderColor:'#196DF9',height:25,marginBottom:20},
  login: {bottom:20,position:'absolute', color:'#fff', fontSize:20, paddingLeft:30,fontWeight:'bold'},
  forgot: {color:'#0099FF',textAlign:'right',fontWeight:'bold'},
  load: {paddingVertical:10,marginHorizontal:'40%',color:'#fff',fontWeight:'bold'},
});