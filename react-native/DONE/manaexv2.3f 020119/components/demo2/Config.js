import React from 'react';
import { Text, View,TextInput,Alert, StyleSheet } from 'react-native';
import {FontAwesome} from '@expo/vector-icons' 

export default class Config extends React.Component {
  constructor(props) {
    super(props);
    var userData = this.props.navigation.getParam('userData',false);
    this.state = {
      host:userData.config.host,
      port:userData.config.port+'',
      path:userData.config.path,
      version:userData.config.version
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
    body: "host="+this.state.host+
          "&port="+this.state.port+
          "&path="+this.state.path+
          "&version="+this.state.version+
          "&user_name="+data.username
    })
    .then((response) => response.json())
    .then((res) => {
        if(res.status == "success"){
          this.props.navigation.state.params.configResponse(this.state);
          this.props.navigation.goBack();
        } else {console.log("Config Set err!"); }
    }).catch((error) => {console.log("Config fetch err!"); });
  }

  render() {
    return (
      <View style={{flex:1}}>

        <View style={styles.container}>
          <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Host</Text></View>
              <TextInput style={styles.view2} placeholder='Enter a host' placeholderTextColor='mediumseagreen'
                value={this.state.host}
                onChangeText={(host) => this.setState({host}) }/>
          </View>
          <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Port </Text></View>
              <TextInput style={styles.view2} placeholder='Enter a port' placeholderTextColor='mediumseagreen'
                value={this.state.port}
                onChangeText={(port) => this.setState({port})}/>
          </View>
          <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Context path</Text></View>
              <TextInput style={styles.view2} placeholder='Enter a context path' placeholderTextColor='mediumseagreen'
                value={this.state.path}
                onChangeText={(path) => this.setState({path})}/>
          </View>
          <View style={{display:'flex', flexDirection:'row'}}>
              <View style={styles.view1}><Text>Version</Text></View>
              <Text style={{marginBottom:20,fontWeight:'bold'}}>{this.state.version}</Text>
          </View>
          <Text style={styles.text}>Warehouse Management System</Text>
          <Text style={styles.copy}>Copyright 2019</Text>
        </View>

        <View style={styles.btn}>
          <FontAwesome style={styles.font} name="check" size={50} onPress={()=>{this.SetConfig()}}/>
          <FontAwesome style={styles.font} name="angle-double-left" size={50}
           onPress={()=>this.props.navigation.navigate('Setting')}/>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1,justifyContent: 'center'},
  btn:{bottom: 10,display: 'flex',flexDirection:'row',justifyContent:'center'},
  font:{marginRight:10, borderWidth:1,paddingRight:30,paddingLeft:30,paddingTop:5, paddingBottom:5},
  text:{paddingLeft:20,fontSize: 18,textAlign: 'justify',lineHeight: 30,},
  view1:{paddingLeft:20,width:'30%',height:25,marginRight:30},
  view2:{borderBottomWidth:2,borderColor:'green',height:25,width:'55%',marginBottom:30, paddingLeft:10},
  copy:{paddingLeft:110,fontSize: 18,lineHeight: 70,fontWeight:'bold',color:'#FF33FF'}
});