import React from 'react';
import {StyleSheet, TextInput, View, Text, Alert, TouchableHighlight, Modal,TouchableOpacity } from 'react-native';
import ForgotPassword from './ForgotPassword'

export default class Login extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        username:'',password:'',res:'',load:"Login",
        showForgotPass: false,otherParamsToSend: 1,
        };
    }

    btnForgotPassword(){
        this.setState({showForgotPass: true});
    }
	
    HandleForgotPass(success) {
        this.setState({showForgotPass: false});
        console.log("success >> "+success);
    }
	
  DoLogin(){
		this.setState({load:"Loading..."});
		fetch("https://ncteamvn.herokuapp.com/oauth/token",{
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: "username="+this.state.username+"&password="+this.state.password+
            "&client_id=mobile&client_secret=mobile&grant_type=password"
		})
		.then((response) => response.json())
		.then((res) => {
			if(res.access_token != undefined){
              res.username = this.state.username;
              this.setState({load:"Login"});console.log(res);
			} else {Alert.alert(res.statusText);this.setState({load:"Login"});}
      }).catch((error) => {console.log(error);});
  }

  static navigationOptions = {title:'Login',header:null};
  render() {
    return (   
		<View style={{flex:1}} >
			<View style={{flex:4, backgroundColor:'#0099FF'}}>
				<Text style={styles.login}>Login</Text>
			</View>
			<View style={styles.container}>
				<Text style={{paddingLeft:110,fontSize:20,paddingBottom:30,paddingTop:30, color:'red'}}>BBC warehouse</Text>
				<View style={{paddingLeft:50}}>
					<View>
						<Text style={styles.view1}>Account</Text>
						<TextInput style={styles.inputText} placeholderTextColor='#ddd' placeholder='Your email address'
							onChangeText={(username) => this.setState({username})}/>
					</View>
					<View>
						<Text style={styles.view1}>Password</Text>
						<TextInput style={styles.view2} placeholderTextColor='#ddd' placeholder='Password'
						  secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
					</View>
					<View style={{marginBottom:20}}>
						<TouchableOpacity onPress={this.btnForgotPassword.bind(this)}>
						  <Text style={styles.forgot}>FORGOT PASSWORD</Text>
						</TouchableOpacity>
            <Modal transparent={true} visible={this.state.showForgotPass} onRequestClose={() => {this.setState({showForgotPass: false});}}>
              <ForgotPassword HandleForgotPass={this.HandleForgotPass.bind(this)} />
            </Modal>
					</View>
				</View>
				<View style={{marginLeft:50,marginTop:20, backgroundColor:"#33FF66",marginRight:50, borderRadius:20}}>
					<TouchableHighlight onPress={() => {this.DoLogin()}}>
						<Text style={styles.load}>{this.state.load}</Text>
					</TouchableHighlight>
				</View>
			</View>
		</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 8,flexDirection:'column'},
  view1: {width:'30%',height:25,marginRight:10,color:'#555555'},
  view2: {paddingVertical: 5,color: 'black',borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'82%',marginBottom:20},
  login: {bottom:20,position:'absolute', color:'#fff', fontSize:20, paddingLeft:30,fontWeight:'bold'},
  forgot: {paddingLeft:120,color:'#0099FF',fontWeight:'bold'},
  load: {paddingTop:10, paddingBottom:10,paddingHorizontal:'40%',color:'#fff',fontWeight:'bold'}
});