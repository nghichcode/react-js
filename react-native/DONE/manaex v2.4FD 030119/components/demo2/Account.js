import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  GoSetting(data){
    var userData = this.props.navigation.getParam("userData",false);
    this.props.navigation.navigate('Setting', {userData:userData} );
  }

  render() {
    const navi = this.props.navigation;
    return (
    <View style={{flex:1,marginLeft:10,marginRight:10}}>
      <View style={{flex:1,top: 30,padding:6,position:'absolute',flexWrap: 'wrap'}}>
        <Text style={{fontSize: 20,color: 'red',}}>Thong tin tai khoan:</Text> 
        <Text style={{flexDirection:'row',flexWrap: 'wrap',fontSize: 20,paddingLeft:15,fontWeight:'bold',color: 'blue'}}>
        {navi.getParam("userData",{full_name:"Mr. DragonSX"}).full_name}
        </Text> 
      </View>

      <View style={{flex: 1,justifyContent: 'center'}}>
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={styles.view1}><Text>Ma NV</Text></View>
          <View style={styles.view2}><Text style={{fontWeight:'bold'}}>NV9028928</Text></View>   
        </View>
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={styles.view1}><Text>Chuc vu</Text></View>
          <View style={styles.view2}><Text style={{fontWeight:'bold'}}>Quyen Xuat kho</Text></View>
        </View>
      </View>

      <View style={{bottom: 10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <View style={styles.font}><FontAwesome name="bar-chart" size={50} onPress={()=>navi.goBack()}/></View>
        <View style={styles.font}><FontAwesome name="copyright" size={50} onPress={()=>navi.navigate('Description')}/></View>
        <View style={styles.font}>
          <FontAwesome name="gears" size={50} onPress={() => this.GoSetting() }/>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  font:{borderWidth:1,paddingRight:27,paddingLeft:27,paddingTop:5,paddingBottom:5},
  view1:{paddingLeft:20,width:'30%',height:20,marginRight:30},
  view2:{paddingLeft:10,width:'55%',height:20},
});