import React from 'react'
import {View,Button} from 'react-native'
import { Constants } from 'expo';

export default class CreateRole extends React.Component {
  static navigationOptions = {drawerLabel: 'Create Role'};
  render() {return (
    <View style={{flex: 1,marginTop: Constants.statusBarHeight}}>
      <Button title="Pop" onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>
    </View>
	);}
}