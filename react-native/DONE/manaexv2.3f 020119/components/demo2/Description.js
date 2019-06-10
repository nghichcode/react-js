import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {FontAwesome} from '@expo/vector-icons' 

export default class Description extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <View style={{display:'flex', flexDirection:'row'}}>
            <View style={styles.view1}><Text>Term</Text></View>
            <View style={styles.view2}><Text style={{fontWeight:'bold'}}>Do not copy without</Text></View>   
          </View>
          <Text style={styles.txtCopy}>Copyright 2019</Text>
        </View>
        
        <View style={styles.btn}>
          <View  style={styles.font}><FontAwesome name="angle-double-left" size={50} onPress={()=>this.props.navigation.goBack()}/></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1,justifyContent: 'center'},
  btn:{bottom: 10,display: 'flex',flexDirection:'row',justifyContent:'center'},
  txtCopy:{paddingLeft:110,fontSize: 18,lineHeight: 70,fontWeight:'bold',color:'#FF33FF'},
  font:{marginRight:10,borderWidth:1,paddingRight:30,paddingLeft:30,paddingTop:5, paddingBottom:5},
  view1:{paddingLeft:20,width:'30%',height:20, marginRight:30,},
  view2:{height:20,width:'55%',marginBottom:20,paddingLeft:10},
});