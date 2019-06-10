import React, { Component } from 'react';
import firebconfig from './FireBaseConfig'
import * as firebaselg from 'firebase'
import ForgotPassword from './ForgotPassword'
import {StyleSheet, TextInput, View, Text, Alert, TouchableHighlight, Modal,TouchableOpacity } from 'react-native';
import {Permissions,Notifications} from 'expo'

export default class Login extends React.Component{
    constructor(props) {
      super(props);
      if (!firebaselg.apps.length) firebaselg.initializeApp(firebconfig);
     // this.state={email:'nvc@gmail.com',password:'',c:0};
        this.state={
            email:'',password:'',load:"Login",showForgotPass: false,
        };
    }

    btnForgotPassword(){
        this.setState({showForgotPass: true});
    }
	
    HandleForgotPass(success) {
        this.setState({showForgotPass: false});
        console.log("success >> "+success);
    }

    LoginNow(){
    firebaselg.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(u){
      console.log("Login successful!!!");
      var regForPush = async (udata)=>{
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;console.log("C1");
        if (existingStatus !== 'granted') {console.log("C2");
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);finalStatus = status;
        }
        console.log("C3");
        if (finalStatus!=='granted' && finalStatus!=='undetermined') {console.log(finalStatus);return;}
        console.log("C5");let token = await Notifications.getExpoPushTokenAsync();console.log("C6");console.log(token);

        var dbp = firebaselg.database().ref("users/"+udata.user.uid+'/').update({eToken:token,time_native:new Date().getTime() });
      }
      regForPush(u);
    }).catch(function(error) {console.log(error.message);});
  }
  
  static navigationOptions = {title:'Login',header:null};
  render() {
    const {navigate} = this.props.navigation;
    return (   
		<View style={{flex:1}} >
			<View style={{flex:4, backgroundColor:'#0099FF'}}>
				<Text style={styles.login}>Login</Text>
			</View>
			<View style={styles.container}>
				<Text style={{paddingLeft:110,fontSize:20,paddingBottom:30,paddingTop:30, color:'red'}}>BBC warehouse</Text>
				<View style={{paddingLeft:50}}>
					<View>
						<Text style={styles.view1}>Email</Text>
						<TextInput style={styles.view2} placeholder='Your email address'
							placeholderTextColor='#ddd'
							onChangeText={(username) => this.setState({username})}/>
					</View>
					<View>
						<Text style={styles.view1}>Password</Text>
						<TextInput style={styles.view2} placeholder='Password'
						  placeholderTextColor='#ddd' secureTextEntry={true}
						  onChangeText={(password) => this.setState({password})}/>
					</View>
					<View style={{marginBottom:10}}>
              <TouchableOpacity onPress={this.btnForgotPassword.bind(this)}>
                <Text style={styles.forgot}>FORGOT PASSWORD</Text>
              </TouchableOpacity>
              <Modal transparent={true} visible={this.state.showForgotPass} onRequestClose={() => {this.setState({showForgotPass: false});}}>
                <ForgotPassword HandleForgotPass={this.HandleForgotPass.bind(this)} />
              </Modal>
					</View>
				</View>
				<View style={{marginLeft:50,marginTop:20, backgroundColor:"#33FF66",marginRight:50, borderRadius:20}}>
					<TouchableHighlight onPress={() => navigate('Account')}>
						<Text style={styles.load}>{this.state.load}</Text>
					</TouchableHighlight>
				</View>
        <View>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text style={styles.signup}>Have account? Go to Register</Text>
            </TouchableOpacity>
        </View>
			</View>
		</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 8,flexDirection:'column'},
  view1: {width:'30%',height:25,marginRight:10,color:'#555555'},
  view2: {borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'82%',marginBottom:20},
  login: {bottom:20,position:'absolute', color:'#fff', fontSize:20, paddingLeft:30,fontWeight:'bold'},
  forgot: {paddingLeft:120,color:'#0099FF',fontWeight:'bold'},
  load: {paddingTop:10, paddingBottom:10,paddingLeft:110,color:'#fff',fontWeight:'bold'},
  signup: {paddingLeft:90, paddingTop: 20, color:'#0099FF',fontWeight:'bold'}
});