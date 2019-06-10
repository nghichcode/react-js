import React,{ Component } from 'react';
import { StyleSheet,TextInput,View,Text,TouchableHighlight,Alert } from 'react-native';

export default class CreateUser extends React.Component{
  constructor(props) {
    super(props);this.state={username:'',fullName:'',password:'',status:'Create'};
  }
  NewFetch(){
    this.setState({status:"Waitting..."});
    let userData = this.props.navigation.state.params.userData;
    // "http://localhost:5000/api/picking/sacnSerial.json"
    // "http://192.168.1.80:8080/ndvn-wms-war/api/process/adduser.json"
    fetch("http://localhost:5000/api/picking/sacnSerial.json",{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+userData.access_token
      },
      body: "username="+this.state.username+"&fullName="+this.state.fullName
      +"&password="+this.state.password+"&confirmPassword="+this.state.password+"&forward_act="
    })
    .then((response) => {
       return response.json();
    }).then((res)=>{
      this.setState({status:"Create"});
      console.log(res);
      Alert.alert("Done");
    }).catch((error) => {this.setState({status:"Retry"});console.log(error);});
  }
  render() {
    return (   
		  <View style={{flex:1}} >
			  <View style={{flex:2,backgroundColor:'#0099FF'}}>
				  <Text style={{bottom:20,position:'absolute',color:'#fff',fontSize:20,paddingLeft:30,fontWeight:'bold'}}>Registration</Text>
			  </View>
		  	<View style={styles.container}>
				  
          <View>
            <Text style={styles.view1}>User Name</Text>
            <TextInput style={styles.view2} placeholder='ex: ngannn' placeholderTextColor='gray'
            onChangeText={(username)=>this.setState({username}) } />
          </View>
          <View>
            <Text style={styles.view1}>Full Name</Text>
            <TextInput style={styles.view2} placeholder='ex: Nguyen Ngoc Ngan' placeholderTextColor='gray'
            onChangeText={(fullName)=>this.setState({fullName}) } />
          </View>
          <View>
            <Text style={styles.view1}>Password</Text>
            <TextInput style={styles.view2} placeholder='**********' placeholderTextColor='gray' secureTextEntry={true}
            onChangeText={(password)=>this.setState({password}) } />
          </View>
				  
          <View style={{marginTop:20,backgroundColor:"#33FF66",borderRadius:20}}>
            <TouchableHighlight style={{alignItems:'center'}} onPress={() => this.NewFetch()}>
              <Text style={{paddingTop:10,paddingBottom:10,color:'#fff',fontWeight:'bold'}}>{this.state.status}</Text>
            </TouchableHighlight>
          </View>
			  </View>
		  </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 8,flexDirection:'column',marginLeft:'10%',marginRight:'10%',marginTop:20},
  view1: {width:'50%',height:25,marginRight:'10%'},
  view2: {borderBottomWidth:1,borderColor:'#196DF9',height:25,width:'100%',marginBottom:20}
});