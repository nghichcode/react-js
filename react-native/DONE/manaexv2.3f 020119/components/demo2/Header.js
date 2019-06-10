import React from 'react';
import { Text, View } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={{flex:1,flexDirection:'row',top: 30,padding:20,position:'absolute'}}>
        <Text style={{fontSize: 20,paddingLeft:50,color: 'red',}}>System</Text> 
        <Text style={{fontSize: 20,paddingLeft:20,fontWeight:'bold'}}>ABC Warehouse</Text> 
      </View>
    );
  }
}