import React from 'react';
import { View,Text,TouchableHighlight,Image,StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class CustInfor extends React.Component {
  render() {
    const navi = this.props.navigation;
    return (
    <View style={{flex: 3,flexDirection:'row',backgroundColor: '#fff',borderRadius:50}}>
      <View style={styles.hleft}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thông tin tài khoản</Text>
      </View>
      <View style={styles.hright}>
        <View style={{flex: 9, marginTop: 4}}>
          <TouchableHighlight onPress={()=>navi.navigate('Account',{userData: navi.getParam("userData",{err:true})} )}>
            <Image resizeMode='stretch' style={{height:'100%', width: '100%',borderColor:'#27b599',borderWidth:1}} source={require('../images/avatar.png')} />
          </TouchableHighlight>
        </View>
        <View style={{flex: 3, justifyContent:'center'}}>
          <Text style={{fontSize:10,fontWeight: 'bold', alignSelf: 'center'}}>
          {navi.getParam("userData",{full_name:"Mr. DragonSX"}).full_name}
          </Text>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  hleft:{
    flex: 8,backgroundColor: '#ecf0f1',justifyContent: 'center', alignItems: 'center',
    borderTopLeftRadius:10,borderColor:'#d1d1d1',borderBottomWidth:2
  },
  hright:{
    flex: 4,backgroundColor: '#ecf0f1',paddingRight: 10,
    borderTopRightRadius:10,borderColor:'#d1d1d1',borderBottomWidth:2
  }
});