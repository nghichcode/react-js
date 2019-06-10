import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Text, TouchableHighlight } from 'react-native';

export default class UpdateProfile extends React.Component{
  constructor(props) {
    super(props);
    var userData = this.props.navigation.getParam('userData',false);
    this.state = {
      username:userData.config.username,
      url:userData.config.url
    };
  }
 SetConfig(){
    var data = this.props.navigation.getParam("userData",false);
    if (data == false) {return;}
    fetch("https://ncteamvn.herokuapp.com/config/set",{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": data.token_type+" "+data.access_token
      },
    body: "username="+this.state.username+
          "&url="+this.state.url
    })
    .then((response) => response.json())
    .then((res) => {
        if(res.status == "success"){
          this.props.navigation.state.params.configResponse(this.state);
          this.props.navigation.goBack();
        } else {console.log("Update err!"); }
    }).catch((error) => {console.log("Update fetch err!"); });
  }
 render() {
    const {navigate} = this.props.navigation;
    return (   
		<View style={{flex:1}} >
			<View style={{flex:4, backgroundColor:'#0099FF'}}>
				<Text style={styles.update}>Update Profile</Text>
			</View>
			<View style={styles.container}>
				<Text style={{paddingLeft:110,fontSize:20,paddingBottom:30,paddingTop:30, color:'red'}}>Edit Information</Text>
				<View style={{paddingLeft:50}}>
					<View>
						<Text style={styles.view1}>Username</Text>
						<TextInput style={styles.view2} placeholder='Edit username'
							placeholderTextColor='#ddd' value={this.state.username}
                onChangeText={(username) => this.setState({username}) }/>
					</View>
          <View>
						<Text style={styles.view1}>PhotoURL</Text>
						<TextInput style={styles.view2} placeholder='Edit your photoURL'
						  placeholderTextColor='#ddd' value={this.state.url}
                onChangeText={(url) => this.setState({url}) }/>
					</View>
				</View>
				<View style={{marginLeft:50,marginTop:20, backgroundColor:"#33FF66",marginRight:50, borderRadius:20}}>
					<TouchableHighlight onPress={() => navigate('Account')}>
						<Text style={styles.load}>Save</Text>
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
  view2: {borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'82%',marginBottom:20},
  update: {bottom:20,position:'absolute', color:'#fff', fontSize:20, paddingLeft:30,fontWeight:'bold'},
  load: {paddingTop:10, paddingBottom:10,paddingLeft:110,color:'#fff',fontWeight:'bold'}
});