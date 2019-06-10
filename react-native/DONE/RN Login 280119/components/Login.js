import React from 'react';
import {StyleSheet,TextInput,View,Text,TouchableHighlight,Modal,TouchableOpacity,Alert } from 'react-native';
import { Constants } from 'expo';

import ForgotPassword from './ForgotPassword';

export default class Login extends React.Component{
  static navigationOptions = {headerStyle: {display: 'none'}};
  constructor(props) {super(props);
    this.state={username:'',password:'',load:'Login',showForgotPass: false};
  }
  btnForgotPassword(){this.setState({showForgotPass: true});}
  HandleForgotPass(ev) {this.setState({showForgotPass: false});console.log("success >> "+ev);}
  DoLogin(){
    if (this.state.load == 'Loading...') {console.log("Loading.");return;}
    var correct=/[a-zA-Z0-9_]{5,20}/;
    if (!correct.test(this.state.username) || !correct.test(this.state.password) )
      {Alert.alert("Account or Password invalid");return;}

    this.setState({load:"Loading..."});
    var self=this;
    var rp = {
      access_token: "asdsa-asdsa-asdsa-asdsa",
      token_type: "bearer",
      refresh_token: "zxczc-zxczc-zxczc-zxczc",
      expires_in: 7199,
      scope: "read,write,trust",
      full_name: "Nguy Dien Ba Vuong",
      max_quantity: 999999
    };

    // 'http://localhost:5000/oauth/token'
    // let url='http://192.168.1.80:8080/ndvn-wms-war/oauth/token';
    fetch("http://localhost:5000/oauth/token",{
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"},
      body: "username="+this.state.username+"&password="+this.state.password
      +"&client_id=ht&client_secret=ht&grant_type=password"
    })
    .then((response) => { console.log(response);return response.json();
    }).then((res) => {
      console.log(res.access_token);
      this.setState({load:"Login"});
      if (res.access_token) {
        this.props.navigation.navigate("ControlPanel",{userData: res});
      } else {Alert.alert("Login FAILED");}
    }).catch((error) => {console.log(this.state);this.setState({load:"Retry Login"});this.props.navigation.navigate("ControlPanel",{userData: rp});});
  }

  render() {
    return (   
    <View style={{flex: 1,paddingTop: Constants.statusBarHeight}} >
      <View style={{flex:2,backgroundColor:'#0099FF'}}>
        <Text style={{position:'absolute',bottom:10,color:'#fff',fontSize:20,paddingLeft:10,fontWeight:'bold'}}>Login</Text>
      </View>
      <View style={{flex: 10,flexDirection:'column'}}>
        <Text style={{paddingLeft:'30%',fontSize:20,paddingBottom:30,paddingTop:30,color:'red'}}>BBC warehouse</Text>
        <View style={{paddingHorizontal:20}}>
          <View>
            <Text style={styles.view1}>Account</Text>
            <TextInput style={styles.view2} placeholder='Your Account'
              placeholderTextColor='#ddd'
              onChangeText={(username) => this.setState({username})}/>
          </View>
          <View>
            <Text style={styles.view1}>Password</Text>
            <TextInput style={styles.view2} placeholder='Password'
              placeholderTextColor='#ddd' secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}/>
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
        <View style={{marginLeft:50,marginTop:10,backgroundColor:"#33FF66",marginRight:50,borderRadius:20}}>
          <TouchableHighlight onPress={() => {this.DoLogin()}}>
            <Text style={{paddingTop:10,paddingBottom:10,paddingLeft:'40%',color:'#fff',fontWeight:'bold'}}>{this.state.load}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  view1: {width:'30%',height:25,marginRight:10,color:'#555555'},
  view2: {borderBottomWidth:1,borderColor:'#196DF9',height:25,marginBottom:20},
  forgot: {paddingLeft:120,color:'#0099FF',fontWeight:'bold'}
});