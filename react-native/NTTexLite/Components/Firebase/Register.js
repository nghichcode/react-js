import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, TouchableHighlight } from 'react-native';
import firebconfig from './FirebaseConfig'
import * as firebaselg from 'firebase'

export default class Register extends React.Component{
  constructor(props){
    super();
    if (!firebaselg.apps.length) firebaselg.initializeApp(firebconfig);
      this.state={email:'',password:'',repassword:''};
  }
  registerNow(){
    var self=this;
    if (this.state.repassword !== this.state.password) {console.log('Pass!='); return;}
    firebaselg.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(){
      console.log("Register successful!!!");
      self.props.navigation.goBack();
    }).catch(function(error) {console.log(error.code + '' +error.message);});
  }
  static navigationOptions = {title:'Register',header:null};
  render() {
    return (   
		<View style={{flex:1}} >
			<View style={{flex:4, backgroundColor:'#0099FF'}}>
				<Text style={styles.register}>Register</Text>
			</View>
			<View style={styles.container}>
				<Text style={{paddingLeft:110,fontSize:20,paddingBottom:30,paddingTop:30, color:'red'}}>BBC warehouse</Text>
				<View style={{paddingLeft:50}}>
          <View>
						<Text style={styles.view1}>Email</Text>
						<TextInput style={styles.view2} placeholder='Your email address'
						  placeholderTextColor='#ddd' onChangeText={(email) => this.setState({email})}/>
					</View>
					<View>
						<Text style={styles.view1}>Password</Text>
						<TextInput style={styles.view2} placeholder='Your password'
						  placeholderTextColor='#ddd' secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
					</View>
					<View>
						<Text style={styles.view1}>Retype-Password</Text>
						<TextInput style={styles.view2} placeholder='Your password'
						  placeholderTextColor='#ddd' secureTextEntry={true} onChangeText={(repassword) => this.setState({repassword})}/>
					</View>
				</View>
				<View style={{marginLeft:50,marginTop:20, backgroundColor:"#33FF66",marginRight:50, borderRadius:20}}>
					<TouchableHighlight onPress={() => {this.registerNow();}}>
						<Text style={styles.load}>Register</Text>
					</TouchableHighlight>
				</View>
			</View>
		</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 8,flexDirection:'column'},
  view1: {width:'60%',height:25,marginRight:10,color:'#555555'},
  view2: {borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'82%',marginBottom:20},
  register: {bottom:20,position:'absolute', color:'#fff', fontSize:20, paddingLeft:30,fontWeight:'bold'},
  load: {paddingTop:10, paddingBottom:10,paddingLeft:110,color:'#fff',fontWeight:'bold'}
});