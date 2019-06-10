import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, Button, Alert } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state={username:'ncteamvn',password:'',res:''};
  }

  _handleLoginClick(){
      fetch("https://ncteamvn.herokuapp.com/oauth/token",{
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: "username="+this.state.username+"&password="+this.state.password
      })
      .then((response) => response.json())
      .then((res) => {
          if(res.access_token != undefined){
              res.username = this.state.username;// add uname
              console.log(res);
              this.props.navigation.navigate('Home', {userData:res});
          } else {Alert.alert(res.statusText);}
      }).catch((error) => {console.log(error);});
  }

  static navigationOptions = {title:'Login',header:null};
  render() {
    const {navigate} = this.props.navigation;
    return (
    <View style={{flex:1}} >
      <View style={styles.container}>
        <Text style={{paddingLeft:110,fontSize:20,paddingBottom:50, color:'red'}}>BBC warehouse</Text>
        <View>
          <View style={{display:'flex', flexDirection:'row'}}>
            <Text style={styles.view1}>Account</Text>
            <TextInput style={styles.view2} placeholder='Enter a account'
              placeholderTextColor='mediumseagreen'
              defaultValue='ncteamvn'
              onChangeText={(username) => this.setState({username})}/>
          </View>
          <View style={{display:'flex', flexDirection:'row'}}>
            <Text style={styles.view1}>Password </Text>
            <TextInput style={styles.view2} placeholder='Enter a password'
              placeholderTextColor='mediumseagreen' secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}/>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:170,marginTop:20}}>
          <View style={{marginRight:20}}><Button title="Login" onPress={() => {this._handleLoginClick()}}/></View>
          <View><Button title="Cancel" onPress={() => navigate('Login')}/></View>
        </View>
      </View>
      <View style={{bottom: 10,alignItems:'center'}}><Text style={{color:'#BF00BF'}}>Coppyright 2019</Text></View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{flex: 1,justifyContent: 'center',flexDirection:'column'},
  view1:{paddingLeft:20,width:'30%',height:25,marginRight:10,marginTop:5},
  view2:{borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'55%',marginBottom:30,paddingLeft:10}
});