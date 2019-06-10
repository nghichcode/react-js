import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import CustInfor from './CustInfor'

export default class CheckDetails extends React.Component {
  static navigationOptions = {};
  // static navigationOptions = {headerStyle: {display: 'none'}};
  constructor(props) {
    super(props);
    this.state = {code:0, done:false};
  }

  render() {
    const {navigate} = this.props.navigation;
    const params = this.props.navigation.getParam("userData",false);
    return (
    <View style={styles.container}>
      <CustInfor navigation={this.props.navigation} />

      <View style={styles.content}>
        <Text style={{padding:20}}>So BB Kiem Dem: {this.state.code}</Text>
        <TextInput style={{height: 40, width: "80%", borderColor:'gray', borderWidth:1, marginLeft:20}}
          placeholder="Enter number to check"
          onChangeText={(code)=>this.setState({code:code,done:true})}
          ></TextInput>
      </View>
      <View style={styles.btn}>
        <View style={styles.font}>
          <FontAwesome name="cog" size={50} onPress={()=>{}} />
        </View>
        <View style={styles.font}>
          <FontAwesome name="barcode" size={50} onPress={()=>{ navigate('QRCamera',{userData:params}); }} />
        </View>
        <View style={styles.font}>
          <FontAwesome name="angle-double-left" size={50} onPress={()=>this.props.navigation.goBack() }/>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: '#FFFFFF',paddingTop: 5, paddingLeft:5, paddingRight:5},
  content: {flex: 9, backgroundColor: '#FFF'},
  btn:{
    bottom: 10,marginLeft:20,marginRight:20,
    display: 'flex',flexDirection:'row',alignItems: 'center',justifyContent:'space-around'
  },
  font:{borderWidth:1,paddingRight:20,paddingLeft:20,paddingTop:5,paddingBottom:5},
});