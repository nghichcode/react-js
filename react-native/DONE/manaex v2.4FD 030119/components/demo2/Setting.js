import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {config:{}};
    this.loadConfig();
  }

  loadConfig(){
    var data = this.props.navigation.getParam("userData",false);
    if (data == false) {return;}
    var auth = data.token_type+" "+data.access_token;
    var username = data.username;
    fetch("https://ncteamvn.herokuapp.com/config/get",{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": auth
      },
    body: "user_name="+username
    })
    .then((response) => response.json())
    .then((res) => {
      if(res[0].id != undefined){
        this.setState({config:res[0]});
      } else {console.log("Setting response err!"); }
    }).catch((error) => {console.log("Setting fetch err!"); });
  }

  GoConfig(){
    var userData = this.props.navigation.getParam("userData",false);
    if (userData != false ) {
        userData.config = this.state.config;
      this.props.navigation.navigate('Config', {userData:userData, configResponse: this.configResponse});
    } else {console.log("GoConfig err!");}
  }

  configResponse = (res) => {
    this.setState({config: res});
  }
  // Authorization: Bearer asdsa-asdsa-asdsa-asdsa
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View>
            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Host</Text></View>
              <View style={styles.view2}><Text style={{fontWeight:'bold'}}>{this.state.config.host}</Text></View>   
            </View>
            <View style={{display:'flex', flexDirection:'row'}}>
                <View style={styles.view1}><Text>Port </Text></View>
                <View style={styles.view2}><Text style={{fontWeight:'bold'}}>{this.state.config.port}</Text></View>
            </View>
            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Context path</Text></View>
              <View style={styles.view2}><Text style={{fontWeight:'bold'}}>{this.state.config.path}</Text></View>             
            </View>
            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Version</Text></View>
              <View style={styles.view2}><Text style={{fontWeight:'bold'}}>{this.state.config.version}</Text></View>
            </View>
            <Text style={styles.text}>Warehouse Management System</Text>
            <Text style={styles.txtCopy}>Copyright 2019</Text>
          </View>
          
        </View>
        <View style={styles.btn}>
          <View style={styles.font}>
            <FontAwesome name="wrench" size={50} onPress={() => this.GoConfig() }/>
          </View>
          <View  style={styles.font}>
            <FontAwesome name="angle-double-left" size={50} onPress={() => this.props.navigation.goBack()}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn:{bottom: 10,display: 'flex',flexDirection:'row',justifyContent:'center'},
  txtCopy:{paddingLeft:110,fontSize: 18,lineHeight: 70,fontWeight:'bold',color:'#FF33FF'},
  font:{marginRight:10,borderWidth:1,paddingRight:30,paddingLeft:30,paddingTop:5, paddingBottom:5},
  text:{paddingLeft:20,fontSize: 18,textAlign: 'justify',lineHeight: 40},
  view1:{paddingLeft:20,width:'30%',height:20,marginRight:30,},
  view2:{height:20,width:'55%',marginBottom:20,paddingLeft:10},
});