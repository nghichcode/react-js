import React from 'react';
import { Button, View, Text, TouchableHighlight, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class CustInfor extends React.Component {
  render() {
    const navi = this.props.navigation;
    return (
    <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thông tin tài khoản</Text>
      </View>

      <View style={{flex: 4, backgroundColor: '#ccc', paddingRight: 10}}>
        <View style={{flex: 9, backgroundColor: '#ccc', marginTop: 4}}>
          <TouchableHighlight onPress={()=>navi.navigate('Account',{userData: navi.getParam("userData",{err:true})} )}>
            <Image resizeMode='stretch' style={{height:'100%', width: '100%'}} source={require('../images/avatar.png')} />
          </TouchableHighlight>
        </View>
        <View style={{flex: 3, backgroundColor: '#ccc', justifyContent:'center'}}>
          <Text style={{fontSize:10,fontWeight: 'bold', alignSelf: 'center'}}>
          {navi.getParam("userData",{full_name:"Mr. DragonSX"}).full_name}
          </Text>
        </View>
      </View>
    </View>
    );
  }
}