import React, { Component } from 'react';
import {Button, View, Image } from 'react-native';
import { Constants } from 'expo';

export default class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image source={require('../assets/icon.png')} style={[{width: 24,height: 24}, {tintColor: tintColor}]} />
  )};
  render() {
    return (
    <View style={{flex: 1,marginTop: Constants.statusBarHeight}}>
      <Button title="Pop" onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>
    </View>
    );
  }
}